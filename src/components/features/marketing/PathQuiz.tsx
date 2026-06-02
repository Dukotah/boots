"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Compass } from "lucide-react";
import { getPath, pathStats } from "@/lib/paths";

// A tiny 2-step quiz that routes a new visitor to the right pathway. Pure
// client-side — no data, no tracking, just a friendly on-ramp.

type Goal = "frontend" | "backend" | "ai" | "interview" | "data" | "fundamentals";
type Lang = "javascript" | "python" | "sql" | "any";

const GOALS: { id: Goal; label: string; emoji: string }[] = [
  { id: "frontend", label: "Build websites & UIs", emoji: "🎨" },
  { id: "backend", label: "Build APIs & servers", emoji: "🛠️" },
  { id: "ai", label: "Build AI apps with LLMs", emoji: "🤖" },
  { id: "interview", label: "Pass a coding interview", emoji: "🧩" },
  { id: "data", label: "Work with data", emoji: "📊" },
  { id: "fundamentals", label: "Just learn the basics", emoji: "🎓" },
];

const LANGS: { id: Lang; label: string }[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
  { id: "any", label: "No preference" },
];

const GOAL_PATH: Record<Goal, string> = {
  frontend: "frontend",
  backend: "backend",
  ai: "ai-engineer",
  interview: "interview-prep",
  data: "data",
  fundamentals: "cs-fundamentals",
};

function resolvePath(goal: Goal, lang: Lang): string {
  if (lang === "python" && (goal === "fundamentals" || goal === "frontend"))
    return "python";
  if (lang === "sql") return "data";
  return GOAL_PATH[goal];
}

export function PathQuiz() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [lang, setLang] = useState<Lang | null>(null);

  const recommendedSlug = goal && lang ? resolvePath(goal, lang) : null;
  const path = recommendedSlug ? getPath(recommendedSlug) : null;

  function reset() {
    setGoal(null);
    setLang(null);
  }

  return (
    <section className="my-12">
      <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-2 text-accent-soft">
          <Compass size={18} />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Find your path
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 — goal */}
          {!goal && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="text-2xl font-bold text-white">
                What do you want to do?
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className="card flex items-center gap-3 text-left transition-transform hover:-translate-y-0.5 hover:border-accent/60"
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span className="font-medium text-white">{g.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — language */}
          {goal && !lang && (
            <motion.div
              key="lang"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="text-2xl font-bold text-white">
                Any language you&apos;re drawn to?
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLang(l.id)}
                    className="card text-center font-medium text-white transition-transform hover:-translate-y-0.5 hover:border-accent/60"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setGoal(null)}
                className="mt-4 text-sm text-gray-500 hover:text-white"
              >
                ← Back
              </button>
            </motion.div>
          )}

          {/* Result */}
          {path && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-gray-400">We recommend the</p>
              <div
                className={`mt-3 rounded-2xl border border-accent/40 bg-gradient-to-br ${path.gradient} p-6`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{path.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {path.title} Path
                    </h2>
                    <p className="mt-1 text-sm text-gray-200">{path.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-300">
                  {pathStats(path).modules} courses · {pathStats(path).lessons}{" "}
                  lessons · {path.difficulty}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/paths/${path.slug}`} className="btn-primary">
                    Start this path <ArrowRight size={16} />
                  </Link>
                  <button onClick={reset} className="btn-ghost">
                    <RotateCcw size={15} /> Retake
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-gray-500">
                Not quite right?{" "}
                <Link href="/paths" className="text-accent-soft hover:underline">
                  Browse all paths
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
