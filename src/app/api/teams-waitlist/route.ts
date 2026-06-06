// Teams waitlist API — POST /api/teams-waitlist
//
// Accepts { email, teamSize? } and stores the lead in `teams_waitlist`.
// Returns { ok: true } on success or { ok: true, skipped: true } when Supabase
// is not configured (so the form works in dev without env vars).
//
// No PII is logged — the email is stored only in the DB row, never in
// server logs or error messages.

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// ── Local types ───────────────────────────────────────────────────────────────

type WaitlistInsert = {
  email: string;
  team_size?: string | null;
};

type DbError = { message: string; code?: string };

type SbForWaitlist = {
  from: (table: "teams_waitlist") => {
    insert: (row: WaitlistInsert) => Promise<{ error: DbError | null }>;
  };
};

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value) && value.length <= 254;
}

// ── POST ──────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const teamSize =
    typeof body.teamSize === "string" && body.teamSize.trim()
      ? body.teamSize.trim().slice(0, 50)
      : null;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const raw = getSupabaseServerClient();
  if (!raw) {
    // Supabase not configured — degrade gracefully so the form works in dev.
    return NextResponse.json({ ok: true, skipped: true });
  }

  const sb = raw as unknown as SbForWaitlist;

  const { error: insertErr } = await sb.from("teams_waitlist").insert({
    email,
    team_size: teamSize,
  });

  if (insertErr) {
    // Unique constraint violation — already on the list.
    if (insertErr.code === "23505") {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }
    // Log without PII.
    console.error("[api/teams-waitlist] insert failed:", insertErr.code ?? "unknown");
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
