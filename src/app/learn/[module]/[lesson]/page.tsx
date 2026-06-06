import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, getModule, MODULES } from "@/lib/curriculum";
import { lessonJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LessonView } from "@/components/LessonView";
import { QuizView } from "@/components/QuizView";
import { HtmlLessonView } from "@/components/HtmlLessonView";
import { lessonLanguage } from "@/lib/curriculum/lang";

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ module: m.slug, lesson: l.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { module: string; lesson: string };
}): Metadata {
  const found = getLesson(params.module, params.lesson);
  if (!found) return {};
  const { module, lesson } = found;
  const title = `${lesson.title} — ${module.title}`;
  const path = `/learn/${module.slug}/${lesson.slug}`;
  return {
    title,
    description: lesson.blurb,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${title} | Cantrip`,
      description: lesson.blurb,
      url: path,
    },
  };
}

export default function LessonPage({
  params,
}: {
  params: { module: string; lesson: string };
}) {
  const found = getLesson(params.module, params.lesson);
  if (!found) {
    // Resilience: a purely-numeric segment (e.g. /learn/javascript/1 or /01)
    // is treated as a 1-based index into the module's lessons and permanently
    // redirected to its canonical slug URL. Out-of-range → notFound().
    if (/^\d+$/.test(params.lesson)) {
      const module = getModule(params.module);
      const n = Number(params.lesson);
      const target = module && n >= 1 ? module.lessons[n - 1] : undefined;
      if (target) {
        permanentRedirect(`/learn/${module!.slug}/${target.slug}`);
      }
    }
    notFound();
  }

  const { module, lesson, index } = found;
  const next = module.lessons[index + 1];
  const nextHref = next ? `/learn/${module.slug}/${next.slug}` : null;

  return (
    <>
      <JsonLd data={lessonJsonLd(module, lesson)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
          { name: module.title, path: `/learn/${module.slug}` },
          { name: lesson.title, path: `/learn/${module.slug}/${lesson.slug}` },
        ])}
      />
      {lesson.kind === "quiz" ? (
        <QuizView module={module} lesson={lesson} nextHref={nextHref} />
      ) : lessonLanguage(lesson, module) === "html" ? (
        <HtmlLessonView module={module} lesson={lesson} nextHref={nextHref} />
      ) : (
        <LessonView module={module} lesson={lesson} nextHref={nextHref} />
      )}
    </>
  );
}
