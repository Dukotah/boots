// Static, pure definitions for the per-track "Boss Fight" gauntlets.
//
// Deliberately free of any curriculum-content imports (no ./index, no lesson
// modules), so client components — like the /boss hub — can list the bosses
// (name, emoji, reward) WITHOUT dragging the entire ~140-module curriculum into
// their JS bundle. Resolution into live Lesson objects happens server-side in
// track-bosses.ts, which does import the curriculum.

/** A reference to one already-existing lesson used as a boss task. */
export type TrackBossTaskRef = {
  module: string;
  lesson: string;
};

/** Static definition of a track boss. Pure data — no curriculum objects. */
export type TrackBossDef = {
  /** URL slug — `/boss/track/<id>`. */
  id: string;
  /** Curriculum TrackId this boss caps off (used to find the entry point). */
  trackId: string;
  name: string;
  emoji: string;
  blurb: string;
  /** Seconds allowed for the whole gauntlet. */
  timeLimitSec: number;
  /** Gold awarded the first time the gauntlet is cleared (modest; XP stays with
   *  the underlying lessons, which award their own XP via completeLesson). */
  rewardGold: number;
  /** 3–5 lesson refs, in the order they should be fought. */
  tasks: TrackBossTaskRef[];
};

// ── Boss roster ───────────────────────────────────────────────────────────────
// Each task is a JS/TS lesson that already exists and is auto-graded. Slugs are
// the canonical `module/lesson` pairs from the curriculum.
export const TRACK_BOSS_DEFS: TrackBossDef[] = [
  {
    id: "javascript",
    trackId: "foundations",
    name: "The Syntax Wyrm",
    emoji: "🐉",
    blurb:
      "A beast woven from the core of JavaScript — variables, functions, loops, and objects. Clear every chamber to bring it down.",
    timeLimitSec: 15 * 60,
    rewardGold: 120,
    tasks: [
      { module: "javascript", lesson: "functions" },
      { module: "javascript", lesson: "arrays-loops" },
      { module: "javascript", lesson: "objects" },
      { module: "javascript", lesson: "fizzbuzz" },
      { module: "strings", lesson: "reverse-words" },
    ],
  },
  {
    id: "js-array-methods",
    trackId: "js-deep-dives",
    name: "The Higher-Order Hydra",
    emoji: "🦑",
    blurb:
      "Cut off one callback, two more appear. Master map, filter, reduce, and friends to sever every head.",
    timeLimitSec: 15 * 60,
    rewardGold: 140,
    tasks: [
      { module: "js-array-methods", lesson: "map" },
      { module: "js-array-methods", lesson: "filter" },
      { module: "js-array-methods", lesson: "reduce" },
      { module: "js-array-methods", lesson: "find-findindex" },
      { module: "js-array-methods", lesson: "chaining" },
    ],
  },
  {
    id: "algorithms",
    trackId: "interview",
    name: "The Big-O Behemoth",
    emoji: "👹",
    blurb:
      "It feeds on brute force. Out-think it with the classic algorithms that land the offer.",
    timeLimitSec: 20 * 60,
    rewardGold: 160,
    tasks: [
      { module: "algorithms", lesson: "binary-search" },
      { module: "algorithms", lesson: "two-sum" },
      { module: "algorithms", lesson: "fibonacci" },
      { module: "data-structures", lesson: "queue" },
    ],
  },
];
