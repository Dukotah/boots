"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Swords, Users, User, Coins, Zap, Gift, Timer, ChevronRight } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { PageSkeleton } from "@/components/PageSkeleton";
// Lightweight static defs only (no curriculum content) — safe in this client bundle.
import { TRACK_BOSS_DEFS } from "@/lib/curriculum/track-boss-defs";

/** Map tier label → accent colour class for the reveal badge. */
const TIER_COLORS: Record<string, string> = {
  Common:   "text-gray-300",
  Uncommon: "text-emerald-400",
  Rare:     "text-sky-400",
  Jackpot:  "text-amber-400",
};

export default function BossPage() {
  const mounted = useMounted();
  const checkSeason = useGameStore((s) => s.checkSeason);
  const bossSel = useGameStore((s) => s.boss);
  const season = useGameStore((s) => s.season);
  const claimBoss = useGameStore((s) => s.claimBoss);
  const lastBossRoll = useGameStore((s) => s.lastBossRoll);
  const claimedTrackBosses = useGameStore((s) => s.claimedTrackBosses);

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
          {/* Potential reward preview (shown before claim) */}
          {!claimed && (
            <div className="mb-3 flex items-center justify-center gap-3 text-sm">
              <span className="flex items-center gap-1 font-semibold text-gold">
                <Coins size={15} />
                {/* Show the range rather than a misleading fixed number */}
                {Math.round(boss.rewardGold * 0.60)}–{Math.round(boss.rewardGold * 2.20)} gold
              </span>
              <span className="text-gray-500">·</span>
              <span className="flex items-center gap-1 font-semibold text-accent-soft">
                <Zap size={15} /> {boss.rewardXp} XP
              </span>
            </div>
          )}

          {claimed ? (
            lastBossRoll ? (
              /* Fresh claim this session — reveal the roll result */
              <div className="rounded-xl border border-line bg-canvas/40 px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-1">
                  <Gift size={13} /> Loot chest opened
                </div>
                <p className={[
                  "text-2xl font-bold",
                  TIER_COLORS[lastBossRoll.tier] ?? "text-gold",
                ].join(" ")}>
                  +{lastBossRoll.gold} gold
                </p>
                <p className={[
                  "mt-0.5 text-xs font-semibold uppercase tracking-wider",
                  TIER_COLORS[lastBossRoll.tier] ?? "text-gold",
                ].join(" ")}>
                  {lastBossRoll.tier} drop
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  +{boss.rewardXp} XP · See you next week!
                </p>
              </div>
            ) : (
              /* Returning visit after already claimed — no roll in memory */
              <span className="text-sm font-medium text-success">
                ✓ Reward claimed — see you next week!
              </span>
            )
          ) : (
            <button
              onClick={() => claimBoss(boss.id)}
              disabled={!state.defeated}
              className="btn-primary mx-auto disabled:cursor-not-allowed disabled:opacity-40"
            >
              {state.defeated ? "Open loot chest" : "Deal more damage to win"}
            </button>
          )}
        </div>
      </div>

      {/* ── Track Bosses: per-track skills capstones (solo, on-demand) ── */}
      {TRACK_BOSS_DEFS.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <Swords className="text-rose-400" size={20} />
            <h2 className="text-2xl font-bold text-white">Track Bosses</h2>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            A timed gauntlet for each track — beat 3–5 of its toughest challenges
            back-to-back to prove you&apos;ve mastered it. Fight any time, as
            often as you like.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TRACK_BOSS_DEFS.map((b) => {
              const cleared = claimedTrackBosses.includes(b.id);
              return (
                <Link
                  key={b.id}
                  href={`/boss/track/${b.id}`}
                  className="group card flex items-center gap-4 transition-colors hover:border-rose-500/50"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-3xl">
                    {b.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-bold text-white">{b.name}</h3>
                      {cleared && (
                        <span className="shrink-0 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                          Cleared
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Swords size={12} /> {b.tasks.length} trials
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer size={12} /> {Math.round(b.timeLimitSec / 60)} min
                      </span>
                      <span className="flex items-center gap-1 text-gold">
                        <Coins size={12} /> {b.rewardGold}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-300"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
