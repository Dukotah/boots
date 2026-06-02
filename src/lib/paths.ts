// Career Paths group existing curriculum modules into ordered tracks, so a
// learner has a clear "what next?" and we capture intent keywords like
// "become a frontend developer". Paths are pure data over module slugs — no
// content duplication; the modules live in lib/curriculum.
import { getModule, type Module } from "./curriculum";

export type Path = {
  slug: string;
  title: string;
  /** SEO/marketing tagline shown under the title. */
  tagline: string;
  description: string;
  emoji: string;
  gradient: string;
  keywords: string[];
  /** Ordered module slugs that make up the track. */
  moduleSlugs: string[];
};

export const PATHS: Path[] = [
  {
    slug: "frontend",
    title: "Frontend Developer",
    tagline: "Master the language of the web.",
    description:
      "Become a frontend developer: master JavaScript and the patterns behind modern UI — strings, functions, objects, functional style, and OOP.",
    emoji: "🎨",
    gradient: "from-sky-400/20 to-indigo-500/10",
    keywords: ["become a frontend developer", "learn frontend", "javascript developer path"],
    moduleSlugs: [
      "javascript",
      "strings",
      "functional",
      "oop",
      "javascript-next",
      "regex",
      "json",
      "error-handling",
    ],
  },
  {
    slug: "backend",
    title: "Backend Developer",
    tagline: "Build the engine behind the app.",
    description:
      "Become a backend developer: learn Python, query databases with SQL, and master the algorithms and data structures that power real systems.",
    emoji: "⚙️",
    gradient: "from-emerald-400/20 to-teal-500/10",
    keywords: ["become a backend developer", "learn backend", "python developer path"],
    moduleSlugs: [
      "python",
      "python-data",
      "sql",
      "sql-joins",
      "algorithms",
      "data-structures",
    ],
  },
  {
    slug: "data",
    title: "Data & SQL",
    tagline: "Turn raw data into answers.",
    description:
      "Learn data fundamentals: Python for analysis, SQL for querying, and the math and algorithms that turn raw tables into insight.",
    emoji: "📊",
    gradient: "from-amber-400/20 to-orange-500/10",
    keywords: ["learn data analysis", "learn sql", "data path"],
    moduleSlugs: ["python", "python-data", "sql", "sql-joins", "math", "algorithms"],
  },
  {
    slug: "interview-prep",
    title: "Coding Interview Prep",
    tagline: "Walk into the interview ready.",
    description:
      "Prepare for technical interviews: recursion, classic algorithms, data structures, dynamic programming, and the problems that actually get asked.",
    emoji: "🎯",
    gradient: "from-violet-400/20 to-fuchsia-500/10",
    keywords: ["coding interview prep", "technical interview practice", "leetcode path"],
    moduleSlugs: ["recursion", "algorithms", "data-structures", "dynamic-programming", "interview"],
  },
];

export function getPath(slug: string): Path | undefined {
  return PATHS.find((p) => p.slug === slug);
}

/** Resolve a path's module slugs to Module objects (skips any that don't exist). */
export function pathModules(path: Path): Module[] {
  return path.moduleSlugs
    .map((s) => getModule(s))
    .filter((m): m is Module => Boolean(m));
}
