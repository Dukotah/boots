"use client";

import { useState } from "react";
import { Share2, Zap, BookOpenCheck, Flame, Trophy, Star } from "lucide-react";
import type { WrappedData, WrappedStat } from "@/lib/wrapped";

// ── Tone → Tailwind colour mapping ──────────────────────────────────────────
const TONE_TEXT: Record<string, string> = {
  accent: "text-accent-soft",
  gold: "text-yellow-400",
  danger: "text-red-400",
  success: "text-emerald-400",
  default: "text-gray-200",
};

const TONE_BORDER: Record<string, string> = {
  accent: "border-accent/30",
  gold: "border-yellow-400/30",
  danger: "border-red-400/30",
  success: "border-emerald-400/30",
  default: "border-line",
};

// ── Single stat grid tile ────────────────────────────────────────────────────
function StatTile({ stat }: { stat: WrappedStat }) {
  const tone = stat.tone ?? "default";
  const textColor = TONE_TEXT[tone] ?? TONE_TEXT.default;
  const borderColor = TONE_BORDER[tone] ?? TONE_BORDER.default;

  return (
    <div
      className={`rounded-xl border ${borderColor} bg-canvas/40 p-4 text-center`}
    >
      <p className="mb-1 text-xl">{stat.icon}</p>
      <p className={`text-xl font-bold ${textColor}`}>{stat.value}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-400">{stat.label}</p>
      {stat.sub && (
        <p className="mt-1 text-[11px] text-gray-500">{stat.sub}</p>
      )}
    </div>
  );
}

// ── Language pill ─────────────────────────────────────────────────────────────
function LangPill({ name }: { name: string }) {
  return (
    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
      {name}
    </span>
  );
}

// ── Main WrappedCard ──────────────────────────────────────────────────────────
export function WrappedCard({ data }: { data: WrappedData }) {
  const [shared, setShared] = useState(false);

  async function share() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/wrapped`
        : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "My Cantrip Wrapped",
          text: data.shareText,
          url,
        });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${data.shareText}\n${url}`);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // user dismissed share sheet — no-op
    }
  }

  return (
    <div className="card space-y-6">
      {/* Hero gradient banner */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-violet-700/40 via-accent/20 to-fuchsia-600/30 px-6 py-8 text-center">
        {/* Rank emoji + level */}
        <p className="text-5xl">{data.rankEmoji}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Level {data.level} &middot; {data.rankName}
        </p>

        {/* Headline */}
        <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
          {data.headline}
        </h2>

        {/* XP hero number */}
        <p className="mt-5 text-6xl font-black tracking-tighter text-white">
          {data.totalXp.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-gray-400">total XP</p>

        {/* Quick-glance row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <BookOpenCheck size={14} className="text-emerald-400" />
            {data.lessonsCompleted} lessons
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-red-400" />
            {data.longestStreak}d best streak
          </span>
          <span className="flex items-center gap-1">
            <Zap size={14} className="text-accent-soft" />
            {data.gold.toLocaleString()} gold
          </span>
          <span className="flex items-center gap-1">
            <Trophy size={14} className="text-yellow-400" />
            {data.achievementsUnlocked} badges
          </span>
        </div>
      </div>

      {/* RPG stat lines */}
      {data.statLines.length > 0 && (
        <div className="space-y-2">
          {data.statLines.map((line, i) => (
            <p key={i} className="text-sm text-gray-300">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.stats.map((s) => (
          <StatTile key={s.label} stat={s} />
        ))}
      </div>

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <Star size={12} />
            Languages mastered
          </p>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang) => (
              <LangPill key={lang} name={lang} />
            ))}
          </div>
        </div>
      )}

      {/* Share button */}
      <button
        onClick={share}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface-2 py-3 text-sm font-medium text-white transition hover:border-accent/50"
      >
        <Share2 size={15} />
        {shared ? "Copied to clipboard!" : "Share your Wrapped"}
      </button>
    </div>
  );
}
