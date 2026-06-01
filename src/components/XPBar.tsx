"use client";

import { motion } from "framer-motion";
import type { LevelInfo } from "@/lib/levels";

export function XPBar({ info }: { info: LevelInfo }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
        <span>
          {info.rank.emoji} {info.rank.name} · Lvl {info.level}
        </span>
        <span>
          {info.xpIntoLevel}/{info.xpForLevel} XP
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-line bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft shadow-glow"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(info.progress * 100, 100)}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
    </div>
  );
}
