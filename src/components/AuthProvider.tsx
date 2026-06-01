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
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import { useGameStore } from "@/store/useGameStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useGameStore((s) => s.setSession);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const sb = getSupabaseBrowserClient();
    if (!sb) return;

    // Bootstrap: get the current session on mount.
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Subscribe to future auth changes (sign-in / sign-out / token refresh).
    const { data: listener } = sb.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  return <>{children}</>;
}
