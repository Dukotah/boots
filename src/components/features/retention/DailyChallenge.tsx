"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Coins, Flame } from "lucide-react";
import { pickDaily, todayDailyKey, DAILY_BONUS_GOLD } from "@/lib/daily";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// Dashboard surface for the "problem of the day". The deterministic pick + streak
// live in lib/daily + the store; this is just the compact card. The full view
// (history, share) is at /daily.
export function DailyChallenge() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const claimedDay = useGameStore((s) => s.dailyChallengeClaimed);
  const streak = useGameStore((s) => s.dailyChallengeStreak);
  const claimDaily = useGameStore((s) => s.claimDailyChallenge);

  if (!mounted) {
    return <div className="card h-28" />;
  }

  const today = todayDailyKey();
  const pick = pickDaily(today);
  const done = completed.includes(pick.id);
  const claimed = claimedDay === today;

  return (
    <div className="card bg-gradient-to-br from-accent/15 to-fuchsia-500/5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-soft">
          <CalendarDays size={13} /> Challenge of the day
        </p>
        <div className="flex items-center gap-3 text-xs">
          {streak > 0 && (
            <span
              className="flex items-center gap-1 font-semibold text-danger"
              title="Daily-challenge streak"
            >
              <Flame size={13} /> {streak}
            </span>
          )}
          <Link href="/daily" className="text-gray-400 hover:text-white">
            View
          </Link>
        </div>
      </div>

      <Link href={pick.href} className="group mt-3 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-2xl">
          {pick.module.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-white group-hover:text-accent-soft">
            {pick.lesson.title}
          </p>
          <p className="truncate text-sm text-gray-400">{pick.lesson.blurb}</p>
        </div>
        {!done && (
          <span className="flex items-center gap-1 text-sm font-medium text-white">
            +{pick.lesson.xp} XP <ArrowRight size={15} />
          </span>
        )}
      </Link>

      {done && (
        <div className="mt-3">
          {claimed ? (
            <p className="flex items-center justify-center gap-1.5 rounded-lg border border-success/30 bg-success/10 py-2 text-sm font-medium text-success">
              <CheckCircle2 size={15} /> Bonus claimed — back tomorrow!
            </p>
          ) : (
            <button
              onClick={() => claimDaily()}
              className="btn-primary flex w-full items-center justify-center gap-1.5"
            >
              <Coins size={15} /> Claim +{DAILY_BONUS_GOLD} gold
            </button>
          )}
        </div>
      )}
    </div>
  );
}
