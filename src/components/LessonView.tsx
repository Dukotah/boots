"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Play, RotateCcw, Eye, ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { lessonLanguage, langMeta } from "@/lib/curriculum/lang";
import { runLesson, type RunOutcome } from "@/lib/runner";
import { celebrate } from "@/lib/celebrate";
import { verifyCompletion } from "@/lib/scoring";
import { commitLessonToJournal } from "@/lib/github/journalClient";
import { useGameStore } from "@/store/useGameStore";
import { useAccess } from "@/hooks/useAccess";
import { useMounted } from "@/hooks/useMounted";
import { CodeEditor } from "./CodeEditor";
import { BlockTray } from "./BlockTray";
import { TestResults } from "./TestResults";
import { LevelUpToast } from "./LevelUpToast";
import { ProGate } from "./features/billing/ProGate";
import { AskBoots } from "./features/tutor/AskBoots";
import { TutorPanel } from "./TutorPanel";
import { CodeReview } from "./quality/CodeReview";
import { summarizeLesson } from "@/lib/tutor/prompt";
import type { TutorContext } from "@/lib/tutor/types";

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
  const language = lessonLanguage(lesson, module);
  const lang = langMeta(language);
  const starterCode = lesson.starterCode ?? "";
  const solution = lesson.solution ?? "";
  const [code, setCode] = useState(starterCode);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const hints = lesson.hints ?? [];
  const blocks = lesson.blocks ?? [];

  // The editor hands back an insert fn on mount; the block tray calls it to drop
  // a snippet at the cursor on tap (drag-and-drop is handled inside the editor).
  const insertRef = useRef<((text: string) => void) | null>(null);

  const completeLesson = useGameStore((s) => s.completeLesson);
  const alreadyDone = useGameStore((s) => s.completed.includes(id));

  // On-device / BYOK tutor (free, runs in the learner's browser) — separate from
  // the Pro "Ask Cantrip" server tutor below. Renders as an inline card now.
  const tutorContext: TutorContext = useMemo(() => {
    let testSummary = "not run yet";
    if (outcome) {
      const passed = outcome.results.filter((r) => r.pass).length;
      const lines = outcome.results.map(
        (r) => `${r.pass ? "PASS" : "FAIL"} ${r.name}${r.error ? `: ${r.error}` : ""}`,
      );
      testSummary = `${passed}/${outcome.results.length} tests passing.\n${lines.join("\n")}`.slice(0, 800);
    }
    return {
      lessonTitle: lesson.title,
      lessonGoal: summarizeLesson(lesson.content ?? lesson.explanation ?? ""),
      code,
      testSummary,
    };
  }, [lesson.title, lesson.content, lesson.explanation, code, outcome]);

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
    const result = await runLesson(code, lesson, language);
    setOutcome(result);
    setRunning(false);

    if (result.results.every((r) => r.pass)) {
      const wasDone = alreadyDone;
      completeLesson(id, lesson.xp);
      celebrate();
      // Server re-runs the code and awards canonical XP (best-effort; degrades
      // gracefully when signed out / no backend / non-JS lesson).
      void verifyCompletion(module.slug, lesson.slug, code);
      // Commit the solution to the learner's GitHub journey repo (no-op unless
      // they've connected GitHub). Only on the first completion — no churn on redo.
      if (!wasDone) {
        void commitLessonToJournal({
          courseSlug: module.slug,
          lessonSlug: lesson.slug,
          code,
        });
      }
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

        {/* Beginner code blocks — drag or tap them into the editor */}
        {blocks.length > 0 && (
          <BlockTray
            blocks={blocks}
            onInsert={(text) => insertRef.current?.(text)}
          />
        )}
      </section>

      {/* Right: editor + results */}
      <section className="flex flex-col gap-3">
        <div className="card flex flex-col p-0">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="flex items-center gap-2 font-mono text-xs text-gray-400">
              {lang.filename}
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] not-italic text-gray-500">
                {lang.runtime}
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
          <div className="h-[340px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={lang.monaco}
              registerInsert={(fn) => {
                insertRef.current = fn;
              }}
            />
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

        {/* Static code review — JS solutions only (the analyzer parses JS) */}
        {allPass && language === "js" && <CodeReview code={code} />}

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

        {/* Socratic AI tutor — hints, never the answer (Pro) */}
        <AskBoots module={module} lesson={lesson} language={language} code={code} />

        {/* Free on-device tutor — inline card, runs in the learner's browser, $0 to the platform */}
        <TutorPanel context={tutorContext} />
      </section>
    </div>
  );
}
