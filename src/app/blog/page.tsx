import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — Learn to Code Guides & Tips",
  description:
    "Practical, no-hype guides on learning to code: beginner roadmaps, language comparisons, project ideas, interview prep, and digital-safety tips.",
  keywords: [
    "learn to code blog",
    "coding for beginners",
    "how to learn programming",
    "coding tips",
  ],
  alternates: { canonical: "/blog" },
};

// Render newest posts first. POSTS uses fixed ISO dates, so this sort is stable.
const sortedPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Blog</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Practical, no-hype guides on learning to code — beginner roadmaps,
        language comparisons, project ideas, and more. Then put it into practice
        with free interactive lessons.
      </p>

      <div className="mt-8 grid gap-4">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card group transition-transform hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">{post.title}</h2>
            <p className="mt-1 text-sm text-gray-300">{post.description}</p>
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
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-soft">
              Read article <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
