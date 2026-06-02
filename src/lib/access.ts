// Access policy — the monetization mechanic, expressed as pure functions.
//
// Model (from GAMEPLAN §6): *content is always readable*; the **interactive**
// part (run + auto-grade) is the paid value. But gating too early kills the
// gamified habit before it forms (the #1 edtech conversion mistake), so the free
// tier is generous AND *grows with engagement*: keep a streak and you unlock more
// free interactive lessons. Conversion then happens at a genuine momentum moment,
// not an abrupt wall two lessons in.
//
// This file has zero dependencies on auth or the store so it can be unit-tested
// and reused on the server (e.g. to authorize a grade request later).

/** Interactive lessons at the start of each course that are always free. */
export const FREE_PREVIEW_LESSONS = 3;
/** Each day of streak unlocks one more free interactive lesson… */
export const STREAK_UNLOCK_PER_DAY = 1;
/** …up to this many bonus lessons (so a habit, not a credit card, unlocks depth). */
export const MAX_STREAK_UNLOCK = 6;

/** How many lessons into a course are free, given the learner's current streak. */
export function freeLessonLimit(streak = 0): number {
  const bonus = Math.min(MAX_STREAK_UNLOCK, Math.max(0, streak) * STREAK_UNLOCK_PER_DAY);
  return FREE_PREVIEW_LESSONS + bonus;
}

/** A lesson is part of the free taste if it's within the (streak-extended) window. */
export function isFreePreview(lessonIndex: number, streak = 0): boolean {
  return lessonIndex >= 0 && lessonIndex < freeLessonLimit(streak);
}

/** Can this user run/grade this lesson? Pro unlocks everything; `free` courses
 * (public-good / lead magnets like Digital Safety) are open to everyone; and the
 * free window grows with the learner's streak. */
export function canInteract(args: {
  isPro: boolean;
  lessonIndex: number;
  free?: boolean;
  streak?: number;
}): boolean {
  if (Boolean(args.free) || args.isPro) return true;
  if (args.lessonIndex < 0) return false; // defensive: invalid index → locked
  return isFreePreview(args.lessonIndex, args.streak ?? 0);
}
