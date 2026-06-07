"use client";

import "./career-print.css";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Check,
  ChevronDown,
  Copy,
  FileText,
  MessageSquare,
  Printer,
  ArrowRight,
  Sparkles,
  Lock,
  Target,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { deriveBreadth } from "@/lib/progress";
import {
  computeReadiness,
  buildResume,
  resumeMarkdown,
  pathCredentials,
  languageName,
} from "@/lib/career";
import {
  ROLE_TARGETS,
  computeRoleReadiness,
} from "@/lib/roleReadiness";
import { ResumeTemplatePicker } from "@/components/features/career/ResumeTemplates";
import { SITE } from "@/lib/site";
import type { PlayerStats } from "@/types/game";
import { PageSkeleton } from "@/components/PageSkeleton";

export default function CareerPage() {
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const user = useGameStore((s) => s.user);

  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyErr, setCopyErr] = useState(false);

  /** The currently selected target role id (null = no role chosen yet). */
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  // Reconstruct the stats snapshot from raw fields (avoids a selector that
  // returns a fresh object every render).
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

  const handle = user?.email?.split("@")[0];
  const displayName = name.trim() || handle || `${SITE.name} Learner`;

  const readiness = useMemo(() => computeReadiness(stats), [stats]);
  const creds = useMemo(() => pathCredentials(completed), [completed]);
  const resume = useMemo(
    () => buildResume(stats, displayName),
    [stats, displayName],
  );

  // Role-targeted readiness — recomputed whenever the selected role changes.
  const roleReadiness = useMemo(
    () => (selectedRoleId ? computeRoleReadiness(stats, selectedRoleId) : null),
    [stats, selectedRoleId],
  );
  const selectedRole = useMemo(
    () => ROLE_TARGETS.find((r) => r.id === selectedRoleId) ?? null,
    [selectedRoleId],
  );

  const earned = creds.filter((c) => c.earned);
  const inProgress = creds
    .filter((c) => !c.earned && c.done > 0)
    .sort((a, b) => b.pct - a.pct);
  const tips = readiness.factors.filter((f) => f.points < f.max);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(resumeMarkdown(resume));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — tell the user
      // instead of leaving the button looking inert.
      setCopyErr(true);
      setTimeout(() => setCopyErr(false), 2500);
    }
  }

  if (!mounted) {
    return (
      <PageSkeleton maxW="max-w-4xl" rows={3} />
    );
  }

  return (
    <div className="career-print-root mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 print:hidden">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
          <Briefcase size={22} />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-white">Career Pack</h1>
          <p className="text-gray-400">
            Your job-readiness score, certificates, and an exportable résumé —
            all from what you&apos;ve actually completed.
          </p>
        </div>
      </div>

      {/* ── Quick-access tool cards ── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 print:hidden">
        <Link
          href="/career/job-match"
          className="group card flex items-start gap-4 hover:border-accent/60 transition"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
            <FileText size={20} />
          </span>
          <div>
            <h2 className="font-bold text-white group-hover:text-accent-soft transition">
              Job Match
            </h2>
            <p className="mt-0.5 text-sm text-gray-400">
              Paste a job description and see how well your skills align.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
              Open Job Match{" "}
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </p>
          </div>
        </Link>

        <Link
          href="/career/interview-prep"
          className="group card flex items-start gap-4 hover:border-accent/60 transition"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
            <MessageSquare size={20} />
          </span>
          <div>
            <h2 className="font-bold text-white group-hover:text-accent-soft transition">
              Interview Prep
            </h2>
            <p className="mt-0.5 text-sm text-gray-400">
              Practice common interview questions for your target role.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
              Open Interview Prep{" "}
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </p>
          </div>
        </Link>

        <Link
          href="/career/resume"
          className="group card flex items-start gap-4 hover:border-accent/60 transition"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
            <FileText size={20} />
          </span>
          <div>
            <h2 className="font-bold text-white group-hover:text-accent-soft transition">
              Resume Builder
            </h2>
            <p className="mt-0.5 text-sm text-gray-400">
              Generate a recruiter-ready one-pager from your completed lessons.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
              Build Resume{" "}
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </p>
          </div>
        </Link>

        <Link
          href="/career/mock-interview"
          className="group card flex items-start gap-4 hover:border-accent/60 transition"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
            <MessageSquare size={20} />
          </span>
          <div>
            <h2 className="font-bold text-white group-hover:text-accent-soft transition">
              Mock Interview
            </h2>
            <p className="mt-0.5 text-sm text-gray-400">
              Run an AI-powered mock interview session for your target role.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
              Start Mock Interview{" "}
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </p>
          </div>
        </Link>
      </div>

      {/* ── Job-readiness score ── */}
      <section className="card mt-8 print:hidden">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          {/* Score dial */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-surface-2"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="text-accent transition-all duration-700"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={
                    2 * Math.PI * 52 * (1 - readiness.score / 100)
                  }
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">
                  {readiness.score}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                  / 100
                </span>
              </div>
            </div>
          </div>

          {/* Tier + next tier */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-soft">
              Overall job-readiness
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              {readiness.tier.emoji} {readiness.tier.name}
            </h2>
            <p className="mt-1 text-sm text-gray-400">{readiness.tier.blurb}</p>
            {readiness.nextTier && (
              <p className="mt-3 text-xs text-gray-500">
                {readiness.nextTier.min - readiness.score} more points to{" "}
                <span className="text-gray-300">
                  {readiness.nextTier.emoji} {readiness.nextTier.name}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Factor breakdown */}
        <div className="mt-6 space-y-3 border-t border-line pt-5">
          {readiness.factors.map((f) => {
            const pct = f.max ? Math.round((f.points / f.max) * 100) : 0;
            return (
              <div key={f.key}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-gray-200">{f.label}</span>
                  <span className="text-gray-500">
                    {f.points}/{f.max} pts
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="hidden w-48 shrink-0 text-right text-xs text-gray-500 sm:block">
                    {f.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How to raise your score ── */}
      {tips.length > 0 && (
        <section className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 print:hidden">
          <h3 className="flex items-center gap-2 font-bold text-white">
            <Sparkles size={16} className="text-accent-soft" /> Raise your score
          </h3>
          <ul className="mt-3 space-y-2">
            {tips.map((f) => (
              <li key={f.key} className="flex gap-2 text-sm text-gray-300">
                <ArrowRight
                  size={15}
                  className="mt-0.5 shrink-0 text-accent-soft"
                />
                <span>
                  <span className="font-medium text-white">{f.label}:</span>{" "}
                  {f.tip}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Target role readiness ── */}
      <section className="mt-8 print:hidden">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-soft">
            <Target size={16} />
          </span>
          <h2 className="text-xl font-bold text-white">Target Role Readiness</h2>
        </div>
        <p className="mt-1 text-sm text-gray-400">
          Pick a role to see how your current skills map to what employers expect.
        </p>

        {/* Role selector */}
        <div className="mt-4 relative inline-block">
          <label htmlFor="role-select" className="sr-only">
            Select a target role
          </label>
          <div className="relative">
            <select
              id="role-select"
              value={selectedRoleId ?? ""}
              onChange={(e) => setSelectedRoleId(e.target.value || null)}
              className="appearance-none rounded-xl border border-line bg-surface-2 py-2.5 pl-4 pr-10 text-sm font-medium text-white outline-none focus:border-accent cursor-pointer"
            >
              <option value="">— Choose a role —</option>
              {ROLE_TARGETS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.emoji} {r.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Role readiness panel */}
        {roleReadiness && selectedRole && (
          <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-5">
            {/* Header row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Role score dial — smaller than the overall dial */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-surface-2"
                    style={{ color: "#1e1e2e" }}
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="text-accent transition-all duration-700"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={
                      2 * Math.PI * 52 * (1 - roleReadiness.score / 100)
                    }
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-white">
                    {roleReadiness.score}
                  </span>
                  <span className="text-[9px] uppercase tracking-wide text-gray-500">
                    / 100
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-soft">
                  {selectedRole.emoji} {selectedRole.label}
                </p>
                <h3 className="mt-0.5 text-xl font-bold text-white">
                  {roleReadiness.tier}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {roleReadiness.score < 90
                    ? `${100 - roleReadiness.score} points to Role-Ready`
                    : "You meet the full profile for this role."}
                </p>
              </div>
            </div>

            {/* Skill gaps */}
            {roleReadiness.gaps.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <h4 className="mb-3 text-sm font-bold text-white">
                  Top skill gaps
                </h4>
                <ul className="space-y-2">
                  {roleReadiness.gaps.map((gap) => (
                    <li key={gap.href} className="flex items-start gap-2">
                      <ArrowRight
                        size={14}
                        className="mt-0.5 shrink-0 text-accent-soft"
                      />
                      <span className="text-sm text-gray-300">
                        <Link
                          href={gap.href}
                          className="font-medium text-white hover:text-accent-soft underline underline-offset-2"
                        >
                          {gap.label}
                        </Link>{" "}
                        <span className="text-gray-500">— {gap.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next best actions */}
            {roleReadiness.nextActions.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <h4 className="mb-3 text-sm font-bold text-white">
                  Next best actions
                </h4>
                <ol className="space-y-2">
                  {roleReadiness.nextActions.map((action, i) => (
                    <li key={action.href} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent-soft">
                        {i + 1}
                      </span>
                      <Link
                        href={action.href}
                        className="text-sm text-gray-300 hover:text-white underline underline-offset-2"
                      >
                        {action.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {roleReadiness.gaps.length === 0 && roleReadiness.score >= 90 && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-sm text-gray-300">
                  No significant gaps — your profile matches the full{" "}
                  <span className="font-semibold text-white">
                    {selectedRole.label}
                  </span>{" "}
                  curriculum. Consider completing a full career track for a
                  verifiable certificate.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Skills ── */}
      <section className="mt-8 print:hidden">
        <h2 className="text-xl font-bold text-white">Skills</h2>
        {resume.skills.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-gray-200"
              >
                {s}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-400">
            Complete a few lessons to start building your skill list.
          </p>
        )}
      </section>

      {/* ── Certificates ── */}
      <section className="mt-8 print:hidden">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-white">Certificates</h2>
          <span className="text-sm text-gray-400">
            {earned.length}/{creds.length} earned
          </span>
        </div>

        {earned.length === 0 && (
          <p className="mt-2 text-sm text-gray-400">
            Finish a full career path to earn your first verifiable certificate.
          </p>
        )}

        {earned.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {earned.map((c) => (
              <Link
                key={c.path.slug}
                href={`/certificate/path/${c.path.slug}`}
                className={`group relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br ${c.path.gradient} p-5 transition hover:border-accent`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{c.path.emoji}</span>
                  <Award className="text-gold" size={22} />
                </div>
                <h3 className="mt-3 font-bold text-white">{c.path.title}</h3>
                <p className="text-sm text-gray-300">{c.path.role}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-soft">
                  View certificate{" "}
                  <ArrowRight
                    size={13}
                    className="transition group-hover:translate-x-0.5"
                  />
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* In-progress paths — the path to the next cert */}
        {inProgress.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              In progress
            </p>
            {inProgress.slice(0, 4).map((c) => (
              <Link
                key={c.path.slug}
                href={`/paths/${c.path.slug}`}
                className="card flex items-center gap-4 hover:border-accent/60"
              >
                <span className="text-2xl opacity-70">{c.path.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-white">
                      {c.path.title}
                    </p>
                    <span className="shrink-0 text-xs text-gray-400">
                      {c.done}/{c.total}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
                <Lock size={15} className="shrink-0 text-gray-600" />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Résumé / portfolio ── */}
      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <label htmlFor="resume-name" className="text-sm text-gray-400">
              Name on résumé:
            </label>
            <input
              id="resume-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={displayName}
              className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm text-white outline-none focus:border-accent"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={copyMarkdown} className="btn-ghost text-sm">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied
                ? "Copied"
                : copyErr
                  ? "Copy failed — use Print"
                  : "Copy as Markdown"}
            </button>
            <button
              onClick={() => window.print()}
              className="btn-primary text-sm"
            >
              <Printer size={15} /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* Template picker + chosen résumé sheet (the one thing meant to print) */}
        <ResumeTemplatePicker resume={resume} />
      </section>
    </div>
  );
}
