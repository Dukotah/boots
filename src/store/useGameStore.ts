"use client";

// ─────────────────────────────────────────────────────────────────────────────
// useGameStore — the single source of truth for client-side game state.
//
// This is the RPG engine: XP, gold, levels (via the curve in lib/levels), streak,
// completed lessons, the active quest, and unlocked achievements. It supersedes
// the old `useProgress` store; every importer now points here.
//
// Persistence: localStorage via zustand/persist under the SAME key the old store
// used ("boots-progress"), so existing players keep their XP. New fields hydrate
// from defaults via `merge`. When Supabase auth lands, this store becomes the
// optimistic cache and a thin sync layer reconciles it with `user_progress`.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { levelFromXp } from "@/lib/levels";
import { newlyUnlocked, getAchievement } from "@/lib/achievements";
import type { PlayerStats } from "@/types/game";

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

/** Gold awarded alongside XP for a fresh lesson completion. Convenience currency. */
const GOLD_PER_XP = 0.5;

export type CompletionResult = {
  gainedXp: number;
  gainedGold: number;
  leveledUp: boolean;
  newLevel: number;
  unlockedAchievements: string[];
};

export type GameState = {
  // ── core resources ──
  xp: number;
  gold: number;
  // ── progress ──
  /** "moduleSlug/lessonSlug" of every completed lesson. */
  completed: string[];
  /** unlocked achievement ids (definitions live in lib/achievements). */
  achievements: string[];
  // ── streak ──
  streak: number;
  lastActiveDay: string | null;
  // ── active quest: the lesson the player is currently focused on ──
  activeQuest: string | null;
  // ── transient UI signals (not persisted) ──
  /** set when a completion crosses a level boundary; consumed by the level-up toast. */
  lastLevelUp: number | null;
  /** id of the most recently unlocked achievement; consumed by the achievement toast. */
  recentAchievement: string | null;

  // ── selectors ──
  isComplete: (id: string) => boolean;
  stats: () => PlayerStats;

  // ── actions ──
  completeLesson: (id: string, xp: number) => CompletionResult;
  setActiveQuest: (id: string | null) => void;
  addGold: (amount: number) => void;
  /** Returns false if the player can't afford it (state unchanged). */
  spendGold: (amount: number) => boolean;
  clearLevelUp: () => void;
  clearRecentAchievement: () => void;
  reset: () => void;
};

const INITIAL = {
  xp: 0,
  gold: 0,
  completed: [] as string[],
  achievements: [] as string[],
  streak: 0,
  lastActiveDay: null as string | null,
  activeQuest: null as string | null,
  lastLevelUp: null as number | null,
  recentAchievement: null as string | null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      isComplete: (id) => get().completed.includes(id),

      stats: () => {
        const s = get();
        return {
          xp: s.xp,
          level: levelFromXp(s.xp).level,
          gold: s.gold,
          streak: s.streak,
          completedCount: s.completed.length,
          completedIds: s.completed,
        };
      },

      completeLesson: (id, xp) => {
        const state = get();
        const today = todayKey();

        // Streak: same day = unchanged, yesterday = +1, gap = reset to 1.
        let streak = state.streak;
        if (state.lastActiveDay === null) {
          streak = 1;
        } else {
          const diff = dayDiff(state.lastActiveDay, today);
          if (diff === 0) streak = state.streak || 1;
          else if (diff === 1) streak = state.streak + 1;
          else streak = 1;
        }

        // Re-completing a lesson refreshes the streak but never re-awards rewards.
        if (state.completed.includes(id)) {
          set({ streak, lastActiveDay: today });
          // Streak change can itself trigger an achievement (e.g. Wildfire).
          const unlocked = grantAchievements(get, set);
          return {
            gainedXp: 0,
            gainedGold: 0,
            leveledUp: false,
            newLevel: levelFromXp(state.xp).level,
            unlockedAchievements: unlocked,
          };
        }

        const prevLevel = levelFromXp(state.xp).level;
        const newXp = state.xp + xp;
        const newLevel = levelFromXp(newXp).level;
        const leveledUp = newLevel > prevLevel;
        const gainedGold = Math.round(xp * GOLD_PER_XP);

        set({
          xp: newXp,
          gold: state.gold + gainedGold,
          completed: [...state.completed, id],
          streak,
          lastActiveDay: today,
          lastLevelUp: leveledUp ? newLevel : state.lastLevelUp,
          // Advancing clears the active quest if it was the one just finished.
          activeQuest: state.activeQuest === id ? null : state.activeQuest,
        });

        const unlockedAchievements = grantAchievements(get, set);

        return {
          gainedXp: xp,
          gainedGold,
          leveledUp,
          newLevel,
          unlockedAchievements,
        };
      },

      setActiveQuest: (id) => set({ activeQuest: id }),

      addGold: (amount) => set((s) => ({ gold: Math.max(0, s.gold + amount) })),

      spendGold: (amount) => {
        const { gold } = get();
        if (amount <= 0 || gold < amount) return false;
        set({ gold: gold - amount });
        return true;
      },

      clearLevelUp: () => set({ lastLevelUp: null }),
      clearRecentAchievement: () => set({ recentAchievement: null }),

      reset: () => set({ ...INITIAL }),
    }),
    {
      name: "boots-progress",
      version: 2,
      // Persist data only — never the transient toast signals or the action fns.
      partialize: (s) => ({
        xp: s.xp,
        gold: s.gold,
        completed: s.completed,
        achievements: s.achievements,
        streak: s.streak,
        lastActiveDay: s.lastActiveDay,
        activeQuest: s.activeQuest,
      }),
      // Old v1 stores only had {xp, completed, streak, lastActiveDay}; merge fills the rest.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<GameState>),
      }),
    },
  ),
);

/**
 * Evaluate the achievement catalog against current stats, persist any new unlocks
 * (plus their bonus rewards), and surface the newest one for the toast.
 * Returns the ids unlocked this call.
 */
function grantAchievements(
  get: () => GameState,
  set: (partial: Partial<GameState>) => void,
): string[] {
  const s = get();
  const stats: PlayerStats = {
    xp: s.xp,
    level: levelFromXp(s.xp).level,
    gold: s.gold,
    streak: s.streak,
    completedCount: s.completed.length,
    completedIds: s.completed,
  };

  const fresh = newlyUnlocked(stats, s.achievements);
  if (fresh.length === 0) return [];

  let bonusXp = 0;
  let bonusGold = 0;
  for (const id of fresh) {
    const def = getAchievement(id);
    bonusXp += def?.rewardXp ?? 0;
    bonusGold += def?.rewardGold ?? 0;
  }

  set({
    achievements: [...s.achievements, ...fresh],
    xp: s.xp + bonusXp,
    gold: s.gold + bonusGold,
    recentAchievement: fresh[fresh.length - 1],
  });

  return fresh;
}
