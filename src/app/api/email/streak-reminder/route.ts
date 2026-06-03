import { NextResponse } from "next/server";
import { isEmailConfigured, sendEmail } from "@/lib/email/resend";
import { streakAtRiskEmail } from "@/lib/email/templates";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

// Cron job: email learners whose streak is at risk (last active *yesterday*, so a
// missed day today would break it). Schedule daily via Vercel Cron / GitHub
// Actions hitting this URL with the CRON_SECRET. No-ops gracefully when email or
// the service-role key isn't configured.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 500;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // unset → allow (dev/preview)
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isEmailConfigured || !isAdminConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }

  const admin = getSupabaseAdminClient()!;
  // Standard calendar yesterday in UTC (matches the `date` column format).
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  const { data } = await admin
    .from("profiles")
    .select("id, display_name, streak, last_active_day")
    .eq("last_active_day", yesterday)
    .gt("streak", 0)
    .limit(MAX);

  let sent = 0;
  for (const p of (data ?? []) as {
    id: string;
    display_name: string | null;
    streak: number;
  }[]) {
    const { data: u } = await admin.auth.admin.getUserById(p.id);
    const email = u.user?.email;
    if (!email) continue;
    const tpl = streakAtRiskEmail(p.display_name ?? "there", p.streak);
    const res = await sendEmail({ to: email, ...tpl });
    if (res.ok) sent += 1;
  }

  return NextResponse.json({ ok: true, candidates: data?.length ?? 0, sent });
}
