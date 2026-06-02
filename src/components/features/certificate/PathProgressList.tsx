"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import { PATHS, pathProgress } from "@/lib/paths";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// Lists every path with the learner's live progress, surfacing a certificate
// link the moment a path hits 100%. Reused on the dashboard and profile.
export function PathProgressList() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  if (!mounted) {
    return <div className="text-sm text-gray-500">Loading…</div>;
  }

  const rows = PATHS.map((path) => ({ path, ...pathProgress(path, completed) }))
    // Completed paths first, then most-progressed.
    .sort(
      (a, b) =>
        Number(b.complete) - Number(a.complete) || b.pct - a.pct,
    );

  return (
    <div className="space-y-2">
      {rows.map(({ path, done, total, pct, complete }) => (
        <div
          key={path.slug}
          className="card flex items-center gap-3 py-3"
        >
          <span className="text-2xl">{path.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/paths/${path.slug}`}
                className="truncate font-medium text-white hover:underline"
              >
                {path.title}
              </Link>
              <span className="shrink-0 text-xs text-gray-400">
                {done}/{total}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          {complete && (
            <Link
              href={`/certificate/path/${path.slug}`}
              className="btn-primary shrink-0 bg-gold py-1.5 text-xs text-canvas hover:bg-gold/90"
            >
              <Award size={13} /> Certificate
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
