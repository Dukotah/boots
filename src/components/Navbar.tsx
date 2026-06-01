"use client";

import Link from "next/link";
import { Flame, Zap } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { levelFromXp } from "@/lib/levels";
import { MascotBoots } from "./MascotBoots";
import { useEffect, useState } from "react";

export function Navbar() {
  // Avoid hydration mismatch: store is persisted/client-only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const info = levelFromXp(xp);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <MascotBoots size={34} />
          <span className="text-lg font-bold tracking-tight text-white">
            Boots
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
