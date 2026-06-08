"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Compass } from "lucide-react";

// The full set of gamification / meta-system entry points, demoted into one
// lighter, collapsible group so they no longer compete with "Continue learning".
// Every link here remains reachable — this is re-prioritisation, not removal.
const LINKS: { href: string; icon: string; label: string; desc: string }[] = [
  { href: "/guilds", icon: "🛡️", label: "Guilds", desc: "Team competition" },
  { href: "/events", icon: "🎉", label: "Events", desc: "Seasonal challenges" },
  { href: "/leaderboard", icon: "🏅", label: "Leaderboard", desc: "Global rankings" },
  { href: "/achievements", icon: "🏆", label: "Achievements", desc: "55+ badges" },
  { href: "/leagues", icon: "⚔️", label: "Leagues", desc: "Weekly ranking" },
  { href: "/paths", icon: "🎯", label: "Career Paths", desc: "Job-ready tracks" },
  { href: "/skill-tree", icon: "🌳", label: "Skill Tree", desc: "Unlock abilities" },
  { href: "/review", icon: "🔁", label: "Review", desc: "Spaced repetition" },
];

export function ExploreMore() {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-line bg-surface-2/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="explore-more-grid"
        className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-surface-2/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="flex items-center gap-2">
          <Compass size={16} className="text-gray-400" aria-hidden />
          <span className="font-semibold text-white">Explore more</span>
          <span className="text-sm text-gray-500">
            Guilds, events, leaderboard, skill tree &amp; more
          </span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id="explore-more-grid"
          className="grid grid-cols-2 gap-3 px-4 pb-4 pt-1 sm:grid-cols-4 lg:grid-cols-8"
        >
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-lg border border-line/60 bg-surface-2/40 py-3 text-center transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-[11px] text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
