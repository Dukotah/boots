"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Sparkles, Wand2 } from "lucide-react";
import type {
  Lesson,
  Module,
  RubricCheck,
  ProjectCheckpoint,
} from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { celebrate } from "@/lib/celebrate";
import { useAccess } from "@/hooks/useAccess";
import { useMounted } from "@/hooks/useMounted";
import { LevelUpToast } from "./LevelUpToast";
import { SkillPointToast } from "./SkillPointToast";
import { ProGate } from "./features/billing/ProGate";

// Evaluate one declarative rubric check against the learner's pasted text. Pure
// string logic — runs entirely in the browser, no API. Mirrors the semantics
// documented on RubricCheck in curriculum/types.ts.
function passesCheck(check: RubricCheck, raw: string): boolean {
  const text = check.caseSensitive ? raw : raw.toLowerCase();
  switch (check.test) {
    case "minWords": {
      const words = raw.trim().split(/\s+/).filter(Boolean).length;
      return words >= Number(check.value);
    }
    case "minLength":
      return raw.trim().length >= Number(check.value);
    case "includes":
      return text.includes(
        check.caseSensitive ? check.value : check.value.toLowerCase(),
      );
    case "includesAny":
      return check.value
        .split(",")
        .map((s) => (check.caseSensitive ? s.trim() : s.trim().toLowerCase()))
        .filter(Boolean)
        .some((needle) => text.includes(needle));
    case "regex":
      try {
        return new RegExp(check.value, check.caseSensitive ? "" : "i").test(raw);
      } catch {
        // A malformed pattern shouldn't trap the learner — treat as not-yet-met.
        return false;
      }
    default:
      return false;
  }
}

// Renders a guided AI project: reading + a do-it-in-a-real-tool checklist and an
// optional paste-and-grade checkpoint. Completing every step (and passing every
// rubric check, if there's a checkpoint) awards XP — reusing the same
// completeLesson flow as code and quiz lessons.
export function ProjectView({
  module,
  lesson,
  nextHref,
}: {
  module: Module;
  lesson: Lesson;
  nextHref: string | null;
}) {
  const id = lessonId(module.slug, lesson.slug);
  const steps = lesson.steps ?? [];
  const checkpoint: ProjectCheckpoint | undefined = lesson.checkpoint;

  const completeLesson = useGameStore((s) => s.completeLesson);
  const alreadyDone = useGameStore((s) => s.completed.includes(id));

  const lessonIndex = module.lessons.findIndex((l) => l.slug === lesson.slug);
  const mounted = useMounted();
  const { locked } = useAccess(lessonIndex, module.free);
  const gated = mounted && locked;

  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));
  const [pasted, setPasted] = useState("");
  const [awarded, setAwarded] = useState(false);

  const allStepsDone = steps.length > 0 && checked.every(Boolean);

  // Per-check results drive the live rubric UI; all must pass.
  const checkResults = useMemo(
    () => (checkpoint ? checkpoint.rubric.map((c) => passesCheck(c, pasted)) : []),
    [checkpoint, pasted],
  );
  const checkpointPassed = !checkpoint || checkResults.every(Boolean);
  const complete = allStepsDone && checkpointPassed;

  // Award XP the instant the lesson tips into "complete" — same trigger model as
  // the quiz engine (fire once, on the transition).
  function maybeAward(stepsDone: boolean, cpPassed: boolean) {
    if (!awarded && stepsDone && cpPassed) {
      setAwarded(true);
      completeLesson(id, lesson.xp);
      celebrate();
    }
  }

  function toggleStep(i: number) {
    if (gated) return;
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      maybeAward(next.every(Boolean), checkpointPassed);
      return next;
    });
  }

  function onPaste(value: string) {
    if (gated) return;
    setPasted(value);
    if (checkpoint) {
      const cpPassed = checkpoint.rubric.every((c) => passesCheck(c, value));
      maybeAward(allStepsDone, cpPassed);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <LevelUpToast />
      <SkillPointToast />
      <Link
        href={`/learn/${module.slug}`}
        className="text-xs font-medium text-accent-soft hover:underline"
      >
        {module.emoji} {module.title}
      </Link>

      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-soft">
          <Wand2 size={12} /> Hands-on project
        </span>
      </div>

      <article className="prose-lesson mt-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
      </article>

      {gated ? (
        <div className="mt-6">
          <ProGate />
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {/* Step checklist */}
          {steps.length > 0 && (
            <div className="card">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <Sparkles size={15} className="text-accent" /> Your mission
              </h3>
              <ol className="space-y-2">
                {steps.map((step, i) => {
                  const done = checked[i];
                  return (
                    <li key={i}>
                      <button
                        onClick={() => toggleStep(i)}
                        aria-pressed={done}
                        className={[
                          "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition",
                          done
                            ? "border-success/50 bg-success/10"
                            : "border-line bg-canvas/40 hover:border-accent/50",
                        ].join(" ")}
                      >
                        {done ? (
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                        ) : (
                          <Circle size={18} className="mt-0.5 shrink-0 text-gray-500" />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="prose-lesson prose-tight text-gray-200">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {step.instruction}
                            </ReactMarkdown>
                          </span>
                          {step.hint && (
                            <span className="mt-1 block text-xs text-gray-500">
                              💡 {step.hint}
                            </span>
                          )}
                        </span>
                        {step.tool && (
                          <span className="shrink-0 rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-gray-300">
                            {step.tool}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Paste-and-grade checkpoint */}
          {checkpoint && (
            <div className="card">
              <div className="prose-lesson mb-3 text-sm text-gray-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {checkpoint.prompt}
                </ReactMarkdown>
              </div>
              <textarea
                value={pasted}
                onChange={(e) => onPaste(e.target.value)}
                placeholder={checkpoint.placeholder ?? "Paste your work here…"}
                rows={6}
                className="w-full resize-y rounded-xl border border-line bg-canvas/60 px-3 py-2 text-sm text-gray-100 outline-none placeholder:text-gray-600 focus:border-accent/60"
              />
              <ul className="mt-3 space-y-1.5">
                {checkpoint.rubric.map((c, i) => {
                  const ok = checkResults[i];
                  return (
                    <li
                      key={i}
                      className={[
                        "flex items-center gap-2 text-sm transition",
                        ok ? "text-success" : "text-gray-400",
                      ].join(" ")}
                    >
                      {ok ? (
                        <CheckCircle2 size={15} className="shrink-0" />
                      ) : (
                        <Circle size={15} className="shrink-0 text-gray-600" />
                      )}
                      {c.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {complete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-xl border border-success/50 bg-success/10 px-4 py-3 shadow-glow-success"
            >
              <CheckCircle2 className="text-success" />
              <div>
                <p className="text-sm font-semibold text-success">
                  Project complete! +{alreadyDone && !awarded ? 0 : lesson.xp} XP
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

          {!complete && (
            <p className="text-xs text-gray-500">
              {checkpoint
                ? "Tick off every step and pass each checkpoint to complete the project."
                : "Tick off every step to complete the project."}
            </p>
          )}

          {complete && nextHref && (
            <Link href={nextHref} className="btn-ghost w-fit">
              Next lesson <ArrowRight size={15} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
