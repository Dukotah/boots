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
export function runLesson(
  code: string,
  lesson: Lesson,
  language: LessonLanguage,
): Promise<RunOutcome> {
  const tests = lesson.tests ?? [];
  if (language === "py") return runPython(code, tests);
  if (language === "sql") return runSql(code, lesson);
  if (language === "ts") {
    // Strip the types to JS with sucrase (lazy-loaded — only TS lessons pull it
    // into the bundle), then run through the same Worker as JS. A type/syntax
    // error surfaces as a failing run rather than a crash.
    return (async () => {
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
    })();
  }
  return runJs(code, tests);
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
  if (language === "py") return scratchPython(code);
  if (language === "sql") return scratchSql(code);
  // JS: reuse the worker via a single no-op test; its logs are what `code` printed.
  const outcome = await runJs(code, [{ name: "", code: "" }]);
  const r = outcome.results[0];
  return { logs: r?.logs ?? [], error: r?.pass ? undefined : r?.error };
}

async function scratchPython(code: string): Promise<ScratchResult> {
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

async function scratchSql(code: string): Promise<ScratchResult> {
  let SQL: SqlJs;
  try {
    SQL = await loadSqlJs();
  } catch {
    return { logs: [], error: "Could not load the SQL runtime. Check your connection." };
  }
  const db = new SQL.Database();
  try {
    const tables = db.exec(code) as SqlTable[];
    return { logs: [], tables };
  } catch (err) {
    return { logs: [], error: err instanceof Error ? err.message : String(err) };
  } finally {
    db.close();
  }
}

// ── JavaScript: sandboxed Web Worker (terminable on infinite loop) ────────────
// One long-lived worker is reused across runs and warmed on lesson mount, so the
// ~1s first-Run cost (instantiating + compiling the worker) is paid during the
// learner's think-time instead of on their first click. Requests are correlated
// by id; a timed-out (possibly stuck) worker is torn down so the next run starts
// from a fresh one.
type PendingRun = {
  resolve: (o: RunOutcome) => void;
  timer: ReturnType<typeof setTimeout>;
  tests: TestCase[];
};

let sharedWorker: Worker | null = null;
let runSeq = 0;
const pendingRuns = new Map<number, PendingRun>();

function resetWorker() {
  if (sharedWorker) {
    sharedWorker.terminate();
    sharedWorker = null;
  }
}

function failAllPending(error: string) {
  pendingRuns.forEach((entry) => {
    clearTimeout(entry.timer);
    entry.resolve({
      timedOut: false,
      results: entry.tests.map((t) => ({ name: t.name, pass: false, error, logs: [] })),
    });
  });
  pendingRuns.clear();
}

function getWorker(): Worker {
  if (sharedWorker) return sharedWorker;
  const worker = new Worker(new URL("../workers/codeRunner.ts", import.meta.url));
  worker.onmessage = (e: MessageEvent<{ id: number; results: TestResult[] }>) => {
    const entry = pendingRuns.get(e.data.id);
    if (!entry) return;
    clearTimeout(entry.timer);
    pendingRuns.delete(e.data.id);
    entry.resolve({ results: e.data.results, timedOut: false });
  };
  worker.onerror = (e) => {
    // An uncaught worker error kills it — fail everything in flight and rebuild.
    failAllPending(e.message || "Worker error");
    resetWorker();
  };
  sharedWorker = worker;
  return worker;
}

/** Warm the JS runtime ahead of the first Run (call on lesson mount / idle). */
export function warmJsRuntime(): void {
  if (typeof window === "undefined") return;
  try {
    getWorker();
  } catch {
    // Best-effort; runJs will surface any real failure on first use.
  }
}

function runJs(code: string, tests: TestCase[]): Promise<RunOutcome> {
  return new Promise((resolve) => {
    let worker: Worker;
    try {
      worker = getWorker();
    } catch (err) {
      resolve({
        timedOut: false,
        results: tests.map((t) => ({
          name: t.name,
          pass: false,
          error: err instanceof Error ? err.message : "Worker error",
          logs: [],
        })),
      });
      return;
    }

    const id = ++runSeq;
    const timer = setTimeout(() => {
      pendingRuns.delete(id);
      // The worker may be stuck in an infinite loop — tear it down so the next
      // run rebuilds a clean one.
      resetWorker();
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

    pendingRuns.set(id, { resolve, timer, tests });
    worker.postMessage({ id, code, tests });
  });
}

// ── Python: Pyodide (CPython compiled to WASM), loaded once from jsDelivr ──────
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

async function runPython(code: string, tests: TestCase[]): Promise<RunOutcome> {
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

// ── SQL: sql.js (SQLite in WASM). Grade by comparing result sets to the ───────
//        reference solution run against the same freshly-seeded database.
const SQLJS_VERSION = "1.12.0";
const SQLJS_CDN = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/`;

type SqlDb = {
  run: (sql: string) => void;
  exec: (sql: string) => { columns: string[]; values: unknown[][] }[];
  close: () => void;
};
type SqlJs = { Database: new () => SqlDb };

let sqlJsPromise: Promise<SqlJs> | null = null;

// sql.js ships a UMD bundle (not ESM), so a dynamic import() can't load it.
// Inject it as a <script>, which defines the global `initSqlJs`, then call it.
function loadSqlJs(): Promise<SqlJs> {
  if (sqlJsPromise) return sqlJsPromise;
  sqlJsPromise = new Promise<SqlJs>((resolve, reject) => {
    type InitSqlJs = (cfg: { locateFile: (f: string) => string }) => Promise<SqlJs>;
    const w = window as unknown as { initSqlJs?: InitSqlJs };
    const start = () =>
      w
        .initSqlJs!({ locateFile: (f: string) => `${SQLJS_CDN}${f}` })
        .then(resolve, reject);

    if (w.initSqlJs) {
      start();
      return;
    }
    const script = document.createElement("script");
    script.src = `${SQLJS_CDN}sql-wasm.js`;
    script.async = true;
    script.onload = () => start();
    script.onerror = () => reject(new Error("Failed to load sql.js"));
    document.head.appendChild(script);
  });
  return sqlJsPromise;
}

type SqlResultSet = { columns: string[]; values: unknown[][] };

function execResults(db: SqlDb, query: string): SqlResultSet[] {
  return db.exec(query) as SqlResultSet[];
}

// A query that yields no result set, or only empty result sets, is "degenerate"
// — e.g. an empty submission, a non-SELECT, or a SELECT matching nothing. We
// never count that as a pass, otherwise a no-op would match any lesson whose
// reference query also (accidentally) returns nothing.
function isDegenerate(results: SqlResultSet[]): boolean {
  if (results.length === 0) return true;
  return results.every((r) => !r.values || r.values.length === 0);
}

async function runSql(code: string, lesson: Lesson): Promise<RunOutcome> {
  const testName = lesson.tests?.[0]?.name ?? "Query returns the correct rows";
  let SQL: SqlJs;
  try {
    SQL = await loadSqlJs();
  } catch {
    return {
      timedOut: false,
      results: [
        {
          name: testName,
          pass: false,
          error: "Could not load the SQL runtime. Check your connection.",
          logs: [],
        },
      ],
    };
  }

  const setup = lesson.setup ?? "";
  // Reference result: solution query on a fresh, seeded DB.
  let expected: string;
  {
    const db = new SQL.Database();
    try {
      db.run(setup);
      expected = JSON.stringify(execResults(db, lesson.solution ?? ""));
    } catch (err) {
      return {
        timedOut: false,
        results: [
          {
            name: testName,
            pass: false,
            error: `Lesson setup error: ${err instanceof Error ? err.message : String(err)}`,
            logs: [],
          },
        ],
      };
    } finally {
      db.close();
    }
  }

  // Student result on an identical fresh DB.
  const db = new SQL.Database();
  try {
    db.run(setup);
    const actualResults = execResults(db, code);
    const actual = JSON.stringify(actualResults);
    // A degenerate (empty) student result never passes, even if the reference
    // also returned nothing — that would let a no-op query "match".
    const pass = !isDegenerate(actualResults) && actual === expected;
    const error = pass
      ? undefined
      : isDegenerate(actualResults)
        ? "Your query didn't return any rows."
        : "Your query's result doesn't match the expected rows.";
    return {
      timedOut: false,
      results: [{ name: testName, pass, error, logs: [] }],
    };
  } catch (err) {
    return {
      timedOut: false,
      results: [
        {
          name: testName,
          pass: false,
          error: err instanceof Error ? err.message : String(err),
          logs: [],
        },
      ],
    };
  } finally {
    db.close();
  }
}
