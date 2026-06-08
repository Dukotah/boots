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
    educationalCredentialAwarded: `${module.title} Certificate of Completion`,
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

/** WebSite schema with SearchAction — enables Google's sitelinks search box. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/how-to?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization schema — tells Google about the brand entity. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    sameAs: [`https://twitter.com/${SITE.twitter.replace(/^@/, "")}`],
  };
}

/**
 * An FAQPage rich-result. Powers Google FAQ rich snippets AND helps answer-engines
 * (AI Overviews / ChatGPT search) cite the page — high-value for our blog posts,
 * which already end with a "Frequently asked questions" section.
 */
export function faqJsonLd(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * An ItemList of the courses in a career path — gives a path page structured data
 * describing its ordered curriculum (good for rich results + topical authority).
 */
export function pathItemListJsonLd(
  path: { slug: string; title: string },
  modules: { slug: string; title: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${path.title} — course path`,
    url: absoluteUrl(`/paths/${path.slug}`),
    numberOfItems: modules.length,
    itemListElement: modules.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.title,
      url: absoluteUrl(`/learn/${m.slug}`),
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
