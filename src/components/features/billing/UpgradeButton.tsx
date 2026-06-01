"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { startCheckout } from "@/lib/billing/checkout";
import type { PlanId } from "@/lib/billing/plans";

export function UpgradeButton({
  plan = "annual",
  className = "btn-primary",
  children,
}: {
  plan?: PlanId;
  className?: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    const result = await startCheckout(plan);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
    }
    // On success the browser redirects to Stripe, so we stay in the loading state.
  }

  return (
    <div className="w-full">
      <button onClick={go} disabled={loading} className={`${className} w-full disabled:opacity-60`}>
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Sparkles size={16} />
        )}
        {children ?? "Go Pro"}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-danger">{error}</p>
      )}
    </div>
  );
}
