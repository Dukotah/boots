"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { useAccess } from "@/hooks/useAccess";
import { useMounted } from "@/hooks/useMounted";
import { LevelUpToast } from "./LevelUpToast";
import { ProGate } from "./features/billing/ProGate";

// Renders a quiz/scenario lesson: reading content + multiple-choice questions
// ("spot the scam" etc.). Completing all questions correctly awards XP — reusing
// the same completeLesson flow as code lessons.
export function QuizView({
  module,
  lesson,
  nextHref,
}: {
  module: Module;
  lesson: Lesson;
  nextHref: string | null;
}) {
  const id = lessonId(module.slug, lesson.slug);
  const questions = lesson.questions ?? [];

  const completeLesson = useGameStore((s) => s.completeLesson);
  const alreadyDone = useGameStore((s) => s.completed.includes(id));

  const lessonIndex = module.lessons.findIndex((l) => l.slug === lesson.slug);
  const mounted = useMounted();
  const { locked } = useAccess(lessonIndex, module.free);
  const gated = mounted && locked;

  // Per-question selected answer index (null = unanswered).
  const [picks, setPicks] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [awarded, setAwarded] = useState(false);

  const allCorrect = useMemo(
    () => questions.length > 0 && picks.every((p, i) => p === questions[i].answer),
    [picks, questions],
  );

  function choose(qi: number, oi: number) {
    if (gated) return;
    setPicks((prev) => {
      // Lock a question once answered correctly; allow retry while wrong.
      if (prev[qi] === questions[qi].answer) return prev;
      const next = [...prev];
      next[qi] = oi;
      // Award XP the moment the final correct answer lands.
      if (!awarded && next.every((p, i) => p === questions[i].answer)) {
        setAwarded(true);
        completeLesson(id, lesson.xp);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <LevelUpToast />
      <Link
        href={`/learn/${module.slug}`}
        className="text-xs font-medium text-accent-soft hover:underline"
      >
        {module.emoji} {module.title}
      </Link>

      <article className="prose-lesson mt-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
      </article>

      {gated ? (
        <div className="mt-6">
          <ProGate />
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {questions.map((q, qi) => {
            const pick = picks[qi];
            const answered = pick !== null;
            const correct = pick === q.answer;
            return (
              <div key={qi} className="card">
                <div className="prose-lesson mb-3 font-medium text-white">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.prompt}</ReactMarkdown>
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isPick = pick === oi;
                    const showCorrect = answered && oi === q.answer;
                    const showWrong = isPick && !correct;
                    return (
                      <button
                        key={oi}
                        onClick={() => choose(qi, oi)}
                        disabled={correct}
                        className={[
                          "flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition",
                          showCorrect
                            ? "border-success/60 bg-success/10 text-white"
                            : showWrong
                              ? "border-danger/60 bg-danger/10 text-white"
                              : "border-line bg-canvas/40 text-gray-200 hover:border-accent/50",
                        ].join(" ")}
                      >
                        {showCorrect ? (
                          <CheckCircle2 size={16} className="shrink-0 text-success" />
                        ) : showWrong ? (
                          <XCircle size={16} className="shrink-0 text-danger" />
                        ) : (
                          <span className="h-4 w-4 shrink-0 rounded-full border border-gray-500" />
                        )}
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {answered && q.explanation && (
                  <p
                    className={[
                      "mt-3 rounded-lg px-3 py-2 text-sm",
                      correct ? "bg-success/10 text-success" : "bg-surface-2 text-gray-300",
                    ].join(" ")}
                  >
                    {correct ? "Correct! " : "Not quite. "}
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          {allCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-xl border border-success/50 bg-success/10 px-4 py-3 shadow-glow-success"
            >
              <CheckCircle2 className="text-success" />
              <div>
                <p className="text-sm font-semibold text-success">
                  Lesson complete! +{alreadyDone && !awarded ? 0 : lesson.xp} XP
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

          {!allCorrect && nextHref === null && (
            <p className="text-xs text-gray-500">
              Answer every question to complete the lesson.
            </p>
          )}

          {allCorrect && nextHref && (
            <Link href={nextHref} className="btn-ghost w-fit">
              Next lesson <ArrowRight size={15} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
