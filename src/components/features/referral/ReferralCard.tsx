"use client";

// Compact referral card for the dashboard ("give a month, get a month").
//
// Fetches the user's code + stats from /api/referrals (server-side Supabase,
// so it works from any component without needing the browser client). Renders
// nothing when the backend is unconfigured or the user is signed out.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, Copy, Check } from "lucide-react";
import { REFERRER_REWARD, REFERRED_REWARD } from "@/lib/referrals";

type ReferralData = {
  skipped?: boolean;
  code?: string;
  invited?: number;
  completed?: number;
  monthsEarned?: number;
  error?: string;
};

export function ReferralCard() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referrals")
      .then((r) => r.json())
      .then((d: ReferralData) => setData(d))
      .catch(() => setData({ skipped: true }));
  }, []);

  // Hide entirely when backend is absent, unconfigured, or errored.
  if (!data || data.skipped || data.error || !data.code) return null;

  const referralUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/?ref=${data.code}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available — no-op */
    }
  }

  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-gold" />
          <h2 className="text-sm font-semibold text-white">Invite friends — you both earn free Pro</h2>
        </div>
        <Link
          href="/refer"
          className="text-xs text-accent-soft hover:underline"
        >
          Details →
        </Link>
      </div>

      {/* Two-sided reward pitch */}
      <div className="mt-2 flex gap-3 text-xs">
        <span className="rounded-md bg-accent/10 px-2 py-1 text-accent-soft font-medium">
          You: {REFERRER_REWARD}
        </span>
        <span className="rounded-md bg-gold/10 px-2 py-1 text-gold font-medium">
          Friend: {REFERRED_REWARD}
        </span>
      </div>

      {/* Link row */}
      <div className="mt-3 flex items-center gap-2">
        <span className="flex-1 truncate rounded-md border border-line bg-canvas/60 px-2 py-1.5 font-mono text-xs text-gray-300">
          {referralUrl}
        </span>
        <button
          onClick={handleCopy}
          className="btn-ghost flex shrink-0 items-center gap-1 text-xs"
          aria-label="Copy referral link"
        >
          {copied ? (
            <Check size={13} className="text-success" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Mini stats */}
      <div className="mt-3 flex gap-4 text-xs text-gray-400">
        <span>
          <span className="font-semibold text-white">{data.invited}</span> invited
        </span>
        <span>
          <span className="font-semibold text-white">{data.completed}</span> subscribed
        </span>
        <span>
          <span className="font-semibold text-gold">{data.monthsEarned}</span> months earned
        </span>
      </div>
    </div>
  );
}
