"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { DailyQuests } from "@/components/features/quests/DailyQuests";
import { WeeklyQuests } from "@/components/features/quests/WeeklyQuests";
import { QuestChains } from "@/components/features/quests/QuestChains";

export default function QuestsPage() {
  // Roll the league season over if it expired, so weekly quests reset correctly.
  const checkSeason = useGameStore((s) => s.checkSeason);
  useEffect(() => {
    checkSeason();
  }, [checkSeason]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Quests</h1>
      <p className="mt-1 text-gray-400">
        Daily and weekly goals for steady gold and XP — plus longer journeys that
        track your growth.
      </p>

      <div className="mt-8 space-y-4">
        <DailyQuests />
        <WeeklyQuests />
      </div>

      <h2 className="mt-10 text-xl font-bold text-white">Quest chains</h2>
      <p className="mt-1 text-sm text-gray-400">
        Multi-step journeys. Claim each step to unlock the next.
      </p>
      <div className="mt-4">
        <QuestChains />
      </div>
    </div>
  );
}
