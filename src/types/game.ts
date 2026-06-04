// Shared, UI-facing game types. Keep these free of React/DB imports so they can
// be used by the store, hooks, components, and (later) server code alike.

/** The lifecycle state of a single node on the Campaign Map skill tree. */
export type QuestNodeStatus = "locked" | "available" | "active" | "completed";

/** A lightweight snapshot of player stats used to evaluate achievement unlocks. */
export type PlayerStats = {
  xp: number;
  level: number;
  gold: number;
  streak: number;
  completedCount: number;
  completedIds: string[];
  // ── derived breadth (computed from completedIds against the curriculum) ──
  /** Distinct lesson languages the player has completed ≥1 lesson in (e.g. "js", "py"). */
  languages: string[];
  /** Slugs of modules the player has fully completed (every lesson). */
  completedModules: string[];
  /** Number of distinct modules the player has touched (≥1 lesson). */
  modulesTouched: number;
};

/** A grouping for the achievements case — drives the section headers in the UI. */
export type AchievementCategory =
  | "milestones"
  | "streaks"
  | "breadth"
  | "mastery"
  | "wealth"
  | "career"
  | "challenger"
  | "collector"
  | "speed"
  | "secret";

/**
 * An achievement definition. Definitions live in code (data-driven catalog); the
 * store only persists the set of unlocked ids. `check` is a pure predicate over
 * a stats snapshot so unlocks can be re-evaluated deterministically.
 */
export type Achievement = {
  id: string;
  title: string;
  description: string;
  /** Emoji glyph (cheap, theme-able, no asset pipeline needed yet). */
  icon: string;
  /** Rarity drives the badge color/glow in the UI. */
  rarity: "common" | "rare" | "epic" | "legendary";
  /** Which section of the case this badge lives in. Defaults to "milestones". */
  category?: AchievementCategory;
  /** Secret badges stay hidden (title/desc masked) until unlocked. */
  secret?: boolean;
  /** Bonus rewards granted on unlock. */
  rewardXp?: number;
  rewardGold?: number;
  check: (stats: PlayerStats) => boolean;
};
