"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Hammer,
  Search,
  Trophy,
  X,
} from "lucide-react";
import { type Project, type Difficulty } from "@/lib/projects";

// ── Styling constants ─────────────────────────────────────────────────────────

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: "border-success/30 bg-success/10 text-success",
  Intermediate: "border-accent/30 bg-accent/10 text-accent-soft",
  Advanced: "border-danger/30 bg-danger/10 text-danger",
};

const FILTER_BASE =
  "rounded-full border px-3 py-1 text-xs font-medium transition-colors";
const FILTER_ACTIVE =
  "border-accent bg-accent/15 text-accent-soft";
const FILTER_IDLE =
  "border-surface-2 bg-surface-2 text-gray-400 hover:border-accent/40 hover:text-gray-200";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  projects: Project[];
  /** Set of completed lesson ids from the store (empty until mounted). */
  done: Set<string>;
  doneCount: number;
}

type StatusFilter = "all" | "shipped" | "in-progress";

// ── Component ─────────────────────────────────────────────────────────────────

export function PortfolioHub({ projects, done, doneCount }: Props) {
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string>("All");
  const [diffFilter, setDiffFilter] = useState<string>("All");
  const [domainFilter, setDomainFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Derive filter option lists from the full project set.
  const languages = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.language))).sort()],
    [projects],
  );
  const difficulties: string[] = ["All", "Beginner", "Intermediate", "Advanced"];
  const domains = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.domain)))],
    [projects],
  );

  const total = projects.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  // Apply filters.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (langFilter !== "All" && p.language !== langFilter) return false;
      if (diffFilter !== "All" && p.difficulty !== diffFilter) return false;
      if (domainFilter !== "All" && p.domain !== domainFilter) return false;
      if (statusFilter === "shipped" && !done.has(p.id)) return false;
      if (statusFilter === "in-progress" && done.has(p.id)) return false;
      if (q) {
        const haystack = `${p.title} ${p.blurb} ${p.demonstrates} ${p.tags.join(" ")} ${p.domain}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [projects, done, query, langFilter, diffFilter, domainFilter, statusFilter]);

  // Group visible projects by domain (preserving catalog order of domains).
  const grouped = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of visible) {
      const bucket = map.get(p.domain) ?? [];
      bucket.push(p);
      map.set(p.domain, bucket);
    }
    return Array.from(map.entries());
  }, [visible]);

  const isFiltered =
    query.trim() ||
    langFilter !== "All" ||
    diffFilter !== "All" ||
    domainFilter !== "All" ||
    statusFilter !== "all";

  function clearFilters() {
    setQuery("");
    setLangFilter("All");
    setDiffFilter("All");
    setDomainFilter("All");
    setStatusFilter("all");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Hammer className="text-accent-soft" aria-hidden /> Portfolio Hub
      </h1>
      <p className="mt-1 text-gray-400">
        Every guided build you can ship — complete code, real tests, something
        worth putting on your resume. Projects are grouped by domain.
      </p>

      {/* Portfolio progress */}
      <div className="card mt-6" aria-label="Portfolio progress">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-medium text-white">
            <Trophy size={15} className="text-gold" aria-hidden /> Portfolio
            progress
          </span>
          <span className="text-gray-400">
            {doneCount}/{total} shipped
          </span>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${pct}% of portfolio projects shipped`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-6">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search portfolio projects"
          className="w-full rounded-lg border border-surface-2 bg-surface-1 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-accent/60 focus:outline-none"
        />
      </div>

      {/* Filters row */}
      <div className="mt-4 space-y-3">
        {/* Status toggle */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
          <span className="text-xs text-gray-500 min-w-[4rem]">Status</span>
          {(["all", "shipped", "in-progress"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`${FILTER_BASE} ${statusFilter === s ? FILTER_ACTIVE : FILTER_IDLE}`}
              aria-pressed={statusFilter === s}
            >
              {s === "all" ? "All" : s === "shipped" ? "Shipped" : "In progress"}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by difficulty">
          <span className="text-xs text-gray-500 min-w-[4rem]">Difficulty</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`${FILTER_BASE} ${diffFilter === d ? FILTER_ACTIVE : FILTER_IDLE}`}
              aria-pressed={diffFilter === d}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Language */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by language">
          <span className="text-xs text-gray-500 min-w-[4rem]">Language</span>
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLangFilter(l)}
              className={`${FILTER_BASE} ${langFilter === l ? FILTER_ACTIVE : FILTER_IDLE}`}
              aria-pressed={langFilter === l}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Domain */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by domain">
          <span className="text-xs text-gray-500 min-w-[4rem]">Domain</span>
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              className={`${FILTER_BASE} ${domainFilter === d ? FILTER_ACTIVE : FILTER_IDLE}`}
              aria-pressed={domainFilter === d}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Filter summary / clear */}
      {isFiltered && (
        <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
          <span>
            {visible.length} project{visible.length !== 1 ? "s" : ""} match
          </span>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-200"
            aria-label="Clear all filters"
          >
            <X size={12} aria-hidden /> Clear filters
          </button>
        </div>
      )}

      {/* Groups */}
      {grouped.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No projects match your filters.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(([domain, domainProjects]) => (
            <section key={domain} aria-label={`${domain} projects`}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {domain}
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                  {domainProjects.length}
                </span>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {domainProjects.map((p) => {
                  const shipped = done.has(p.id);
                  return (
                    <Link
                      key={p.id}
                      href={p.href}
                      className="card group flex flex-col gap-3 hover:border-accent/50"
                    >
                      {/* Top row: difficulty badge + status */}
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${DIFFICULTY_STYLES[p.difficulty]}`}
                        >
                          {p.difficulty}
                        </span>
                        {shipped ? (
                          <span
                            className="flex items-center gap-1 text-xs font-medium text-success"
                            aria-label="Shipped"
                          >
                            <CheckCircle2 size={14} aria-hidden /> Shipped
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500" aria-label={`+${p.xp} XP`}>
                            +{p.xp} XP
                          </span>
                        )}
                      </div>

                      {/* Title + blurb */}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white group-hover:text-accent-soft">
                          {p.title}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-400">
                          {p.demonstrates}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                          {p.language}
                        </span>
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <span className="flex items-center gap-1 text-sm font-medium text-white">
                        {shipped ? "Revisit build" : "Start building"}
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
