import { NextResponse } from "next/server";
import webpush from "web-push";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

// Cron job: fan out a streak-reminder push to all stored subscriptions. Schedule
// daily alongside the email reminder. No-ops unless VAPID + service role are set.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const PRIVATE = process.env.VAPID_PRIVATE_KEY;
const SUBJECT = process.env.VAPID_SUBJECT ?? "mailto:hello@cantrip.dev";

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!PUBLIC || !PRIVATE || !isAdminConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }
  webpush.setVapidDetails(SUBJECT, PUBLIC, PRIVATE);

  const admin = getSupabaseAdminClient()!;
  const { data } = await admin
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth")
    .limit(2000);

  const payload = JSON.stringify({
    title: "Keep your streak alive 🔥",
    body: "A two-minute lesson keeps the fire going.",
    url: "/dashboard",
  });

  let sent = 0;
  const stale: string[] = [];
  for (const s of (data ?? []) as {
    endpoint: string;
    p256dh: string;
    auth: string;
  }[]) {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payload,
      );
      sent += 1;
    } catch (err: unknown) {
      // 404/410 → subscription expired; clean it up.
      const code = (err as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) stale.push(s.endpoint);
    }
  }

  if (stale.length) {
    await admin.from("push_subscriptions").delete().in("endpoint", stale);
  }

  return NextResponse.json({ ok: true, sent, removed: stale.length });
}
