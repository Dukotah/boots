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

import { MODULES, lessonId, type Lesson, type Module } from "@/lib/curriculum";

// ── Reward (a small, bounded gold faucet — see docs/economy.md) ──────────────
// Modest by design: at most DAILY_BONUS_GOLD per day, so it never rivals the
// chest/quest economy. The real pull is the streak, not the payout.
export const DAILY_BONUS_GOLD = 20;
export const DAILY_BONUS_XP = 15;

export type DailyPick = {
  module: Module;
  lesson: Lesson;
  /** "moduleSlug/lessonSlug" — the canonical completion id. */
  id: string;
  /** Deep link to the lesson. */
  href: string;
};

// Flat list of every lesson, built once. Order is stable (module order in
// index.ts → lesson order), so a given day key always maps to the same lesson.
const POOL = MODULES.flatMap((m) =>
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
    id: lessonId(module.slug, lesson.slug),
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
