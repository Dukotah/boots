"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Check, ShoppingBag, Trophy, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { COSMETICS } from "@/lib/shop";
import { PathProgressList } from "@/components/features/certificate/PathProgressList";
import { GithubJournalCard } from "@/components/features/github/GithubJournalCard";
import { BadgeEmbed } from "@/components/features/github/BadgeEmbed";
import { XPBar } from "@/components/XPBar";
import { SITE } from "@/lib/site";

const BANNER_GRADIENTS: Record<string, string> = {
  midnight: "from-slate-900 via-blue-950 to-indigo-950",
  aurora: "from-teal-900 via-cyan-900 to-purple-900",
  fire: "from-red-900 via-orange-900 to-yellow-900",
  matrix: "from-black via-green-950 to-black",
  ocean: "from-blue-900 via-cyan-900 to-teal-900",
};

const BORDER_STYLES: Record<string, string> = {
  gold: "ring-4 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]",
  diamond: "ring-4 ring-blue-300 shadow-[0_0_20px_rgba(147,197,253,0.5)]",
  fire: "ring-4 ring-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]",
};

export default function ProfilePage() {
  const mounted = useMounted();
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const gold = useGameStore((s) => s.gold);
  const completed = useGameStore((s) => s.completed);
  const achievements = useGameStore((s) => s.achievements);
  const user = useGameStore((s) => s.user);
  const equipped = useGameStore((s) => s.equipped);
  const ownedCosmetics = useGameStore((s) => s.cosmetics);
  const equipCosmetic = useGameStore((s) => s.equipCosmetic);
  const guildName = useGameStore((s) => s.guildName);
  const [copied, setCopied] = useState(false);

  const handle = user?.email?.split("@")[0] ?? "you";
  const info = levelFromXp(xp);
  const earnedBadges = ACHIEVEMENTS.filter((a) => achievements.includes(a.id));

  const bannerClass =
    equipped.banner && BANNER_GRADIENTS[equipped.banner]
      ? BANNER_GRADIENTS[equipped.banner]
      : "from-gray-900 via-slate-900 to-gray-900";

  const borderClass =
    equipped.border && BORDER_STYLES[equipped.border]
      ? BORDER_STYLES[equipped.border]
      : "";

  function share() {
    const url = `${SITE.url}/u/${handle}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!mounted) {
    return <div className="mx-auto max-w-2xl px-4 py-10 text-gray-500">Loading…</div>;
  }

  // Cosmetics the player owns, by slot
  const ownedFlairs = COSMETICS.filter((c) => c.slot === "flair" && ownedCosmetics.includes(c.id));
  const ownedTitles = COSMETICS.filter((c) => c.slot === "title" && ownedCosmetics.includes(c.id));
  const ownedBanners = COSMETICS.filter((c) => c.slot === "banner" && ownedCosmetics.includes(c.id));
  const ownedBorders = COSMETICS.filter((c) => c.slot === "border" && ownedCosmetics.includes(c.id));
  const hasAnyCosmetic = ownedCosmetics.length > 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-5">

      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border border-line bg-gradient-to-br ${bannerClass} overflow-hidden`}
      >
        <div className="h-20 opacity-60" />
        <div className="px-5 pb-5 -mt-10">
          <div className="flex items-end justify-between">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-canvas bg-surface-2 text-4xl shadow ${borderClass}`}
            >
              {info.rank.emoji}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/u/${handle}`}
                className="flex items-center gap-1 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-white transition"
                target="_blank"
              >
                <ExternalLink size={11} /> Public view
              </Link>
              <button
                onClick={share}
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-white transition"
              >
                {copied ? <Check size={11} /> : <Share2 size={11} />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white">
                {equipped.flair && <span className="mr-1">{equipped.flair}</span>}
                {handle}
              </h1>
              {guildName && (
                <Link
                  href="/guilds"
                  className="text-[11px] text-gray-400 border border-line rounded-full px-2 py-0.5 hover:border-accent/50 transition"
                >
                  🛡️ {guildName}
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-400">
              Level {info.level} · {info.rank.name}
              {equipped.title && (
                <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent-soft">
                  {equipped.title}
                </span>
              )}
            </p>
          </div>

          <div className="mt-4">
            <XPBar info={info} />
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="text-orange-400">🔥 {streak} streak</span>
            <span className="text-gold">🪙 {gold.toLocaleString()} gold</span>
            <span className="text-accent-soft">📚 {completed.length} lessons</span>
            <span className="text-success">🏆 {earnedBadges.length} badges</span>
          </div>
        </div>
      </motion.div>

      {/* Equipped cosmetics quick view */}
      {hasAnyCosmetic && (
        <div className="card">
          <h2 className="mb-3 font-semibold text-white">Equipped</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(["flair", "title", "banner", "border"] as const).map((slot) => {
              const val = equipped[slot];
              const item = COSMETICS.find(
                (c) => c.slot === slot && ownedCosmetics.includes(c.id),
              );
              return (
                <div key={slot} className="rounded-lg border border-line bg-canvas/40 p-2 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">{slot}</p>
                  {val ? (
                    <p className="text-sm font-medium text-white truncate">{val}</p>
                  ) : (
                    <p className="text-xs text-gray-600">none</p>
                  )}
                </div>
              );
            })}
          </div>
          {ownedCosmetics.length > 0 && (
            <Link
              href="/shop"
              className="mt-3 flex items-center gap-1.5 text-xs text-accent-soft hover:underline"
            >
              <ShoppingBag size={12} /> Manage cosmetics in the shop
            </Link>
          )}
        </div>
      )}

      {/* Cosmetic equip panels */}
      {ownedFlairs.length > 0 && (
        <CosmeticEquipRow
          label="Flairs"
          items={ownedFlairs}
          equipped={equipped.flair}
          onEquip={equipCosmetic}
        />
      )}
      {ownedTitles.length > 0 && (
        <CosmeticEquipRow
          label="Titles"
          items={ownedTitles}
          equipped={equipped.title}
          onEquip={equipCosmetic}
        />
      )}
      {ownedBanners.length > 0 && (
        <CosmeticEquipRow
          label="Profile Banners"
          items={ownedBanners}
          equipped={equipped.banner}
          onEquip={equipCosmetic}
        />
      )}
      {ownedBorders.length > 0 && (
        <CosmeticEquipRow
          label="Avatar Borders"
          items={ownedBorders}
          equipped={equipped.border}
          onEquip={equipCosmetic}
        />
      )}

      {!hasAnyCosmetic && (
        <div className="rounded-xl border border-dashed border-line bg-surface/40 px-5 py-6 text-center">
          <p className="text-sm text-gray-500">
            No cosmetics yet.{" "}
            <Link href="/shop" className="text-accent-soft hover:underline">
              Visit the shop
            </Link>{" "}
            to spend your gold on flairs, titles, banners, and borders.
          </p>
        </div>
      )}

      {/* Achievements quick view */}
      {earnedBadges.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-gold" />
              <h2 className="font-semibold text-white">Recent Badges</h2>
            </div>
            <Link href="/achievements" className="text-xs text-accent-soft hover:underline">
              View all →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.slice(-12).reverse().map((a) => (
              <span
                key={a.id}
                title={a.description}
                className="flex items-center gap-1 rounded-full border border-line bg-canvas/40 px-2.5 py-1 text-xs text-gray-200"
              >
                {a.icon} {a.title}
              </span>
            ))}
          </div>
        </div>
      )}

      <BadgeEmbed handle={handle} />

      <GithubJournalCard />

      <section>
        <h2 className="mb-3 text-lg font-semibold text-white">Your paths</h2>
        <PathProgressList />
      </section>
    </div>
  );
}

function CosmeticEquipRow({
  label,
  items,
  equipped,
  onEquip,
}: {
  label: string;
  items: ReturnType<typeof COSMETICS.filter>;
  equipped: string | null;
  onEquip: (id: string) => void;
}) {
  return (
    <div className="card">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isEquipped = equipped === item.value;
          return (
            <button
              key={item.id}
              onClick={() => onEquip(item.id)}
              className={[
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                isEquipped
                  ? "border-accent/60 bg-accent/15 text-accent-soft"
                  : "border-line bg-canvas/40 text-gray-300 hover:border-accent/40 hover:text-white",
              ].join(" ")}
            >
              {item.icon}
              <span>{item.value}</span>
              {isEquipped && <Check size={12} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
