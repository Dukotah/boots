"use client";

// Referral programme helpers — two-sided rewards.
//
// Reward definitions (single source of truth):
//   REFERRER_REWARD  — what the inviting user earns per completed referral.
//   REFERRED_REWARD  — what the new user gets when they redeem a code.
//
// Stripe fulfilment is intentionally deferred: set STRIPE_REFERRAL_COUPON_ID
// (for referrer) and STRIPE_REFERRED_COUPON_ID (for the new user) in your
// environment and wire them into the webhook that marks status="completed" /
// reward_granted=true. The reward constants below drive all UI copy so the
// moment is always consistent.
//
// Every function gracefully degrades: if Supabase isn't configured or the user
// is not signed in, we return a safe no-op value rather than throwing, so the
// rest of the app keeps running during development or when unconfigured.
//
// The `referrals` table isn't in Database["public"]["Tables"] yet — the human
// must apply the wiringSnippet to src/types/database.ts. Until then we cast
// the client to a local typed interface (same pattern as scoring.ts's RpcClient)
// so the build stays green and TypeScript is still fully typed for our usage.

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/client";

// ── Reward definitions ────────────────────────────────────────────────────────

/** What the referrer earns per friend who subscribes. */
export const REFERRER_REWARD = "1 free month of Pro" as const;

/** What the new user receives when they redeem a referral code. */
export const REFERRED_REWARD = "1 free month of Pro" as const;

/**
 * Human-readable short descriptions used across UI copy.
 * Change these two strings and every card/page updates automatically.
 */
export const REWARD_COPY = {
  /** The pitch line shown to referrers. */
  referrerShort: `You get ${REFERRER_REWARD}`,
  /** The pitch line shown to the person receiving the invite. */
  referredShort: `They get ${REFERRED_REWARD} too`,
  /** Combined one-liner for cards. */
  combined: `You both get ${REFERRER_REWARD} — no caps on invites`,
} as const;

// ── Local type for the referrals table rows ───────────────────────────────────

type ReferralRow = {
  id?: string;
  referrer_id: string;
  code: string;
  referred_id: string | null;
  status: "pending" | "completed";
  reward_granted: boolean;
  created_at?: string;
  completed_at?: string | null;
};

type SelectResult<T> = Promise<{ data: T | null; error: { message: string; code?: string } | null }>;
type MaybeSingleResult<T> = Promise<{ data: T | null; error: { message: string; code?: string } | null }>;
type InsertResult = Promise<{ error: { message: string; code?: string } | null }>;

/** Minimal typed wrapper over the Supabase browser client for referral queries. */
type ReferralClient = {
  auth: {
    getUser: () => Promise<{ data: { user: { id: string; email?: string } | null } }>;
  };
  from: (table: "referrals") => {
    select: (cols: string) => {
      eq: (col: string, val: string) => {
        is: (col2: string, val2: null) => {
          limit: (n: number) => {
            maybeSingle: () => MaybeSingleResult<ReferralRow>;
          };
        };
        limit?: never;
      };
      /** For multi-row queries without is() filter */
      [key: string]: unknown;
    };
    insert: (row: Omit<ReferralRow, "id" | "created_at" | "completed_at">) => InsertResult;
  };
};

// A looser client type for the stats query (needs chained .eq() returning arrays).
type ReferralClientWide = {
  auth: {
    getUser: () => Promise<{ data: { user: { id: string } | null } }>;
  };
  from: (table: "referrals") => {
    select: (cols: string) => {
      eq: (col: string, val: string) => SelectResult<ReferralRow[]>;
    };
    insert: (row: Omit<ReferralRow, "id" | "created_at" | "completed_at">) => InsertResult;
    select2?: never;
  };
};

// ── Public types ──────────────────────────────────────────────────────────────

export type ReferralStats = {
  code: string;
  invited: number;
  completed: number;
  monthsEarned: number;
};

export type RedeemResult =
  | {
      ok: true;
      /**
       * Human-readable description of the perk the new user will receive.
       * Always present on success so the UI can confirm both-sided rewards.
       */
      referredReward: string;
    }
  | { ok: false; reason: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build the shareable referral URL for a given code. */
export function buildReferralUrl(code: string): string {
  const base =
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL) ?? "https://cantrip.dev";
  return `${base.replace(/\/$/, "")}/?ref=${encodeURIComponent(code)}`;
}

/** Check if referrals backend is available (Supabase must be configured). */
export { isSupabaseConfigured };

/**
 * Generate a short, URL-safe referral code from a user's id.
 * Uses the first 8 hex chars of the UUID (strips hyphens).
 */
function codeFromUserId(userId: string): string {
  return userId.replace(/-/g, "").slice(0, 8);
}

// ── Core API ─────────────────────────────────────────────────────────────────

/**
 * Fetch the current user's referral code, creating the seed row if absent.
 * Returns null when Supabase is absent or the user is logged out.
 */
export async function getOrCreateMyCode(): Promise<string | null> {
  const raw = getSupabaseBrowserClient();
  if (!raw) return null;
  // Cast to our minimal typed interface; the actual runtime is the full client.
  const sb = raw as unknown as ReferralClient;

  try {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return null;

    // Try to read an existing seed row first (cheapest path).
    const { data: existing, error: readErr } = await sb
      .from("referrals")
      .select("code")
      .eq("referrer_id", user.id)
      .is("referred_id", null)
      .limit(1)
      .maybeSingle();

    if (!readErr && existing?.code) return existing.code;

    // No row yet — create the seed row.
    const code = codeFromUserId(user.id);
    const { error: insertErr } = await sb.from("referrals").insert({
      referrer_id: user.id,
      code,
      referred_id: null,
      status: "pending",
      reward_granted: false,
    });

    if (insertErr) {
      // Race condition: another tab already inserted — try to read again.
      const { data: retry } = await sb
        .from("referrals")
        .select("code")
        .eq("referrer_id", user.id)
        .is("referred_id", null)
        .limit(1)
        .maybeSingle();
      return retry?.code ?? null;
    }

    return code;
  } catch (err) {
    console.warn("[referrals] getOrCreateMyCode failed:", err);
    return null;
  }
}

/**
 * Return aggregate referral stats for the current user.
 * Returns null when Supabase is absent or the user is logged out.
 */
export async function getMyReferralStats(): Promise<ReferralStats | null> {
  const raw = getSupabaseBrowserClient();
  if (!raw) return null;
  const sb = raw as unknown as ReferralClientWide;

  try {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return null;

    const { data, error } = await sb
      .from("referrals")
      .select("code, referred_id, status, reward_granted")
      .eq("referrer_id", user.id);

    if (error) {
      console.warn("[referrals] getMyReferralStats failed:", error.message);
      return null;
    }

    // The seed row (referred_id = null) holds the canonical code.
    const rows = data ?? [];
    const seedRow = rows.find((r) => r.referred_id == null);
    const referralRows = rows.filter((r) => r.referred_id != null);

    const code = seedRow?.code ?? codeFromUserId(user.id);
    const invited = referralRows.length;
    const completed = referralRows.filter((r) => r.status === "completed").length;
    const monthsEarned = referralRows.filter((r) => r.reward_granted).length;

    return { code, invited, completed, monthsEarned };
  } catch (err) {
    console.warn("[referrals] getMyReferralStats failed:", err);
    return null;
  }
}

/**
 * Redeem a referral code on behalf of the currently signed-in user.
 *
 * Rules enforced here (and in DB constraints):
 * - User must be signed in.
 * - Code must exist and resolve to a different user.
 * - A user can only redeem once (unique index on referred_id).
 * - Self-referral is blocked.
 */
export async function redeemCode(code: string): Promise<RedeemResult> {
  const raw = getSupabaseBrowserClient();
  if (!raw) return { ok: false, reason: "Backend not configured." };
  const sb = raw as unknown as ReferralClient;

  try {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return { ok: false, reason: "Sign in to redeem a referral code." };

    // Look up the referrer for this code.
    const { data: seed, error: lookupErr } = await sb
      .from("referrals")
      .select("referrer_id")
      .eq("code", code.trim().toLowerCase())
      .is("referred_id", null)
      .limit(1)
      .maybeSingle();

    if (lookupErr || !seed) {
      return { ok: false, reason: "That code doesn't look right. Double-check and try again." };
    }

    if (seed.referrer_id === user.id) {
      return { ok: false, reason: "You can't refer yourself." };
    }

    // Insert the redemption row — unique index on referred_id prevents doubles.
    const { error: insertErr } = await sb.from("referrals").insert({
      referrer_id: seed.referrer_id,
      code: code.trim().toLowerCase(),
      referred_id: user.id,
      status: "pending",
      reward_granted: false,
    });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return { ok: false, reason: "You've already redeemed a referral code." };
      }
      console.warn("[referrals] redeemCode insert failed:", insertErr.message);
      return { ok: false, reason: "Something went wrong. Please try again." };
    }

    // Both sides earn a reward. Stripe fulfilment is triggered by the
    // "subscription.created" webhook (see STRIPE_REFERRED_COUPON_ID note above).
    return { ok: true, referredReward: REFERRED_REWARD };
  } catch (err) {
    console.warn("[referrals] redeemCode threw:", err);
    return { ok: false, reason: "Something went wrong. Please try again." };
  }
}
