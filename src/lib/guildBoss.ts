// Guild Co-op Boss — pure deterministic logic.
//
// Each week a guild fights a shared boss. Members chip at a single HP bar by
// completing lessons; every completion calls contribute_guild_boss_damage via
// the Supabase RPC (see scoring.ts). This module is pure: no Supabase, no
// store imports. It exports helpers for the roster, HP model, and week key.

// ── Weekly boss roster ────────────────────────────────────────────────────────

export type GuildBossDefinition = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  tier: 1 | 2 | 3 | 4; // difficulty tier — scales maxHp
};

const GUILD_BOSS_ROSTER: GuildBossDefinition[] = [
  {
    id: "compiler-wraith",
    name: "Compiler Wraith",
    emoji: "💀",
    blurb: "An ancient spirit that feeds on syntax errors. Drive it off with clean code.",
    tier: 1,
  },
  {
    id: "deadlock-daemon",
    name: "Deadlock Daemon",
    emoji: "🔗",
    blurb: "It binds your threads in infinite wait. Break the cycle together.",
    tier: 2,
  },
  {
    id: "off-by-one-ogre",
    name: "Off-by-One Ogre",
    emoji: "👹",
    blurb: "Every array it touches starts at 1. Show it what zero-indexed really means.",
    tier: 2,
  },
  {
    id: "memory-leviathan",
    name: "Memory Leviathan",
    emoji: "🐋",
    blurb: "A titan born of forgotten frees. Only coordinated effort plugs the leak.",
    tier: 3,
  },
  {
    id: "big-o-basilisk",
    name: "Big-O Basilisk",
    emoji: "🦎",
    blurb: "Its gaze slows every algorithm to O(n²). Algorithmic mastery is the only cure.",
    tier: 3,
  },
  {
    id: "dependency-dragon",
    name: "Dependency Dragon",
    emoji: "🐲",
    blurb: "It hoards outdated packages. Vanquish it before it ships to production.",
    tier: 4,
  },
];

// ── Week key ──────────────────────────────────────────────────────────────────

/**
 * Returns a deterministic week key in the form "YYYY-Www" (ISO week).
 * Using ISO week keeps this consistent with any server-side week logic:
 * weeks start on Monday and are shared by all time zones at UTC midnight.
 *
 * Example: 2026-W23
 */
export function currentWeekKey(date: Date = new Date()): string {
  // ISO week: find the Thursday of the current week (ISO weeks start Monday,
  // week number determined by the Thursday it contains).
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7; // Sunday = 7
  d.setUTCDate(d.getUTCDate() + 4 - day); // shift to Thursday
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

// ── Boss selection (deterministic from week key + guild id) ───────────────────

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Returns the boss definition for a given week + guild.
 * Different guilds may fight different bosses each week (adds variety).
 */
export function bossForWeek(weekKey: string, guildId: string): GuildBossDefinition {
  const idx = hashStr(weekKey + "|" + guildId) % GUILD_BOSS_ROSTER.length;
  return GUILD_BOSS_ROSTER[idx];
}

// ── HP model ──────────────────────────────────────────────────────────────────

/**
 * Max HP scaled by boss tier and a rough expected guild-member activity level.
 * Calibrated so a typical guild of ~30 active members (each doing 3–5 lessons)
 * can realistically defeat the boss before the week resets, while not making it
 * trivially easy. Each lesson deals 10 damage (see scoring.ts).
 *
 *   Tier 1: 1 500 HP  → 150 completions (~30 members × 5 lessons)
 *   Tier 2: 3 000 HP  → 300 completions (~30 members × 10 lessons)
 *   Tier 3: 5 000 HP  → 500 completions
 *   Tier 4: 8 000 HP  → 800 completions (requires broad guild participation)
 */
const TIER_HP: Record<1 | 2 | 3 | 4, number> = {
  1: 1_500,
  2: 3_000,
  3: 5_000,
  4: 8_000,
};

export function bossMaxHp(boss: GuildBossDefinition): number {
  return TIER_HP[boss.tier];
}

// ── Live HP state ─────────────────────────────────────────────────────────────

export type GuildBossState = {
  /** HP remaining (clamped to 0). */
  hpRemaining: number;
  /** Fraction of HP remaining as 0..1 (1 = full, 0 = defeated). */
  pct: number;
  /** True when totalDamage >= maxHp. */
  defeated: boolean;
};

/**
 * Pure: compute live boss state from the total damage recorded in guild_boss
 * and the max HP for this boss.
 */
export function bossState(totalDamage: number, maxHp: number): GuildBossState {
  const hpRemaining = Math.max(0, maxHp - totalDamage);
  return {
    hpRemaining,
    pct: maxHp === 0 ? 0 : hpRemaining / maxHp,
    defeated: hpRemaining <= 0,
  };
}

// ── Damage per lesson completion ──────────────────────────────────────────────

/** Fixed damage a single lesson completion contributes to the guild boss. */
export const DAMAGE_PER_LESSON = 10;
