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

// Deterministic rival field: fixed handles × a factor, scaled by the tier's base.
const RIVAL_SEEDS: { name: string; factor: number }[] = [
  { name: "ByteWizard", factor: 1.7 },
  { name: "NullPointer", factor: 1.45 },
  { name: "asyncAwaitlin", factor: 1.25 },
  { name: "RegexRanger", factor: 1.1 },
  { name: "SyntaxSelene", factor: 0.95 },
  { name: "loop_master", factor: 0.8 },
  { name: "PandasNotBears", factor: 0.65 },
  { name: "git_gud", factor: 0.5 },
  { name: "CamelCaseCarol", factor: 0.38 },
  { name: "semicolon;", factor: 0.25 },
];

export type WeeklyRow = {
  name: string;
  weeklyXp: number;
  /** Marks the local player so the UI can highlight their row. */
  isYou?: boolean;
};

/** The seeded rival field for a tier (deterministic, no real users). */
export function rivalField(tierIndex: number): WeeklyRow[] {
  const base = tierAt(tierIndex).rivalBase;
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
    ...rivalField(tierIndex),
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
