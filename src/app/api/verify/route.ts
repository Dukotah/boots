import { NextResponse } from "next/server";
import { getLesson } from "@/lib/curriculum";
import { lessonLanguage } from "@/lib/curriculum/lang";
import { canInteract } from "@/lib/access";
import { gradeJsOrTs } from "@/lib/serverGrade";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Server-side verification + award. The browser grades for instant feedback;
// this endpoint *re-runs* JS/TS solutions on the server and, only if they pass
// (and the user is signed in), awards canonical XP via the complete_lesson RPC.
// XP can no longer be claimed without code the server agrees actually passes.
export const runtime = "nodejs";

const MAX_CODE_LENGTH = 20_000;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { courseSlug, lessonSlug, code } = body as Record<string, unknown>;
  if (
    typeof courseSlug !== "string" ||
    typeof lessonSlug !== "string" ||
    typeof code !== "string"
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Code too long" }, { status: 413 });
  }

  const found = getLesson(courseSlug, lessonSlug);
  if (!found) {
    return NextResponse.json({ error: "Unknown lesson" }, { status: 404 });
  }

  const language = lessonLanguage(found.lesson, found.module);

  // Resolve the signed-in user (if any) so we can enforce the paywall before
  // doing any grading work. The complete_lesson RPC is the authoritative gate,
  // but checking here lets us refuse locked lessons up front (and not spend the
  // server sandbox on content the caller can't claim).
  const sb = getSupabaseServerClient();
  let user: { id: string } | null = null;
  let profile: { is_pro?: boolean; streak?: number } | null = null;
  if (sb) {
    try {
      const {
        data: { user: u },
      } = await sb.auth.getUser();
      user = (u as { id: string } | null) ?? null;
      if (user) {
        const { data } = await sb
          .from("profiles")
          .select("is_pro, streak")
          .eq("id", user.id)
          .single();
        profile = (data as { is_pro?: boolean; streak?: number } | null) ?? null;
      }
    } catch {
      // Treat as anonymous; awarding below simply won't happen.
    }
  }

  // Paywall: a signed-in learner may only claim a lesson they're entitled to.
  // (Anonymous callers can't be awarded anyway — the RPC requires auth.)
  if (
    user &&
    !canInteract({
      isPro: Boolean(profile?.is_pro),
      lessonIndex: found.index,
      free: found.module.free,
      streak: profile?.streak ?? 0,
    })
  ) {
    return NextResponse.json({ error: "Lesson locked" }, { status: 403 });
  }

  // Python/SQL run in browser WASM runtimes we don't host server-side yet.
  // Signal "not verifiable here" so the client keeps its existing flow.
  if (language !== "js" && language !== "ts") {
    return NextResponse.json({
      verified: false,
      reason: `Server verification isn't available for ${language} yet`,
    });
  }

  const { results, allPass } = await gradeJsOrTs(code, found.lesson, language);

  let awardedXp: number | null = null;
  if (allPass && sb && user) {
    try {
      const { data } = await (
        sb as unknown as {
          rpc: (
            fn: string,
            args: Record<string, unknown>,
          ) => Promise<{ data: unknown }>;
        }
      ).rpc("complete_lesson", {
        p_course_slug: courseSlug,
        p_lesson_slug: lessonSlug,
      });
      if (typeof data === "number") awardedXp = data;
    } catch {
      // Awarding is best-effort; verification result still returns below.
    }
  }

  return NextResponse.json({ verified: allPass, results, awardedXp });
}
