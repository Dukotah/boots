"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---- date helpers (local-day based) ----
function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am, ad).getTime();
  const db = new Date(by, bm, bd).getTime();
  return Math.round((db - da) / 86_400_000);
}

export type ProgressState = {
  xp: number;
  // "moduleSlug/lessonSlug" of every completed lesson.
  completed: string[];
  streak: number;
  lastActiveDay: string | null;
  // transient: set when a completion crosses a level boundary, consumed by UI.
  lastLevelUp: number | null;

  isComplete: (id: string) => boolean;
  completeLesson: (id: string, xp: number) => { gainedXp: number; leveledUp: boolean };
  clearLevelUp: () => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      completed: [],
      streak: 0,
      lastActiveDay: null,
      lastLevelUp: null,

      isComplete: (id) => get().completed.includes(id),

      completeLesson: (id, xp) => {
        const state = get();
        const today = todayKey();

        // Streak: same day = no change, yesterday = +1, gap = reset to 1.
        let streak = state.streak;
        if (state.lastActiveDay === null) {
          streak = 1;
        } else {
          const diff = dayDiff(state.lastActiveDay, today);
          if (diff === 0) streak = state.streak || 1;
          else if (diff === 1) streak = state.streak + 1;
          else streak = 1;
        }

        // No double XP for re-completing, but still refresh the streak.
        if (state.completed.includes(id)) {
          set({ streak, lastActiveDay: today });
          return { gainedXp: 0, leveledUp: false };
        }

        const prevLevel = Math.floor(state.xp / 100) + 1;
        const newXp = state.xp + xp;
        const newLevel = Math.floor(newXp / 100) + 1;
        const leveledUp = newLevel > prevLevel;

        set({
          xp: newXp,
          completed: [...state.completed, id],
          streak,
          lastActiveDay: today,
          lastLevelUp: leveledUp ? newLevel : state.lastLevelUp,
        });

        return { gainedXp: xp, leveledUp };
      },

      clearLevelUp: () => set({ lastLevelUp: null }),

      reset: () =>
        set({
          xp: 0,
          completed: [],
          streak: 0,
          lastActiveDay: null,
          lastLevelUp: null,
        }),
    }),
    { name: "boots-progress" },
  ),
);
