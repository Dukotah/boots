import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, MODULES } from "@/lib/curriculum";
import { LessonView } from "@/components/LessonView";

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
  return {
    title: `${found.lesson.title} — ${found.module.title} | Boots`,
    description: found.lesson.blurb,
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

  return <LessonView module={module} lesson={lesson} nextHref={nextHref} />;
}
