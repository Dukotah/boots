// Career Pack — the "job-readiness" layer.
//
// Everything here is PURE and derives from the same flat `completed` lesson list
// the rest of the game runs on (no new persistence, no DB migration). That keeps
// the readiness score and résumé deterministic and trivially testable, exactly
// like lib/progress' breadth metrics and the achievement catalog.
//
// Three things live here:
//   1. computeReadiness() — a transparent, weighted 0..100 job-readiness score.
//   2. buildResume() / resumeMarkdown() — a structured résumé + Markdown export.
//   3. certVerifyCode() — the shared certificate id (also used by Certificate.tsx).

import { getModule } from "@/lib/curriculum";
import {
  PATHS,
  completedPaths,
  pathProgress,
  pathStats,
  type Path,
} from "@/lib/paths";
import { levelFromXp } from "@/lib/levels";
import { SITE } from "@/lib/site";
import { completedProjects } from "@/lib/projects";
import type { PlayerStats } from "@/types/game";

// Language display names live in lib/languages (shared with lib/projects without
// a cycle); re-exported here so existing import sites keep working.
import { languageName } from "@/lib/languages";
export { languageName };

// The job-relevant modules surfaced as a concrete "skills you can show an
// employer" grid (public profile). This is a display list of what counts as
// career-relevant — distinct from the holistic readiness *score* below, which
// weighs finished tracks, breadth, depth, and consistency.
export const CAREER_MODULES = [
  "javascript",
  "typescript",
  "python",
  "sql",
  "html",
  "algorithms",
  "data-structures",
  "interview",
  "git-github",
  "ai-llms",
  "ai-agents",
  "prompt-engineering",
  "web-security",
];

// ── Job-readiness score ──────────────────────────────────────────────────────

export type ReadinessFactor = {
  key: string;
  label: string;
  /** Short human note, e.g. "2 of 3 career tracks finished". */
  detail: string;
  points: number;
  max: number;
  /** What to do to earn the rest (shown as a tip when not maxed). */
  tip: string;
};

export type ReadinessTier = {
  name: string;
  emoji: string;
  blurb: string;
  /** Lower bound (inclusive) of the score band. */
  min: number;
};

export type Readiness = {
  score: number; // 0..100
  tier: ReadinessTier;
  /** The next tier up, or null if already at the top. */
  nextTier: ReadinessTier | null;
  factors: ReadinessFactor[];
};

// Bands read like a hiring funnel: from "just exploring" to "I'd interview them".
export const READINESS_TIERS: ReadinessTier[] = [
  { name: "Just Starting", emoji: "🌱", min: 0, blurb: "You've begun — keep building momentum." },
  { name: "Building Foundations", emoji: "🧱", min: 20, blurb: "Real fundamentals are forming." },
  { name: "Junior-Ready", emoji: "💻", min: 40, blurb: "Enough breadth to start applying for junior roles." },
  { name: "Interview-Ready", emoji: "🎯", min: 60, blurb: "Solid range — ready to practice interviews in earnest." },
  { name: "Standout Candidate", emoji: "🚀", min: 80, blurb: "Broad, deep, and consistent — a portfolio that turns heads." },
];

export function readinessTier(score: number): ReadinessTier {
  let tier = READINESS_TIERS[0];
  for (const t of READINESS_TIERS) if (score >= t.min) tier = t;
  return tier;
}

function nextTierAbove(score: number): ReadinessTier | null {
  return READINESS_TIERS.find((t) => t.min > score) ?? null;
}

/**
 * A transparent, weighted job-readiness score out of 100. The five factors are
 * deliberately legible so a learner can see exactly how to raise it — and so it
 * rewards the things employers actually scan for: finished career tracks first,
 * then language breadth, course depth, total practice, and consistency.
 */
export function computeReadiness(stats: PlayerStats): Readiness {
  const pathsDone = completedPaths(stats.completedIds);
  const langs = stats.languages;

  // Career tracks finished — the strongest "this maps to a job" signal (max 35).
  const TRACK_PTS = 12;
  const tracks: ReadinessFactor = {
    key: "tracks",
    label: "Career tracks completed",
    detail: `${pathsDone.length} ${pathsDone.length === 1 ? "track" : "tracks"} finished`,
    points: Math.min(35, pathsDone.length * TRACK_PTS),
    max: 35,
    tip: "Finish a full career path to earn a verifiable certificate (the biggest boost).",
  };

  // Language breadth — versatility across stacks (max 20).
  const LANG_PTS = 7;
  const breadth: ReadinessFactor = {
    key: "languages",
    label: "Language breadth",
    detail:
      langs.length > 0
        ? langs.map(languageName).join(", ")
        : "no languages yet",
    points: Math.min(20, langs.length * LANG_PTS),
    max: 20,
    tip: "Complete lessons in a new language (e.g. Python or SQL) to broaden your range.",
  };

  // Courses fully completed — depth of follow-through (max 20).
  const MODULE_PTS = 2.5;
  const courses: ReadinessFactor = {
    key: "courses",
    label: "Courses completed",
    detail: `${stats.completedModules.length} courses finished end-to-end`,
    points: Math.min(20, Math.round(stats.completedModules.length * MODULE_PTS)),
    max: 20,
    tip: "Finish every lesson in a course you've started to fully complete it.",
  };

  // Total practice — sheer reps (max 15, ~1pt per 4 lessons).
  const depth: ReadinessFactor = {
    key: "practice",
    label: "Lessons practiced",
    detail: `${stats.completedCount} lessons completed`,
    points: Math.min(15, Math.round(stats.completedCount / 4)),
    max: 15,
    tip: "Keep completing lessons — every one adds practice an interviewer can see.",
  };

  // Consistency — a current streak signals habit (max 10, 1pt per day).
  const consistency: ReadinessFactor = {
    key: "consistency",
    label: "Consistency",
    detail: `${stats.streak}-day streak`,
    points: Math.min(10, stats.streak),
    max: 10,
    tip: "Come back daily — a 10-day streak maxes this factor.",
  };

  const factors = [tracks, breadth, courses, depth, consistency];
  const score = Math.min(
    100,
    factors.reduce((sum, f) => sum + f.points, 0),
  );

  return {
    score,
    tier: readinessTier(score),
    nextTier: nextTierAbove(score),
    factors,
  };
}

// ── Certificate verification id (shared with Certificate.tsx) ────────────────
// A short, deterministic code from the path slug + learner name. Not
// cryptographic — it gives every certificate a stable, official-looking id so
// the same person + path always yields the same code (verifiable by re-deriving).
export function certVerifyCode(slug: string, name: string): string {
  const input = `${slug}::${name.toLowerCase()}`;
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return (
    SITE.name.toUpperCase() +
    "-" +
    h.toString(36).toUpperCase().padStart(6, "0").slice(0, 6)
  );
}

// ── Résumé / portfolio export ────────────────────────────────────────────────

export type ResumeCredential = {
  pathSlug: string;
  title: string;
  role: string;
  lessons: number;
  code: string;
};

export type ResumeData = {
  name: string;
  /** Rank-derived headline, e.g. "Developer · Level 7". */
  headline: string;
  summary: string;
  /** Human language names, résumé-ready. */
  skills: string[];
  /** Titles of fully completed courses. */
  courses: string[];
  /** Shipped portfolio projects (title + what each demonstrates). */
  projects: { title: string; demonstrates: string }[];
  /** Earned path certificates with verification codes. */
  credentials: ResumeCredential[];
  highlights: string[];
};

/**
 * Assemble a résumé from the learner's progress. `name` is what they typed (or a
 * sensible fallback); it drives the certificate verification codes so the codes
 * on the résumé match the ones on the certificate pages.
 */
export function buildResume(stats: PlayerStats, name: string): ResumeData {
  const info = levelFromXp(stats.xp);
  const pathsDone = completedPaths(stats.completedIds);

  const skills = stats.languages.map(languageName);

  const courses = stats.completedModules
    .map((slug) => getModule(slug)?.title)
    .filter((t): t is string => Boolean(t));

  const projects = completedProjects(stats.completedIds).map((p) => ({
    title: p.title,
    demonstrates: p.demonstrates,
  }));

  const credentials: ResumeCredential[] = pathsDone.map((p) => ({
    pathSlug: p.slug,
    title: p.title,
    role: p.role,
    lessons: pathStats(p).lessons,
    code: certVerifyCode(p.slug, name),
  }));

  const skillList = skills.length ? skills.join(", ") : "core programming";
  const summary =
    `Self-driven learner at the ${info.rank.name} rank (level ${info.level}) ` +
    `with hands-on practice across ${skillList}. ` +
    (pathsDone.length
      ? `Completed ${pathsDone.length} career ${pathsDone.length === 1 ? "track" : "tracks"} ` +
        `(${pathsDone.map((p) => p.role).join(", ")}).`
      : `Building toward a first career track.`);

  const highlights = [
    `${stats.completedCount} interactive lessons completed`,
    `${stats.xp.toLocaleString()} XP earned · ${info.rank.emoji} ${info.rank.name}`,
    `${stats.completedModules.length} courses finished end-to-end`,
    ...(stats.streak >= 3 ? [`${stats.streak}-day learning streak`] : []),
  ];

  return {
    name,
    headline: `${info.rank.name} · Level ${info.level}`,
    summary,
    skills,
    courses,
    projects,
    credentials,
    highlights,
  };
}

/** Render a résumé as portable Markdown (for copy → GitHub README, Notion, etc.). */
export function resumeMarkdown(r: ResumeData): string {
  const lines: string[] = [];
  lines.push(`# ${r.name}`);
  lines.push(`**${r.headline}**`);
  lines.push("");
  lines.push(r.summary);
  lines.push("");

  if (r.skills.length) {
    lines.push("## Skills");
    lines.push(r.skills.map((s) => `\`${s}\``).join(" · "));
    lines.push("");
  }

  if (r.projects.length) {
    lines.push("## Projects");
    for (const p of r.projects) {
      lines.push(`- **${p.title}** — ${p.demonstrates}`);
    }
    lines.push("");
  }

  if (r.credentials.length) {
    lines.push("## Certifications");
    for (const c of r.credentials) {
      lines.push(`- **${c.title}** — ${c.role} (${c.lessons} lessons) · \`${c.code}\``);
    }
    lines.push("");
  }

  if (r.courses.length) {
    lines.push("## Completed courses");
    lines.push(r.courses.map((c) => `- ${c}`).join("\n"));
    lines.push("");
  }

  lines.push("## Highlights");
  for (const h of r.highlights) lines.push(`- ${h}`);
  lines.push("");
  lines.push("_Generated from my Cantrip learning progress._");

  return lines.join("\n");
}

/** Every path with its earned/in-progress state, for the certificates gallery. */
export type PathCredentialStatus = {
  path: Path;
  done: number;
  total: number;
  pct: number;
  earned: boolean;
};

export function pathCredentials(completedIds: string[]): PathCredentialStatus[] {
  return PATHS.map((path) => {
    const p = pathProgress(path, completedIds);
    return {
      path,
      done: p.done,
      total: p.total,
      pct: p.pct,
      earned: p.complete,
    };
  });
}
