import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCheatsheet, CHEATSHEETS } from "@/lib/cheatsheets";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return CHEATSHEETS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = getCheatsheet(params.slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: `/cheatsheet/${c.slug}` },
    openGraph: {
      type: "article",
      title: `${c.title} | Cantrip`,
      description: c.description,
      url: absoluteUrl(`/cheatsheet/${c.slug}`),
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(c.title)}&subtitle=${encodeURIComponent(c.description)}`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(c.title)}&subtitle=${encodeURIComponent(c.description)}`)],
    },
  };
}

export default function CheatsheetPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCheatsheet(params.slug);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cheat sheets", path: "/cheatsheet" },
          { name: c.title, path: `/cheatsheet/${c.slug}` },
        ])}
      />
      <Link href="/cheatsheet" className="text-sm text-accent-soft hover:underline">
        ← All cheat sheets
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-5xl">{c.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{c.title}</h1>
          <p className="mt-1 text-gray-400">{c.description}</p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {c.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-xl font-semibold text-white">
              {section.title}
            </h2>
            <div className="overflow-hidden rounded-xl border border-line">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="grid gap-1 border-b border-line/60 px-4 py-3 last:border-b-0 sm:grid-cols-2 sm:gap-4"
                >
                  <code className="whitespace-pre-wrap break-words font-mono text-sm text-accent-soft">
                    {item.code}
                  </code>
                  <span className="text-sm text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-5 text-center">
        <p className="text-sm text-gray-200">
          Reading is good — doing is better. Practice {c.language} with
          interactive, auto-graded lessons.
        </p>
        <Link href="/learn" className="btn-primary mx-auto mt-3 w-fit">
          Start learning {c.language}
        </Link>
      </div>
    </div>
  );
}
