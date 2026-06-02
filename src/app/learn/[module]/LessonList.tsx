"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { useEntitlements } from "@/store/useEntitlements";
import { freeLessonLimit } from "@/lib/access";

export function LessonList({ module }: { module: Module }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const completed = useGameStore((s) => s.completed);
  const streak = useGameStore((s) => s.streak);
  const isPro = useEntitlements((s) => s.isPro);

  // How far the free window reaches for this learner right now (grows with streak).
  const freeLimit = freeLessonLimit(streak);

  return (
    <ol className="mt-8 space-y-2">
      {module.lessons.map((lesson, i) => {
        const id = lessonId(module.slug, lesson.slug);
        const done = mounted && completed.includes(id);
        // Reading is always free; this only marks lessons whose *interactivity* is gated.
        const locked = mounted && !module.free && !isPro && i >= freeLimit;
        return (
          <li key={lesson.slug}>
            <Link
              href={`/learn/${module.slug}/${lesson.slug}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold text-gray-400">
                {done ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{lesson.title}</p>
                <p className="truncate text-sm text-gray-400">{lesson.blurb}</p>
              </div>
              {locked && !done && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  <Lock size={11} /> Pro
                </span>
              )}
              <span className="shrink-0 text-xs font-semibold text-accent-soft">
                ⚡ {lesson.xp}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
