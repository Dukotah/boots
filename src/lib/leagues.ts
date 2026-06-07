// The competitive ladder: tiered, 7-day seasons with promotion/relegation.
//
// This is the *weekly* counterpart to the all-time board in lib/leaderboard.ts.
// Players compete on XP earned *this season*; the top finishers are promoted to
// the next tier and the bottom finishers are relegated — Duolingo's league loop,
// the highest-retention mechanic in learning apps.
//
// Pure + deterministic so the same inputs always map to the same standings, on
// the client now and (later) server-side. The rival field is seeded (no real
// users) and scales its XP per tier so each promotion genuinely feels harder.
//
// POOL SEGMENTATION
// ─────────────────
// Instead of one fixed tier-wide field, each player is placed into an
// activity-matched cohort whose XP is centered near the player's own weeklyXp.
// This means mid-tier learners compete against similarly-active peers, so
// promotion/relegation always feel winnable rather than hopeless or trivial.
//
// cohortBase = clamp(playerXp, tierMin, tierMax)
//   where tierMin = rivalBase * 0.20  (floor — avoids 0-XP ghost pools)
//         tierMax = rivalBase * 1.90  (ceiling — avoids escaping the tier)
//
// The 10 fixed rival handles retain their relative-effort ordering (factors
// 1.7 → 0.25 around the cohortBase), so the field always has a realistic
// distribution above and below the player. "You" land near the median,
// giving a genuine shot at top-3 (promote) or bottom-3 risk (relegate).
//
// Economy invariants: weeklyXp is read-only here; gold/XP/level are untouched.

export const SEASON_DAYS = 7;
/** Top N of the field are promoted at season end. */
export const PROMOTE_COUNT = 3;
/** Bottom N of the field are relegated (never below Bronze). */
export const RELEGATE_COUNT = 3;

export type LeagueTier = {
  name: string;
  emoji: string;
  /** Tailwind text color for the tier accent. */
  color: string;
  /** Median weekly XP the rival field competes at — scales the challenge per tier. */
  rivalBase: number;
};

export const LEAGUE_TIERS: LeagueTier[] = [
  { name: "Bronze", emoji: "🥉", color: "text-amber-500", rivalBase: 150 },
  { name: "Silver", emoji: "🥈", color: "text-gray-300", rivalBase: 350 },
  { name: "Gold", emoji: "🥇", color: "text-yellow-400", rivalBase: 600 },
  { name: "Platinum", emoji: "🛡️", color: "text-cyan-300", rivalBase: 1000 },
  { name: "Diamond", emoji: "💎", color: "text-sky-300", rivalBase: 1600 },
];

export const TOP_TIER = LEAGUE_TIERS.length - 1;

export function tierAt(index: number): LeagueTier {
  return LEAGUE_TIERS[Math.max(0, Math.min(TOP_TIER, index))];
}

// Deterministic rival handles with relative-effort factors.
// Factors are evenly distributed above (>1) and below (<1) 1.0 so that when
// the cohortBase equals the player's XP, roughly half the field is above and
// half below — mid-pack placement by design.
const RIVAL_SEEDS: { name: string; factor: number }[] = [
  { name: "ByteWizard",      factor: 1.70 },
  { name: "NullPointer",     factor: 1.45 },
  { name: "asyncAwaitlin",   factor: 1.25 },
  { name: "RegexRanger",     factor: 1.10 },
  { name: "SyntaxSelene",    factor: 0.95 },
  { name: "loop_master",     factor: 0.80 },
  { name: "PandasNotBears",  factor: 0.65 },
  { name: "git_gud",         factor: 0.50 },
  { name: "CamelCaseCarol",  factor: 0.38 },
  { name: "semicolon;",      factor: 0.25 },
];

export type WeeklyRow = {
  name: string;
  weeklyXp: number;
  /** Marks the local player so the UI can highlight their row. */
  isYou?: boolean;
};

// ── Pool-segmentation constants ───────────────────────────────────────────────
/** Cohort center floor: at least 20% of the tier's rivalBase so pools are never degenerate. */
const COHORT_FLOOR_RATIO = 0.20;
/** Cohort center ceiling: cap at 190% so high-activity players don't escape the tier shape. */
const COHORT_CEIL_RATIO  = 1.90;

/**
 * Derive the cohort base for a player.
 *
 * The returned value is clamped between [rivalBase × 0.20, rivalBase × 1.90]
 * so the rival field always has a realistic spread — even when the player
 * has earned 0 XP this week (floor prevents an all-zero ghost pool) or is
 * extremely active (ceiling keeps the top rival from inflating past 3.2× base).
 *
 * Pure + deterministic: same (weeklyXp, tierIndex) → same cohortBase every time.
 */
export function cohortBase(weeklyXp: number, tierIndex: number): number {
  const base = tierAt(tierIndex).rivalBase;
  const floor = Math.round(base * COHORT_FLOOR_RATIO);
  const ceil  = Math.round(base * COHORT_CEIL_RATIO);
  return Math.max(floor, Math.min(ceil, weeklyXp));
}

/**
 * Compute the activity percentile label for the player within their cohort.
 * Percentile is determined by how many of the 10 rival seeds the player beats.
 * Returns a human-readable string surfaced in the UI ("Top 30 %", etc.).
 */
export function cohortPercentile(weeklyXp: number, tierIndex: number): string {
  const base = cohortBase(weeklyXp, tierIndex);
  // Count how many rivals the player would beat at their current XP.
  const beatenCount = RIVAL_SEEDS.filter(
    (r) => weeklyXp > Math.round(base * r.factor),
  ).length;
  // beatenCount ∈ [0, 10]; express as percentile out of 11 total (10 rivals + you).
  const pct = Math.round((beatenCount / RIVAL_SEEDS.length) * 100);
  if (pct >= 90) return "Top 10%";
  if (pct >= 70) return "Top 30%";
  if (pct >= 50) return "Top 50%";
  if (pct >= 30) return "Bottom 50%";
  return "Bottom 30%";
}

/**
 * The activity-matched cohort label shown in the UI.
 * Bucketed by the player's cohortBase relative to rivalBase so players can see
 * which segment they are in without exposing raw numbers.
 */
export function cohortLabel(weeklyXp: number, tierIndex: number): string {
  const base = tierAt(tierIndex).rivalBase;
  const cb = cohortBase(weeklyXp, tierIndex);
  const ratio = cb / base;
  if (ratio >= 1.40) return "Elite";
  if (ratio >= 0.90) return "Active";
  if (ratio >= 0.50) return "Developing";
  return "Starter";
}

/**
 * The seeded rival field for a tier, segmented around the player's activity.
 *
 * When weeklyXp is undefined (legacy / Supabase real-field path), falls back
 * to the old tier-median behavior so external callers are unaffected.
 */
export function rivalField(tierIndex: number, weeklyXp?: number): WeeklyRow[] {
  const base =
    weeklyXp !== undefined
      ? cohortBase(weeklyXp, tierIndex)
      : tierAt(tierIndex).rivalBase;
  return RIVAL_SEEDS.map((r) => ({
    name: r.name,
    weeklyXp: Math.round(base * r.factor),
  }));
}

export type Zone = "promote" | "relegate" | "hold";

export type RankedWeeklyRow = WeeklyRow & {
  rank: number;
  zone: Zone;
};

/** Sort a field by weekly XP desc and annotate rank + promotion/relegation zone. */
export function rankSeason(
  field: WeeklyRow[],
  tierIndex: number,
): RankedWeeklyRow[] {
  const sorted = [...field].sort((a, b) => b.weeklyXp - a.weeklyXp);
  const n = sorted.length;
  return sorted.map((row, i) => {
    const rank = i + 1;
    let zone: Zone = "hold";
    if (rank <= PROMOTE_COUNT && tierIndex < TOP_TIER) zone = "promote";
    else if (rank > n - RELEGATE_COUNT && tierIndex > 0) zone = "relegate";
    return { ...row, rank, zone };
  });
}

/** Field for the current season with the player dropped in, ranked. */
export function seasonStandings(
  weeklyXp: number,
  tierIndex: number,
): RankedWeeklyRow[] {
  const withYou: WeeklyRow[] = [
    ...rivalField(tierIndex, weeklyXp),
    { name: "You", weeklyXp, isYou: true },
  ];
  return rankSeason(withYou, tierIndex);
}

export type SeasonOutcome = "promoted" | "relegated" | "held";

export type SeasonResult = {
  fromTier: number;
  toTier: number;
  outcome: SeasonOutcome;
  rank: number;
  weeklyXp: number;
};

/**
 * Resolve a finished season: rank the player against the tier field and
 * promote/relegate accordingly. Pure — the store persists the result + new tier.
 */
export function resolveSeason(weeklyXp: number, tierIndex: number): SeasonResult {
  const you = seasonStandings(weeklyXp, tierIndex).find((r) => r.isYou)!;
  let toTier = tierIndex;
  let outcome: SeasonOutcome = "held";
  if (you.zone === "promote") {
    toTier = Math.min(TOP_TIER, tierIndex + 1);
    outcome = "promoted";
  } else if (you.zone === "relegate") {
    toTier = Math.max(0, tierIndex - 1);
    outcome = "relegated";
  }
  return { fromTier: tierIndex, toTier, outcome, rank: you.rank, weeklyXp };
}
