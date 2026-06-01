// XP → level/rank using a classic RPG growth curve.
//
// Design goals:
//  - Level 1→2 is cheap (the first lesson should pop a level-up — instant dopamine).
//  - Each level costs progressively more, so high ranks feel earned (boot.dev tops
//    out at level 108 "Archmage"; we use the same long-tail shape).
//  - Pure + deterministic so the same totalXp always maps to the same level, both
//    on the client and (later) when verified server-side against Supabase.
//
// The curve is fully tunable from two constants. Everything else derives from them.

/** XP required to climb FROM level 1 TO level 2. The whole curve scales off this. */
export const BASE_XP = 80;
/** Growth exponent. >1 makes each level cost more than the last. ~1.4 is a gentle, fair grind. */
export const CURVE = 1.4;

/** XP needed to advance *from* `level` to `level + 1`. */
export function xpForLevel(level: number): number {
  return Math.round(BASE_XP * Math.pow(level, CURVE));
}

/** Cumulative XP required to *reach* the start of `level` (level 1 starts at 0). */
export function totalXpForLevel(level: number): number {
  let sum = 0;
  for (let l = 1; l < level; l++) sum += xpForLevel(l);
  return sum;
}

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
  { name: "Archmage", minLevel: 60, emoji: "🔮" },
];

export type LevelInfo = {
  level: number;
  rank: Rank;
  /** XP earned inside the current level (0 .. xpForLevel). */
  xpIntoLevel: number;
  /** XP needed to finish the current level. */
  xpForLevel: number;
  /** 0..1 progress toward the next level. */
  progress: number;
  totalXp: number;
};

export function levelFromXp(totalXp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(totalXp));

  // Walk the curve until the next level would exceed our XP.
  let level = 1;
  let consumed = 0;
  // Guard against pathological inputs; 500 levels is far beyond the rank table.
  while (level < 500) {
    const cost = xpForLevel(level);
    if (consumed + cost > safeXp) break;
    consumed += cost;
    level++;
  }

  const xpForThis = xpForLevel(level);
  const xpIntoLevel = safeXp - consumed;

  return {
    level,
    rank: rankForLevel(level),
    xpIntoLevel,
    xpForLevel: xpForThis,
    progress: xpForThis === 0 ? 0 : xpIntoLevel / xpForThis,
    totalXp: safeXp,
  };
}

export function rankForLevel(level: number): Rank {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) current = r;
  }
  return current;
}
