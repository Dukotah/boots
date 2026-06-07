// Daily Challenge — the "problem of the day" re-engagement loop (LeetCode /
// Brilliant pattern). Everyone gets the SAME lesson on a given local day, it
// rotates daily, and clearing it pays a small bonus on top of the lesson's
// normal XP. Clearing it on consecutive days builds a separate daily-challenge
// streak — a second, lighter habit surface alongside the main login streak.
//
// Pure + deterministic: the pick is a hash of the day key, so the store, the
// dashboard card, and the /daily page all independently resolve to the exact
// same lesson without any shared state. No server, no migration — the claim
// state rides along in the localStorage-persisted store, same as goals/onboarding.

import {
  CATALOG,
  type CatalogLesson,
  type CatalogModule,
} from "@/lib/curriculum/catalogClient";

// ── Reward (a small, bounded gold faucet — see docs/economy.md) ──────────────
// Modest by design: at most DAILY_BONUS_GOLD per day, so it never rivals the
// chest/quest economy. The real pull is the streak, not the payout.
export const DAILY_BONUS_GOLD = 20;
export const DAILY_BONUS_XP = 15;

export type DailyPick = {
  module: CatalogModule;
  lesson: CatalogLesson;
  /** "moduleSlug/lessonSlug" — the canonical completion id. */
  id: string;
  /** Deep link to the lesson. */
  href: string;
};

// Flat list of every lesson, built once. Order is stable (module order in
// index.ts → lesson order), so a given day key always maps to the same lesson.
const POOL = CATALOG.flatMap((m) =>
  m.lessons.map((lesson) => ({ module: m, lesson })),
);

// 32-bit FNV-1a — small, fast, well-distributed string hash. Same primitive the
// experiments bucketer uses; kept local so daily doesn't depend on that module.
function fnv1a32(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Local-day key in the SAME format the store uses (`${year}-${month}-${date}`),
 * so daily-challenge streak math lines up with the rest of the date helpers.
 */
export function dayKeyOf(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Today's local-day key. */
export function todayDailyKey(): string {
  return dayKeyOf(new Date());
}

/** Deterministically resolve the challenge lesson for a given day key. */
export function pickDaily(dayKey: string): DailyPick {
  const { module, lesson } = POOL[fnv1a32(dayKey) % POOL.length];
  return {
    module,
    lesson,
    id: lesson.id,
    href: `/learn/${module.slug}/${lesson.slug}`,
  };
}

/** The last `n` days' picks (most recent first), for the recent-history strip. */
export function recentDailyPicks(
  n: number,
  from: Date = new Date(),
): { dayKey: string; offset: number; pick: DailyPick }[] {
  const out: { dayKey: string; offset: number; pick: DailyPick }[] = [];
  for (let offset = 0; offset < n; offset++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() - offset);
    const dayKey = dayKeyOf(d);
    out.push({ dayKey, offset, pick: pickDaily(dayKey) });
  }
  return out;
}

/** Share copy for the social-share button (no PII — safe to post). */
export function dailyShareText(streak: number): string {
  const flame = streak > 0 ? ` 🔥${streak}-day streak` : "";
  return `I cleared today's coding Challenge of the Day on Cantrip!${flame} Come solve it: `;
}

// ── Derived metadata (additive — does not touch existing exports) ─────────────

export type DailyDifficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type DailyMeta = {
  /** Human-readable difficulty derived from lesson XP. */
  difficulty: DailyDifficulty;
  /** Tailwind colour class pair for the difficulty badge background/text. */
  difficultyColor: string;
  /** Tech-topic tags derived from module language + keywords (max 3, deduplicated). */
  tags: string[];
  /** Rough time estimate in minutes (scales with XP/complexity). */
  estimatedMinutes: number;
};

// XP thresholds are intentionally generous — the goal is a quick at-a-glance
// signal, not a rigorous difficulty scoring system.
function xpToDifficulty(xp: number): DailyDifficulty {
  if (xp <= 20) return "Beginner";
  if (xp <= 35) return "Intermediate";
  if (xp <= 50) return "Advanced";
  return "Expert";
}

const DIFFICULTY_COLORS: Record<DailyDifficulty, string> = {
  Beginner: "bg-green-500/15 text-green-400",
  Intermediate: "bg-blue-500/15 text-blue-400",
  Advanced: "bg-amber-500/15 text-amber-400",
  Expert: "bg-red-500/15 text-red-400",
};

// Canonical display names for the language enum.
const LANGUAGE_LABELS: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  sql: "SQL",
  html: "HTML",
};

/**
 * Derive display metadata (difficulty, tags, time) from a DailyPick.
 * All logic is pure/local — no network, no store.
 */
export function deriveDailyMeta(pick: DailyPick): DailyMeta {
  const difficulty = xpToDifficulty(pick.lesson.xp);
  const difficultyColor = DIFFICULTY_COLORS[difficulty];

  // Build tag list: lesson language → module language → keyword slice.
  const rawTags: string[] = [];
  const lang = pick.lesson.language ?? pick.module.language ?? "js";
  rawTags.push(LANGUAGE_LABELS[lang] ?? lang.toUpperCase());
  // Add up to 2 module keywords (first two, short-ish ones look best in badges).
  const kw = (pick.module.keywords ?? [])
    .slice(0, 4)
    .map((k) => {
      // Strip filler phrases like "learn X", "how to X" to get the topic word.
      return k.replace(/^(learn|how to|intro to|introduction to)\s+/i, "").trim();
    })
    .filter((k) => k.length > 0 && k.length <= 24);
  for (const k of kw) {
    if (rawTags.length >= 3) break;
    const normalised = k.charAt(0).toUpperCase() + k.slice(1);
    if (!rawTags.some((t) => t.toLowerCase() === normalised.toLowerCase())) {
      rawTags.push(normalised);
    }
  }

  // Estimated time: base 5 min, +1 min per 5 XP above 15, capped at 25.
  const estimatedMinutes = Math.min(25, Math.max(5, 5 + Math.round((pick.lesson.xp - 15) / 5)));

  return { difficulty, difficultyColor, tags: rawTags, estimatedMinutes };
}

// ── Streak milestone messaging ────────────────────────────────────────────────

/**
 * Return milestone copy for notable streaks, or `null` for plain streaks.
 * The component renders a plain "{n}-day streak" label when this returns null.
 */
export function streakMilestoneMessage(streak: number): string | null {
  if (streak === 3) return "3 days in a row — you're building a habit! 🌱";
  if (streak === 7) return "One full week! You're on fire 🔥";
  if (streak === 14) return "Two weeks strong — nothing stops you now 💪";
  if (streak === 30) return "30-day streak! Legendary dedication 🏆";
  if (streak === 50) return "50 days! You're practically a wizard 🧙";
  if (streak === 100) return "100 days. You are the streak. 👑";
  if (streak > 100 && streak % 50 === 0) return `${streak} days. Truly archmage tier. 👑`;
  return null;
}

// ── Richer share text ─────────────────────────────────────────────────────────

/**
 * Stronger share string that includes the lesson title + tech tag.
 * Preserves the original `dailyShareText` for backward-compat with unit tests.
 */
export function richDailyShareText(
  streak: number,
  pick: DailyPick,
  meta: DailyMeta,
): string {
  const tag = meta.tags[0] ?? "coding";
  const milestoneOrFlame =
    streak >= 3
      ? ` 🔥 ${streak}-day streak`
      : streak > 0
        ? ` 🔥${streak}-day streak`
        : "";
  return (
    `I just solved "${pick.lesson.title}" (${tag} · ${meta.difficulty}) ` +
    `on Cantrip's Challenge of the Day!${milestoneOrFlame} ` +
    `Come beat it: `
  );
}
