"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/features/navigation/Sidebar";
import { MascotBoots } from "@/components/MascotBoots";

/**
 * App-section chrome: a persistent left Sidebar on desktop and a slide-in drawer
 * on mobile. Wrap authenticated/game screens (dashboard, map, courses) with this.
 * Marketing pages keep the top Navbar instead.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:pl-64">
      <AnimatePresence>{open && <Sidebar open onClose={() => setOpen(false)} />}</AnimatePresence>
      {/* Desktop sidebar (always mounted, fixed) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-canvas/80 px-4 py-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-1.5 text-gray-300 hover:bg-surface-2 hover:text-white"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <MascotBoots size={26} />
          <span className="font-bold tracking-tight text-white">Cantrip</span>
        </div>
      </header>

      <main className="min-h-screen">{children}</main>
    </div>
  );
}
