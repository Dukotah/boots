import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Layers, Clock, Target, Shield } from "lucide-react";
import { getPath, pathModules, pathStats, PATHS } from "@/lib/paths";
import { lessonId } from "@/lib/curriculum";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PathRooms, type RoomModule } from "@/components/PathRooms";

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
      url: `/paths/${path.slug}`,
    },
  };
}

const DIFF_COLOR: Record<string, string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-400",
  Advanced: "text-red-400",
};

const DIFF_DOT: Record<string, string> = {
  Beginner: "bg-emerald-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-red-400",
};

export default function PathPage({ params }: { params: { slug: string } }) {
  const path = getPath(params.slug);
  if (!path) notFound();

  const mods = pathModules(path);
  const stats = pathStats(path);
  const estHours = Math.max(1, Math.round((stats.lessons * 12) / 60));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: path.title,
    description: path.description,
    itemListElement: mods.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.title,
      url: absoluteUrl(`/learn/${m.slug}`),
    })),
  };

  const rooms: RoomModule[] = mods.map((m) => ({
    slug: m.slug,
    title: m.title,
    emoji: m.emoji,
    description: m.description,
    difficulty: path.difficulty,
    language: m.language,
    xp: m.lessons.reduce((s, l) => s + l.xp, 0),
    lessonIds: m.lessons.map((l) => lessonId(m.slug, l.slug)),
  }));

  return (
    <div className="min-h-screen bg-canvas">
      <JsonLd data={itemList} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Career paths", path: "/paths" },
          { name: path.title, path: `/paths/${path.slug}` },
        ])}
      />

      {/* Hero banner */}
      <div className={`border-b border-line bg-gradient-to-br ${path.gradient}`}>
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link href="/paths" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← All paths
          </Link>

          <div className="mt-4 flex items-start gap-5">
            <span className="text-6xl drop-shadow-lg">{path.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`flex items-center gap-1.5 text-sm font-semibold ${DIFF_COLOR[path.difficulty]}`}>
                  <span className={`h-2 w-2 rounded-full ${DIFF_DOT[path.difficulty]}`} />
                  {path.difficulty}
                </span>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-sm text-gray-300">{path.role}</span>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{path.title}</h1>
              <p className="mt-2 text-gray-300 max-w-2xl">{path.description}</p>

              {/* Stats row */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Layers size={14} />
                  {stats.modules} modules
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield size={14} />
                  {stats.lessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  ~{estHours}h estimated
                </span>
                <span className="flex items-center gap-1.5 text-accent-soft font-semibold">
                  ⚡ {stats.xp} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main: rooms */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-white">
              Modules — {stats.modules} rooms
            </h2>
            <PathRooms modules={rooms} pathSlug={path.slug} pathGradient={path.gradient} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* What you'll learn */}
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <Target size={15} className="text-accent-soft" />
                What you&apos;ll be able to do
              </h3>
              <ul className="space-y-2">
                {path.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check size={14} className="mt-0.5 shrink-0 text-success" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Path details */}
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Path details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Difficulty</dt>
                  <dd className={`font-medium ${DIFF_COLOR[path.difficulty]}`}>{path.difficulty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Modules</dt>
                  <dd className="text-gray-300">{stats.modules}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Lessons</dt>
                  <dd className="text-gray-300">{stats.lessons}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Est. time</dt>
                  <dd className="text-gray-300">~{estHours}h</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Total XP</dt>
                  <dd className="text-accent-soft font-semibold">⚡ {stats.xp}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Role</dt>
                  <dd className="text-gray-300 text-right">{path.role}</dd>
                </div>
              </dl>
            </div>

            {/* Related paths nudge */}
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Explore paths</h3>
              <Link
                href="/paths"
                className="block w-full text-center rounded-lg border border-line py-2 text-sm text-gray-400 hover:text-white hover:border-accent/40 transition-colors"
              >
                Browse all paths →
              </Link>
              <Link
                href="/skill-tree"
                className="mt-2 block w-full text-center rounded-lg border border-line py-2 text-sm text-gray-400 hover:text-white hover:border-accent/40 transition-colors"
              >
                View skill tree 🌳
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
