// A/B testing + feature-flag framework for Cantrip. Underpins pricing
// experiments and controlled rollouts without rebuilding Stripe — this layer
// just determines which variant a user sees; billing stays in lib/billing.
//
// Bucketing: FNV-1a hash of "<experimentKey>:<unitId>" % sum(weights) -> variant.
// Deterministic and sticky: same user always gets same variant for a given key.
// UnitId is the signed-in userId when available, else a generated anonymous id
// persisted to localStorage under "cantrip_anon_id".
//
// Overrides (QA): ?exp_<key>=<variant> in the URL, or localStorage key
// "cantrip_exp_<key>" = variant. URL wins over localStorage.

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ExperimentVariant = string;

export type Experiment = {
  key: string;
  /** Ordered list of variant names. */
  variants: [ExperimentVariant, ...ExperimentVariant[]];
  /**
   * Per-variant traffic weights. Must be same length as variants.
   * Defaults to equal split when omitted.
   */
  weights?: number[];
  /** Human-readable description for docs / dashboards. */
  description?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry — add new experiments here
// ─────────────────────────────────────────────────────────────────────────────

export const EXPERIMENTS = {
  pricing_annual_default: {
    key: "pricing_annual_default",
    variants: ["monthly_first", "annual_first"],
    weights: [50, 50],
    description:
      "Does defaulting the pricing toggle to 'Annual' increase Pro conversions vs. showing 'Monthly' first?",
  },
  onboarding_skip_visible: {
    key: "onboarding_skip_visible",
    variants: ["on", "off"],
    // equal split (weights omitted → 50/50)
    description:
      "Should the 'Skip onboarding' affordance be visible? Tests drop-off vs. completion.",
  },
} as const satisfies Record<string, Experiment>;

export type ExperimentKey = keyof typeof EXPERIMENTS;

// ─────────────────────────────────────────────────────────────────────────────
// FNV-1a 32-bit hash
// ─────────────────────────────────────────────────────────────────────────────

function fnv1a32(str: string): number {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // 32-bit FNV prime: 0x01000193 — keep in 32-bit range with >>> 0
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

// ─────────────────────────────────────────────────────────────────────────────
// Anonymous id — generated once, stored in localStorage
// ─────────────────────────────────────────────────────────────────────────────

const ANON_KEY = "cantrip_anon_id";

/** Returns (and lazily creates) a stable anonymous unit id from localStorage. */
function getAnonId(): string {
  if (typeof window === "undefined") {
    // SSR: return a placeholder; the hook will re-resolve on mount.
    return "ssr";
  }
  try {
    let id = localStorage.getItem(ANON_KEY);
    if (!id) {
      // Simple random 16-char hex id — no crypto dependency needed.
      id = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join("");
      localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return "fallback";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Overrides — URL param or localStorage, for QA
// ─────────────────────────────────────────────────────────────────────────────

function readOverride(key: string): ExperimentVariant | null {
  if (typeof window === "undefined") return null;
  try {
    // URL param wins: ?exp_<key>=<variant>
    const param = new URLSearchParams(window.location.search).get(`exp_${key}`);
    if (param) return param;
    // localStorage fallback: cantrip_exp_<key>
    return localStorage.getItem(`cantrip_exp_${key}`);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core bucketing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the variant for `experimentKey` assigned to `unitId`.
 * `unitId` defaults to the signed-in user id or the persisted anon id.
 */
export function getVariant(
  experimentKey: string,
  unitId?: string,
): ExperimentVariant {
  const exp = EXPERIMENTS[experimentKey as ExperimentKey] as
    | Experiment
    | undefined;
  if (!exp) return "control"; // unknown experiment → safe default

  // QA override takes top priority.
  const override = readOverride(experimentKey);
  if (override && exp.variants.includes(override as ExperimentVariant)) {
    return override;
  }

  const id = unitId ?? getAnonId();
  const weights =
    exp.weights && exp.weights.length === exp.variants.length
      ? exp.weights
      : exp.variants.map(() => 1);

  const total = weights.reduce((s, w) => s + w, 0);
  const bucket = fnv1a32(`${experimentKey}:${id}`) % total;

  let cursor = 0;
  for (let i = 0; i < exp.variants.length; i++) {
    cursor += weights[i];
    if (bucket < cursor) return exp.variants[i];
  }

  return exp.variants[0]; // should never reach here
}

// ─────────────────────────────────────────────────────────────────────────────
// Exposure tracking — fires once per key per session
// ─────────────────────────────────────────────────────────────────────────────

const _fired = new Set<string>();

/**
 * Fires an 'experiment_exposure' analytics event the first time it's called
 * for a given key in this browser session. Imports track from the sibling
 * analytics module; no-ops gracefully if it isn't present or throws.
 */
export async function trackExposure(
  key: string,
  variant: ExperimentVariant,
): Promise<void> {
  if (typeof window === "undefined") return;
  if (_fired.has(key)) return;
  _fired.add(key);

  try {
    // Dynamic import so a missing sibling never fails the build.
    const mod = await import("@/lib/analytics/track").catch(() => null);
    if (mod && typeof mod.track === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mod.track as (event: string, props: Record<string, unknown>) => void)(
        "experiment_exposure",
        { key, variant },
      );
    }
  } catch {
    // best-effort — never rethrow
  }
}
