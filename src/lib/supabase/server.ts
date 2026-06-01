// Server-side Supabase client for the Next.js App Router (RSCs, route handlers,
// server actions). Bridges Supabase auth to Next's cookie store so sessions are
// read/refreshed on the server.
//
// Returns null when env vars are absent, mirroring the browser client so server
// code can degrade gracefully during early development.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Create a request-scoped server client. Call this per request (do not cache the
 * instance) so it always binds to the current cookie store.
 */
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = cookies();

  return createServerClient<Database>(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In Server Components, cookies are read-only and writes throw — that's
        // fine; session refresh is handled in middleware. Swallow the error.
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          /* no-op outside a Server Action / Route Handler */
        }
      },
    },
  });
}
