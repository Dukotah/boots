"use client";

import Link from "next/link";
import { RefreshCw, ArrowRight } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { MODULES, getLesson, lessonId } from "@/lib/curriculum";
import { masteryTier, MASTERY_LABEL } from "@/lib/mastery";

const TIER_COLOR: Record<string, string> = {
  novice: "text-gray-400",
  learning: "text-sky-300",
  proficient: "text-violet-300",
  mastered: "text-gold",
};

export default function ReviewPage() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const dueReviews = useGameStore((s) => s.dueReviews);

  const due = mounted ? dueReviews() : [];
  const completedSet = new Set(mounted ? completed : []);

  // Resolve due ids → lesson metadata (skip any stale ids).
  const dueLessons = due
    .map((id) => {
      const [m, l] = id.split("/");
      const found = getLesson(m, l);
      return found ? { id, module: found.module, lesson: found.lesson } : null;
    })
    .filter(Boolean)
    .slice(0, 25) as {
    id: string;
    module: (typeof MODULES)[number];
    lesson: { slug: string; title: string };
  }[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-3">
        <RefreshCw className="text-accent-soft" />
        <h1 className="text-3xl font-bold text-white">Review &amp; Mastery</h1>
      </div>
      <p className="mt-1 text-gray-400">
        Spaced repetition resurfaces what you&apos;ve learned right before you
        forget it. Re-solve a lesson to lock it in deeper.
      </p>

      {/* Due reviews */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-white">
          Due for review {mounted && due.length > 0 && `(${due.length})`}
        </h2>
        {dueLessons.length === 0 ? (
          <div className="card text-center text-sm text-gray-400">
            {mounted
              ? "Nothing due right now — you're all caught up. 🎉"
              : "Loading…"}
          </div>
        ) : (
          <div className="space-y-2">
            {dueLessons.map(({ id, module, lesson }) => (
              <Link
                key={id}
                href={`/learn/${module.slug}/${lesson.slug}`}
                className="card flex items-center gap-3 py-3 hover:border-accent/60"
              >
                <span className="text-2xl">{module.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500">{module.title}</p>
                </div>
                <ArrowRight size={16} className="text-accent-soft" />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Mastery overview */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-white">Skill mastery</h2>
        <div className="space-y-2">
          {MODULES.map((m) => {
            const done = m.lessons.filter((l) =>
              completedSet.has(lessonId(m.slug, l.slug)),
            ).length;
            const pct = done / m.lessons.length;
            const tier = masteryTier(pct);
            if (done === 0) return null;
            return (
              <div key={m.slug} className="card flex items-center gap-3 py-3">
                <span className="text-2xl">{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-white">
                      {m.title}
                    </p>
                    <span className={`text-xs font-semibold ${TIER_COLOR[tier]}`}>
                      {MASTERY_LABEL[tier]}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                      style={{ width: `${Math.round(pct * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
