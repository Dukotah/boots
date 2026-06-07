"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckSquare,
  ClipboardCopy,
  MessageSquare,
  Square,
  Zap,
} from "lucide-react";
import {
  PREP_PLAN,
  PREP_CHECKLIST,
  assembleStarAnswer,
} from "@/lib/interviewPrep";
import type { StarAnswer } from "@/lib/interviewPrep";

// ─── STAR Builder ──────────────────────────────────────────────────────────────

const STAR_FIELDS: { key: keyof StarAnswer; label: string; placeholder: string }[] = [
  {
    key: "situation",
    label: "Situation",
    placeholder: "Set the scene — company/team context, what was at stake, timeline.",
  },
  {
    key: "task",
    label: "Task",
    placeholder: "Your specific responsibility (what were *you* accountable for?).",
  },
  {
    key: "action",
    label: "Action",
    placeholder: "What you did, step by step. Use 'I', not 'we'. Give the most detail here.",
  },
  {
    key: "result",
    label: "Result",
    placeholder: "Quantified outcome + what you learned. Numbers make it credible.",
  },
];

function StarBuilder() {
  const id = useId();
  const [fields, setFields] = useState<StarAnswer>({
    situation: "",
    task: "",
    action: "",
    result: "",
  });
  const [copied, setCopied] = useState(false);

  const assembled = assembleStarAnswer(fields);
  const hasContent = assembled.trim().length > 0;

  function handleChange(key: keyof StarAnswer, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    if (!hasContent) return;
    try {
      await navigator.clipboard.writeText(assembled);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — fail silently, assembled is visible on screen
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface-1 p-6">
      <h3 className="flex items-center gap-2 text-base font-bold text-white">
        <MessageSquare size={16} className="text-accent-soft" aria-hidden="true" />
        STAR Answer Builder
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        Fill in the four fields — your assembled answer appears below, ready to copy.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {STAR_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label
              htmlFor={`${id}-${key}`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent-soft"
            >
              {label}
            </label>
            <textarea
              id={`${id}-${key}`}
              rows={4}
              value={fields[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              aria-label={`STAR ${label}`}
              className="w-full resize-y rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
          </div>
        ))}
      </div>

      {/* Assembled preview */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Assembled answer
          </p>
          <button
            onClick={handleCopy}
            disabled={!hasContent}
            aria-label="Copy assembled STAR answer to clipboard"
            className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? (
              <>
                <Check size={13} aria-hidden="true" /> Copied
              </>
            ) : (
              <>
                <ClipboardCopy size={13} aria-hidden="true" /> Copy
              </>
            )}
          </button>
        </div>

        <div
          aria-live="polite"
          aria-label="Assembled STAR answer"
          className="mt-2 min-h-[80px] rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap"
        >
          {hasContent ? (
            assembled
          ) : (
            <span className="text-gray-600 italic">
              Your assembled answer will appear here as you type above.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STAR Explainer card ───────────────────────────────────────────────────────

function StarExplainer() {
  return (
    <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/5 p-5">
      <h4 className="font-bold text-white">The STAR Framework</h4>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          {
            letter: "S",
            label: "Situation",
            desc: "Set the scene — just enough context (team size, stakes, timeline) without a biography.",
          },
          {
            letter: "T",
            label: "Task",
            desc: "Your specific responsibility, distinct from the team's shared goal.",
          },
          {
            letter: "A",
            label: "Action",
            desc: "What you did — use 'I', not 'we'. This gets the most detail; it's where interviewers gather signal.",
          },
          {
            letter: "R",
            label: "Result",
            desc: "Quantified outcome + what you learned. Numbers make results credible and memorable.",
          },
        ].map(({ letter, label, desc }) => (
          <div key={letter} className="flex gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-sm font-extrabold text-accent-soft"
              aria-hidden="true"
            >
              {letter}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-0.5 text-xs text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">
        Target 90–120 seconds out loud. Practice timing — reading notes is not the
        same as saying it.
      </p>
    </div>
  );
}

// ─── Checklist ─────────────────────────────────────────────────────────────────

function Checklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function toggle(i: number) {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <section
      aria-labelledby="checklist-heading"
      className="mt-8 rounded-2xl border border-line bg-surface-1 p-6"
    >
      <div className="flex items-center justify-between">
        <h2
          id="checklist-heading"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <Zap size={18} className="text-accent-soft" aria-hidden="true" />
          Interview-Day Checklist
        </h2>
        <span className="text-sm text-gray-400" aria-live="polite">
          {doneCount}/{PREP_CHECKLIST.length}
        </span>
      </div>

      <ul className="mt-4 space-y-3" role="list">
        {PREP_CHECKLIST.map((item, i) => {
          const done = !!checked[i];
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                aria-pressed={done}
                className="group flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-2 text-left transition hover:border-line hover:bg-surface-2"
              >
                <span className="mt-0.5 shrink-0 text-accent-soft" aria-hidden="true">
                  {done ? <CheckSquare size={18} /> : <Square size={18} className="text-gray-600" />}
                </span>
                <div>
                  <p
                    className={`text-sm font-medium transition ${done ? "text-gray-500 line-through" : "text-gray-200"}`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.detail}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/career" className="text-accent-soft hover:underline">
          Career Pack
        </Link>
        <ArrowRight size={13} aria-hidden="true" />
        <span className="text-gray-400">Interview Prep</span>
      </nav>

      {/* Header */}
      <div className="mt-5 flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-2xl"
          aria-hidden="true"
        >
          🎯
        </span>
        <div>
          <h1 className="text-3xl font-bold text-white">Interview Prep Hub</h1>
          <p className="mt-1 text-gray-400">
            A curated plan that takes you from first pass to offer — coding challenges,
            behavioral stories, system design, and a STAR builder you can use right now.
          </p>
        </div>
      </div>

      {/* ── Prep sections ── */}
      <div className="mt-10 space-y-12">
        {PREP_PLAN.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            {/* Section header */}
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {section.emoji}
              </span>
              <div>
                <h2
                  id={`section-${section.id}`}
                  className="text-xl font-bold text-white"
                >
                  {section.title}
                </h2>
                <p className="mt-0.5 text-sm text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>

            {/* Lesson deep-links */}
            <ul
              className="mt-4 grid gap-2 sm:grid-cols-2"
              role="list"
              aria-label={`${section.title} lessons`}
            >
              {section.lessons.map((lesson) => (
                <li key={lesson.href}>
                  <Link
                    href={lesson.href}
                    className="group flex items-start gap-3 rounded-xl border border-line bg-surface-1 p-4 transition hover:border-accent/60 hover:bg-surface-2"
                  >
                    <BookOpen
                      size={16}
                      className="mt-0.5 shrink-0 text-accent-soft opacity-70"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-gray-200 group-hover:text-white">
                          {lesson.label}
                        </p>
                        <span className="shrink-0 text-xs text-gray-500">
                          +{lesson.xp} XP
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {lesson.blurb}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-0.5 shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-accent-soft"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Extra blocks (STAR explainer, behavioral questions) */}
            {section.extra?.map((extra, i) => {
              if (extra.kind === "star-explainer") {
                return <StarExplainer key={i} />;
              }

              if (extra.kind === "questions") {
                return (
                  <div key={i} className="mt-6">
                    <h3 className="text-base font-bold text-white">
                      10 Common Behavioral Questions
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Prepare a STAR story for each of these before any interview.
                    </p>
                    <ol className="mt-4 space-y-3" role="list">
                      {extra.questions.map((q, qi) => (
                        <li
                          key={qi}
                          className="rounded-xl border border-line bg-surface-1 p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-accent-soft"
                              aria-hidden="true"
                            >
                              {qi + 1}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-gray-200">
                                {q.question}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                <span className="font-medium text-gray-400">
                                  {q.category}
                                </span>{" "}
                                — {q.tip}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>

                    {/* STAR builder lives right after the questions */}
                    <StarBuilder />
                  </div>
                );
              }

              return null;
            })}
          </section>
        ))}
      </div>

      {/* ── Pre-interview checklist ── */}
      <Checklist />

      {/* ── Footer CTA ── */}
      <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
        <p className="text-sm font-medium text-gray-300">
          Track your progress and see your job-readiness score on the
        </p>
        <Link
          href="/career"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft hover:underline"
        >
          Career Pack dashboard
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
