import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getHowtos } from "@/lib/howto";

export const metadata: Metadata = {
  title: "How-To Coding Guides — Step-by-Step Solutions",
  description:
    "Hundreds of step-by-step coding how-to guides in JavaScript, Python, and SQL. Each shows a reference solution and links to a live, interactive, auto-graded lesson on Cantrip.",
  keywords: [
    "how to code",
    "javascript how to",
    "python how to",
    "sql how to",
    "coding solutions",
    "step by step coding guide",
  ],
  alternates: { canonical: "/how-to" },
};

// Display order for the language groups.
const LANGUAGE_ORDER = ["JavaScript", "Python", "SQL"];
// Cap the visible list per group to keep the page scannable; every guide is
// still individually indexable via its own page + the sitemap.
const VISIBLE_PER_GROUP = 60;

export default function HowToIndex() {
  const howtos = getHowtos();

  const groups: Record<string, typeof howtos> = {};
  for (const h of howtos) {
    (groups[h.language] ??= []).push(h);
  }

  const present = Object.keys(groups);
  const orderedLanguages = [
    ...LANGUAGE_ORDER.filter((l) => present.includes(l)),
    ...present.filter((l) => !LANGUAGE_ORDER.includes(l)),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        How-to coding guides
      </h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Step-by-step solutions to common coding problems in JavaScript, Python,
        and SQL. Read the answer, then practice it hands-on in a live,
        auto-graded lesson.
      </p>

      <div className="mt-10 space-y-10">
        {orderedLanguages.map((language) => {
          const list = groups[language];
          const visible = list.slice(0, VISIBLE_PER_GROUP);
          return (
            <section key={language}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold text-white">{language}</h2>
                <span className="text-sm text-gray-400">
                  {list.length} guide{list.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {visible.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/how-to/${h.slug}`}
                      className="group flex items-center gap-1 text-sm text-gray-300 hover:text-accent-soft"
                    >
                      <span className="truncate">{h.title}</span>
                      <ArrowRight
                        size={14}
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {list.length > visible.length && (
                <p className="mt-3 text-xs text-gray-500">
                  + {list.length - visible.length} more {language} guides.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
