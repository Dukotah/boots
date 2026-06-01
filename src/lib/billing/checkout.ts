"use client";

// Client helper: kicks off a Stripe Checkout session via our API route and
// redirects the browser to Stripe's hosted page. No Stripe JS SDK needed — we
// just follow the session URL the server returns.

import type { PlanId } from "./plans";

export type CheckoutResult = { ok: true } | { ok: false; error: string };

export async function startCheckout(plan: PlanId): Promise<CheckoutResult> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      return { ok: false, error: body.error ?? `Checkout failed (${res.status})` };
    }

    const { url } = (await res.json()) as { url?: string };
    if (!url) return { ok: false, error: "No checkout URL returned." };

    window.location.assign(url);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
