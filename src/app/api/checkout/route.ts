// Creates a Stripe Checkout session for a subscription and returns its URL.
//
// Implemented against the Stripe REST API directly (form-encoded) so we don't
// add the Stripe SDK dependency yet. Degrades gracefully: if Stripe isn't
// configured, returns 501 with a clear message instead of throwing.
//
// When auth lands, attach the Supabase user: pass `client_reference_id` =
// user.id and `customer_email`, so the webhook can map the subscription back to
// a profile.

import { NextResponse } from "next/server";
import { getStripePriceId, type PlanId } from "@/lib/billing/plans";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

function siteUrl(req: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin
  ).replace(/\/$/, "");
}

export async function POST(req: Request) {
  const { plan } = (await req.json().catch(() => ({}))) as { plan?: PlanId };

  if (plan !== "monthly" && plan !== "annual") {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const priceId = getStripePriceId(plan);
  if (!STRIPE_SECRET || !priceId) {
    return NextResponse.json(
      {
        error:
          "Payments aren't configured yet. Set STRIPE_SECRET_KEY and the price IDs in .env.local.",
      },
      { status: 501 },
    );
  }

  const origin = siteUrl(req);
  const form = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/dashboard?upgraded=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    allow_promotion_codes: "true",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const data = (await res.json()) as { url?: string; error?: { message: string } };
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error?.message ?? "Stripe error" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: data.url });
}
