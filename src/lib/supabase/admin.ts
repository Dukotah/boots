// Service-role Supabase client for trusted server-only jobs (e.g. cron email).
// NEVER import this into client code — the service role key bypasses RLS.
// Returns null when the service key isn't configured.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isAdminConfigured = Boolean(url && serviceKey);

export function getSupabaseAdminClient() {
  if (!isAdminConfigured) return null;
  return createClient<Database>(url!, serviceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
