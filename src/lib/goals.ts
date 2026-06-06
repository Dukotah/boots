// Learner goals power onboarding: a new user picks *why* they're here, and we
// map that intent to a recommended career Path (lib/paths) — and, crucially, to
// their very first lesson (the "60-second first win"). The chosen goal is
// persisted in the game store so it also drives the dashboard "recommended
// next" surface and can later segment lifecycle email.
//
// This is the canonical goal taxonomy. The marketing PathQuiz on /paths is a
// lighter, non-persisted on-ramp; this one is the real, saved onboarding.
import { getPath, pathLessonIds, type Path } from "./paths";

export type LearnerGoal = {
  id: string;
  /** Short, first-person intent shown on the goal card. */
  label: string;
  emoji: string;
  /** One line of reassurance about where this goal leads. */
  blurb: string;
  /** The career path we sequence for this goal. */
  pathSlug: string;
};

export const GOALS: LearnerGoal[] = [
  {
    id: "get-a-job",
    label: "Get a developer job",
    emoji: "💼",
    blurb: "The full job-prep track: foundations, algorithms, interviews, and a portfolio.",
    pathSlug: "job-ready",
  },
  {
    id: "frontend",
    label: "Build websites & web apps",
    emoji: "🎨",
    blurb: "Modern JavaScript and the patterns behind real, interactive UIs.",
    pathSlug: "frontend",
  },
  {
    id: "python",
    label: "Learn Python",
    emoji: "🐍",
    blurb: "From your first script to working with data — runs right in your browser.",
    pathSlug: "python",
  },
  {
    id: "interview",
    label: "Pass a coding interview",
    emoji: "🧩",
    blurb: "Recursion, algorithms, data structures, and the problems that actually get asked.",
    pathSlug: "interview-prep",
  },
  {
    id: "data",
    label: "Work with data & SQL",
    emoji: "📊",
    blurb: "Query, join, and analyze real tables; the math that turns data into answers.",
    pathSlug: "data",
  },
  {
    id: "ai",
    label: "Build AI apps with LLMs",
    emoji: "🤖",
    blurb: "Prompting, AI app plumbing, agents, embeddings — the full builder stack.",
    pathSlug: "ai-prompt-engineering",
  },
  {
    id: "cybersecurity",
    label: "Learn cybersecurity",
    emoji: "🛡️",
    blurb: "Think like an ethical hacker, defend like a pro — taught responsibly.",
    pathSlug: "cybersecurity",
  },
  {
    id: "fundamentals",
    label: "Just learn the basics",
    emoji: "🎓",
    blurb: "The timeless CS foundations that outlast any single framework.",
    pathSlug: "cs-fundamentals",
  },
  {
    id: "kids",
    label: "Coding for kids & teens",
    emoji: "👾",
    blurb: "A playful path: logic, game-building, and staying smart online.",
    pathSlug: "kids-and-teens",
  },
];

export function getGoal(id: string | null | undefined): LearnerGoal | undefined {
  return id ? GOALS.find((g) => g.id === id) : undefined;
}

/** The recommended Path object for a goal id (undefined if unknown). */
export function goalPath(id: string | null | undefined): Path | undefined {
  const goal = getGoal(id);
  return goal ? getPath(goal.pathSlug) : undefined;
}

/** Route to the first lesson of a goal's path — the "first win" deep link. */
export function goalFirstLessonHref(id: string | null | undefined): string {
  const path = goalPath(id);
  if (!path) return "/learn";
  const first = pathLessonIds(path)[0];
  return first ? `/learn/${first}` : "/learn";
}
