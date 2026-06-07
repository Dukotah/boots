// Learning tracks — the tighter grouping the catalog renders by.
//
// Grouping the catalog purely by language dumped 14+ JS-bucket courses into one
// flat wall of cards (and quietly filed the AI course under "JavaScript" because
// it has no `language`). Tracks regroup the same modules into smaller, themed
// clusters that read tighter and leave room for new modules + the learning pass.
//
// This is the ONE place the taxonomy lives. To slot a course into a track, add
// its slug to that track's `modules` (order here = order on the page). Any module
// not listed in a track still shows up — `groupByTrack` collects the leftovers
// into a fallback group so nothing can silently vanish from the catalog.
import type { Module } from "./types";

export type TrackId =
  | "getting-started"
  | "foundations"
  | "js-deep-dives"
  | "frameworks"
  | "backend"
  | "interview"
  | "python"
  | "python-deep-dives"
  | "sql"
  | "sql-deep-dives"
  | "ai"
  | "cybersecurity"
  | "career"
  | "kids";

export type Track = {
  id: TrackId;
  /** Section heading on the catalog. */
  label: string;
  /** One-line description under the heading. */
  blurb: string;
  /** Small accent glyph shown beside the heading. */
  emoji: string;
  /** Ordered module slugs that belong to this track. */
  modules: string[];
};

// Order here controls how the catalog reads top-to-bottom: a gentle difficulty
// ramp (fundamentals → deep dives → interview prep) followed by the other langs.
export const TRACKS: Track[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    blurb: "Brand new to code? Begin here with a gentle intro and the building blocks of the web.",
    emoji: "🚀",
    modules: ["beginner", "html", "css"],
  },
  {
    id: "foundations",
    label: "JavaScript Foundations",
    blurb: "Start here — variables, functions, objects, and the core building blocks.",
    emoji: "🧱",
    modules: ["javascript", "javascript-next", "strings", "functional", "oop"],
  },
  {
    id: "js-deep-dives",
    label: "JavaScript Deep Dives",
    blurb:
      "Sharpen specific skills: closures, recursion, regex, async, collections, web APIs, and TypeScript.",
    emoji: "🔬",
    modules: [
      "closures",
      "recursion",
      "regex",
      "error-handling",
      "json",
      "data-formats",
      "collections",
      "async",
      "web-apis",
      "math",
      "typescript",
      "js-array-methods",
      "debugging-skills",
      "js-generators",
      "js-proxy-reflect",
      "fp-composition-pipelines",
      "browser-storage",
      "ts-generics-advanced",
      "ts-mapped-conditional-types",
    ],
  },
  {
    id: "frameworks",
    label: "Frontend Frameworks",
    blurb: "Build interactive UIs with React — components, props, state, and hooks.",
    emoji: "⚛️",
    modules: ["react"],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Server-side JavaScript: Node.js, Express, routing, middleware, and REST APIs.",
    emoji: "🖥️",
    modules: ["node"],
  },
  {
    id: "interview",
    label: "CS & Interview Prep",
    blurb: "Algorithms, data structures, and the patterns that land the offer.",
    emoji: "🎯",
    modules: ["algorithms", "data-structures", "dynamic-programming", "interview", "sliding-window", "greedy-algorithms", "graphs-js", "heaps-priority-queues-js", "big-o-complexity", "number-systems", "number-theory"],
  },
  {
    id: "career",
    label: "Career & Portfolio",
    blurb: "System design, real projects, and everything that makes you hirable.",
    emoji: "💼",
    modules: ["system-design", "portfolio-projects", "git-github", "two-pointers", "bit-manipulation", "http-and-rest", "http-caching", "unit-testing-fundamentals", "tdd-practice", "solid-principles", "behavioral-patterns"],
  },
  {
    id: "python",
    label: "Python",
    blurb: "Learn Python from scratch and put it to work on real data.",
    emoji: "🐍",
    modules: ["python", "python-data", "python-strings", "python-comprehensions", "python-oop", "python-algorithms", "python-decorators", "python-generators", "python-type-hints", "python-itertools", "python-datetime", "python-statistics"],
  },
  {
    id: "python-deep-dives",
    label: "Python Deep Dives",
    blurb: "Level up your Python: strings, comprehensions, classes, and algorithms.",
    emoji: "🧪",
    modules: [
      "python-strings",
      "python-comprehensions",
      "python-oop",
      "python-algorithms",
    ],
  },
  {
    id: "sql",
    label: "SQL & Data",
    blurb: "Query, filter, and join your way through real databases in the browser.",
    emoji: "🗃️",
    modules: ["sql", "sql-joins", "sql-aggregations", "sql-subqueries", "sql-window-functions", "sql-recursive-ctes", "sql-case-and-pivoting", "db-normalization", "db-transactions-acid"],
  },
  {
    id: "sql-deep-dives",
    label: "SQL Deep Dives",
    blurb: "Go further with SQL: aggregations, grouping, and subqueries.",
    emoji: "📊",
    modules: ["sql-aggregations", "sql-subqueries"],
  },
  {
    id: "ai",
    label: "AI: Use It & Build With It",
    blurb: "From your first chatbot conversation to building and shipping software with AI — for total beginners through builders.",
    emoji: "🤖",
    modules: [
      "ai-for-everyone",
      "ai-power-user",
      "ai-image-generation",
      "ai-video-and-voice",
      "vibe-coding",
      "ai-integrations",
      "ai-custom-assistants",
      "ai-for-business",
      "ai-llms",
      "prompt-engineering",
      "ai-apps",
      "ai-agents",
      "ai-embeddings",
      "ai-ethics",
      "ml-model-evaluation",
      "decision-trees",
      "ai-data-analysis",
      "ai-for-developers",
      "ai-for-job-search",
      "ai-for-marketing",
      "ai-for-students",
      "ai-for-teachers",
      "ai-for-writers",
      "ai-local-models",
      "ai-productivity",
      "ai-prompt-patterns",
      "ai-research-assistant",
      "ai-safety-and-security",
      "ai-spreadsheets",
      "ai-staying-current",
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    blurb: "Think like a defender: safety, the hacker mindset, auth, web & network security, and CTF.",
    emoji: "🛡️",
    modules: [
      "digital-safety",
      "hacker-mindset",
      "passwords-auth",
      "web-security",
      "network-security",
      "ctf-intro",
      "webcrypto-api",
      "hashing-and-integrity",
    ],
  },
  {
    id: "kids",
    label: "Kids & Teens",
    blurb: "A playful on-ramp for young coders — logic, game-building, and staying smart online.",
    emoji: "👾",
    modules: [
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

export type TrackGroup = { track: Track; modules: Module[] };

// A pseudo-track for any module not assigned above, so newly added courses are
// always visible even before someone files them into a track.
const FALLBACK: Track = {
  id: "foundations", // unused for rendering; only label/blurb/emoji are read
  label: "More courses",
  blurb: "Fresh courses that haven't been sorted into a track yet.",
  emoji: "✨",
  modules: [],
};

/**
 * Resolve the global module list into ordered track groups. Slugs that don't
 * resolve are skipped; modules that belong to no track are appended under
 * "More courses" so the catalog can never silently drop a course.
 */
export function groupByTrack(modules: Module[]): TrackGroup[] {
  const bySlug = new Map(modules.map((m) => [m.slug, m]));
  const claimed = new Set<string>();

  const groups: TrackGroup[] = [];
  for (const track of TRACKS) {
    const resolved = track.modules
      .map((slug) => bySlug.get(slug))
      .filter((m): m is Module => Boolean(m));
    for (const m of resolved) claimed.add(m.slug);
    if (resolved.length) groups.push({ track, modules: resolved });
  }

  const leftovers = modules.filter((m) => !claimed.has(m.slug));
  if (leftovers.length) groups.push({ track: FALLBACK, modules: leftovers });

  return groups;
}
