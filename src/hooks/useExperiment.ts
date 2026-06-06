"use client";

// React hook for consuming experiment variants. Returns null on the server and
// on the first client render to prevent hydration mismatches — the same pattern
// used by useMounted() throughout this codebase.
//
// Exposure is tracked automatically on mount (once per key per session).

import { useState, useEffect } from "react";
import { getVariant, trackExposure, type ExperimentVariant } from "@/lib/experiments";

/**
 * Returns the variant assigned to the current user for `experimentKey`.
 *
 * Returns null until mounted (prevents SSR/hydration mismatch). Treat null
 * as "show the default/control experience" in your render logic.
 *
 * @example
 *   const variant = useExperiment('pricing_annual_default');
 *   // variant is null on first render, then 'monthly_first' | 'annual_first'
 *
 * @param experimentKey  A key from the EXPERIMENTS registry in lib/experiments.ts.
 * @param unitId         Optional explicit unit id (e.g. signed-in user id). When
 *                       omitted the hook uses the persisted anonymous id.
 */
export function useExperiment(
  experimentKey: string,
  unitId?: string,
): ExperimentVariant | null {
  const [variant, setVariant] = useState<ExperimentVariant | null>(null);

  useEffect(() => {
    const resolved = getVariant(experimentKey, unitId);
    setVariant(resolved);
    // Fire exposure once per session (async, best-effort).
    void trackExposure(experimentKey, resolved);
  }, [experimentKey, unitId]);

  return variant;
}
