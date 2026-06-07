// Portfolio Projects — the "I built this" credential layer (COMPETITIVE-ROADMAP
// bet #4). Aggregates across ALL curriculum modules whose slug starts with
// "portfolio", so every new portfolio-* module surfaces here automatically.
// Completion still derives from the flat `completed[]` array — no migration.

import { CATALOG, type CatalogLesson } from "@/lib/curriculum/catalogClient";
import { languageName } from "@/lib/languages";

// Kept for backward-compatibility (career.ts + tests reference it).
export const PROJECTS_MODULE_SLUG = "portfolio-projects";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectShowcase = {
  /** Short, résumé-ready tech tags. */
  tags: string[];
  /** One line on what shipping it proves to an employer. */
  demonstrates: string;
  difficulty: Difficulty;
};

// ── Domain map ────────────────────────────────────────────────────────────────
// Maps module slug → human-readable domain label used for grouping in the hub.
const MODULE_DOMAIN: Record<string, string> = {
  "portfolio-projects":      "Foundations",
  "portfolio-js-apps":       "App Logic",
  "portfolio-text":          "Text & Strings",
  "portfolio-parsers":       "Parsers",
  "portfolio-systems":       "Systems",
  "portfolio-data-structures": "Data Structures",
  "portfolio-validation":    "Validation",
  "portfolio-games":         "Games",
  "portfolio-algorithms":    "Algorithms",
  "portfolio-finance":       "Finance & Math",
  "portfolio-typescript":    "TypeScript",
};

// ── Difficulty derivation ─────────────────────────────────────────────────────
// XP bands: <=44 → Beginner, <=54 → Intermediate, >54 → Advanced.
function difficultyFromXp(xp: number): Difficulty {
  if (xp <= 44) return "Beginner";
  if (xp <= 54) return "Intermediate";
  return "Advanced";
}

// ── Per-project showcase overrides ───────────────────────────────────────────
// Keyed by lesson slug. These 5 originals keep their curated framing exactly.
// Every other lesson falls back to XP-derived difficulty + sensible defaults.
const SHOWCASE: Record<string, ProjectShowcase> = {
  "todo-app": {
    tags: ["CRUD", "Arrays", "OOP"],
    demonstrates: "Core CRUD state management — the pattern behind every app.",
    difficulty: "Beginner",
  },
  calculator: {
    tags: ["Parsing", "Logic", "Edge cases"],
    demonstrates: "Input parsing and operator logic with careful edge-case handling.",
    difficulty: "Beginner",
  },
  "word-frequency": {
    tags: ["Strings", "Hash maps", "Sorting"],
    demonstrates: "Text processing with hash-map counting and ranked output.",
    difficulty: "Intermediate",
  },
  "event-emitter": {
    tags: ["Pub/Sub", "Callbacks", "APIs"],
    demonstrates: "The publish/subscribe pattern that powers event-driven systems.",
    difficulty: "Intermediate",
  },
  "rate-limiter": {
    tags: ["Algorithms", "Time windows", "Systems"],
    demonstrates: "A real systems primitive: throttling requests over a time window.",
    difficulty: "Advanced",
  },
};

// ── Project type ──────────────────────────────────────────────────────────────
export type Project = {
  /** Lesson slug within its module. */
  slug: string;
  /** Module slug this project belongs to. */
  moduleSlug: string;
  /** Canonical completion id, "<moduleSlug>/<lessonSlug>". */
  id: string;
  /** Deep link to the build page. */
  href: string;
  title: string;
  blurb: string;
  xp: number;
  /** Human language name, e.g. "JavaScript". */
  language: string;
  tags: string[];
  demonstrates: string;
  difficulty: Difficulty;
  /** Human-readable domain for grouping (e.g. "Systems", "Games"). */
  domain: string;
};

function toProject(
  lesson: CatalogLesson,
  moduleLang: string,
  moduleSlug: string,
  domain: string,
): Project {
  const override = SHOWCASE[lesson.slug];
  const difficulty = override?.difficulty ?? difficultyFromXp(lesson.xp);
  const demonstrates =
    override?.demonstrates ?? "A complete, tested mini-project worth showing.";
  const tags = override?.tags ?? [];

  return {
    slug: lesson.slug,
    moduleSlug,
    id: lesson.id,
    href: `/learn/${moduleSlug}/${lesson.slug}`,
    title: lesson.title,
    blurb: lesson.blurb,
    xp: lesson.xp,
    language: languageName(moduleLang),
    tags,
    demonstrates,
    difficulty,
    domain,
  };
}

/** Every portfolio project across all portfolio-* modules, in catalog order. */
export function allProjects(): Project[] {
  const results: Project[] = [];
  for (const mod of CATALOG) {
    if (!mod.slug.startsWith("portfolio")) continue;
    const moduleLang = mod.language ?? "js";
    const domain = MODULE_DOMAIN[mod.slug] ?? mod.title;
    for (const lesson of mod.lessons) {
      results.push(toProject(lesson, moduleLang, mod.slug, domain));
    }
  }
  return results;
}

/** Is this completion id a portfolio project? True for any portfolio-* module. */
export function isProject(id: string): boolean {
  return /^portfolio[^/]*\//.test(id);
}

/** The learner's shipped projects (completed), in catalog order. */
export function completedProjects(completed: string[]): Project[] {
  const done = new Set(completed);
  return allProjects().filter((p) => done.has(p.id));
}

/** Portfolio completion counts, for progress bars. */
export function projectProgress(completed: string[]): {
  done: number;
  total: number;
} {
  const all = allProjects();
  const done = new Set(completed);
  return { done: all.filter((p) => done.has(p.id)).length, total: all.length };
}
