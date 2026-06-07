// Spaced-repetition scheduling + skill-mastery helpers.
//
// HISTORY
//   v1: Simple Leitner boxes — fixed intervals [1, 3, 7, 16, 35] days.
//   v2: Lightweight FSRS-like scheduler. Per-card stability + difficulty derived
//       from a single Rating on each review. No npm dependency — a small
//       self-contained model (~50 lines) lives entirely in this file.
//
// BACKWARD COMPATIBILITY
//   Old records { box, last } are still accepted everywhere. box maps to an
//   initial stability seed (see fsrsMigrate). New records add { stability,
//   difficulty, reps } alongside box+last so callers that only read box+last
//   continue to work without changes.
//
// The store owns the ReviewRecord values; all scheduling lives here as pure fns.

// ─────────────────────────────────────────────────────────────────────────────
// Legacy Leitner constants — kept for migration + backward compat.
// ─────────────────────────────────────────────────────────────────────────────

/** Days between reviews for each Leitner box. Used for migration seeding only. */
export const REVIEW_INTERVALS = [1, 3, 7, 16, 35] as const;
export const MAX_BOX = REVIEW_INTERVALS.length - 1;

export function intervalForBox(box: number): number {
  return REVIEW_INTERVALS[Math.max(0, Math.min(MAX_BOX, box))];
}

// ─────────────────────────────────────────────────────────────────────────────
// ReviewRecord — extended to carry FSRS fields alongside legacy box/last.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Per-lesson review record persisted in the store.
 *
 * Legacy shape (v1): { box, last }
 * New shape  (v2): { box, last, stability, difficulty, reps }
 *
 * Cards without the new fields are treated as legacy and migrated on the fly
 * inside the pure scheduling functions — no data-migration script required.
 */
export type ReviewRecord = {
  /** Leitner box index (0–4). Still written on every review for legacy callers. */
  box: number;
  /** ISO local-day key of the last review (e.g. "2026-5-7"). */
  last: string;
  /**
   * FSRS stability: the number of days after which recall probability would
   * fall to the retention target (R=0.9). Starts at the Leitner-box seed.
   */
  stability?: number;
  /**
   * FSRS difficulty (1–10). Higher = harder. Starts at 5 (neutral) and adjusts
   * up on Again/Hard ratings, down on Easy.
   */
  difficulty?: number;
  /** Number of successful reviews this card has seen. */
  reps?: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// FSRS-lite constants
// ─────────────────────────────────────────────────────────────────────────────

/** Target recall probability at the scheduled review day. */
const TARGET_RETENTION = 0.9;

/**
 * FSRS stability-growth formula constants (tuned from the canonical FSRS-4
 * paper; deliberately simplified — no "forgetting curve" decay term needed for
 * a mobile-size card set).
 */
const FSRS_W = {
  /** Initial stability for each Rating on the very first review. */
  s0: [2.4, 3.7, 7.3, 20.0] as const, // Again, Hard, Good, Easy
  /** Difficulty adjustment per Rating (-1 = Again, +1 = Easy). */
  dDelta: [0.15, 0.07, 0, -0.1] as const,
  /** Stability-growth multiplier factor. */
  factor: 1.0,
  /** Hard multiplier (reduces growth relative to Good). */
  hardMod: 0.85,
  /** Easy bonus (boosts growth relative to Good). */
  easyBonus: 1.3,
} as const;

/** Clamp a difficulty value to the valid [1, 10] range. */
function clampD(d: number): number {
  return Math.max(1, Math.min(10, d));
}

// ─────────────────────────────────────────────────────────────────────────────
// Rating enum
// ─────────────────────────────────────────────────────────────────────────────

/**
 * How the learner rated their recall on a review.
 *
 * - Again: complete blank / wrong
 * - Hard:  recalled with significant difficulty
 * - Good:  recalled correctly with some effort (the default "pass")
 * - Easy:  recalled instantly, no effort
 */
export type Rating = "again" | "hard" | "good" | "easy";

const RATING_INDEX: Record<Rating, number> = {
  again: 0,
  hard: 1,
  good: 2,
  easy: 3,
};

// ─────────────────────────────────────────────────────────────────────────────
// Core FSRS-lite scheduling
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive a starting stability for a legacy card that has no FSRS fields.
 * The Leitner box maps directly to the old REVIEW_INTERVALS value, which is
 * a reasonable initial stability seed.
 */
export function fsrsMigrate(rec: ReviewRecord): {
  stability: number;
  difficulty: number;
  reps: number;
} {
  return {
    stability: intervalForBox(rec.box),
    difficulty: 5,
    reps: rec.box, // treat each box climb as one rep
  };
}

/**
 * Compute the next interval (in days) to schedule after a review, given the
 * card's current FSRS state and the learner's rating.
 *
 * Returns the full updated ReviewRecord fields (except `last`, which the
 * store fills in with today's key).
 *
 * Pure function — no side effects.
 */
export function fsrsSchedule(
  rec: ReviewRecord,
  rating: Rating,
  today: string,
): Omit<ReviewRecord, "last"> & { nextInterval: number } {
  // ── Hydrate legacy cards on the fly ──────────────────────────────────────
  const {
    stability: s0,
    difficulty: d0,
    reps: r0,
  } = rec.stability != null
    ? { stability: rec.stability, difficulty: rec.difficulty ?? 5, reps: rec.reps ?? 0 }
    : fsrsMigrate(rec);

  const ri = RATING_INDEX[rating];
  const isFirstRep = r0 === 0;

  let newStability: number;
  let newDifficulty: number;
  let newReps: number;

  if (isFirstRep || rating === "again") {
    // First review OR lapse: reset to the rating-specific initial stability.
    newStability = FSRS_W.s0[ri];
    newDifficulty = clampD(d0 + FSRS_W.dDelta[ri]);
    newReps = rating === "again" ? 0 : r0 + 1;
  } else {
    // Mature review: apply the stability-growth formula.
    const retrievability = recallProbability(rec, today);
    // Core FSRS stability-growth: S' = S * e^(ω * (R − target) * factor)
    // Simplified: S' = S * growthFactor, where growthFactor depends on R and rating.
    const baseFactor = Math.exp(0.9 * (1 - retrievability));
    const ratingMod =
      rating === "hard"
        ? FSRS_W.hardMod
        : rating === "easy"
        ? FSRS_W.easyBonus
        : 1.0;
    const growthFactor = 1 + baseFactor * ratingMod * FSRS_W.factor;
    newStability = Math.min(365, s0 * growthFactor);
    newDifficulty = clampD(d0 + FSRS_W.dDelta[ri]);
    newReps = r0 + 1;
  }

  // Interval = stability * ln(target_retention) / ln(0.9)
  // At R=target_retention the card resurfaces. With target=0.9 the formula
  // simplifies: interval ≈ stability (days to reach 90% recall).
  const rawInterval =
    newStability * Math.log(TARGET_RETENTION) / Math.log(TARGET_RETENTION);
  // Apply a small fuzzing (±5%) to prevent bunching on the same day.
  const fuzz = 0.95 + Math.random() * 0.1;
  const nextInterval = Math.max(1, Math.round(rawInterval * fuzz));

  // Also maintain the legacy box field so old callers keep working.
  const newBox = nextBox(rec.box);

  return {
    box: newBox,
    stability: newStability,
    difficulty: newDifficulty,
    reps: newReps,
    nextInterval,
  };
}

/**
 * Estimate the current recall probability for a card given how many days
 * have elapsed since the last review (uses the FSRS forgetting curve).
 *
 * R(t) = 0.9^(t / S)
 */
export function recallProbability(rec: ReviewRecord, today: string): number {
  const { stability } = rec.stability != null ? rec : { ...rec, ...fsrsMigrate(rec) };
  const s = stability ?? intervalForBox(rec.box);
  // We don't have dayDiff here (no date deps) — approximate from `last` string.
  const [ay, am, ad] = rec.last.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  const elapsed = Math.max(
    0,
    Math.round(
      (new Date(ty, tm, td).getTime() - new Date(ay, am, ad).getTime()) /
        86_400_000,
    ),
  );
  return Math.pow(TARGET_RETENTION, elapsed / s);
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy API — kept working for existing callers
// ─────────────────────────────────────────────────────────────────────────────

/** The box a lesson moves to after a successful review (capped at MAX_BOX). */
export function nextBox(box: number): number {
  return Math.min(MAX_BOX, box + 1);
}

/**
 * Is this card due for review?
 *
 * New cards use FSRS stability (overrides the Leitner interval). Legacy cards
 * (no stability field) fall back to the old Leitner interval check.
 *
 * `daysSinceLast` is the number of days elapsed since `rec.last`.
 */
export function isReviewDue(rec: ReviewRecord, daysSinceLast: number): boolean {
  if (rec.stability != null) {
    // FSRS: compute the next interval from the record's last scheduled interval.
    // We re-derive it conservatively: due when elapsed ≥ stability * 0.95
    // (the lower bound of the fuzz window used in fsrsSchedule).
    return daysSinceLast >= Math.max(1, Math.round(rec.stability * 0.95));
  }
  // Legacy Leitner fallback.
  return daysSinceLast >= intervalForBox(rec.box);
}

// ─────────────────────────────────────────────────────────────────────────────
// Mastery tiers (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

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
