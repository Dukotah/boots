// Spaced-repetition (Leitner box) scheduling + skill-mastery helpers.
//
// Each completed lesson gets a review record { box, last }. Re-completing it as a
// "review" promotes it to a higher box with a longer interval; the more boxes it
// climbs, the longer until it resurfaces. A lesson is "due" once its interval has
// elapsed since the last review. Pure — the store owns the date math + records.

/** Days between reviews for each Leitner box. Climbing boxes = longer gaps. */
export const REVIEW_INTERVALS = [1, 3, 7, 16, 35] as const;
export const MAX_BOX = REVIEW_INTERVALS.length - 1;

export type ReviewRecord = { box: number; last: string };

export function intervalForBox(box: number): number {
  return REVIEW_INTERVALS[Math.max(0, Math.min(MAX_BOX, box))];
}

/** The box a lesson moves to after a successful review (capped). */
export function nextBox(box: number): number {
  return Math.min(MAX_BOX, box + 1);
}

/** Due if at least `interval(box)` days have elapsed since the last review. */
export function isReviewDue(rec: ReviewRecord, daysSinceLast: number): boolean {
  return daysSinceLast >= intervalForBox(rec.box);
}

export type MasteryTier = "novice" | "learning" | "proficient" | "mastered";

export function masteryTier(pct: number): MasteryTier {
  if (pct >= 1) return "mastered";
  if (pct >= 0.6) return "proficient";
  if (pct > 0) return "learning";
  return "novice";
}

export const MASTERY_LABEL: Record<MasteryTier, string> = {
  novice: "Novice",
  learning: "Learning",
  proficient: "Proficient",
  mastered: "Mastered",
};
