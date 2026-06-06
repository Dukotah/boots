import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHowtos, getHowto } from "@/lib/howto";
import { getLesson } from "@/lib/curriculum";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return getHowtos().map((h) => ({ slug: h.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const h = getHowto(params.slug);
  if (!h) return {};
  const description = `${h.blurb} See the ${h.language} solution with a step-by-step explanation and a live, interactive lesson on Cantrip.`;
  return {
    title: h.title,
    description,
    keywords: [
      h.title.toLowerCase(),
      `${h.lessonTitle.toLowerCase()} ${h.language.toLowerCase()}`,
      `${h.language.toLowerCase()} solution`,
      `how to ${h.lessonTitle.toLowerCase()}`,
    ],
    alternates: { canonical: `/how-to/${h.slug}` },
    openGraph: {
      type: "article",
      title: `${h.title} | Cantrip`,
      description,
      url: absoluteUrl(`/how-to/${h.slug}`),
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(h.title)}&subtitle=${encodeURIComponent(h.blurb)}`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(h.title)}&subtitle=${encodeURIComponent(h.blurb)}`)],
    },
  };
}

export default function HowToPage({ params }: { params: { slug: string } }) {
  const h = getHowto(params.slug);
  if (!h) notFound();

  const found = getLesson(h.moduleSlug, h.lessonSlug);
  if (!found) notFound();
  const { lesson } = found;

  const lessonPath = `/learn/${h.moduleSlug}/${h.lessonSlug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How-to", path: "/how-to" },
          { name: h.title, path: `/how-to/${h.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: h.title,
          description: h.blurb,
          url: absoluteUrl(`/how-to/${h.slug}`),
          inLanguage: "en",
          step: [
            {
              "@type": "HowToStep",
              name: "The solution",
              text: lesson.solution,
              url: absoluteUrl(`/how-to/${h.slug}`),
            },
            {
              "@type": "HowToStep",
              name: "Practice it hands-on",
              text: "Run the solution and get it auto-graded in the interactive lesson.",
              url: absoluteUrl(lessonPath),
            },
          ],
        }}
      />

      <Link href="/how-to" className="text-sm text-accent-soft hover:underline">
        ← All how-to guides
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
        {h.title}
      </h1>
      <p className="mt-3 text-gray-400">{h.blurb}</p>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">The solution</h2>
          <span className="rounded-md border border-line px-2 py-0.5 text-xs font-medium text-gray-400">
            {h.language}
          </span>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-line bg-black/40 p-4">
          <code className="font-mono text-sm text-accent-soft">
            {lesson.solution}
          </code>
        </pre>
      </section>

      {lesson.explanation && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Why it works</h2>
          <p className="mt-3 whitespace-pre-wrap text-gray-300">
            {lesson.explanation}
          </p>
        </section>
      )}

      <div className="card mt-10 border-accent/30 bg-accent/10 text-center">
        <p className="text-sm text-gray-200">
          Practice this hands-on — run it and get it auto-graded with a live,
          interactive {h.language} lesson on Cantrip.
        </p>
        <Link href={lessonPath} className="btn-primary mx-auto mt-4 w-fit">
          Open the interactive lesson
        </Link>
      </div>
    </div>
  );
}
