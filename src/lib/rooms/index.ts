import type { Room, RoomTask } from "./types";
import { outputDetective } from "./output-detective";
import { regexForensics } from "./regex-forensics";
import { sqlInjection101 } from "./sql-injection-101";

// The whole rooms catalog. Add a room here and it shows up everywhere (catalog,
// static route, sitemap). Order = how the catalog reads top-to-bottom.
export const ROOMS: Room[] = [outputDetective, regexForensics, sqlInjection101];

export function getRoom(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

// Completion id stored in the game store's `completed[]`. The `room:` prefix
// keeps it from ever colliding with a lesson id ("moduleSlug/lessonSlug").
export function roomTaskId(roomSlug: string, taskSlug: string): string {
  return `room:${roomSlug}/${taskSlug}`;
}

export function roomXp(room: Room): number {
  return room.tasks.reduce((sum, t) => sum + t.xp, 0);
}

export function totalRooms(): number {
  return ROOMS.length;
}

// ── Flag checking ───────────────────────────────────────────────────────────

/** Trim and collapse runs of inner whitespace to a single space. */
function normalizeFlag(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

/** True if `submitted` matches the task's flag (or one of its accepted forms). */
export function checkFlag(task: RoomTask, submitted: string): boolean {
  const fold = (x: string) => {
    const n = normalizeFlag(x);
    return task.caseSensitive ? n : n.toLowerCase();
  };
  const target = fold(submitted);
  return [task.answer, ...(task.acceptable ?? [])].some((a) => fold(a) === target);
}

export type { Room, RoomTask, RoomDifficulty } from "./types";
