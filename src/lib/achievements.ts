// The achievement catalog — pure data + predicates. The store evaluates these on
// every meaningful state change and persists only the unlocked ids.
//
// Leans into the gameplan's "breadth" philosophy (§4): reward first steps, streak
// habits, breadth across languages, and mastery milestones — never grind. Add a
// new achievement here and it lights up everywhere automatically.
//
// Breadth/mastery predicates read the derived fields on PlayerStats
// (`languages`, `completedModules`, `modulesTouched`) — computed in lib/progress.

import type {
  Achievement,
  AchievementCategory,
  PlayerStats,
} from "@/types/game";

export const ACHIEVEMENTS: Achievement[] = [
  // ─────────────────────────── Milestones ───────────────────────────
  {
    id: "first-blood",
    title: "First Blood",
    description: "Complete your very first lesson.",
    icon: "⚔️",
    rarity: "common",
    category: "milestones",
    rewardGold: 10,
    check: (s) => s.completedCount >= 1,
  },
  {
    id: "apprentice",
    title: "Apprentice",
    description: "Complete 5 lessons.",
    icon: "📜",
    rarity: "common",
    category: "milestones",
    rewardGold: 25,
    check: (s) => s.completedCount >= 5,
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Complete 15 lessons.",
    icon: "📚",
    rarity: "rare",
    category: "milestones",
    rewardXp: 50,
    rewardGold: 50,
    check: (s) => s.completedCount >= 15,
  },
  {
    id: "journeyman",
    title: "Journeyman",
    description: "Complete 30 lessons.",
    icon: "🧭",
    rarity: "rare",
    category: "milestones",
    rewardXp: 75,
    rewardGold: 75,
    check: (s) => s.completedCount >= 30,
  },
  {
    id: "centurion",
    title: "Centurion",
    description: "Complete 100 lessons.",
    icon: "🏛️",
    rarity: "epic",
    category: "milestones",
    rewardXp: 250,
    rewardGold: 250,
    check: (s) => s.completedCount >= 100,
  },
  {
    id: "level-five",
    title: "Rising Star",
    description: "Reach level 5.",
    icon: "⭐",
    rarity: "rare",
    category: "milestones",
    rewardGold: 75,
    check: (s) => s.level >= 5,
  },
  {
    id: "level-ten",
    title: "Seasoned",
    description: "Reach level 10 — Senior Dev.",
    icon: "🚀",
    rarity: "rare",
    category: "milestones",
    rewardGold: 120,
    check: (s) => s.level >= 10,
  },
  {
    id: "level-twentyfive",
    title: "Principal",
    description: "Reach level 25.",
    icon: "🧠",
    rarity: "epic",
    category: "milestones",
    rewardXp: 300,
    rewardGold: 300,
    check: (s) => s.level >= 25,
  },
  {
    id: "archmage",
    title: "Archmage",
    description: "Reach level 60 — the summit.",
    icon: "🔮",
    rarity: "legendary",
    category: "milestones",
    rewardGold: 1000,
    check: (s) => s.level >= 60,
  },

  // ──────────────────────────── Streaks ────────────────────────────
  {
    id: "kindling",
    title: "Kindling",
    description: "Reach a 3-day streak.",
    icon: "🔥",
    rarity: "common",
    category: "streaks",
    rewardGold: 20,
    check: (s) => s.streak >= 3,
  },
  {
    id: "wildfire",
    title: "Wildfire",
    description: "Reach a 7-day streak.",
    icon: "🔥",
    rarity: "epic",
    category: "streaks",
    rewardXp: 100,
    rewardGold: 100,
    check: (s) => s.streak >= 7,
  },
  {
    id: "fortnight",
    title: "Unbroken",
    description: "Reach a 14-day streak.",
    icon: "🗓️",
    rarity: "epic",
    category: "streaks",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.streak >= 14,
  },
  {
    id: "inferno",
    title: "Inferno",
    description: "Reach a 30-day streak.",
    icon: "🌋",
    rarity: "legendary",
    category: "streaks",
    rewardXp: 400,
    rewardGold: 400,
    check: (s) => s.streak >= 30,
  },

  // ──────────────────────────── Breadth ────────────────────────────
  {
    id: "bilingual",
    title: "Bilingual",
    description: "Solve lessons in 2 different languages.",
    icon: "🌐",
    rarity: "rare",
    category: "breadth",
    rewardGold: 60,
    check: (s) => s.languages.length >= 2,
  },
  {
    id: "polyglot",
    title: "Polyglot",
    description: "Solve lessons in 3 different languages.",
    icon: "🗣️",
    rarity: "epic",
    category: "breadth",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.languages.length >= 3,
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Try lessons from 5 different courses.",
    icon: "🧗",
    rarity: "rare",
    category: "breadth",
    rewardGold: 80,
    check: (s) => s.modulesTouched >= 5,
  },
  {
    id: "globetrotter",
    title: "Globetrotter",
    description: "Try lessons from 15 different courses.",
    icon: "🗺️",
    rarity: "epic",
    category: "breadth",
    rewardXp: 200,
    rewardGold: 200,
    check: (s) => s.modulesTouched >= 15,
  },

  // ──────────────────────────── Mastery ────────────────────────────
  {
    id: "course-clear",
    title: "Course Clear",
    description: "Fully complete any one course.",
    icon: "🏁",
    rarity: "rare",
    category: "mastery",
    rewardXp: 100,
    rewardGold: 100,
    check: (s) => s.completedModules.length >= 1,
  },
  {
    id: "triple-crown",
    title: "Triple Crown",
    description: "Fully complete 3 courses.",
    icon: "👑",
    rarity: "epic",
    category: "mastery",
    rewardXp: 250,
    rewardGold: 250,
    check: (s) => s.completedModules.length >= 3,
  },
  {
    id: "decathlete",
    title: "Decathlete",
    description: "Fully complete 10 courses.",
    icon: "🏅",
    rarity: "legendary",
    category: "mastery",
    rewardXp: 600,
    rewardGold: 600,
    check: (s) => s.completedModules.length >= 10,
  },
  {
    id: "js-master",
    title: "JavaScript Master",
    description: "Fully complete the JavaScript Foundations course.",
    icon: "🟨",
    rarity: "epic",
    category: "mastery",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.completedModules.includes("javascript"),
  },
  {
    id: "python-master",
    title: "Python Master",
    description: "Fully complete the Python course.",
    icon: "🐍",
    rarity: "epic",
    category: "mastery",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.completedModules.includes("python"),
  },
  {
    id: "sql-master",
    title: "SQL Master",
    description: "Fully complete the SQL course.",
    icon: "🗄️",
    rarity: "epic",
    category: "mastery",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.completedModules.includes("sql"),
  },
  {
    id: "ai-adept",
    title: "AI Adept",
    description: "Fully complete the Learn AI: Build with LLMs course.",
    icon: "🤖",
    rarity: "epic",
    category: "mastery",
    rewardXp: 150,
    rewardGold: 150,
    check: (s) => s.completedModules.includes("ai-llms"),
  },

  // ───────────────────────────── Wealth ─────────────────────────────
  {
    id: "treasure-hunter",
    title: "Treasure Hunter",
    description: "Bank 250 gold.",
    icon: "💰",
    rarity: "rare",
    category: "wealth",
    check: (s) => s.gold >= 250,
  },
  {
    id: "dragon-hoard",
    title: "Dragon's Hoard",
    description: "Bank 1,000 gold.",
    icon: "🐉",
    rarity: "epic",
    category: "wealth",
    check: (s) => s.gold >= 1000,
  },

  // ───────────────────────────── Secret ─────────────────────────────
  {
    id: "renaissance",
    title: "Renaissance Coder",
    description: "Solve lessons in all 5 languages — JS, TS, Python, SQL, HTML.",
    icon: "🎭",
    rarity: "legendary",
    category: "secret",
    secret: true,
    rewardXp: 500,
    rewardGold: 500,
    check: (s) => s.languages.length >= 5,
  },
  {
    id: "marathoner",
    title: "The Long Haul",
    description: "Reach a 100-day streak. Legendary discipline.",
    icon: "🦉",
    rarity: "legendary",
    category: "secret",
    secret: true,
    rewardXp: 1000,
    rewardGold: 1000,
    check: (s) => s.streak >= 100,
  },
];

const BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export function getAchievement(id: string): Achievement | undefined {
  return BY_ID.get(id);
}

/** Ordered category list with display labels — drives the achievements page sections. */
export const ACHIEVEMENT_CATEGORIES: {
  id: AchievementCategory;
  label: string;
}[] = [
  { id: "milestones", label: "Milestones" },
  { id: "streaks", label: "Streaks" },
  { id: "breadth", label: "Breadth" },
  { id: "mastery", label: "Mastery" },
  { id: "wealth", label: "Wealth" },
  { id: "secret", label: "Secret" },
];

/** Achievements in a given category, in catalog order. */
export function achievementsByCategory(
  category: AchievementCategory,
): Achievement[] {
  return ACHIEVEMENTS.filter(
    (a) => (a.category ?? "milestones") === category,
  );
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
