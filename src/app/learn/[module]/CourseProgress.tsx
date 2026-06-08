"use client";

// Course-level progress summary + "continue where you left off" CTA (#10) and
// the free/Pro boundary cue (#7). All of this depends on persisted client store
// state (completed lessons, streak, Pro entitlement), so it lives in its own
// "use client" island rather than converting the whole course page.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum/ids";
import { useGameStore } from "@/store/useGameStore";
import { useProAccess } from "@/store/useEntitlements";
import { freeLessonLimit } from "@/lib/access";
import { useMounted } from "@/hooks/useMounted";

export function CourseProgress({ module }: { module: Module }) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const streak = useGameStore((s) => s.streak);
  const isPro = useProAccess();

  const total = module.lessons.length;

  // Completion is computed exactly as LessonView/LessonList do: the store holds
  // "moduleSlug/lessonSlug" ids, so we test membership per lesson. Gate on
  // `mounted` so SSR + first paint show the zero state (no hydration flash).
  const doneFlags = module.lessons.map(
    (lesson) => mounted && completed.includes(lessonId(module.slug, lesson.slug)),
  );
  const doneCount = doneFlags.filter(Boolean).length;

  // Next lesson = first not-yet-completed lesson. Fall back to lesson 1 when
  // nothing is done, and to the last lesson when everything is complete.
  const firstIncomplete = doneFlags.findIndex((d) => !d);
  const nextIndex =
    firstIncomplete === -1 ? Math.max(0, total - 1) : firstIncomplete;
  const nextLesson = module.lessons[nextIndex];
  const allComplete = mounted && doneCount === total && total > 0;
  const started = doneCount > 0;

  // Free/Pro boundary (#7): same rule the lesson page enforces — the first
  // `freeLessonLimit(streak)` lessons are interactive for free (paid courses
  // only; `module.free` courses are fully open, as is Pro).
  const freeLimit = freeLessonLimit(streak);
  const showFreeCue = mounted && !module.free && !isPro;
  const freeLeft = Math.max(0, Math.min(freeLimit, total) - doneCount);

  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const ctaLabel = allComplete ? "Review" : started ? "Continue" : "Start";

  return (
    <div className="card mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-gray-300">Your progress</p>
            <p className="shrink-0 text-sm font-semibold text-white">
              {doneCount}
              <span className="text-gray-500">/{total}</span>{" "}
              <span className="font-normal text-gray-400">complete</span>
            </p>
          </div>
          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={doneCount}
            aria-label={`${doneCount} of ${total} lessons complete`}
          >
            <div
              className="h-full rounded-full bg-success transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {showFreeCue && (
            <p className="mt-2 text-xs text-gray-400">
              {freeLeft > 0 ? (
                <>
                  <span className="font-semibold text-accent-soft">
                    {freeLeft} free {freeLeft === 1 ? "lesson" : "lessons"} left
                  </span>{" "}
                  in this course
                </>
              ) : (
                <>
                  Free preview used —{" "}
                  <Link href="/pricing" className="font-semibold text-gold hover:underline">
                    go Pro
                  </Link>{" "}
                  to unlock the rest
                </>
              )}
            </p>
          )}
        </div>

        <Link
          href={`/learn/${module.slug}/${nextLesson.slug}`}
          className="btn-primary shrink-0 justify-center sm:w-auto"
        >
          <span className="truncate">
            {ctaLabel} <span className="opacity-80">→ {nextLesson.title}</span>
          </span>
          <ArrowRight size={16} className="shrink-0" />
        </Link>
      </div>
    </div>
  );
}
