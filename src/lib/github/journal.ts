// Pure builders for the "coding journey" repo content. Given a completed lesson
// (and a progress summary), produce the file path + file body for the solution,
// and the Markdown for the repo's progress README. No I/O here — the server
// route (lib/github/app) does the actual GitHub commits. Kept pure so it's easy
// to test and reason about.

import type { LessonLanguage } from "@/lib/curriculum/types";

/** Default repo name we commit the learner's journey into. Recruiter-friendly. */
export const DEFAULT_JOURNAL_REPO = "coding-journey";

const EXT: Record<LessonLanguage, string> = {
  js: "js",
  ts: "ts",
  py: "py",
  sql: "sql",
  html: "html",
};

/** File extension for a lesson language. */
export function langExtension(language: LessonLanguage): string {
  return EXT[language] ?? "txt";
}

/** Repo-relative path for a lesson's solution file. */
export function solutionPath(
  courseSlug: string,
  lessonSlug: string,
  language: LessonLanguage,
): string {
  return `solutions/${courseSlug}/${lessonSlug}.${langExtension(language)}`;
}

/** Wrap text as a comment block in the lesson's language. */
function commentBlock(language: LessonLanguage, lines: string[]): string {
  if (language === "html") {
    return `<!--\n${lines.map((l) => `  ${l}`).join("\n")}\n-->`;
  }
  const prefix = language === "py" ? "#" : language === "sql" ? "--" : "//";
  return lines.map((l) => `${prefix} ${l}`).join("\n");
}

/** The full body written to a solution file: an attribution header + the code. */
export function renderSolutionFile(input: {
  lessonTitle: string;
  courseTitle: string;
  language: LessonLanguage;
  code: string;
  lessonUrl: string;
  siteName: string;
}): string {
  const header = commentBlock(input.language, [
    `${input.lessonTitle} — ${input.courseTitle}`,
    `Solved on ${input.siteName}: ${input.lessonUrl}`,
  ]);
  return `${header}\n\n${input.code.trimEnd()}\n`;
}

// ── README progress dashboard ────────────────────────────────────────────────

export type CourseProgress = {
  title: string;
  emoji: string;
  done: number;
  total: number;
};

export type JournalSummary = {
  siteName: string;
  siteUrl: string;
  /** Public Boots profile URL, or null if unknown. */
  profileUrl: string | null;
  level: number;
  rank: string;
  xp: number;
  streak: number;
  completedCount: number;
  totalCount: number;
  /** Per-course progress, already filtered to courses the learner has touched. */
  courses: CourseProgress[];
  /** Human label for "last updated" (the route supplies the timestamp). */
  updatedLabel: string;
};

function bar(done: number, total: number, width = 16): string {
  if (total <= 0) return "";
  const filled = Math.round((done / total) * width);
  return "█".repeat(filled) + "░".repeat(Math.max(0, width - filled));
}

/** Render the repo's README.md — a live portfolio of the learner's journey. */
export function renderReadme(s: JournalSummary): string {
  const pct =
    s.totalCount > 0 ? Math.round((s.completedCount / s.totalCount) * 100) : 0;

  const rows = s.courses
    .map(
      (c) =>
        `| ${c.emoji} ${c.title} | ${c.done}/${c.total} | \`${bar(c.done, c.total)}\` |`,
    )
    .join("\n");

  const profileLine = s.profileUrl
    ? `🔗 **[View my live profile](${s.profileUrl})**`
    : "";

  return `# 🧑‍💻 My Coding Journey

> An auto-updated log of what I'm learning on [${s.siteName}](${s.siteUrl}).
> Every commit here is a lesson I actually completed — real progress, real practice.

${profileLine}

## 📊 Stats

| | |
|---|---|
| **Level** | ${s.level} (${s.rank}) |
| **XP** | ${s.xp.toLocaleString()} |
| **Current streak** | ${s.streak} day${s.streak === 1 ? "" : "s"} 🔥 |
| **Lessons completed** | ${s.completedCount} / ${s.totalCount} (${pct}%) |

## 📚 Courses

| Course | Progress | |
|---|---|---|
${rows || "| _Just getting started…_ | | |"}

## 🗂️ Solutions

My solutions live in [\`/solutions\`](./solutions), organized by course. Each file
links back to the lesson it came from.

---

<sub>Updated ${s.updatedLabel} · Powered by [${s.siteName}](${s.siteUrl})</sub>
`;
}
