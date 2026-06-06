"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Hammer, Trophy } from "lucide-react";
import { allProjects, projectProgress, type Difficulty } from "@/lib/projects";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: "border-success/30 bg-success/10 text-success",
  Intermediate: "border-accent/30 bg-accent/10 text-accent-soft",
  Advanced: "border-danger/30 bg-danger/10 text-danger",
};

export default function ProjectsPage() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  const projects = allProjects();
  const done = mounted ? new Set(completed) : new Set<string>();
  const { done: doneCount, total } = mounted
    ? projectProgress(completed)
    : { done: 0, total: projects.length };
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Hammer className="text-accent-soft" /> Portfolio Projects
      </h1>
      <p className="mt-1 text-gray-400">
        Guided capstone builds — complete code, real tests, something worth
        putting on your résumé. Every project you ship lands on your public
        profile.
      </p>

      {/* Portfolio progress */}
      <div className="card mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-medium text-white">
            <Trophy size={15} className="text-gold" /> Portfolio progress
          </span>
          <span className="text-gray-400">
            {doneCount}/{total} shipped
          </span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Project grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => {
          const shipped = done.has(p.id);
          return (
            <Link
              key={p.id}
              href={p.href}
              className="card group flex flex-col gap-3 hover:border-accent/50"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${DIFFICULTY_STYLES[p.difficulty]}`}
                >
                  {p.difficulty}
                </span>
                {shipped ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-success">
                    <CheckCircle2 size={14} /> Shipped
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">+{p.xp} XP</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white group-hover:text-accent-soft">
                  {p.title}
                </p>
                <p className="mt-0.5 text-sm text-gray-400">{p.demonstrates}</p>
              </div>

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

              <span className="flex items-center gap-1 text-sm font-medium text-white">
                {shipped ? "Revisit build" : "Start building"}{" "}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
