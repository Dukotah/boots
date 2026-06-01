// The gold shop — convenience and surprise, never power. Per the gameplan (§4):
// no pay-to-win. Gold buys streak protection and loot-box fun; it can NEVER buy
// XP or rank, so the leaderboard stays credible.

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  /** What the purchase does, interpreted by the store. */
  kind: "streak-freeze" | "chest";
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

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((i) => i.id === id);
}

/** Deterministic-ish chest payout band. The store supplies the random roll. */
export const CHEST_MIN = 10;
export const CHEST_MAX = 160;
