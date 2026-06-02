"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import { UpgradeButton } from "./UpgradeButton";

// Paywall shown in place of the interactive controls when a free user reaches a
// Pro-only lesson. Reading the lesson stays free — this only gates run/grade.
export function ProGate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-accent/40 bg-surface p-6 text-center shadow-glow"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-soft">
        <Lock size={22} />
      </div>
      <h3 className="text-lg font-bold text-white">Unlock interactive lessons</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-gray-400">
        You&apos;ve used your free preview. Go Pro to run code, auto-grade every
        lesson, and keep earning XP across all courses.
      </p>

      <ul className="mx-auto mt-4 max-w-xs space-y-1.5 text-left text-sm text-gray-300">
        {[
          "Every interactive, auto-graded lesson",
          "All courses & future languages",
          "The Cantrip AI tutor — Socratic hints, never the answer",
          "Leagues, certificates & the full game",
        ].map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check size={15} className="mt-0.5 shrink-0 text-success" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-5 max-w-xs">
        <UpgradeButton plan="annual">Go Pro — $9/mo</UpgradeButton>
      </div>
      <Link
        href="/pricing"
        className="mt-3 inline-block text-xs text-gray-500 hover:text-accent-soft"
      >
        Compare plans →
      </Link>
    </motion.div>
  );
}
