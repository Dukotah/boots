"use client";

/**
 * useGameStore – drop-in replacement for the original useProgress store.
 *
 * Strategy
 * --------
 * 1.  All state lives in Zustand + localStorage (optimistic local cache).
 *     The UI never waits for the network.
 * 2.  When Supabase is configured AND a user is signed in, every mutation
 *     also triggers a background sync to user_progress (upsert).
 * 3.  On sign-in we pull the server row and merge it with local state so
 *     progress made while logged-out is never lost (we take the union of
 *     completed lessons and the higher XP/streak).
 *
 * The store is a superset of the old ProgressState so existing components
 * that import { useProgress } continue to work – just re-export the hook
 * at the bottom as the canonical name.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "./supabase";

// ---- date helpers (copied from progress.ts to avoid circular import) -------
function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round(
    (new Date(by, bm, bd).getTime() - new Date(ay, am, ad).getTime()) /
      86_400_000
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GameState = {
  // --- progress (persisted locally) ---
  xp: number;
  completed: string[]; // "moduleSlug/lessonSlug"
  streak: number;
  lastActiveDay: string | null;
  lastLevelUp: number | null;

  // --- auth ---
  user: User | null;
  session: Session | null;
  syncStatus: "idle" | "syncing" | "error";

  // --- actions ---
  isComplete: (id: string) => boolean;
  completeLesson: (
    id: string,
    xp: number
  ) => { gainedXp: number; leveledUp: boolean };
  clearLevelUp: () => void;
  reset: () => void;

  // auth helpers (called from AuthProvider)
  setSession: (session: Session | null) => void;
  syncToServer: () => Promise<void>;
  pullFromServer: () => Promise<void>;
};

// ---------------------------------------------------------------------------
// Server sync helpers
// ---------------------------------------------------------------------------

type ProgressRow = {
  user_id: string;
  xp: number;
  streak: number;
  last_active_day: string | null;
  completed: string[];
};

async function upsertProgress(row: ProgressRow): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("user_progress").upsert(
    {
      user_id: row.user_id,
      xp: row.xp,
      streak: row.streak,
      last_active_day: row.last_active_day,
      completed: row.completed,
    },
    { onConflict: "user_id" }
  );
}

async function fetchProgress(userId: string): Promise<ProgressRow | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return data as ProgressRow | null;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // --- initial state ---
      xp: 0,
      completed: [],
      streak: 0,
      lastActiveDay: null,
      lastLevelUp: null,
      user: null,
      session: null,
      syncStatus: "idle",

      // --- selectors ---
      isComplete: (id) => get().completed.includes(id),

      // --- lesson completion (mirrors original progress.ts logic) ---
      completeLesson: (id, xp) => {
        const state = get();
        const today = todayKey();

        let streak = state.streak;
        if (state.lastActiveDay === null) {
          streak = 1;
        } else {
          const diff = dayDiff(state.lastActiveDay, today);
          if (diff === 0) streak = state.streak || 1;
          else if (diff === 1) streak = state.streak + 1;
          else streak = 1;
        }

        if (state.completed.includes(id)) {
          set({ streak, lastActiveDay: today });
          // Still fire a background sync in case streak changed.
          get().syncToServer();
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

        // Optimistic: fire-and-forget sync.
        get().syncToServer();

        return { gainedXp: xp, leveledUp };
      },

      clearLevelUp: () => set({ lastLevelUp: null }),

      reset: () => {
        set({
          xp: 0,
          completed: [],
          streak: 0,
          lastActiveDay: null,
          lastLevelUp: null,
        });
        get().syncToServer();
      },

      // --- auth ---
      setSession: (session) => {
        set({ session, user: session?.user ?? null });
        if (session?.user) {
          // Merge server state on sign-in.
          get().pullFromServer();
        }
      },

      // Push local state → Supabase (fire-and-forget, safe to call often).
      syncToServer: async () => {
        const { user, xp, streak, lastActiveDay, completed } = get();
        if (!user || !isSupabaseConfigured) return;
        set({ syncStatus: "syncing" });
        try {
          await upsertProgress({
            user_id: user.id,
            xp,
            streak,
            last_active_day: lastActiveDay,
            completed,
          });
          set({ syncStatus: "idle" });
        } catch {
          set({ syncStatus: "error" });
        }
      },

      // Pull server state and merge (union) with local – used on sign-in.
      pullFromServer: async () => {
        const { user } = get();
        if (!user || !isSupabaseConfigured) return;
        const remote = await fetchProgress(user.id);
        if (!remote) {
          // No server record yet – push current local state.
          get().syncToServer();
          return;
        }
        const local = get();
        // Merge: union of completed, higher XP, higher streak.
        const mergedCompleted = Array.from(
          new Set([...local.completed, ...remote.completed])
        );
        const mergedXp = Math.max(local.xp, remote.xp);
        const mergedStreak = Math.max(local.streak, remote.streak);
        const mergedLastActive =
          local.lastActiveDay && remote.last_active_day
            ? dayDiff(remote.last_active_day, local.lastActiveDay) >= 0
              ? local.lastActiveDay
              : remote.last_active_day
            : local.lastActiveDay ?? remote.last_active_day;

        set({
          xp: mergedXp,
          completed: mergedCompleted,
          streak: mergedStreak,
          lastActiveDay: mergedLastActive,
        });
        // Push merged state back to server.
        get().syncToServer();
      },
    }),
    { name: "boots-progress" } // same localStorage key as before
  )
);

// ---------------------------------------------------------------------------
// Backward-compat alias – components that already import { useProgress }
// from "@/lib/progress" will keep working if you update that file to simply
// re-export from here.
// ---------------------------------------------------------------------------
export const useProgress = useGameStore;
