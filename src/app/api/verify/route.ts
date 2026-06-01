import { NextResponse } from "next/server";
import { getLesson } from "@/lib/curriculum";
import { lessonLanguage } from "@/lib/curriculum/lang";
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
  if (allPass) {
    const sb = getSupabaseServerClient();
    if (sb) {
      try {
        const {
          data: { user },
        } = await sb.auth.getUser();
        if (user) {
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
        }
      } catch {
        // Awarding is best-effort; verification result still returns below.
      }
    }
  }

  return NextResponse.json({ verified: allPass, results, awardedXp });
}
