"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Compass, Play, Sparkles, Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { GOALS, getGoal, goalPath, goalFirstLessonHref } from "@/lib/goals";
import { pathLessonIds, pathStats } from "@/lib/paths";
import { track } from "@/lib/analytics/track";
import { useExperiment } from "@/hooks/useExperiment";

// ── Step indicator ─────────────────────────────────────────────────────────
// Two-dot progress bar so the flow reads "short and finishable" at a glance.
function StepDots({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-6 flex items-center gap-2" aria-label={`Step ${step} of 2`} role="status">
      {[1, 2].map((n) => (
        <span
          key={n}
          className={`h-2 rounded-full transition-all duration-300 ${
            n === step
              ? "w-6 bg-accent"
              : n < step
                ? "w-2 bg-accent/60"
                : "w-2 bg-white/20"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">
        {step === 1 ? "Pick your goal" : "Your first win"}
      </span>
    </div>
  );
}

// The real, persisted onboarding: pick a goal → we save it → we drop you into
// your first lesson (the "60-second first win"). The saved goal then powers the
// dashboard's "recommended next" surface. Pure client-side.
export function OnboardingFlow() {
  const router = useRouter();
  const setGoal = useGameStore((s) => s.setGoal);
  const dismissOnboarding = useGameStore((s) => s.dismissOnboarding);
  const [selected, setSelected] = useState<string | null>(null);

  // A/B: does hiding the "skip" affordance lift onboarding completion? Variant
  // 'off' hides it. Null until mounted → default to showing it (safe default).
  const skipVariant = useExperiment("onboarding_skip_visible");
  const showSkip = skipVariant !== "off";

  const goal = getGoal(selected);
  const path = goalPath(selected);

  // Derive first lesson id for the lesson_started tracking call.
  const firstLessonId = path ? (pathLessonIds(path)[0] ?? null) : null;
  const firstLessonHref = goalFirstLessonHref(selected);

  function choose(id: string) {
    setSelected(id);
    setGoal(id); // persist immediately so a refresh keeps the choice
    track("onboarding_goal_selected", { goal: id });
  }

  function startFirstWin() {
    // Fire lesson_started so the funnel tracks the first-lesson click,
    // not just goal selection. Only when we have a real lesson id.
    if (firstLessonId) {
      track("lesson_started", { lesson_id: firstLessonId });
    }
    dismissOnboarding();
    router.push(firstLessonHref);
  }

  const step: 1 | 2 = goal && path ? 2 : 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
        {/* Header row — icon + headline + step dots */}
        <div className="mb-1 flex items-center gap-2 text-accent-soft">
          <Compass size={18} aria-hidden />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Welcome — let&apos;s find your path
          </span>
        </div>

        <StepDots step={step} />

        <AnimatePresence mode="wait">
          {/* ── Step 1 — goal selection ───────────────────────────────── */}
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
                Pick one — we&apos;ll build your path and drop you into your
                first lesson in about{" "}
                <span className="font-semibold text-accent-soft">60 seconds</span>.
                You can change this anytime.
              </p>

              {/* "Fast first win" social-proof pill */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
                <Zap size={11} aria-hidden />
                Most learners are coding in under a minute
              </div>

              <div
                className="mt-5 grid gap-3 sm:grid-cols-2"
                role="group"
                aria-label="Choose your coding goal"
              >
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => choose(g.id)}
                    aria-pressed={selected === g.id}
                    className="card flex items-start gap-3 text-left transition-transform hover:-translate-y-0.5 hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="text-2xl" aria-hidden>
                      {g.emoji}
                    </span>
                    <span>
                      <span className="block font-medium text-white">{g.label}</span>
                      <span className="mt-0.5 block text-xs text-gray-400">{g.blurb}</span>
                    </span>
                  </button>
                ))}
              </div>

              {showSkip && (
                <button
                  onClick={() => {
                    dismissOnboarding();
                    router.push("/learn");
                  }}
                  className="mt-5 text-sm text-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Skip — just let me browse →
                </button>
              )}
            </motion.div>
          )}

          {/* ── Step 2 — recommendation + first win ──────────────────── */}
          {goal && path && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 text-accent-soft">
                <Sparkles size={16} aria-hidden />
                <p className="text-sm font-medium">
                  Perfect — your path is ready
                </p>
              </div>

              {/* Path card */}
              <div
                className={`mt-3 rounded-2xl border border-accent/40 bg-gradient-to-br ${path.gradient} p-6`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl" aria-hidden>
                    {path.emoji}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{path.title}</h2>
                    <p className="mt-1 text-sm text-gray-200">{path.tagline}</p>
                  </div>
                </div>

                {/* Outcome bullets — show up to 3 "you'll be able to..." items */}
                {path.outcomes.length > 0 && (
                  <ul
                    className="mt-4 space-y-1.5"
                    aria-label="What you'll be able to do"
                  >
                    {path.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-gray-200">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-accent-soft"
                          aria-hidden
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-xs text-gray-400">
                  {pathStats(path).modules} courses · {pathStats(path).lessons} lessons ·{" "}
                  {path.difficulty}
                </p>

                {/* Primary CTA — unmissable, full-width on mobile */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    onClick={startFirstWin}
                    className="btn-primary flex-1 justify-center sm:flex-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    autoFocus
                  >
                    <Play size={16} aria-hidden /> Start my first lesson
                    <span className="ml-1 text-xs font-normal opacity-75">
                      (~60 sec)
                    </span>
                  </button>
                  <Link
                    href={`/paths/${path.slug}`}
                    className="btn-ghost justify-center sm:justify-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    See full path <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Low-friction back link */}
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-sm text-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
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
