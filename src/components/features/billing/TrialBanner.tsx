"use client";

// Surfaces the reverse-trial state (see useEntitlements). During the trial it
// reassures + gently nudges; once expired it's the conversion moment. Paid users
// and users who haven't started a trial see nothing. The expired banner is
// dismissible (remembered locally) so it informs without nagging forever.

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Crown, X } from "lucide-react";
import { useTrialStatus, TRIAL_DAYS } from "@/store/useEntitlements";
import { useMounted } from "@/hooks/useMounted";

const DISMISS_KEY = "cantrip_trial_expired_dismissed";

export function TrialBanner() {
  const mounted = useMounted();
  const { active, expired, daysLeft } = useTrialStatus();
  const [dismissed, setDismissed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem(DISMISS_KEY) === "1",
  );

  if (!mounted) return null;

  // ── Active trial: reassure, and escalate urgency in the final stretch ──
  if (active) {
    const urgent = daysLeft <= 3;
    return (
      <div
        className={`mb-6 flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 ${
          urgent
            ? "border-amber-500/40 bg-amber-500/10"
            : "border-accent/30 bg-accent/5"
        }`}
      >
        <Sparkles
          size={18}
          className={urgent ? "text-amber-300" : "text-accent-soft"}
        />
        <p className="flex-1 text-sm text-gray-200">
          <span className="font-semibold text-white">
            You&apos;re on a {TRIAL_DAYS}-day Pro trial
          </span>{" "}
          — {daysLeft} day{daysLeft === 1 ? "" : "s"} left. Every lesson, the
          Cantrip AI tutor, boss battles &amp; more are unlocked.
        </p>
        <Link
          href="/pricing"
          className={urgent ? "btn-primary text-sm" : "btn-ghost text-sm"}
        >
          {urgent ? "Keep Pro" : "See plans"}
        </Link>
      </div>
    );
  }

  // ── Expired trial: the conversion moment (dismissible) ──
  if (expired && !dismissed) {
    return (
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-gold/40 bg-gradient-to-r from-amber-500/10 to-fuchsia-500/5 px-4 py-3">
        <Crown size={18} className="text-gold" />
        <p className="flex-1 text-sm text-gray-200">
          <span className="font-semibold text-white">
            Your Pro trial has ended.
          </span>{" "}
          Upgrade to keep the AI tutor, every interactive lesson, boss battles
          &amp; league seasons.
        </p>
        <Link href="/pricing" className="btn-primary text-sm">
          Upgrade
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            try {
              window.localStorage.setItem(DISMISS_KEY, "1");
            } catch {
              /* storage blocked — fine, it just won't persist the dismissal */
            }
          }}
          className="text-gray-500 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return null;
}
