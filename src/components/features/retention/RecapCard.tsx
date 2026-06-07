"use client";

import { useState } from "react";
import { Share2, Flame, Zap, BookOpenCheck, Trophy, Star } from "lucide-react";
import type { RecapData } from "@/lib/recap";
import { tierColor } from "@/lib/recap";

// ── Tone → Tailwind colour mapping ─────────────────────────────────────────
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

// ── Stat grid card ──────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: string;
}) {
  const textColor = TONE_TEXT[tone] ?? TONE_TEXT.default;
  const borderColor = TONE_BORDER[tone] ?? TONE_BORDER.default;
  return (
    <div
      className={`rounded-xl border ${borderColor} bg-canvas/40 p-4 text-center`}
    >
      <p className={`text-xl font-bold ${textColor}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-400">{label}</p>
      {sub && <p className="mt-1 text-[11px] text-gray-400">{sub}</p>}
    </div>
  );
}

// ── Main card ───────────────────────────────────────────────────────────────
export function RecapCard({ data }: { data: RecapData }) {
  const [shared, setShared] = useState(false);

  const tierTextColor = tierColor(data.leagueTier);

  async function share() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/recap`
        : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "My week on Cantrip",
          text: data.shareText,
          url,
        });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(data.shareText);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // user dismissed share sheet — no-op
    }
  }

  return (
    <div className="card space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Your week in code</h2>
          <p className="mt-1 text-sm text-gray-400">
            Season recap &mdash; {data.daysLeft === 0
              ? "season ending soon"
              : `${data.daysLeft} day${data.daysLeft !== 1 ? "s" : ""} left`}
          </p>
        </div>
        {/* League badge */}
        <div
          className={`flex shrink-0 flex-col items-center rounded-xl border border-line bg-surface-2 px-4 py-2 ${tierTextColor}`}
        >
          <span className="text-2xl">{data.leagueEmoji}</span>
          <span className="text-xs font-semibold">{data.leagueName}</span>
        </div>
      </div>

      {/* XP hero stat */}
      <div className="rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 to-fuchsia-500/5 px-6 py-5 text-center">
        <p className="text-5xl font-extrabold tracking-tight text-white">
          {data.weeklyXp.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-gray-400">XP earned this season</p>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpenCheck size={14} className="text-emerald-400" />
            {data.weeklyLessons} lesson{data.weeklyLessons !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-red-400" />
            {data.streak}-day streak
          </span>
          <span className="flex items-center gap-1">
            <Zap size={14} className="text-accent-soft" />
            Level {data.level} · {data.rankName}
          </span>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {data.stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            sub={s.sub}
            tone={s.tone}
          />
        ))}
      </div>

      {/* New achievements (if any) */}
      {data.newAchievements.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <Star size={12} />
            Earned this week
          </p>
          <div className="flex flex-wrap gap-2">
            {data.newAchievements.map((a) => (
              <span
                key={a.id}
                className="flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 px-3 py-1 text-xs font-medium text-yellow-300"
              >
                <span>{a.icon}</span>
                {a.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* All-time badge count teaser */}
      {data.achievementCount > 0 && (
        <p className="flex items-center gap-1.5 text-sm text-gray-500">
          <Trophy size={13} className="text-yellow-500" />
          {data.achievementCount} badge{data.achievementCount !== 1 ? "s" : ""} earned all time
        </p>
      )}

      {/* Share button */}
      <button
        onClick={share}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface-2 py-3 text-sm font-medium text-white transition hover:border-accent/50"
      >
        <Share2 size={15} />
        {shared ? "Copied to clipboard!" : "Share your week"}
      </button>
    </div>
  );
}
