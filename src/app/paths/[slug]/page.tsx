import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getPath, pathModules, PATHS } from "@/lib/paths";
import { langMeta } from "@/lib/curriculum/lang";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

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

export default function PathPage({ params }: { params: { slug: string } }) {
  const path = getPath(params.slug);
  if (!path) notFound();

  const mods = pathModules(path);
  const lessons = mods.reduce((s, m) => s + m.lessons.length, 0);

  // ItemList structured data — the ordered course sequence.
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={itemList} />
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
      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl">{path.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{path.title}</h1>
          <p className="mt-1 text-gray-400">{path.description}</p>
          <p className="mt-1 text-xs text-gray-500">
            {mods.length} courses · {lessons} lessons
          </p>
        </div>
      </div>

      <ol className="mt-8 space-y-3">
        {mods.map((m, i) => (
          <li key={m.slug}>
            <Link
              href={`/learn/${m.slug}`}
              className="card flex items-center gap-4 hover:border-accent/60"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-accent-soft">
                {i + 1}
              </span>
              <span className="text-2xl">{m.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{m.title}</p>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
                    {langMeta(m.language ?? "js").label}
                  </span>
                </div>
                <p className="truncate text-sm text-gray-400">{m.tagline}</p>
              </div>
              <span className="text-xs text-gray-500">{m.lessons.length}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-center">
        {mods[0] && (
          <Link href={`/learn/${mods[0].slug}`} className="btn-primary">
            Start the path <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
