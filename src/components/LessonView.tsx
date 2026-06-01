"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Play, RotateCcw, Eye, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { runCode, type RunOutcome } from "@/lib/runner";
import { useProgress } from "@/lib/progress";
import { CodeEditor } from "./CodeEditor";
import { TestResults } from "./TestResults";
import { LevelUpToast } from "./LevelUpToast";

export function LessonView({
  module,
  lesson,
  nextHref,
}: {
  module: Module;
  lesson: Lesson;
  nextHref: string | null;
}) {
  const id = lessonId(module.slug, lesson.slug);
  const [code, setCode] = useState(lesson.starterCode);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const completeLesson = useProgress((s) => s.completeLesson);
  const alreadyDone = useProgress((s) => s.completed.includes(id));

  const allPass = useMemo(
    () => outcome !== null && outcome.results.every((r) => r.pass),
    [outcome],
  );

  async function handleRun() {
    setRunning(true);
    const result = await runCode(code, lesson.tests);
    setOutcome(result);
    setRunning(false);

    if (result.results.every((r) => r.pass)) {
      completeLesson(id, lesson.xp);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-2">
      <LevelUpToast />

      {/* Left: lesson content */}
      <section className="card max-h-[calc(100vh-7rem)] overflow-y-auto lg:sticky lg:top-20">
        <Link
          href={`/learn/${module.slug}`}
          className="text-xs font-medium text-accent-soft hover:underline"
        >
          {module.emoji} {module.title}
        </Link>
        <div className="prose-lesson mt-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-soft">
          ⚡ {lesson.xp} XP
        </div>
      </section>

      {/* Right: editor + results */}
      <section className="flex flex-col gap-3">
        <div className="card flex flex-col p-0">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-mono text-xs text-gray-400">
              solution.js
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCode(lesson.starterCode);
                  setOutcome(null);
                  setShowSolution(false);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
              >
                <RotateCcw size={13} /> Reset
              </button>
              <button
                onClick={() => {
                  setShowSolution((s) => !s);
                  if (!showSolution) setCode(lesson.solution);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
              >
                <Eye size={13} /> {showSolution ? "Hide" : "Solution"}
              </button>
            </div>
          </div>
          <div className="h-[340px]">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <div className="flex items-center gap-3 border-t border-line p-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="btn-primary disabled:opacity-60"
            >
              {running ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Play size={16} />
              )}
              {running ? "Running…" : "Run & Test"}
            </button>
            {allPass && nextHref && (
              <Link href={nextHref} className="btn-ghost">
                Next lesson <ArrowRight size={15} />
              </Link>
            )}
            {alreadyDone && (
              <span className="flex items-center gap-1 text-xs text-success">
                <CheckCircle2 size={14} /> Completed
              </span>
            )}
          </div>
        </div>

        {/* success banner */}
        {allPass && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-xl border border-success/50 bg-success/10 px-4 py-3 shadow-glow-success"
          >
            <CheckCircle2 className="text-success" />
            <div>
              <p className="text-sm font-semibold text-success">
                All tests passed! +{alreadyDone ? 0 : lesson.xp} XP
              </p>
              {nextHref ? (
                <Link href={nextHref} className="text-xs text-success/80 hover:underline">
                  Continue to the next lesson →
                </Link>
              ) : (
                <Link href="/dashboard" className="text-xs text-success/80 hover:underline">
                  Back to dashboard →
                </Link>
              )}
            </div>
          </motion.div>
        )}

        <div className="card min-h-[140px] p-0">
          <TestResults
            results={outcome?.results ?? []}
            hasRun={outcome !== null}
          />
        </div>
      </section>
    </div>
  );
}
