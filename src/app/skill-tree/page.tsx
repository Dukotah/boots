"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  RotateCcw,
  Check,
  Lock,
  Coins,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
  effectLine,
  getTalent,
  gateMet,
  gateLabel,
  type Talent,
  type TalentBranch,
} from "@/lib/talents";
import type { PlayerStats } from "@/types/game";
import { PageSkeleton } from "@/components/PageSkeleton";
import { RecommendedBuilds } from "@/components/features/talents/RecommendedBuilds";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type NodeState = "owned" | "available" | "prereq-locked" | "gate-locked";

const BRANCHES: TalentBranch[] = [
  "prospector",
  "sentinel",
  "luminary",
  "scholar",
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SkillTreePage() {
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const talents = useGameStore((s) => s.talents);
  const buyTalent = useGameStore((s) => s.buyTalent);
  const respecTalents = useGameStore((s) => s.respecTalents);

  const [activeBranch, setActiveBranch] = useState<TalentBranch>("prospector");
  const [spInfoOpen, setSpInfoOpen] = useState(false);

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
  const spent = talents.reduce(
    (sum, id) => sum + (getTalent(id)?.cost ?? 0),
    0,
  );
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
    return <PageSkeleton maxW="max-w-3xl" rows={4} />;
  }

  // Active-bonus chips
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

  const meta = BRANCH_META[activeBranch];
  const branchNodes = talentsByBranch(activeBranch);

  // Group nodes into tier arrays for row rendering
  const tierGroups = branchNodes.reduce<Record<number, Talent[]>>((acc, t) => {
    (acc[t.tier] ??= []).push(t);
    return acc;
  }, {});
  const tiers = Object.keys(tierGroups)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Skill Tree</h1>
          <p className="mt-1 max-w-lg text-sm text-gray-400">
            Permanent perks for learning. None affect XP or Leagues — this is
            your build, not a shortcut.
          </p>
        </div>

        {/* SP balance + respec */}
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
            aria-label={
              spent === 0
                ? "No talents to refund"
                : gold < RESPEC_COST
                  ? `Need ${RESPEC_COST - gold} more gold to respec`
                  : `Refund all talents for ${RESPEC_COST} gold`
            }
            title={
              spent === 0
                ? "No talents to refund"
                : gold < RESPEC_COST
                  ? `Need ${RESPEC_COST - gold} more gold to respec`
                  : `Refund all talents for ${RESPEC_COST} gold`
            }
          >
            <RotateCcw size={15} aria-hidden /> Respec
            <span className="flex items-center gap-0.5 text-gold">
              <Coins size={13} aria-hidden />
              {RESPEC_COST}
            </span>
          </button>
        </div>
      </div>

      {/* ── SP economy line ──────────────────────────────────────────────── */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-gray-400">
            <span className="font-semibold text-gray-200">{earned}</span>{" "}
            earned ·{" "}
            <span className="font-semibold text-gray-200">{spent}</span> spent
          </span>

          {bonuses.length > 0 && (
            <span className="flex flex-wrap items-center gap-1.5">
              <Sparkles size={13} className="text-accent-soft" aria-hidden />
              {bonuses.map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-gray-200"
                >
                  {b}
                </span>
              ))}
            </span>
          )}

          {/* Collapsible "how SP works" */}
          <button
            onClick={() => setSpInfoOpen((v) => !v)}
            className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
            aria-expanded={spInfoOpen}
            aria-controls="sp-explainer"
          >
            How SP works
            {spInfoOpen ? (
              <ChevronUp size={12} aria-hidden />
            ) : (
              <ChevronDown size={12} aria-hidden />
            )}
          </button>
        </div>

        {spInfoOpen && (
          <p
            id="sp-explainer"
            className="mt-2 rounded-xl bg-surface-2 px-4 py-3 text-xs leading-relaxed text-gray-400"
          >
            <strong className="text-gray-300">Earning:</strong> +1 SP per
            course completed · +2 SP per career certificate · +1 SP every 5
            levels.{" "}
            <strong className="text-gray-300">Spending:</strong> unlock
            permanent perks below.{" "}
            <strong className="text-gray-300">Respec:</strong> costs{" "}
            {RESPEC_COST} gold and refunds all invested SP instantly (cosmetics
            you unlocked are kept).
          </p>
        )}
      </div>

      {/* ── Recommended Builds (owned by another agent) ─────────────────── */}
      <div className="mt-6">
        <RecommendedBuilds />
      </div>

      {/* ── Branch tab switcher ──────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Skill tree branches"
        className="mt-8 flex gap-2 overflow-x-auto pb-1"
      >
        {BRANCHES.map((branch) => {
          const m = BRANCH_META[branch];
          const nodes = talentsByBranch(branch);
          const spInBranch = nodes
            .filter((t) => owned.has(t.id))
            .reduce((sum, t) => sum + t.cost, 0);
          const isActive = branch === activeBranch;

          return (
            <button
              key={branch}
              role="tab"
              aria-selected={isActive}
              aria-controls="branch-panel"
              id={`tab-${branch}`}
              onClick={() => setActiveBranch(branch)}
              className={[
                "flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
                isActive
                  ? "border-transparent text-white"
                  : "border-line bg-surface text-gray-400 hover:border-line hover:text-gray-200",
              ].join(" ")}
              style={
                isActive
                  ? {
                      backgroundColor: `${m.color}22`,
                      borderColor: `${m.color}66`,
                      color: m.color,
                    }
                  : {}
              }
            >
              <span aria-hidden>{m.icon}</span>
              <span>{m.label}</span>
              {spInBranch > 0 && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: `${m.color}33`,
                    color: m.color,
                  }}
                >
                  {spInBranch} SP
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Branch panel ────────────────────────────────────────────────── */}
      <section
        id="branch-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeBranch}`}
        className="mt-4 rounded-2xl border border-line bg-surface p-5"
      >
        {/* Branch header */}
        <div className="mb-5 flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: `${meta.color}22` }}
            aria-hidden
          >
            {meta.icon}
          </span>
          <div>
            <h2
              className="text-lg font-bold text-white"
              style={{ color: meta.color }}
            >
              {meta.label}
            </h2>
            <p className="text-sm text-gray-400">{meta.tagline}</p>
            {/* Keystone tease */}
            {(() => {
              const ks = branchNodes.find((t) => t.keystone);
              return ks ? (
                <p className="mt-1 text-xs text-gray-500">
                  Keystone:{" "}
                  <span className="text-gray-300">{ks.label}</span> —{" "}
                  {effectLine(ks.effect)}
                </p>
              ) : null;
            })()}
          </div>
        </div>

        {/* Tier rows with connector lines */}
        <div className="space-y-0">
          {tiers.map((tier, tierIdx) => {
            const nodes = tierGroups[tier];
            return (
              <div key={tier}>
                {/* Connector line between tiers */}
                {tierIdx > 0 && (
                  <div
                    className="mx-auto my-1 w-0.5 rounded-full"
                    style={{
                      height: 24,
                      backgroundColor: `${meta.color}44`,
                    }}
                    aria-hidden
                  />
                )}

                {/* Tier label (only on tier > 0) */}
                {tier > 0 && (
                  <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-gray-600">
                    Tier {tier + 1}
                  </p>
                )}

                {/* Nodes in this tier — single column on mobile, up to 2-col on md */}
                <div
                  className={
                    nodes.length > 1
                      ? "grid gap-3 sm:grid-cols-2"
                      : "grid gap-3"
                  }
                >
                  {nodes.map((t) => {
                    const state = nodeState(t);
                    const affordable = available >= t.cost;
                    return (
                      <TalentNode
                        key={t.id}
                        talent={t}
                        state={state}
                        affordable={affordable}
                        availableSp={available}
                        color={meta.color}
                        owned={owned}
                        onBuy={() => buyTalent(t.id)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer hint ─────────────────────────────────────────────────── */}
      <p className="mt-6 text-center text-xs text-gray-500">
        {TALENTS.length} talents across 4 branches ·{" "}
        <Link href="/learn" className="text-accent-soft hover:underline">
          finish courses to earn more SP
        </Link>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TalentNode — a single talent card inside the focused branch panel
// ─────────────────────────────────────────────────────────────────────────────

function TalentNode({
  talent: t,
  state,
  affordable,
  availableSp,
  color,
  owned,
  onBuy,
}: {
  talent: Talent;
  state: NodeState;
  affordable: boolean;
  availableSp: number;
  color: string;
  owned: Set<string>;
  onBuy: () => void;
}) {
  const isOwned = state === "owned";
  const isLocked = state === "prereq-locked" || state === "gate-locked";
  const missingPrereqs = t.requires.filter((r) => !owned.has(r));

  // Why-locked message — concrete and actionable
  function lockedReason(): string {
    if (state === "prereq-locked") {
      const labels = missingPrereqs.map((r) => getTalent(r)?.label ?? r);
      return `Requires: ${labels.join(", ")}`;
    }
    if (state === "gate-locked" && t.gate) {
      return gateLabel(t.gate);
    }
    return "Locked";
  }

  const concreteLine = effectLine(t.effect);

  return (
    <div
      className={[
        "rounded-2xl border p-4 transition",
        isOwned ? "bg-surface-2" : "bg-canvas/40",
        isLocked ? "opacity-55" : "",
      ].join(" ")}
      style={{
        borderColor: isOwned ? color : "#2a2a40",
        boxShadow: isOwned ? `0 0 24px -10px ${color}` : undefined,
      }}
    >
      {/* Top row: icon + name + keystone badge */}
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 text-3xl leading-none"
          aria-hidden
        >
          {isLocked ? "🔒" : t.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-white">{t.label}</h3>
            {t.keystone && (
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${color}22`, color }}
              >
                Keystone
              </span>
            )}
          </div>

          {/* Concrete effect — the main value prop, prominent */}
          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: isLocked ? "#6b7280" : color }}
          >
            {concreteLine}
          </p>

          {/* Flavour description (secondary, dimmer) */}
          <p className="mt-0.5 text-xs leading-snug text-gray-500">
            {t.description}
          </p>
        </div>
      </div>

      {/* Bottom row: cost + action */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
        {/* SP cost */}
        <span
          className="text-xs font-semibold"
          style={{ color: isLocked ? "#6b7280" : color }}
        >
          {t.cost} SP
        </span>

        {/* State-driven right side */}
        {isOwned ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-success">
            <Check size={13} aria-hidden /> Owned
          </span>
        ) : state === "prereq-locked" ? (
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Lock size={11} aria-hidden />
            {lockedReason()}
          </span>
        ) : state === "gate-locked" ? (
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Lock size={11} aria-hidden />
            {lockedReason()}
          </span>
        ) : affordable ? (
          <button
            onClick={onBuy}
            className="rounded-lg px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
            style={{ backgroundColor: color, color: "#0a0a12" }}
            aria-label={`Unlock ${t.label} for ${t.cost} skill points`}
          >
            Unlock
          </button>
        ) : (
          <span className="text-[11px] text-gray-400">
            Need {t.cost - availableSp} more SP
          </span>
        )}
      </div>
    </div>
  );
}
