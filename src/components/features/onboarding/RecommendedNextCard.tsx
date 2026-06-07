"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Target } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { getGoal, goalPath } from "@/lib/goals";
import { pathLessonIds, pathProgress } from "@/lib/paths";

// The persistent payoff of onboarding: the learner's saved goal becomes a
// "here's your next lesson on your path" card on the dashboard. If they never
// picked a goal, it nudges them into onboarding instead. Client-only (reads
// persisted store), so it self-guards against hydration mismatch.
export function RecommendedNextCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const goal = useGameStore((s) => s.goal);
  const completed = useGameStore((s) => s.completed);

  if (!mounted) return null;

  const goalDef = getGoal(goal);
  const path = goalPath(goal);

  // No goal chosen yet → invite them to onboarding with a sharp value prop.
  if (!goalDef || !path) {
    return (
      <Link
        href="/onboarding"
        className="card group flex items-center justify-between gap-4 transition-transform hover:-translate-y-0.5 hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <div className="flex items-center gap-3">
          <Compass size={22} className="text-accent-soft" aria-hidden />
          <div>
            <p className="font-semibold text-white">Pick a goal — start coding in 60 sec</p>
            <p className="text-sm text-gray-400">
              Tell us what you want to build and we&apos;ll sequence every lesson for you.
            </p>
          </div>
        </div>
        <ArrowRight size={18} className="text-gray-500 group-hover:text-white" aria-hidden />
      </Link>
    );
  }

  const ids = pathLessonIds(path);
  const completedSet = new Set(completed);
  const nextId = ids.find((id) => !completedSet.has(id));
  const progress = pathProgress(path, completed);

  return (
    <div className={`card bg-gradient-to-br ${path.gradient}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
          <Target size={14} /> Your path
        </div>
        <span className="text-2xl">{path.emoji}</span>
      </div>
      <h3 className="mt-2 text-lg font-bold text-white">{path.title}</h3>

      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-300">
          <span>
            {progress.done}/{progress.total} lessons
          </span>
          <span>{progress.pct}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${progress.pct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {nextId ? (
          <Link href={`/learn/${nextId}`} className="btn-primary">
            {progress.done === 0 ? "Start your first lesson" : "Continue your path"}{" "}
            <ArrowRight size={15} />
          </Link>
        ) : (
          <Link href={`/paths/${path.slug}`} className="btn-primary">
            Path complete — review <ArrowRight size={15} />
          </Link>
        )}
        <Link href="/onboarding" className="btn-ghost">
          Change goal
        </Link>
      </div>
    </div>
  );
}
