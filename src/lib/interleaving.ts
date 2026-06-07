// Interleaving — surfacing older, well-learned lessons for variety.
//
// Distinct from spaced-repetition ("due reviews"): those are cards scheduled
// by FSRS/Leitner whose recall is falling below threshold. Interleaved picks
// are lessons the learner already knows well (high stability, many reps,
// NOT currently due) and mixes a few back in so practice stays varied —
// the "interleaving effect" improves transfer and long-term retention even
// when the card is not strictly overdue.
//
// Pure functions only; no store imports.

import type { ReviewRecord } from "@/lib/mastery";
import { isReviewDue } from "@/lib/mastery";

// ─────────────────────────────────────────────────────────────────────────────
// Date helper (mirrors the one in the store — no shared dep to avoid barrel)
// ─────────────────────────────────────────────────────────────────────────────

function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am, ad).getTime();
  const db = new Date(by, bm, bd).getTime();
  return Math.round((db - da) / 86_400_000);
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Interleaving score
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A score for how "interleaving-worthy" a lesson is.
 *
 * Higher is better to surface. The formula rewards:
 *   - High stability (well-learned) — the card won't crumble under surprise retrieval.
 *   - Many reps (reviewed multiple times — truly mastered, not just seen once).
 *   - Long time since last seen (bring variety; the learner hasn't touched it
 *     recently, so it feels fresh without being "due" in the FSRS sense).
 *
 * We normalise each axis to [0, 1] with soft caps so outliers don't dominate.
 */
function interleavingScore(rec: ReviewRecord, today: string): number {
  const stability = rec.stability ?? 0;
  const reps = rec.reps ?? 0;
  const elapsed = rec.last ? dayDiff(rec.last, today) : 0;

  // Stability: cap soft at 30 days (≥30 is "mature", no extra credit above ~60).
  const stabilityScore = Math.min(stability / 30, 2) / 2; // [0, 1]

  // Reps: reward up to ~5 reviews, taper above.
  const repsScore = Math.min(reps / 5, 1); // [0, 1]

  // Time since last seen: reward 7–60 days. Below 7 = too recent. Above 60 = probably due.
  const recencyScore =
    elapsed < 7 ? 0 : Math.min((elapsed - 7) / 53, 1); // [0, 1], peaks at 60 days

  // Weighted blend: stability matters most (it's the "well-learned" gate),
  // then time since seen (variety), then reps (confidence).
  return stabilityScore * 0.5 + recencyScore * 0.3 + repsScore * 0.2;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export type InterleavedPick = {
  /** "moduleSlug/lessonSlug" — the canonical lesson id used everywhere. */
  lessonId: string;
  /** Interleaving score [0, 1] — higher means more variety value. */
  score: number;
};

/**
 * Pick up to `n` already-well-learned lessons to interleave into practice.
 *
 * Criteria for a lesson to qualify:
 *   1. It is in `completedIds` (the learner has finished it).
 *   2. It has a ReviewRecord with stability ≥ 3 days AND reps ≥ 1 — genuinely
 *      reviewed at least once, not just freshly seeded.
 *   3. It is NOT currently due for spaced-repetition review (those are handled
 *      by the existing dueReviews selector — no duplication).
 *   4. It was last seen more than 6 days ago (avoid surfacing yesterday's work).
 *
 * The set is ranked by `interleavingScore()` (well-learned + haven't seen
 * recently) and the top `n` are returned. The caller renders them as "mix it
 * up" prompts, deep-linking into the lesson page.
 *
 * @param completedIds  - `store.completed` array ("moduleSlug/lessonSlug")
 * @param reviews       - `store.reviews` map (lessonId → ReviewRecord)
 * @param n             - maximum number of picks to return (default 2)
 * @param _today        - override today's key for unit-testing (optional)
 */
export function pickInterleaved(
  completedIds: string[],
  reviews: Record<string, ReviewRecord>,
  n = 2,
  _today?: string,
): InterleavedPick[] {
  const today = _today ?? todayKey();

  const candidates: InterleavedPick[] = [];

  for (const id of completedIds) {
    const rec = reviews[id];

    // Must have a review record with real maturity.
    if (!rec) continue;
    const stability = rec.stability ?? 0;
    const reps = rec.reps ?? 0;
    if (stability < 3 || reps < 1) continue;

    // Skip if it is already due for spaced-rep review.
    const elapsed = rec.last ? dayDiff(rec.last, today) : 0;
    if (isReviewDue(rec, elapsed)) continue;

    // Skip if seen too recently (< 7 days).
    if (elapsed < 7) continue;

    const score = interleavingScore(rec, today);
    candidates.push({ lessonId: id, score });
  }

  // Sort descending by score, take the top n.
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, n);
}
