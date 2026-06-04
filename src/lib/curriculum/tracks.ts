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
  | "foundations"
  | "js-deep-dives"
  | "interview"
  | "python"
  | "sql"
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
    id: "foundations",
    label: "JavaScript Foundations",
    blurb: "Start here — variables, functions, objects, and the core building blocks.",
    emoji: "🧱",
    modules: ["javascript", "javascript-next", "strings", "functional", "oop"],
  },
  {
    id: "js-deep-dives",
    label: "JavaScript Deep Dives",
    blurb: "Sharpen specific skills: recursion, regex, error handling, JSON, and math.",
    emoji: "🔬",
    modules: ["recursion", "regex", "error-handling", "json", "math"],
  },
  {
    id: "interview",
    label: "CS & Interview Prep",
    blurb: "Algorithms, data structures, and the patterns that land the offer.",
    emoji: "🎯",
    modules: ["algorithms", "data-structures", "dynamic-programming", "interview"],
  },
  {
    id: "career",
    label: "Career & Portfolio",
    blurb: "System design, real projects, and everything that makes you hirable.",
    emoji: "💼",
    modules: ["system-design", "portfolio-projects", "git-github", "two-pointers", "bit-manipulation"],
  },
  {
    id: "python",
    label: "Python",
    blurb: "Learn Python from scratch and put it to work on real data.",
    emoji: "🐍",
    modules: ["python", "python-data"],
  },
  {
    id: "sql",
    label: "SQL & Data",
    blurb: "Query, filter, and join your way through real databases in the browser.",
    emoji: "🗃️",
    modules: ["sql", "sql-joins"],
  },
  {
    id: "ai",
    label: "AI & Prompt Engineering",
    blurb: "Understand and build with large language models — prompts, apps, agents, and ethics.",
    emoji: "🤖",
    modules: [
      "ai-llms",
      "prompt-engineering",
      "ai-apps",
      "ai-agents",
      "ai-embeddings",
      "ai-ethics",
      "ai-security",
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
