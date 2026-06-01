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
    return typeof data === "number" ? data : null;
  } catch (err) {
    console.warn("[scoring] complete_lesson threw:", err);
    return null;
  }
}
