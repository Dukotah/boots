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
  if (language === "py") return runPython(code, lesson.tests);
  if (language === "sql") return runSql(code, lesson);
  return runJs(code, lesson.tests);
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

function execToString(db: SqlDb, query: string): string {
  return JSON.stringify(db.exec(query));
}

async function runSql(code: string, lesson: Lesson): Promise<RunOutcome> {
  const testName = lesson.tests[0]?.name ?? "Query returns the correct rows";
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
      expected = execToString(db, lesson.solution);
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
    const actual = execToString(db, code);
    const pass = actual === expected;
    return {
      timedOut: false,
      results: [
        {
          name: testName,
          pass,
          error: pass ? undefined : "Your query's result doesn't match the expected rows.",
          logs: [],
        },
      ],
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
