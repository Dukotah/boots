"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search, X, ChevronDown } from "lucide-react";
import type {
  CatalogModule,
  CatalogTrackGroup,
} from "@/lib/curriculum/catalogClient";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

interface Props {
  groups: CatalogTrackGroup[];
}

function moduleMatchesQuery(m: CatalogModule, q: string): boolean {
  const needle = q.toLowerCase();
  if (m.title.toLowerCase().includes(needle)) return true;
  if (m.description.toLowerCase().includes(needle)) return true;
  if (m.tagline.toLowerCase().includes(needle)) return true;
  return false;
}

export function CatalogSearch({ groups }: Props) {
  const [query, setQuery] = useState("");
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  // Per-track lesson progress (done/total), so each header reads like a dashboard.
  const completedSet = useMemo(
    () => new Set(mounted ? completed : []),
    [mounted, completed],
  );
  const progress = useMemo(() => {
    const map: Record<string, { done: number; total: number }> = {};
    for (const { track, modules } of groups) {
      let done = 0;
      let total = 0;
      for (const m of modules) {
        for (const l of m.lessons) {
          total++;
          if (completedSet.has(l.id)) done++;
        }
      }
      map[track.id] = { done, total };
    }
    return map;
  }, [groups, completedSet]);

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return groups;
    const result: CatalogTrackGroup[] = [];
    for (const { track, modules } of groups) {
      const matched = modules.filter((m) => moduleMatchesQuery(m, q));
      if (matched.length > 0) result.push({ track, modules: matched });
    }
    return result;
  }, [groups, query]);

  // Collapsed by default to tame the 100+ course wall — only the first track is
  // open on load (deterministic, hydration-safe). After mount we also open any
  // track the learner has progress in, so returners land on what's relevant.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(groups.length ? [groups[0].track.id] : []),
  );
  useEffect(() => {
    if (!mounted) return;
    setOpenIds((prev) => {
      const next = new Set(prev);
      for (const { track } of groups) {
        if ((progress[track.id]?.done ?? 0) > 0) next.add(track.id);
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const expandAll = () => setOpenIds(new Set(groups.map((g) => g.track.id)));
  const collapseAll = () => setOpenIds(new Set());

  const hasResults = filtered.length > 0;

  return (
    <>
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
          placeholder="Search courses and lessons…"
          aria-label="Search courses and lessons"
          className="w-full rounded-lg border border-line bg-surface-2/50 py-2 pl-9 pr-9 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30 sm:max-w-md"
        />
        {isSearching && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Controls */}
      {!isSearching && (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            {groups.length} categories · {groups.reduce((n, g) => n + g.modules.length, 0)} courses
          </span>
          <div className="flex items-center gap-3">
            <button onClick={expandAll} className="hover:text-white transition-colors">
              Expand all
            </button>
            <span aria-hidden>·</span>
            <button onClick={collapseAll} className="hover:text-white transition-colors">
              Collapse all
            </button>
          </div>
        </div>
      )}

      {/* Track accordion */}
      <div className="mt-5 space-y-3">
        {hasResults ? (
          filtered.map(({ track, modules }) => {
            const open = isSearching || openIds.has(track.id);
            const prog = progress[track.id] ?? { done: 0, total: 0 };
            const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
            return (
              <section
                key={track.id}
                className="overflow-hidden rounded-2xl border border-line bg-surface-2/30"
              >
                <button
                  onClick={() => !isSearching && toggle(track.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-2/50"
                >
                  <span aria-hidden className="text-2xl">
                    {track.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-base font-bold text-white">
                        {track.label}
                      </h2>
                      <span className="shrink-0 text-xs text-gray-500">
                        {modules.length} course{modules.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="truncate text-xs text-gray-400">{track.blurb}</p>
                  </div>
                  {/* Progress (only meaningful once mounted + started) */}
                  {mounted && prog.done > 0 && (
                    <div className="hidden w-28 shrink-0 sm:block">
                      <div className="mb-1 text-right text-[10px] text-gray-500">
                        {prog.done}/{prog.total}
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {!isSearching && (
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  )}
                </button>

                {open && (
                  <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
                    {modules.map((m) => (
                      <Link
                        key={m.slug}
                        href={`/learn/${m.slug}`}
                        className={`card group flex flex-col gap-2 bg-gradient-to-br p-4 ${m.gradient} transition-transform hover:-translate-y-1`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{m.emoji}</span>
                          <span className="rounded-full bg-black/30 px-2 py-0.5 text-xs text-gray-300">
                            {m.lessonCount} lessons
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white">{m.title}</h3>
                        <p className="line-clamp-2 text-sm text-gray-300">
                          {m.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                          Open course <ArrowRight size={14} />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-lg font-semibold text-white">
              No courses found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-gray-400">
              Try a different keyword — e.g. &ldquo;promises&rdquo;, &ldquo;joins&rdquo;, or &ldquo;recursion&rdquo;.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-2 rounded-full border border-line bg-surface-2/50 px-4 py-1.5 text-sm text-gray-300 transition-colors hover:border-accent/60 hover:text-white"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </>
  );
}
