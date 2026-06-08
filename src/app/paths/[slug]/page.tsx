import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Layers, Clock, Target } from "lucide-react";
import { getPath, pathModules, pathStats, pathSkillTags, PATHS } from "@/lib/paths";
import { lessonId } from "@/lib/curriculum";
import { breadcrumbJsonLd, pathItemListJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PathRoadmap, type RoadmapModule } from "@/components/PathRoadmap";

export function generateStaticParams() {
  return PATHS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const path = getPath(params.slug);
  if (!path) return {};
  return {
    title: path.title,
    description: path.description,
    keywords: path.keywords,
    alternates: { canonical: `/paths/${path.slug}` },
    openGraph: {
      type: "website",
      title: `${path.title} — Cantrip`,
      description: path.description,
      url: absoluteUrl(`/paths/${path.slug}`),
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(path.title)}&subtitle=${encodeURIComponent(path.description)}`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(path.title)}&subtitle=${encodeURIComponent(path.description)}`)],
    },
  };
}

const DIFF_COLOR: Record<string, string> = {
  Beginner: "text-success",
  Intermediate: "text-gold",
  Advanced: "text-danger",
};

export default function PathPage({ params }: { params: { slug: string } }) {
  const path = getPath(params.slug);
  if (!path) notFound();

  const mods = pathModules(path);
  const stats = pathStats(path);
  // ~12 min/lesson, rounded to the nearest 5 hours (min 5).
  const estHours = Math.max(
    5,
    Math.round((stats.lessons * 12) / 60 / 5) * 5,
  );
  const skills = pathSkillTags(path);

  // Serializable shape for the client roadmap (progress comes from the store).
  const roadmap: RoadmapModule[] = mods.map((m) => ({
    slug: m.slug,
    title: m.title,
    emoji: m.emoji,
    description: m.description,
    xp: m.lessons.reduce((s, l) => s + l.xp, 0),
    lessonIds: m.lessons.map((l) => lessonId(m.slug, l.slug)),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={pathItemListJsonLd(path, mods)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Career paths", path: "/paths" },
          { name: path.title, path: `/paths/${path.slug}` },
        ])}
      />
      <Link href="/paths" className="text-sm text-accent-soft hover:underline">
        ← All paths
      </Link>

      {/* Header */}
      <div className={`card mt-4 bg-gradient-to-br ${path.gradient}`}>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{path.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold text-white">{path.title}</h1>
            <p className="mt-1 text-gray-200">{path.description}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-200">
          <span className={`font-semibold ${DIFF_COLOR[path.difficulty]}`}>
            {path.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Layers size={14} /> {stats.modules} courses · {stats.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> ~{estHours}h
          </span>
          <span className="flex items-center gap-1 text-accent-soft">
            ⚡ {stats.xp} XP
          </span>
        </div>
      </div>

      {/* Outcomes */}
      <section className="mt-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Target size={18} className="text-accent-soft" /> What you&apos;ll be able to do
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {path.outcomes.map((o) => (
            <li
              key={o}
              className="flex items-start gap-2 rounded-lg border border-line bg-surface p-3 text-sm text-gray-300"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-success" />
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* Roadmap */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          The roadmap <span className="text-sm font-normal text-gray-500">— complete each quest in order</span>
        </h2>
        <PathRoadmap
          modules={roadmap}
          pathSlug={path.slug}
          skills={skills}
          estHours={estHours}
        />
      </section>
    </div>
  );
}
