"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Terminal, Circle } from "lucide-react";
import type { TestResult } from "@/workers/codeRunner";

// The graders emit assertion errors in a stable shape — JS `assertEquals` throws
// `Expected <b> but got <a>` and Python `assert_equals` raises the same wording.
// Pull those apart so a failure can render an expected-vs-actual diff instead of
// a raw error string. Falls back to the plain message when it doesn't match.
function parseExpectedActual(
  error: string,
): { expected: string; actual: string } | null {
  const m = error.match(/Expected\s+([\s\S]+?)\s+but got\s+([\s\S]+)$/i);
  if (!m) return null;
  return { expected: m[1].trim(), actual: m[2].trim() };
}

export function TestResults({
  results,
  hasRun,
  pendingTests = [],
}: {
  results: TestResult[];
  hasRun: boolean;
  /** Test cases known before running — shown greyed as the spec to aim for. */
  pendingTests?: { name: string }[];
}) {
  if (!hasRun) {
    // Show the test cases up front as a checklist of what "done" looks like —
    // turns an empty panel into scaffolding. Named cases only (some graders use
    // a single unnamed assertion, which reads as noise here).
    const named = pendingTests.filter((t) => t.name?.trim());
    if (named.length === 0) {
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
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tests
          </span>
          <span className="text-xs font-medium text-gray-500">
            {named.length} to pass
          </span>
        </div>
        <div className="space-y-2">
          {named.map((t, i) => (
            <div
              key={t.name || i}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/40 p-3 text-sm text-gray-400"
            >
              <Circle size={16} className="shrink-0 text-gray-600" aria-hidden />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 px-1 text-xs text-gray-500">
          Run your code to check these.
        </p>
      </div>
    );
  }

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;
  const allPass = total > 0 && passed === total;

  return (
    <div className="p-3">
      {/* Summary tally */}
      {total > 0 && (
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tests
          </span>
          <span
            className={`text-xs font-semibold ${
              allPass ? "text-success" : "text-gray-400"
            }`}
          >
            {passed}/{total} passing
          </span>
        </div>
      )}

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {results.map((r, i) => {
            const diff = !r.pass && r.error ? parseExpectedActual(r.error) : null;
            return (
              <motion.div
                key={r.name || i}
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
                    <Check size={16} className="shrink-0 text-success" />
                  ) : (
                    <X size={16} className="shrink-0 text-danger" />
                  )}
                  <span className={r.pass ? "text-success" : "text-danger"}>
                    {r.name || "Test"}
                  </span>
                </div>

                {/* Failure: expected-vs-actual diff when we can parse it… */}
                {!r.pass && diff && (
                  <div className="mt-2 ml-6 grid gap-1.5 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-16 shrink-0 font-semibold text-success/80">
                        Expected
                      </span>
                      <code className="min-w-0 flex-1 break-all rounded bg-black/30 px-1.5 py-0.5 font-mono text-emerald-300">
                        {diff.expected}
                      </code>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-16 shrink-0 font-semibold text-danger/80">
                        Got
                      </span>
                      <code className="min-w-0 flex-1 break-all rounded bg-black/30 px-1.5 py-0.5 font-mono text-rose-300">
                        {diff.actual}
                      </code>
                    </div>
                  </div>
                )}

                {/* …otherwise the raw error message. */}
                {!r.pass && r.error && !diff && (
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
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
