"use client";

import Link from "next/link";
import { Shuffle } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { pickInterleaved } from "@/lib/interleaving";
import { getCatalogModule } from "@/lib/curriculum/catalogClient";

// Resolve display metadata (title, emoji, blurb) from a lessonId without
// importing the full curriculum barrel. getCatalogModule pulls only the
// lightweight catalog.data.json — no lesson bodies, no bundle bloat.
function resolveMeta(lessonId: string): {
  emoji: string;
  moduleTitle: string;
  lessonTitle: string;
  blurb: string;
  href: string;
} | null {
  const [moduleSlug, lessonSlug] = lessonId.split("/");
  const mod = getCatalogModule(moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return {
    emoji: mod.emoji,
    moduleTitle: mod.title,
    lessonTitle: lesson.title,
    blurb: lesson.blurb,
    href: `/learn/${moduleSlug}/${lessonSlug}`,
  };
}

/**
 * InterleaveCard — dashboard card that surfaces 1-2 already-mastered lessons
 * for a quick "mix it up" revisit. Uses the pure `pickInterleaved()` function
 * from lib/interleaving; reads only `completed` and `reviews` from the store.
 *
 * Only renders when there are qualifying interleaved picks; returns null otherwise
 * so it never takes up space for learners who haven't built up a history yet.
 */
export function InterleaveCard() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const reviews = useGameStore((s) => s.reviews);

  if (!mounted) {
    return <div className="card h-20" />;
  }

  const picks = pickInterleaved(completed, reviews, 2);

  // Hide the card entirely when there is nothing to surface.
  if (picks.length === 0) return null;

  const resolved = picks
    .map((p) => ({ ...p, meta: resolveMeta(p.lessonId) }))
    .filter((p) => p.meta !== null) as Array<{
    lessonId: string;
    score: number;
    meta: NonNullable<ReturnType<typeof resolveMeta>>;
  }>;

  if (resolved.length === 0) return null;

  return (
    <div className="card space-y-3 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
      {/* Header */}
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400">
        <Shuffle size={13} /> Mix it up &mdash; quick review
      </p>
      <p className="text-xs text-gray-500">
        Revisiting lessons you already know in a new context sharpens long-term retention.
      </p>

      {/* Lesson rows */}
      <div className="space-y-2">
        {resolved.map(({ lessonId, meta }) => (
          <Link
            key={lessonId}
            href={meta.href}
            className="group flex items-center gap-3 rounded-lg border border-line/60 bg-surface-2/40 px-3 py-2.5 transition-colors hover:border-emerald-400/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
              {meta.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white group-hover:text-emerald-300">
                {meta.lessonTitle}
              </p>
              <p className="truncate text-xs text-gray-500">
                {meta.moduleTitle} &mdash; {meta.blurb}
              </p>
            </div>
            <span className="shrink-0 text-xs font-medium text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
              Go &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
