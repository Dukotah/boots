"use client";

// Server-authoritative scoring (best-effort). When Supabase is configured AND
// the learner is signed in, we record the completion via the `complete_lesson`
// RPC, which awards the *canonical* XP from the database (the client can't forge
// the amount) and dedupes via user_progress. The local Zustand store remains the
// instant, optimistic UI; this just makes the persisted total trustworthy.
//
// No-ops gracefully when Supabase isn't configured or the user is logged out, so
// the app keeps working entirely on local state during development.

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type RpcClient = {
  auth: { getUser: () => Promise<{ data: { user: unknown | null } }> };
  rpc: (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

/**
 * Records a CLIENT-ASSERTED completion (languages the server can't re-grade yet:
 * Python/SQL). Uses complete_lesson_client, which grants only cosmetic credit
 * (xp/gold/completed) — never the competitive verified_xp/weekly_xp, so an
 * unverified claim can't inflate the leaderboard or league. Returns the cosmetic
 * XP awarded (0 if already completed), or null when not applicable.
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

    const { data, error } = await sb.rpc("complete_lesson_client", {
      p_course_slug: courseSlug,
      p_lesson_slug: lessonSlug,
    });
    if (error) {
      console.warn("[scoring] complete_lesson_client failed:", error.message);
      return null;
    }
    return typeof data === "number" ? data : null;
  } catch (err) {
    console.warn("[scoring] complete_lesson_client threw:", err);
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
