// The gold shop — convenience and surprise, never power. Per the gameplan (§4):
// no pay-to-win. Gold buys streak protection and loot-box fun; it can NEVER buy
// XP or rank, so the leaderboard stays credible.

/** Cosmetic slots — purely decorative, shown on the profile. Never power. */
export type CosmeticSlot = "flair" | "title";

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
    description: "Spend gold for a random gold payout. Fortune favors the bold.",
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
    description: "Wear the “Night Owl” title under your name.",
    icon: "🦉",
    cost: 250,
    kind: "cosmetic",
    slot: "title",
    value: "Night Owl",
  },
  {
    id: "title-codewizard",
    name: "Title: Code Wizard",
    description: "Wear the “Code Wizard” title under your name.",
    icon: "✨",
    cost: 300,
    kind: "cosmetic",
    slot: "title",
    value: "Code Wizard",
  },
];

export function getCosmetic(id: string): ShopItem | undefined {
  return COSMETICS.find((c) => c.id === id);
}

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((i) => i.id === id) ?? COSMETICS.find((i) => i.id === id);
}

/** Deterministic-ish chest payout band. The store supplies the random roll. */
export const CHEST_MIN = 10;
export const CHEST_MAX = 160;
