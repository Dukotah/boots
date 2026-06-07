"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

const STORAGE_KEY = "boots-skill-tree-intro-seen";

type Step = {
  title: string;
  body: string;
  icon: string;
};

const STEPS: Step[] = [
  {
    icon: "🌟",
    title: "What are Skill Points?",
    body:
      "Skill Points (SP) are earned by genuine learning — 1 SP per course completed, 2 SP per career certificate, and 1 SP every 5 levels. They are never sold; finishing content is the only path to a stronger build.",
  },
  {
    icon: "🌲",
    title: "How to spend SP",
    body:
      "Pick a branch (Prospector, Sentinel, Luminary, Scholar) and unlock talents top-down. Each talent permanently boosts gold, streak protection, or exclusive cosmetics — nothing that affects XP or League standings.",
  },
  {
    icon: "⚡",
    title: "Recommended builds",
    body:
      'Not sure where to start? Use the Recommended Builds row below to follow a preset path. Click "Apply next step" to buy one talent at a time. You can respec your build later for gold.',
  },
];

/**
 * SkillTreeWalkthrough — a dismissible 3-step coachmark shown on the first
 * visit to /skill-tree. The "seen" flag is stored in localStorage only, so
 * it never pollutes the synced game store and is device-local.
 */
export function SkillTreeWalkthrough() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  // Read the localStorage flag only after mount (SSR-safe).
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage blocked (private browsing, etc.) — stay hidden.
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  }

  const current = STEPS[step];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="skill-tree-walkthrough"
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="mb-6 rounded-2xl border border-accent/40 bg-accent/5 p-5"
          role="dialog"
          aria-label="Skill tree introduction"
          aria-modal="false"
        >
          {/* Header row */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none" aria-hidden>
                {current.icon}
              </span>
              <h3 className="text-sm font-bold text-white">{current.title}</h3>
            </div>
            <button
              onClick={dismiss}
              className="rounded-lg p-1 text-gray-500 hover:text-gray-300"
              aria-label="Dismiss introduction"
            >
              <X size={14} aria-hidden />
            </button>
          </div>

          {/* Body */}
          <p className="text-sm leading-relaxed text-gray-300">{current.body}</p>

          {/* Footer: step dots + next/finish button */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {/* Step indicators */}
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 20 : 6,
                    backgroundColor: i === step ? "#818cf8" : "#374151",
                  }}
                  aria-hidden
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex items-center gap-1.5 rounded-xl bg-accent/20 px-4 py-1.5 text-xs font-semibold text-accent-soft transition hover:bg-accent/30"
            >
              {step < STEPS.length - 1 ? (
                <>
                  Next <ChevronRight size={12} aria-hidden />
                </>
              ) : (
                "Got it"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
