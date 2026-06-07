"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Timer,
  Play,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Coins,
  Trophy,
  Skull,
} from "lucide-react";
import type { TestCase, Lesson, LessonLanguage } from "@/lib/curriculum/types";
import type { TestResult } from "@/workers/codeRunner";
import { runLesson } from "@/lib/runner";
import { celebrate } from "@/lib/celebrate";
import { lessonId } from "@/lib/curriculum/ids";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { PageSkeleton } from "@/components/PageSkeleton";
import { CodeEditor } from "@/components/CodeEditor";
import { TestResults } from "@/components/TestResults";

// ── Serializable shapes handed down from the server page ──────────────────────
type BossTask = {
  module: string;
  lesson: string;
  moduleTitle: string;
  moduleEmoji: string;
  title: string;
  blurb: string;
  xp: number;
  content: string;
  starterCode: string;
  tests: TestCase[];
  language: "js" | "ts";
};

type BossView = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  timeLimitSec: number;
  rewardGold: number;
  tasks: BossTask[];
};

type Phase = "intro" | "fighting" | "results";

const MONACO_LANG: Record<"js" | "ts", string> = {
  js: "javascript",
  ts: "typescript",
};

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function BossFightView({ boss }: { boss: BossView }) {
  const mounted = useMounted();
  const completeLesson = useGameStore((s) => s.completeLesson);
  const claimTrackBoss = useGameStore((s) => s.claimTrackBoss);
  const alreadyClaimed = useGameStore((s) =>
    s.claimedTrackBosses.includes(boss.id),
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  // Per-task editor contents, seeded from each task's starter code.
  const [codes, setCodes] = useState<string[]>(() =>
    boss.tasks.map((t) => t.starterCode),
  );
  // Which tasks have been cleared this run (index → passed).
  const [solved, setSolved] = useState<boolean[]>(() =>
    boss.tasks.map(() => false),
  );
  const [running, setRunning] = useState(false);
  const [outcomeResults, setOutcomeResults] = useState<TestResult[] | null>(
    null,
  );
  const [remaining, setRemaining] = useState(boss.timeLimitSec);
  const [endReason, setEndReason] = useState<"cleared" | "time" | "gaveup" | null>(
    null,
  );
  // Captured at the moment the fight ends so the results screen is stable.
  const [finalElapsed, setFinalElapsed] = useState(0);
  const [rewardGranted, setRewardGranted] = useState(false);

  const total = boss.tasks.length;
  const solvedCount = solved.filter(Boolean).length;
  const task = boss.tasks[current];

  // ── Timer: counts down only while fighting ──────────────────────────────────
  const finishRef = useRef<
    ((reason: "cleared" | "time" | "gaveup") => void) | undefined
  >(undefined);

  const finish = useCallback(
    (reason: "cleared" | "time" | "gaveup") => {
      setFinalElapsed(boss.timeLimitSec - remaining);
      setEndReason(reason);
      setPhase("results");
    },
    [boss.timeLimitSec, remaining],
  );
  finishRef.current = finish;

  useEffect(() => {
    if (phase !== "fighting") return;
    if (remaining <= 0) {
      finishRef.current?.("time");
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, remaining]);

  // Grant the reward exactly once, when a winning results screen first shows.
  const won = solvedCount === total;
  useEffect(() => {
    if (phase !== "results" || !won || rewardGranted) return;
    setRewardGranted(true);
    claimTrackBoss(boss.id, boss.rewardGold);
    celebrate();
  }, [phase, won, rewardGranted, claimTrackBoss, boss.id, boss.rewardGold]);

  function start() {
    setPhase("fighting");
    setCurrent(0);
    setCodes(boss.tasks.map((t) => t.starterCode));
    setSolved(boss.tasks.map(() => false));
    setOutcomeResults(null);
    setRemaining(boss.timeLimitSec);
    setEndReason(null);
    setRewardGranted(false);
  }

  async function handleRun() {
    if (running) return;
    setRunning(true);
    // Build a minimal Lesson-shaped object — runLesson only reads `.tests` for
    // the JS/TS path, so this reuses the exact same Web Worker grader.
    const lessonLike = { tests: task.tests } as unknown as Lesson;
    const outcome = await runLesson(
      codes[current],
      lessonLike,
      task.language as LessonLanguage,
    );
    setOutcomeResults(outcome.results);
    setRunning(false);

    const passed =
      outcome.results.length > 0 && outcome.results.every((r) => r.pass);
    if (passed && !solved[current]) {
      // Record the underlying lesson as completed. completeLesson awards the
      // lesson's XP only on the FIRST-ever completion; clearing one already done
      // elsewhere is treated as a review (no double XP), so this is economy-safe.
      completeLesson(lessonId(task.module, task.lesson), task.xp);
      setSolved((prev) => {
        const next = [...prev];
        next[current] = true;
        // If that was the last unsolved task, the gauntlet is cleared.
        if (next.every(Boolean)) {
          setTimeout(() => finishRef.current?.("cleared"), 400);
        }
        return next;
      });
    }
  }

  function goTo(i: number) {
    if (i < 0 || i >= total) return;
    setCurrent(i);
    setOutcomeResults(null);
  }

  if (!mounted) return <PageSkeleton maxW="max-w-3xl" rows={3} />;

  // ── Intro ────────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Link
          href="/boss"
          className="text-sm text-accent-soft hover:underline"
        >
          ← All bosses
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mt-6 overflow-hidden text-center"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-rose-500/10 to-transparent" />
            <div className="text-7xl drop-shadow-[0_0_25px_rgba(244,63,94,0.35)]">
              {boss.emoji}
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-300">
            <Swords size={13} /> Track Boss
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">{boss.name}</h1>
          <p className="mx-auto mt-2 max-w-prose text-pretty text-sm leading-relaxed text-gray-400">
            {boss.blurb}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="mt-0.5 text-xs text-gray-500">trials</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
                <Timer size={18} className="text-accent-soft" />
                {Math.round(boss.timeLimitSec / 60)}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">minutes</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gold">
                <Coins size={18} />
                {boss.rewardGold}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">gold</div>
            </div>
          </div>

          <ol className="mt-6 space-y-2 text-left">
            {boss.tasks.map((t, i) => (
              <li
                key={`${t.module}/${t.lesson}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-canvas/40 px-3 py-2.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-bold text-gray-300">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {t.moduleEmoji} {t.moduleTitle}
                  </p>
                </div>
                <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono uppercase text-gray-500">
                  {t.language}
                </span>
              </li>
            ))}
          </ol>

          {alreadyClaimed && (
            <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-success">
              <Trophy size={14} /> You&apos;ve already claimed this bounty — fight
              again for the glory.
            </p>
          )}

          <button onClick={start} className="btn-primary mx-auto mt-6">
            <Swords size={16} /> Enter the gauntlet
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Clear all {total} trials before the timer runs out. The clock starts
            now.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────────
  if (phase === "results") {
    const passFraction = `${solvedCount}/${total}`;
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center"
        >
          {won ? (
            <>
              <div className="text-6xl drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                🏆
              </div>
              <h1 className="mt-3 text-3xl font-bold text-success">
                {boss.name} defeated!
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                You cleared every trial. The track bows to your skill.
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl opacity-90 drop-shadow-[0_0_25px_rgba(244,63,94,0.35)]">
                <Skull className="mx-auto text-rose-400" size={64} />
              </div>
              <h1 className="mt-3 text-3xl font-bold text-white">
                {endReason === "time" ? "Time's up!" : "Retreat sounded"}
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                You felled {solvedCount} of {total} trials. Regroup and try
                again.
              </p>
            </>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="text-2xl font-bold text-white">{passFraction}</div>
              <div className="mt-0.5 text-xs text-gray-500">trials cleared</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="text-2xl font-bold text-white">
                {formatTime(Math.max(0, finalElapsed))}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">time taken</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gold">
                <Coins size={18} />
                {won && !alreadyClaimed && rewardGranted ? boss.rewardGold : 0}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">gold won</div>
            </div>
          </div>

          {won && alreadyClaimed && !rewardGranted && (
            <p className="mt-4 text-xs text-gray-500">
              Bounty already claimed on a previous run — no extra gold, but the
              win still counts.
            </p>
          )}

          {/* Per-trial recap */}
          <ul className="mt-6 space-y-2 text-left">
            {boss.tasks.map((t, i) => (
              <li
                key={`${t.module}/${t.lesson}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-canvas/40 px-3 py-2.5"
              >
                {solved[i] ? (
                  <CheckCircle2 size={18} className="shrink-0 text-success" />
                ) : (
                  <XCircle size={18} className="shrink-0 text-danger" />
                )}
                <span className="min-w-0 flex-1 truncate text-sm text-white">
                  {t.title}
                </span>
                <Link
                  href={`/learn/${t.module}/${t.lesson}`}
                  className="ml-auto shrink-0 text-xs text-accent-soft hover:underline"
                >
                  Review
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-center gap-3">
            <button onClick={start} className="btn-primary">
              <RotateCcw size={16} /> Fight again
            </button>
            <Link href="/boss" className="btn-ghost">
              All bosses
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Fighting ───────────────────────────────────────────────────────────────────
  const lowTime = remaining <= 30;
  return (
    <div className="mx-auto max-w-[88rem] px-4 py-6">
      {/* Boss header bar: identity, progress, timer */}
      <div className="card sticky top-16 z-10 mb-4 flex flex-wrap items-center gap-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{boss.emoji}</span>
          <div>
            <p className="text-sm font-bold leading-tight text-white">
              {boss.name}
            </p>
            <p className="text-xs text-gray-500">
              Trial {current + 1} of {total}
            </p>
          </div>
        </div>

        {/* Progress pips */}
        <div className="flex items-center gap-1.5">
          {boss.tasks.map((t, i) => (
            <button
              key={`${t.module}/${t.lesson}`}
              onClick={() => goTo(i)}
              aria-label={`Go to trial ${i + 1}${solved[i] ? " (cleared)" : ""}`}
              className={[
                "h-2.5 rounded-full transition-all",
                i === current ? "w-7" : "w-2.5",
                solved[i]
                  ? "bg-success"
                  : i === current
                    ? "bg-accent"
                    : "bg-surface-2 hover:bg-white/20",
              ].join(" ")}
            />
          ))}
        </div>

        <div
          className={[
            "ml-auto flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-sm font-bold tabular-nums transition-colors",
            lowTime
              ? "border-danger/50 bg-danger/10 text-danger"
              : "border-line bg-canvas/40 text-white",
          ].join(" ")}
        >
          <Timer size={15} className={lowTime ? "animate-pulse" : ""} />
          {formatTime(Math.max(0, remaining))}
        </div>

        <button
          onClick={() => finish("gaveup")}
          className="text-xs text-gray-500 hover:text-danger"
        >
          Forfeit
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: trial prompt */}
        <section className="card max-h-[calc(100vh-9rem)] overflow-y-auto lg:sticky lg:top-32">
          <p className="text-xs font-medium text-accent-soft">
            {task.moduleEmoji} {task.moduleTitle}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">{task.title}</h2>
          <div className="prose-lesson mt-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {task.content}
            </ReactMarkdown>
          </div>
        </section>

        {/* Right: editor + results */}
        <section className="flex flex-col gap-3">
          <div className="card flex flex-col p-0">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="flex items-center gap-2 font-mono text-xs text-gray-400">
                solution.{task.language}
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] not-italic text-gray-500">
                  Runs in your browser
                </span>
              </span>
              <button
                onClick={() => {
                  setCodes((prev) => {
                    const next = [...prev];
                    next[current] = task.starterCode;
                    return next;
                  });
                  setOutcomeResults(null);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
            <div className="h-[240px]">
              <CodeEditor
                value={codes[current]}
                onChange={(v) =>
                  setCodes((prev) => {
                    const next = [...prev];
                    next[current] = v;
                    return next;
                  })
                }
                language={MONACO_LANG[task.language]}
              />
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
              {solved[current] && current < total - 1 && (
                <button onClick={() => goTo(current + 1)} className="btn-ghost">
                  Next trial <ArrowRight size={15} />
                </button>
              )}
              {solved[current] && (
                <span className="flex items-center gap-1 text-xs text-success">
                  <CheckCircle2 size={14} /> Cleared
                </span>
              )}
            </div>
          </div>

          <AnimatePresence>
            {solved[current] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-xl border border-success/50 bg-success/10 px-4 py-3"
              >
                <CheckCircle2 className="text-success" />
                <p className="text-sm font-semibold text-success">
                  Trial cleared! {solvedCount}/{total} down.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="card min-h-[140px] p-0">
            <TestResults
              results={outcomeResults ?? []}
              hasRun={outcomeResults !== null}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
