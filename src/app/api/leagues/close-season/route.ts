import { NextResponse } from "next/server";
import { resolveSeason } from "@/lib/leagues";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

// Cron job: close the weekly league season for everyone — apply promotion/
// relegation from each player's weekly XP, then reset for the new season.
// Schedule weekly via Vercel Cron / GitHub Actions with the CRON_SECRET.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdminConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }

  const admin = getSupabaseAdminClient()!;
  const today = new Date().toISOString().slice(0, 10);

  // Process players who either earned XP this season (possible promotion) OR sit
  // above the floor tier (possible relegation if idle). This now includes idle
  // high-tier players, who previously squatted their tier forever. A tier-0
  // player with 0 XP is already at the floor, so we skip them to save writes.
  const { data } = await admin
    .from("profiles")
    .select("id, weekly_xp, league_tier")
    .or("weekly_xp.gt.0,league_tier.gt.0");

  let updated = 0;
  for (const p of (data ?? []) as {
    id: string;
    weekly_xp: number;
    league_tier: number;
  }[]) {
    const result = resolveSeason(p.weekly_xp ?? 0, p.league_tier ?? 0);
    const { error } = await admin
      .from("profiles")
      .update({
        league_tier: result.toTier,
        weekly_xp: 0,
        season_start: today,
      })
      .eq("id", p.id);
    if (!error) updated += 1;
  }

  return NextResponse.json({ ok: true, updated });
}
