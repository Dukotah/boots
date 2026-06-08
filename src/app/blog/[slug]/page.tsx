import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, POSTS } from "@/content/blog";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { parseFaqs } from "@/lib/faqParse";
import { relatedPosts } from "@/lib/relatedPosts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | ${SITE.name}`,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`)],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const faqs = parseFaqs(post.body);
  const related = relatedPosts(post, POSTS);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      <Link href="/blog" className="text-sm text-accent-soft hover:underline">
        ← All articles
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-0.5 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="prose-lesson mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-reads-heading" className="mt-12">
          <h2
            id="related-reads-heading"
            className="text-lg font-semibold text-white"
          >
            Related reads
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3" role="list">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="text-sm font-medium leading-snug text-white">
                    {r.title}
                  </span>
                  <span className="mt-2 line-clamp-2 text-xs text-gray-400">
                    {r.description}
                  </span>
                  <span className="mt-auto pt-3 text-xs text-gray-500">
                    {r.readingMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-5 text-center">
        <p className="text-sm text-gray-200">
          Ready to start? Learn to code free on Cantrip with interactive,
          auto-graded lessons.
        </p>
        <Link href="/learn" className="btn-primary mx-auto mt-3 w-fit">
          Start learning free
        </Link>
      </div>
    </article>
  );
}
