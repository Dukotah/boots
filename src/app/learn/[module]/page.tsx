import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule, MODULES } from "@/lib/curriculum";
import { LessonList } from "./LessonList";

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { module: string };
}): Metadata {
  const module = getModule(params.module);
  if (!module) return {};
  return {
    title: `${module.title} | Boots`,
    description: module.tagline,
  };
}

export default function ModulePage({
  params,
}: {
  params: { module: string };
}) {
  const module = getModule(params.module);
  if (!module) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/learn" className="text-sm text-accent-soft hover:underline">
        ← All courses
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl">{module.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{module.title}</h1>
          <p className="mt-1 text-gray-400">{module.description}</p>
        </div>
      </div>

      <LessonList module={module} />
    </div>
  );
}
