"use client";

// Entitlements = billing state, deliberately kept SEPARATE from useGameStore
// (which is progress). This is the single source of truth for "is this user Pro".
//
// Decoupling note: when the Supabase auth/profile work lands, the sync layer
// should call `useEntitlements.getState().setPro(profile.is_pro)` after loading
// the session. Until then this defaults to false and persists locally, and a
// dev-only toggle (see the pricing page) can flip it for testing the paywall.

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EntitlementsState = {
  isPro: boolean;
  /** Source of truth setter — called by the auth/profile sync once it exists. */
  setPro: (value: boolean) => void;
};

export const useEntitlements = create<EntitlementsState>()(
  persist(
    (set) => ({
      isPro: false,
      setPro: (value) => set({ isPro: value }),
    }),
    { name: "boots-entitlements" },
  ),
);
