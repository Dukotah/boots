import { createBrowserClient } from "@supabase/ssr";

// ---------------------------------------------------------------------------
// Supabase browser client – singleton so we don't create a new client on
// every render.  Falls back gracefully when env vars are not set so the app
// still boots in fully-local / demo mode.
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

// Lazily created so server-side builds that don't have the env vars don't
// throw.  Call getSupabase() wherever you need the client.
let _client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

// Convenience re-export for components that want a typed client directly.
export type SupabaseClient = NonNullable<ReturnType<typeof getSupabase>>;
