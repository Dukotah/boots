"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Lock,
  ArrowRight,
  Award,
  Clock,
  Sparkles,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export type RoadmapModule = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  lessonIds: string[]; // "module/lesson" for every lesson
  xp: number;
};

type NodeState = "complete" | "in-progress" | "available" | "locked";

// A small SVG progress ring for in-progress course nodes.
function ProgressRing({ pct }: { pct: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-line"
      />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="text-accent-soft transition-[stroke-dashoffset] duration-500"
      />
    </svg>
  );
}

// The vertical, sequential "roadmap" of a path's courses, with live progress
// pulled from the game store. Courses unlock in order: a course stays locked
// until the previous one is fully complete (à la a TryHackMe / quest track).
export function PathRoadmap({
  modules,
  pathSlug,
  skills = [],
  estHours,
}: {
  modules: RoadmapModule[];
  pathSlug: string;
  /** Short skill chips, e.g. ["JS", "DOM", "APIs"]. */
  skills?: string[];
  /** Estimated total hours, computed server-side from lesson count. */
  estHours?: number;
}) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const completedSet = new Set(mounted ? completed : []);

  const doneIn = (m: RoadmapModule) =>
    m.lessonIds.filter((id) => completedSet.has(id)).length;

  const totalLessons = modules.reduce((s, m) => s + m.lessonIds.length, 0);
  const totalDone = modules.reduce((s, m) => s + doneIn(m), 0);
  const overall = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;
  const allComplete = totalLessons > 0 && totalDone === totalLessons;

  // Per-course state, with sequential unlock: a course is "locked" until every
  // earlier course is fully complete. The first not-fully-done course is the
  // active "quest"; its first unfinished lesson is the continue target.
  let priorComplete = true; // everything before index 0 is "complete"
  const nodes = modules.map((m) => {
    const done = doneIn(m);
    const total = m.lessonIds.length;
    // An empty course counts as complete so it never deadlocks the unlock chain.
    const complete = total === 0 || done === total;
    let state: NodeState;
    if (complete) state = "complete";
    else if (!priorComplete) state = "locked";
    else state = done > 0 ? "in-progress" : "available";
    const pct = total ? Math.round((done / total) * 100) : 0;
    // The first lesson in this course not yet completed (for deep-linking).
    const nextLessonId =
      m.lessonIds.find((id) => !completedSet.has(id)) ?? m.lessonIds[0];
    if (!complete) priorComplete = false;
    return { m, done, total, complete, state, pct, nextLessonId };
  });

  // The "continue" target: first unfinished lesson of the first unfinished course.
  const activeNode = nodes.find((n) => !n.complete);
  const continueHref =
    allComplete || !activeNode
      ? `/certificate/path/${pathSlug}`
      : `/learn/${activeNode.nextLessonId}`;

  return (
    <div>
      {/* Stats + skills banner */}
      <div className="card mb-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-white">Quest progress</span>
          <span className="text-gray-400">
            {totalDone}/{totalLessons} lessons · {overall}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
            initial={{ width: 0 }}
            animate={{ width: `${overall}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {(skills.length > 0 || estHours) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {estHours ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-gold">
                <Clock size={12} /> ~{estHours}h to complete
              </span>
            ) : null}
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Desktop / inline CTA (the sticky one lives at the page bottom). */}
        {allComplete ? (
          <Link
            href={continueHref}
            className="btn-primary mt-4 w-full bg-gold text-canvas hover:bg-gold/90 sm:w-auto"
          >
            <Award size={16} /> Path complete — claim certificate
          </Link>
        ) : (
          <Link href={continueHref} className="btn-primary mt-4 w-full sm:w-auto">
            {overall === 0 ? "Begin the path" : "Continue path"}{" "}
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Vertical roadmap timeline */}
      <ol className="relative space-y-3 before:absolute before:left-[26px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-line">
        {nodes.map(({ m, done, total, state, pct, nextLessonId }, i) => {
          const locked = state === "locked";
          const Inner = (
            <div
              className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                locked
                  ? "cursor-not-allowed border-line/60 bg-surface/40"
                  : state === "complete"
                    ? "border-success/40 bg-success/5 hover:border-success/60"
                    : "border-line bg-surface hover:border-accent/60"
              }`}
            >
              {/* Node marker */}
              <span
                className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border text-lg ${
                  state === "complete"
                    ? "border-success/60 bg-success/15"
                    : locked
                      ? "border-line bg-surface-2"
                      : "border-accent/50 bg-surface-2"
                }`}
              >
                {state === "in-progress" && <ProgressRing pct={pct} />}
                {state === "complete" ? (
                  <Check className="text-success" size={24} />
                ) : locked ? (
                  <Lock className="text-gray-500" size={20} />
                ) : (
                  <span className="relative z-10 text-xl">{m.emoji}</span>
                )}
              </span>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`truncate font-semibold ${
                      locked ? "text-gray-500" : "text-white"
                    }`}
                  >
                    <span className="text-gray-500">{i + 1}.</span>{" "}
                    {!locked && <span>{m.emoji} </span>}
                    {m.title}
                  </p>
                  <span
                    className={`shrink-0 text-xs ${
                      state === "complete" ? "text-success" : "text-gray-400"
                    }`}
                  >
                    {locked ? `${total} lessons` : `${done}/${total}`}
                  </span>
                </div>
                <p
                  className={`mt-0.5 truncate text-sm ${
                    locked ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {locked ? "Finish the previous course to unlock" : m.description}
                </p>
                {!locked && state !== "complete" && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent/70 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
                {state === "in-progress" && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
                    <Sparkles size={11} /> In progress
                  </span>
                )}
              </div>
            </div>
          );

          return (
            <motion.li
              key={m.slug}
              className="relative"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
            >
              {locked ? (
                <div aria-disabled>{Inner}</div>
              ) : (
                <Link
                  href={
                    state === "complete"
                      ? `/learn/${m.slug}`
                      : `/learn/${nextLessonId}`
                  }
                  className="block"
                >
                  {Inner}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ol>

      {/* Sticky "Continue Path" CTA — sticks to the bottom of the viewport while
          the learner scrolls the roadmap, on every breakpoint. */}
      <div className="pointer-events-none sticky bottom-3 z-20 mt-6 flex justify-center">
        <Link
          href={continueHref}
          className={`btn-primary pointer-events-auto w-full shadow-glow sm:w-auto ${
            allComplete ? "bg-gold text-canvas hover:bg-gold/90" : ""
          }`}
        >
          {allComplete ? (
            <>
              <Award size={16} /> Path complete — claim certificate
            </>
          ) : (
            <>
              {overall === 0 ? "Begin the path" : "Continue path"}{" "}
              <ArrowRight size={16} />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
