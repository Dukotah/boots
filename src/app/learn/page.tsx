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
const LANG_ORDER: LessonLanguage[] = ["html", "js", "py", "sql"];

// A course with no code (e.g. Digital Safety) shouldn't sit under a language.
function isQuizOnly(m: Module): boolean {
  return m.lessons.length > 0 && m.lessons.every((l) => l.kind === "quiz");
}

function sections(): { label: string; modules: Module[] }[] {
  const byLang = new Map<LessonLanguage, Module[]>();
  const nonCode: Module[] = [];
  for (const m of MODULES) {
    if (isQuizOnly(m)) {
      nonCode.push(m);
      continue;
    }
    const lang = m.language ?? "js";
    if (!byLang.has(lang)) byLang.set(lang, []);
    byLang.get(lang)!.push(m);
  }
  const out = LANG_ORDER.filter((l) => byLang.has(l)).map((l) => ({
    label: `${langMeta(l).label} courses`,
    modules: byLang.get(l)!,
  }));
  if (nonCode.length) {
    out.push({ label: "Digital safety & life skills", modules: nonCode });
  }
  return out;
}

export default function LearnIndex() {
  const groups = sections();

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

      {groups.map(({ label, modules }) => {
        return (
          <section key={label} className="mt-10">
            <h2 className="text-xl font-bold text-white">{label}</h2>
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
