"use client";

// Entitlements = billing state, deliberately kept SEPARATE from useGameStore
// (which is progress). This is the single source of truth for "does this user
// have Pro access right now" — which is either a PAID entitlement (`isPro`,
// mirrored from the Supabase profile by AuthProvider) OR an active REVERSE TRIAL.
//
// Reverse trial: every new learner gets full Pro for TRIAL_DAYS, then drops to
// free. This is the highest-leverage edtech conversion lever (freemium converts
// ~2.6% vs. trial-to-paid ~25%) — it lets people feel the Pro tutor + full
// catalog and build a dependency before the paywall ever appears. The trial
// clock starts on first app load (AuthProvider calls startTrial(), idempotent).

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Length of the reverse trial, in days. */
export const TRIAL_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
const TRIAL_MS = TRIAL_DAYS * DAY_MS;

export type EntitlementsState = {
  /** Paid Pro entitlement (from Stripe → Supabase profile). NOT the trial. */
  isPro: boolean;
  /** Epoch ms when the reverse trial began, or null if it never started. */
  trialStartedAt: number | null;
  /** Source-of-truth setter for the PAID flag — called by the auth/profile sync. */
  setPro: (value: boolean) => void;
  /** Begin the reverse trial. Idempotent: no-op if already paid or already started. */
  startTrial: () => void;
};

export const useEntitlements = create<EntitlementsState>()(
  persist(
    (set, get) => ({
      isPro: false,
      trialStartedAt: null,
      setPro: (value) => set({ isPro: value }),
      startTrial: () => {
        const s = get();
        if (s.isPro || s.trialStartedAt != null) return;
        set({ trialStartedAt: Date.now() });
      },
    }),
    { name: "boots-entitlements" },
  ),
);

// ── pure helpers (also usable outside React) ─────────────────────────────────

/** Is the reverse trial currently within its window? */
export function trialActive(s: Pick<EntitlementsState, "trialStartedAt">): boolean {
  return s.trialStartedAt != null && Date.now() < s.trialStartedAt + TRIAL_MS;
}

/** Has the trial been started AND elapsed (i.e. expired, not active)? */
export function trialExpired(s: Pick<EntitlementsState, "trialStartedAt">): boolean {
  return s.trialStartedAt != null && Date.now() >= s.trialStartedAt + TRIAL_MS;
}

/** Whole days remaining in the trial (rounded up; 0 once expired). */
export function trialDaysLeft(s: Pick<EntitlementsState, "trialStartedAt">): number {
  if (s.trialStartedAt == null) return 0;
  const ms = s.trialStartedAt + TRIAL_MS - Date.now();
  return ms <= 0 ? 0 : Math.ceil(ms / DAY_MS);
}

// ── selector hooks ───────────────────────────────────────────────────────────

/**
 * The question every paywall/gate should ask: "does this user have Pro access?"
 * True when they're paid OR inside the reverse-trial window. Recomputed each
 * render, so it flips to false naturally once the trial elapses.
 */
export function useProAccess(): boolean {
  return useEntitlements((s) => s.isPro || trialActive(s));
}

export type TrialStatus = {
  /** Paid Pro (not a trial). */
  paid: boolean;
  /** Trial is started and still within its window. */
  active: boolean;
  /** Trial was started and has elapsed. */
  expired: boolean;
  daysLeft: number;
};

/** Trial status for UI (banners, CTAs). */
export function useTrialStatus(): TrialStatus {
  return useEntitlements((s) => ({
    paid: s.isPro,
    active: !s.isPro && trialActive(s),
    expired: !s.isPro && trialExpired(s),
    daysLeft: trialDaysLeft(s),
  }));
}
