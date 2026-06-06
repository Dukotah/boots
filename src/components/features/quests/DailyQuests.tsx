"use client";

import { motion } from "framer-motion";
import { Coins, Check } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { DAILY_QUESTS, isQuestComplete } from "@/lib/quests";

// Today's quests with live progress bars and a claim button. Resets each local
// day automatically (the store rolls daily counters over on the next action).
export function DailyQuests() {
  const mounted = useMounted();
  const today = useGameStore((s) => s.today);
  const claimedQuests = useGameStore((s) => s.claimedQuests);
  const dailyDay = useGameStore((s) => s.dailyDay);
  const claimQuest = useGameStore((s) => s.claimQuest);

  const snap = mounted ? today() : { xp: 0, lessons: 0, streak: 0 };
  // claimedQuests only counts if it's actually today's list.
  const claimedToday = mounted ? claimedQuests : [];

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Daily quests</h2>
        <span className="text-xs text-gray-500">Resets at midnight</span>
      </div>
      <div className="space-y-3">
        {DAILY_QUESTS.map((q) => {
          const progress = Math.min(q.progress(snap), q.goal);
          const pct = Math.round((progress / q.goal) * 100);
          const done = isQuestComplete(q, snap);
          const claimed = claimedToday.includes(q.id) && dailyDay !== null;

          return (
            <div
              key={q.id}
              className="flex items-center gap-3 rounded-xl border border-line bg-canvas/40 p-3"
            >
              <span className="text-2xl">{q.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {q.title}
                  </p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gold">
                    <Coins size={12} aria-hidden="true" /> {q.rewardGold}
                    {q.rewardXp ? ` · ${q.rewardXp} XP` : ""}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    role="progressbar"
                    aria-label={q.title}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={q.goal}
                    className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  </div>
                  <span className="w-12 text-right text-[11px] text-gray-500">
                    {progress}/{q.goal}
                  </span>
                </div>
              </div>
              {claimed ? (
                <span className="flex items-center gap-1 text-xs font-medium text-success">
                  <Check size={14} /> Claimed
                </span>
              ) : (
                <button
                  onClick={() => claimQuest(q.id)}
                  disabled={!done}
                  className="btn-primary px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Claim
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
