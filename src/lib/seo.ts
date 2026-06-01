// Schema.org structured-data builders. These power Google rich results: a Course
// card per module and a breadcrumb trail per lesson. Pure data — rendered by the
// <JsonLd> component into static HTML.
import type { Module, Lesson } from "./curriculum/types";
import { langMeta } from "./curriculum/lang";
import { SITE, absoluteUrl } from "./site";

/** A Course rich-result for a module's landing page. */
export function courseJsonLd(module: Module): Record<string, unknown> {
  const lang = module.language ?? "js";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${module.title} — ${SITE.name}`,
    description: module.description,
    url: absoluteUrl(`/learn/${module.slug}`),
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    inLanguage: "en",
    teaches: module.tagline,
    educationalLevel: "Beginner",
    about: langMeta(lang).label,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.max(1, module.lessons.length * 15)}M`,
    },
    numberOfCredits: module.lessons.length,
  };
}

/** A breadcrumb trail Home → Courses → Module → Lesson. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** A LearningResource rich-result for an individual lesson. */
export function lessonJsonLd(
  module: Module,
  lesson: Lesson,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.blurb,
    url: absoluteUrl(`/learn/${module.slug}/${lesson.slug}`),
    learningResourceType: "Interactive coding exercise",
    educationalUse: "practice",
    inLanguage: "en",
    isPartOf: {
      "@type": "Course",
      name: module.title,
      url: absoluteUrl(`/learn/${module.slug}`),
    },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}
