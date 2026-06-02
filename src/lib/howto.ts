// Programmatic-SEO layer: derive a public "how to X" solution page for every
// eligible code lesson in the curriculum. Pure data over MODULES — no React.
//
// "Eligible" = a code lesson (kind !== "quiz") that has a reference `solution`.
// Quiz lessons (e.g. Digital Safety) and any solution-less lessons are skipped.
// Languages in play are js / py / sql (there is no "html" language), so the
// language guard is a no-op today but keeps the intent explicit for the future.
import { MODULES } from "./curriculum";
import { lessonLanguage, langMeta } from "./curriculum/lang";

export type Howto = {
  slug: string;
  title: string;
  moduleSlug: string;
  lessonSlug: string;
  language: string;
  lessonTitle: string;
  blurb: string;
};

/** Lowercase only the first character, leaving acronyms like "JSON" intact. */
function lowercaseFirst(s: string): string {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

/**
 * Build a how-to entry for every eligible lesson, in MODULES order (deterministic).
 * Slug = `${moduleSlug}-${lessonSlug}`, which is already unique because lesson
 * slugs are unique within a module and module slugs are globally unique.
 */
export function getHowtos(): Howto[] {
  const out: Howto[] = [];
  for (const module of MODULES) {
    for (const lesson of module.lessons) {
      // Only code lessons with a reference solution become how-to pages.
      if (lesson.kind === "quiz") continue;
      if (!lesson.solution) continue;

      const lang = lessonLanguage(lesson, module);
      // Guard against any non-runtime language slipping in (e.g. a future "html").
      if (lang !== "js" && lang !== "py" && lang !== "sql") continue;

      const langLabel = langMeta(lang).label;
      out.push({
        slug: `${module.slug}-${lesson.slug}`,
        title: `How to ${lowercaseFirst(lesson.title)} in ${langLabel}`,
        moduleSlug: module.slug,
        lessonSlug: lesson.slug,
        language: langLabel,
        lessonTitle: lesson.title,
        blurb: lesson.blurb,
      });
    }
  }
  return out;
}

export function getHowto(slug: string): Howto | undefined {
  return getHowtos().find((h) => h.slug === slug);
}
