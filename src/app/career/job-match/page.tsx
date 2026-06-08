"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Check,
  ArrowRight,
  Sparkles,
  SearchCheck,
  BookOpen,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { deriveBreadth } from "@/lib/progress";
import { matchJob } from "@/lib/jobMatch";
import { PageSkeleton } from "@/components/PageSkeleton";
import type { PlayerStats } from "@/types/game";

// ── Match dial ───────────────────────────────────────────────────────────────

function MatchDial({ pct }: { pct: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  // Colour shifts from red (0%) through amber (50%) to green (100%).
  const colour =
    pct >= 75
      ? "text-emerald-400"
      : pct >= 50
        ? "text-amber-400"
        : pct >= 25
          ? "text-orange-400"
          : "text-red-400";

  return (
    <div className="relative flex h-28 w-28 items-center justify-center" aria-hidden="true">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-surface-2"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className={`${colour} transition-all duration-700`}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold text-white">{pct}</span>
        <span className="text-[10px] uppercase tracking-wide text-gray-400">%</span>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function JobMatchPage() {
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);

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

  const [jd, setJd] = useState("");
  const [checked, setChecked] = useState(false);

  const result = useMemo(() => {
    if (!checked || jd.trim().length === 0) return null;
    return matchJob(jd, stats);
  }, [checked, jd, stats]);

  function handleCheck() {
    if (jd.trim().length === 0) return;
    setChecked(true);
  }

  function handleClear() {
    setJd("");
    setChecked(false);
  }

  if (!mounted) {
    return <PageSkeleton maxW="max-w-3xl" rows={2} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
          <SearchCheck size={22} />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-white">Job Match</h1>
          <p className="text-sm text-gray-400">
            Paste a job description and see exactly how your skills stack up.
          </p>
        </div>
      </div>

      {/* Input card */}
      <section className="card mt-8">
        <label
          htmlFor="jd-input"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Job description
        </label>
        <textarea
          id="jd-input"
          aria-label="Paste job description here"
          value={jd}
          onChange={(e) => {
            setJd(e.target.value);
            // Reset result whenever the text changes so stale results don't show.
            if (checked) setChecked(false);
          }}
          placeholder="Paste the full job posting here — requirements, responsibilities, tech stack…"
          rows={10}
          className="w-full resize-y rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-gray-200 placeholder-gray-400 outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={handleCheck}
            disabled={jd.trim().length === 0}
            aria-label="Analyse job description"
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Briefcase size={15} /> Check match
          </button>
          {jd.trim().length > 0 && (
            <button
              onClick={handleClear}
              aria-label="Clear job description"
              className="btn-ghost text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Results */}
      {result && (
        <section aria-label="Match results" className="mt-6 space-y-4">
          {/* Score card */}
          <div className="card flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <MatchDial pct={result.matchPct} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-soft">
                Skill match
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                {result.matchPct}% covered
              </h2>
              <p className="mt-1 text-sm text-gray-400">{result.summary}</p>
            </div>
          </div>

          {/* Nothing detected */}
          {result.have.length === 0 && result.missing.length === 0 && (
            <div className="rounded-2xl border border-line bg-surface-2 px-6 py-5 text-sm text-gray-400">
              No recognisable tech skills were detected. Try pasting more of the
              job posting, especially the requirements section.
            </div>
          )}

          {/* Skills you have */}
          {result.have.length > 0 && (
            <div className="card">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
                <Check size={16} className="text-emerald-400" />
                Skills you have
                <span className="ml-auto text-xs font-normal text-gray-400">
                  {result.have.length} matched
                </span>
              </h3>
              <ul
                aria-label="Skills you already have"
                className="flex flex-wrap gap-2"
              >
                {result.have.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills to learn */}
          {result.missing.length > 0 && (
            <div className="card">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
                <BookOpen size={16} className="text-accent-soft" />
                Skills to learn
                <span className="ml-auto text-xs font-normal text-gray-400">
                  {result.missing.length} gap{result.missing.length !== 1 ? "s" : ""}
                </span>
              </h3>
              <ul
                aria-label="Skills to learn"
                className="space-y-2"
              >
                {result.missing.map(({ skill, href }) => (
                  <li key={skill} className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-300">
                      {skill}
                    </span>
                    {href ? (
                      <Link
                        href={href}
                        aria-label={`Learn ${skill}`}
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent-soft hover:text-white"
                      >
                        Learn it
                        <ArrowRight size={12} />
                      </Link>
                    ) : (
                      <span className="shrink-0 text-xs text-gray-400">
                        Coming soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next step nudge */}
          {result.missing.length > 0 && (
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <p className="flex items-start gap-2 text-sm text-gray-300">
                <Sparkles
                  size={15}
                  className="mt-0.5 shrink-0 text-accent-soft"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium text-white">Next step: </span>
                  pick the first gap above and complete just the opening lesson — that
                  single lesson already adds a skill to your profile and moves this
                  score.
                </span>
              </p>
            </div>
          )}

          {result.matchPct === 100 && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <p className="flex items-start gap-2 text-sm text-emerald-300">
                <Check size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-medium text-white">
                    You match this job 100%.{" "}
                  </span>
                  Head to the{" "}
                  <Link
                    href="/career"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Career Pack
                  </Link>{" "}
                  to check your readiness score and export your résumé.
                </span>
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
