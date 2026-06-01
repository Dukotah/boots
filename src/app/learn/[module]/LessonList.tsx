"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";

export function LessonList({ module }: { module: Module }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const completed = useGameStore((s) => s.completed);

  return (
    <ol className="mt-8 space-y-2">
      {module.lessons.map((lesson, i) => {
        const id = lessonId(module.slug, lesson.slug);
        const done = mounted && completed.includes(id);
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
