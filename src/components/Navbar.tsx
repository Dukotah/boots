"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { levelFromXp } from "@/lib/levels";
import { MascotBoots } from "./MascotBoots";
import { useEffect, useState } from "react";

// Routes that render their own AppShell chrome (sidebar) — hide the top Navbar there.
const APP_SHELL_ROUTES = ["/map"];

export function Navbar() {
  // Avoid hydration mismatch: store is persisted/client-only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const hidden = APP_SHELL_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );
  if (hidden) return null;

  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const info = levelFromXp(xp);

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
          <Link
            href="/learn"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            Learn
          </Link>
          <Link
            href="/playground"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            Playground
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            Pricing
          </Link>

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
        </div>
      </nav>
    </header>
  );
}
