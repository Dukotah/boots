import { NextResponse } from "next/server";
import { getLesson } from "@/lib/curriculum";
import { lessonLanguage } from "@/lib/curriculum/lang";
import { gradeJsOrTs } from "@/lib/serverGrade";
import { gradeQuiz } from "@/lib/quizGrade";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Server-side verification + award. The browser grades for instant feedback;
// this endpoint independently checks the work and, only if it genuinely passes
// (and the user is signed in), awards canonical XP via the complete_lesson RPC.
// XP can no longer be claimed without work the server agrees is correct:
//   - JS/TS code lessons: the server *re-runs* the code.
//   - Quiz lessons:       the server checks submitted answers against the key.
//   - Python/SQL/HTML:    not server-runnable yet → signal "not verifiable here"
//                         so the client keeps its existing (optimistic) flow.
export const runtime = "nodejs";

const MAX_CODE_LENGTH = 20_000;

/** Award canonical XP via the RPC for a signed-in user. Returns the amount, or null. */
async function awardViaRpc(
  courseSlug: string,
  lessonSlug: string,
): Promise<number | null> {
  const sb = getSupabaseServerClient();
  if (!sb) return null;
  try {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return null;
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
    return typeof data === "number" ? data : null;
  } catch {
    // Awarding is best-effort; the verification result still returns.
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { courseSlug, lessonSlug, code, answers } = body as Record<
    string,
    unknown
  >;
  if (typeof courseSlug !== "string" || typeof lessonSlug !== "string") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const found = getLesson(courseSlug, lessonSlug);
  if (!found) {
    return NextResponse.json({ error: "Unknown lesson" }, { status: 404 });
  }

  // ── Quiz lessons: validate submitted answers against the key ───────────────
  if (found.lesson.kind === "quiz") {
    const grade = gradeQuiz(found.lesson.questions ?? [], answers);
    if (!grade.valid) {
      return NextResponse.json(
        { error: "answers must be a number[] matching the question count" },
        { status: 400 },
      );
    }
    const awardedXp = grade.allPass
      ? await awardViaRpc(courseSlug, lessonSlug)
      : null;
    return NextResponse.json({ verified: grade.allPass, awardedXp });
  }

  // ── Code lessons: re-run JS/TS; other languages aren't server-runnable yet ─
  if (typeof code !== "string") {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Code too long" }, { status: 413 });
  }

  const language = lessonLanguage(found.lesson, found.module);
  if (language !== "js" && language !== "ts") {
    return NextResponse.json({
      verified: false,
      reason: `Server verification isn't available for ${language} yet`,
    });
  }

  const { results, allPass } = await gradeJsOrTs(code, found.lesson, language);
  const awardedXp = allPass ? await awardViaRpc(courseSlug, lessonSlug) : null;
  return NextResponse.json({ verified: allPass, results, awardedXp });
}
