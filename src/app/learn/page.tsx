import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { MODULES, totalLessons } from "@/lib/curriculum";
import { groupByTrack } from "@/lib/curriculum/tracks";

export const metadata: Metadata = {
  title: "All Courses — Learn JavaScript, Python, SQL & AI",
  description:
    "Browse free, interactive coding courses: JavaScript, Python, SQL, algorithms, data structures, and AI/LLMs. Every lesson is auto-graded in your browser. Earn XP and level up.",
  keywords: [
    "learn javascript",
    "learn python",
    "learn sql",
    "coding courses",
    "free programming course",
    "interactive coding lessons",
  ],
  alternates: { canonical: "/learn" },
};

export default function LearnIndex() {
  const groups = groupByTrack(MODULES);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Learn to code, the fun way
      </h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        {MODULES.length} interactive courses · {totalLessons()} hands-on lessons.
        Write real code in JavaScript, Python, and SQL — everything runs and
        auto-grades right in your browser. Free to start, no setup.
      </p>

      {/*
        LEARNING PASS SLOT — reserved, intentionally empty for now.
        The seasonal learning pass banner will mount here, between the page
        header and the track list, so it's the first thing learners see without
        pushing the catalog far down the page. Drop a <LearningPassBanner /> in
        when the feature ships; nothing else on this page needs to move.
      */}

      {/* Jump-to-track nav — keeps 90+ courses navigable at a glance. */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {groups.map(({ track, modules }) => (
          <a
            key={track.id}
            href={`#track-${track.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2/50 px-3 py-1 text-sm text-gray-300 transition-colors hover:border-accent/60 hover:text-white"
          >
            <span aria-hidden>{track.emoji}</span>
            {track.label}
            <span className="text-xs text-gray-500">{modules.length}</span>
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {groups.map(({ track, modules }) => (
          <section key={track.id} aria-labelledby={`track-${track.id}`}>
            <div className="flex items-baseline gap-2">
              <span aria-hidden className="text-xl">
                {track.emoji}
              </span>
              <h2
                id={`track-${track.id}`}
                className="scroll-mt-24 text-xl font-bold text-white"
              >
                {track.label}
              </h2>
              <span className="text-sm text-gray-500">{modules.length} courses</span>
            </div>
            <p className="mt-1 text-sm text-gray-400">{track.blurb}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => (
                <Link
                  key={m.slug}
                  href={`/learn/${m.slug}`}
                  className={`card group flex flex-col gap-2 bg-gradient-to-br p-4 ${m.gradient} transition-transform hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="rounded-full bg-black/30 px-2 py-0.5 text-xs text-gray-300">
                      {m.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{m.title}</h3>
                  <p className="line-clamp-2 text-sm text-gray-300">
                    {m.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Open course <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
