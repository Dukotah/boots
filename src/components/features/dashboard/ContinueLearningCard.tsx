"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { goalPath } from "@/lib/goals";
import { pathLessonIds } from "@/lib/paths";
import {
  CATALOG,
  lessonId,
  getCatalogModule,
  type CatalogLesson,
} from "@/lib/curriculum/catalogClient";

// The ONE dominant action on the dashboard: get a returning learner back into
// their next lesson in a single click, showing the specific lesson title.
//
// Next-lesson derivation reuses existing logic:
//  1. If a goal/path is chosen (RecommendedNextCard's source of truth), take the
//     first unfinished lesson on that path.
//  2. Otherwise fall back to the first unfinished lesson in the global CATALOG
//     (the page's previous `continueHref` behaviour).
// Client-only (reads persisted store) so we guard hydration with useMounted.

type NextLesson = {
  /** Canonical "moduleSlug/lessonSlug" id. */
  id: string;
  href: string;
  lessonTitle: string;
  moduleTitle: string;
  moduleEmoji: string;
};

/** Look up display metadata for a "moduleSlug/lessonSlug" id from the catalog. */
function lookupLesson(id: string): NextLesson | null {
  const [moduleSlug, lessonSlug] = id.split("/");
  const mod = getCatalogModule(moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l: CatalogLesson) => l.slug === lessonSlug);
  if (!lesson) return null;
  return {
    id,
    href: `/learn/${moduleSlug}/${lessonSlug}`,
    lessonTitle: lesson.title,
    moduleTitle: mod.title,
    moduleEmoji: mod.emoji,
  };
}

export function ContinueLearningCard() {
  const mounted = useMounted();
  const goal = useGameStore((s) => s.goal);
  const completed = useGameStore((s) => s.completed);

  const next = useMemo<NextLesson | null>(() => {
    const completedSet = new Set(completed);

    // 1. Prefer the learner's chosen path (same source as RecommendedNextCard).
    const path = goalPath(goal);
    if (path) {
      const nextId = pathLessonIds(path).find((id) => !completedSet.has(id));
      const resolved = nextId ? lookupLesson(nextId) : null;
      if (resolved) return resolved;
    }

    // 2. Fall back to the first unfinished lesson anywhere in the catalog.
    for (const m of CATALOG) {
      const lesson = m.lessons.find(
        (l) => !completedSet.has(lessonId(m.slug, l.slug)),
      );
      if (lesson) {
        return {
          id: lessonId(m.slug, lesson.slug),
          href: `/learn/${m.slug}/${lesson.slug}`,
          lessonTitle: lesson.title,
          moduleTitle: m.title,
          moduleEmoji: m.emoji,
        };
      }
    }
    return null;
  }, [goal, completed]);

  // Pre-hydration: render a quiet placeholder of the same shape to avoid layout
  // shift and hydration mismatch.
  if (!mounted) {
    return (
      <div
        className="card border-accent/30 bg-accent/10"
        aria-hidden
        style={{ minHeight: 132 }}
      />
    );
  }

  const isFresh = completed.length === 0;

  // Everything finished — nothing left to "continue". Send them to browse/review.
  if (!next) {
    return (
      <div className="card border-accent/30 bg-accent/15">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-soft">
          <Sparkles size={14} aria-hidden /> You&apos;re all caught up
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Every lesson complete — incredible.
        </h2>
        <p className="mt-1 text-sm text-gray-300">
          Keep your skills sharp by reviewing what you&apos;ve learned.
        </p>
        <Link href="/review" className="btn-primary mt-4 inline-flex">
          <Play size={16} aria-hidden /> Review your lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="card border-accent/40 bg-accent/15 ring-1 ring-accent/20">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-soft">
        <Play size={14} aria-hidden />
        {isFresh ? "Start learning" : "Continue learning"}
      </div>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm text-gray-300">
            <span className="text-base" aria-hidden>
              {next.moduleEmoji}
            </span>
            <span className="truncate">{next.moduleTitle}</span>
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-tight text-white sm:text-3xl">
            {next.lessonTitle}
          </h2>
        </div>

        <Link
          href={next.href}
          className="btn-primary shrink-0 self-start text-base sm:self-auto"
        >
          {isFresh ? "Start your first lesson" : "Resume lesson"}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
