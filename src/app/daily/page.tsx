"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coins,
  Flame,
  Share2,
  Trophy,
} from "lucide-react";
import {
  pickDaily,
  todayDailyKey,
  recentDailyPicks,
  deriveDailyMeta,
  streakMilestoneMessage,
  richDailyShareText,
  DAILY_BONUS_GOLD,
  DAILY_BONUS_XP,
} from "@/lib/daily";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export default function DailyChallengePage() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const claimedDay = useGameStore((s) => s.dailyChallengeClaimed);
  const streak = useGameStore((s) => s.dailyChallengeStreak);
  const best = useGameStore((s) => s.dailyChallengeBest);
  const claimDaily = useGameStore((s) => s.claimDailyChallenge);
  const [shared, setShared] = useState(false);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="card h-40" />
      </div>
    );
  }

  const today = todayDailyKey();
  const pick = pickDaily(today);
  const meta = deriveDailyMeta(pick);
  const milestone = streakMilestoneMessage(streak);
  const done = completed.includes(pick.id);
  const claimed = claimedDay === today;
  const recent = recentDailyPicks(7).slice(1); // exclude today (shown above)

  async function share() {
    const text = richDailyShareText(streak, pick, meta);
    const url =
      typeof window !== "undefined" ? `${window.location.origin}/daily` : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Cantrip — Challenge of the Day", text, url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text + url);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // user dismissed the share sheet — no-op
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <CalendarDays className="text-accent-soft" /> Challenge of the Day
      </h1>
      <p className="mt-1 text-gray-400">
        One lesson, the same for everyone, every day. Clear it for a bonus and
        keep the streak alive.
      </p>

      {/* Streak stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="card flex items-center gap-3">
          <Flame className="text-danger" />
          <div>
            <p className="text-2xl font-bold text-white">{streak}</p>
            <p className="text-xs text-gray-400">Challenge streak</p>
          </div>
        </div>
        <div className="card flex items-center gap-3">
          <Trophy className="text-gold" />
          <div>
            <p className="text-2xl font-bold text-white">{best}</p>
            <p className="text-xs text-gray-400">Best streak</p>
          </div>
        </div>
      </div>

      {/* Milestone banner — only shown at notable thresholds */}
      {milestone && (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-300">
          {milestone}
        </div>
      )}

      {/* Today's challenge */}
      <div className="card mt-4 bg-gradient-to-br from-accent/15 to-fuchsia-500/5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-soft">
            Today · {pick.module.title}
          </p>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.difficultyColor}`}>
              {meta.difficulty}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500">
              <Clock size={11} /> ~{meta.estimatedMinutes} min
            </span>
          </div>
        </div>

        {/* Tech tags */}
        {meta.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href={pick.href} className="group mt-3 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-3xl">
            {pick.module.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-semibold text-white group-hover:text-accent-soft">
              {pick.lesson.title}
            </p>
            <p className="truncate text-sm text-gray-400">{pick.lesson.blurb}</p>
          </div>
        </Link>

        <div className="mt-4">
          {!done ? (
            <Link
              href={pick.href}
              className="btn-primary flex w-full items-center justify-center gap-1.5"
            >
              Start the challenge — +{pick.lesson.xp} XP <ArrowRight size={16} />
            </Link>
          ) : claimed ? (
            <div className="space-y-2">
              <p className="flex items-center justify-center gap-1.5 rounded-lg border border-success/30 bg-success/10 py-2.5 text-sm font-medium text-success">
                <CheckCircle2 size={16} /> Bonus claimed — back tomorrow!
              </p>
              <button
                onClick={share}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface-2 py-2.5 text-sm font-medium text-white hover:border-accent/50"
              >
                <Share2 size={15} /> {shared ? "Shared!" : "Share your streak"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => claimDaily()}
              className="btn-primary flex w-full items-center justify-center gap-1.5"
            >
              <Coins size={16} /> Claim +{DAILY_BONUS_GOLD} gold & +{DAILY_BONUS_XP} XP
            </button>
          )}
        </div>
      </div>

      {/* Recent days */}
      <h2 className="mt-10 text-lg font-bold text-white">Recent challenges</h2>
      <div className="mt-3 space-y-2">
        {recent.map(({ dayKey, offset, pick: p }) => {
          const wasDone = completed.includes(p.id);
          return (
            <Link
              key={dayKey}
              href={p.href}
              className="card group flex items-center gap-3 py-3 hover:border-accent/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-lg">
                {p.module.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white group-hover:text-accent-soft">
                  {p.lesson.title}
                </p>
                <p className="text-xs text-gray-500">
                  {offset === 1 ? "Yesterday" : `${offset} days ago`}
                </p>
              </div>
              {wasDone ? (
                <CheckCircle2 size={16} className="shrink-0 text-success" />
              ) : (
                <span className="shrink-0 text-xs text-gray-500">+{p.lesson.xp} XP</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
