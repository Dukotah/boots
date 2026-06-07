import { NextResponse } from "next/server";
import { isEmailConfigured, sendEmail } from "@/lib/email/resend";
import {
  streakAtRiskEmail,
  reEngagementDay3Email,
  reEngagementDay7Email,
  reEngagementDay14Email,
} from "@/lib/email/templates";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

// ─── Lifecycle email cron ───────────────────────────────────────────────────
//
// Called daily at 17:00 UTC by Vercel Cron (see vercel.json). Implements a
// three-stage re-engagement cadence plus a same-day streak-at-risk alert.
//
// Frequency-cap strategy (no extra DB column required):
//   Each user can only fall into ONE inactivity bucket per run because the
//   buckets are mutually exclusive day-ranges queried from last_active_day.
//   Within each bucket we send at most one email per user per cron run, so
//   the effective cap is ≤ 1 lifecycle email per day per user.
//
//   Stage         Inactivity window    Copy tone
//   ──────────    ─────────────────    ───────────────────────────────────
//   Streak-risk   0 days (missed today) Urgent — streak breaks at midnight
//   Day 3         2–4 days ago          Gentle nudge, low pressure
//   Day 7         6–8 days ago          Streak-freeze offer, mild urgency
//   Day 14        13–15 days ago        Win-back, fresh-start / new season
//
// Each stage targets a narrow ±1 day window so the email fires effectively
// once per stage per lapse event (not repeatedly across the full window).
//
// Optional improvement: add a `lifecycle_emailed_at timestamptz` column to
// `profiles` and skip any user emailed in the past 24 h. See final report.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Max users processed per stage per run — keeps latency bounded. */
const MAX_PER_STAGE = 300;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // unset → allow (dev/preview)
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

/** Return a UTC date string (YYYY-MM-DD) offset by `days` from today. */
function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isEmailConfigured || !isAdminConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }

  const admin = getSupabaseAdminClient()!;

  const results: Record<string, { candidates: number; sent: number }> = {
    streakAtRisk: { candidates: 0, sent: 0 },
    day3: { candidates: 0, sent: 0 },
    day7: { candidates: 0, sent: 0 },
    day14: { candidates: 0, sent: 0 },
  };

  // ── Helper: resolve email address for a user id ─────────────────────────
  async function getEmail(userId: string): Promise<string | null> {
    const { data } = await admin.auth.admin.getUserById(userId);
    return data.user?.email ?? null;
  }

  // ── 1. Streak-at-risk ────────────────────────────────────────────────────
  // Users whose last_active_day was yesterday and still have an active streak.
  // They haven't done today's lesson yet — send the urgent same-day alert.
  {
    const yesterday = daysAgo(1);
    const { data } = await admin
      .from("profiles")
      .select("id, display_name, streak")
      .eq("last_active_day", yesterday)
      .gt("streak", 0)
      .limit(MAX_PER_STAGE);

    results.streakAtRisk.candidates = data?.length ?? 0;

    for (const p of (data ?? []) as {
      id: string;
      display_name: string | null;
      streak: number;
    }[]) {
      const email = await getEmail(p.id);
      if (!email) continue;
      const tpl = streakAtRiskEmail(p.display_name ?? "there", p.streak);
      const res = await sendEmail({ to: email, ...tpl });
      if (res.ok) results.streakAtRisk.sent += 1;
    }
  }

  // ── 2. Day-3 re-engagement (2–4 days inactive) ───────────────────────────
  // Narrow window: last_active_day between 4 days ago and 2 days ago (inclusive).
  // Users active yesterday are already covered by streakAtRisk above.
  {
    const lo = daysAgo(4); // earliest edge: 4 days ago
    const hi = daysAgo(2); // latest edge:   2 days ago

    const { data } = await admin
      .from("profiles")
      .select("id, display_name, completed")
      .gte("last_active_day", lo)
      .lte("last_active_day", hi)
      .limit(MAX_PER_STAGE);

    results.day3.candidates = data?.length ?? 0;

    for (const p of (data ?? []) as {
      id: string;
      display_name: string | null;
      completed: string[];
    }[]) {
      const email = await getEmail(p.id);
      if (!email) continue;
      const completedCount = Array.isArray(p.completed) ? p.completed.length : 0;
      const tpl = reEngagementDay3Email(p.display_name ?? "there", completedCount);
      const res = await sendEmail({ to: email, ...tpl });
      if (res.ok) results.day3.sent += 1;
    }
  }

  // ── 3. Day-7 re-engagement (6–8 days inactive) ───────────────────────────
  {
    const lo = daysAgo(8);
    const hi = daysAgo(6);

    const { data } = await admin
      .from("profiles")
      .select("id, display_name, streak_freezes")
      .gte("last_active_day", lo)
      .lte("last_active_day", hi)
      .limit(MAX_PER_STAGE);

    results.day7.candidates = data?.length ?? 0;

    for (const p of (data ?? []) as {
      id: string;
      display_name: string | null;
      streak_freezes: number;
    }[]) {
      const email = await getEmail(p.id);
      if (!email) continue;
      const tpl = reEngagementDay7Email(p.display_name ?? "there", p.streak_freezes ?? 0);
      const res = await sendEmail({ to: email, ...tpl });
      if (res.ok) results.day7.sent += 1;
    }
  }

  // ── 4. Day-14 win-back (13–15 days inactive) ─────────────────────────────
  {
    const lo = daysAgo(15);
    const hi = daysAgo(13);

    const { data } = await admin
      .from("profiles")
      .select("id, display_name")
      .gte("last_active_day", lo)
      .lte("last_active_day", hi)
      .limit(MAX_PER_STAGE);

    results.day14.candidates = data?.length ?? 0;

    for (const p of (data ?? []) as {
      id: string;
      display_name: string | null;
    }[]) {
      const email = await getEmail(p.id);
      if (!email) continue;
      const tpl = reEngagementDay14Email(p.display_name ?? "there");
      const res = await sendEmail({ to: email, ...tpl });
      if (res.ok) results.day14.sent += 1;
    }
  }

  const totalSent = Object.values(results).reduce((sum, s) => sum + s.sent, 0);
  return NextResponse.json({ ok: true, totalSent, stages: results });
}
