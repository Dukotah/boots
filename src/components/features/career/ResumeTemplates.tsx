"use client";

/**
 * ResumeTemplates.tsx
 *
 * Three print-friendly résumé templates + a picker that lets the user switch
 * between them with local state.  Drop in on the career page:
 *
 *   import { ResumeTemplatePicker } from "@/components/features/career/ResumeTemplates";
 *   <ResumeTemplatePicker resume={resume} />
 *
 * The picker renders inside `.resume-sheet` so it inherits the existing
 * career-print.css rules (white background, no border/shadow, full width).
 * The `print:hidden` tab-bar is suppressed on print — only the chosen sheet
 * is emitted.
 */

import { useState } from "react";
import type { ResumeData } from "@/lib/career";

// ─────────────────────────────────────────────────────────────────────────────
// Shared section wrapper (used by every template)
// ─────────────────────────────────────────────────────────────────────────────

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h3
        className="mb-2 text-xs font-bold uppercase tracking-[0.15em]"
        style={{ color: accent }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 1 — Classic
// Traditional single-column layout; clean header bar, serif-inspired weight.
// Mirrors the existing career page sheet closely so existing print styles apply.
// ─────────────────────────────────────────────────────────────────────────────

export function ClassicTemplate({ resume }: { resume: ResumeData }) {
  const accent = "#4c1d95"; // accent-deep (matches career-print.css override)

  return (
    <article className="resume-sheet rounded-2xl border border-line bg-white p-8 text-gray-900 shadow-glow print:border-0 print:shadow-none sm:p-10">
      {/* Header */}
      <header className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {resume.name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-gray-500">
          {resume.headline}
        </p>
      </header>

      {/* Summary */}
      <p className="mt-4 text-sm leading-relaxed text-gray-700">
        {resume.summary}
      </p>

      {/* Skills */}
      {resume.skills.length > 0 && (
        <Section title="Skills" accent={accent}>
          <p className="text-sm text-gray-700">{resume.skills.join(" · ")}</p>
        </Section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <Section title="Projects" accent={accent}>
          <ul className="space-y-1.5">
            {resume.projects.map((p) => (
              <li key={p.title} className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{p.title}</span>{" "}
                — {p.demonstrates}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Certifications */}
      {resume.credentials.length > 0 && (
        <Section title="Certifications" accent={accent}>
          <ul className="space-y-1.5">
            {resume.credentials.map((c) => (
              <li key={c.pathSlug} className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{c.title}</span>{" "}
                — {c.role} · {c.lessons} lessons
                <span className="ml-1 font-mono text-xs text-gray-500">
                  ({c.code})
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Courses */}
      {resume.courses.length > 0 && (
        <Section title="Completed Courses" accent={accent}>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-gray-700 sm:grid-cols-2">
            {resume.courses.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Highlights */}
      <Section title="Highlights" accent={accent}>
        <ul className="space-y-1 text-sm text-gray-700">
          {resume.highlights.map((h) => (
            <li key={h}>• {h}</li>
          ))}
        </ul>
      </Section>

      {/* Footer */}
      <p className="mt-6 border-t border-gray-200 pt-3 text-xs text-gray-400">
        Generated from Cantrip learning progress · cantrip.dev
      </p>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 2 — Modern
// Two-column layout: a narrow left sidebar (name / skills / highlights) and a
// wider right column for the narrative content. Bold left-border section dividers.
// ─────────────────────────────────────────────────────────────────────────────

export function ModernTemplate({ resume }: { resume: ResumeData }) {
  const accent = "#7c3aed"; // vivid violet — pops more on white in print

  return (
    <article className="resume-sheet rounded-2xl border border-line bg-white shadow-glow print:border-0 print:shadow-none">
      {/* Full-bleed accent header bar */}
      <header
        className="rounded-t-2xl px-8 py-6 print:rounded-none"
        style={{ background: accent }}
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          {resume.name}
        </h2>
        <p className="mt-0.5 text-sm font-medium text-purple-200">
          {resume.headline}
        </p>
      </header>

      {/* Two-column body */}
      <div className="flex flex-col sm:flex-row print:flex-row">
        {/* ── Sidebar ── */}
        <aside
          className="w-full shrink-0 px-6 py-6 sm:w-52 print:w-52"
          style={{ background: "#f5f3ff" /* purple-50 equivalent */ }}
        >
          {resume.skills.length > 0 && (
            <div className="mb-5">
              <p
                className="mb-2 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Skills
              </p>
              <ul className="space-y-1">
                {resume.skills.map((s) => (
                  <li key={s} className="text-xs font-medium text-gray-700">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: accent }}
            >
              Highlights
            </p>
            <ul className="space-y-1.5">
              {resume.highlights.map((h) => (
                <li key={h} className="text-[11px] leading-snug text-gray-600">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main column ── */}
        <main className="flex-1 px-7 py-6">
          {/* Summary */}
          <p className="text-sm leading-relaxed text-gray-700">{resume.summary}</p>

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div className="mt-5">
              <h3
                className="mb-3 border-l-4 pl-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: accent, borderColor: accent }}
              >
                Projects
              </h3>
              <ul className="space-y-2">
                {resume.projects.map((p) => (
                  <li key={p.title} className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{p.title}</span>{" "}
                    — {p.demonstrates}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {resume.credentials.length > 0 && (
            <div className="mt-5">
              <h3
                className="mb-3 border-l-4 pl-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: accent, borderColor: accent }}
              >
                Certifications
              </h3>
              <ul className="space-y-2">
                {resume.credentials.map((c) => (
                  <li key={c.pathSlug} className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{c.title}</span>{" "}
                    — {c.role} · {c.lessons} lessons
                    <span className="ml-1 font-mono text-xs text-gray-400">
                      ({c.code})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Courses */}
          {resume.courses.length > 0 && (
            <div className="mt-5">
              <h3
                className="mb-3 border-l-4 pl-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: accent, borderColor: accent }}
              >
                Completed Courses
              </h3>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-gray-700 sm:grid-cols-2 print:grid-cols-2">
                {resume.courses.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <p className="mt-6 border-t border-gray-100 pt-3 text-xs text-gray-400">
            Generated from Cantrip learning progress · cantrip.dev
          </p>
        </main>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 3 — Compact
// Dense single-column, tighter spacing, smaller type. Best for candidates with
// lots of courses/projects who need everything on one page.
// ─────────────────────────────────────────────────────────────────────────────

export function CompactTemplate({ resume }: { resume: ResumeData }) {
  const accent = "#0f766e"; // teal-700 — distinguishes it from the other two

  return (
    <article className="resume-sheet rounded-2xl border border-line bg-white p-6 text-gray-900 shadow-glow print:border-0 print:shadow-none sm:p-8">
      {/* Header — name + headline inline */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 border-b-2 border-gray-900 pb-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {resume.name}
        </h2>
        <p className="text-xs font-semibold text-gray-500">{resume.headline}</p>
      </header>

      {/* Summary */}
      <p className="mt-3 text-xs leading-relaxed text-gray-700">
        {resume.summary}
      </p>

      {/* Skills — single horizontal line */}
      {resume.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap items-baseline gap-x-1">
          <span
            className="mr-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            Skills:
          </span>
          <span className="text-xs text-gray-700">
            {resume.skills.join(" · ")}
          </span>
        </div>
      )}

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-3">
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            Projects
          </p>
          <ul className="space-y-1">
            {resume.projects.map((p) => (
              <li key={p.title} className="text-xs text-gray-700">
                <span className="font-semibold text-gray-900">{p.title}</span> —{" "}
                {p.demonstrates}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {resume.credentials.length > 0 && (
        <div className="mb-3">
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            Certifications
          </p>
          <ul className="space-y-0.5">
            {resume.credentials.map((c) => (
              <li key={c.pathSlug} className="text-xs text-gray-700">
                <span className="font-semibold text-gray-900">{c.title}</span> —{" "}
                {c.role} · {c.lessons} lessons
                <span className="ml-1 font-mono text-[10px] text-gray-400">
                  ({c.code})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Courses — compact two-column grid */}
      {resume.courses.length > 0 && (
        <div className="mb-3">
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            Completed Courses
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-700 print:grid-cols-3 sm:grid-cols-3">
            {resume.courses.map((c) => (
              <li key={c} className="truncate">
                • {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Highlights — inline */}
      <div>
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: accent }}
        >
          Highlights
        </p>
        <p className="text-xs text-gray-700">
          {resume.highlights.join(" · ")}
        </p>
      </div>

      {/* Footer */}
      <p className="mt-4 border-t border-gray-100 pt-2 text-[10px] text-gray-400">
        Generated from Cantrip learning progress · cantrip.dev
      </p>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Template registry — add new entries here to grow the picker automatically
// ─────────────────────────────────────────────────────────────────────────────

type TemplateId = "classic" | "modern" | "compact";

const TEMPLATES: {
  id: TemplateId;
  label: string;
  description: string;
  Component: React.ComponentType<{ resume: ResumeData }>;
}[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Clean single-column, traditional layout",
    Component: ClassicTemplate,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Two-column with bold accent sidebar",
    Component: ModernTemplate,
  },
  {
    id: "compact",
    label: "Compact",
    description: "Dense layout — fits more on one page",
    Component: CompactTemplate,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ResumeTemplatePicker — the public export
//
// Props:
//   resume        — ResumeData from buildResume()
//   defaultTemplate? — which tab to open first (default: "classic")
//
// The tab bar is print:hidden so window.print() emits only the chosen sheet.
// ─────────────────────────────────────────────────────────────────────────────

export interface ResumeTemplatePickerProps {
  resume: ResumeData;
  defaultTemplate?: TemplateId;
}

export function ResumeTemplatePicker({
  resume,
  defaultTemplate = "classic",
}: ResumeTemplatePickerProps) {
  const [active, setActive] = useState<TemplateId>(defaultTemplate);

  const chosen = TEMPLATES.find((t) => t.id === active) ?? TEMPLATES[0];
  const { Component } = chosen;

  return (
    <div>
      {/* Template tab bar — hidden on print */}
      <div className="mb-4 flex flex-wrap gap-2 print:hidden">
        {TEMPLATES.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              aria-pressed={isActive}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "border-accent bg-accent/10 text-white"
                  : "border-line bg-surface-2 text-gray-400 hover:border-accent/50 hover:text-gray-200",
              ].join(" ")}
            >
              <span className="font-semibold">{t.label}</span>
              <span className="ml-1.5 hidden text-xs opacity-60 sm:inline">
                — {t.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chosen template — the only thing that prints */}
      <Component resume={resume} />
    </div>
  );
}
