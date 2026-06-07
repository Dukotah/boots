// Derives "breadth" metrics from the flat list of completed lesson ids
// ("moduleSlug/lessonSlug") by looking each one up against the curriculum.
// Kept separate from the achievement catalog so the catalog stays a pure
// predicate over PlayerStats — this file owns the curriculum coupling.

import { getCatalogModule } from "@/lib/curriculum/catalogClient";

export type BreadthStats = {
  /** Distinct lesson languages completed (e.g. ["js", "py", "sql"]). */
  languages: string[];
  /** Slugs of modules fully completed (every lesson done). */
  completedModules: string[];
  /** Number of distinct modules touched (≥1 lesson). */
  modulesTouched: number;
};

/**
 * Roll up completed lesson ids into breadth metrics. Unknown ids (e.g. lessons
 * that were renamed/removed) are skipped so stale localStorage never throws.
 */
export function deriveBreadth(completedIds: string[]): BreadthStats {
  const languages = new Set<string>();
  const doneByModule = new Map<string, Set<string>>();

  for (const id of completedIds) {
    const slash = id.indexOf("/");
    if (slash === -1) continue;
    const moduleSlug = id.slice(0, slash);
    const lessonSlug = id.slice(slash + 1);

    const module = getCatalogModule(moduleSlug);
    if (!module) continue;
    const lesson = module.lessons.find((l) => l.slug === lessonSlug);
    if (!lesson) continue;

    languages.add(lesson.language);

    let done = doneByModule.get(moduleSlug);
    if (!done) {
      done = new Set();
      doneByModule.set(moduleSlug, done);
    }
    done.add(lessonSlug);
  }

  const completedModules: string[] = [];
  for (const slug of Array.from(doneByModule.keys())) {
    const done = doneByModule.get(slug)!;
    const module = getCatalogModule(slug);
    if (module && done.size >= module.lessonCount) completedModules.push(slug);
  }

  return {
    languages: Array.from(languages),
    completedModules,
    modulesTouched: doneByModule.size,
  };
}
