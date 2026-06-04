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
