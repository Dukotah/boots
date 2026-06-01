"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Terminal } from "lucide-react";
import type { TestResult } from "@/workers/codeRunner";

export function TestResults({
  results,
  hasRun,
}: {
  results: TestResult[];
  hasRun: boolean;
}) {
  if (!hasRun) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500">
        <div>
          <Terminal className="mx-auto mb-2 opacity-50" size={22} />
          Run your code to see test results.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      <AnimatePresence initial={false}>
        {results.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-lg border p-3 text-sm ${
              r.pass
                ? "border-success/40 bg-success/10"
                : "border-danger/40 bg-danger/10"
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              {r.pass ? (
                <Check size={16} className="text-success" />
              ) : (
                <X size={16} className="text-danger" />
              )}
              <span className={r.pass ? "text-success" : "text-danger"}>
                {r.name}
              </span>
            </div>
            {!r.pass && r.error && (
              <p className="mt-1 pl-6 font-mono text-xs text-danger/90">
                {r.error}
              </p>
            )}
            {r.logs.length > 0 && (
              <pre className="mt-2 ml-6 overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs text-gray-400">
                {r.logs.join("\n")}
              </pre>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
