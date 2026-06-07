"use client";

// DoubleXpBanner — shows a motivating, dismissible banner on Sat/Sun when the
// 2x XP multiplier is active. The active state is derived from the same pure
// `isDoubleXpActive()` function used by the store, so the banner and the
// multiplier are always in sync without any network round-trip.
//
// Dismissal: a session flag (useState, NOT localStorage) is used deliberately.
// Persisting a dismiss token would hide the banner permanently after one
// weekend; resetting it per-session means it reappears on the next page load
// — intentional, because the whole point is urgency and re-engagement.

import { useState } from "react";
import { Zap, X } from "lucide-react";
import { isDoubleXpActive } from "@/lib/events";

export function DoubleXpBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Pure calendar check — no network, no store subscription needed.
  if (!isDoubleXpActive() || dismissed) return null;

  const today = new Date();
  const isSaturday = today.getDay() === 6;
  // On Saturday we have two days; on Sunday just today.
  const timeLeft = isSaturday ? "ends tomorrow night" : "ends tonight";

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 flex items-center gap-3 rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/15 via-amber-500/10 to-yellow-500/5 px-4 py-3"
    >
      {/* Icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
        <Zap className="text-yellow-400" size={18} />
      </div>

      {/* Copy */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-yellow-300">
          2x XP Weekend is live
        </p>
        <p className="text-xs text-yellow-200/70">
          Every lesson earns double XP right now — {timeLeft}. Don&apos;t
          waste it.
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss double XP banner"
        className="shrink-0 rounded-md p-1 text-yellow-400/60 transition-colors hover:text-yellow-300"
      >
        <X size={16} />
      </button>
    </div>
  );
}
