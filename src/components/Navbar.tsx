"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Zap, Menu, X } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { levelFromXp } from "@/lib/levels";
import { MascotBoots } from "./MascotBoots";
import { useEffect, useState } from "react";

// Routes that render their own AppShell chrome (sidebar) — hide the top Navbar there.
const APP_SHELL_ROUTES = ["/map"];

// Every top-level destination. Desktop shows a subset inline; the mobile menu
// lists them all so no route is unreachable on a phone.
const NAV_LINKS: { href: string; label: string; desktop?: boolean }[] = [
  { href: "/learn", label: "Learn", desktop: true },
  { href: "/daily", label: "Daily", desktop: true },
  { href: "/review", label: "Review" },
  { href: "/paths", label: "Paths", desktop: true },
  { href: "/skill-tree", label: "Skill Tree", desktop: true },
  { href: "/projects", label: "Projects", desktop: true },
  { href: "/career", label: "Career", desktop: true },
  { href: "/playground", label: "Playground", desktop: true },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/guilds", label: "Guilds" },
  { href: "/events", label: "Events" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/refer", label: "Refer" },
  { href: "/teams", label: "Teams" },
  { href: "/account", label: "Account" },
  { href: "/pricing", label: "Pricing", desktop: true },
];

export function Navbar() {
  // Avoid hydration mismatch: store is persisted/client-only.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  // All hooks are called unconditionally (before any early return) to satisfy
  // the rules of hooks across route changes.
  const pathname = usePathname();
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const user = useGameStore((s) => s.user);
  const info = levelFromXp(xp);

  const hidden = APP_SHELL_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );
  if (hidden) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <MascotBoots size={34} />
          <span className="text-lg font-bold tracking-tight text-white">
            Cantrip
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop links */}
          <div className="hidden items-center gap-4 sm:flex">
            {NAV_LINKS.filter((l) => l.desktop).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {mounted && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-full border border-line bg-surface-2 px-3 py-1.5"
            >
              <span className="flex items-center gap-1 text-sm font-semibold text-gold">
                <Flame size={15} />
                {streak}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-accent-soft">
                <Zap size={15} />
                Lv {info.level}
              </span>
            </Link>
          )}
          {mounted && !user && (
            <Link
              href="/login"
              className="hidden text-sm font-medium text-gray-300 hover:text-white sm:inline"
            >
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-lg p-1.5 text-gray-300 hover:bg-surface-2 hover:text-white sm:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — reaches every route */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas/95 backdrop-blur sm:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-gray-300 hover:bg-surface-2 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            {mounted && !user && (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-accent-soft hover:bg-surface-2"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
