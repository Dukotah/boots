"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Snowflake } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { SHOP_ITEMS } from "@/lib/shop";

export default function ShopPage() {
  const mounted = useMounted();
  const gold = useGameStore((s) => s.gold);
  const streakFreezes = useGameStore((s) => s.streakFreezes);
  const buyItem = useGameStore((s) => s.buyItem);
  const [flash, setFlash] = useState<string | null>(null);

  function handleBuy(id: string) {
    const res = buyItem(id);
    if (!res.ok) {
      setFlash("Not enough gold.");
    } else if (res.chestGold !== undefined) {
      setFlash(`🎁 The chest held ${res.chestGold} gold!`);
    } else {
      setFlash("Purchased!");
    }
    setTimeout(() => setFlash(null), 2500);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Shop</h1>
          <p className="mt-1 text-gray-400">
            Spend gold on convenience and surprises. Never on power — the
            leaderboard stays honest.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2 text-lg font-bold text-gold">
          <Coins size={18} /> {mounted ? gold : 0}
        </div>
      </div>

      {mounted && streakFreezes > 0 && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-sm text-sky-300">
          <Snowflake size={15} /> You own {streakFreezes} streak freeze
          {streakFreezes > 1 ? "s" : ""}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SHOP_ITEMS.map((item) => {
          const afford = mounted && gold >= item.cost;
          return (
            <div key={item.id} className="card flex flex-col">
              <span className="text-4xl">{item.icon}</span>
              <h2 className="mt-3 text-lg font-bold text-white">{item.name}</h2>
              <p className="mt-1 flex-1 text-sm text-gray-300">
                {item.description}
              </p>
              <button
                onClick={() => handleBuy(item.id)}
                disabled={!afford}
                className="btn-primary mt-4 justify-center disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Coins size={15} /> {item.cost}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-accent/50 bg-surface px-5 py-3 text-sm font-medium text-white shadow-glow"
          >
            {flash}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
