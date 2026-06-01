// Leaderboard data + helpers. When Supabase is configured we rank real profiles
// by XP; until then (and to keep the board lively) we seed a weekly "league" with
// plausible rivals and drop the local player into the standings. Pure + testable.
import { levelFromXp } from "./levels";

export type LeaderRow = {
  name: string;
  xp: number;
  /** Marks the signed-in/local player so the UI can highlight their row. */
  isYou?: boolean;
};

export type RankedRow = LeaderRow & {
  rank: number;
  level: number;
  rankName: string;
  rankEmoji: string;
};

// A believable Bronze-league field. Names only — no real users.
export const DEMO_LEAGUE: LeaderRow[] = [
  { name: "ByteWizard", xp: 1240 },
  { name: "NullPointer", xp: 980 },
  { name: "asyncAwaitlin", xp: 870 },
  { name: "RegexRanger", xp: 760 },
  { name: "SyntaxSeleneΩ", xp: 640 },
  { name: "loop_master", xp: 520 },
  { name: "PandasNotBears", xp: 430 },
  { name: "git_gud", xp: 360 },
  { name: "CamelCaseCarol", xp: 240 },
  { name: "semicolon;", xp: 120 },
];

/** Merge the player into a field, sort by XP desc, and annotate rank + level. */
export function rankLeaderboard(field: LeaderRow[]): RankedRow[] {
  return [...field]
    .sort((a, b) => b.xp - a.xp)
    .map((row, i) => {
      const info = levelFromXp(row.xp);
      return {
        ...row,
        rank: i + 1,
        level: info.level,
        rankName: info.rank.name,
        rankEmoji: info.rank.emoji,
      };
    });
}
