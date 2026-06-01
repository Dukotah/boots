"use client";

import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { ACHIEVEMENTS } from "@/lib/achievements";

const RARITY: Record<string, string> = {
  common: "border-gray-500/40 text-gray-300",
  rare: "border-sky-500/50 text-sky-300 shadow-[0_0_20px_-8px_rgba(56,189,248,0.6)]",
  epic: "border-violet-500/50 text-violet-300 shadow-[0_0_20px_-8px_rgba(167,139,250,0.6)]",
  legendary:
    "border-gold/60 text-gold shadow-[0_0_28px_-8px_rgba(250,204,21,0.7)]",
};

export default function AchievementsPage() {
  const mounted = useMounted();
  const unlocked = useGameStore((s) => s.achievements);
  const have = new Set(mounted ? unlocked : []);
  const earned = have.size;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
        <span className="text-sm text-gray-400">
          {earned}/{ACHIEVEMENTS.length} unlocked
        </span>
      </div>
      <p className="mt-1 text-gray-400">
        Rewards for breadth and habit — never grind. Keep your streak and explore
        new languages to fill the case.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const got = have.has(a.id);
          return (
            <div
              key={a.id}
              className={[
                "card flex flex-col items-center text-center transition",
                got ? RARITY[a.rarity] : "border-line opacity-50 grayscale",
              ].join(" ")}
            >
              <span className="text-4xl">{got ? a.icon : "🔒"}</span>
              <h2 className="mt-2 font-bold text-white">{a.title}</h2>
              <p className="mt-1 text-xs text-gray-400">{a.description}</p>
              <span className="mt-3 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                {a.rarity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
