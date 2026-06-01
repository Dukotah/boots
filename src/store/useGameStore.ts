"use client";

// ─────────────────────────────────────────────────────────────────────────────
// useGameStore — the single source of truth for client-side game state.
//
// This is the RPG engine: XP, gold, levels (via the curve in lib/levels), streak,
// completed lessons, the active quest, and unlocked achievements.
//
// Persistence is two-layered:
//   1. localStorage (zustand/persist) — instant, offline, the optimistic cache.
//   2. Supabase `profiles` row — when configured AND signed in, every mutation
//      fires a background upsert; on sign-in we pull + merge so progress made
//      while logged out is never lost.
// The UI never waits on the network.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";
import { levelFromXp } from "@/lib/levels";
import { newlyUnlocked, getAchievement } from "@/lib/achievements";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
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

export type SyncStatus = "idle" | "syncing" | "error";

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
  completed: string[]; // "moduleSlug/lessonSlug"
  achievements: string[]; // unlocked achievement ids
  // ── streak ──
  streak: number;
  lastActiveDay: string | null;
  // ── active quest ──
  activeQuest: string | null;
  // ── transient UI signals (not persisted) ──
  lastLevelUp: number | null;
  recentAchievement: string | null;
  // ── auth / sync (not persisted) ──
  user: User | null;
  session: Session | null;
  syncStatus: SyncStatus;

  // ── selectors ──
  isComplete: (id: string) => boolean;
  stats: () => PlayerStats;

  // ── game actions ──
  completeLesson: (id: string, xp: number) => CompletionResult;
  setActiveQuest: (id: string | null) => void;
  addGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  clearLevelUp: () => void;
  clearRecentAchievement: () => void;
  reset: () => void;

  // ── auth actions (called from AuthProvider) ──
  setSession: (session: Session | null) => void;
  syncToServer: () => Promise<void>;
  pullFromServer: () => Promise<void>;
};

// Persisted game data only (auth + transient signals are excluded).
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

// ── Supabase sync helpers — the live snapshot lives on the profiles row ──

type ProfileSnapshot = {
  xp: number;
  gold: number;
  streak: number;
  last_active_day: string | null;
  completed: string[];
  achievements: string[];
  active_quest: string | null;
};

async function upsertProfile(userId: string, snap: ProfileSnapshot): Promise<void> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return;
  await sb.from("profiles").upsert({ id: userId, ...snap }, { onConflict: "id" });
}

async function fetchProfile(userId: string): Promise<ProfileSnapshot | null> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return null;
  const { data } = await sb
    .from("profiles")
    .select("xp, gold, streak, last_active_day, completed, achievements, active_quest")
    .eq("id", userId)
    .maybeSingle();
  return (data as ProfileSnapshot | null) ?? null;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      user: null,
      session: null,
      syncStatus: "idle" as SyncStatus,

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

        // Re-completing refreshes the streak but never re-awards rewards.
        if (state.completed.includes(id)) {
          set({ streak, lastActiveDay: today });
          const unlocked = grantAchievements(get, set);
          get().syncToServer();
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
          activeQuest: state.activeQuest === id ? null : state.activeQuest,
        });

        const unlockedAchievements = grantAchievements(get, set);
        get().syncToServer();

        return {
          gainedXp: xp,
          gainedGold,
          leveledUp,
          newLevel,
          unlockedAchievements,
        };
      },

      setActiveQuest: (id) => {
        set({ activeQuest: id });
        get().syncToServer();
      },

      addGold: (amount) => {
        set((s) => ({ gold: Math.max(0, s.gold + amount) }));
        get().syncToServer();
      },

      spendGold: (amount) => {
        const { gold } = get();
        if (amount <= 0 || gold < amount) return false;
        set({ gold: gold - amount });
        get().syncToServer();
        return true;
      },

      clearLevelUp: () => set({ lastLevelUp: null }),
      clearRecentAchievement: () => set({ recentAchievement: null }),

      reset: () => {
        set({ ...INITIAL });
        get().syncToServer();
      },

      // ── auth ──
      setSession: (session) => {
        set({ session, user: session?.user ?? null });
        if (session?.user) get().pullFromServer();
      },

      // Push local snapshot → Supabase (fire-and-forget, safe to call often).
      syncToServer: async () => {
        const s = get();
        if (!s.user || !isSupabaseConfigured) return;
        set({ syncStatus: "syncing" });
        try {
          await upsertProfile(s.user.id, {
            xp: s.xp,
            gold: s.gold,
            streak: s.streak,
            last_active_day: s.lastActiveDay,
            completed: s.completed,
            achievements: s.achievements,
            active_quest: s.activeQuest,
          });
          set({ syncStatus: "idle" });
        } catch {
          set({ syncStatus: "error" });
        }
      },

      // Pull server snapshot and merge (union) with local — used on sign-in.
      pullFromServer: async () => {
        const { user } = get();
        if (!user || !isSupabaseConfigured) return;
        const remote = await fetchProfile(user.id);
        if (!remote) {
          get().syncToServer(); // no row yet → seed it with local
          return;
        }
        const local = get();
        set({
          xp: Math.max(local.xp, remote.xp ?? 0),
          gold: Math.max(local.gold, remote.gold ?? 0),
          streak: Math.max(local.streak, remote.streak ?? 0),
          completed: Array.from(new Set([...local.completed, ...(remote.completed ?? [])])),
          achievements: Array.from(
            new Set([...local.achievements, ...(remote.achievements ?? [])]),
          ),
          lastActiveDay: local.lastActiveDay ?? remote.last_active_day,
          activeQuest: local.activeQuest ?? remote.active_quest,
        });
        get().syncToServer(); // push the merged result back
      },
    }),
    {
      name: "boots-progress",
      version: 2,
      // Persist data only — never the transient toast signals, auth, or action fns.
      partialize: (s) => ({
        xp: s.xp,
        gold: s.gold,
        completed: s.completed,
        achievements: s.achievements,
        streak: s.streak,
        lastActiveDay: s.lastActiveDay,
        activeQuest: s.activeQuest,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<GameState>),
      }),
    },
  ),
);

/**
 * Evaluate the achievement catalog against current stats, persist any new unlocks
 * (plus bonus rewards), and surface the newest one for the toast.
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
