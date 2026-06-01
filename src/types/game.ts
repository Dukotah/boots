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
};

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
  /** Bonus rewards granted on unlock. */
  rewardXp?: number;
  rewardGold?: number;
  check: (stats: PlayerStats) => boolean;
};
