"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Sparkles, RotateCcw, Check, Lock, Coins } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { deriveBreadth } from "@/lib/progress";
import {
  TALENTS,
  BRANCH_META,
  RESPEC_COST,
  talentsByBranch,
  talentEffects,
  earnedSkillPoints,
  getTalent,
  gateMet,
  gateLabel,
  type Talent,
  type TalentBranch,
} from "@/lib/talents";
import type { PlayerStats } from "@/types/game";
import { PageSkeleton } from "@/components/PageSkeleton";

type NodeState = "owned" | "available" | "prereq-locked" | "gate-locked";

const BRANCHES: TalentBranch[] = ["prospector", "sentinel", "luminary", "scholar"];

export default function SkillTreePage() {
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const talents = useGameStore((s) => s.talents);
  const buyTalent = useGameStore((s) => s.buyTalent);
  const respecTalents = useGameStore((s) => s.respecTalents);

  const stats: PlayerStats = useMemo(
    () => ({
      xp,
      level: levelFromXp(xp).level,
      gold,
      streak,
      completedCount: completed.length,
      completedIds: completed,
      ...deriveBreadth(completed),
    }),
    [xp, gold, streak, completed],
  );

  const owned = useMemo(() => new Set(talents), [talents]);
  const earned = earnedSkillPoints(stats);
  const spent = talents.reduce((sum, id) => sum + (getTalent(id)?.cost ?? 0), 0);
  const available = earned - spent;
  const fx = useMemo(() => talentEffects(talents), [talents]);

  function nodeState(t: Talent): NodeState {
    if (owned.has(t.id)) return "owned";
    if (!t.requires.every((r) => owned.has(r))) return "prereq-locked";
    if (!gateMet(t.gate, stats)) return "gate-locked";
    return "available";
  }

  function handleRespec() {
    if (gold < RESPEC_COST) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        `Respec your build for ${RESPEC_COST} gold? Your ${spent} skill points are refunded to re-spend. Unlocked cosmetics are kept.`,
      )
    )
      return;
    respecTalents();
  }

  if (!mounted) {
    return <PageSkeleton maxW="max-w-5xl" rows={4} />;
  }

  // Active-bonus chips from the current build.
  const bonuses: string[] = [];
  if (fx.goldMultPct) bonuses.push(`+${fx.goldMultPct}% lesson gold`);
  if (fx.dailyGold) bonuses.push(`+${fx.dailyGold} first-lesson gold`);
  if (fx.chestBonus) bonuses.push(`+${fx.chestBonus} chest gold`);
  if (fx.reviewGold) bonuses.push(`+${fx.reviewGold} gold/review`);
  if (fx.freezePerWeek) bonuses.push(`+${fx.freezePerWeek} freeze/week`);
  if (fx.cosmetics.length)
    bonuses.push(
      `${fx.cosmetics.length} exclusive cosmetic${fx.cosmetics.length > 1 ? "s" : ""}`,
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Skill Tree</h1>
          <p className="mt-1 max-w-xl text-gray-400">
            Spend skill points — earned by finishing courses, paths, and leveling
            up — on permanent perks. None affect XP or Leagues; this is your build,
            not a shortcut.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-center">
            <p className="text-3xl font-extrabold text-white">{available}</p>
            <p className="text-[11px] uppercase tracking-wide text-accent-soft">
              skill points
            </p>
          </div>
          <button
            onClick={handleRespec}
            disabled={spent === 0 || gold < RESPEC_COST}
            className="btn-ghost text-sm disabled:cursor-not-allowed disabled:opacity-40"
            title={
              spent === 0
                ? "No talents to refund"
                : gold < RESPEC_COST
                  ? `Need ${RESPEC_COST - gold} more gold to respec`
                  : `Refund all talents for ${RESPEC_COST} gold`
            }
          >
            <RotateCcw size={15} /> Respec
            <span className="flex items-center gap-0.5 text-gold">
              <Coins size={13} />
              {RESPEC_COST}
            </span>
          </button>
        </div>
      </div>

      {/* SP economy + active bonuses */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
        <span>
          <span className="text-gray-200">{earned}</span> earned ·{" "}
          <span className="text-gray-200">{spent}</span> spent
        </span>
        {bonuses.length > 0 ? (
          <span className="flex flex-wrap items-center gap-2">
            <Sparkles size={14} className="text-accent-soft" />
            {bonuses.map((b) => (
              <span
                key={b}
                className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-gray-200"
              >
                {b}
              </span>
            ))}
          </span>
        ) : (
          <span className="text-gray-400">
            {available === 0
              ? "Finish a course to earn your first skill point — then build below."
              : "No talents yet — pick a branch below."}
          </span>
        )}
      </div>

      {/* Branches */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BRANCHES.map((branch) => {
          const meta = BRANCH_META[branch];
          const nodes = talentsByBranch(branch);
          const ownedInBranch = nodes.filter((t) => owned.has(t.id)).length;
          return (
            <section
              key={branch}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <header className="mb-4 flex items-center gap-3 border-b border-line pb-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${meta.color}22` }}
                >
                  {meta.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-white">{meta.label}</h2>
                  <p className="truncate text-xs text-gray-500">{meta.tagline}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {ownedInBranch}/{nodes.length}
                </span>
              </header>

              <div className="space-y-0">
                {nodes.map((t, i) => {
                  const state = nodeState(t);
                  const affordable = available >= t.cost;
                  return (
                    <div key={t.id}>
                      {i > 0 && nodes[i].tier !== nodes[i - 1].tier && (
                        <div className="mx-auto h-4 w-0.5 bg-line" aria-hidden />
                      )}
                      <TalentCard
                        talent={t}
                        state={state}
                        affordable={affordable}
                        color={meta.color}
                        owned={owned}
                        onBuy={() => buyTalent(t.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        {TALENTS.length} talents · earn 1 point per course finished, 2 per career
        certificate, 1 every 5 levels ·{" "}
        <Link href="/learn" className="text-accent-soft hover:underline">
          go learn to earn more
        </Link>
      </p>
    </div>
  );
}

function TalentCard({
  talent: t,
  state,
  affordable,
  color,
  owned,
  onBuy,
}: {
  talent: Talent;
  state: NodeState;
  affordable: boolean;
  color: string;
  owned: Set<string>;
  onBuy: () => void;
}) {
  const isOwned = state === "owned";
  const dim = state === "prereq-locked" || state === "gate-locked";
  const missingPrereqs = t.requires.filter((r) => !owned.has(r));

  return (
    <div
      className={[
        "rounded-xl border p-3 transition",
        isOwned ? "bg-surface-2" : "bg-canvas/40",
        dim ? "opacity-60" : "",
      ].join(" ")}
      style={{
        borderColor: isOwned ? color : "#2a2a40", // #2a2a40 = tailwind `line`
        boxShadow: isOwned ? `0 0 22px -10px ${color}` : undefined,
      }}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-2xl">
          {state === "prereq-locked" || state === "gate-locked" ? "🔒" : t.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-white">{t.label}</h3>
            {t.keystone && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: `${color}22`, color }}
              >
                Keystone
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-snug text-gray-400">
            {t.description}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-xs font-medium" style={{ color }}>
          {t.cost} SP
        </span>

        {isOwned ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-success">
            <Check size={13} /> Owned
          </span>
        ) : state === "prereq-locked" ? (
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Lock size={11} /> Needs{" "}
            {missingPrereqs.map((r) => getTalent(r)?.label ?? r).join(", ")}
          </span>
        ) : state === "gate-locked" ? (
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Lock size={11} /> {t.gate ? gateLabel(t.gate) : "Locked"}
          </span>
        ) : (
          <button
            onClick={onBuy}
            disabled={!affordable}
            className="rounded-lg px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed"
            style={{
              backgroundColor: affordable ? color : "#2a2a40",
              color: affordable ? "#0a0a12" : "#e5e7eb",
            }}
          >
            {affordable ? "Unlock" : "Need more SP"}
          </button>
        )}
      </div>
    </div>
  );
}
