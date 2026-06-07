"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";

/**
 * TalentGoldToast — surfaces the brief gold bonus paid by an active talent
 * effect (gold-mult on a lesson, daily-gold on the first lesson of the day,
 * or review-gold on a due spaced-repetition review).
 *
 * Sits bottom-left to avoid colliding with SkillPointToast (bottom-right)
 * and LevelUpToast (bottom-center). Clears itself after 3.5 s.
 */
export function TalentGoldToast() {
  const signal = useGameStore((s) => s.recentTalentGold);
  const clear = useGameStore((s) => s.clearRecentTalentGold);

  useEffect(() => {
    if (signal !== null) {
      const t = setTimeout(clear, 3500);
      return () => clearTimeout(t);
    }
  }, [signal, clear]);

  const label =
    signal?.source === "review"
      ? "Scholar review bonus"
      : signal?.source === "daily"
        ? "Morning Coin bonus"
        : "Talent gold bonus";

  return (
    <AnimatePresence>
      {signal !== null && signal.amount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-surface px-5 py-4 shadow-glow">
            <span className="text-2xl">🪙</span>
            <div>
              <p className="flex items-center gap-1 text-sm font-bold text-gold">
                <Coins size={13} aria-hidden />
                +{signal.amount} gold
              </p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
