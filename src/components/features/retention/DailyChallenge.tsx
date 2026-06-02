"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { MODULES, lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// A deterministic "problem of the day" — everyone gets the same lesson on a given
// date, and it rotates daily, giving a reason to return.
const ALL = MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ module: m, lesson: l })),
);

function pickForToday() {
  const now = new Date();
  const dayNumber = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
  return ALL[dayNumber % ALL.length];
}

export function DailyChallenge() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  if (!mounted || ALL.length === 0) {
    return <div className="card h-28" />;
  }

  const { module, lesson } = pickForToday();
  const id = lessonId(module.slug, lesson.slug);
  const done = completed.includes(id);

  return (
    <Link
      href={`/learn/${module.slug}/${lesson.slug}`}
      className="card group flex items-center gap-4 bg-gradient-to-br from-accent/15 to-fuchsia-500/5 hover:border-accent/60"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-2xl">
        {module.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-soft">
          <CalendarDays size={13} /> Challenge of the day
        </p>
        <p className="truncate font-medium text-white">{lesson.title}</p>
        <p className="truncate text-sm text-gray-400">{lesson.blurb}</p>
      </div>
      {done ? (
        <span className="flex items-center gap-1 text-xs text-success">
          <CheckCircle2 size={14} /> Done
        </span>
      ) : (
        <span className="flex items-center gap-1 text-sm font-medium text-white">
          +{lesson.xp} XP <ArrowRight size={15} />
        </span>
      )}
    </Link>
  );
}
