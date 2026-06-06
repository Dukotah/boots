"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Mail, Check } from "lucide-react";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import { useGameStore } from "@/store/useGameStore";
import { track } from "@/lib/analytics/track";

export default function LoginPage() {
  const user = useGameStore((s) => s.user);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [origin, setOrigin] = useState("");
  // COPPA: we don't knowingly collect data from under-13s. Require an age
  // attestation before any sign-in path runs. (Kids under 13 use the free,
  // account-less local mode.)
  const [ageOk, setAgeOk] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  async function github() {
    const sb = getSupabaseBrowserClient();
    if (!sb || !ageOk) return;
    // Fire before the OAuth redirect so the event lands even as the tab navigates.
    track("signup", { method: "github" });
    await sb.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${origin}/dashboard` },
    });
  }

  async function magicLink() {
    const sb = getSupabaseBrowserClient();
    if (!sb || !email || !ageOk) return;
    await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/dashboard` },
    });
    setSent(true);
    track("signup", { method: "magic_link" });
  }

  async function signOut() {
    const sb = getSupabaseBrowserClient();
    if (sb) await sb.auth.signOut();
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Sign in</h1>
        <p className="mt-3 text-gray-400">
          Accounts aren&apos;t configured yet — your progress is saved locally on
          this device. Connect a Supabase project to enable sign-in and cloud
          sync.
        </p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">You&apos;re signed in</h1>
        <p className="mt-2 text-gray-400">{user.email}</p>
        <button onClick={signOut} className="btn-ghost mx-auto mt-6">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-white">
        Sign in to Cantrip
      </h1>
      <p className="mt-2 text-center text-gray-400">
        Sync your progress across devices, compete in leagues, and build your
        GitHub journey.
      </p>

      {/* COPPA age gate — must be checked before any sign-in path is enabled. */}
      <label className="mt-6 flex cursor-pointer items-start gap-2.5 rounded-lg border border-line bg-canvas/40 px-3 py-3 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={ageOk}
          onChange={(e) => setAgeOk(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
        />
        <span>
          I&apos;m 13 or older and agree to the{" "}
          <Link href="/terms" className="text-accent-soft hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-accent-soft hover:underline">
            Privacy Policy
          </Link>
          . Under 13? You can still learn for free — your progress just saves on
          this device.
        </span>
      </label>

      <button
        onClick={github}
        disabled={!ageOk}
        className="btn-primary mt-4 w-full justify-center py-3 disabled:opacity-40"
      >
        <Github size={18} aria-hidden="true" /> Continue with GitHub
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-gray-600">
        <div className="h-px flex-1 bg-line" /> or <div className="h-px flex-1 bg-line" />
      </div>

      {sent ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
          <Check size={16} aria-hidden="true" /> Check your inbox for a magic link.
        </div>
      ) : (
        <div className="space-y-2">
          <label htmlFor="login-email" className="sr-only">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-line bg-canvas/60 px-3 py-2.5 text-sm text-white placeholder:text-gray-600"
          />
          <button
            onClick={magicLink}
            disabled={!email || !ageOk}
            className="btn-ghost w-full justify-center py-2.5 disabled:opacity-40"
          >
            <Mail size={16} aria-hidden="true" /> Email me a magic link
          </button>
        </div>
      )}
    </div>
  );
}
