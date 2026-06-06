"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics/track";

// Drop this component anywhere the Stripe success redirect lands
// (currently /dashboard?upgraded=1&plan=annual|monthly).
// It fires track("purchase", { plan }) exactly once on mount when the
// URL contains both `upgraded=1` and a known `plan` value, then removes
// the query params from the browser history so refreshes don't re-fire
// (Plausible itself is idempotent, but this keeps the URL clean).
export function PurchaseTracker() {
  const params = useSearchParams();

  useEffect(() => {
    const upgraded = params.get("upgraded");
    const plan = params.get("plan");
    if (upgraded !== "1") return;
    if (plan !== "monthly" && plan !== "annual") return;

    track("purchase", { plan });

    // Strip the billing query params without a full navigation.
    const url = new URL(window.location.href);
    url.searchParams.delete("upgraded");
    url.searchParams.delete("plan");
    window.history.replaceState({}, "", url.toString());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty: fire once on mount only

  return null;
}
