// DELETE /api/account/delete — erase the signed-in user's profile row and auth
// account, satisfying GDPR Art. 17 and CCPA erasure rights.
//
// Requires the Supabase service-role key (SUPABASE_SERVICE_ROLE_KEY) to bypass
// RLS and call auth.admin.deleteUser(). When either the service key or the
// anon key is absent the route returns { skipped: true } so the app degrades
// gracefully in local-dev (no Supabase) builds.
//
// Auth guard: reads the caller's session via the server (anon) client first so
// we never delete by a user-supplied id. The admin client then does the actual
// delete so it succeeds even if the row's RLS policy blocks the user's JWT.

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

export async function DELETE(): Promise<Response> {
  // Graceful no-op when Supabase isn't configured.
  if (!isAdminConfigured) {
    return NextResponse.json({ skipped: true });
  }

  // ── 1. Identify the caller via the session-cookie client (anon key) ──
  const serverClient = getSupabaseServerClient();
  if (!serverClient) {
    return NextResponse.json({ skipped: true });
  }

  const {
    data: { user },
    error: authErr,
  } = await serverClient.auth.getUser();

  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const userId = user.id;

  // ── 2. Delete profile row first (soft-delete any relational data here too) ──
  const adminClient = getSupabaseAdminClient();
  if (!adminClient) {
    // isAdminConfigured was true but client failed to build — defensive guard.
    return NextResponse.json({ skipped: true });
  }

  // Delete the profiles row. If the table uses RLS, the service-role key
  // bypasses it. Errors are logged but we still attempt auth deletion so the
  // account isn't left in a broken state.
  const { error: profileErr } = await adminClient
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (profileErr) {
    // Log but don't abort — we still want to remove the auth user.
    console.error("[api/account/delete] profile delete failed:", profileErr.message);
  }

  // ── 3. Delete the auth user (cascades Supabase-managed auth records) ──
  const { error: deleteErr } = await adminClient.auth.admin.deleteUser(userId);

  if (deleteErr) {
    console.error("[api/account/delete] auth.admin.deleteUser failed:", deleteErr.message);
    return NextResponse.json(
      { error: "Account deletion failed. Please contact support." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
