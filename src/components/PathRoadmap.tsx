"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
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

// The vertical, numbered "roadmap" of a path's modules, with live progress
// pulled from the game store (à la a TryHackMe path layout).
export function PathRoadmap({ modules }: { modules: RoadmapModule[] }) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  const doneIn = (m: RoadmapModule) =>
    mounted ? m.lessonIds.filter((id) => completed.includes(id)).length : 0;

  const totalLessons = modules.reduce((s, m) => s + m.lessonIds.length, 0);
  const totalDone = mounted
    ? modules.reduce((s, m) => s + doneIn(m), 0)
    : 0;
  const overall = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;

  // First module that isn't fully complete → the "continue" target.
  const nextModule =
    modules.find((m) => doneIn(m) < m.lessonIds.length) ?? modules[0];

  return (
    <div>
      {/* Overall progress */}
      <div className="card mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-white">Your progress</span>
          <span className="text-gray-400">
            {totalDone}/{totalLessons} lessons · {overall}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>
        {nextModule && (
          <Link
            href={`/learn/${nextModule.slug}`}
            className="btn-primary mt-4 w-full sm:w-auto"
          >
            {overall === 0 ? "Start path" : "Continue"} <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Roadmap */}
      <ol className="relative space-y-3 before:absolute before:left-[22px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
        {modules.map((m, i) => {
          const done = doneIn(m);
          const total = m.lessonIds.length;
          const complete = done === total && total > 0;
          const pct = total ? Math.round((done / total) * 100) : 0;
          return (
            <li key={m.slug} className="relative">
              <Link
                href={`/learn/${m.slug}`}
                className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60"
              >
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg ${
                    complete
                      ? "border-success/60 bg-success/15"
                      : "border-line bg-surface-2"
                  }`}
                >
                  {complete ? (
                    <CheckCircle2 className="text-success" size={22} />
                  ) : (
                    <span className="text-sm font-bold text-gray-400">
                      {i + 1}
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold text-white">
                      {m.emoji} {m.title}
                    </p>
                    <span className="shrink-0 text-xs text-gray-400">
                      {done}/{total}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-gray-400">
                    {m.description}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent/70"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
