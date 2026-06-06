"use client";

import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  achievementsByCategory,
  type AchievementDef,
} from "@/lib/achievements";
import { deriveBreadth } from "@/lib/progress";
import { levelFromXp } from "@/lib/levels";
import type { PlayerStats } from "@/types/game";
import { AchievementProgressBar } from "@/components/features/achievements/AchievementProgressBar";

const RARITY: Record<string, string> = {
  common: "border-gray-500/40 text-gray-300",
  rare: "border-sky-500/50 text-sky-300 shadow-[0_0_20px_-8px_rgba(56,189,248,0.6)]",
  epic: "border-violet-500/50 text-violet-300 shadow-[0_0_20px_-8px_rgba(167,139,250,0.6)]",
  legendary:
    "border-gold/60 text-gold shadow-[0_0_28px_-8px_rgba(250,204,21,0.7)]",
};

export default function AchievementsPage() {
  const mounted = useMounted();
  const unlocked = useGameStore((s) => s.achievements);
  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);

  const have = new Set(mounted ? unlocked : []);
  const earned = have.size;
  const total = ACHIEVEMENTS.length;
  const pct = Math.round((earned / total) * 100);

  // Build a PlayerStats snapshot so progress fns can read it. Only computed
  // client-side after mount to avoid SSR mismatches with localStorage state.
  const stats: PlayerStats | null = mounted
    ? {
        xp,
        level: levelFromXp(xp).level,
        gold,
        streak,
        completedCount: completed.length,
        completedIds: completed,
        ...deriveBreadth(completed),
      }
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
        <span className="text-sm text-gray-400">
          {earned}/{total} unlocked
        </span>
      </div>
      <p className="mt-1 text-gray-400">
        Rewards for breadth and habit — never grind. Keep your streak and explore
        new languages to fill the case.
      </p>

      {/* Overall completion bar */}
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {ACHIEVEMENT_CATEGORIES.map((cat) => {
        const items = achievementsByCategory(cat.id);
        if (items.length === 0) return null;
        const got = items.filter((a) => have.has(a.id)).length;
        return (
          <section key={cat.id} className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-white">
                <span className="mr-2">{cat.icon}</span>{cat.label}
              </h2>
              <span className="text-xs text-gray-500">
                {got}/{items.length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <Badge
                  key={a.id}
                  achievement={a}
                  got={have.has(a.id)}
                  stats={stats}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Badge({
  achievement: a,
  got,
  stats,
}: {
  achievement: AchievementDef;
  got: boolean;
  stats: PlayerStats | null;
}) {
  // Secret badges stay masked until earned.
  const hidden = a.secret && !got;
  const title = hidden ? "Secret Achievement" : a.title;
  const description = hidden
    ? "Keep playing to reveal this one…"
    : a.description;
  const icon = got ? a.icon : hidden ? "❓" : "🔒";

  // Derive progress for locked non-secret cards that have a progress fn.
  const progressData =
    !got && !hidden && stats && a.progress ? a.progress(stats) : null;

  return (
    <div
      className={[
        "card flex flex-col items-center text-center transition",
        got ? RARITY[a.rarity] : "border-line opacity-50 grayscale",
      ].join(" ")}
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="mt-2 font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs text-gray-400">{description}</p>

      {/* Reward chips (hidden for masked secrets to preserve mystery) */}
      {!hidden && (a.rewardXp || a.rewardGold) ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          {a.rewardXp ? (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-soft">
              +{a.rewardXp} XP
            </span>
          ) : null}
          {a.rewardGold ? (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">
              +{a.rewardGold} gold
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Progress bar — only on locked non-secret cards that expose a progress fn */}
      {progressData ? (
        <AchievementProgressBar
          current={progressData.current}
          goal={progressData.goal}
        />
      ) : null}

      <span className="mt-3 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
        {a.rarity}
      </span>
    </div>
  );
}
