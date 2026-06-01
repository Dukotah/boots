"use client";

// Browser-side Supabase client (singleton). Use this inside client components and
// hooks. It reads the public env vars; if they're absent we return null so the app
// runs fully on the local Zustand store during early development (no hard dep on a
// configured backend yet).

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase env vars are present and the cloud backend is usable. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Returns the browser Supabase client, or `null` if env vars aren't set.
 * Callers should handle the null case (fall back to local-only game state).
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url!, anonKey!);
  }
  return browserClient;
}
