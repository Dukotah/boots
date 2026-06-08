import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PATHS, pathModules } from "@/lib/paths";
import { PathQuiz } from "@/components/features/marketing/PathQuiz";
import { absoluteUrl } from "@/lib/site";

const PATHS_OG = absoluteUrl(
  `/api/og?title=${encodeURIComponent("Guided Career Paths")}&subtitle=${encodeURIComponent("From your first line of code to job-ready — frontend, backend, data, AI & more.")}`,
);

export const metadata: Metadata = {
  title: "Career Paths — Frontend, Backend, Data & Interview Prep",
  description:
    "Follow a guided coding career path. Ordered courses take you from your first line of code to job-ready — frontend, backend, data, and interview prep.",
  keywords: [
    "coding career path",
    "become a frontend developer",
    "become a backend developer",
    "learn to code roadmap",
  ],
  alternates: { canonical: "/paths" },
  openGraph: {
    type: "website",
    title: "Career Paths — Cantrip",
    description:
      "Guided coding & AI career paths — ordered courses from first line of code to job-ready.",
    url: absoluteUrl("/paths"),
    images: [{ url: PATHS_OG, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [PATHS_OG] },
};

export default function PathsIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Career paths</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Not sure where to start? Pick a path and we’ll sequence the courses for
        you — no more “what do I learn next?”.
      </p>

      <PathQuiz />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PATHS.map((p) => {
          const mods = pathModules(p);
          const lessons = mods.reduce((s, m) => s + m.lessons.length, 0);
          return (
            <Link
              key={p.slug}
              href={`/paths/${p.slug}`}
              className={`card group bg-gradient-to-br ${p.gradient} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{p.emoji}</span>
                <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                  {mods.length} courses · {lessons} lessons
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-white">{p.title}</h2>
              <p className="mt-1 text-sm text-gray-300">{p.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                View path <ArrowRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
