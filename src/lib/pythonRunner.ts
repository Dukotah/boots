// Python runtime: Pyodide (CPython compiled to WASM), loaded once from jsDelivr.
// This module is dynamically imported by runner.ts only when a Python lesson
// is first run — it is never included in the JS or HTML lesson bundles.

import type { TestCase } from "./curriculum/types";
import type { TestResult } from "@/workers/codeRunner";
import type { RunOutcome, ScratchResult } from "./runner";

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type Pyodide = {
  runPython: (code: string) => unknown;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

let pyodidePromise: Promise<Pyodide> | null = null;

function loadPyodide(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    // Dynamic import of the ESM build straight from CDN — no bundling, no npm dep.
    const mod = await import(/* webpackIgnore: true */ `${PYODIDE_CDN}pyodide.mjs`);
    return (await mod.loadPyodide({ indexURL: PYODIDE_CDN })) as Pyodide;
  })();
  return pyodidePromise;
}

// Helpers injected before every Python test so lessons share one grading contract.
const PY_PRELUDE = `
def assert_equals(actual, expected, msg=None):
    if actual != expected:
        raise AssertionError(msg or f"Expected {expected!r} but got {actual!r}")
`;

export async function runPython(code: string, tests: TestCase[]): Promise<RunOutcome> {
  let py: Pyodide;
  try {
    py = await loadPyodide();
  } catch {
    return {
      timedOut: false,
      results: tests.map((t) => ({
        name: t.name,
        pass: false,
        error: "Could not load the Python runtime. Check your connection.",
        logs: [],
      })),
    };
  }

  const results: TestResult[] = [];
  for (const test of tests) {
    const logs: string[] = [];
    py.setStdout({ batched: (s) => logs.push(s) });
    py.setStderr({ batched: (s) => logs.push(s) });
    try {
      py.runPython(`${PY_PRELUDE}\n${code}\n${test.code}`);
      results.push({ name: test.name, pass: true, logs });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // Pyodide errors are verbose; show the final, most useful line.
      const lines = message.trim().split("\n");
      results.push({
        name: test.name,
        pass: false,
        error: lines[lines.length - 1] || message,
        logs,
      });
    }
  }
  return { results, timedOut: false };
}

export async function scratchPython(code: string): Promise<ScratchResult> {
  let py: Pyodide;
  try {
    py = await loadPyodide();
  } catch {
    return { logs: [], error: "Could not load the Python runtime. Check your connection." };
  }
  const logs: string[] = [];
  py.setStdout({ batched: (s) => logs.push(s) });
  py.setStderr({ batched: (s) => logs.push(s) });
  try {
    py.runPython(code);
    return { logs };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const lines = message.trim().split("\n");
    return { logs, error: lines[lines.length - 1] || message };
  }
}
