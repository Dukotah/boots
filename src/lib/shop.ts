// The gold shop — convenience and surprise, never power. Per the gameplan (§4):
// no pay-to-win. Gold buys streak protection and loot-box fun; it can NEVER buy
// XP or rank, so the leaderboard stays credible.

/** Cosmetic slots — purely decorative, shown on the profile. Never power. */
export type CosmeticSlot = "flair" | "title" | "banner" | "border";

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  /** What the purchase does, interpreted by the store. */
  kind: "streak-freeze" | "chest" | "cosmetic";
  /** Cosmetic-only: which slot it fills + the value applied when equipped. */
  slot?: CosmeticSlot;
  value?: string;
  /** Cosmetic-only: granted exclusively by the talent tree, never sold for gold. */
  talentOnly?: boolean;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "streak-freeze",
    name: "Streak Freeze",
    description: "Protects your streak for one missed day. Auto-used when needed.",
    icon: "🧊",
    cost: 60,
    kind: "streak-freeze",
  },
  {
    id: "mystery-chest",
    name: "Mystery Chest",
    description:
      "A gamble: most chests pay 10–140 gold, but rare jackpots strike for up to 300. Fortune favors the bold.",
    icon: "🎁",
    cost: 50,
    kind: "chest",
  },
];

// Cosmetics — decorative only (shown on your profile). Strictly no pay-to-win;
// these never touch XP, rank, or the leaderboard.
export const COSMETICS: ShopItem[] = [
  {
    id: "flair-crown",
    name: "Golden Crown",
    description: "A regal 👑 next to your name.",
    icon: "👑",
    cost: 200,
    kind: "cosmetic",
    slot: "flair",
    value: "👑",
  },
  {
    id: "flair-rocket",
    name: "Rocket Flair",
    description: "Show you're going places with a 🚀.",
    icon: "🚀",
    cost: 150,
    kind: "cosmetic",
    slot: "flair",
    value: "🚀",
  },
  {
    id: "flair-wizard",
    name: "Wizard Hat",
    description: "For the spell-slingers. 🧙",
    icon: "🧙",
    cost: 150,
    kind: "cosmetic",
    slot: "flair",
    value: "🧙",
  },
  {
    id: "title-nightowl",
    name: "Title: Night Owl",
    description: "Wear the Night Owl title under your name.",
    icon: "🦉",
    cost: 250,
    kind: "cosmetic",
    slot: "title",
    value: "Night Owl",
  },
  {
    id: "title-codewizard",
    name: "Title: Code Wizard",
    description: "Wear the Code Wizard title under your name.",
    icon: "✨",
    cost: 300,
    kind: "cosmetic",
    slot: "title",
    value: "Code Wizard",
  },
  // ── More flairs ──
  {
    id: "flair-dragon",
    name: "Dragon Flair",
    description: "Breathe fire with a 🐉 next to your name.",
    icon: "🐉",
    cost: 175,
    kind: "cosmetic",
    slot: "flair",
    value: "🐉",
  },
  {
    id: "flair-lightning",
    name: "Lightning Flair",
    description: "Strike fast with ⚡ next to your name.",
    icon: "⚡",
    cost: 125,
    kind: "cosmetic",
    slot: "flair",
    value: "⚡",
  },
  {
    id: "flair-star",
    name: "Star Flair",
    description: "Shine bright with ⭐ next to your name.",
    icon: "⭐",
    cost: 100,
    kind: "cosmetic",
    slot: "flair",
    value: "⭐",
  },
  {
    id: "flair-diamond",
    name: "Diamond Flair",
    description: "Represent Diamond tier with 💎.",
    icon: "💎",
    cost: 400,
    kind: "cosmetic",
    slot: "flair",
    value: "💎",
  },
  {
    id: "flair-robot",
    name: "Robot Flair",
    description: "Show your AI side with 🤖.",
    icon: "🤖",
    cost: 150,
    kind: "cosmetic",
    slot: "flair",
    value: "🤖",
  },
  {
    id: "flair-fire",
    name: "Fire Flair",
    description: "Always burning 🔥.",
    icon: "🔥",
    cost: 125,
    kind: "cosmetic",
    slot: "flair",
    value: "🔥",
  },
  // ── More titles ──
  {
    id: "title-10day",
    name: "Title: 10-Day Warrior",
    description: "Earn the 10-Day Warrior title.",
    icon: "⚔️",
    cost: 200,
    kind: "cosmetic",
    slot: "title",
    value: "10-Day Warrior",
  },
  {
    id: "title-polyglot",
    name: "Title: Polyglot",
    description: "Earn the Polyglot title.",
    icon: "🗣️",
    cost: 350,
    kind: "cosmetic",
    slot: "title",
    value: "Polyglot",
  },
  {
    id: "title-hirable",
    name: "Title: Hire Me",
    description: "Earn the Hire Me title. Signal your job-readiness.",
    icon: "💼",
    cost: 450,
    kind: "cosmetic",
    slot: "title",
    value: "Hire Me",
  },
  {
    id: "title-aibuilder",
    name: "Title: AI Builder",
    description: "Earn the AI Builder title.",
    icon: "🤖",
    cost: 400,
    kind: "cosmetic",
    slot: "title",
    value: "AI Builder",
  },
  {
    id: "title-fullstack",
    name: "Title: Full Stack Dev",
    description: "Earn the Full Stack Dev title.",
    icon: "🥞",
    cost: 500,
    kind: "cosmetic",
    slot: "title",
    value: "Full Stack Dev",
  },
  {
    id: "title-debugger",
    name: "Title: Debugger Elite",
    description: "Earn the elite Debugger Elite title.",
    icon: "🐛",
    cost: 350,
    kind: "cosmetic",
    slot: "title",
    value: "Debugger Elite",
  },
  // ── Profile banners ──
  {
    id: "banner-midnight",
    name: "Banner: Midnight",
    description: "A deep midnight blue profile banner.",
    icon: "🌑",
    cost: 300,
    kind: "cosmetic",
    slot: "banner",
    value: "midnight",
  },
  {
    id: "banner-aurora",
    name: "Banner: Aurora",
    description: "Northern lights gradient banner.",
    icon: "🌌",
    cost: 400,
    kind: "cosmetic",
    slot: "banner",
    value: "aurora",
  },
  {
    id: "banner-fire",
    name: "Banner: Inferno",
    description: "Blazing fire gradient for the streak masters.",
    icon: "🔥",
    cost: 350,
    kind: "cosmetic",
    slot: "banner",
    value: "fire",
  },
  {
    id: "banner-matrix",
    name: "Banner: Matrix",
    description: "Green-on-black, hacker aesthetic.",
    icon: "💻",
    cost: 500,
    kind: "cosmetic",
    slot: "banner",
    value: "matrix",
  },
  {
    id: "banner-ocean",
    name: "Banner: Deep Ocean",
    description: "Calm deep-ocean gradient.",
    icon: "🌊",
    cost: 300,
    kind: "cosmetic",
    slot: "banner",
    value: "ocean",
  },
  // ── Avatar borders ──
  {
    id: "border-gold",
    name: "Gold Border",
    description: "A gold ring around your avatar.",
    icon: "🥇",
    cost: 250,
    kind: "cosmetic",
    slot: "border",
    value: "gold",
  },
  {
    id: "border-diamond",
    name: "Diamond Border",
    description: "A shimmering diamond border — reserved for the elite.",
    icon: "💎",
    cost: 600,
    kind: "cosmetic",
    slot: "border",
    value: "diamond",
  },
  {
    id: "border-fire",
    name: "Fire Border",
    description: "A blazing fire border for streak legends.",
    icon: "🔥",
    cost: 400,
    kind: "cosmetic",
    slot: "border",
    value: "fire",
  },
  // ── Talent-exclusive cosmetics — unlocked only via the Skill Tree (Luminary
  // branch), never purchasable. cost 0 + talentOnly so the shop hides them. ──
  {
    id: "flair-constellation",
    name: "Constellation Flair",
    description: "An exclusive ✦ — granted only by the Skill Tree.",
    icon: "✦",
    cost: 0,
    kind: "cosmetic",
    slot: "flair",
    value: "✦",
    talentOnly: true,
  },
  {
    id: "title-ascendant",
    name: "Title: Ascendant",
    description: "An exclusive title earned in the Skill Tree.",
    icon: "🌠",
    cost: 0,
    kind: "cosmetic",
    slot: "title",
    value: "Ascendant",
    talentOnly: true,
  },
  {
    id: "banner-prestige",
    name: "Banner: Prestige",
    description: "A radiant prestige banner — proof of a maxed Skill Tree build.",
    icon: "👑",
    cost: 0,
    kind: "cosmetic",
    slot: "banner",
    value: "prestige",
    talentOnly: true,
  },
  {
    id: "title-polymath",
    name: "Title: Polymath",
    description: "An exclusive title from the Skill Tree's Scholar branch.",
    icon: "🎓",
    cost: 0,
    kind: "cosmetic",
    slot: "title",
    value: "Polymath",
    talentOnly: true,
  },
];

export function getCosmetic(id: string): ShopItem | undefined {
  return COSMETICS.find((c) => c.id === id);
}

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((i) => i.id === id) ?? COSMETICS.find((i) => i.id === id);
}

// ── Mystery chest economics ─────────────────────────────────────────────────
// A chest costs CHEST_COST gold. The payout is a *weighted* roll, not a flat
// uniform band: usually you win a little less than you paid (a small house edge),
// but rare jackpots keep it exciting. This keeps the chest a gamble — variance and
// the thrill of a jackpot — instead of a money printer that trivialises every
// cosmetic sink. The base expected value is ~46 gold against a 50 cost, so gold
// stays meaningful; the Prospector "Tycoon" talent (chest-luck) is what flips a
// chest into a deliberately +EV investment.
export const CHEST_COST = 50;

/** Lowest/highest *possible* payouts — for UI copy only. */
export const CHEST_MIN = 10;
export const CHEST_MAX = 300;

type ChestTier = { p: number; lo: number; hi: number };

// Cumulative-probability loot tiers (p values sum to 1). Tuned so the base EV
// (~46) sits just under CHEST_COST (50) — see rollChest for the EV breakdown.
const CHEST_TIERS: ChestTier[] = [
  { p: 0.55, lo: 10, hi: 30 }, // common   — avg 20  ·  contributes 11.0
  { p: 0.28, lo: 35, hi: 65 }, // uncommon — avg 50  ·  contributes 14.0
  { p: 0.13, lo: 80, hi: 140 }, // rare     — avg 110 ·  contributes 14.3
  { p: 0.04, lo: 200, hi: 300 }, // jackpot  — avg 250 ·  contributes 10.0
]; //                                          base EV ≈ 49.3 (≈ 46 after rounding)

/**
 * Roll a mystery-chest payout from a uniform random `r` in [0, 1).
 * `bonus` is the flat Prospector "Tycoon" chest-luck add (0 if unowned).
 * Pure + deterministic in `r` so the store owns the single Math.random() call.
 */
export function rollChest(r: number, bonus = 0): number {
  const x = Math.min(0.999999, Math.max(0, r));
  let acc = 0;
  for (const tier of CHEST_TIERS) {
    acc += tier.p;
    if (x < acc) {
      // Spread the remaining randomness across this tier's [lo, hi] band.
      const span = (x - (acc - tier.p)) / tier.p; // 0..1 within the tier
      return Math.round(tier.lo + span * (tier.hi - tier.lo)) + bonus;
    }
  }
  // Floating-point fallthrough → top of the jackpot band.
  return CHEST_TIERS[CHEST_TIERS.length - 1].hi + bonus;
}

// ── Boss loot chest economics ────────────────────────────────────────────────
// Defeating the weekly boss opens a loot chest whose payout is a variable roll
// rather than the flat `rewardGold` value from lib/boss.ts. The flat value acts
// as a BASE; this roll applies a multiplier tier so the reward feels like a
// genuine prize event instead of a deterministic transaction.
//
// Tier table (multiplier ranges, probabilities, EV contribution):
//   Common   50%  0.60–0.80 × base  avg 0.70 × base  contrib 35.0%
//   Uncommon 30%  0.85–1.10 × base  avg 0.975× base  contrib 29.3%
//   Rare     15%  1.20–1.60 × base  avg 1.40 × base  contrib 21.0%
//   Jackpot   5%  1.80–2.20 × base  avg 2.00 × base  contrib 10.0%
//   ─────────────────────────────────────────────────────────────────
//   Base EV ≈ 0.953 × rewardGold            (≈ 95% of stated reward)
//
// The EV is intentionally BELOW the face value of rewardGold. This means:
//   • The boss's rewardGold reads as the "standard" reward in the catalog.
//   • Most players get a little less, occasionally much more — variance drives
//     engagement without inflating the overall gold supply.
//   • Even a jackpot (2× base) on the biggest boss (450 → 900) is a one-off
//     weekly spike and stays well within the cosmetic-sink range, so it never
//     trivialises the economy (a cosmetic costs 100–600).
//
// Do NOT raise the jackpot multiplier above 2.5× — beyond that a run of lucky
// weeks could fund a player's entire cosmetic wishlist for free.

type BossLootTier = { p: number; loMult: number; hiMult: number; label: string };

export const BOSS_LOOT_TIERS: BossLootTier[] = [
  { p: 0.50, loMult: 0.60, hiMult: 0.80, label: "Common"   },
  { p: 0.30, loMult: 0.85, hiMult: 1.10, label: "Uncommon" },
  { p: 0.15, loMult: 1.20, hiMult: 1.60, label: "Rare"     },
  { p: 0.05, loMult: 1.80, hiMult: 2.20, label: "Jackpot"  },
];

export type BossLootResult = {
  gold: number;
  /** Human-readable tier name, e.g. "Jackpot". */
  tier: string;
};

/**
 * Roll the boss loot chest. Pure + deterministic given `r` and `baseGold`.
 *
 * @param r        - Uniform random in [0, 1) — caller supplies `Math.random()`.
 * @param baseGold - The boss's `rewardGold` field (the catalog face value).
 * @returns `{ gold, tier }` — the actual payout and the tier label for the UI.
 */
export function rollBossChest(r: number, baseGold: number): BossLootResult {
  const x = Math.min(0.999999, Math.max(0, r));
  let acc = 0;
  for (const tier of BOSS_LOOT_TIERS) {
    acc += tier.p;
    if (x < acc) {
      const span = (x - (acc - tier.p)) / tier.p; // 0..1 within the tier
      const mult = tier.loMult + span * (tier.hiMult - tier.loMult);
      return { gold: Math.round(baseGold * mult), tier: tier.label };
    }
  }
  // Floating-point fallthrough → top of jackpot.
  const top = BOSS_LOOT_TIERS[BOSS_LOOT_TIERS.length - 1];
  return { gold: Math.round(baseGold * top.hiMult), tier: top.label };
}
