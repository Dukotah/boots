import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Swords } from "lucide-react";
import { getModule, MODULES } from "@/lib/curriculum";
import { langMeta } from "@/lib/curriculum/lang";
import { TRACKS } from "@/lib/curriculum/tracks";
import { trackBossForTrack } from "@/lib/curriculum/track-bosses";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { LessonList } from "./LessonList";

/** Resolve the track boss (if any) reachable from this module's track. */
function bossForModule(slug: string) {
  const track = TRACKS.find((t) => t.modules.includes(slug));
  return track ? trackBossForTrack(track.id) : undefined;
}

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
  const title = module.title;
  return {
    title,
    description: module.tagline,
    keywords: module.keywords,
    alternates: { canonical: `/learn/${module.slug}` },
    openGraph: {
      type: "website",
      title: `${title} — Cantrip`,
      description: module.tagline,
      url: absoluteUrl(`/learn/${module.slug}`),
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(module.tagline)}`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(module.tagline)}`)],
    },
  };
}

export default function ModulePage({
  params,
}: {
  params: { module: string };
}) {
  const module = getModule(params.module);
  if (!module) notFound();

  const lang = langMeta(module.language ?? "js");
  const quizOnly = module.lessons.every((l) => l.kind === "quiz");
  const boss = bossForModule(module.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={courseJsonLd(module)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
          { name: module.title, path: `/learn/${module.slug}` },
        ])}
      />
      <Link href="/learn" className="text-sm text-accent-soft hover:underline">
        ← All courses
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl">{module.emoji}</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">{module.title}</h1>
            {module.free ? (
              <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                Free
              </span>
            ) : !quizOnly ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-gray-300">
                {lang.label}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-gray-400">{module.description}</p>
        </div>
      </div>

      {boss && (
        <Link
          href={`/boss/track/${boss.id}`}
          className="group mt-6 flex items-center gap-4 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 to-transparent p-4 transition-colors hover:border-rose-500/60 hover:from-rose-500/15"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-rose-500/15 text-2xl">
            {boss.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                <Swords size={11} /> Boss Fight
              </span>
              <h2 className="truncate text-sm font-bold text-white">
                {boss.name}
              </h2>
            </div>
            <p className="mt-0.5 truncate text-xs text-gray-400">
              A timed gauntlet of {boss.tasks.length} trials from this track ·{" "}
              {boss.rewardGold} gold
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-rose-300 transition-transform group-hover:translate-x-0.5">
            Fight →
          </span>
        </Link>
      )}

      <LessonList module={module} />
    </div>
  );
}
