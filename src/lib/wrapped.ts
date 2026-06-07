// Cantrip Wrapped — pure, snapshot-driven. No side effects.
//
// Accepts the store state fields needed for an all-time-in-review summary and
// derives everything the Wrapped page needs in one place. Testable without React.
//
// Design: mirrors the pattern in lib/recap.ts — accept raw store slices, return
// a single typed payload, keep all derivation logic here so the page stays thin.

import { levelFromXp, RANKS } from "@/lib/levels";
import { languageName } from "@/lib/languages";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { SITE } from "@/lib/site";
import type { PlayerStats } from "@/types/game";

// ── Input shape ─────────────────────────────────────────────────────────────

export type WrappedInput = {
  /** Full PlayerStats snapshot (xp, gold, streak, completedCount, completedIds,
   *  languages, completedModules, modulesTouched). */
  stats: PlayerStats;
  /** All time active days (from store.activeDays). */
  activeDays: string[];
  /** All achievement ids the player has ever unlocked (from store.achievements). */
  achievements: string[];
  /** Boss ids whose defeat reward was claimed (from store.claimedBosses). */
  claimedBosses: string[];
  /** Best daily-challenge streak ever (from store.dailyChallengeBest). */
  dailyChallengeBest: number;
  /** Current streak (same as stats.streak, surfaced for convenience). */
  streak: number;
  /** All-time longest streak — the caller derives this from store.activeDays. */
  longestStreak: number;
};

// ── Output ──────────────────────────────────────────────────────────────────

export type WrappedStat = {
  label: string;
  value: string | number;
  sub?: string;
  /** Tailwind colour key. */
  tone?: "accent" | "gold" | "danger" | "success" | "default";
  /** Emoji icon for the stat. */
  icon: string;
};

export type WrappedData = {
  /** Whether the user has meaningful data (false = brand-new, show empty state). */
  hasData: boolean;
  // ── hero numbers ──
  totalXp: number;
  level: number;
  rankName: string;
  rankEmoji: string;
  gold: number;
  // ── lesson & course progress ──
  lessonsCompleted: number;
  coursesFinished: number;
  // ── streak ──
  currentStreak: number;
  longestStreak: number;
  // ── community / challenge ──
  bossesDefeated: number;
  achievementsUnlocked: number;
  activeDayCount: number;
  dailyChallengeBest: number;
  // ── breadth ──
  languages: string[]; // human display names
  languageCodes: string[]; // raw codes
  // ── RPG copy ──
  /** Big bold headline shown at the top of the hero card. */
  headline: string;
  /** 3–4 short stat lines with emoji, e.g. "⚔️ You slew 3 bosses". */
  statLines: string[];
  /** One-liner for the share sheet. */
  shareText: string;
  /** Flat stat cards for the grid. */
  stats: WrappedStat[];
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Derive the longest consecutive streak from an array of day-key strings
 * ("yyyy-m-d" format as produced by the store's todayKey helper). Returns 0 if
 * the array is empty.
 *
 * The store uses a non-ISO format: `${year}-${month}-${day}` where month is
 * 0-indexed (e.g. "2025-0-7" for Jan 7). We parse accordingly.
 */
export function longestStreakFromDays(activeDays: string[]): number {
  if (activeDays.length === 0) return 0;

  // Parse each day-key into a timestamp (midnight UTC-equivalent).
  const timestamps = activeDays
    .map((key) => {
      const [y, m, d] = key.split("-").map(Number);
      return new Date(y, m, d).getTime();
    })
    .sort((a, b) => a - b);

  const MS_PER_DAY = 86_400_000;
  let best = 1;
  let run = 1;

  for (let i = 1; i < timestamps.length; i++) {
    const diff = timestamps[i] - timestamps[i - 1];
    if (diff === MS_PER_DAY) {
      run++;
      if (run > best) best = run;
    } else if (diff > MS_PER_DAY) {
      run = 1;
    }
    // diff === 0 means duplicate day entries — skip (run unchanged)
  }

  return best;
}

// ── Headline copy ────────────────────────────────────────────────────────────

function pickHeadline(d: {
  level: number;
  rankName: string;
  lessonsCompleted: number;
  coursesFinished: number;
  bossesDefeated: number;
  longestStreak: number;
}): string {
  if (d.lessonsCompleted === 0) return "Your adventure begins now.";
  if (d.level >= 40) return `${d.rankName}. The code bends to your will.`;
  if (d.level >= 16) return `${d.rankName}. The dungeon fears your commit history.`;
  if (d.level >= 10) return `You leveled up to ${d.rankName}. The grind is working.`;
  if (d.bossesDefeated >= 3)
    return `${d.bossesDefeated} bosses. ${d.coursesFinished} courses. Zero mercy.`;
  if (d.longestStreak >= 30) return `${d.longestStreak} days without missing a session. That's a lifestyle.`;
  if (d.longestStreak >= 7)
    return `${d.longestStreak}-day streak at your peak. Consistency is your superpower.`;
  if (d.coursesFinished >= 3) return `${d.coursesFinished} courses down. You're building something real.`;
  return `${d.lessonsCompleted} lessons in. The Intern grind is real — keep going.`;
}

// ── Pure computation ─────────────────────────────────────────────────────────

/**
 * Build the full Wrapped payload from raw store slices. Pure — safe to call in
 * tests or server components without any React context.
 */
export function buildWrapped(input: WrappedInput): WrappedData {
  const {
    stats,
    activeDays,
    achievements,
    claimedBosses,
    dailyChallengeBest,
    streak,
    longestStreak,
  } = input;

  const info = levelFromXp(stats.xp);
  const hasData = stats.completedCount > 0 || stats.xp > 0;

  // Language display names (deduplicated, human-readable).
  const langNames = stats.languages.map(languageName);

  // Achievement metadata lookup.
  const byId = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

  // ── Stat lines (RPG flavour copy) ───────────────────────────────────────
  const statLines: string[] = [];

  if (stats.completedCount > 0) {
    statLines.push(
      `⚔️ You completed ${stats.completedCount} lesson${stats.completedCount !== 1 ? "s" : ""}`
    );
  }
  if (stats.gold > 0) {
    statLines.push(
      `🪙 You earned ${stats.gold.toLocaleString()} gold`
    );
  }
  if (claimedBosses.length > 0) {
    statLines.push(
      `👾 You slew ${claimedBosses.length} boss${claimedBosses.length !== 1 ? "es" : ""}`
    );
  }
  if (longestStreak >= 3) {
    statLines.push(`🔥 Your longest streak: ${longestStreak} day${longestStreak !== 1 ? "s" : ""}`);
  }
  if (achievements.length > 0) {
    statLines.push(
      `🏆 ${achievements.length} badge${achievements.length !== 1 ? "s" : ""} earned`
    );
  }
  if (langNames.length > 0) {
    statLines.push(`🧙 Languages mastered: ${langNames.join(", ")}`);
  }

  // Keep to a punchy 4.
  const trimmedLines = statLines.slice(0, 4);

  // ── Share text ───────────────────────────────────────────────────────────
  const streakPart =
    longestStreak >= 3 ? ` Best streak: ${longestStreak} days.` : "";
  const langPart = langNames.length
    ? ` Languages: ${langNames.join(", ")}.`
    : "";
  const shareText =
    `My ${SITE.name} Wrapped: Level ${info.level} ${info.rank.name}, ` +
    `${stats.xp.toLocaleString()} XP, ` +
    `${stats.completedCount} lessons, ` +
    `${stats.gold.toLocaleString()} gold.` +
    streakPart +
    langPart +
    ` ${SITE.url}/wrapped`;

  // ── Headline ─────────────────────────────────────────────────────────────
  const headline = pickHeadline({
    level: info.level,
    rankName: info.rank.name,
    lessonsCompleted: stats.completedCount,
    coursesFinished: stats.completedModules.length,
    bossesDefeated: claimedBosses.length,
    longestStreak,
  });

  // ── Grid stat cards ──────────────────────────────────────────────────────
  const statCards: WrappedStat[] = [
    {
      label: "Total XP",
      value: stats.xp.toLocaleString(),
      sub: `Level ${info.level}`,
      tone: "accent",
      icon: "⚡",
    },
    {
      label: "Gold earned",
      value: stats.gold.toLocaleString(),
      sub: "all time",
      tone: "gold",
      icon: "🪙",
    },
    {
      label: "Lessons done",
      value: stats.completedCount,
      sub: `${stats.completedModules.length} course${stats.completedModules.length !== 1 ? "s" : ""} finished`,
      tone: "success",
      icon: "📚",
    },
    {
      label: "Best streak",
      value: longestStreak,
      sub: `${streak} day${streak !== 1 ? "s" : ""} now`,
      tone: "danger",
      icon: "🔥",
    },
    {
      label: "Bosses slain",
      value: claimedBosses.length,
      sub: claimedBosses.length === 0 ? "undefeated so far" : "legendary kills",
      tone: "default",
      icon: "👾",
    },
    {
      label: "Badges",
      value: achievements.length,
      sub: "all time",
      tone: "default",
      icon: "🏆",
    },
    {
      label: "Active days",
      value: activeDays.length,
      sub: "days logged",
      tone: "default",
      icon: "📅",
    },
    {
      label: "Daily streak best",
      value: dailyChallengeBest,
      sub: "challenge streak",
      tone: "default",
      icon: "🎯",
    },
  ];

  return {
    hasData,
    totalXp: stats.xp,
    level: info.level,
    rankName: info.rank.name,
    rankEmoji: info.rank.emoji,
    gold: stats.gold,
    lessonsCompleted: stats.completedCount,
    coursesFinished: stats.completedModules.length,
    currentStreak: streak,
    longestStreak,
    bossesDefeated: claimedBosses.length,
    achievementsUnlocked: achievements.length,
    activeDayCount: activeDays.length,
    dailyChallengeBest,
    languages: langNames,
    languageCodes: stats.languages,
    headline,
    statLines: trimmedLines,
    shareText,
    stats: statCards,
  };
}
