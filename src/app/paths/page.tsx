import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Layers, Clock } from "lucide-react";
import { PATHS, pathStats } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Learning Paths — Front-End, Back-End, AI & More",
  description:
    "Follow a guided pathway to a role: Front-End Developer, Back-End Developer, AI Engineer, Coding Interview Prep, Python, Data & SQL, and CS Fundamentals. Curated, ordered courses that take you from zero to job-ready.",
  keywords: [
    "front end developer roadmap",
    "back end developer path",
    "learn to code path",
    "ai engineer roadmap",
    "coding interview prep",
  ],
  alternates: { canonical: "/paths" },
};

const DIFF_COLOR: Record<string, string> = {
  Beginner: "text-success",
  Intermediate: "text-gold",
  Advanced: "text-danger",
};

// Rough estimate: ~12 minutes per lesson.
function estHours(lessons: number): number {
  return Math.max(1, Math.round((lessons * 12) / 60));
}

export default function PathsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-accent-soft">
        <Layers size={18} />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Pathways
        </span>
      </div>
      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        Pick a path to a role
      </h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Not sure where to start? A pathway bundles the right courses in the right
        order and takes you from zero to job-ready. Pick a destination and follow
        the map.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PATHS.map((path) => {
          const stats = pathStats(path);
          return (
            <Link
              key={path.slug}
              href={`/paths/${path.slug}`}
              className={`card group flex flex-col bg-gradient-to-br ${path.gradient} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{path.emoji}</span>
                <span
                  className={`text-xs font-semibold ${DIFF_COLOR[path.difficulty]}`}
                >
                  {path.difficulty}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{path.title}</h2>
              <p className="mt-1 flex-1 text-sm text-gray-300">{path.tagline}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <Layers size={13} /> {stats.modules} courses · {stats.lessons}{" "}
                  lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> ~{estHours(stats.lessons)}h
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white">
                View path <ArrowRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        Prefer to browse everything?{" "}
        <Link href="/learn" className="text-accent-soft hover:underline">
          See all courses →
        </Link>
      </div>
    </div>
  );
}
