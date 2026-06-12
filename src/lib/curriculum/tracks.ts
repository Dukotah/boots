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
  | "kids"
  | "projects";

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
    modules: ["javascript", "strings", "javascript-next", "functional", "oop"],
  },
  {
    id: "js-deep-dives",
    label: "JavaScript Deep Dives",
    blurb:
      "Sharpen specific skills: closures, recursion, regex, async, collections, web APIs, and TypeScript.",
    emoji: "🔬",
    modules: [
      // Gentle peak-5 skills first…
      "json",
      "data-formats",
      "collections",
      "math",
      "typescript",
      "debugging-skills",
      "js-array-methods",
      // …then the classic hard-but-core trio…
      "closures",
      "recursion",
      "regex",
      "error-handling",
      // …then async/runtime…
      "async",
      "web-apis",
      "browser-storage",
      // …then the advanced tail.
      "js-generators",
      "js-proxy-reflect",
      "fp-composition-pipelines",
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
    modules: ["big-o-complexity", "number-systems", "algorithms", "interview", "data-structures", "two-pointers", "bit-manipulation", "dynamic-programming", "sliding-window", "greedy-algorithms", "graphs-js", "heaps-priority-queues-js", "number-theory"],
  },
  {
    id: "career",
    label: "Career & Portfolio",
    blurb: "System design, real projects, and everything that makes you hirable.",
    emoji: "💼",
    modules: ["git-github", "unit-testing-fundamentals", "tdd-practice", "http-and-rest", "http-caching", "system-design", "solid-principles", "portfolio-projects", "behavioral-patterns"],
  },
  {
    id: "projects",
    label: "Portfolio Projects",
    blurb: "Guided capstone builds worth putting on your résumé.",
    emoji: "🛠️",
    modules: [
      // Intro/overview first, then easy builds → hard builds.
      "portfolio-projects",
      "portfolio-python",
      "portfolio-finance",
      "portfolio-text",
      "portfolio-sql",
      "portfolio-js-apps",
      "portfolio-systems",
      "portfolio-validation",
      "portfolio-typescript",
      "portfolio-data-structures",
      "portfolio-algorithms",
      "portfolio-parsers",
      "portfolio-games",
    ],
  },
  {
    id: "python",
    label: "Python",
    blurb: "Learn Python from scratch and put it to work on real data.",
    emoji: "🐍",
    modules: ["python", "python-strings", "python-data", "python-algorithms", "python-comprehensions", "python-oop", "python-statistics", "python-datetime", "python-itertools", "python-type-hints", "python-generators", "python-decorators"],
  },
  {
    id: "python-deep-dives",
    label: "Python Deep Dives",
    blurb: "Level up your Python: strings, comprehensions, classes, and algorithms.",
    emoji: "🧪",
    modules: [
      "python-strings",
      "python-algorithms",
      "python-oop",
      "python-comprehensions",
    ],
  },
  {
    id: "sql",
    label: "SQL & Data",
    blurb: "Query, filter, and join your way through real databases in the browser.",
    emoji: "🗃️",
    modules: ["sql", "sql-aggregations", "sql-joins", "sql-subqueries", "sql-window-functions", "sql-case-and-pivoting", "db-normalization", "db-transactions-acid", "sql-recursive-ctes"],
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
      "ai-build-a-chatbot",
      "ai-email-inbox",
      "ai-for-healthcare",
      "ai-for-legal",
      "ai-for-nonprofits",
      "ai-for-parents",
      "ai-for-real-estate",
      "ai-for-seniors",
      "ai-knowledge-management",
      "ai-meeting-notes",
      // Hardest ML builds close the track (entropy/ID3, model eval).
      "ml-model-evaluation",
      "decision-trees",
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
      "network-security",
      "passwords-auth",
      "web-security",
      "ctf-intro",
      "webcrypto-api",
      "hashing-and-integrity",
    ],
  },
  {
    id: "kids",
    label: "Kids & Classrooms (Ages 9–13)",
    blurb:
      "A gentle, leveled on-ramp for young coders and classrooms — start at Level 1 and climb: logic, mini-games, real games, then staying smart online.",
    emoji: "👾",
    modules: [
      "kids-logic",
      "kids",
      "build-your-first-game",
      "code-quest-2",
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
export function groupByTrack<T extends { slug: string }>(
  modules: T[],
): { track: Track; modules: T[] }[] {
  const bySlug = new Map(modules.map((m) => [m.slug, m]));
  const claimed = new Set<string>();

  const groups: { track: Track; modules: T[] }[] = [];
  for (const track of TRACKS) {
    const resolved = track.modules
      .map((slug) => bySlug.get(slug))
      .filter((m): m is T => Boolean(m));
    for (const m of resolved) claimed.add(m.slug);
    if (resolved.length) groups.push({ track, modules: resolved });
  }

  const leftovers = modules.filter((m) => !claimed.has(m.slug));
  if (leftovers.length) groups.push({ track: FALLBACK, modules: leftovers });

  return groups;
}
