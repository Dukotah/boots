// The achievement catalog — pure data + predicates. The store evaluates these on
// every meaningful state change and persists only the unlocked ids.
//
// Leans into the gameplan's "breadth" philosophy (§4): reward first steps, streak
// habits, and milestones — never grind. Add a new achievement here and it lights
// up everywhere automatically.

import type { Achievement, PlayerStats } from "@/types/game";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Complete your very first lesson.",
    icon: "⚔️",
    rarity: "common",
    rewardGold: 10,
    check: (s) => s.completedCount >= 1,
  },
  {
    id: "apprentice",
    title: "Apprentice",
    description: "Complete 5 lessons.",
    icon: "📜",
    rarity: "common",
    rewardGold: 25,
    check: (s) => s.completedCount >= 5,
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Complete 15 lessons.",
    icon: "📚",
    rarity: "rare",
    rewardXp: 50,
    rewardGold: 50,
    check: (s) => s.completedCount >= 15,
  },
  {
    id: "kindling",
    title: "Kindling",
    description: "Reach a 3-day streak.",
    icon: "🔥",
    rarity: "common",
    rewardGold: 20,
    check: (s) => s.streak >= 3,
  },
  {
    id: "wildfire",
    title: "Wildfire",
    description: "Reach a 7-day streak.",
    icon: "🔥",
    rarity: "epic",
    rewardXp: 100,
    rewardGold: 100,
    check: (s) => s.streak >= 7,
  },
  {
    id: "level-five",
    title: "Rising Star",
    description: "Reach level 5.",
    icon: "⭐",
    rarity: "rare",
    rewardGold: 75,
    check: (s) => s.level >= 5,
  },
  {
    id: "treasure-hunter",
    title: "Treasure Hunter",
    description: "Bank 250 gold.",
    icon: "💰",
    rarity: "rare",
    check: (s) => s.gold >= 250,
  },
  {
    id: "archmage",
    title: "Archmage",
    description: "Reach level 60 — the summit.",
    icon: "🔮",
    rarity: "legendary",
    rewardGold: 1000,
    check: (s) => s.level >= 60,
  },
];

const BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export function getAchievement(id: string): Achievement | undefined {
  return BY_ID.get(id);
}

/**
 * Given current stats and the set already unlocked, return the ids of any
 * achievements that should newly unlock. Pure — caller persists the result.
 */
export function newlyUnlocked(stats: PlayerStats, unlocked: string[]): string[] {
  const have = new Set(unlocked);
  return ACHIEVEMENTS.filter((a) => !have.has(a.id) && a.check(stats)).map(
    (a) => a.id,
  );
}
