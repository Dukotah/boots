"use client";

import { useEffect } from "react";
import { Swords, Users, User, Coins, Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { PageSkeleton } from "@/components/PageSkeleton";

export default function BossPage() {
  const mounted = useMounted();
  const checkSeason = useGameStore((s) => s.checkSeason);
  const bossSel = useGameStore((s) => s.boss);
  const season = useGameStore((s) => s.season);
  const claimBoss = useGameStore((s) => s.claimBoss);

  useEffect(() => {
    checkSeason();
  }, [checkSeason]);

  if (!mounted) {
    return <PageSkeleton maxW="max-w-2xl" rows={2} />;
  }

  const { boss, state, claimed } = bossSel();
  const { daysLeft } = season();
  const hpPct = Math.round(state.pct * 100);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-3">
        <Swords className="text-danger" />
        <h1 className="text-3xl font-bold text-white">Weekly Boss</h1>
      </div>
      <p className="mt-1 text-gray-400">
        The whole community fights one boss each week. Every lesson you complete
        deals damage. Defeat it before the season ends to claim the bounty.
      </p>

      <div className="card mt-6 text-center">
        <div className="text-7xl">{boss.emoji}</div>
        <h2 className="mt-3 text-2xl font-bold text-white">{boss.name}</h2>
        <p className="mt-1 text-sm text-gray-400">{boss.blurb}</p>

        {/* HP bar */}
        <div className="mt-6">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
            <span>{state.defeated ? "Defeated!" : "Boss HP"}</span>
            <span>
              {state.remaining.toLocaleString()} / {boss.maxHp.toLocaleString()}
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-surface-2">
            <div
              className={[
                "h-full rounded-full transition-all",
                state.defeated
                  ? "bg-success"
                  : "bg-gradient-to-r from-rose-600 to-rose-400",
              ].join(" ")}
              style={{ width: `${hpPct}%` }}
            />
          </div>
        </div>

        {/* Damage breakdown */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-line bg-canvas/40 p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <User size={14} /> Your damage
            </div>
            <p className="mt-1 text-lg font-bold text-accent-soft">
              {state.playerDamage.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-canvas/40 p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Users size={14} /> Community
            </div>
            <p className="mt-1 text-lg font-bold text-white">
              {state.communityDamage.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          {daysLeft} day{daysLeft === 1 ? "" : "s"} left this season
        </p>

        {/* Reward / claim */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-semibold text-gold">
              <Coins size={15} /> {boss.rewardGold}
            </span>
            <span className="flex items-center gap-1 font-semibold text-accent-soft">
              <Zap size={15} /> {boss.rewardXp} XP
            </span>
          </div>
          {claimed ? (
            <span className="text-sm font-medium text-success">
              ✓ Reward claimed — see you next week!
            </span>
          ) : (
            <button
              onClick={() => claimBoss(boss.id)}
              disabled={!state.defeated}
              className="btn-primary mx-auto disabled:cursor-not-allowed disabled:opacity-40"
            >
              {state.defeated ? "Claim bounty" : "Deal more damage to win"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
