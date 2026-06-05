"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Play, Sparkles } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { GOALS, getGoal, goalPath, goalFirstLessonHref } from "@/lib/goals";
import { pathStats } from "@/lib/paths";

// The real, persisted onboarding: pick a goal → we save it → we drop you into
// your first lesson (the "60-second first win"). The saved goal then powers the
// dashboard's "recommended next" surface. Pure client-side.
export function OnboardingFlow() {
  const router = useRouter();
  const setGoal = useGameStore((s) => s.setGoal);
  const dismissOnboarding = useGameStore((s) => s.dismissOnboarding);
  const [selected, setSelected] = useState<string | null>(null);

  const goal = getGoal(selected);
  const path = goalPath(selected);

  function choose(id: string) {
    setSelected(id);
    setGoal(id); // persist immediately so a refresh keeps the choice
  }

  function startFirstWin() {
    router.push(goalFirstLessonHref(selected));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-2 text-accent-soft">
          <Compass size={18} />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Welcome — let&apos;s find your path
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 — goal selection */}
          {!goal && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                What do you want to achieve?
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Pick one — we&apos;ll sequence every course for you and start you
                on your first lesson. You can change this anytime.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => choose(g.id)}
                    className="card flex items-start gap-3 text-left transition-transform hover:-translate-y-0.5 hover:border-accent/60"
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span>
                      <span className="block font-medium text-white">{g.label}</span>
                      <span className="mt-0.5 block text-xs text-gray-400">{g.blurb}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  dismissOnboarding();
                  router.push("/learn");
                }}
                className="mt-5 text-sm text-gray-500 hover:text-white"
              >
                Skip — just let me browse →
              </button>
            </motion.div>
          )}

          {/* Step 2 — recommendation + first win */}
          {goal && path && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 text-accent-soft">
                <Sparkles size={16} />
                <p className="text-sm">Perfect — here&apos;s your path</p>
              </div>
              <div
                className={`mt-3 rounded-2xl border border-accent/40 bg-gradient-to-br ${path.gradient} p-6`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{path.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{path.title}</h2>
                    <p className="mt-1 text-sm text-gray-200">{path.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-300">
                  {pathStats(path).modules} courses · {pathStats(path).lessons} lessons ·{" "}
                  {path.difficulty}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={startFirstWin} className="btn-primary">
                    <Play size={16} /> Start my first lesson
                  </button>
                  <Link href={`/paths/${path.slug}`} className="btn-ghost">
                    See the full path <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-sm text-gray-500 hover:text-white"
              >
                ← Pick a different goal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
