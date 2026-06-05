"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useEffect } from "react";

// Listens for skill points earned by the latest lesson completion and shows a
// celebratory toast that links to the Skill Tree — so the build system is felt
// the moment it's earned, not silently accrued. Sits bottom-right to clear the
// centered LevelUpToast.
export function SkillPointToast() {
  const points = useGameStore((s) => s.recentSkillPoints);
  const clear = useGameStore((s) => s.clearRecentSkillPoints);

  useEffect(() => {
    if (points !== null) {
      const t = setTimeout(clear, 4000);
      return () => clearTimeout(t);
    }
  }, [points, clear]);

  return (
    <AnimatePresence>
      {points !== null && points > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href="/skill-tree"
            onClick={clear}
            className="flex items-center gap-3 rounded-2xl border border-accent/60 bg-surface px-5 py-4 shadow-glow transition-colors hover:border-accent"
          >
            <span className="text-3xl">🌟</span>
            <div>
              <p className="text-sm font-bold text-white">
                +{points} Skill Point{points > 1 ? "s" : ""}!
              </p>
              <p className="text-xs text-accent-soft">
                Spend it in the Skill Tree →
              </p>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
