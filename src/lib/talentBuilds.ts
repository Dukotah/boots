// talentBuilds.ts — preset archetypes for the Recommended Builds surface.
//
// Pure module: no store imports, no side effects. Everything is derived from
// talent ids + player state passed in — safe to call anywhere.

import { getTalent, BRANCH_META } from "@/lib/talents";

export type BuildStep = string; // a talent id

export type TalentBuild = {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  /** One-line summary of what this build delivers at completion. */
  payoff: string;
  /** Branch this build leans into — used for color theming. */
  branch: "prospector" | "sentinel" | "luminary" | "scholar";
  /**
   * Ordered talent ids to purchase. Each entry's prereqs are satisfied by
   * earlier entries in this list, so buying them in order is always valid
   * (gate satisfaction depends on player progress, not on the build order).
   */
  steps: BuildStep[];
};

// ─── 3 Preset Archetypes ─────────────────────────────────────────────────────

export const TALENT_BUILDS: TalentBuild[] = [
  {
    id: "gold-farmer",
    name: "Gold Farmer",
    icon: "💰",
    tagline: "Maximise gold from every lesson.",
    payoff: "+25% lesson gold, +15 daily gold, +40 chest luck — the richest build.",
    branch: "prospector",
    // Tier 0 → 1 → 1 → keystone (both tier-1s required for Tycoon)
    steps: [
      "prospector-rush-1",   // tier 0, cost 1, no prereqs
      "prospector-morning",  // tier 1, cost 2, requires rush-1
      "prospector-rush-2",   // tier 1, cost 2, requires rush-1, gate level 3
      "prospector-tycoon",   // tier 2, cost 3, requires morning+rush-2, gate 8 modules
    ],
  },
  {
    id: "streak-keeper",
    name: "Streak Keeper",
    icon: "🛡️",
    tagline: "Never lose your streak again.",
    payoff: "+3 streak freezes per week — your streak survives even busy seasons.",
    branch: "sentinel",
    steps: [
      "sentinel-insurance",  // tier 0, cost 1, no prereqs
      "sentinel-reserve",    // tier 1, cost 2, requires insurance
      "sentinel-unbroken",   // tier 2, cost 3, requires reserve, gate 6 modules
    ],
  },
  {
    id: "scholar",
    name: "Scholar",
    icon: "📚",
    tagline: "Get paid every time you review.",
    payoff: "+22 gold per due review — turn your memory practice into a gold faucet.",
    branch: "scholar",
    steps: [
      "scholar-recall-1",    // tier 0, cost 1, no prereqs
      "scholar-recall-2",    // tier 1, cost 2, requires recall-1, gate level 4
      "scholar-polymath",    // tier 2, cost 3, requires recall-2, gate 12 modules — cosmetic keystone
    ],
  },
];

// ─── Build Progress Helper ────────────────────────────────────────────────────

export type StepStatus = "owned" | "affordable" | "locked";

export type BuildStepDetail = {
  id: string;
  label: string;
  cost: number;
  status: StepStatus;
};

export type BuildProgress = {
  /** Steps with their current status relative to the player's state. */
  steps: BuildStepDetail[];
  /** Number of steps already owned. */
  owned: number;
  /** Total steps in the build. */
  total: number;
  /** 0–100, rounded. */
  pct: number;
  /**
   * The next talent the player should buy — the first non-owned step whose
   * prereqs are all satisfied and whose cost is ≤ availableSp.
   * Null if the build is complete, or if the next step is unaffordable/gated.
   */
  nextAffordable: string | null;
  /** True when every step is owned. */
  complete: boolean;
};

/**
 * Given a build and the player's current owned talents + available SP,
 * return a rich progress snapshot. Gate satisfaction is NOT checked here —
 * that lives in the store's buyTalent, which will silently return false for
 * gated talents the player hasn't unlocked yet. The UI can surface the
 * talent's gate label if needed (getTalent(id).gate).
 */
export function buildProgress(
  build: TalentBuild,
  ownedTalents: string[],
  availableSp: number,
): BuildProgress {
  const owned = build.steps.filter((id) => ownedTalents.includes(id)).length;
  const total = build.steps.length;
  const pct = total === 0 ? 100 : Math.round((owned / total) * 100);
  const complete = owned === total;

  const steps: BuildStepDetail[] = build.steps.map((id) => {
    const talent = getTalent(id);
    const cost = talent?.cost ?? 1;
    let status: StepStatus;
    if (ownedTalents.includes(id)) {
      status = "owned";
    } else if (availableSp >= cost) {
      status = "affordable";
    } else {
      status = "locked";
    }
    return { id, label: talent?.label ?? id, cost, status };
  });

  // The next step to buy is the first non-owned one in order.
  // We mark it affordable only when the player has the SP (gate check is the
  // store's job); if locked, nextAffordable stays null so the button disables.
  const nextStep = steps.find((s) => s.status !== "owned");
  const nextAffordable =
    nextStep?.status === "affordable" ? nextStep.id : null;

  return { steps, owned, total, pct, nextAffordable, complete };
}

/** Convenience: the BRANCH_META color for a build's primary branch. */
export function buildColor(build: TalentBuild): string {
  return BRANCH_META[build.branch].color;
}
