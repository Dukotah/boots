"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Flame, Zap, Trophy, Target, RotateCcw, Briefcase, RefreshCw } from "lucide-react";
import { useGameStore, streakRepairCost } from "@/store/useGameStore";
import { levelFromXp } from "@/lib/levels";
import { MODULES, totalLessons, totalXpAvailable, lessonId } from "@/lib/curriculum";
import { groupByTrack } from "@/lib/curriculum/tracks";
import { deriveBreadth } from "@/lib/progress";
import { computeReadiness } from "@/lib/career";
import type { PlayerStats } from "@/types/game";
import { XPBar } from "@/components/XPBar";
import { TalentBuildCard } from "@/components/features/talents/TalentBuildCard";
import { DailyQuests } from "@/components/features/quests/DailyQuests";
import { DailyChallenge } from "@/components/features/retention/DailyChallenge";
import { StreakHeatmap } from "@/components/features/retention/StreakHeatmap";
import { EnableNotifications } from "@/components/features/push/EnableNotifications";
import { RecommendedNextCard } from "@/components/features/onboarding/RecommendedNextCard";
import { ReferralCard } from "@/components/features/referral/ReferralCard";
import { PurchaseTracker } from "@/components/features/billing/PurchaseTracker";
import { TrialBanner } from "@/components/features/billing/TrialBanner";
import { DoubleXpBanner } from "@/components/features/retention/DoubleXpBanner";
import { InterleaveCard } from "@/components/features/retention/InterleaveCard";
import { PageSkeleton } from "@/components/PageSkeleton";

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const onboarded = useGameStore((s) => s.onboarded);

  // First-run intercept: a brand-new learner (no progress, never onboarded) is
  // sent to pick a goal before landing here. Existing users (any progress) are
  // never redirected, even though `onboarded` defaults false for them.
  useEffect(() => {
    if (mounted && !onboarded && completed.length === 0) {
      router.replace("/onboarding");
    }
  }, [mounted, onboarded, completed.length, router]);
  const talents = useGameStore((s) => s.talents);
  const skillPoints = useGameStore((s) => s.skillPoints);
  const dueReviews = useGameStore((s) => s.dueReviews);
  const lostStreak = useGameStore((s) => s.lostStreak);
  const repairStreak = useGameStore((s) => s.repairStreak);
  const reset = useGameStore((s) => s.reset);

  const info = levelFromXp(xp);
  const doneCount = completed.length;
  const pct = Math.round((doneCount / totalLessons()) * 100);

  // Reuse the store's single source of truth for skill-point math (earned −
  // invested, floored at 0) rather than re-deriving it here.
  const availableSp = skillPoints().available;

  // Single source of truth for "career ready" — the Career Pack score
  // (lib/career), so the dashboard and /career never disagree.
  const careerScore = useMemo(() => {
    const stats: PlayerStats = {
      xp,
      level: info.level,
      gold,
      streak,
      completedCount: completed.length,
      completedIds: completed,
      ...deriveBreadth(completed),
    };
    return computeReadiness(stats).score;
  }, [xp, info.level, gold, streak, completed]);

  // Find the first unfinished lesson to "Continue".
  let continueHref = "/learn";
  for (const m of MODULES) {
    const next = m.lessons.find((l) => !completed.includes(lessonId(m.slug, l.slug)));
    if (next) {
      continueHref = `/learn/${m.slug}/${next.slug}`;
      break;
    }
  }

  if (!mounted) {
    return <PageSkeleton maxW="max-w-5xl" rows={4} />;
  }

  // Spaced-repetition reviews coming due — surfaced here because the feature is
  // otherwise easy to miss (it lives on its own /review page).
  const dueCount = dueReviews().length;

  // A streak broken by a missed day is recoverable for gold (lib store).
  const repairCost = lostStreak ? streakRepairCost(lostStreak) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Fires the `purchase` analytics event when Stripe redirects back here. */}
      <Suspense fallback={null}>
        <PurchaseTracker />
      </Suspense>
      <TrialBanner />
      <DoubleXpBanner />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Your dashboard</h1>
        <Link href={continueHref} className="btn-primary">
          <Target size={16} /> Continue learning
        </Link>
      </div>

      {/* Recommended next — the learner's chosen path (or a nudge to pick one) */}
      <div className="mt-6">
        <RecommendedNextCard />
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <Flame className="mb-2 text-gold" />
          <p className="text-3xl font-bold text-white">{streak}</p>
          <p className="text-sm text-gray-400">day streak</p>
        </div>
        <div className="card">
          <Zap className="mb-2 text-accent-soft" />
          <p className="text-3xl font-bold text-white">{xp}</p>
          <p className="text-sm text-gray-400">
            total XP · {totalXpAvailable()} available
          </p>
        </div>
        <div className="card">
          <Trophy className="mb-2 text-success" />
          <p className="text-3xl font-bold text-white">
            {info.rank.emoji} {info.rank.name}
          </p>
          <p className="text-sm text-gray-400">current rank</p>
        </div>
        <Link
          href="/career"
          className="card transition-colors hover:border-accent/60"
        >
          <Briefcase className="mb-2 text-accent-soft" />
          <p className="text-3xl font-bold text-white">
            {careerScore}
            <span className="text-base font-normal text-gray-500"> / 100</span>
          </p>
          <p className="text-sm text-gray-400">career ready · Career Pack →</p>
        </Link>
      </div>

      {/* Streak repair — a broken streak is recoverable for gold. Urgent, so it
          sits right under the stat cards and only appears when there's one to fix. */}
      {lostStreak && lostStreak >= 2 && (
        <div className="card mt-4 flex flex-col gap-3 border-danger/40 bg-danger/5 sm:flex-row sm:items-center">
          <Flame className="shrink-0 text-danger" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">
              Your {lostStreak}-day streak broke
            </p>
            <p className="text-sm text-gray-400">
              {gold >= repairCost
                ? "Repair it and carry on right where you left off."
                : `You need ${repairCost} gold to repair it — earn a little more first.`}
            </p>
          </div>
          <button
            onClick={() => repairStreak()}
            disabled={gold < repairCost}
            className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Flame size={15} /> Repair streak · {repairCost}g
          </button>
        </div>
      )}

      {/* Level progress */}
      <div className="card mt-4">
        <XPBar info={info} />
      </div>

      {/* Reviews due — spaced repetition. Only shown when something is actually
          due, so it reads as a real call to action, not noise. */}
      {dueCount > 0 && (
        <Link
          href="/review"
          className="card mt-4 flex items-center gap-4 border-accent/40 bg-accent/5 transition-colors hover:border-accent/70"
        >
          <RefreshCw className="text-accent-soft" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">
              {dueCount} {dueCount === 1 ? "review" : "reviews"} due
            </p>
            <p className="text-sm text-gray-400">
              Re-solve what you&apos;ve learned to lock it in — and earn review gold.
            </p>
          </div>
          <span className="btn-primary shrink-0">
            <RefreshCw size={15} /> Review now
          </span>
        </Link>
      )}

      {/* Challenge of the day */}
      <div className="mt-4">
        <DailyChallenge />
      </div>

      {/* Interleaving — revisit well-learned lessons for variety / transfer */}
      <div className="mt-4">
        <InterleaveCard />
      </div>

      {/* Talent build summary */}
      <div className="mt-4">
        <TalentBuildCard talents={talents} availableSp={availableSp} />
      </div>

      {/* Referral programme (self-hides when backend unconfigured / signed out) */}
      <div className="mt-4">
        <ReferralCard />
      </div>

      {/* Quick links to new features */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {[
          { href: "/guilds", icon: "🛡️", label: "Guilds", desc: "Team competition" },
          { href: "/events", icon: "🎉", label: "Events", desc: "Seasonal challenges" },
          { href: "/leaderboard", icon: "🏅", label: "Leaderboard", desc: "Global rankings" },
          { href: "/achievements", icon: "🏆", label: "Achievements", desc: "55+ badges" },
          { href: "/leagues", icon: "⚔️", label: "Leagues", desc: "Weekly ranking" },
          { href: "/paths", icon: "🎯", label: "Career Paths", desc: "Job-ready tracks" },
          { href: "/skill-tree", icon: "🌳", label: "Skill Tree", desc: "Unlock abilities" },
          { href: "/review", icon: "🔁", label: "Review", desc: "Spaced repetition" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card flex flex-col items-center gap-1 text-center hover:border-accent/60 py-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="text-sm font-semibold text-white">{item.label}</p>
            <p className="text-[11px] text-gray-500">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Daily quests */}
      <div className="mt-8">
        <DailyQuests />
      </div>

      {/* Activity heatmap */}
      <div className="mt-4">
        <StreakHeatmap />
        <EnableNotifications />
      </div>

      {/* Course progress */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Course progress</h2>
          <span className="text-sm text-gray-400">
            {doneCount}/{totalLessons()} lessons ({pct}%)
          </span>
        </div>
        <div className="space-y-3">
          {groupByTrack(MODULES).map(({ track, modules }) => {
            const tLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
            const tDone = modules.reduce(
              (s, m) =>
                s +
                m.lessons.filter((l) =>
                  completed.includes(lessonId(m.slug, l.slug)),
                ).length,
              0,
            );
            const tpct = tLessons ? Math.round((tDone / tLessons) * 100) : 0;
            return (
              <details
                key={track.id}
                open={tDone > 0 && tDone < tLessons}
                className="card group"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3">
                  <span className="text-2xl">{track.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{track.label}</p>
                      <span className="ml-2 shrink-0 text-xs text-gray-400">
                        {tDone}/{tLessons} · {modules.length} courses
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                        style={{ width: `${tpct}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-1 shrink-0 text-gray-500 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                </summary>

                <div className="mt-4 space-y-2">
                  {modules.map((m) => {
                    const done = m.lessons.filter((l) =>
                      completed.includes(lessonId(m.slug, l.slug)),
                    ).length;
                    const mpct = Math.round((done / m.lessons.length) * 100);
                    const complete = done === m.lessons.length;
                    return (
                      <div key={m.slug} className="space-y-1">
                        <Link
                          href={`/learn/${m.slug}`}
                          className="flex items-center gap-4 rounded-lg border border-line/60 bg-surface-2/40 px-3 py-2 hover:border-accent/60"
                        >
                          <span className="text-2xl">{m.emoji}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="truncate text-sm font-medium text-white">
                                {m.title}
                              </p>
                              <span className="ml-2 shrink-0 text-xs text-gray-400">
                                {done}/{m.lessons.length}
                              </span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                                style={{ width: `${mpct}%` }}
                              />
                            </div>
                          </div>
                          {complete && (
                            <span className="shrink-0 text-success">✓</span>
                          )}
                        </Link>
                        {complete && (
                          <Link
                            href={`/certificate/${m.slug}`}
                            className="inline-flex items-center gap-1 px-1 text-xs font-medium text-gold hover:underline"
                          >
                            🎓 View your certificate
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          if (confirm("Reset all progress? This can't be undone.")) reset();
        }}
        className="mt-8 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-danger"
      >
        <RotateCcw size={12} /> Reset progress
      </button>
    </div>
  );
}
