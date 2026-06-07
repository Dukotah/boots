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
    slug: "work-with-ai",
    title: "Work with AI",
    role: "Confident AI User & Builder",
    tagline: "From 'what even is AI?' to building and shipping with it.",
    description:
      "The complete journey for the AI era — no experience needed. Start by confidently using tools like Claude, Gemini, and ChatGPT in everyday life, grow into a true power user, then learn to build and ship real software by directing AI (vibe coding). Ends with the builder's toolkit: how LLMs work, AI apps, agents, retrieval, and using it all responsibly.",
    emoji: "✨",
    gradient: "from-sky-500/20 to-violet-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Use Claude, Gemini, and ChatGPT confidently and safely",
      "Get genuinely useful answers and spot when AI is wrong",
      "Run practical AI workflows for work, research, and learning",
      "Build and ship real software by directing AI (vibe coding)",
      "Understand the builder's stack: prompts, apps, agents, and ethics",
    ],
    keywords: [
      "learn to use AI",
      "how to use ChatGPT and Claude",
      "AI for beginners",
      "vibe coding",
      "build apps with AI",
      "AI course for non-technical people",
    ],
    moduleSlugs: [
      "ai-for-everyone",
      "ai-power-user",
      "ai-image-generation",
      "prompt-engineering",
      "vibe-coding",
      "ai-integrations",
      "ai-for-business",
      "ai-llms",
      "ai-apps",
      "ai-agents",
      "ai-embeddings",
      "ai-ethics",
    ],
  },
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
      "fp-composition-pipelines",
      "js-array-methods",
      "oop",
      "javascript-next",
      "js-generators",
      "js-proxy-reflect",
      "regex",
      "json",
      "browser-storage",
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
      "python-decorators",
      "sql",
      "sql-joins",
      "sql-window-functions",
      "sql-recursive-ctes",
      "db-transactions-acid",
      "http-and-rest",
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
    moduleSlugs: [
      "python",
      "python-data",
      "python-statistics",
      "sql",
      "sql-joins",
      "sql-window-functions",
      "sql-case-and-pivoting",
      "sql-recursive-ctes",
      "db-normalization",
      "db-transactions-acid",
      "math",
      "algorithms",
    ],
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
    moduleSlugs: [
      "recursion",
      "big-o-complexity",
      "algorithms",
      "data-structures",
      "sliding-window",
      "greedy-algorithms",
      "graphs-js",
      "heaps-priority-queues-js",
      "dynamic-programming",
      "interview",
    ],
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
    moduleSlugs: ["javascript", "async", "web-apis", "ai-llms", "ml-model-evaluation", "decision-trees"],
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
      "python-type-hints",
      "python-oop",
      "python-decorators",
      "python-generators",
      "python-itertools",
      "python-datetime",
      "python-algorithms",
      "python-data",
      "python-statistics",
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
      "fp-composition-pipelines",
      "closures",
      "collections",
      "recursion",
      "number-systems",
      "number-theory",
      "math",
      "big-o-complexity",
      "algorithms",
      "data-structures",
      "debugging-skills",
    ],
  },
  {
    slug: "ai-prompt-engineering",
    title: "AI & Prompt Engineering",
    role: "AI Developer",
    tagline: "Go from prompting to shipping AI features.",
    description:
      "Master the full AI builder stack: how LLMs work, prompt engineering, building real AI-powered apps, agents and tool use, embeddings and retrieval, and the ethics of doing it responsibly.",
    emoji: "🤖",
    gradient: "from-fuchsia-500/20 to-violet-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Write reliable prompts with roles, delimiters, and formats",
      "Build the plumbing of an AI app: parsing, retries, streaming, caching",
      "Wire up tool-using agents",
      "Use embeddings for semantic search and retrieval",
      "Apply AI ethics: bias, hallucination, privacy, and disclosure",
    ],
    keywords: [
      "ai engineering path",
      "learn prompt engineering",
      "become an ai developer",
      "build ai apps",
    ],
    moduleSlugs: [
      "ai-llms",
      "prompt-engineering",
      "ai-apps",
      "ai-agents",
      "ai-embeddings",
      "ai-ethics",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    role: "Security Practitioner",
    tagline: "Think like an attacker, build like a defender.",
    description:
      "Start with everyday digital safety and grow into real security skills: the ethical-hacker mindset, passwords and authentication, web and network security, and your first Capture The Flag challenges.",
    emoji: "🛡️",
    gradient: "from-slate-500/20 to-emerald-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Spot scams, phishing, and social-engineering tricks",
      "Understand the ethical-hacker mindset and rules of engagement",
      "Hash passwords, use MFA, and reason about encryption",
      "Defend against XSS and SQL injection",
      "Solve beginner CTF crypto and decoding challenges",
    ],
    keywords: [
      "learn cybersecurity",
      "cybersecurity path",
      "ethical hacking course",
      "web security basics",
    ],
    moduleSlugs: [
      "digital-safety",
      "hacker-mindset",
      "passwords-auth",
      "hashing-and-integrity",
      "web-security",
      "network-security",
      "webcrypto-api",
      "ctf-intro",
    ],
  },
  {
    slug: "fullstack",
    title: "Full Stack Developer",
    role: "Full Stack Developer",
    tagline: "Build complete apps — front to back.",
    description:
      "Master the whole stack: JavaScript on the frontend, Python and SQL on the backend, plus Git for version control, system design for scale, and portfolio projects to prove it.",
    emoji: "🥞",
    gradient: "from-violet-500/20 to-fuchsia-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Write modern JavaScript and TypeScript",
      "Build Python backends with SQL databases",
      "Version-control everything with Git",
      "Design systems that scale",
      "Ship real portfolio projects",
    ],
    keywords: ["full stack developer", "become a full stack developer", "web development path"],
    moduleSlugs: [
      "javascript",
      "typescript",
      "ts-generics-advanced",
      "ts-mapped-conditional-types",
      "python",
      "sql",
      "sql-joins",
      "http-and-rest",
      "http-caching",
      "git-github",
      "unit-testing-fundamentals",
      "solid-principles",
      "system-design",
      "portfolio-projects",
    ],
  },
  {
    slug: "system-design",
    title: "System Design",
    role: "Senior / Staff Engineer",
    tagline: "Design systems that handle millions of users.",
    description:
      "The interview round every senior engineer faces. Learn to design scalable, reliable systems — databases, caching, APIs, and the architectural patterns used at top companies.",
    emoji: "🏗️",
    gradient: "from-sky-400/20 to-blue-500/10",
    difficulty: "Advanced",
    outcomes: [
      "Design URL shorteners, social feeds, and chat systems",
      "Choose between SQL and NoSQL for any use case",
      "Implement caching strategies including LRU",
      "Design REST APIs that other engineers love",
      "Scale services horizontally with load balancers",
    ],
    keywords: ["system design interview", "system design path", "senior engineer prep"],
    moduleSlugs: [
      "algorithms",
      "data-structures",
      "db-normalization",
      "http-caching",
      "behavioral-patterns",
      "interview",
      "system-design",
      "portfolio-projects",
    ],
  },
  {
    slug: "job-ready",
    title: "Get Hired as a Developer",
    role: "Software Engineer",
    tagline: "Everything you need to land your first dev job.",
    description:
      "The complete job-prep path: foundations, algorithms, data structures, interview prep, system design, and a portfolio of real projects. Every employer wants these skills.",
    emoji: "🎯",
    gradient: "from-green-400/20 to-emerald-500/10",
    difficulty: "Intermediate",
    outcomes: [
      "Pass coding screens with algorithms and data structures",
      "Ace system design rounds at senior levels",
      "Build a portfolio with real, auto-graded projects",
      "Write clean JavaScript, Python, and SQL",
      "Version-control and collaborate with Git",
    ],
    keywords: ["get a programming job", "land developer job", "job ready developer", "coding bootcamp alternative"],
    moduleSlugs: [
      "javascript",
      "python",
      "sql",
      "algorithms",
      "data-structures",
      "debugging-skills",
      "unit-testing-fundamentals",
      "tdd-practice",
      "interview",
      "system-design",
      "portfolio-projects",
      "git-github",
    ],
  },
  {
    slug: "kids-and-teens",
    title: "Kids & Teens",
    role: "Young Coder",
    tagline: "Learn to code — and stay smart online — the fun way.",
    description:
      "A playful path for young coders: start with simple logic, level up through the Code Quest game adventures, build your first game, then learn how the internet works and how to use AI and the web safely.",
    emoji: "👾",
    gradient: "from-pink-400/20 to-purple-500/10",
    difficulty: "Beginner",
    outcomes: [
      "Write your first real code: decisions, loops, and comparisons",
      "Build game logic — dice, scoring, hit detection, and lives",
      "Understand how the internet and websites actually work",
      "Use AI tools safely and think before you post",
      "Be a kind, smart digital citizen",
    ],
    keywords: [
      "coding for kids",
      "coding for teens",
      "kids learn to code",
      "fun coding path",
    ],
    moduleSlugs: [
      "kids-logic",
      "kids",
      "code-quest-2",
      "build-your-first-game",
      "internet-for-kids",
      "ai-safety-kids",
      "digital-citizenship",
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

// Words to drop when condensing a module title into a short skill chip.
const SKILL_STOPWORDS = new Set([
  "foundations",
  "fundamentals",
  "basics",
  "intro",
  "introduction",
  "the",
  "and",
  "with",
  "for",
  "to",
  "of",
  "a",
  "&",
]);

/**
 * Short, deduped skill chips for a path (e.g. ["JavaScript", "Strings", "OOP"]),
 * derived from its module titles — keeps the first meaningful token of each.
 */
export function pathSkillTags(path: Path, max = 8): string[] {
  const tags: string[] = [];
  const seen = new Set<string>();
  for (const m of pathModules(path)) {
    // First token of the title that isn't a filler word.
    const token =
      m.title
        .split(/[\s&]+/)
        .find((w) => w && !SKILL_STOPWORDS.has(w.toLowerCase())) ?? m.title;
    const key = token.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push(token);
    if (tags.length >= max) break;
  }
  return tags;
}
