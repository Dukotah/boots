// Referral programme API — two-sided rewards.
//
// GET  /api/referrals   — returns the signed-in user's code + stats + reward copy.
// POST /api/referrals   — body { code: string } — redeem a code; returns referredReward.
//
// Both endpoints return { skipped: true } when Supabase is not configured.
// Auth is enforced: unauthenticated requests receive 401.
//
// Stripe fulfilment (deferred):
//   • On POST success a Stripe coupon should be issued for the referred user.
//     Set STRIPE_REFERRED_COUPON_ID and call stripe.subscriptions.update() or
//     stripe.checkout.sessions.create({ discounts: [{ coupon: id }] }) from
//     the subscription webhook that fires when the user's first payment succeeds.
//   • On status → "completed" the referrer coupon fires via STRIPE_REFERRAL_COUPON_ID.
//     Both env vars are optional; when absent the DB row is created as normal
//     and reward fulfilment is handled manually / out-of-band.
//
// The `referrals` table is typed locally (same pattern as scoring.ts) until
// the human applies the wiringSnippet for src/types/database.ts.

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { REFERRER_REWARD, REFERRED_REWARD } from "@/lib/referrals";

// ── Local minimal types for the referrals table ───────────────────────────────

type ReferralInsert = {
  referrer_id: string;
  code: string;
  referred_id: string | null;
  status: "pending" | "completed";
  reward_granted: boolean;
};

type ReferralRowLight = {
  code?: string;
  referred_id?: string | null;
  status?: string;
  reward_granted?: boolean;
  referrer_id?: string;
};

type DbError = { message: string; code?: string };

/** Minimal typed wrapper so we can call sb.from("referrals") without polluting Database. */
type SbForReferrals = {
  auth: {
    getUser: () => Promise<{
      data: { user: { id: string; email?: string | null } | null };
      error: DbError | null;
    }>;
  };
  from: (table: "referrals") => {
    select: (cols: string) => {
      eq: (col: string, val: string) => {
        is: (col2: string, val2: null) => {
          limit: (n: number) => {
            maybeSingle: () => Promise<{ data: ReferralRowLight | null; error: DbError | null }>;
          };
        };
        // for the multi-row stats select (no .is() chained)
        then?: undefined;
        /** Resolve directly when no further filters — cast below handles it */
      };
    };
    insert: (row: ReferralInsert) => Promise<{ error: DbError | null }>;
  };
};

// A wider type for the multi-row select (SELECT ... WHERE referrer_id = ?)
type SbForStats = {
  auth: {
    getUser: () => Promise<{
      data: { user: { id: string } | null };
      error: DbError | null;
    }>;
  };
  from: (table: "referrals") => {
    select: (cols: string) => {
      eq: (col: string, val: string) => Promise<{
        data: ReferralRowLight[] | null;
        error: DbError | null;
      }>;
    };
    insert: (row: ReferralInsert) => Promise<{ error: DbError | null }>;
  };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function codeFromUserId(userId: string): string {
  return userId.replace(/-/g, "").slice(0, 8);
}

// ── GET — my code + stats ─────────────────────────────────────────────────────
export async function GET() {
  const raw = getSupabaseServerClient();
  if (!raw) return NextResponse.json({ skipped: true });

  const sbStats = raw as unknown as SbForStats;
  const sbSeed = raw as unknown as SbForReferrals;

  const {
    data: { user },
    error: authErr,
  } = await sbSeed.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const code = codeFromUserId(user.id);

    // Check if the seed row exists.
    const { data: existing } = await sbSeed
      .from("referrals")
      .select("code")
      .eq("referrer_id", user.id)
      .is("referred_id", null)
      .limit(1)
      .maybeSingle();

    if (!existing) {
      await sbSeed.from("referrals").insert({
        referrer_id: user.id,
        code,
        referred_id: null,
        status: "pending",
        reward_granted: false,
      });
    }

    // Aggregate stats.
    const { data: rows, error: rowsErr } = await sbStats
      .from("referrals")
      .select("referred_id, status, reward_granted")
      .eq("referrer_id", user.id);

    if (rowsErr) {
      return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
    }

    const referralRows = (rows ?? []).filter((r) => r.referred_id != null);

    return NextResponse.json({
      code: existing?.code ?? code,
      invited: referralRows.length,
      completed: referralRows.filter((r) => r.status === "completed").length,
      monthsEarned: referralRows.filter((r) => r.reward_granted).length,
      // Reward copy — lets the client stay in sync without hard-coding strings.
      referrerReward: REFERRER_REWARD,
      referredReward: REFERRED_REWARD,
    });
  } catch (err) {
    console.error("[api/referrals] GET threw:", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

// ── POST — redeem a code ──────────────────────────────────────────────────────
export async function POST(req: Request) {
  const raw = getSupabaseServerClient();
  if (!raw) return NextResponse.json({ skipped: true });

  const sbSeed = raw as unknown as SbForReferrals;

  const {
    data: { user },
    error: authErr,
  } = await sbSeed.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let code: string | undefined;
  try {
    const body = (await req.json().catch(() => ({}))) as { code?: string };
    code = body.code?.trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "code is required." }, { status: 400 });
  }

  try {
    // Resolve the referrer from the seed row.
    const { data: seed, error: lookupErr } = await sbSeed
      .from("referrals")
      .select("referrer_id")
      .eq("code", code)
      .is("referred_id", null)
      .limit(1)
      .maybeSingle();

    if (lookupErr || !seed) {
      return NextResponse.json(
        { error: "That code doesn't look right. Double-check and try again." },
        { status: 404 },
      );
    }

    if (seed.referrer_id === user.id) {
      return NextResponse.json({ error: "You can't refer yourself." }, { status: 422 });
    }

    // Insert redemption row; unique index on referred_id prevents double dips.
    const { error: insertErr } = await sbSeed.from("referrals").insert({
      referrer_id: seed.referrer_id!,
      code,
      referred_id: user.id,
      status: "pending",
      reward_granted: false,
    });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return NextResponse.json(
          { error: "You've already redeemed a referral code." },
          { status: 409 },
        );
      }
      console.error("[api/referrals] POST insert failed:", insertErr.message);
      return NextResponse.json({ error: "Internal error." }, { status: 500 });
    }

    // ── Stripe fulfilment (deferred) ──────────────────────────────────────────
    // When STRIPE_REFERRED_COUPON_ID is set, apply it to the new user's next
    // checkout session or active subscription here. Example:
    //
    //   const couponId = process.env.STRIPE_REFERRED_COUPON_ID;
    //   if (couponId) {
    //     await stripe.subscriptions.update(subscriptionId, {
    //       discounts: [{ coupon: couponId }],
    //     });
    //   }
    //
    // The referrer's reward (STRIPE_REFERRAL_COUPON_ID) is applied by the
    // webhook that sets status="completed" / reward_granted=true once the
    // referred user's first payment succeeds.
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true, referredReward: REFERRED_REWARD });
  } catch (err) {
    console.error("[api/referrals] POST threw:", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
