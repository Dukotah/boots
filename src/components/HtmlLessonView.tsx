"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Play, RotateCcw, Eye, ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { runHtml } from "@/lib/htmlRunner";
import { type RunOutcome } from "@/lib/runner";
import { celebrate } from "@/lib/celebrate";
import { useGameStore } from "@/store/useGameStore";
import { recordCompletion } from "@/lib/scoring";
import { useAccess } from "@/hooks/useAccess";
import { useMounted } from "@/hooks/useMounted";
import { CodeEditor } from "./CodeEditor";
import { TestResults } from "./TestResults";
import { LevelUpToast } from "./LevelUpToast";
import { SkillPointToast } from "./SkillPointToast";
import { ProGate } from "./features/billing/ProGate";

export function HtmlLessonView({
  module,
  lesson,
  nextHref,
}: {
  module: Module;
  lesson: Lesson;
  nextHref: string | null;
}) {
  const id = lessonId(module.slug, lesson.slug);
  const starterCode = lesson.starterCode ?? "";
  const solution = lesson.solution ?? "";
  const [code, setCode] = useState(starterCode);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const hints = lesson.hints ?? [];

  const completeLesson = useGameStore((s) => s.completeLesson);
  const alreadyDone = useGameStore((s) => s.completed.includes(id));

  // Paywall: interactivity is gated past the free preview lessons (lib/access).
  const lessonIndex = module.lessons.findIndex((l) => l.slug === lesson.slug);
  const mounted = useMounted();
  const { locked } = useAccess(lessonIndex, module.free);
  // Avoid hydration flash: only enforce the gate after the client store hydrates.
  const gated = mounted && locked;

  const allPass = useMemo(
    () => outcome !== null && outcome.results.every((r) => r.pass),
    [outcome],
  );

  async function handleRun() {
    if (gated) return; // paywalled — run is disabled
    setRunning(true);
    const result = await runHtml(code, lesson.tests ?? []);
    setOutcome(result);
    setRunning(false);

    if (result.results.length > 0 && result.results.every((r) => r.pass)) {
      completeLesson(id, lesson.xp);
      celebrate();
      // Record server-side for canonical, forge-proof XP (best-effort;
      // no-ops when signed out / no backend).
      void recordCompletion(module.slug, lesson.slug);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-2">
      <LevelUpToast />
      <SkillPointToast />

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

        {/* Progressive hints — free, no AI needed */}
        {hints.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Hints
            </p>
            <div className="space-y-2">
              {hints.slice(0, hintsShown).map((h, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-line bg-canvas/40 px-3 py-2 text-sm text-gray-300"
                >
                  <span className="mr-1.5 font-semibold text-gold">{i + 1}.</span>
                  {h}
                </div>
              ))}
            </div>
            {hintsShown < hints.length && (
              <button
                onClick={() => setHintsShown((n) => n + 1)}
                className="btn-ghost mt-2 text-xs"
              >
                💡 {hintsShown === 0 ? "Show a hint" : "Show another hint"}
                <span className="text-gray-500">
                  ({hints.length - hintsShown} left)
                </span>
              </button>
            )}
          </div>
        )}
      </section>

      {/* Right: editor + live preview + results */}
      <section className="flex flex-col gap-3">
        <div className="card flex flex-col p-0">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="flex items-center gap-2 font-mono text-xs text-gray-400">
              index.html
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] not-italic text-gray-500">
                iframe
              </span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCode(starterCode);
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
                  if (!showSolution) setCode(solution);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
              >
                <Eye size={13} /> {showSolution ? "Hide" : "Solution"}
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <CodeEditor value={code} onChange={setCode} language="html" />
          </div>
          <div className="flex items-center gap-3 border-t border-line p-3">
            {gated ? (
              <Link href="/pricing" className="btn-primary">
                <Lock size={15} /> Unlock to run tests
              </Link>
            ) : (
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
            )}
            {!gated && allPass && nextHref && (
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

        {/* Live preview — updates as the student types */}
        <div className="card flex flex-col p-0">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2 text-xs text-gray-400">
            <Eye size={13} /> Preview
          </div>
          <iframe
            title="Live preview"
            sandbox="allow-same-origin"
            srcDoc={code}
            className="h-[260px] w-full rounded-b-xl bg-white"
          />
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

        {/* Why the solution works — revealed once tests pass */}
        {allPass && lesson.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              How it works
            </p>
            <div className="prose-lesson">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.explanation}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}

        {gated ? (
          <ProGate />
        ) : (
          <div className="card min-h-[140px] p-0">
            <TestResults
              results={outcome?.results ?? []}
              hasRun={outcome !== null}
            />
          </div>
        )}
      </section>
    </div>
  );
}
