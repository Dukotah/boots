// Per-track "Boss Fight" — a cumulative skills capstone for a curriculum track.
//
// This is DISTINCT from the weekly community boss (lib/boss.ts) and the guild
// co-op boss (lib/guildBoss.ts). Those are social, XP-driven HP bars. A *track
// boss* is a timed gauntlet: it pulls 3–5 already-existing auto-graded lessons
// from across a track and asks the learner to clear them all in one sitting.
//
// The whole thing reuses the existing execution path — every task is a real
// Lesson graded by lib/runner.ts (the JS Web Worker), so there is zero new
// execution infra. We deliberately pick JS/TS lessons so grading runs fully
// client-side with no WASM/Pyodide dependency.
//
// To keep this file decoupled from lesson-content drift, a boss references its
// tasks by slug (moduleSlug + lessonSlug). `resolveTrackBoss` looks those up in
// the live curriculum and silently drops any that no longer exist or aren't
// JS/TS-gradeable, so a curriculum edit can never crash the boss page.

import type { Lesson, Module } from "./types";
import { getLesson } from "./index";
import { lessonLanguage } from "./lang";
import { TRACK_BOSS_DEFS } from "./track-boss-defs";
import type { TrackBossDef, TrackBossTaskRef } from "./track-boss-defs";

export type { TrackBossTaskRef, TrackBossDef } from "./track-boss-defs";
export { TRACK_BOSS_DEFS } from "./track-boss-defs";

// ── Resolution ──────────────────────────────────────────────────────────────

/** A fully-resolved boss task: the static ref plus the live Lesson + Module. */
export type TrackBossTask = TrackBossTaskRef & {
  module: string;
  lesson: string;
  moduleObj: Module;
  lessonObj: Lesson;
  /** Effective language ("js" | "ts") — always client-side runnable. */
  language: "js" | "ts";
};

export type TrackBoss = Omit<TrackBossDef, "tasks"> & {
  tasks: TrackBossTask[];
};

/** Lessons we can grade fully client-side without WASM (no Pyodide / sql.js). */
function isClientGradeable(lesson: Lesson, module: Module): boolean {
  if (lesson.kind === "quiz") return false;
  if (!lesson.tests || lesson.tests.length === 0) return false;
  const lang = lessonLanguage(lesson, module);
  return lang === "js" || lang === "ts";
}

/**
 * Resolve a static boss definition into live curriculum objects. Returns
 * undefined if the boss id is unknown, or if fewer than 3 of its tasks resolve
 * to client-gradeable lessons (we never show a broken gauntlet).
 */
export function resolveTrackBoss(id: string): TrackBoss | undefined {
  const def = TRACK_BOSS_DEFS.find((b) => b.id === id);
  if (!def) return undefined;

  const tasks: TrackBossTask[] = [];
  for (const ref of def.tasks) {
    const found = getLesson(ref.module, ref.lesson);
    if (!found) continue;
    if (!isClientGradeable(found.lesson, found.module)) continue;
    const language = lessonLanguage(found.lesson, found.module) as "js" | "ts";
    tasks.push({
      module: ref.module,
      lesson: ref.lesson,
      moduleObj: found.module,
      lessonObj: found.lesson,
      language,
    });
  }

  if (tasks.length < 3) return undefined;
  return { ...def, tasks };
}

/** All bosses that currently resolve to a valid gauntlet. */
export function listTrackBosses(): TrackBoss[] {
  return TRACK_BOSS_DEFS.map((d) => resolveTrackBoss(d.id)).filter(
    (b): b is TrackBoss => Boolean(b),
  );
}

/** The boss for a curriculum track, if one exists and resolves. */
export function trackBossForTrack(trackId: string): TrackBoss | undefined {
  const def = TRACK_BOSS_DEFS.find((b) => b.trackId === trackId);
  return def ? resolveTrackBoss(def.id) : undefined;
}
