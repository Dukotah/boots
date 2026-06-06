"use client";

// /recap — "Your week in code" retention recap card.
//
// Reads the three store selectors (weekly(), season(), stats()) plus the raw
// achievements array, feeds them through the pure computeRecap() helper in
// lib/recap.ts, and renders the polished RecapCard with a share button.
//
// The page is client-only (store is localStorage-persisted) and has no network
// deps, so it works fully offline and degrades gracefully when Supabase is not
// configured.

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { computeRecap } from "@/lib/recap";
import { RecapCard } from "@/components/features/retention/RecapCard";

export default function RecapPage() {
  const mounted = useMounted();

  // ── Store slices (stable selectors; called unconditionally) ─────────────
  const weekly = useGameStore((s) => s.weekly);
  const season = useGameStore((s) => s.season);
  const stats = useGameStore((s) => s.stats);
  const achievements = useGameStore((s) => s.achievements);

  // ── Compute recap (pure; memoised so it re-runs only when deps change) ──
  const recap = useMemo(() => {
    if (!mounted) return null;
    return computeRecap({
      weekly: weekly(),
      season: season(),
      stats: stats(),
      achievements,
      // We don't track a week-start snapshot server-side yet, so newAchievements
      // is omitted here — the card hides that section gracefully when empty.
    });
  }, [mounted, weekly, season, stats, achievements]);

  // ── Skeleton while store hydrates ───────────────────────────────────────
  if (!mounted || !recap) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 flex items-center gap-2 text-3xl font-bold text-white">
          <CalendarDays className="text-accent-soft" />
          Your week in code
        </div>
        <div className="card h-80 animate-pulse" />
      </div>
    );
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
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold text-white">
        <CalendarDays className="text-accent-soft" />
        Your week in code
      </h1>

      {/* Recap card (polished, shareable) */}
      <RecapCard data={recap} />

      {/* CTAs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/leagues"
          className="btn-ghost flex items-center justify-center gap-1.5 py-3 text-sm"
        >
          View League standings
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
