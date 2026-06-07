// Role-targeted readiness — answers "how ready am I for THIS specific role?"
//
// Distinct from the holistic computeReadiness() in lib/career (which scores
// overall job-readiness across all tracks). Here each role has a curated
// expected module set and language set; the learner's score is simply:
//   (completed expected modules + completed expected languages) / total expected
//
// Pure and deterministic — no imports from the store, no side-effects.
// Unit-testable: pass any PlayerStats snapshot, get a stable result.

import type { PlayerStats } from "@/types/game";

// ── Role target definitions ──────────────────────────────────────────────────

export type RoleTarget = {
  id: string;
  label: string;
  emoji: string;
  /**
   * The exact module slugs a learner should complete to be role-ready.
   * Derived from the matching PATHS.moduleSlugs entries, curated to the
   * core signal (not every optional deep-dive).
   */
  expectedModules: string[];
  /**
   * Language codes (as stored in PlayerStats.languages) the role expects
   * breadth in. E.g. "js", "ts", "py", "sql".
   */
  expectedLanguages: string[];
};

export const ROLE_TARGETS: RoleTarget[] = [
  {
    id: "frontend",
    label: "Frontend Developer",
    emoji: "🎨",
    // Core from the "frontend" path — JavaScript mastery, functional style, OOP,
    // modern JS patterns, plus HTML and browser fundamentals.
    expectedModules: [
      "javascript",
      "strings",
      "functional",
      "fp-composition-pipelines",
      "js-array-methods",
      "oop",
      "javascript-next",
      "regex",
      "json",
      "browser-storage",
      "error-handling",
      "html",
      "typescript",
    ],
    expectedLanguages: ["js", "ts", "html"],
  },
  {
    id: "backend",
    label: "Backend Developer",
    emoji: "⚙️",
    // Core from the "backend" path — Python, SQL stack, HTTP, algorithms/DS.
    expectedModules: [
      "python",
      "python-data",
      "python-decorators",
      "sql",
      "sql-joins",
      "sql-window-functions",
      "db-transactions-acid",
      "http-and-rest",
      "algorithms",
      "data-structures",
      "error-handling",
      "git-github",
    ],
    expectedLanguages: ["py", "sql"],
  },
  {
    id: "data",
    label: "Data Analyst",
    emoji: "📊",
    // Core from the "data" path — Python for analysis, full SQL stack, math/stats.
    expectedModules: [
      "python",
      "python-data",
      "python-statistics",
      "sql",
      "sql-joins",
      "sql-window-functions",
      "sql-case-and-pivoting",
      "sql-recursive-ctes",
      "db-normalization",
      "math",
      "algorithms",
    ],
    expectedLanguages: ["py", "sql"],
  },
  {
    id: "ai-engineer",
    label: "AI Engineer",
    emoji: "🤖",
    // Core from "ai-engineer" + "ai-prompt-engineering" paths — LLM fundamentals,
    // prompt engineering, agents, embeddings, async JS plumbing.
    expectedModules: [
      "javascript",
      "async",
      "web-apis",
      "ai-llms",
      "prompt-engineering",
      "ai-apps",
      "ai-agents",
      "ai-embeddings",
      "ai-ethics",
      "ml-model-evaluation",
    ],
    expectedLanguages: ["js", "py"],
  },
  {
    id: "fullstack",
    label: "Full Stack Developer",
    emoji: "🥞",
    // Core from the "fullstack" path — JS + TS frontend, Python + SQL backend,
    // Git, HTTP, testing, system design fundamentals.
    expectedModules: [
      "javascript",
      "typescript",
      "python",
      "sql",
      "sql-joins",
      "http-and-rest",
      "git-github",
      "unit-testing-fundamentals",
      "solid-principles",
      "system-design",
      "error-handling",
      "algorithms",
      "data-structures",
    ],
    expectedLanguages: ["js", "ts", "py", "sql"],
  },
];

// ── Tier bands ───────────────────────────────────────────────────────────────

export type RoleReadinessTier = {
  name: string;
  /** Lower bound (inclusive) of the score band. */
  min: number;
};

export const ROLE_READINESS_TIERS: RoleReadinessTier[] = [
  { name: "Not Started", min: 0 },
  { name: "Exploring", min: 10 },
  { name: "Foundations", min: 30 },
  { name: "Developing", min: 50 },
  { name: "Nearly Ready", min: 70 },
  { name: "Role-Ready", min: 90 },
];

function roleReadinessTierName(score: number): string {
  let tier = ROLE_READINESS_TIERS[0];
  for (const t of ROLE_READINESS_TIERS) {
    if (score >= t.min) tier = t;
  }
  return tier.name;
}

// ── Return shape ─────────────────────────────────────────────────────────────

export type RoleGap = {
  /** Short display label — typically the module title or language name. */
  label: string;
  /** One-line detail, e.g. "Module not started" or "Language not yet practiced". */
  detail: string;
  /** Deep-link into the curriculum. */
  href: string;
};

export type RoleNextAction = {
  label: string;
  href: string;
  /** XP/momentum rationale for ranking — higher = do this sooner. */
  priority: number;
};

export type RoleReadiness = {
  roleId: string;
  /** 0–100: percentage of the role's expected modules + languages the learner has. */
  score: number;
  /** Human-readable tier band name. */
  tier: string;
  /** Top missing modules/languages with deep links. Capped at 5 for UI sanity. */
  gaps: RoleGap[];
  /**
   * Ranked next actions: items the learner is closest to finishing come first
   * (partially-touched modules before untouched ones), then language breadth.
   */
  nextActions: RoleNextAction[];
};

// ── Scoring logic ─────────────────────────────────────────────────────────────

/**
 * Compute role-specific readiness for a given role id.
 *
 * Score formula:
 *   score = (completedModules ∩ expectedModules).length
 *         + (languages ∩ expectedLanguages).length
 *   ─────────────────────────────────────────────────  × 100
 *   expectedModules.length + expectedLanguages.length
 *
 * Each expected module and each expected language counts equally as one unit.
 * Gaps are the missing modules/languages ordered by "closeness" — modules the
 * learner has at least touched come first, then fully untouched, then languages.
 * nextActions mirrors that ranking with deep links the UI can render as buttons.
 */
export function computeRoleReadiness(
  stats: PlayerStats,
  roleId: string,
): RoleReadiness {
  const role = ROLE_TARGETS.find((r) => r.id === roleId);
  if (!role) {
    // Unknown role — return a zeroed result rather than throwing, so callers
    // can defensively iterate without crashing.
    return {
      roleId,
      score: 0,
      tier: ROLE_READINESS_TIERS[0].name,
      gaps: [],
      nextActions: [],
    };
  }

  const completedModuleSet = new Set(stats.completedModules);
  const touchedModuleSet = new Set(
    // completedIds are "moduleSlug/lessonSlug" — extract the module portion.
    stats.completedIds.map((id) => id.split("/")[0]),
  );
  const languageSet = new Set(stats.languages);

  // ── Completed counts ──
  const completedModuleCount = role.expectedModules.filter((m) =>
    completedModuleSet.has(m),
  ).length;
  const completedLangCount = role.expectedLanguages.filter((l) =>
    languageSet.has(l),
  ).length;

  const total = role.expectedModules.length + role.expectedLanguages.length;
  const earned = completedModuleCount + completedLangCount;
  const score = total === 0 ? 0 : Math.round((earned / total) * 100);
  const tier = roleReadinessTierName(score);

  // ── Gaps ──
  // Missing modules, sorted: touched-but-not-finished first (closest to done),
  // then completely untouched.
  const missingModules = role.expectedModules.filter(
    (m) => !completedModuleSet.has(m),
  );
  const touchedIncomplete = missingModules.filter((m) =>
    touchedModuleSet.has(m),
  );
  const untouched = missingModules.filter((m) => !touchedModuleSet.has(m));
  const orderedMissingModules = [...touchedIncomplete, ...untouched];

  const missingLangs = role.expectedLanguages.filter(
    (l) => !languageSet.has(l),
  );

  const gaps: RoleGap[] = [
    ...orderedMissingModules.slice(0, 5).map((slug) => ({
      label: slugToLabel(slug),
      detail: touchedModuleSet.has(slug)
        ? "In progress — finish every lesson to complete it"
        : "Not started yet",
      href: `/learn/${slug}`,
    })),
    ...missingLangs.slice(0, Math.max(0, 5 - orderedMissingModules.length)).map(
      (lang) => ({
        label: langCodeToLabel(lang),
        detail: "Complete at least one lesson in this language",
        href: langToHref(lang),
      }),
    ),
  ].slice(0, 5);

  // ── Next actions ──
  // Rank: in-progress modules (priority 2) > untouched modules (priority 1) > languages (priority 0).
  const nextActions: RoleNextAction[] = [
    ...touchedIncomplete.map((slug) => ({
      label: `Finish ${slugToLabel(slug)}`,
      href: `/learn/${slug}`,
      priority: 2,
    })),
    ...untouched.map((slug) => ({
      label: `Start ${slugToLabel(slug)}`,
      href: `/learn/${slug}`,
      priority: 1,
    })),
    ...missingLangs.map((lang) => ({
      label: `Practice ${langCodeToLabel(lang)}`,
      href: langToHref(lang),
      priority: 0,
    })),
  ]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);

  return { roleId, score, tier, gaps, nextActions };
}

// ── Convenience: compute all 5 roles at once ─────────────────────────────────

export function computeAllRoleReadiness(
  stats: PlayerStats,
): RoleReadiness[] {
  return ROLE_TARGETS.map((r) => computeRoleReadiness(stats, r.id));
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Convert a module slug to a short display label.
 * Splits on hyphens and title-cases each word; "ai-llms" → "AI LLMs".
 * Special-cases well-known acronyms so they don't look odd in the UI.
 */
function slugToLabel(slug: string): string {
  const ACRONYMS: Record<string, string> = {
    ai: "AI",
    llms: "LLMs",
    sql: "SQL",
    oop: "OOP",
    js: "JS",
    ts: "TS",
    fp: "FP",
    http: "HTTP",
    apis: "APIs",
    api: "API",
    tdd: "TDD",
    ctf: "CTF",
  };
  return slug
    .split("-")
    .map((w) => ACRONYMS[w.toLowerCase()] ?? (w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

const LANG_LABELS: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  sql: "SQL",
  html: "HTML & CSS",
};

function langCodeToLabel(code: string): string {
  return LANG_LABELS[code] ?? code.toUpperCase();
}

/**
 * Best-guess deep link for a language breadth gap — points to the canonical
 * introductory module for that language.
 */
function langToHref(code: string): string {
  const MAP: Record<string, string> = {
    js: "/learn/javascript",
    ts: "/learn/typescript",
    py: "/learn/python",
    sql: "/learn/sql",
    html: "/learn/html",
  };
  return MAP[code] ?? "/learn";
}
