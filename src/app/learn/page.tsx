import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { MODULES, totalLessons } from "@/lib/curriculum";
import { langMeta } from "@/lib/curriculum/lang";
import type { LessonLanguage, Module } from "@/lib/curriculum/types";

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

// Section order controls how the catalog reads top-to-bottom.
const LANG_ORDER: LessonLanguage[] = ["js", "py", "sql"];

function groupByLanguage(): { lang: LessonLanguage; modules: Module[] }[] {
  const groups = new Map<LessonLanguage, Module[]>();
  for (const m of MODULES) {
    const lang = m.language ?? "js";
    if (!groups.has(lang)) groups.set(lang, []);
    groups.get(lang)!.push(m);
  }
  return LANG_ORDER.filter((l) => groups.has(l)).map((lang) => ({
    lang,
    modules: groups.get(lang)!,
  }));
}

export default function LearnIndex() {
  const groups = groupByLanguage();

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

      {groups.map(({ lang, modules }) => {
        const meta = langMeta(lang);
        return (
          <section key={lang} className="mt-10">
            <h2 className="text-xl font-bold text-white">
              {meta.label} courses
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {modules.map((m) => (
                <Link
                  key={m.slug}
                  href={`/learn/${m.slug}`}
                  className={`card group bg-gradient-to-br ${m.gradient} transition-transform hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{m.emoji}</span>
                    <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                      {m.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{m.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                    Open course <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
