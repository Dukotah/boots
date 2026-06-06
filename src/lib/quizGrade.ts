import type { QuizQuestion } from "@/lib/curriculum/types";

// Pure, server-safe quiz grading. Lives apart from lib/scoring (which is a
// client module) so the /api/verify route can validate submissions without
// pulling client code, and so the integrity logic is unit-testable in isolation.

export type QuizGrade =
  | { valid: false } // submission shape didn't match the question set
  | { valid: true; allPass: boolean };

/**
 * Check a quiz submission against the answer key.
 * `valid: false` means the submission is malformed (wrong length, not all
 * numbers, not an array) and should be rejected as a bad request. When valid,
 * `allPass` is true only if every answer index matches its question's key
 * (and there is at least one question).
 */
export function gradeQuiz(
  questions: QuizQuestion[],
  answers: unknown,
): QuizGrade {
  if (
    !Array.isArray(answers) ||
    answers.length !== questions.length ||
    !answers.every((a) => typeof a === "number")
  ) {
    return { valid: false };
  }
  const submitted = answers as number[];
  const allPass =
    questions.length > 0 && questions.every((q, i) => submitted[i] === q.answer);
  return { valid: true, allPass };
}
