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

// ─── Language / track filter helpers ───────────────────────────────────────

/**
 * The display labels for the language filter dropdown. Each value is a prefix
 * that matches the relevant module slugs in `completed[]`.
 * "all" means no filter applied.
 */
export type LanguageFilter =
  | "all"
  | "javascript"
  | "python"
  | "sql"
  | "react"
  | "typescript"
  | "algorithms"
  | "ai";

export const LANGUAGE_FILTER_OPTIONS: { value: LanguageFilter; label: string }[] = [
  { value: "all", label: "All languages" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "react", label: "React" },
  { value: "algorithms", label: "Algorithms" },
  { value: "ai", label: "AI & LLMs" },
];

/**
 * Module slug prefixes that count toward each language bucket.
 * A completed lesson id looks like "moduleSlug/lessonSlug", so we check the
 * module part (before the "/") against these prefixes.
 */
const LANGUAGE_MODULE_PREFIXES: Record<LanguageFilter, string[]> = {
  all: [],
  javascript: ["javascript", "javascript-next", "strings", "functional", "oop", "closures", "recursion", "regex", "error-handling", "json", "collections", "async", "math", "js-array-methods", "js-generators", "js-proxy-reflect", "fp-composition"],
  typescript: ["typescript", "ts-generics", "ts-mapped"],
  python: ["python"],
  sql: ["sql", "db-"],
  react: ["react"],
  algorithms: ["algorithms", "data-structures", "dynamic-programming", "interview", "sliding-window", "greedy", "graphs-js", "heaps-priority", "big-o", "number-"],
  ai: ["ai-llms", "prompt-engineering", "ai-apps", "ai-agents", "ai-embeddings", "ai-ethics", "ml-model", "decision-trees"],
};

/**
 * Returns true if the player's completed array includes at least one lesson
 * from the given language bucket.
 */
export function matchesLanguageFilter(
  completed: string[],
  filter: LanguageFilter,
): boolean {
  if (filter === "all") return true;
  const prefixes = LANGUAGE_MODULE_PREFIXES[filter];
  return completed.some((lessonId) => {
    const moduleSlug = lessonId.split("/")[0];
    return prefixes.some((p) => moduleSlug.startsWith(p));
  });
}

// ─── Scope filter ──────────────────────────────────────────────────────────

export type ScopeFilter = "global" | "friends" | "guild";

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
