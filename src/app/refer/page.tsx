"use client";

// /refer — the full referral programme page.
//
// Shows the user's unique shareable link, a copy button, and their referral
// stats (invited / completed / months earned). Gracefully degrades:
// - Supabase not configured → "backend not available" message.
// - User not signed in → "sign in to get your referral link" CTA.
// - Any fetch error → silent no-op, keeps last state.

import { useEffect, useRef, useState } from "react";
import { Link2, Copy, Check, Users, Trophy, Gift } from "lucide-react";
import {
  getOrCreateMyCode,
  getMyReferralStats,
  redeemCode,
  buildReferralUrl,
  type ReferralStats,
} from "@/lib/referrals";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function ReferPage() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referralUrl, setReferralUrl] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null); // null = loading
  const [copied, setCopied] = useState(false);
  const [redeemInput, setRedeemInput] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine auth + load data
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured) {
        setSignedIn(false);
        return;
      }

      const sb = getSupabaseBrowserClient();
      if (!sb) {
        setSignedIn(false);
        return;
      }

      const {
        data: { user },
      } = await sb.auth.getUser().catch(() => ({ data: { user: null } }));

      if (cancelled) return;

      if (!user) {
        setSignedIn(false);
        return;
      }

      setSignedIn(true);

      const [code, st] = await Promise.all([getOrCreateMyCode(), getMyReferralStats()]);

      if (cancelled) return;

      if (code) setReferralUrl(buildReferralUrl(code));
      if (st) setStats(st);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCopy() {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may be unavailable in some contexts — no-op
    }
  }

  async function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    if (!redeemInput.trim()) return;
    setRedeeming(true);
    setRedeemStatus(null);
    const result = await redeemCode(redeemInput.trim());
    setRedeeming(false);
    if (result.ok) {
      setRedeemStatus({ ok: true, msg: "Code redeemed! Your free month will be applied once your subscription activates." });
      setRedeemInput("");
    } else {
      setRedeemStatus({ ok: false, msg: result.reason });
    }
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (signedIn === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center text-gray-500">
        Loading…
      </div>
    );
  }

  // ── Not signed in ──────────────────────────────────────────────────────────
  if (!signedIn) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-soft">
          <Gift size={26} />
        </div>
        <h1 className="text-2xl font-bold text-white">Give a month, get a month</h1>
        <p className="mt-3 text-sm text-gray-400">
          Invite a friend to Cantrip. When they subscribe, you both get a free
          month of Pro — no limits on how many friends you can invite.
        </p>
        <a
          href="/login?next=/refer"
          className="btn-primary mt-6 inline-flex"
        >
          Sign in to get your referral link
        </a>
        {!isSupabaseConfigured && (
          <p className="mt-4 text-xs text-gray-600">
            (Referral backend not configured in this environment.)
          </p>
        )}
      </div>
    );
  }

  // ── Signed in ─────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
          <Gift size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Give a month, get a month</h1>
          <p className="text-sm text-gray-400">
            Invite friends to Cantrip. You both earn a free Pro month when they subscribe.
          </p>
        </div>
      </div>

      {/* Shareable link */}
      <div className="card mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Your referral link
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-canvas/60 px-3 py-2">
            <Link2 size={15} className="shrink-0 text-gray-500" />
            <span className="truncate font-mono text-sm text-white">
              {referralUrl ?? "Generating…"}
            </span>
          </div>
          <button
            onClick={handleCopy}
            disabled={!referralUrl}
            className="btn-ghost flex shrink-0 items-center gap-1.5 text-sm"
            aria-label="Copy referral link"
          >
            {copied ? (
              <>
                <Check size={15} className="text-success" />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Share this link anywhere — your code is embedded in the URL.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="card text-center">
          <Users size={18} className="mx-auto mb-1 text-accent-soft" />
          <p className="text-2xl font-bold text-white">{stats?.invited ?? 0}</p>
          <p className="text-xs text-gray-400">invited</p>
        </div>
        <div className="card text-center">
          <Trophy size={18} className="mx-auto mb-1 text-success" />
          <p className="text-2xl font-bold text-white">{stats?.completed ?? 0}</p>
          <p className="text-xs text-gray-400">subscribed</p>
        </div>
        <div className="card text-center">
          <Gift size={18} className="mx-auto mb-1 text-gold" />
          <p className="text-2xl font-bold text-white">{stats?.monthsEarned ?? 0}</p>
          <p className="text-xs text-gray-400">months earned</p>
        </div>
      </div>

      {/* How it works */}
      <div className="card mt-4">
        <h2 className="mb-3 text-sm font-semibold text-white">How it works</h2>
        <ol className="space-y-2 text-sm text-gray-400">
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-accent-soft">1.</span>
            Share your link. Friends land on Cantrip with your code pre-filled.
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-accent-soft">2.</span>
            They sign up and start a Pro subscription.
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-accent-soft">3.</span>
            You both automatically receive one free month of Pro — no caps.
          </li>
        </ol>
      </div>

      {/* Redeem a code you received */}
      <div className="card mt-4">
        <h2 className="mb-1 text-sm font-semibold text-white">Redeem a referral code</h2>
        <p className="mb-3 text-xs text-gray-500">
          Got a code from a friend? Enter it here to link your accounts.
        </p>
        <form onSubmit={handleRedeem} className="flex items-center gap-2">
          <input
            type="text"
            value={redeemInput}
            onChange={(e) => setRedeemInput(e.target.value)}
            placeholder="e.g. a1b2c3d4"
            className="flex-1 rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-accent/60"
            disabled={redeeming}
          />
          <button
            type="submit"
            disabled={redeeming || !redeemInput.trim()}
            className="btn-primary shrink-0 text-sm"
          >
            {redeeming ? "Redeeming…" : "Redeem"}
          </button>
        </form>
        {redeemStatus && (
          <p
            className={`mt-2 text-xs ${
              redeemStatus.ok ? "text-success" : "text-danger"
            }`}
          >
            {redeemStatus.msg}
          </p>
        )}
      </div>
    </div>
  );
}
