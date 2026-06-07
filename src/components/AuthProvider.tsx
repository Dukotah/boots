"use client";

/**
 * AuthProvider – wraps the app and keeps the Supabase auth session in sync
 * with useGameStore.
 *
 * Usage: drop <AuthProvider> around your root layout children (or around
 * <AppShell>) so every page gets the session.
 *
 * When Supabase is not configured (no env vars) this component is a no-op
 * passthrough, so the app boots fine in local / demo mode.
 */

import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import { useGameStore } from "@/store/useGameStore";
import { useEntitlements } from "@/store/useEntitlements";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useGameStore((s) => s.setSession);
  const setPro = useEntitlements((s) => s.setPro);
  const startTrial = useEntitlements((s) => s.startTrial);

  // Kick off the reverse trial on first load (idempotent — only sets the clock
  // once, and never for someone who's already paid). Runs regardless of whether
  // Supabase is configured, so local/demo users get the Pro taste too.
  useEffect(() => {
    startTrial();
  }, [startTrial]);

  // Capture a ?ref=CODE on first load and stash it for the post-sign-in redeem.
  // sessionStorage (not localStorage) is deliberate — it expires with the tab so
  // a stale code never fires on an unrelated later sign-in.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) sessionStorage.setItem("cantrip_ref", ref);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const sb = getSupabaseBrowserClient();
    if (!sb) return;

    // Redeem a stored referral code once, right after the user signs in.
    function redeemStoredReferral() {
      if (typeof window === "undefined") return;
      const code = sessionStorage.getItem("cantrip_ref");
      if (!code) return;
      sessionStorage.removeItem("cantrip_ref");
      void fetch("/api/referrals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(() => undefined);
    }

    // Load the user's Pro entitlement from their profile and mirror it into the
    // billing store (the single source of truth the paywall reads). Clears to
    // false on sign-out so a shared device doesn't keep the last user's Pro.
    async function syncEntitlement(session: Session | null) {
      if (!session?.user) {
        setPro(false);
        return;
      }
      const { data } = await sb!
        .from("profiles")
        .select("is_pro")
        .eq("id", session.user.id)
        .maybeSingle();
      setPro(Boolean((data as { is_pro?: boolean } | null)?.is_pro));
    }

    // Bootstrap: get the current session on mount.
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      void syncEntitlement(data.session);
    });

    // Subscribe to future auth changes (sign-in / sign-out / token refresh).
    const { data: listener } = sb.auth.onAuthStateChange((event, session) => {
      setSession(session);
      void syncEntitlement(session);
      if (event === "SIGNED_IN") redeemStoredReferral();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession, setPro]);

  return <>{children}</>;
}
