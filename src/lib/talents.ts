// Talent tree — the active, "spend points to build your character" system.
//
// Design rules (from the gameplan + GDKeys' "meaningful skills"):
//  - Skill Points (SP) are EARNED by genuine learning and SPENT here. Earning is
//    fully derived from progress (no new persisted earn-state); only the set of
//    purchased talent ids is stored — exactly like cosmetics.
//  - Every effect is gold (economy), QoL, or cosmetic. NOTHING here grants XP or
//    anything that feeds Leagues, so the leaderboard stays pay-to-win-free even
//    though you're "spending points to get stronger".
//  - SP is always scarcer than the tree is wide → real build choices + respec.

import { completedPaths } from "@/lib/paths";
import type { PlayerStats } from "@/types/game";

export type TalentBranch = "prospector" | "sentinel" | "luminary" | "scholar";

/** A talent's effect, interpreted by the store (economy/QoL) or equip (cosmetic). */
export type TalentEffect =
  | { kind: "gold-mult"; pct: number } // +pct% gold from lesson completions
  | { kind: "daily-gold"; gold: number } // bonus gold on the first lesson each day
  | { kind: "chest-luck"; gold: number } // flat bonus added to mystery-chest payouts
  | { kind: "freeze-regen"; perWeek: number } // streak freezes granted each season roll
  | { kind: "review-gold"; gold: number } // gold earned per *due* spaced-repetition review
  | { kind: "cosmetic"; cosmeticId: string }; // unlocks (grants ownership of) a cosmetic

/** Optional learning gate — ties a talent to real progress, not just SP. */
export type TalentGate =
  | { kind: "modules"; value: number } // ≥ N modules fully completed
  | { kind: "level"; value: number }; // ≥ level N

export type Talent = {
  id: string;
  branch: TalentBranch;
  tier: number; // depth within the branch (0 = entry)
  label: string;
  description: string; // verb-led, says what it DOES
  icon: string;
  cost: number; // SP
  requires: string[]; // prerequisite talent ids (same branch)
  gate?: TalentGate;
  effect: TalentEffect;
  keystone?: boolean; // branch-defining capstone
};

export const RESPEC_COST = 300; // gold — high enough that respec is a real decision

export const BRANCH_META: Record<
  TalentBranch,
  { label: string; tagline: string; icon: string; color: string }
> = {
  prospector: {
    label: "Prospector",
    tagline: "Turn lessons into gold.",
    icon: "💰",
    color: "#fbbf24",
  },
  sentinel: {
    label: "Sentinel",
    tagline: "Guard your streak.",
    icon: "🛡️",
    color: "#34d399",
  },
  luminary: {
    label: "Luminary",
    tagline: "Wear what can't be bought.",
    icon: "✨",
    color: "#a78bfa",
  },
  scholar: {
    label: "Scholar",
    tagline: "Get paid to remember.",
    icon: "📚",
    color: "#38bdf8",
  },
};

export const TALENTS: Talent[] = [
  // ── 💰 Prospector — economy ────────────────────────────────────────────────
  {
    id: "prospector-rush-1",
    branch: "prospector",
    tier: 0,
    label: "Gold Rush I",
    description: "Earn +10% gold from every lesson you complete.",
    icon: "🪙",
    cost: 1,
    requires: [],
    effect: { kind: "gold-mult", pct: 10 },
  },
  {
    id: "prospector-morning",
    branch: "prospector",
    tier: 1,
    label: "Morning Coin",
    description: "Collect +15 bonus gold on your first lesson each day.",
    icon: "🌅",
    cost: 2,
    requires: ["prospector-rush-1"],
    effect: { kind: "daily-gold", gold: 15 },
  },
  {
    id: "prospector-rush-2",
    branch: "prospector",
    tier: 1,
    label: "Gold Rush II",
    description: "Earn an additional +15% gold from lessons (stacks).",
    icon: "💵",
    cost: 2,
    requires: ["prospector-rush-1"],
    gate: { kind: "level", value: 3 },
    effect: { kind: "gold-mult", pct: 15 },
  },
  {
    id: "prospector-tycoon",
    branch: "prospector",
    tier: 2,
    label: "Tycoon",
    description: "Strike it rich — mystery chests pay out +40 extra gold.",
    icon: "🏆",
    cost: 3,
    requires: ["prospector-morning", "prospector-rush-2"],
    gate: { kind: "modules", value: 8 },
    effect: { kind: "chest-luck", gold: 40 },
    keystone: true,
  },

  // ── 🛡️ Sentinel — streak / consistency ─────────────────────────────────────
  {
    id: "sentinel-insurance",
    branch: "sentinel",
    tier: 0,
    label: "Streak Insurance",
    description: "Regenerate +1 streak freeze automatically each week.",
    icon: "🧊",
    cost: 1,
    requires: [],
    effect: { kind: "freeze-regen", perWeek: 1 },
  },
  {
    id: "sentinel-reserve",
    branch: "sentinel",
    tier: 1,
    label: "Deep Reserve",
    description: "Regenerate +1 more freeze each week (+2 total).",
    icon: "❄️",
    cost: 2,
    requires: ["sentinel-insurance"],
    effect: { kind: "freeze-regen", perWeek: 1 },
  },
  {
    id: "sentinel-unbroken",
    branch: "sentinel",
    tier: 2,
    label: "Unbroken",
    description: "Regenerate +1 more freeze each week (+3 total) — never lose a streak again.",
    icon: "🛡️",
    cost: 3,
    requires: ["sentinel-reserve"],
    gate: { kind: "modules", value: 6 },
    effect: { kind: "freeze-regen", perWeek: 1 },
    keystone: true,
  },

  // ── ✨ Luminary — exclusive cosmetics (talent-only) ─────────────────────────
  {
    id: "luminary-spark",
    branch: "luminary",
    tier: 0,
    label: "Spark",
    description: "Unlock the exclusive ✦ Constellation flair for your name.",
    icon: "✦",
    cost: 1,
    requires: [],
    effect: { kind: "cosmetic", cosmeticId: "flair-constellation" },
  },
  {
    id: "luminary-ascendant",
    branch: "luminary",
    tier: 1,
    label: "Ascendant",
    description: 'Unlock the exclusive "Ascendant" profile title.',
    icon: "🌠",
    cost: 2,
    requires: ["luminary-spark"],
    effect: { kind: "cosmetic", cosmeticId: "title-ascendant" },
  },
  {
    id: "luminary-prestige",
    branch: "luminary",
    tier: 2,
    label: "Prestige",
    description: "Unlock the exclusive Prestige profile banner — proof of a maxed build.",
    icon: "👑",
    cost: 3,
    requires: ["luminary-ascendant"],
    gate: { kind: "modules", value: 10 },
    effect: { kind: "cosmetic", cosmeticId: "banner-prestige" },
    keystone: true,
  },

  // ── 📚 Scholar — retention / spaced repetition ──────────────────────────────
  // Rewards the rarest learning virtue: coming *back*. Reviews paid nothing
  // before; this branch turns a maintained memory into a gentle gold faucet —
  // gold only, never XP, so it can't touch Leagues.
  {
    id: "scholar-recall-1",
    branch: "scholar",
    tier: 0,
    label: "Spaced Study",
    description: "Earn +8 gold each time you clear a due review.",
    icon: "🔁",
    cost: 1,
    requires: [],
    effect: { kind: "review-gold", gold: 8 },
  },
  {
    id: "scholar-recall-2",
    branch: "scholar",
    tier: 1,
    label: "Active Recall",
    description: "Earn an additional +14 gold per due review (+22 total).",
    icon: "🧠",
    cost: 2,
    requires: ["scholar-recall-1"],
    gate: { kind: "level", value: 4 },
    effect: { kind: "review-gold", gold: 14 },
  },
  {
    id: "scholar-polymath",
    branch: "scholar",
    tier: 2,
    label: "Polymath",
    description: "Unlock the exclusive Polymath title — proof you never let knowledge fade.",
    icon: "🎓",
    cost: 3,
    requires: ["scholar-recall-2"],
    gate: { kind: "modules", value: 12 },
    effect: { kind: "cosmetic", cosmeticId: "title-polymath" },
    keystone: true,
  },
];

export function getTalent(id: string): Talent | undefined {
  return TALENTS.find((t) => t.id === id);
}

const ALL_BRANCHES: TalentBranch[] = [
  "prospector",
  "sentinel",
  "luminary",
  "scholar",
];

/** Skill points invested per branch — for build-summary surfaces. */
export function branchPoints(owned: string[]): Record<TalentBranch, number> {
  const out = { prospector: 0, sentinel: 0, luminary: 0, scholar: 0 };
  for (const id of owned) {
    const t = getTalent(id);
    if (t) out[t.branch] += t.cost;
  }
  return out;
}

/**
 * A short build identity from where the player spent their points. A clearly
 * dominant branch (≥60% of invested SP) names the build; a spread reads "Hybrid".
 * Returns null for an empty build so callers can hide the surface.
 */
export function buildTitle(owned: string[]): string | null {
  const pts = branchPoints(owned);
  const total = ALL_BRANCHES.reduce((sum, b) => sum + pts[b], 0);
  if (total === 0) return null;
  const ranked = ALL_BRANCHES.filter((b) => pts[b] > 0).sort(
    (a, b) => pts[b] - pts[a],
  );
  const top = ranked[0];
  if (ranked.length === 1 || pts[top] / total >= 0.6) {
    return `${BRANCH_META[top].label} build`;
  }
  return "Hybrid build";
}

export function talentsByBranch(branch: TalentBranch): Talent[] {
  return TALENTS.filter((t) => t.branch === branch).sort((a, b) => a.tier - b.tier);
}

/**
 * Skill Points earned from genuine progress: 1 per fully-completed module, a
 * chunky 2 per career-path certificate, and a trickle of 1 per 5 levels. Bounded
 * by how much you've actually learned, so the pool is always scarcer than the tree.
 */
export function earnedSkillPoints(stats: PlayerStats): number {
  return (
    stats.completedModules.length +
    completedPaths(stats.completedIds).length * 2 +
    Math.floor(stats.level / 5)
  );
}

/** Whether a talent's learning gate (if any) is satisfied by the player's stats. */
export function gateMet(gate: TalentGate | undefined, stats: PlayerStats): boolean {
  if (!gate) return true;
  if (gate.kind === "modules") return stats.completedModules.length >= gate.value;
  if (gate.kind === "level") return stats.level >= gate.value;
  return true;
}

export function gateLabel(gate: TalentGate): string {
  if (gate.kind === "modules") return `Complete ${gate.value} courses to unlock`;
  return `Reach level ${gate.value} to unlock`;
}

export type AggregatedEffects = {
  goldMultPct: number;
  dailyGold: number;
  chestBonus: number;
  freezePerWeek: number;
  reviewGold: number;
  cosmetics: string[];
};

/**
 * Translate a talent's effect into a concrete, human-readable benefit line.
 * Used by the Skill Tree UI so players see what they actually get, not
 * internal enum names.
 *
 * Examples:
 *   gold-mult  10  →  "+10% gold from every lesson"
 *   review-gold 14 →  "+14 gold per due review"
 *   chest-luck  40 →  "+40 gold luck on mystery chests"
 *   freeze-regen 1 →  "+1 streak freeze each week"
 *   cosmetic       →  "Unlocks Constellation flair" (etc.)
 */
export function effectLine(effect: TalentEffect): string {
  switch (effect.kind) {
    case "gold-mult":
      return `+${effect.pct}% gold from every lesson`;
    case "daily-gold":
      return `+${effect.gold} bonus gold on your first lesson each day`;
    case "chest-luck":
      return `+${effect.gold} gold luck on mystery chests`;
    case "freeze-regen":
      return `+${effect.perWeek} streak freeze regenerated each week`;
    case "review-gold":
      return `+${effect.gold} gold per due review completed`;
    case "cosmetic": {
      // Map well-known cosmetic IDs to friendly names; fall back to the raw id.
      const names: Record<string, string> = {
        "flair-constellation": "Constellation name flair",
        "title-ascendant": '"Ascendant" profile title',
        "banner-prestige": "Prestige profile banner",
        "title-polymath": '"Polymath" profile title',
      };
      return `Unlocks ${names[effect.cosmeticId] ?? effect.cosmeticId}`;
    }
  }
}

/** Sum every owned talent's effect into a single bonus snapshot. */
export function talentEffects(owned: string[]): AggregatedEffects {
  const fx: AggregatedEffects = {
    goldMultPct: 0,
    dailyGold: 0,
    chestBonus: 0,
    freezePerWeek: 0,
    reviewGold: 0,
    cosmetics: [],
  };
  for (const id of owned) {
    const t = getTalent(id);
    if (!t) continue;
    switch (t.effect.kind) {
      case "gold-mult":
        fx.goldMultPct += t.effect.pct;
        break;
      case "daily-gold":
        fx.dailyGold += t.effect.gold;
        break;
      case "chest-luck":
        fx.chestBonus += t.effect.gold;
        break;
      case "freeze-regen":
        fx.freezePerWeek += t.effect.perWeek;
        break;
      case "review-gold":
        fx.reviewGold += t.effect.gold;
        break;
      case "cosmetic":
        fx.cosmetics.push(t.effect.cosmeticId);
        break;
    }
  }
  return fx;
}
