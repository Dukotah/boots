// ─────────────────────────────────────────────────────────────────────────────
// pairStreaks.ts — pure logic for bilateral Study Buddy pair streaks.
//
// A pair streak advances when BOTH learners were active on the same local day.
// The advance is checked client-side on friends page load; the result is
// persisted to the `study_buddies` Supabase table.
//
// Day-key format: the SAME `${year}-${month}-${date}` used throughout the rest
// of the app (see src/lib/daily.ts dayKeyOf / src/store/useGameStore.ts todayKey).
// We import the canonical helper so this module can never drift out of sync.
// ─────────────────────────────────────────────────────────────────────────────

export { dayKeyOf, todayDailyKey as todayKey } from "@/lib/daily";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PairStreakRow = {
  id: string;
  user_id: string;
  buddy_id: string;
  pair_streak: number;
  last_advanced: string | null; // day-key or null (never advanced yet)
  created_at: string;
};

export type AdvancePairStreakInput = {
  /** The current user's last_active_day from the profiles table (or null). */
  userLastActive: string | null;
  /** The buddy's last_active_day from the profiles table (or null). */
  buddyLastActive: string | null;
  /** Today's day-key (pass `todayKey()` from this module). */
  today: string;
  /** Current pair_streak value from the study_buddies row. */
  pairStreak: number;
  /** Current last_advanced value from the study_buddies row. */
  lastAdvanced: string | null;
};

export type AdvancePairStreakResult = {
  /** The new pair streak value (may be same, incremented, or 0). */
  pairStreak: number;
  /** The new last_advanced value. */
  lastAdvanced: string | null;
  /** True if the streak was incremented on this call. */
  advancedToday: boolean;
  /** True if both users have last_active_day === today (regardless of advance). */
  bothActiveToday: boolean;
};

// ── Core pure function ────────────────────────────────────────────────────────

/**
 * Compute the new pair streak state given both users' activity.
 *
 * Rules:
 *  - If both users were active today AND last_advanced !== today → increment
 *    pair_streak and set last_advanced = today.
 *  - If both users were active today AND last_advanced === today → no-op
 *    (already advanced; idempotent on repeated page loads).
 *  - If either user was NOT active today AND last_advanced !== today → check
 *    for a streak break: if last_advanced is null or yesterday, the pair was
 *    never consecutive so leave streak unchanged (still a "potential" first day).
 *    If last_advanced is older than yesterday → the pair missed a day together;
 *    reset pair_streak to 0 (gap detected).
 *
 * "Gap" definition: last_advanced is set only when both were active; if >1 day
 * has passed since last_advanced without another mutual-active day, the streak
 * resets. If last_advanced is null the pair is brand new and nothing resets.
 */
export function advancePairStreak({
  userLastActive,
  buddyLastActive,
  today,
  pairStreak,
  lastAdvanced,
}: AdvancePairStreakInput): AdvancePairStreakResult {
  const bothActiveToday =
    userLastActive === today && buddyLastActive === today;

  // Case 1: already advanced today — idempotent no-op.
  if (lastAdvanced === today) {
    return { pairStreak, lastAdvanced, advancedToday: false, bothActiveToday };
  }

  // Case 2: both active today and not yet advanced — increment.
  if (bothActiveToday) {
    return {
      pairStreak: pairStreak + 1,
      lastAdvanced: today,
      advancedToday: true,
      bothActiveToday: true,
    };
  }

  // Case 3: not both active today. Check whether the pair missed a day.
  // A "miss" is: last_advanced exists and is 2+ days in the past.
  // (If last_advanced is null, the pair never advanced yet — no streak to break.)
  if (lastAdvanced !== null) {
    const missedDays = daysBetween(lastAdvanced, today);
    if (missedDays > 1) {
      // Gap of 2+ days since last mutual-active day → reset.
      return {
        pairStreak: 0,
        lastAdvanced,
        advancedToday: false,
        bothActiveToday: false,
      };
    }
  }

  // Neither advanced nor broken — waiting on the other user today.
  return { pairStreak, lastAdvanced, advancedToday: false, bothActiveToday };
}

// ── Internal date helper ──────────────────────────────────────────────────────

/**
 * Number of calendar days from day-key `a` to day-key `b`.
 * Uses the same split-and-reconstruct approach as the store's `dayDiff`.
 * The day-key format is `${year}-${month0}-${date}` — month is 0-indexed so
 * `new Date(year, month, date)` reconstructs the correct local midnight.
 */
function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am, ad).getTime();
  const db = new Date(by, bm, bd).getTime();
  return Math.round((db - da) / 86_400_000);
}

// ── Small inline tests (run with: npx tsx src/lib/pairStreaks.ts) ─────────────
// Omitted from production bundle — only the exported functions are used by the
// friends page. These are here so you can paste-run them during development.
//
// Example assertions (pseudocode):
//   advancePairStreak({ userLastActive:"2026-5-7", buddyLastActive:"2026-5-7",
//     today:"2026-5-7", pairStreak:3, lastAdvanced:"2026-5-6" })
//   → { pairStreak:4, advancedToday:true, bothActiveToday:true }
//
//   advancePairStreak({ userLastActive:"2026-5-7", buddyLastActive:"2026-5-5",
//     today:"2026-5-7", pairStreak:3, lastAdvanced:"2026-5-5" })
//   → { pairStreak:0, advancedToday:false, bothActiveToday:false }  // gap reset
//
//   advancePairStreak({ userLastActive:"2026-5-7", buddyLastActive:"2026-5-6",
//     today:"2026-5-7", pairStreak:3, lastAdvanced:"2026-5-6" })
//   → { pairStreak:3, advancedToday:false, bothActiveToday:false }  // waiting on buddy
