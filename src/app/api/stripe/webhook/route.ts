// Stripe webhook. Verifies the signature (HMAC-SHA256, no SDK) and reacts to
// subscription lifecycle events by flipping a user's Pro entitlement, writing it
// through the service-role Supabase client (which bypasses RLS and the
// billing-column lockdown trigger).

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

// Stripe needs the raw body for signature verification — force Node runtime.
export const runtime = "nodejs";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Reject signatures whose timestamp is too old/new, so a captured-but-valid
// webhook can't be replayed later (Stripe's recommended tolerance is 5 minutes).
const SIGNATURE_TOLERANCE_SEC = 300;

/** Constant-time check of Stripe's `stripe-signature` header against the body. */
function verify(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=") as [string, string]),
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Replay window: the signed timestamp must be within tolerance of now.
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() / 1000 - ts) > SIGNATURE_TOLERANCE_SEC) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Grant/revoke Pro for the profile referenced by the event, via the service-role
 * client. On the initial checkout we have the user id (client_reference_id) and
 * can also stamp the Stripe customer id, so later subscription events — which
 * carry only the customer id — can map back to the same profile.
 */
async function applyEntitlement(args: {
  isPro: boolean;
  customerId?: string;
  clientReferenceId?: string;
}): Promise<void> {
  const sb = getSupabaseAdminClient();
  if (!sb) {
    console.error("[stripe] entitlement change but admin client unconfigured:", args);
    return;
  }

  // Checkout completion: map by user id and record the customer id for next time.
  if (args.clientReferenceId) {
    await sb
      .from("profiles")
      .update({
        is_pro: args.isPro,
        stripe_customer_id: args.customerId ?? null,
        pro_since: args.isPro ? new Date().toISOString() : null,
      })
      .eq("id", args.clientReferenceId);
    return;
  }

  // Subscription update/delete: map by the customer id stamped at checkout.
  if (args.customerId) {
    await sb
      .from("profiles")
      .update({
        is_pro: args.isPro,
        pro_since: args.isPro ? new Date().toISOString() : null,
      })
      .eq("stripe_customer_id", args.customerId);
  }
}

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET not set." },
      { status: 501 },
    );
  }

  const rawBody = await req.text();
  if (!verify(rawBody, req.headers.get("stripe-signature"), WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    id: string;
    type: string;
    data: { object: Record<string, unknown> };
  };
  const obj = event.data.object;

  // Idempotency: Stripe delivers at-least-once and retries on any non-2xx.
  // Record the event id first; if it's already there, this is a retry — ack and
  // skip so we never double-apply. (No-op when the admin client isn't configured.)
  const sb = getSupabaseAdminClient();
  if (sb) {
    const { error } = await sb
      .from("stripe_events")
      .insert({ id: event.id, type: event.type });
    if (error) {
      // Unique-violation = already processed. Any insert error → treat as seen
      // rather than risk a double charge of entitlement side effects.
      return NextResponse.json({ received: true, duplicate: true });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      await applyEntitlement({
        isPro: true,
        customerId: obj.customer as string | undefined,
        clientReferenceId: obj.client_reference_id as string | undefined,
      });
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await applyEntitlement({
        isPro: obj.status === "active" || obj.status === "trialing",
        customerId: obj.customer as string | undefined,
      });
      break;
    default:
      // Ignore unhandled event types — return 200 so Stripe stops retrying.
      break;
  }

  return NextResponse.json({ received: true });
}
