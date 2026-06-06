"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";

// Prev / Next quest navigation, derived from the lesson's position in its module.
// Gracefully degrades at the ends: no prev on the first lesson, "Finish course"
// on the last. `passed` emphasizes Next once the learner clears the quest.
export function LessonNav({
  module,
  currentSlug,
  passed,
}: {
  module: Module;
  currentSlug: string;
  passed: boolean;
}) {
  const index = module.lessons.findIndex((l) => l.slug === currentSlug);
  const prev = index > 0 ? module.lessons[index - 1] : null;
  const next = index >= 0 ? module.lessons[index + 1] : null;

  const prevHref = prev ? `/learn/${module.slug}/${prev.slug}` : null;
  const nextHref = next ? `/learn/${module.slug}/${next.slug}` : null;

  return (
    <div className="flex items-stretch gap-3">
      {prevHref ? (
        <Link
          href={prevHref}
          className="btn-ghost flex-1 justify-start gap-2 text-left"
        >
          <ArrowLeft size={15} className="shrink-0" />
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wide text-gray-500">
              Previous
            </span>
            <span className="block truncate text-sm">{prev!.title}</span>
          </span>
        </Link>
      ) : (
        <Link
          href={`/learn/${module.slug}`}
          className="btn-ghost flex-1 justify-start gap-2 text-left"
        >
          <ArrowLeft size={15} className="shrink-0" />
          <span className="text-sm">Course overview</span>
        </Link>
      )}

      {nextHref ? (
        <Link
          href={nextHref}
          className={[
            "flex-1 justify-end gap-2 text-right",
            passed ? "btn-primary" : "btn-ghost",
          ].join(" ")}
        >
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wide opacity-70">
              {passed ? "Next quest" : "Next"}
            </span>
            <span className="block truncate text-sm">{next!.title}</span>
          </span>
          <ArrowRight size={15} className="shrink-0" />
        </Link>
      ) : (
        <Link
          href={`/learn/${module.slug}`}
          className={[
            "flex-1 justify-end gap-2 text-right",
            passed ? "btn-primary" : "btn-ghost",
          ].join(" ")}
        >
          <span className="text-sm">Finish course</span>
          <Flag size={15} className="shrink-0" />
        </Link>
      )}
    </div>
  );
}
