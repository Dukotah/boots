"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Snowflake, Check, ShoppingBag, Sparkles, Type, Image, Circle } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { SHOP_ITEMS, COSMETICS } from "@/lib/shop";
import type { ShopItem, CosmeticSlot } from "@/lib/shop";

const COSMETIC_SECTIONS: {
  slot: CosmeticSlot;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    slot: "flair",
    label: "Flairs",
    icon: <Sparkles size={16} />,
    description: "An emoji shown next to your name everywhere.",
  },
  {
    slot: "title",
    label: "Titles",
    icon: <Type size={16} />,
    description: "A subtitle displayed beneath your username.",
  },
  {
    slot: "banner",
    label: "Profile Banners",
    icon: <Image size={16} />,
    description: "A gradient that fills your profile header.",
  },
  {
    slot: "border",
    label: "Avatar Borders",
    icon: <Circle size={16} />,
    description: "A decorative ring around your avatar.",
  },
];

const BANNER_PREVIEWS: Record<string, string> = {
  midnight: "from-slate-900 via-blue-950 to-indigo-950",
  aurora: "from-teal-900 via-cyan-900 to-purple-900",
  fire: "from-red-900 via-orange-900 to-yellow-900",
  matrix: "from-black via-green-950 to-black",
  ocean: "from-blue-900 via-cyan-900 to-teal-900",
};

const BORDER_PREVIEWS: Record<string, string> = {
  gold: "ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
  diamond: "ring-2 ring-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.6)]",
  fire: "ring-2 ring-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]",
};

export default function ShopPage() {
  const mounted = useMounted();
  const gold = useGameStore((s) => s.gold);
  const streakFreezes = useGameStore((s) => s.streakFreezes);
  const buyItem = useGameStore((s) => s.buyItem);
  const owned = useGameStore((s) => s.cosmetics);
  const equipped = useGameStore((s) => s.equipped);
  const equipCosmetic = useGameStore((s) => s.equipCosmetic);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeSection, setActiveSection] = useState<CosmeticSlot | "all">("all");

  function handleBuy(id: string) {
    const res = buyItem(id);
    if (!res.ok && res.owned) {
      setFlash({ msg: "Already owned.", ok: false });
    } else if (!res.ok) {
      setFlash({ msg: "Not enough gold.", ok: false });
    } else if (res.chestGold !== undefined) {
      setFlash({ msg: `🎁 The chest held ${res.chestGold} gold!`, ok: true });
    } else {
      setFlash({ msg: "Purchased! Head to your profile to equip it.", ok: true });
    }
    setTimeout(() => setFlash(null), 3000);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
            Gold Shop
          </p>
          <h1 className="text-3xl font-bold text-white">Shop</h1>
          <p className="mt-1 text-gray-400 text-sm">
            Spend gold on convenience and cosmetics. Never on XP or rank — the
            leaderboard stays fair.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2 text-xl font-bold text-gold">
            <Coins size={20} /> {mounted ? gold.toLocaleString() : 0}
          </div>
          {mounted && streakFreezes > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
              <Snowflake size={12} /> {streakFreezes} freeze{streakFreezes > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Utilities section */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag size={18} className="text-accent-soft" />
          <h2 className="text-xl font-bold text-white">Utilities</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SHOP_ITEMS.map((item) => {
            const afford = mounted && gold >= item.cost;
            return (
              <div key={item.id} className="card flex gap-4 items-start">
                <span className="text-4xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="mt-0.5 text-sm text-gray-400">{item.description}</p>
                  <button
                    onClick={() => handleBuy(item.id)}
                    disabled={!afford}
                    className="btn-primary mt-3 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Coins size={14} /> {item.cost} gold
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cosmetics */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">Cosmetics</h2>
          <span className="text-xs text-gray-500">decorative only · never affects rank</span>
        </div>

        {/* Section tabs */}
        <div className="mt-3 flex flex-wrap gap-2 mb-6">
          <SectionTab label="All" active={activeSection === "all"} onClick={() => setActiveSection("all")} />
          {COSMETIC_SECTIONS.map((s) => (
            <SectionTab
              key={s.slot}
              label={s.label}
              active={activeSection === s.slot}
              onClick={() => setActiveSection(s.slot)}
              icon={s.icon}
            />
          ))}
        </div>

        {COSMETIC_SECTIONS.filter(
          (sec) => activeSection === "all" || activeSection === sec.slot,
        ).map((sec) => {
          const items = COSMETICS.filter((c) => c.slot === sec.slot);
          if (items.length === 0) return null;
          return (
            <div key={sec.slot} className="mb-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent-soft">{sec.icon}</span>
                <h3 className="font-semibold text-white">{sec.label}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">{sec.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <CosmeticCard
                    key={item.id}
                    item={item}
                    isOwned={mounted ? owned.includes(item.id) : false}
                    isEquipped={
                      mounted && item.slot
                        ? equipped[item.slot as keyof typeof equipped] === item.value
                        : false
                    }
                    canAfford={mounted ? gold >= item.cost : false}
                    onBuy={() => handleBuy(item.id)}
                    onEquip={() => equipCosmetic(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={[
              "fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border px-5 py-3 text-sm font-medium text-white shadow-glow",
              flash.ok
                ? "border-success/50 bg-surface"
                : "border-danger/50 bg-surface",
            ].join(" ")}
          >
            {flash.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTab({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-accent text-white"
          : "border border-line bg-surface text-gray-400 hover:border-accent/50 hover:text-white",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}

function CosmeticCard({
  item,
  isOwned,
  isEquipped,
  canAfford,
  onBuy,
  onEquip,
}: {
  item: ShopItem;
  isOwned: boolean;
  isEquipped: boolean;
  canAfford: boolean;
  onBuy: () => void;
  onEquip: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={[
        "card flex flex-col gap-2 transition-colors",
        isEquipped ? "border-accent/60 bg-accent/5" : isOwned ? "border-success/30" : "",
      ].join(" ")}
    >
      {/* Preview */}
      {item.slot === "banner" && item.value ? (
        <div
          className={`h-14 rounded-lg bg-gradient-to-r ${BANNER_PREVIEWS[item.value] ?? "from-gray-800 to-gray-900"}`}
        />
      ) : item.slot === "border" && item.value ? (
        <div className="flex justify-center py-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-2xl ${BORDER_PREVIEWS[item.value] ?? ""}`}
          >
            🧙
          </div>
        </div>
      ) : (
        <span className="text-4xl">{item.icon}</span>
      )}

      <h3 className="font-bold text-white">{item.name}</h3>
      <p className="flex-1 text-xs text-gray-400">{item.description}</p>

      {isOwned ? (
        <button
          onClick={onEquip}
          className={[
            "mt-1 w-full justify-center text-sm",
            isEquipped ? "btn-ghost" : "btn-primary",
          ].join(" ")}
        >
          {isEquipped ? (
            <><Check size={13} /> Equipped</>
          ) : (
            "Equip"
          )}
        </button>
      ) : (
        <button
          onClick={onBuy}
          disabled={!canAfford}
          className="btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Coins size={13} /> {item.cost.toLocaleString()} gold
        </button>
      )}
    </motion.div>
  );
}
