// Weekly community boss battle. Everyone chips at a shared HP bar by earning XP
// during the 7-day season; when it hits zero the boss is defeated and players can
// claim a reward. Pure + deterministic: the boss is chosen by the season start,
// and the "community" contribution is simulated as a ramp over the week (the same
// seeded approach the leagues use until real aggregation lands server-side).

import { SEASON_DAYS } from "@/lib/leagues";

export type Boss = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  maxHp: number;
  rewardGold: number;
  rewardXp: number;
};

const BOSSES: Omit<Boss, "id">[] = [
  {
    name: "The Null Dragon",
    emoji: "🐉",
    blurb: "A beast born of unchecked references. Strike it down with clean code.",
    maxHp: 5000,
    rewardGold: 300,
    rewardXp: 200,
  },
  {
    name: "Segfault Specter",
    emoji: "👻",
    blurb: "It haunts the heap. Only relentless practice can banish it.",
    maxHp: 6000,
    rewardGold: 350,
    rewardXp: 250,
  },
  {
    name: "The Infinite Loop",
    emoji: "🌀",
    blurb: "Round and round it goes. Break the cycle with sheer XP.",
    maxHp: 7000,
    rewardGold: 400,
    rewardXp: 300,
  },
  {
    name: "Race Condition Hydra",
    emoji: "🐍",
    blurb: "Cut off one bug, two appear. Coordinate the community to win.",
    maxHp: 8000,
    rewardGold: 450,
    rewardXp: 350,
  },
];

/** Fraction of max HP the simulated community removes by the end of the week. */
const COMMUNITY_SHARE = 0.7;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** The boss for the current season — deterministic from the season start key. */
export function bossForSeason(seasonStart: string | null): Boss {
  const idx = seasonStart ? hash(seasonStart) % BOSSES.length : 0;
  return { id: seasonStart ?? "preseason", ...BOSSES[idx] };
}

export type BossState = {
  communityDamage: number;
  playerDamage: number;
  totalDamage: number;
  remaining: number;
  pct: number; // remaining HP as 0..1
  defeated: boolean;
};

/** Compute the live HP given days elapsed in the season + the player's XP. */
export function bossState(
  boss: Boss,
  daysElapsed: number,
  playerDamage: number,
): BossState {
  const ramp = Math.min(1, Math.max(0, daysElapsed / SEASON_DAYS));
  const communityDamage = Math.round(boss.maxHp * COMMUNITY_SHARE * ramp);
  const totalDamage = communityDamage + playerDamage;
  const remaining = Math.max(0, boss.maxHp - totalDamage);
  return {
    communityDamage,
    playerDamage,
    totalDamage,
    remaining,
    pct: boss.maxHp === 0 ? 0 : remaining / boss.maxHp,
    defeated: remaining <= 0,
  };
}
