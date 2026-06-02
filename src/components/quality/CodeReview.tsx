"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { analyze } from "@/lib/quality/analyze";

const GRADE_CLS: Record<string, string> = {
  A: "text-success border-success/50 bg-success/10",
  B: "text-accent-soft border-accent/50 bg-accent/10",
  C: "text-gold border-gold/50 bg-gold/10",
  D: "text-danger border-danger/50 bg-danger/10",
};

// Shown after a JS lesson's tests pass: a quick static "code review" of the
// learner's solution — grade, key metrics, and tips. Read-only and instant.
export function CodeReview({ code }: { code: string }) {
  const report = useMemo(() => analyze(code), [code]);
  if (!report.ok) return null;

  const { metrics, grade, tips, score } = report;
  const chips: { label: string; value: string }[] = [
    { label: "Complexity", value: String(metrics.complexity) },
    { label: "Max nesting", value: String(metrics.maxNesting) },
    { label: "Functions", value: String(metrics.functions) },
    { label: "Lines", value: String(metrics.loc) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl border text-2xl font-bold ${
            GRADE_CLS[grade] ?? GRADE_CLS.C
          }`}
        >
          {grade}
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <Sparkles size={14} className="text-accent-soft" /> Code review
          </p>
          <p className="text-xs text-gray-400">Clarity score {score}/100</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className="rounded-lg border border-line bg-canvas/50 px-2.5 py-1 text-xs text-gray-300"
          >
            {c.label} <span className="font-mono font-semibold text-white">{c.value}</span>
          </span>
        ))}
      </div>

      <ul className="mt-3 space-y-1.5">
        {tips.map((t, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-300">
            <span className="text-accent-soft">•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
