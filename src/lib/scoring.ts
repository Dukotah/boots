"use client";

// Server-authoritative scoring (best-effort). When Supabase is configured AND
// the learner is signed in, we record the completion via the `complete_lesson`
// RPC, which awards the *canonical* XP from the database (the client can't forge
// the amount) and dedupes via user_progress. The local Zustand store remains the
// instant, optimistic UI; this just makes the persisted total trustworthy.
//
// No-ops gracefully when Supabase isn't configured or the user is logged out, so
// the app keeps working entirely on local state during development.

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { currentWeekKey, DAMAGE_PER_LESSON } from "@/lib/guildBoss";
import { useGameStore } from "@/store/useGameStore";

type RpcClient = {
  auth: { getUser: () => Promise<{ data: { user: unknown | null } }> };
  rpc: (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

/**
 * Fire-and-forget: call contribute_guild_boss_damage when the user is in a guild.
 * Never throws, never blocks the lesson-completion flow.
 */
function fireGuildBossDamage(): void {
  if (!isSupabaseConfigured) return;
  const { guildId } = useGameStore.getState();
  if (!guildId) return;

  const sb = getSupabaseBrowserClient() as unknown as RpcClient | null;
  if (!sb) return;

  const weekKey = currentWeekKey();

  void (async () => {
    try {
      await sb.rpc("contribute_guild_boss_damage", {
        p_guild_id: guildId,
        p_week: weekKey,
        p_boss_id: `${weekKey}|${guildId}`, // deterministic; matches bossForWeek key
        p_damage: DAMAGE_PER_LESSON,
      });
    } catch {
      // Intentionally swallowed — boss damage is best-effort.
    }
  })();
}

/**
 * Records a lesson completion server-side. Returns the XP the server awarded
 * (0 if already completed), or null when not applicable (no backend / signed out
 * / failure) — callers should treat null as "kept local only".
 */
export async function recordCompletion(
  courseSlug: string,
  lessonSlug: string,
): Promise<number | null> {
  const sb = getSupabaseBrowserClient() as unknown as RpcClient | null;
  if (!sb) return null;

  try {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return null;

    const { data, error } = await sb.rpc("complete_lesson", {
      p_course_slug: courseSlug,
      p_lesson_slug: lessonSlug,
    });
    if (error) {
      console.warn("[scoring] complete_lesson failed:", error.message);
      return null;
    }

    // Guild co-op boss damage — fire-and-forget, no-op without a guild.
    fireGuildBossDamage();

    return typeof data === "number" ? data : null;
  } catch (err) {
    console.warn("[scoring] complete_lesson threw:", err);
    return null;
  }
}

/**
 * Submits the learner's code to the server for authoritative verification. The
 * server re-runs JS/TS solutions and awards canonical XP only if they pass.
 * For languages the server can't yet re-run (Python/SQL) it falls back to the
 * direct RPC record. Best-effort: never throws, never blocks the UI.
 */
export async function verifyCompletion(
  courseSlug: string,
  lessonSlug: string,
  code: string,
): Promise<{ verified: boolean; awardedXp: number | null }> {
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ courseSlug, lessonSlug, code }),
    });
    const data = (await res.json().catch(() => null)) as
      | { verified?: boolean; reason?: string; awardedXp?: number | null }
      | null;

    if (res.ok && data && typeof data.verified === "boolean") {
      // Language not server-verifiable yet → trust the client pass, record via RPC.
      if (!data.verified && data.reason) {
        return { verified: true, awardedXp: await recordCompletion(courseSlug, lessonSlug) };
      }
      return { verified: data.verified, awardedXp: data.awardedXp ?? null };
    }
  } catch {
    // fall through to client-side record
  }
  // Route unavailable → fall back to the direct RPC record.
  return { verified: true, awardedXp: await recordCompletion(courseSlug, lessonSlug) };
}

/**
 * Server-validates a quiz submission. The server checks the submitted answer
 * indices against the lesson's answer key and awards canonical XP only if every
 * answer is correct — so quiz XP can't be claimed without the right answers.
 * On a successful response the server's verdict is authoritative (no fallback).
 * If the route is unreachable it falls back to the optimistic RPC record so the
 * app keeps working offline / in local-only dev.
 */
export async function verifyQuizCompletion(
  courseSlug: string,
  lessonSlug: string,
  answers: number[],
): Promise<{ verified: boolean; awardedXp: number | null }> {
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ courseSlug, lessonSlug, answers }),
    });
    const data = (await res.json().catch(() => null)) as
      | { verified?: boolean; awardedXp?: number | null }
      | null;
    if (res.ok && data && typeof data.verified === "boolean") {
      return { verified: data.verified, awardedXp: data.awardedXp ?? null };
    }
  } catch {
    // fall through to client-side record
  }
  // Route unavailable → fall back to the direct RPC record.
  return { verified: true, awardedXp: await recordCompletion(courseSlug, lessonSlug) };
}
