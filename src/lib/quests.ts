// Daily quests — pure, data-driven definitions (like the achievement catalog).
// Progress is computed from a snapshot of *today's* activity; the store tracks
// which quests have been claimed and grants the reward. Quests reset each local
// day. Quests reward gold/XP for showing up — they drive the daily habit loop
// without being grindy (gameplan §4).

export type DailySnapshot = {
  /** XP earned today. */
  xp: number;
  /** Lessons completed today. */
  lessons: number;
  /** Current streak length. */
  streak: number;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Target value; the quest is complete when progress >= goal. */
  goal: number;
  rewardGold: number;
  rewardXp?: number;
  /** How far along today, given a daily snapshot. */
  progress: (d: DailySnapshot) => number;
};

export const DAILY_QUESTS: Quest[] = [
  {
    id: "warm-up",
    title: "Warm Up",
    description: "Complete 1 lesson today.",
    icon: "☀️",
    goal: 1,
    rewardGold: 15,
    rewardXp: 10,
    progress: (d) => d.lessons,
  },
  {
    id: "triple-threat",
    title: "Triple Threat",
    description: "Complete 3 lessons today.",
    icon: "🎯",
    goal: 3,
    rewardGold: 40,
    progress: (d) => d.lessons,
  },
  {
    id: "xp-grind",
    title: "Daily Grind",
    description: "Earn 75 XP today.",
    icon: "⚡",
    goal: 75,
    rewardGold: 30,
    progress: (d) => d.xp,
  },
];

export function getQuest(id: string): Quest | undefined {
  return DAILY_QUESTS.find((q) => q.id === id);
}

export function isQuestComplete(q: Quest, d: DailySnapshot): boolean {
  return q.progress(d) >= q.goal;
}

// ── Weekly quests ────────────────────────────────────────────────────────────
// Bigger goals over the 7-day league season window (they reset when the season
// rolls). Snapshot shape matches DailySnapshot, so they share Quest/isComplete.

export type WeeklySnapshot = DailySnapshot;

export const WEEKLY_QUESTS: Quest[] = [
  {
    id: "weekly-grind",
    title: "Weekly Grind",
    description: "Earn 400 XP this week.",
    icon: "📈",
    goal: 400,
    rewardGold: 100,
    progress: (d) => d.xp,
  },
  {
    id: "weekly-marathon",
    title: "Marathon",
    description: "Complete 15 lessons this week.",
    icon: "🏃",
    goal: 15,
    rewardGold: 120,
    rewardXp: 50,
    progress: (d) => d.lessons,
  },
  {
    id: "weekly-streak",
    title: "Keep the Fire",
    description: "Hold a 7-day streak.",
    icon: "🔥",
    goal: 7,
    rewardGold: 80,
    progress: (d) => d.streak,
  },
];

export function getWeeklyQuest(id: string): Quest | undefined {
  return WEEKLY_QUESTS.find((q) => q.id === id);
}

// ── Quest chains ─────────────────────────────────────────────────────────────
// Multi-step, persistent journeys. Steps unlock in order and are claimed one at
// a time; progress is a pure predicate over the player's overall stats (like
// achievements), so a chain naturally tracks long-term growth.

import type { PlayerStats } from "@/types/game";

export type ChainStep = {
  id: string;
  title: string;
  description: string;
  goal: number;
  rewardGold: number;
  rewardXp?: number;
  /** How far along, given the player's overall stats. */
  progress: (s: PlayerStats) => number;
};

export type QuestChain = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: ChainStep[];
};

export const QUEST_CHAINS: QuestChain[] = [
  {
    id: "the-initiate",
    title: "The Initiate",
    description: "Find your footing and build the daily habit.",
    icon: "🌱",
    steps: [
      {
        id: "first-steps",
        title: "First Steps",
        description: "Complete your first lesson.",
        goal: 1,
        rewardGold: 20,
        progress: (s) => s.completedCount,
      },
      {
        id: "finding-feet",
        title: "Finding Your Feet",
        description: "Complete 10 lessons.",
        goal: 10,
        rewardGold: 60,
        rewardXp: 25,
        progress: (s) => s.completedCount,
      },
      {
        id: "committed",
        title: "Committed",
        description: "Reach a 3-day streak.",
        goal: 3,
        rewardGold: 50,
        progress: (s) => s.streak,
      },
      {
        id: "well-rounded",
        title: "Well-Rounded",
        description: "Solve lessons in 2 languages.",
        goal: 2,
        rewardGold: 100,
        rewardXp: 50,
        progress: (s) => s.languages.length,
      },
    ],
  },
  {
    id: "the-ascent",
    title: "The Ascent",
    description: "Go from competent to formidable.",
    icon: "🏔️",
    steps: [
      {
        id: "course-clear",
        title: "Course Clear",
        description: "Fully complete any course.",
        goal: 1,
        rewardGold: 100,
        progress: (s) => s.completedModules.length,
      },
      {
        id: "polyglot-path",
        title: "Polyglot Path",
        description: "Solve lessons in 3 languages.",
        goal: 3,
        rewardGold: 150,
        rewardXp: 75,
        progress: (s) => s.languages.length,
      },
      {
        id: "halfway",
        title: "Halfway There",
        description: "Reach level 10.",
        goal: 10,
        rewardGold: 200,
        progress: (s) => s.level,
      },
      {
        id: "summit",
        title: "Summit",
        description: "Reach level 25.",
        goal: 25,
        rewardGold: 400,
        rewardXp: 200,
        progress: (s) => s.level,
      },
    ],
  },
];

/** Stable key for a claimed chain step: "chainId/stepId". */
export function chainStepKey(chainId: string, stepId: string): string {
  return `${chainId}/${stepId}`;
}

export function getChain(id: string): QuestChain | undefined {
  return QUEST_CHAINS.find((c) => c.id === id);
}

export function getChainStep(
  chainId: string,
  stepId: string,
): ChainStep | undefined {
  return getChain(chainId)?.steps.find((s) => s.id === stepId);
}

export function isChainStepComplete(step: ChainStep, s: PlayerStats): boolean {
  return step.progress(s) >= step.goal;
}
