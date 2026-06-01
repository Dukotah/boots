// Curriculum quality gate. Validates every lesson against the same grading logic
// the in-browser worker uses, plus structural/quality checks. Run with:
//   npm run check
// (which calls: node --experimental-strip-types scripts/check-curriculum.ts)
//
// NB: import module files directly (with .ts extensions) so this runs under
// Node's type-stripping without a bundler. The app uses src/lib/curriculum/index.ts.
import { javascript } from "../src/lib/curriculum/javascript.ts";
import { javascriptNext } from "../src/lib/curriculum/javascript-next.ts";
import { asyncJs } from "../src/lib/curriculum/async.ts";
import { webApis } from "../src/lib/curriculum/web-apis.ts";
import { strings } from "../src/lib/curriculum/strings.ts";
import { functional } from "../src/lib/curriculum/functional.ts";
import { closures } from "../src/lib/curriculum/closures.ts";
import { oop } from "../src/lib/curriculum/oop.ts";
import { collections } from "../src/lib/curriculum/collections.ts";
import { recursion } from "../src/lib/curriculum/recursion.ts";
import { regex } from "../src/lib/curriculum/regex.ts";
import { errorHandling } from "../src/lib/curriculum/error-handling.ts";
import { json } from "../src/lib/curriculum/json.ts";
import { dataFormats } from "../src/lib/curriculum/data-formats.ts";
import { gitGithub } from "../src/lib/curriculum/git-github.ts";
import { math } from "../src/lib/curriculum/math.ts";
import { algorithms } from "../src/lib/curriculum/algorithms.ts";
import { dataStructures } from "../src/lib/curriculum/data-structures.ts";
import { bitManipulation } from "../src/lib/curriculum/bit-manipulation.ts";
import { twoPointers } from "../src/lib/curriculum/two-pointers.ts";
import { dynamicProgramming } from "../src/lib/curriculum/dynamic-programming.ts";
import { interview } from "../src/lib/curriculum/interview.ts";
import { python } from "../src/lib/curriculum/python.ts";
import { pythonStrings } from "../src/lib/curriculum/python-strings.ts";
import { pythonComprehensions } from "../src/lib/curriculum/python-comprehensions.ts";
import { pythonOop } from "../src/lib/curriculum/python-oop.ts";
import { pythonAlgorithms } from "../src/lib/curriculum/python-algorithms.ts";
import { pythonData } from "../src/lib/curriculum/python-data.ts";
import { sql } from "../src/lib/curriculum/sql.ts";
import { sqlJoins } from "../src/lib/curriculum/sql-joins.ts";
import { sqlAggregations } from "../src/lib/curriculum/sql-aggregations.ts";
import { sqlSubqueries } from "../src/lib/curriculum/sql-subqueries.ts";
import { aiLlms } from "../src/lib/curriculum/ai-llms.ts";
import type { Lesson, Module } from "../src/lib/curriculum/types.ts";

// Keep in sync with src/lib/curriculum/index.ts. (New module? Add it here too.)
const MODULES: Module[] = [
  javascript,
  javascriptNext,
  asyncJs,
  webApis,
  strings,
  functional,
  closures,
  oop,
  collections,
  recursion,
  regex,
  errorHandling,
  json,
  dataFormats,
  gitGithub,
  math,
  algorithms,
  dataStructures,
  bitManipulation,
  twoPointers,
  dynamicProgramming,
  interview,
  python,
  pythonStrings,
  pythonComprehensions,
  pythonOop,
  pythonAlgorithms,
  pythonData,
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  aiLlms,
];

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

// Mirror the worker: compile as an async function so lessons using `await` work.
const AsyncFunction = Object.getPrototypeOf(async function () {})
  .constructor as new (
  ...args: string[]
) => (...fnArgs: unknown[]) => Promise<unknown>;

/** Run a single test against code; resolve true if it passes (no throw). */
async function testPasses(code: string, test: { code: string }): Promise<boolean> {
  const assertEquals = (a: unknown, b: unknown, m?: string) => {
    if (stringify(a) !== stringify(b))
      throw new Error(m ?? `Expected ${stringify(b)} but got ${stringify(a)}`);
  };
  const assert = (c: unknown, m?: string) => {
    if (!c) throw new Error(m ?? "Assertion failed");
  };
  const fakeConsole = { log() {}, info() {}, warn() {}, error() {} };
  try {
    const fn = new AsyncFunction(
      "console",
      "assertEquals",
      "assert",
      `"use strict";\n${code}\n;\n${test.code}`,
    );
    await fn(fakeConsole, assertEquals, assert);
    return true;
  } catch {
    return false;
  }
}

const errors: string[] = [];

async function checkLesson(mod: Module, lesson: Lesson, seen: Set<string>) {
  const where = `${mod.slug}/${lesson.slug}`;

  // ── structure ──
  if (!lesson.slug) errors.push(`${mod.slug}: a lesson is missing a slug`);
  if (seen.has(lesson.slug)) errors.push(`${where}: duplicate slug within module`);
  seen.add(lesson.slug);

  for (const field of ["title", "blurb", "content", "starterCode", "solution"] as const) {
    if (!lesson[field] || String(lesson[field]).trim() === "")
      errors.push(`${where}: empty "${field}"`);
  }
  if (!(lesson.xp > 0)) errors.push(`${where}: xp must be > 0 (got ${lesson.xp})`);
  if (!lesson.tests || lesson.tests.length === 0)
    errors.push(`${where}: needs at least one test`);

  if (!lesson.tests?.length) return;

  const language = lesson.language ?? mod.language ?? "js";

  // Non-JS lessons (Python via Pyodide, SQL via sql.js) execute in a browser WASM
  // runtime that we can't spin up under Node here, so we validate them
  // structurally instead of grading them. Browser-side runs do the real grading.
  if (language !== "js") {
    if (language === "sql" && (!lesson.setup || !lesson.setup.trim()))
      errors.push(`${where}: SQL lesson needs a "setup" (schema + seed data)`);
    if (lesson.starterCode.trim() === lesson.solution.trim())
      errors.push(`${where}: starterCode is identical to the solution (lesson is pre-solved)`);
    return;
  }

  // ── grading: solution must pass ALL tests ──
  for (const t of lesson.tests) {
    if (!(await testPasses(lesson.solution, t)))
      errors.push(`${where}: solution FAILS test "${t.name}"`);
  }

  // ── quality: starter must NOT already pass every test (no pre-solved lessons) ──
  let starterPassesAll = true;
  for (const t of lesson.tests) {
    if (!(await testPasses(lesson.starterCode, t))) {
      starterPassesAll = false;
      break;
    }
  }
  if (starterPassesAll)
    errors.push(`${where}: starterCode already passes all tests (lesson is pre-solved)`);
}

let lessonCount = 0;
let testCount = 0;
for (const mod of MODULES) {
  const seen = new Set<string>();
  if (!mod.lessons.length) errors.push(`${mod.slug}: module has no lessons`);
  for (const lesson of mod.lessons) {
    lessonCount++;
    testCount += lesson.tests?.length ?? 0;
    await checkLesson(mod, lesson, seen);
  }
}

if (errors.length) {
  console.log("❌ Curriculum check failed:\n");
  for (const e of errors) console.log("  • " + e);
  console.log(`\n${errors.length} problem(s) across ${lessonCount} lessons.`);
  process.exit(1);
}

console.log(
  `✅ Curriculum OK — ${MODULES.length} modules, ${lessonCount} lessons, ${testCount} tests all green.`,
);
