// Stripe webhook. Verifies the signature (HMAC-SHA256, no SDK) and reacts to
// subscription lifecycle events by flipping a user's Pro entitlement.
//
// The actual write to `profiles.is_pro` belongs to the Supabase layer (a
// service-role client), which the auth agent is building. This route does the
// secure plumbing (verification + event routing) and hands off via
// `applyEntitlement` — a single, clearly-marked seam to wire up once that lands.

import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Stripe needs the raw body for signature verification — force Node runtime.
export const runtime = "nodejs";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/** Constant-time check of Stripe's `stripe-signature` header against the body. */
function verify(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=") as [string, string]),
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Hand-off seam: grant/revoke Pro for the customer referenced by the event.
 * TODO(supabase): look up the profile by client_reference_id / customer email
 * and update `profiles.is_pro` via the service-role client.
 */
async function applyEntitlement(args: {
  isPro: boolean;
  customerId?: string;
  clientReferenceId?: string;
  email?: string;
}): Promise<void> {
  console.log("[stripe] entitlement change (wire to Supabase):", args);
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
    type: string;
    data: { object: Record<string, unknown> };
  };
  const obj = event.data.object;

  switch (event.type) {
    case "checkout.session.completed":
      await applyEntitlement({
        isPro: true,
        customerId: obj.customer as string | undefined,
        clientReferenceId: obj.client_reference_id as string | undefined,
        email: (obj.customer_details as { email?: string } | undefined)?.email,
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
