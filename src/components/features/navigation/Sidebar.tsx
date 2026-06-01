"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map as MapIcon,
  BookOpen,
  Trophy,
  Swords,
  Flame,
  Coins,
  X,
  type LucideIcon,
} from "lucide-react";
import { MascotBoots } from "@/components/MascotBoots";
import { useGameStore } from "@/store/useGameStore";
import { levelFromXp } from "@/lib/levels";
import { useMounted } from "@/hooks/useMounted";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Campaign Map", icon: MapIcon },
  { href: "/learn", label: "Courses", icon: BookOpen },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/leagues", label: "Leagues", icon: Swords, badge: "Soon" },
];

export function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const info = levelFromXp(xp);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface/80 backdrop-blur",
          "transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <MascotBoots size={32} />
            <span className="text-lg font-bold tracking-tight text-white">
              Boots
            </span>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-surface-2 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-gray-400 hover:bg-surface-2 hover:text-white",
                ].join(" ")}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 -z-10 rounded-xl border border-accent/40 bg-accent/15 shadow-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  size={18}
                  className={
                    active
                      ? "text-accent-soft"
                      : "text-gray-500 group-hover:text-gray-300"
                  }
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Player panel */}
        <div className="m-3 rounded-2xl border border-line bg-canvas/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-xl">
              {mounted ? info.rank.emoji : "🌱"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {mounted ? info.rank.name : "Intern"}
              </p>
              <p className="text-xs text-gray-400">
                Level {mounted ? info.level : 1}
              </p>
            </div>
          </div>

          {/* mini XP bar */}
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-gray-500">
              <span>XP</span>
              <span>
                {mounted ? info.xpIntoLevel : 0}/{mounted ? info.xpForLevel : 80}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                initial={{ width: 0 }}
                animate={{ width: `${(mounted ? info.progress : 0) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
          </div>

          {/* gold + streak */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface-2 py-1.5 text-sm font-semibold text-gold">
              <Coins size={15} /> {mounted ? gold : 0}
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface-2 py-1.5 text-sm font-semibold text-danger">
              <Flame size={15} /> {mounted ? streak : 0}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
