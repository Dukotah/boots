// XP → level/rank. Kept deliberately simple and readable so it's easy to tune.
// Every 100 XP is a level. Ranks are milestone titles layered on top.

export const XP_PER_LEVEL = 100;

export type Rank = { name: string; minLevel: number; emoji: string };

// Named ranks with personality (gameplan §4). Reaching the top tier is where a
// real-world reward (a mailed coin/sticker) would hook in.
export const RANKS: Rank[] = [
  { name: "Intern", minLevel: 1, emoji: "🌱" },
  { name: "Junior Dev", minLevel: 3, emoji: "💻" },
  { name: "Developer", minLevel: 6, emoji: "⚡" },
  { name: "Senior Dev", minLevel: 10, emoji: "🚀" },
  { name: "Staff Engineer", minLevel: 16, emoji: "🛠️" },
  { name: "Principal", minLevel: 25, emoji: "🧠" },
  { name: "Wizard", minLevel: 40, emoji: "🧙" },
];

export type LevelInfo = {
  level: number;
  rank: Rank;
  xpIntoLevel: number;
  xpForLevel: number;
  progress: number; // 0..1 toward next level
  totalXp: number;
};

export function levelFromXp(totalXp: number): LevelInfo {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = totalXp % XP_PER_LEVEL;
  const rank = rankForLevel(level);
  return {
    level,
    rank,
    xpIntoLevel,
    xpForLevel: XP_PER_LEVEL,
    progress: xpIntoLevel / XP_PER_LEVEL,
    totalXp,
  };
}

export function rankForLevel(level: number): Rank {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) current = r;
  }
  return current;
}
