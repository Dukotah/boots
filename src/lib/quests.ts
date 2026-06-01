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
