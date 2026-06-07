"use client";

// /wrapped — "Cantrip Wrapped" all-time-in-review page (Spotify-Wrapped style).
//
// Reads the store via selectors (never modifies it), feeds raw slices through
// the pure buildWrapped() helper in lib/wrapped.ts, and renders the polished
// WrappedCard with a share button.
//
// The page is client-only (store is localStorage-persisted) and has no network
// deps, so it works fully offline and degrades gracefully when Supabase is not
// configured or for brand-new users with no data yet.

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { buildWrapped, longestStreakFromDays } from "@/lib/wrapped";
import { WrappedCard } from "@/components/features/retention/WrappedCard";
import { PageSkeleton } from "@/components/PageSkeleton";

export default function WrappedPage() {
  const mounted = useMounted();

  // ── Store slices (stable selectors; called unconditionally) ─────────────
  const stats = useGameStore((s) => s.stats);
  const activeDays = useGameStore((s) => s.activeDays);
  const achievements = useGameStore((s) => s.achievements);
  const claimedBosses = useGameStore((s) => s.claimedBosses);
  const dailyChallengeBest = useGameStore((s) => s.dailyChallengeBest);
  const streak = useGameStore((s) => s.streak);

  // ── Compute Wrapped (pure; memoised so it re-runs only when deps change) ─
  const wrapped = useMemo(() => {
    if (!mounted) return null;
    const longestStreak = longestStreakFromDays(activeDays);
    return buildWrapped({
      stats: stats(),
      activeDays,
      achievements,
      claimedBosses,
      dailyChallengeBest,
      streak,
      longestStreak,
    });
  }, [
    mounted,
    stats,
    activeDays,
    achievements,
    claimedBosses,
    dailyChallengeBest,
    streak,
  ]);

  // ── Skeleton while store hydrates ────────────────────────────────────────
  if (!mounted || !wrapped) {
    return <PageSkeleton maxW="max-w-2xl" rows={3} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft size={14} /> Dashboard
      </Link>

      {/* Page heading */}
      <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-white">
        <Sparkles className="text-accent-soft" />
        Cantrip Wrapped
      </h1>
      <p className="mb-6 text-sm text-gray-400">
        Your entire coding journey, by the numbers.
      </p>

      {/* Zero-data first-run state */}
      {!wrapped.hasData ? (
        <div className="card flex flex-col items-center gap-4 py-14 text-center">
          <span className="text-5xl">🧙</span>
          <div>
            <p className="text-lg font-bold text-white">
              Your story hasn&apos;t started yet
            </p>
            <p className="mt-1 max-w-xs text-sm text-gray-400">
              Complete your first lesson and your Wrapped will come alive —
              XP, gold, bosses slain, and more.
            </p>
          </div>
          <Link
            href="/learn"
            className="btn-primary mt-2 flex items-center gap-1.5"
          >
            <BookOpen size={15} /> Start your first lesson
          </Link>
        </div>
      ) : (
        /* Wrapped card (gradient hero, stat grid, share button) */
        <WrappedCard data={wrapped} />
      )}

      {/* CTAs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/achievements"
          className="btn-ghost flex items-center justify-center gap-1.5 py-3 text-sm"
        >
          View achievements
        </Link>
        <Link
          href="/learn"
          className="btn-primary flex items-center justify-center gap-1.5 py-3 text-sm"
        >
          Keep coding &rarr;
        </Link>
      </div>
    </div>
  );
}
