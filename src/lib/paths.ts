// Career Paths group existing curriculum modules into ordered tracks, so a
// learner has a clear "what next?" and we capture intent keywords like
// "become a frontend developer". Paths are pure data over module slugs — no
// content duplication; the modules live in lib/curriculum.
import { getModule, type Module } from "./curriculum";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Path = {
  slug: string;
  title: string;
  /** The job/role this path trains for. */
  role: string;
  /** SEO/marketing tagline shown under the title. */
  tagline: string;
  description: string;
  emoji: string;
  gradient: string;
  difficulty: Difficulty;
  /** Concrete things you'll be able to do after finishing. */
  outcomes: string[];
  keywords: string[];
  /** Ordered module slugs that make up the track. */
  moduleSlugs: string[];
};

export const PATHS: Path[] = [
  {
    slug: "frontend",
    title: "Frontend Developer",
    role: "Front-End Developer",
    tagline: "Master the language of the web.",
    description:
      "Become a frontend developer: master JavaScript and the patterns behind modern UI — strings, functions, objects, functional style, and OOP.",
    emoji: "🎨",
    gradient: "from-sky-400/20 to-indigo-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Write clean, modern JavaScript (ES6+)",
      "Transform data with functional methods like map and filter",
      "Model UI state with objects and OOP",
      "Work fluently with JSON and text",
    ],
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
    role: "Back-End Developer",
    tagline: "Build the engine behind the app.",
    description:
      "Become a backend developer: learn Python, query databases with SQL, and master the algorithms and data structures that power real systems.",
    emoji: "⚙️",
    gradient: "from-emerald-400/20 to-teal-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Write Python for real server-side work",
      "Query and join relational data with SQL",
      "Apply core algorithms and data structures",
      "Reason about performance and complexity",
    ],
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
    role: "Data Analyst",
    tagline: "Turn raw data into answers.",
    description:
      "Learn data fundamentals: Python for analysis, SQL for querying, and the math and algorithms that turn raw tables into insight.",
    emoji: "📊",
    gradient: "from-amber-400/20 to-orange-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Write SELECT queries with filters and aggregates",
      "Join data across multiple tables",
      "Analyze datasets in Python",
      "Apply math and algorithms to real data",
    ],
    keywords: ["learn data analysis", "learn sql", "data path"],
    moduleSlugs: ["python", "python-data", "sql", "sql-joins", "math", "algorithms"],
  },
  {
    slug: "interview-prep",
    title: "Coding Interview Prep",
    role: "Software Engineer (Interviewing)",
    tagline: "Walk into the interview ready.",
    description:
      "Prepare for technical interviews: recursion, classic algorithms, data structures, dynamic programming, and the problems that actually get asked.",
    emoji: "🎯",
    gradient: "from-violet-400/20 to-fuchsia-500/10",
    difficulty: "Advanced",
    outcomes: [
      "Think recursively and analyze complexity",
      "Implement and use core data structures",
      "Solve problems with dynamic programming",
      "Tackle real interview-style challenges",
    ],
    keywords: ["coding interview prep", "technical interview practice", "leetcode path"],
    moduleSlugs: ["recursion", "algorithms", "data-structures", "dynamic-programming", "interview"],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    role: "AI Engineer",
    tagline: "Build apps powered by large language models.",
    description:
      "Understand how LLMs work and learn to build with them: tokens, prompt engineering, chat message formats, embeddings, and the async + API skills to wire a model into a real product.",
    emoji: "🤖",
    gradient: "from-violet-500/20 to-fuchsia-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Understand tokens, context windows, and cost",
      "Engineer reliable prompts and few-shot examples",
      "Call and structure LLM API requests",
      "Build the async plumbing for an AI feature",
    ],
    keywords: ["become an ai engineer", "learn llms", "ai developer path"],
    moduleSlugs: ["javascript", "async", "web-apis", "ai-llms"],
  },
  {
    slug: "python",
    title: "Python Developer",
    role: "Python Developer",
    tagline: "Learn Python from scratch — scripting to data.",
    description:
      "Start with Python fundamentals and grow into working with data. Every lesson runs real Python right in your browser, no install required.",
    emoji: "🐍",
    gradient: "from-blue-500/20 to-indigo-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Write Python with confidence",
      "Work with lists, dicts, and comprehensions",
      "Model problems with classes and OOP",
      "Manipulate and analyze data in Python",
    ],
    keywords: ["learn python", "python developer path", "become a python developer"],
    moduleSlugs: [
      "python",
      "python-strings",
      "python-comprehensions",
      "python-oop",
      "python-algorithms",
      "python-data",
    ],
  },
  {
    slug: "cs-fundamentals",
    title: "CS Fundamentals",
    role: "Computer Science Foundations",
    tagline: "The timeless foundations under every language.",
    description:
      "Build the mental models that outlast any framework: programming basics, object-oriented and functional thinking, recursion, math for programmers, algorithms, and data structures.",
    emoji: "🎓",
    gradient: "from-slate-400/20 to-zinc-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Reason about objects, functions, and recursion",
      "Apply math and logic to code",
      "Understand core algorithms and data structures",
    ],
    keywords: ["computer science fundamentals", "cs basics", "learn programming fundamentals"],
    moduleSlugs: [
      "javascript",
      "oop",
      "functional",
      "closures",
      "collections",
      "recursion",
      "math",
      "algorithms",
      "data-structures",
    ],
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

export function pathStats(path: Path): {
  modules: number;
  lessons: number;
  xp: number;
} {
  const modules = pathModules(path);
  const lessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const xp = modules.reduce(
    (s, m) => s + m.lessons.reduce((t, l) => t + l.xp, 0),
    0,
  );
  return { modules: modules.length, lessons, xp };
}

/** Which paths include a given module (for cross-linking from a course page). */
export function pathsForModule(moduleSlug: string): Path[] {
  return PATHS.filter((p) => p.moduleSlugs.includes(moduleSlug));
}

/** Every "moduleSlug/lessonSlug" id in a path, in order. */
export function pathLessonIds(path: Path): string[] {
  return pathModules(path).flatMap((m) =>
    m.lessons.map((l) => `${m.slug}/${l.slug}`),
  );
}

export type PathProgress = {
  done: number;
  total: number;
  pct: number;
  complete: boolean;
};

/** A path's completion given the learner's set of completed lesson ids. */
export function pathProgress(path: Path, completed: string[]): PathProgress {
  const ids = pathLessonIds(path);
  const completedSet = new Set(completed);
  const done = ids.filter((id) => completedSet.has(id)).length;
  const total = ids.length;
  return {
    done,
    total,
    pct: total ? Math.round((done / total) * 100) : 0,
    complete: total > 0 && done === total,
  };
}

/** Paths the learner has fully finished (earned a certificate for). */
export function completedPaths(completed: string[]): Path[] {
  return PATHS.filter((p) => pathProgress(p, completed).complete);
}
