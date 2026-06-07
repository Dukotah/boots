"use client";

/**
 * CareerOnePager.tsx
 *
 * Recruiter-facing, print/share-optimised single-page career summary for the
 * current signed-in learner. Renders inside .resume-sheet so career-print.css
 * takes effect on window.print() / Save as PDF.
 *
 * Data flow: reads from the Zustand game store (same pattern as career/page.tsx),
 * derives ResumeData via buildResume(), and computes the readiness tier via
 * computeReadiness(). No new persistence or network calls.
 *
 * Public surface: <CareerOnePager /> — zero props, self-contained.
 */

import "../../../app/career/career-print.css";
import { useMemo, useState } from "react";
import { Award, Check, Copy, Link2, Printer, Star, Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { deriveBreadth } from "@/lib/progress";
import { buildResume, computeReadiness } from "@/lib/career";
import { absoluteUrl } from "@/lib/site";
import { PageSkeleton } from "@/components/PageSkeleton";
import type { PlayerStats } from "@/types/game";

// ── Accent colour (mirrors ClassicTemplate / career-print.css) ────────────────
const ACCENT = "#4c1d95";

// ── Small helper: labelled pill ───────────────────────────────────────────────
function Pill({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 print:border-gray-300"
      aria-label={label}
    >
      {label}
    </span>
  );
}

// ── Section heading (consistent with ResumeTemplates' Section component) ──────
function SectionHeading({ title }: { title: string }) {
  return (
    <h3
      className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ color: ACCENT }}
    >
      {title}
    </h3>
  );
}

// ── Readiness arc — compact SVG dial ─────────────────────────────────────────
function ReadinessDial({ score }: { score: number }) {
  const R = 36;
  const circ = 2 * Math.PI * R;
  const offset = circ * (1 - score / 100);
  return (
    <svg
      viewBox="0 0 88 88"
      width={88}
      height={88}
      className="-rotate-90"
      aria-hidden="true"
    >
      <circle
        cx={44}
        cy={44}
        r={R}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={9}
      />
      <circle
        cx={44}
        cy={44}
        r={R}
        fill="none"
        stroke={ACCENT}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        className="transition-all duration-700"
      />
    </svg>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function CareerOnePager() {
  const mounted = useMounted();

  // Store slices (individual selectors — no object selector, avoids re-renders)
  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const user = useGameStore((s) => s.user);

  const [copied, setCopied] = useState<"link" | "none">("none");
  const [copyErr, setCopyErr] = useState(false);

  // Reconstruct stats snapshot (same pattern as career/page.tsx)
  const stats: PlayerStats = useMemo(
    () => ({
      xp,
      level: levelFromXp(xp).level,
      gold,
      streak,
      completedCount: completed.length,
      completedIds: completed,
      ...deriveBreadth(completed),
    }),
    [xp, gold, streak, completed],
  );

  const displayName =
    user?.email?.split("@")[0] ?? "Cantrip Learner";

  const resume = useMemo(
    () => buildResume(stats, displayName),
    [stats, displayName],
  );

  const readiness = useMemo(() => computeReadiness(stats), [stats]);
  const levelInfo = useMemo(() => levelFromXp(xp), [xp]);

  // Copy the shareable URL to clipboard
  async function copyShareLink() {
    const url = absoluteUrl("/career/resume");
    try {
      await navigator.clipboard.writeText(url);
      setCopied("link");
      setTimeout(() => setCopied("none"), 2200);
    } catch {
      setCopyErr(true);
      setTimeout(() => setCopyErr(false), 2500);
    }
  }

  if (!mounted) {
    return <PageSkeleton maxW="max-w-3xl" rows={4} />;
  }

  const earnedCreds = resume.credentials;

  return (
    // career-print-root: the outer wrapper that career-print.css resets for print
    <div className="career-print-root mx-auto max-w-3xl px-4 py-10">

      {/* ── Action bar (print:hidden) ── */}
      <div
        className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden"
        role="toolbar"
        aria-label="Resume actions"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Career One-Pager</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Recruiter-ready snapshot of your Cantrip progress
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyShareLink}
            className="btn-ghost text-sm"
            aria-label={
              copyErr
                ? "Copy failed — try printing instead"
                : copied === "link"
                ? "Link copied!"
                : "Copy shareable link"
            }
          >
            {copied === "link" ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Link2 size={15} aria-hidden="true" />
            )}
            <span>
              {copyErr
                ? "Copy failed"
                : copied === "link"
                ? "Copied!"
                : "Copy link"}
            </span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn-primary text-sm"
            aria-label="Print or save as PDF"
          >
            <Printer size={15} aria-hidden="true" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* ── The printable sheet ── */}
      <article
        className="resume-sheet rounded-2xl border border-line bg-white p-8 text-gray-900 shadow-glow print:border-0 print:shadow-none sm:p-10"
        aria-label="Career one-pager"
      >

        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <header className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Name + headline */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {resume.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              {levelInfo.rank.emoji} {levelInfo.rank.name} &middot; Level{" "}
              {levelInfo.level}
            </p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-600">
              {resume.summary}
            </p>
          </div>

          {/* Readiness dial */}
          <div
            className="flex shrink-0 flex-col items-center gap-1"
            aria-label={`Job readiness score: ${readiness.score} out of 100 — ${readiness.tier.name}`}
          >
            <div className="relative flex h-[88px] w-[88px] items-center justify-center">
              <ReadinessDial score={readiness.score} />
              <div className="absolute flex flex-col items-center leading-none">
                <span className="text-2xl font-extrabold text-gray-900">
                  {readiness.score}
                </span>
                <span className="text-[9px] uppercase tracking-wide text-gray-400">
                  / 100
                </span>
              </div>
            </div>
            <p className="text-center text-xs font-semibold text-gray-700">
              {readiness.tier.emoji} {readiness.tier.name}
            </p>
          </div>
        </header>

        {/* ══ TWO-COLUMN BODY ══════════════════════════════════════════════════ */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row print:flex-row">

          {/* ── LEFT COLUMN (skills, highlights, certs) ── */}
          <aside className="w-full shrink-0 space-y-6 sm:w-44 print:w-44">

            {/* Skills */}
            {resume.skills.length > 0 && (
              <section aria-labelledby="op-skills-heading">
                <SectionHeading title="Skills" />
                <h4 id="op-skills-heading" className="sr-only">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((s) => (
                    <Pill key={s} label={s} />
                  ))}
                </div>
              </section>
            )}

            {/* Key highlights */}
            <section aria-labelledby="op-highlights-heading">
              <SectionHeading title="Highlights" />
              <h4 id="op-highlights-heading" className="sr-only">Key highlights</h4>
              <ul className="space-y-1.5" role="list">
                {resume.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-1.5 text-xs text-gray-700"
                  >
                    <Zap
                      size={10}
                      className="mt-0.5 shrink-0"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Certifications */}
            {earnedCreds.length > 0 && (
              <section aria-labelledby="op-certs-heading">
                <SectionHeading title="Certifications" />
                <h4 id="op-certs-heading" className="sr-only">Earned certifications</h4>
                <ul className="space-y-2" role="list">
                  {earnedCreds.map((c) => (
                    <li key={c.pathSlug}>
                      <p className="text-[11px] font-semibold leading-tight text-gray-800">
                        {c.title}
                      </p>
                      <p className="text-[10px] text-gray-500">{c.role}</p>
                      <p
                        className="font-mono text-[9px] text-gray-400"
                        title="Verification code"
                      >
                        {c.code}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          {/* ── RIGHT COLUMN (projects, courses, streak) ── */}
          <main className="flex-1 min-w-0 space-y-6">

            {/* Shipped projects */}
            {resume.projects.length > 0 && (
              <section aria-labelledby="op-projects-heading">
                <SectionHeading title="Shipped Projects" />
                <h4 id="op-projects-heading" className="sr-only">Shipped projects</h4>
                <ul className="space-y-2" role="list">
                  {resume.projects.map((p) => (
                    <li key={p.title} className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {p.title}
                      </span>{" "}
                      &mdash; {p.demonstrates}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Completed courses */}
            {resume.courses.length > 0 && (
              <section aria-labelledby="op-courses-heading">
                <SectionHeading title="Completed Courses" />
                <h4 id="op-courses-heading" className="sr-only">Completed courses</h4>
                <ul
                  className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-gray-700 sm:grid-cols-2 print:grid-cols-2"
                  role="list"
                >
                  {resume.courses.map((c) => (
                    <li key={c} className="flex items-center gap-1.5">
                      <Check
                        size={11}
                        className="shrink-0"
                        style={{ color: ACCENT }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Readiness breakdown — quick snapshot for recruiter */}
            <section aria-labelledby="op-readiness-heading">
              <SectionHeading title="Readiness Breakdown" />
              <h4 id="op-readiness-heading" className="sr-only">
                Readiness factor breakdown
              </h4>
              <ul className="space-y-2" role="list">
                {readiness.factors.map((f) => {
                  const pct = f.max ? Math.round((f.points / f.max) * 100) : 0;
                  return (
                    <li key={f.key}>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-medium text-gray-700">
                          {f.label}
                        </span>
                        <span className="text-gray-400">
                          {f.points}/{f.max}
                        </span>
                      </div>
                      <div
                        className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${f.label}: ${f.points} of ${f.max} points`}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background:
                              pct >= 100
                                ? "#059669" /* green when maxed */
                                : ACCENT,
                          }}
                        />
                      </div>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        {f.detail}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Certifications — full detail view in main column (if any) */}
            {earnedCreds.length > 0 && (
              <section
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 print:border-gray-200"
                aria-labelledby="op-certs-detail-heading"
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <Award
                    size={13}
                    style={{ color: ACCENT }}
                    aria-hidden="true"
                  />
                  <h4
                    id="op-certs-detail-heading"
                    className="text-xs font-bold text-gray-800"
                  >
                    Verified Credentials
                  </h4>
                </div>
                <ul className="space-y-2" role="list">
                  {earnedCreds.map((c) => (
                    <li
                      key={c.pathSlug}
                      className="flex items-start justify-between gap-4 text-xs text-gray-700"
                    >
                      <span>
                        <span className="font-semibold text-gray-900">
                          {c.title}
                        </span>{" "}
                        &mdash; {c.role} &middot; {c.lessons} lessons
                      </span>
                      <span
                        className="shrink-0 font-mono text-[10px] text-gray-400"
                        title="Verification code"
                      >
                        {c.code}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-4">
          <p className="text-[10px] text-gray-400">
            Generated from Cantrip learning progress &middot; cantrip.dev/career/resume
          </p>
          {streak >= 3 && (
            <p
              className="flex items-center gap-1 text-[10px] font-medium text-gray-500"
              aria-label={`${streak}-day learning streak`}
            >
              <Star size={10} aria-hidden="true" />
              {streak}-day streak
            </p>
          )}
        </footer>
      </article>
    </div>
  );
}
