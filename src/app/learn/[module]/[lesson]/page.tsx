import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, MODULES } from "@/lib/curriculum";
import { lessonJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LessonView } from "@/components/LessonView";
import { QuizView } from "@/components/QuizView";

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
  if (!found) notFound();

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
      ) : (
        <LessonView module={module} lesson={lesson} nextHref={nextHref} />
      )}
    </>
  );
}
