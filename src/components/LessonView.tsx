"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Play, RotateCcw, Lightbulb, ArrowRight, CheckCircle2, Loader2, Lock, Sparkles } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum/ids";
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
import { SkillPointToast } from "./SkillPointToast";
import { ProGate } from "./features/billing/ProGate";
// Tutor panels + code review are interaction-gated and heavy — load them in
// their own client chunks so they're not in the initial lesson bundle.
const AskBoots = dynamic(
  () => import("./features/tutor/AskBoots").then((m) => m.AskBoots),
  { ssr: false },
);
const TutorPanel = dynamic(
  () => import("./TutorPanel").then((m) => m.TutorPanel),
  { ssr: false },
);
const CodeReview = dynamic(
  () => import("./quality/CodeReview").then((m) => m.CodeReview),
  { ssr: false },
);
import { LessonSidebar } from "./LessonSidebar";
import { LessonNav } from "./LessonNav";
import { summarizeLesson } from "@/lib/tutor/prompt";
import { deriveHintLadder, isSolutionStep } from "@/lib/hints";
import type { TutorContext } from "@/lib/tutor/types";
import { track } from "@/lib/analytics/track";

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

  useEffect(() => {
    track("lesson_started", { lesson_id: id });
  }, [id]);

  const language = lessonLanguage(lesson, module);
  const lang = langMeta(language);
  const starterCode = lesson.starterCode ?? "";
  const [code, setCode] = useState(starterCode);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [running, setRunning] = useState(false);
  // XP actually granted by the last passing run (0 when re-completing). Captured
  // because `alreadyDone` flips true the instant we record the completion, so the
  // banner can't infer the award from it.
  const [lastGainedXp, setLastGainedXp] = useState<number | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [activeHintStep, setActiveHintStep] = useState(0);
  // Derived hint ladder: every code lesson with a solution gets a working set of
  // hints, the last of which loads the full solution into the editor.
  const ladder = useMemo(() => deriveHintLadder(lesson, language), [lesson, language]);
  const hints = ladder.hints;
  const hintCode = ladder.hintCode;
  const blocks = lesson.blocks ?? [];
  // Bumped to ask AskBoots to open + scroll into view (the "Explain this to me"
  // affordance). Starts at 0 so the panel stays closed on first render.
  const [explainSignal, setExplainSignal] = useState(0);

  const remainingHints = hints.length - hintsShown;
  const nextIsSolution =
    remainingHints > 0 && isSolutionStep(ladder, hintsShown, lesson);

  const insertRef = useRef<((text: string) => void) | null>(null);
  const highlightRef = useRef<((startLine: number, endLine: number) => void) | null>(null);

  function dropHint() {
    const hint = hints[hintsShown];
    if (!hint) return;
    const partial = hintCode[hintsShown];
    if (partial !== undefined) {
      // Find which lines changed so we can highlight them after React re-renders.
      const oldLines = code.split("\n");
      const newLines = partial.split("\n");
      let firstChanged = -1;
      let lastChanged = -1;
      newLines.forEach((line, i) => {
        if (line !== oldLines[i]) {
          if (firstChanged === -1) firstChanged = i + 1;
          lastChanged = i + 1;
        }
      });

      setCode(partial);
      setActiveHint(hint);
      setActiveHintStep(hintsShown + 1);

      if (firstChanged !== -1) {
        // Defer highlight until after Monaco picks up the new value.
        setTimeout(() => highlightRef.current?.(firstChanged, lastChanged), 50);
      }
    } else {
      const { open, close } = lang.comment;
      insertRef.current?.(`${open} 💡 ${hint}${close ?? ""}\n`);
      setActiveHint(hint);
      setActiveHintStep(hintsShown + 1);
    }
    setHintsShown((n) => n + 1);
  }

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

  // Dismiss the hint card once all tests pass — they've got it.
  useEffect(() => {
    if (allPass) setActiveHint(null);
  }, [allPass]);

  async function handleRun() {
    if (gated) return; // paywalled — run is disabled
    setRunning(true);
    const result = await runLesson(code, lesson, language);
    setOutcome(result);
    setRunning(false);

    if (result.results.every((r) => r.pass)) {
      const wasDone = alreadyDone;
      const reward = completeLesson(id, lesson.xp);
      setLastGainedXp(reward.gainedXp);
      // Confetti only on the *first* clear — re-running a finished quest awards
      // no XP, so don't re-fire the celebration.
      if (reward.gainedXp > 0) celebrate();
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
    <div className="mx-auto flex max-w-[88rem] gap-4 px-4 py-6">
      <LevelUpToast />
      <SkillPointToast />

      {/* Course progress map — inline column on desktop, drawer on mobile.
          `contents` on mobile so the wrapper claims no flex gap (its children
          are fixed-position there). */}
      <div className="contents lg:block lg:w-64 lg:shrink-0">
        <LessonSidebar module={module} currentSlug={lesson.slug} />
      </div>

      {/* Content + editor keep the original responsive two-up layout. */}
      <div className="grid min-w-0 flex-1 gap-4 lg:grid-cols-2">
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
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-soft">
            ⚡ {lesson.xp} XP
          </span>
          {/* Surfaces the Socratic tutor below — guides, never hands over the
              answer. (Pro-gated inside AskBoots; the gate is preserved.) */}
          <button
            onClick={() => setExplainSignal((n) => n + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-soft transition-colors hover:bg-accent/20"
          >
            <Sparkles size={13} /> Explain this to me
          </button>
        </div>

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
                  setHintsShown(0);
                  setActiveHint(null);
                  setActiveHintStep(0);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
              >
                <RotateCcw size={13} /> Reset
              </button>
              {hints.length > 0 && (
                <button
                  onClick={dropHint}
                  disabled={hintsShown >= hints.length}
                  className="flex items-center gap-1 text-xs text-gold hover:text-gold/80 disabled:cursor-default disabled:text-gray-600 disabled:hover:text-gray-600"
                >
                  <Lightbulb size={13} />
                  {hintsShown >= hints.length
                    ? "No more hints"
                    : nextIsSolution
                      ? "Show solution"
                      : `Hint (${remainingHints})`}
                </button>
              )}
            </div>
          </div>
          {activeHint && (
            <motion.div
              key={activeHintStep}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 border-b border-line bg-gold/10 px-3 py-2"
            >
              <Lightbulb size={14} className="mt-0.5 shrink-0 text-gold" />
              <span className="flex-1 text-xs text-gold/90">
                <span className="mr-1.5 font-semibold text-gold">
                  Hint {activeHintStep} of {hints.length}:
                </span>
                {activeHint}
              </span>
              <button
                onClick={() => setActiveHint(null)}
                className="shrink-0 text-xs text-gray-500 hover:text-white"
                aria-label="Dismiss hint"
              >
                ✕
              </button>
            </motion.div>
          )}
          <div className="h-[220px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={lang.monaco}
              registerInsert={(fn) => {
                insertRef.current = fn;
              }}
              registerHighlight={(fn) => {
                highlightRef.current = fn;
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
                All tests passed! +{lastGainedXp ?? lesson.xp} XP
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

        {/* Socratic AI tutor — hints, never the answer (Pro). Opened by the
            "Explain this to me" button via openSignal. */}
        <AskBoots
          module={module}
          lesson={lesson}
          language={language}
          code={code}
          failingTests={
            outcome?.results
              .filter((r) => !r.pass)
              .map((r) => ({ name: r.name, error: r.error })) ?? []
          }
          openSignal={explainSignal}
        />

        {/* Free on-device tutor — inline card, runs in the learner's browser, $0 to the platform */}
        <TutorPanel context={tutorContext} />

        {/* Prev / Next quest navigation — Next is emphasized once you pass. */}
        <div className="mt-1 border-t border-line pt-3">
          <LessonNav
            module={module}
            currentSlug={lesson.slug}
            passed={allPass || alreadyDone}
          />
        </div>
      </section>
      </div>
    </div>
  );
}
