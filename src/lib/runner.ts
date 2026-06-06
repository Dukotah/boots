import type { Lesson, TestCase, LessonLanguage } from "./curriculum/types";
import type { TestResult } from "@/workers/codeRunner";

export type RunOutcome = {
  results: TestResult[];
  timedOut: boolean;
};

const TIMEOUT_MS = 4000;

// Dispatch a lesson run to the right runtime. Every path runs client-side, so
// there is no server sandbox: JS in a Web Worker, Python via Pyodide (WASM),
// SQL via sql.js (SQLite in WASM). Pyodide/sql.js are loaded lazily from CDN the
// first time a learner opens a Python/SQL lesson, then cached for the session.
//
// The py/sql runtime modules (pythonRunner, sqlRunner) are split into separate
// dynamic chunks — they are NOT included in the initial JS bundle at all. A JS
// or HTML lesson page never downloads WASM loader code.
export function runLesson(
  code: string,
  lesson: Lesson,
  language: LessonLanguage,
): Promise<RunOutcome> {
  const tests = lesson.tests ?? [];
  if (language === "py") {
    return import("./pythonRunner").then((m) => m.runPython(code, tests));
  }
  if (language === "sql") {
    return import("./sqlRunner").then((m) => m.runSql(code, lesson));
  }
  if (language === "ts") {
    return runTs(code, tests);
  }
  return runJs(code, tests);
}

// TypeScript: strip the types to JS with sucrase, then run through the same
// Worker as JS. Sucrase is dynamically imported so JS/Python/SQL lesson pages
// never bundle it. A type/syntax error surfaces as a failing run, not a crash.
async function runTs(code: string, tests: TestCase[]): Promise<RunOutcome> {
  let js: string;
  try {
    const { transform } = await import("sucrase");
    js = transform(code, { transforms: ["typescript"] }).code;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      timedOut: false,
      results: tests.map((t) => ({
        name: t.name,
        pass: false,
        error: `TypeScript error: ${message}`,
        logs: [],
      })),
    };
  }
  return runJs(js, tests);
}

// ── Playground: run code freely and capture output (no grading) ───────────────
export type SqlTable = { columns: string[]; values: unknown[][] };
export type ScratchResult = {
  logs: string[];
  error?: string;
  tables?: SqlTable[]; // SQL result sets
};

// Powers the /playground REPL. Runs the student's code in the right runtime and
// returns whatever it printed (JS/Python) or the rows it selected (SQL).
export async function runScratch(
  code: string,
  language: LessonLanguage,
): Promise<ScratchResult> {
  if (language === "py") {
    return import("./pythonRunner").then((m) => m.scratchPython(code));
  }
  if (language === "sql") {
    return import("./sqlRunner").then((m) => m.scratchSql(code));
  }
  // JS: reuse the worker via a single no-op test; its logs are what `code` printed.
  const outcome = await runJs(code, [{ name: "", code: "" }]);
  const r = outcome.results[0];
  return { logs: r?.logs ?? [], error: r?.pass ? undefined : r?.error };
}

// ── JavaScript: sandboxed Web Worker (terminable on infinite loop) ────────────
function runJs(code: string, tests: TestCase[]): Promise<RunOutcome> {
  return new Promise((resolve) => {
    const worker = new Worker(
      new URL("../workers/codeRunner.ts", import.meta.url),
    );

    const timer = setTimeout(() => {
      worker.terminate();
      resolve({
        timedOut: true,
        results: tests.map((t) => ({
          name: t.name,
          pass: false,
          error: "Timed out — possible infinite loop?",
          logs: [],
        })),
      });
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent<{ results: TestResult[] }>) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ results: e.data.results, timedOut: false });
    };

    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({
        timedOut: false,
        results: tests.map((t) => ({
          name: t.name,
          pass: false,
          error: e.message || "Worker error",
          logs: [],
        })),
      });
    };

    worker.postMessage({ code, tests });
  });
}
