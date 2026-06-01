// Pathways — curated, role-based learning tracks (à la TryHackMe paths). A path
// is an *ordered bundle* of existing modules aimed at an outcome ("become a
// front-end dev"). Modules can belong to several paths; paths are just a view
// over the curriculum, so adding a module to a path is a one-line change.
import { getModule } from "./curriculum";
import type { Module } from "./curriculum/types";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Path = {
  slug: string;
  title: string;
  /** The job/role this path trains for. */
  role: string;
  emoji: string;
  /** Tailwind gradient classes for the path's accent. */
  gradient: string;
  tagline: string;
  description: string;
  difficulty: Difficulty;
  /** Concrete things you'll be able to do after finishing. */
  outcomes: string[];
  /** Ordered module slugs that make up the path. */
  moduleSlugs: string[];
};

export const PATHS: Path[] = [
  {
    slug: "frontend",
    title: "Front-End Developer",
    role: "Front-End Developer",
    emoji: "🎨",
    gradient: "from-pink-500/20 to-rose-500/10",
    tagline: "Master the JavaScript behind every modern user interface.",
    description:
      "Go from zero to confident with the language of the browser. Master modern JavaScript, string and data handling, functional patterns, and the async skills every UI needs to talk to a server.",
    difficulty: "Beginner",
    outcomes: [
      "Write clean, modern JavaScript (ES6+)",
      "Transform data with functional methods like map and filter",
      "Fetch and handle data asynchronously",
      "Work fluently with JSON and text",
    ],
    moduleSlugs: [
      "javascript",
      "javascript-next",
      "strings",
      "functional",
      "closures",
      "async",
      "json",
      "regex",
    ],
  },
  {
    slug: "backend",
    title: "Back-End Developer",
    role: "Back-End Developer",
    emoji: "🛠️",
    gradient: "from-emerald-500/20 to-green-500/10",
    tagline: "Build the APIs, services, and databases that power apps.",
    description:
      "Learn how servers actually work. Build and route HTTP APIs, validate requests, model data with objects, handle errors gracefully, and query a real database with SQL.",
    difficulty: "Intermediate",
    outcomes: [
      "Parse requests, route URLs, and shape JSON responses",
      "Validate input and handle errors like a pro",
      "Model data with object-oriented design",
      "Query and join relational data with SQL",
    ],
    moduleSlugs: [
      "javascript",
      "javascript-next",
      "async",
      "web-apis",
      "error-handling",
      "json",
      "oop",
      "sql",
      "sql-joins",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    role: "AI Engineer",
    emoji: "🤖",
    gradient: "from-violet-500/20 to-fuchsia-500/10",
    tagline: "Build apps powered by large language models.",
    description:
      "Understand how LLMs work and learn to build with them: tokens, prompt engineering, chat message formats, embeddings, and the async + API skills to wire a model into a real product.",
    difficulty: "Intermediate",
    outcomes: [
      "Understand tokens, context windows, and cost",
      "Engineer reliable prompts and few-shot examples",
      "Call and structure LLM API requests",
      "Build the async plumbing for an AI feature",
    ],
    moduleSlugs: ["javascript", "async", "web-apis", "ai-llms"],
  },
  {
    slug: "interview-prep",
    title: "Coding Interview Prep",
    role: "Software Engineer (Interviewing)",
    emoji: "🧩",
    gradient: "from-amber-500/20 to-orange-500/10",
    tagline: "Crack the technical interview with DSA fluency.",
    description:
      "The classic data-structures-and-algorithms gauntlet. Drill recursion, core algorithms, data structures, and dynamic programming, then put it together on real interview-style problems.",
    difficulty: "Advanced",
    outcomes: [
      "Think recursively and analyze complexity",
      "Implement and use core data structures",
      "Solve problems with dynamic programming",
      "Tackle real interview-style challenges",
    ],
    moduleSlugs: [
      "recursion",
      "algorithms",
      "data-structures",
      "collections",
      "bit-manipulation",
      "dynamic-programming",
      "interview",
    ],
  },
  {
    slug: "python",
    title: "Python Developer",
    role: "Python Developer",
    emoji: "🐍",
    gradient: "from-blue-500/20 to-indigo-500/10",
    tagline: "Learn Python from scratch — scripting to data.",
    description:
      "Start with Python fundamentals and grow into working with data. Every lesson runs real Python right in your browser, no install required.",
    difficulty: "Beginner",
    outcomes: [
      "Write Python with confidence",
      "Work with lists, dicts, and comprehensions",
      "Manipulate and analyze data in Python",
    ],
    moduleSlugs: ["python", "python-oop", "python-data"],
  },
  {
    slug: "data-sql",
    title: "Data & SQL",
    role: "Data Analyst",
    emoji: "📊",
    gradient: "from-cyan-500/20 to-sky-500/10",
    tagline: "Query, join, and analyze data like an analyst.",
    description:
      "Speak fluent SQL — the language of data. Filter and aggregate tables, master joins across multiple tables, then bring it home with data work in Python.",
    difficulty: "Beginner",
    outcomes: [
      "Write SELECT queries with filters and aggregates",
      "Join data across multiple tables",
      "Analyze datasets in Python",
    ],
    moduleSlugs: ["sql", "sql-joins", "python-data"],
  },
  {
    slug: "cs-fundamentals",
    title: "CS Fundamentals",
    role: "Computer Science Foundations",
    emoji: "🎓",
    gradient: "from-slate-400/20 to-zinc-500/10",
    tagline: "The timeless foundations under every language.",
    description:
      "Build the mental models that outlast any framework: programming basics, object-oriented and functional thinking, recursion, math for programmers, algorithms, and data structures.",
    difficulty: "Intermediate",
    outcomes: [
      "Reason about objects, functions, and recursion",
      "Apply math and logic to code",
      "Understand core algorithms and data structures",
    ],
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

/** Resolve a path's module slugs to Module objects, preserving order. */
export function pathModules(path: Path): Module[] {
  return path.moduleSlugs
    .map((slug) => getModule(slug))
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
