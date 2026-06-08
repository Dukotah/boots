import type { Metadata } from "next";
import {
  catalogByTrack,
  totalModuleCount,
  totalLessonCount,
} from "@/lib/curriculum/catalogClient";
import { CatalogSearch } from "@/components/features/catalog/CatalogSearch";
import { absoluteUrl } from "@/lib/site";

const LEARN_OG = absoluteUrl(
  `/api/og?title=${encodeURIComponent("Browse the course catalog")}&subtitle=${encodeURIComponent(`${totalModuleCount} interactive courses · ${totalLessonCount} hands-on lessons in JS, Python, SQL & AI`)}`,
);

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
  openGraph: {
    type: "website",
    title: "All Courses — Cantrip",
    description:
      "Browse interactive, auto-graded coding & AI courses. Earn XP, level up, learn by doing.",
    url: absoluteUrl("/learn"),
    images: [{ url: LEARN_OG, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [LEARN_OG] },
};

export default function LearnIndex() {
  // Lightweight catalog (no lesson bodies cross the wire).
  const groups = catalogByTrack();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Learn to code, the fun way
      </h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        {totalModuleCount} interactive courses · {totalLessonCount} hands-on lessons.
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
