// Project detail / landing page. Statically generated at build time from
// allProjects() slugs. Server component — no client JS needed here.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Code2, Layers, Tag, Zap } from "lucide-react";

import { allProjects, type Difficulty } from "@/lib/projects";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

// ── Static-param generation ───────────────────────────────────────────────────
// One route per project slug, derived from the catalog at build time.
export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: p.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = allProjects().find((p) => p.slug === params.slug);
  if (!project) return {};

  const title = `${project.title} — ${project.domain} Project`;
  const description = project.blurb;
  const path = `/projects/${project.slug}`;
  const ogImageUrl = absoluteUrl(
    `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.demonstrates)}`,
  );

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${title} | ${SITE.name}`,
      description,
      url: absoluteUrl(path),
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}

// ── Styling helpers ───────────────────────────────────────────────────────────
const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: "border-success/30 bg-success/10 text-success",
  Intermediate: "border-accent/30 bg-accent/10 text-accent-soft",
  Advanced: "border-danger/30 bg-danger/10 text-danger",
};

// Rough effort estimates keyed by difficulty.
const EFFORT_LABEL: Record<Difficulty, string> = {
  Beginner: "1–2 hours",
  Intermediate: "2–4 hours",
  Advanced: "4–8 hours",
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = allProjects().find((p) => p.slug === params.slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;

  // Schema.org: LearningResource + BreadcrumbList
  const learningResourceLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: project.title,
    description: project.blurb,
    url: absoluteUrl(path),
    learningResourceType: "Project",
    educationalUse: "practice",
    inLanguage: "en",
    teaches: project.demonstrates,
    educationalLevel: project.difficulty,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path },
  ]);

  return (
    <>
      <JsonLd data={learningResourceLd} />
      <JsonLd data={breadcrumbLd} />

      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/projects"
                className="hover:text-gray-300 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-gray-300 truncate max-w-[12rem]" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-soft transition-colors"
          aria-label="Back to Projects hub"
        >
          <ArrowLeft size={14} aria-hidden />
          All Projects
        </Link>

        {/* Header */}
        <header className="mt-4">
          {/* Difficulty + domain badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLES[project.difficulty]}`}
            >
              {project.difficulty}
            </span>
            <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-gray-400">
              {project.domain}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight">
            {project.title}
          </h1>

          {/* XP reward */}
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gold">
            <Zap size={14} aria-hidden />
            +{project.xp} XP on completion
          </p>
        </header>

        {/* Blurb */}
        <section className="mt-6" aria-label="Project description">
          <p className="text-gray-300 leading-relaxed text-base">
            {project.blurb}
          </p>
        </section>

        {/* Meta grid */}
        <section
          className="mt-8 grid gap-4 sm:grid-cols-2"
          aria-label="Project details"
        >
          {/* What it demonstrates */}
          <div className="card flex flex-col gap-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Layers size={12} aria-hidden />
              What you prove
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              {project.demonstrates}
            </p>
          </div>

          {/* Language + est effort */}
          <div className="card flex flex-col gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                <Code2 size={12} aria-hidden />
                Language
              </p>
              <p className="text-sm text-gray-200">{project.language}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Est. effort
              </p>
              <p className="text-sm text-gray-200">
                {EFFORT_LABEL[project.difficulty]}
              </p>
            </div>
          </div>
        </section>

        {/* Tags */}
        {project.tags.length > 0 && (
          <section className="mt-6" aria-label="Tags">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              <Tag size={12} aria-hidden />
              Skills covered
            </p>
            <ul className="flex flex-wrap gap-2" role="list">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-gray-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="mt-10">
          <Link
            href={project.href}
            className="btn-primary w-full justify-center py-3 text-base sm:w-auto sm:min-w-[14rem]"
          >
            Start building
            <ArrowRight size={16} aria-hidden />
          </Link>
          <p className="mt-3 text-xs text-gray-500">
            Guided build with step-by-step instructions and auto-graded tests.
          </p>
        </div>
      </main>
    </>
  );
}
