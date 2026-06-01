"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { rankForLevel } from "@/lib/levels";
import { useEffect } from "react";

// Listens for a level-up flag set by the store and shows a celebratory toast.
export function LevelUpToast() {
  const level = useGameStore((s) => s.lastLevelUp);
  const clear = useGameStore((s) => s.clearLevelUp);

  useEffect(() => {
    if (level !== null) {
      const t = setTimeout(clear, 3500);
      return () => clearTimeout(t);
    }
  }, [level, clear]);

  const rank = level !== null ? rankForLevel(level) : null;

  return (
    <AnimatePresence>
      {level !== null && rank && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-accent/60 bg-surface px-6 py-4 shadow-glow">
            <span className="text-3xl">{rank.emoji}</span>
            <div>
              <p className="text-sm font-bold text-white">
                Level {level}! 🎉
              </p>
              <p className="text-xs text-accent-soft">
                You&apos;re now a {rank.name}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
