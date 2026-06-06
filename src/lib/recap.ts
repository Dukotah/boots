// Weekly recap — pure, snapshot-driven. No side effects.
//
// Accepts the three selector snapshots the store exposes (weekly(), season(),
// stats()) plus the raw achievements array, and derives everything the recap
// card needs in one place. Testable without React.

import { LEAGUE_TIERS, tierAt, SEASON_DAYS } from "@/lib/leagues";
import { levelFromXp } from "@/lib/levels";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { SITE } from "@/lib/site";
import type { PlayerStats } from "@/types/game";

// ── Input shape (mirrors store selector return types) ──────────────────────

export type WeeklySnap = {
  xp: number;
  lessons: number;
  streak: number;
};

export type SeasonSnap = {
  tier: number;
  daysLeft: number;
  weeklyXp: number;
};

export type RecapInput = {
  weekly: WeeklySnap;
  season: SeasonSnap;
  stats: PlayerStats;
  /** All achievement ids the player has ever unlocked (from store.achievements). */
  achievements: string[];
  /**
   * Achievement ids that were newly earned THIS season / within the recap window.
   * The caller computes this by diffing the snapshot against a prior baseline;
   * if unknown, pass [] — the card simply won't show a "this week" highlight.
   */
  newAchievements?: string[];
};

// ── Output ─────────────────────────────────────────────────────────────────

export type RecapStat = {
  label: string;
  value: string | number;
  sub?: string;
  tone?: "accent" | "gold" | "danger" | "success" | "default";
};

export type RecapData = {
  /** XP earned in the current season (weeklyXp). */
  weeklyXp: number;
  /** Lessons completed this season. */
  weeklyLessons: number;
  /** Current login streak. */
  streak: number;
  /** League tier index (0 = Bronze … 4 = Diamond). */
  leagueTier: number;
  /** Human-readable tier name (e.g. "Silver"). */
  leagueName: string;
  /** Tier emoji for display. */
  leagueEmoji: string;
  /** Calendar days remaining in the current season (0–7). */
  daysLeft: number;
  /** Current level derived from totalXp. */
  level: number;
  /** Rank name (e.g. "Senior Dev"). */
  rankName: string;
  /** Total achievements ever unlocked. */
  achievementCount: number;
  /** Achievement ids (with metadata) unlocked this recap window, if provided. */
  newAchievements: { id: string; title: string; icon: string }[];
  /** Flat stats for the grid cards. */
  stats: RecapStat[];
  /** A ready-to-share one-liner. */
  shareText: string;
};

// ── Pure computation ───────────────────────────────────────────────────────

/**
 * Compute the full recap payload from store snapshots. Pure — safe to call in
 * tests or server components without any React context.
 */
export function computeRecap(input: RecapInput): RecapData {
  const { weekly, season, stats, achievements, newAchievements = [] } = input;

  const tier = tierAt(season.tier);
  const levelInfo = levelFromXp(stats.xp);

  // Resolve newly-earned achievement metadata.
  const byId = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));
  const freshAchievements = newAchievements
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((a) => ({ id: a!.id, title: a!.title, icon: a!.icon }));

  // ── Grid stat cards ─────────────────────────────────────────────────────
  const statCards: RecapStat[] = [
    {
      label: "XP this season",
      value: weekly.xp.toLocaleString(),
      sub: `out of ${SEASON_DAYS} days`,
      tone: "accent",
    },
    {
      label: "Lessons",
      value: weekly.lessons,
      sub: "this season",
      tone: "success",
    },
    {
      label: "Streak",
      value: stats.streak,
      sub: stats.streak === 1 ? "day" : "days",
      tone: "danger",
    },
    {
      label: "League",
      value: `${tier.emoji} ${tier.name}`,
      sub: `${season.daysLeft}d left`,
      tone: "gold",
    },
    {
      label: "Level",
      value: levelInfo.level,
      sub: levelInfo.rank.name,
      tone: "default",
    },
    {
      label: "Badges",
      value: achievements.length,
      sub: freshAchievements.length > 0
        ? `+${freshAchievements.length} this week`
        : "total",
      tone: "default",
    },
  ];

  // ── Shareable text ──────────────────────────────────────────────────────
  const streakPart =
    stats.streak >= 3 ? ` ${stats.streak}-day streak.` : "";
  const shareText =
    `My week on ${SITE.name}: ${weekly.xp} XP, ` +
    `${weekly.lessons} lesson${weekly.lessons !== 1 ? "s" : ""}, ` +
    `${tier.emoji} ${tier.name} League.${streakPart} ` +
    `Learn to code at ${SITE.url}/recap`;

  return {
    weeklyXp: weekly.xp,
    weeklyLessons: weekly.lessons,
    streak: stats.streak,
    leagueTier: season.tier,
    leagueName: tier.name,
    leagueEmoji: tier.emoji,
    daysLeft: season.daysLeft,
    level: levelInfo.level,
    rankName: levelInfo.rank.name,
    achievementCount: achievements.length,
    newAchievements: freshAchievements,
    stats: statCards,
    shareText,
  };
}

// ── League tier display helpers ────────────────────────────────────────────

/** All tier names in ascending order (Bronze … Diamond). */
export const TIER_NAMES = LEAGUE_TIERS.map((t) => t.name);

/** Tailwind text-color class for a tier index. */
export function tierColor(index: number): string {
  return tierAt(index).color;
}
