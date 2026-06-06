// SQL runtime: sql.js (SQLite in WASM). Loaded once from jsDelivr via a
// <script> tag injection (UMD bundle, not ESM). This module is dynamically
// imported by runner.ts only when a SQL lesson is first run — it is never
// included in the JS or HTML lesson bundles.

import type { Lesson } from "./curriculum/types";
import type { RunOutcome, SqlTable, ScratchResult } from "./runner";

const SQLJS_VERSION = "1.12.0";
const SQLJS_CDN = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/`;

type SqlDb = {
  run: (sql: string) => void;
  exec: (sql: string) => SqlTable[];
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

export async function runSql(code: string, lesson: Lesson): Promise<RunOutcome> {
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
      expected = execToString(db, lesson.solution ?? "");
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

export async function scratchSql(code: string): Promise<ScratchResult> {
  let SQL: SqlJs;
  try {
    SQL = await loadSqlJs();
  } catch {
    return { logs: [], error: "Could not load the SQL runtime. Check your connection." };
  }
  const db = new SQL.Database();
  try {
    const tables = db.exec(code);
    return { logs: [], tables };
  } catch (err) {
    return { logs: [], error: err instanceof Error ? err.message : String(err) };
  } finally {
    db.close();
  }
}
