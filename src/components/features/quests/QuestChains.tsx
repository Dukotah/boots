"use client";

import { Coins, Check, Lock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  QUEST_CHAINS,
  chainStepKey,
  isChainStepComplete,
} from "@/lib/quests";
import type { PlayerStats } from "@/types/game";

const EMPTY_STATS: PlayerStats = {
  xp: 0,
  level: 1,
  gold: 0,
  streak: 0,
  completedCount: 0,
  completedIds: [],
  languages: [],
  completedModules: [],
  modulesTouched: 0,
};

// Multi-step journeys. Steps unlock in order; each is claimed once when its goal
// is met and the previous step has been claimed.
export function QuestChains() {
  const mounted = useMounted();
  const stats = useGameStore((s) => s.stats);
  const claimedChainSteps = useGameStore((s) => s.claimedChainSteps);
  const claimChainStep = useGameStore((s) => s.claimChainStep);

  const s = mounted ? stats() : EMPTY_STATS;
  const claimed = mounted ? claimedChainSteps : [];

  return (
    <div className="space-y-6">
      {QUEST_CHAINS.map((chain) => {
        const claimedCount = chain.steps.filter((st) =>
          claimed.includes(chainStepKey(chain.id, st.id)),
        ).length;

        return (
          <div key={chain.id} className="card">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">{chain.icon}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">{chain.title}</h3>
                <p className="text-xs text-gray-400">{chain.description}</p>
              </div>
              <span className="text-xs text-gray-400">
                {claimedCount}/{chain.steps.length}
              </span>
            </div>

            <ol className="space-y-2">
              {chain.steps.map((step, i) => {
                const key = chainStepKey(chain.id, step.id);
                const isClaimed = claimed.includes(key);
                const prevClaimed =
                  i === 0 ||
                  claimed.includes(chainStepKey(chain.id, chain.steps[i - 1].id));
                const goalMet = isChainStepComplete(step, s);
                const progress = Math.min(step.progress(s), step.goal);
                const pct = Math.round((progress / step.goal) * 100);
                const locked = !prevClaimed && !isClaimed;

                return (
                  <li
                    key={step.id}
                    className={[
                      "flex items-center gap-3 rounded-xl border p-3",
                      isClaimed
                        ? "border-success/40 bg-success/5"
                        : locked
                          ? "border-line bg-canvas/20 opacity-60"
                          : "border-line bg-canvas/40",
                    ].join(" ")}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-gray-400">
                      {isClaimed ? <Check size={13} className="text-success" /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {step.title}
                        </p>
                        <span className="flex items-center gap-1 text-xs font-semibold text-gold">
                          <Coins size={12} /> {step.rewardGold}
                          {step.rewardXp ? ` · ${step.rewardXp} XP` : ""}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{step.description}</p>
                      {!isClaimed && !locked && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-12 text-right text-[11px] text-gray-400">
                            {progress}/{step.goal}
                          </span>
                        </div>
                      )}
                    </div>
                    {isClaimed ? (
                      <span className="text-xs font-medium text-success">Claimed</span>
                    ) : locked ? (
                      <Lock size={14} className="text-gray-400" aria-label="Locked — complete the previous step first" />
                    ) : (
                      <button
                        onClick={() => claimChainStep(chain.id, step.id)}
                        disabled={!goalMet}
                        className="btn-primary px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Claim
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
