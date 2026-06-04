// Creates a Stripe Checkout session for a subscription and returns its URL.
//
// Implemented against the Stripe REST API directly (form-encoded) so we don't
// add the Stripe SDK dependency yet. Degrades gracefully: if Stripe isn't
// configured, returns 501 with a clear message instead of throwing.
//
// When a learner is signed in we attach `client_reference_id` = user.id and
// `customer_email`, so the Stripe webhook can map the completed subscription
// back to their profile and grant Pro.

import { NextResponse } from "next/server";
import { getStripePriceId, type PlanId } from "@/lib/billing/plans";
import { getSupabaseServerClient } from "@/lib/supabase/server";

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

  // Tie the checkout to the signed-in learner so the webhook can grant Pro to
  // the right profile. Best-effort: anonymous checkout still works (they just
  // won't be auto-entitled until they sign in with the same email).
  const sb = getSupabaseServerClient();
  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (user) {
      form.set("client_reference_id", user.id);
      if (user.email) form.set("customer_email", user.email);
    }
  }

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
