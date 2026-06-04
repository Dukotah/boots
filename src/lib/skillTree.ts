// Skill tree definition — each node maps to a curriculum module.
// `requires` lists slugs that must be completed before this node unlocks.
// The tree is rendered as an RPG talent tree on /skill-tree.

export type SkillNode = {
  id: string;          // module slug
  label: string;
  emoji: string;
  tier: number;        // vertical row (0 = start)
  col: number;         // horizontal column within the tier
  requires: string[];  // prerequisite node ids
  track: string;       // color-coded track family
  lessonCount: number;
};

export type SkillEdge = { from: string; to: string };

// Layout: tiers go top→bottom. Cols spread left→right within a tier.
// track values map to CSS accent colors defined in the component.
export const SKILL_NODES: SkillNode[] = [
  // ── Tier 0: Starting nodes ───────────────────────────────────────────
  { id: "javascript",         label: "JavaScript",        emoji: "🟨", tier: 0, col: 2, requires: [],              track: "js",    lessonCount: 10 },
  { id: "python",             label: "Python",            emoji: "🐍", tier: 0, col: 6, requires: [],              track: "py",    lessonCount: 10 },
  { id: "kids-logic",         label: "Logic",             emoji: "🧩", tier: 0, col: 0, requires: [],              track: "kids",  lessonCount: 5  },

  // ── Tier 1 ────────────────────────────────────────────────────────────
  { id: "strings",            label: "Strings",           emoji: "📝", tier: 1, col: 1, requires: ["javascript"],  track: "js",    lessonCount: 8  },
  { id: "functional",         label: "Functional JS",     emoji: "⚡", tier: 1, col: 2, requires: ["javascript"],  track: "js",    lessonCount: 8  },
  { id: "oop",                label: "OOP",               emoji: "🏗️", tier: 1, col: 3, requires: ["javascript"],  track: "js",    lessonCount: 8  },
  { id: "javascript-next",    label: "ES2024+",           emoji: "🚀", tier: 1, col: 4, requires: ["javascript"],  track: "js",    lessonCount: 6  },
  { id: "python-strings",     label: "Python Strings",    emoji: "📜", tier: 1, col: 5, requires: ["python"],      track: "py",    lessonCount: 6  },
  { id: "python-data",        label: "Python Data",       emoji: "📊", tier: 1, col: 6, requires: ["python"],      track: "py",    lessonCount: 8  },
  { id: "python-oop",         label: "Python OOP",        emoji: "🐍", tier: 1, col: 7, requires: ["python"],      track: "py",    lessonCount: 6  },
  { id: "kids",               label: "Kids JS",           emoji: "👾", tier: 1, col: 0, requires: ["kids-logic"],  track: "kids",  lessonCount: 8  },

  // ── Tier 2 ────────────────────────────────────────────────────────────
  { id: "closures",           label: "Closures",          emoji: "🔒", tier: 2, col: 1, requires: ["functional"],  track: "js",    lessonCount: 6  },
  { id: "recursion",          label: "Recursion",         emoji: "🔁", tier: 2, col: 2, requires: ["functional","oop"], track: "cs", lessonCount: 8 },
  { id: "regex",              label: "RegExp",            emoji: "🔍", tier: 2, col: 3, requires: ["strings"],     track: "js",    lessonCount: 6  },
  { id: "error-handling",     label: "Error Handling",    emoji: "🛡️", tier: 2, col: 4, requires: ["javascript-next"], track: "js", lessonCount: 5 },
  { id: "json",               label: "JSON",              emoji: "📦", tier: 2, col: 5, requires: ["javascript-next"], track: "js", lessonCount: 5 },
  { id: "typescript",         label: "TypeScript",        emoji: "💙", tier: 2, col: 6, requires: ["oop","javascript-next"], track: "ts", lessonCount: 8 },
  { id: "sql",                label: "SQL",               emoji: "🗃️", tier: 2, col: 7, requires: ["python-data"], track: "data",  lessonCount: 10 },
  { id: "python-comprehensions", label: "Comprehensions", emoji: "🧠", tier: 2, col: 8, requires: ["python-oop"], track: "py",    lessonCount: 5  },

  // ── Tier 3 ────────────────────────────────────────────────────────────
  { id: "async",              label: "Async JS",          emoji: "⏳", tier: 3, col: 1, requires: ["closures"],    track: "js",    lessonCount: 8  },
  { id: "collections",        label: "Collections",       emoji: "📚", tier: 3, col: 2, requires: ["recursion"],   track: "cs",    lessonCount: 6  },
  { id: "math",               label: "Math",              emoji: "🔢", tier: 3, col: 3, requires: ["recursion"],   track: "cs",    lessonCount: 6  },
  { id: "sql-joins",          label: "SQL Joins",         emoji: "🔗", tier: 3, col: 7, requires: ["sql"],         track: "data",  lessonCount: 8  },
  { id: "python-algorithms",  label: "Python Algo",       emoji: "⚙️", tier: 3, col: 8, requires: ["python-comprehensions"], track: "py", lessonCount: 6 },
  { id: "web-apis",           label: "Web APIs",          emoji: "🌐", tier: 3, col: 5, requires: ["async","json"], track: "js",   lessonCount: 6  },

  // ── Tier 4 ────────────────────────────────────────────────────────────
  { id: "algorithms",         label: "Algorithms",        emoji: "🎯", tier: 4, col: 2, requires: ["collections","math"], track: "cs", lessonCount: 10 },
  { id: "data-structures",    label: "Data Structures",   emoji: "🌲", tier: 4, col: 3, requires: ["collections"], track: "cs",   lessonCount: 8  },
  { id: "ai-llms",            label: "AI & LLMs",         emoji: "🤖", tier: 4, col: 5, requires: ["web-apis"],    track: "ai",    lessonCount: 8  },
  { id: "web-security",       label: "Web Security",      emoji: "🔐", tier: 4, col: 6, requires: ["web-apis"],    track: "sec",   lessonCount: 8  },
  { id: "git-github",         label: "Git & GitHub",      emoji: "🐙", tier: 4, col: 7, requires: ["javascript"],  track: "career",lessonCount: 8  },

  // ── Tier 5 ────────────────────────────────────────────────────────────
  { id: "dynamic-programming",label: "Dynamic Prog.",     emoji: "💡", tier: 5, col: 1, requires: ["algorithms"],  track: "cs",    lessonCount: 8  },
  { id: "two-pointers",       label: "Two Pointers",      emoji: "👆", tier: 5, col: 2, requires: ["algorithms"],  track: "cs",    lessonCount: 6  },
  { id: "interview",          label: "Interview Prep",    emoji: "🎤", tier: 5, col: 3, requires: ["data-structures","algorithms"], track: "career", lessonCount: 8 },
  { id: "prompt-engineering", label: "Prompt Eng.",       emoji: "✍️", tier: 5, col: 5, requires: ["ai-llms"],     track: "ai",    lessonCount: 8  },
  { id: "network-security",   label: "Network Security",  emoji: "🕸️", tier: 5, col: 6, requires: ["web-security"], track: "sec",  lessonCount: 6  },

  // ── Tier 6 ────────────────────────────────────────────────────────────
  { id: "bit-manipulation",   label: "Bit Manipulation",  emoji: "⚙️", tier: 6, col: 1, requires: ["two-pointers"], track: "cs",   lessonCount: 6  },
  { id: "system-design",      label: "System Design",     emoji: "🏗️", tier: 6, col: 3, requires: ["interview"],   track: "career",lessonCount: 6  },
  { id: "ai-apps",            label: "AI Apps",           emoji: "📱", tier: 6, col: 5, requires: ["prompt-engineering"], track: "ai", lessonCount: 8 },
  { id: "ctf-intro",          label: "CTF Intro",         emoji: "🚩", tier: 6, col: 6, requires: ["network-security"], track: "sec", lessonCount: 6 },

  // ── Tier 7: Capstones ─────────────────────────────────────────────────
  { id: "portfolio-projects", label: "Portfolio Projects",emoji: "🏆", tier: 7, col: 3, requires: ["system-design","git-github"], track: "career", lessonCount: 5 },
  { id: "ai-agents",          label: "AI Agents",         emoji: "🕵️", tier: 7, col: 5, requires: ["ai-apps"],     track: "ai",    lessonCount: 6  },
  { id: "ai-embeddings",      label: "Embeddings",        emoji: "🔮", tier: 7, col: 6, requires: ["ai-agents"],   track: "ai",    lessonCount: 6  },
];

export const SKILL_EDGES: SkillEdge[] = SKILL_NODES.flatMap((node) =>
  node.requires.map((req) => ({ from: req, to: node.id }))
);

export const TRACK_COLORS: Record<string, string> = {
  js:     "#f7df1e",
  ts:     "#3178c6",
  py:     "#4b8bbe",
  cs:     "#a855f7",
  data:   "#22d3ee",
  ai:     "#e879f9",
  sec:    "#4ade80",
  career: "#f59e0b",
  kids:   "#f472b6",
};

export const TRACK_LABELS: Record<string, string> = {
  js:     "JavaScript",
  ts:     "TypeScript",
  py:     "Python",
  cs:     "CS / Algorithms",
  data:   "Data & SQL",
  ai:     "AI & LLMs",
  sec:    "Cybersecurity",
  career: "Career",
  kids:   "Kids",
};
