"use client";

import { Flame, Coins, Trophy, BookOpenCheck } from "lucide-react";
import { levelFromXp } from "@/lib/levels";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { XPBar } from "@/components/XPBar";
import { MascotBoots } from "@/components/MascotBoots";

export type ProfileData = {
  name: string;
  xp: number;
  streak: number;
  gold: number;
  completedCount: number;
  achievements: string[];
};

// A shareable, public-friendly snapshot of a learner's progress. Used by the
// owner's /profile and by public /u/[username] pages alike.
export function ProfileCard({ data }: { data: ProfileData }) {
  const info = levelFromXp(data.xp);
  const earned = ACHIEVEMENTS.filter((a) => data.achievements.includes(a.id));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-3xl shadow-glow">
          {info.rank.emoji}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-white">{data.name}</h1>
          <p className="text-sm text-gray-400">
            Level {info.level} · {info.rank.name}
          </p>
        </div>
        <div className="ml-auto hidden sm:block">
          <MascotBoots size={48} />
        </div>
      </div>

      <div className="mt-5">
        <XPBar info={info} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Flame size={16} />} value={data.streak} label="day streak" tone="text-danger" />
        <Stat icon={<Coins size={16} />} value={data.gold} label="gold" tone="text-gold" />
        <Stat icon={<BookOpenCheck size={16} />} value={data.completedCount} label="lessons" tone="text-accent-soft" />
        <Stat icon={<Trophy size={16} />} value={earned.length} label="badges" tone="text-success" />
      </div>

      {earned.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Achievements
          </p>
          <div className="flex flex-wrap gap-2">
            {earned.map((a) => (
              <span
                key={a.id}
                title={a.title}
                className="flex items-center gap-1 rounded-full border border-line bg-canvas/50 px-2.5 py-1 text-xs text-gray-200"
              >
                <span>{a.icon}</span> {a.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas/40 p-3 text-center">
      <div className={`mb-1 flex justify-center ${tone}`}>{icon}</div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  );
}
