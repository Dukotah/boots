import type { Metadata } from "next";
import { MODULES, totalLessons } from "@/lib/curriculum";
import { groupByTrack } from "@/lib/curriculum/tracks";
import { CatalogSearch } from "@/components/features/catalog/CatalogSearch";

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

      {/*
        CatalogSearch is a client component that owns the search input, the
        jump-to-track nav, and the course grid. The server page passes the
        pre-computed track groups so no data fetching happens client-side.
      */}
      <CatalogSearch groups={groups} />
    </div>
  );
}
