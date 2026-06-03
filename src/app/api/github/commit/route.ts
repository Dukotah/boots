import { NextResponse } from "next/server";
import { getLesson, MODULES, totalLessons } from "@/lib/curriculum";
import { lessonLanguage } from "@/lib/curriculum/lang";
import { levelFromXp, rankForLevel } from "@/lib/levels";
import { SITE } from "@/lib/site";
import {
  isGithubAppConfigured,
  getInstallationToken,
  getInstallationOwner,
  commitFile,
} from "@/lib/github/app";
import { getAuthedGithubLink } from "@/lib/github/link";
import {
  DEFAULT_JOURNAL_REPO,
  solutionPath,
  renderSolutionFile,
  renderReadme,
  type CourseProgress,
} from "@/lib/github/journal";

// Commit a completed lesson's solution + an updated progress README to the
// learner's GitHub journey repo. Called fire-and-forget by the lesson view when
// tests pass. Degrades to { skipped } whenever the integration isn't ready, so
// the client never has to special-case anything.
export const runtime = "nodejs";

const MAX_CODE_LENGTH = 20_000;

export async function POST(req: Request) {
  if (!isGithubAppConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }

  const body = await req.json().catch(() => null);
  const { courseSlug, lessonSlug, code } = (body ?? {}) as Record<
    string,
    unknown
  >;
  if (
    typeof courseSlug !== "string" ||
    typeof lessonSlug !== "string" ||
    typeof code !== "string"
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Code too long" }, { status: 413 });
  }

  const found = getLesson(courseSlug, lessonSlug);
  if (!found) {
    return NextResponse.json({ error: "Unknown lesson" }, { status: 404 });
  }

  const link = await getAuthedGithubLink();
  if (!link?.installationId) {
    return NextResponse.json({ skipped: true, reason: "not connected" });
  }

  const owner =
    link.login ?? (await getInstallationOwner(link.installationId));
  if (!owner) {
    return NextResponse.json({ skipped: true, reason: "no owner" });
  }

  const token = await getInstallationToken(link.installationId);
  if (!token) {
    return NextResponse.json({ skipped: true, reason: "no token" });
  }

  const repo = link.repo ?? DEFAULT_JOURNAL_REPO;
  const { module, lesson } = found;
  const language = lessonLanguage(lesson, module);
  const lessonUrl = `${SITE.url}/learn/${module.slug}/${lesson.slug}`;

  // 1) The solution file.
  const path = solutionPath(module.slug, lesson.slug, language);
  const solutionOk = await commitFile({
    token,
    owner,
    repo,
    path,
    content: renderSolutionFile({
      lessonTitle: lesson.title,
      courseTitle: module.title,
      language,
      code,
      lessonUrl,
      siteName: SITE.name,
    }),
    message: `Solve: ${lesson.title} (${module.title})`,
  });

  // 2) The progress README — include the just-completed lesson even if the
  // client hasn't synced it to the profile yet.
  const completedSet = new Set(link.completed);
  completedSet.add(`${module.slug}/${lesson.slug}`);

  let completedCount = 0;
  const courses: CourseProgress[] = [];
  for (const m of MODULES) {
    const done = m.lessons.filter((l) =>
      completedSet.has(`${m.slug}/${l.slug}`),
    ).length;
    completedCount += done;
    if (done > 0) {
      courses.push({
        title: m.title,
        emoji: m.emoji,
        done,
        total: m.lessons.length,
      });
    }
  }

  const info = levelFromXp(link.xp);
  const readmeOk = await commitFile({
    token,
    owner,
    repo,
    path: "README.md",
    content: renderReadme({
      siteName: SITE.name,
      siteUrl: SITE.url,
      profileUrl: link.username ? `${SITE.url}/u/${link.username}` : null,
      level: info.level,
      rank: rankForLevel(info.level).name,
      xp: link.xp,
      streak: link.streak,
      completedCount,
      totalCount: totalLessons(),
      courses,
      updatedLabel: new Date().toISOString().slice(0, 10),
    }),
    message: `Update progress: ${completedCount} lessons completed`,
  });

  return NextResponse.json({
    ok: solutionOk && readmeOk,
    owner,
    repo,
    committed: [path, "README.md"],
  });
}
