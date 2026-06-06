// Product-analytics event taxonomy on top of the existing Plausible setup.
// Plausible is cookieless and collects no PII — critical because Cantrip has
// under-13 learners (COPPA). No user IDs, emails, or any identifying props
// should ever appear here.
//
// IDENTITY NOTE: Plausible is deliberately anonymous/cookieless. Do NOT add
// any `identifyUser()` or similar call — there is no identity layer here by
// design. If you add a PII-aware analytics destination later (PostHog, Mixpanel,
// Segment), wire it up in a separate module, never in this file, and ensure
// it is age-gated at the Supabase auth layer (min age 13 enforced at sign-in).
//
// Usage:
//   import { track } from "@/lib/analytics/track";
//   track("lesson_completed", { lesson_id: "js/variables", xp: 10 });
//
// The function is safe to call during SSR (typeof window guard), in event
// handlers, and in Zustand actions. It no-ops when Plausible is absent.

// ── Event name taxonomy ────────────────────────────────────────────────────
// These are the canonical funnel events. Adding a new one means adding it here
// AND to docs/analytics-events.md.

export type FunnelEvent =
  | "signup"
  | "onboarding_goal_selected"
  | "lesson_started"
  | "lesson_completed"
  | "first_all_green"
  | "daily_challenge_completed"
  | "streak_milestone"
  | "paywall_viewed"
  | "checkout_started"
  | "purchase"
  | "referral_shared"
  | "referral_redeemed"
  | "experiment_exposure";

// ── Per-event props ────────────────────────────────────────────────────────
// Props are kept to a handful of high-signal dimensions. No PII ever.

type EventProps = {
  signup: {
    /** "github" | "magic_link" */
    method: string;
  };
  onboarding_goal_selected: {
    /** Goal id from lib/goals, e.g. "frontend" */
    goal: string;
  };
  lesson_started: {
    /** "moduleSlug/lessonSlug", e.g. "javascript/variables" */
    lesson_id: string;
  };
  lesson_completed: {
    /** "moduleSlug/lessonSlug" */
    lesson_id: string;
    /** XP awarded for this completion (0 on re-complete) */
    xp: number;
  };
  /** Fired the first time a learner gets all tests green on a lesson. */
  first_all_green: {
    /** "moduleSlug/lessonSlug" */
    lesson_id: string;
  };
  /** Fired when a learner claims the daily-challenge bonus (genuine completion). */
  daily_challenge_completed: {
    /** The daily-challenge streak length after this claim. */
    streak: number;
  };
  streak_milestone: {
    /** Current streak length, e.g. 7, 30, 100 */
    streak: number;
  };
  paywall_viewed: {
    /** Where the paywall was triggered, e.g. "pricing_page", "pro_gate" */
    source: string;
  };
  checkout_started: {
    /** "monthly" | "annual" */
    plan: string;
  };
  purchase: {
    plan: string;
  };
  referral_shared: Record<string, never>;
  referral_redeemed: Record<string, never>;
  /** Fired once per session when a learner is bucketed into an experiment. */
  experiment_exposure: {
    /** Experiment key from lib/experiments */
    key: string;
    /** Assigned variant */
    variant: string;
  };
};

// ── Plausible window augmentation ─────────────────────────────────────────

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Fire a typed product-analytics event via Plausible.
 * No-ops silently when:
 *   - called server-side (SSR / RSC)
 *   - Plausible script hasn't loaded (dev / no domain configured)
 *
 * Props are coerced to the allowed Plausible primitive types.
 * Never include PII — see IDENTITY NOTE at the top of this file.
 */
export function track<E extends FunnelEvent>(
  event: E,
  ...[props]: EventProps[E] extends Record<string, never>
    ? [props?: EventProps[E]]
    : [props: EventProps[E]]
): void {
  // SSR guard — Plausible only exists in the browser.
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;

  window.plausible(event, props ? { props: props as Record<string, string | number | boolean> } : undefined);
}
