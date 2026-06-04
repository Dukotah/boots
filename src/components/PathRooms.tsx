"use client";

import Link from "next/link";
import { CheckCircle2, Lock, Play, ArrowRight, Award, Zap, Clock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { MODULES } from "@/lib/curriculum";

export type RoomModule = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  difficulty?: string;
  language?: string;
  lessonIds: string[];
  xp: number;
  tags?: string[];
};

const DIFF_STYLES: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Advanced: "bg-red-500/15 text-red-400 border-red-500/30",
};

const LANG_EMOJI: Record<string, string> = {
  javascript: "🟨",
  python: "🐍",
  sql: "🗃️",
  typescript: "💙",
  html: "🌐",
};

type RoomStatus = "locked" | "not-started" | "in-progress" | "complete";

export function PathRooms({
  modules,
  pathSlug,
  pathGradient,
}: {
  modules: RoomModule[];
  pathSlug: string;
  pathGradient?: string;
}) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  function doneIn(m: RoomModule) {
    return mounted ? m.lessonIds.filter((id) => completed.includes(id)).length : 0;
  }

  function getStatus(m: RoomModule, index: number): RoomStatus {
    if (!mounted) return "not-started";
    const done = doneIn(m);
    const total = m.lessonIds.length;
    if (done === total && total > 0) return "complete";
    if (done > 0) return "in-progress";
    // unlock first module always; subsequent unlock when previous is in-progress or complete
    if (index === 0) return "not-started";
    const prev = modules[index - 1];
    const prevDone = doneIn(prev);
    return prevDone > 0 ? "not-started" : "locked";
  }

  const totalLessons = modules.reduce((s, m) => s + m.lessonIds.length, 0);
  const totalDone = mounted ? modules.reduce((s, m) => s + doneIn(m), 0) : 0;
  const overall = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;
  const nextModule = modules.find((m) => doneIn(m) < m.lessonIds.length) ?? modules[0];

  return (
    <div>
      {/* Progress bar + CTA */}
      <div className="mb-8 flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Path progress</span>
            <span className="text-gray-400">
              {totalDone}/{totalLessons} lessons · {overall}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-500"
              style={{ width: `${overall}%` }}
            />
          </div>
        </div>
        {overall === 100 ? (
          <Link
            href={`/certificate/path/${pathSlug}`}
            className="btn-primary shrink-0 bg-gold text-canvas hover:bg-gold/80"
          >
            <Award size={16} /> Claim Certificate
          </Link>
        ) : nextModule ? (
          <Link href={`/learn/${nextModule.slug}`} className="btn-primary shrink-0">
            {overall === 0 ? "Start Path" : "Continue"} <ArrowRight size={16} />
          </Link>
        ) : null}
      </div>

      {/* Room cards */}
      <div className="space-y-4">
        {modules.map((m, i) => {
          const status = getStatus(m, i);
          const done = doneIn(m);
          const total = m.lessonIds.length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          const estMin = Math.max(10, Math.round((total * 12)));
          const mod = MODULES.find((x) => x.slug === m.slug);
          const diff = m.difficulty ?? "Beginner";
          const lang = m.language ?? mod?.language;
          const locked = status === "locked";

          return (
            <div
              key={m.slug}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-200 ${
                locked
                  ? "border-line bg-surface opacity-60"
                  : status === "complete"
                  ? "border-success/30 bg-surface hover:border-success/50"
                  : "border-line bg-surface hover:border-accent/50"
              }`}
            >
              {/* Completion stripe */}
              {status === "complete" && (
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-success to-emerald-400" />
              )}
              {status === "in-progress" && (
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-soft" />
              )}

              <div className="flex items-start gap-4 p-5">
                {/* Room number + icon */}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl text-2xl ${
                      status === "complete"
                        ? "bg-success/10"
                        : status === "in-progress"
                        ? "bg-accent/10"
                        : locked
                        ? "bg-surface-2"
                        : "bg-surface-2"
                    }`}
                  >
                    {locked ? "🔒" : m.emoji}
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-canvas border border-line text-[10px] font-bold text-gray-400">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white truncate">{m.title}</h3>
                    {/* Status badge */}
                    {status === "complete" && (
                      <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success border border-success/30">
                        <CheckCircle2 size={11} /> Completed
                      </span>
                    )}
                    {status === "in-progress" && (
                      <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent-soft border border-accent/30">
                        <Play size={10} /> In Progress
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-400 line-clamp-2">{m.description}</p>

                  {/* Meta row */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {/* Difficulty */}
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${DIFF_STYLES[diff] ?? DIFF_STYLES.Beginner}`}>
                      {diff}
                    </span>
                    {/* Language */}
                    {lang && (
                      <span className="text-xs text-gray-500">
                        {LANG_EMOJI[lang] ?? ""} {lang}
                      </span>
                    )}
                    {/* Lesson count */}
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={11} /> ~{estMin}m · {total} lessons
                    </span>
                    {/* XP */}
                    <span className="flex items-center gap-1 text-xs text-accent-soft">
                      <Zap size={11} /> {m.xp} XP
                    </span>
                  </div>

                  {/* Progress bar (in-progress only) */}
                  {status === "in-progress" && (
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[11px] text-gray-500">
                        <span>{done}/{total} lessons</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="shrink-0 self-center">
                  {locked ? (
                    <div className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs text-gray-600">
                      <Lock size={12} /> Locked
                    </div>
                  ) : (
                    <Link
                      href={`/learn/${m.slug}`}
                      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        status === "complete"
                          ? "border border-success/40 bg-success/10 text-success hover:bg-success/20"
                          : "btn-primary"
                      }`}
                    >
                      {status === "complete" ? (
                        "Review"
                      ) : status === "in-progress" ? (
                        <>Continue <ArrowRight size={14} /></>
                      ) : (
                        <>Start <Play size={12} /></>
                      )}
                    </Link>
                  )}
                </div>
              </div>

              {/* Completed lessons mini-list (collapsed) — show on complete */}
              {status === "complete" && (
                <div className="border-t border-line/50 px-5 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {m.lessonIds.slice(0, 8).map((id) => {
                      const [, lesson] = id.split("/");
                      return (
                        <span key={id} className="rounded bg-success/10 px-1.5 py-0.5 text-[10px] text-success/70">
                          ✓ {lesson?.replace(/-/g, " ")}
                        </span>
                      );
                    })}
                    {m.lessonIds.length > 8 && (
                      <span className="text-[10px] text-gray-600">+{m.lessonIds.length - 8} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
