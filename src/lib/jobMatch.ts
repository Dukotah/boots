// Job-Description Gap Checker — pure matching logic.
//
// No AI, no network calls. A keyword dictionary maps common job-posting terms
// to a canonical skill name + an optional Cantrip module slug (so we can deep-link
// to the best lesson to learn it). `parseJobSkills` detects which skills appear in
// a job description; `matchJob` compares them against the player's completed modules
// and languages to produce a gap report.

import type { PlayerStats } from "@/types/game";

// ── Skill entry ──────────────────────────────────────────────────────────────

export type SkillEntry = {
  /** Short, display-friendly canonical name (e.g. "React", "SQL"). */
  skill: string;
  /** Cantrip module slug, if there is a course covering this skill. */
  moduleSlug?: string;
  /** Relative path to the best first lesson, derived from moduleSlug when present. */
  href?: string;
  /** The language code this maps to in PlayerStats.languages (optional). */
  langCode?: string;
};

export type MissingSkill = {
  skill: string;
  /** Direct link to the learn-it lesson, or undefined when no course exists yet. */
  href?: string;
};

export type JobMatchResult = {
  /** 0-100 integer match percentage. */
  matchPct: number;
  /** Canonical skill names the player already covers. */
  have: string[];
  /** Skills in the JD that the player hasn't covered yet, with optional deep links. */
  missing: MissingSkill[];
  /** One-line encouraging summary. */
  summary: string;
};

// ── Skill dictionary ─────────────────────────────────────────────────────────
//
// Keys are lowercase keyword aliases exactly as they'd appear in a job posting.
// Multiple aliases map to the same SkillEntry so "node.js", "nodejs", and "node"
// all resolve to the same record.
//
// Cantrip module slugs come straight from src/lib/curriculum/*.ts `slug` fields.
// The href uses the canonical /learn/<moduleSlug> lesson URL pattern used in the app.

function entry(
  skill: string,
  moduleSlug?: string,
  langCode?: string,
): SkillEntry {
  return {
    skill,
    moduleSlug,
    href: moduleSlug ? `/learn/${moduleSlug}` : undefined,
    langCode,
  };
}

// Canonical map — aliases resolved in parseJobSkills.
const SKILL_DICT: Record<string, SkillEntry> = {
  // JavaScript
  javascript: entry("JavaScript", "javascript", "js"),
  "javascript/typescript": entry("JavaScript", "javascript", "js"),
  js: entry("JavaScript", "javascript", "js"),
  es6: entry("JavaScript", "javascript", "js"),
  "vanilla js": entry("JavaScript", "javascript", "js"),
  ecmascript: entry("JavaScript", "javascript", "js"),

  // TypeScript
  typescript: entry("TypeScript", "typescript", "ts"),
  ts: entry("TypeScript", "typescript", "ts"),
  "typed javascript": entry("TypeScript", "typescript", "ts"),

  // Python
  python: entry("Python", "python", "py"),
  "python3": entry("Python", "python", "py"),
  django: entry("Python", "python", "py"),
  flask: entry("Python", "python", "py"),
  fastapi: entry("Python", "python", "py"),

  // SQL / databases
  sql: entry("SQL", "sql", "sql"),
  mysql: entry("SQL", "sql", "sql"),
  postgresql: entry("SQL", "sql", "sql"),
  postgres: entry("SQL", "sql", "sql"),
  sqlite: entry("SQL", "sql", "sql"),
  "sql server": entry("SQL", "sql", "sql"),
  database: entry("SQL", "sql", "sql"),
  databases: entry("SQL", "sql", "sql"),
  relational: entry("SQL", "sql", "sql"),
  "database design": entry("SQL", "sql", "sql"),

  // HTML & CSS
  html: entry("HTML & CSS", "html", "html"),
  css: entry("HTML & CSS", "css", "html"),
  html5: entry("HTML & CSS", "html", "html"),
  css3: entry("HTML & CSS", "css", "html"),
  "html/css": entry("HTML & CSS", "html", "html"),
  "html & css": entry("HTML & CSS", "html", "html"),
  tailwind: entry("HTML & CSS", "css", "html"),
  "tailwindcss": entry("HTML & CSS", "css", "html"),
  sass: entry("HTML & CSS", "css", "html"),
  scss: entry("HTML & CSS", "css", "html"),
  responsive: entry("HTML & CSS", "html", "html"),

  // React
  react: entry("React", "react", "js"),
  "react.js": entry("React", "react", "js"),
  reactjs: entry("React", "react", "js"),
  "react native": entry("React", "react", "js"),
  "next.js": entry("React", "react", "js"),
  nextjs: entry("React", "react", "js"),
  hooks: entry("React", "react", "js"),
  jsx: entry("React", "react", "js"),
  tsx: entry("React", "typescript", "ts"),

  // Node.js / backend JS
  node: entry("Node.js", "node", "js"),
  "node.js": entry("Node.js", "node", "js"),
  nodejs: entry("Node.js", "node", "js"),
  express: entry("Node.js", "node", "js"),
  "express.js": entry("Node.js", "node", "js"),
  "rest api": entry("Node.js", "node", "js"),
  "restful api": entry("Node.js", "node", "js"),
  "api development": entry("Node.js", "node", "js"),
  backend: entry("Node.js", "node", "js"),
  "server-side": entry("Node.js", "node", "js"),

  // HTTP & REST
  http: entry("HTTP & REST", "http-and-rest"),
  rest: entry("HTTP & REST", "http-and-rest"),
  restful: entry("HTTP & REST", "http-and-rest"),
  apis: entry("HTTP & REST", "http-and-rest"),
  api: entry("HTTP & REST", "http-and-rest"),
  "http methods": entry("HTTP & REST", "http-and-rest"),
  "status codes": entry("HTTP & REST", "http-and-rest"),
  json: entry("HTTP & REST", "json"),
  "json api": entry("HTTP & REST", "json"),

  // Git / version control
  git: entry("Git & GitHub", "git-github"),
  github: entry("Git & GitHub", "git-github"),
  gitlab: entry("Git & GitHub", "git-github"),
  "version control": entry("Git & GitHub", "git-github"),
  "source control": entry("Git & GitHub", "git-github"),
  "pull request": entry("Git & GitHub", "git-github"),
  "code review": entry("Git & GitHub", "git-github"),
  "ci/cd": entry("Git & GitHub", "git-github"),
  cicd: entry("Git & GitHub", "git-github"),

  // Algorithms & data structures
  algorithms: entry("Algorithms", "algorithms"),
  algorithm: entry("Algorithms", "algorithms"),
  "data structures": entry("Data Structures", "data-structures"),
  "data structure": entry("Data Structures", "data-structures"),
  leetcode: entry("Algorithms", "algorithms"),
  "big o": entry("Algorithms", "big-o-complexity"),
  complexity: entry("Algorithms", "big-o-complexity"),

  // OOP
  oop: entry("OOP", "oop"),
  "object-oriented": entry("OOP", "oop"),
  "object oriented": entry("OOP", "oop"),
  classes: entry("OOP", "oop"),
  inheritance: entry("OOP", "oop"),
  solid: entry("OOP", "solid-principles"),
  "design patterns": entry("OOP", "behavioral-patterns"),

  // Functional programming
  functional: entry("Functional Programming", "functional"),
  "functional programming": entry("Functional Programming", "functional"),
  immutable: entry("Functional Programming", "functional"),

  // System design
  "system design": entry("System Design", "system-design"),
  scalability: entry("System Design", "system-design"),
  microservices: entry("System Design", "system-design"),
  distributed: entry("System Design", "system-design"),
  "load balancing": entry("System Design", "system-design"),

  // Security
  security: entry("Web Security", "web-security"),
  "web security": entry("Web Security", "web-security"),
  owasp: entry("Web Security", "web-security"),
  authentication: entry("Web Security", "passwords-auth"),
  authorization: entry("Web Security", "passwords-auth"),
  oauth: entry("Web Security", "passwords-auth"),
  jwt: entry("Web Security", "passwords-auth"),
  hashing: entry("Web Security", "hashing-and-integrity"),
  encryption: entry("Web Security", "web-security"),

  // Testing
  testing: entry("Unit Testing", "unit-testing-fundamentals"),
  "unit testing": entry("Unit Testing", "unit-testing-fundamentals"),
  "unit tests": entry("Unit Testing", "unit-testing-fundamentals"),
  tdd: entry("Unit Testing", "tdd-practice"),
  "test-driven": entry("Unit Testing", "tdd-practice"),
  jest: entry("Unit Testing", "unit-testing-fundamentals"),
  "test driven development": entry("Unit Testing", "tdd-practice"),

  // AI & LLMs
  "machine learning": entry("AI & LLMs", "ai-llms"),
  "ml": entry("AI & LLMs", "ai-llms"),
  llm: entry("AI & LLMs", "ai-llms"),
  llms: entry("AI & LLMs", "ai-llms"),
  "large language model": entry("AI & LLMs", "ai-llms"),
  "artificial intelligence": entry("AI & LLMs", "ai-llms"),
  "ai/ml": entry("AI & LLMs", "ai-llms"),
  openai: entry("AI Apps", "ai-apps"),
  "prompt engineering": entry("Prompt Engineering", "prompt-engineering"),
  "ai agents": entry("AI Agents", "ai-agents"),
  embeddings: entry("AI Embeddings", "ai-embeddings"),
  "vector database": entry("AI Embeddings", "ai-embeddings"),
  "rag": entry("AI Embeddings", "ai-embeddings"),

  // Cloud / AWS
  aws: entry("Cloud / AWS", undefined),
  "amazon web services": entry("Cloud / AWS", undefined),
  azure: entry("Cloud / Azure", undefined),
  gcp: entry("Cloud / GCP", undefined),
  "google cloud": entry("Cloud / GCP", undefined),
  cloud: entry("Cloud", undefined),
  docker: entry("Docker", undefined),
  kubernetes: entry("Kubernetes", undefined),
  k8s: entry("Kubernetes", undefined),
  devops: entry("DevOps", undefined),
  terraform: entry("DevOps", undefined),
};

// ── parseJobSkills ────────────────────────────────────────────────────────────

/**
 * Scan job-description text and return the deduplicated set of detected
 * SkillEntry objects (one per canonical skill name).
 */
export function parseJobSkills(text: string): SkillEntry[] {
  const lower = text.toLowerCase();
  const seen = new Map<string, SkillEntry>(); // keyed by canonical skill name

  for (const [alias, entry] of Object.entries(SKILL_DICT)) {
    // Require a whole-word / boundary match so "rest" doesn't fire inside "forest"
    // and "sql" doesn't fire inside "consul". We approximate word boundaries with
    // a regex that checks the character before/after the alias isn't alphanumeric.
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");
    if (re.test(lower) && !seen.has(entry.skill)) {
      seen.set(entry.skill, entry);
    }
  }

  return Array.from(seen.values());
}

// ── matchJob ─────────────────────────────────────────────────────────────────

/**
 * Compare detected job skills against what the player has already learned.
 *
 * A player "has" a skill when:
 *   - The skill's moduleSlug is in stats.completedModules, OR
 *   - The skill's langCode is in stats.languages (at least one lesson done).
 *
 * Skills with neither a moduleSlug nor a langCode (e.g. Docker) are treated as
 * always missing — we can't infer them from existing stats.
 */
export function matchJob(
  text: string,
  stats: PlayerStats,
): JobMatchResult {
  const skills = parseJobSkills(text);

  if (skills.length === 0) {
    return {
      matchPct: 0,
      have: [],
      missing: [],
      summary:
        "No recognizable tech skills found. Try pasting a longer job description.",
    };
  }

  const have: string[] = [];
  const missing: MissingSkill[] = [];

  for (const s of skills) {
    const hasModule =
      s.moduleSlug !== undefined &&
      stats.completedModules.includes(s.moduleSlug);
    const hasLang =
      s.langCode !== undefined && stats.languages.includes(s.langCode);

    if (hasModule || hasLang) {
      have.push(s.skill);
    } else {
      missing.push({ skill: s.skill, href: s.href });
    }
  }

  const matchPct =
    skills.length > 0 ? Math.round((have.length / skills.length) * 100) : 0;

  const summary = buildSummary(matchPct, have.length, missing.length);

  return { matchPct, have, missing, summary };
}

function buildSummary(
  pct: number,
  haveCount: number,
  missingCount: number,
): string {
  if (pct === 100) {
    return "Perfect match — you have every skill listed in this job description!";
  }
  if (pct >= 75) {
    return `Strong match. You cover ${haveCount} of the key skills — knock out ${missingCount} more to hit 100%.`;
  }
  if (pct >= 50) {
    return `Solid foundation — ${haveCount} skills down, ${missingCount} to go. You're on the right track.`;
  }
  if (pct >= 25) {
    return `Good start — ${haveCount} skills covered. Each course you finish closes the gap fast.`;
  }
  if (haveCount > 0) {
    return `You have ${haveCount} of the required skills. Keep building — every lesson counts.`;
  }
  return `${missingCount} skills to learn. Start with any linked course and watch this score climb.`;
}
