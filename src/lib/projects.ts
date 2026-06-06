// Portfolio Projects — the "I built this" credential layer (COMPETITIVE-ROADMAP
// bet #4). The guided, auto-graded capstone builds already live as lessons in the
// `portfolio-projects` curriculum module; this module reframes them as portfolio
// pieces and derives a learner's portfolio purely from `completed[]` — so it's
// client-derived, syncs via the existing column, and needs no migration.

import { getModule, lessonId, type Lesson } from "@/lib/curriculum";
import { languageName } from "@/lib/languages";

export const PROJECTS_MODULE_SLUG = "portfolio-projects";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectShowcase = {
  /** Short, résumé-ready tech tags. */
  tags: string[];
  /** One line on what shipping it proves to an employer. */
  demonstrates: string;
  difficulty: Difficulty;
};

// Per-project showcase framing, keyed by lesson slug. The lesson itself (title,
// blurb, XP, tests, solution) stays the single source of truth in the curriculum
// module — this only adds the portfolio metadata. Slugs absent here fall back to
// sensible defaults, so newly authored project lessons surface automatically.
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

const DEFAULT_SHOWCASE: ProjectShowcase = {
  tags: [],
  demonstrates: "A complete, tested mini-project worth showing.",
  difficulty: "Intermediate",
};

export type Project = {
  /** Lesson slug within the projects module. */
  slug: string;
  /** Canonical completion id, "portfolio-projects/<slug>". */
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
};

function toProject(lesson: Lesson, moduleLang: string): Project {
  const showcase = SHOWCASE[lesson.slug] ?? DEFAULT_SHOWCASE;
  return {
    slug: lesson.slug,
    id: lessonId(PROJECTS_MODULE_SLUG, lesson.slug),
    href: `/learn/${PROJECTS_MODULE_SLUG}/${lesson.slug}`,
    title: lesson.title,
    blurb: lesson.blurb,
    xp: lesson.xp,
    language: languageName(lesson.language ?? moduleLang),
    ...showcase,
  };
}

/** Every portfolio project, derived from the curriculum module (stable order). */
export function allProjects(): Project[] {
  const module = getModule(PROJECTS_MODULE_SLUG);
  if (!module) return [];
  const moduleLang = module.language ?? "js";
  return module.lessons.map((l) => toProject(l, moduleLang));
}

/** Is this completion id a portfolio project? */
export function isProject(id: string): boolean {
  return id.startsWith(`${PROJECTS_MODULE_SLUG}/`);
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
