"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import type { TrackGroup } from "@/lib/curriculum/tracks";

interface Props {
  groups: TrackGroup[];
}

function moduleMatchesQuery(m: Module, q: string): boolean {
  const needle = q.toLowerCase();
  if (m.title.toLowerCase().includes(needle)) return true;
  if (m.description.toLowerCase().includes(needle)) return true;
  if (m.tagline.toLowerCase().includes(needle)) return true;
  if (m.lessons.some((l) => l.title.toLowerCase().includes(needle))) return true;
  return false;
}

export function CatalogSearch({ groups }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return groups;

    const result: TrackGroup[] = [];
    for (const { track, modules } of groups) {
      const matched = modules.filter((m) => moduleMatchesQuery(m, q));
      if (matched.length > 0) result.push({ track, modules: matched });
    }
    return result;
  }, [groups, query]);

  const isSearching = query.trim().length > 0;
  const hasResults = filtered.length > 0;

  return (
    <>
      {/* Search input */}
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
          className="w-full rounded-lg border border-line bg-surface-2/50 py-2 pl-9 pr-9 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30 sm:max-w-sm"
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

      {/* Jump-to-track nav — hidden while searching */}
      {!isSearching && (
        <nav className="mt-4 flex flex-wrap gap-2">
          {groups.map(({ track, modules }) => (
            <a
              key={track.id}
              href={`#track-${track.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2/50 px-3 py-1 text-sm text-gray-300 transition-colors hover:border-accent/60 hover:text-white"
            >
              <span aria-hidden>{track.emoji}</span>
              {track.label}
              <span className="text-xs text-gray-500">{modules.length}</span>
            </a>
          ))}
        </nav>
      )}

      {/* Course grid */}
      <div className="mt-10 space-y-12">
        {hasResults ? (
          filtered.map(({ track, modules }) => (
            <section key={track.id} aria-labelledby={`track-${track.id}`}>
              <div className="flex items-baseline gap-2">
                <span aria-hidden className="text-xl">
                  {track.emoji}
                </span>
                <h2
                  id={`track-${track.id}`}
                  className="scroll-mt-24 text-xl font-bold text-white"
                >
                  {track.label}
                </h2>
                <span className="text-sm text-gray-500">
                  {modules.length} course{modules.length !== 1 ? "s" : ""}
                </span>
              </div>
              {!isSearching && (
                <p className="mt-1 text-sm text-gray-400">{track.blurb}</p>
              )}

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/learn/${m.slug}`}
                    className={`card group flex flex-col gap-2 bg-gradient-to-br p-4 ${m.gradient} transition-transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="rounded-full bg-black/30 px-2 py-0.5 text-xs text-gray-300">
                        {m.lessons.length} lessons
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
            </section>
          ))
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
