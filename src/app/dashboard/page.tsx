"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, Zap, Trophy, Target, RotateCcw, Briefcase } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { levelFromXp } from "@/lib/levels";
import { MODULES, totalLessons, totalXpAvailable, lessonId } from "@/lib/curriculum";
import { deriveBreadth } from "@/lib/progress";
import { XPBar } from "@/components/XPBar";
import { DailyQuests } from "@/components/features/quests/DailyQuests";
import { DailyChallenge } from "@/components/features/retention/DailyChallenge";
import { StreakHeatmap } from "@/components/features/retention/StreakHeatmap";
import { EnableNotifications } from "@/components/features/push/EnableNotifications";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const reset = useGameStore((s) => s.reset);

  const info = levelFromXp(xp);
  const doneCount = completed.length;
  const pct = Math.round((doneCount / totalLessons()) * 100);
  const CAREER_SLUGS = ["javascript","python","sql","algorithms","data-structures","interview","system-design","portfolio-projects","git-github","typescript","ai-llms","web-security"];
  const { completedModules } = deriveBreadth(completed);
  const careerPct = Math.round((CAREER_SLUGS.filter(s => completedModules.includes(s)).length / CAREER_SLUGS.length) * 100);

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
    return <div className="mx-auto max-w-5xl px-4 py-10 text-gray-500">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Your dashboard</h1>
        <Link href={continueHref} className="btn-primary">
          <Target size={16} /> Continue learning
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
        <Link href="/u/you" className="card hover:border-accent/60 transition-colors">
          <Briefcase className="mb-2 text-accent-soft" />
          <p className="text-3xl font-bold text-white">{careerPct}%</p>
          <p className="text-sm text-gray-400">career ready</p>
        </Link>
      </div>

      {/* Level progress */}
      <div className="card mt-4">
        <XPBar info={info} />
      </div>

      {/* Challenge of the day */}
      <div className="mt-4">
        <DailyChallenge />
      </div>

      {/* Quick links to new features */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {[
          { href: "/guilds", icon: "🛡️", label: "Guilds", desc: "Team competition" },
          { href: "/events", icon: "🎉", label: "Events", desc: "Seasonal challenges" },
          { href: "/leaderboard", icon: "🏅", label: "Leaderboard", desc: "Global rankings" },
          { href: "/achievements", icon: "🏆", label: "Achievements", desc: "55+ badges" },
          { href: "/leagues", icon: "⚔️", label: "Leagues", desc: "Weekly ranking" },
          { href: "/paths", icon: "🎯", label: "Career Paths", desc: "Job-ready tracks" },
          { href: "/skill-tree", icon: "🌳", label: "Skill Tree", desc: "Unlock abilities" },
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
          {MODULES.map((m) => {
            const done = m.lessons.filter((l) =>
              completed.includes(lessonId(m.slug, l.slug)),
            ).length;
            const mpct = Math.round((done / m.lessons.length) * 100);
            const complete = done === m.lessons.length;
            return (
              <div key={m.slug} className="space-y-1">
              <Link
                href={`/learn/${m.slug}`}
                className="card flex items-center gap-4 hover:border-accent/60"
              >
                <span className="text-3xl">{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{m.title}</p>
                    <span className="text-xs text-gray-400">
                      {done}/{m.lessons.length}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                      style={{ width: `${mpct}%` }}
                    />
                  </div>
                </div>
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
