// Curriculum quality gate. Validates every lesson against the same grading logic
// the in-browser worker uses, plus structural/quality checks. Run with:
//   npm run check
// (which calls: node --experimental-strip-types scripts/check-curriculum.ts)
//
// NB: import module files directly (with .ts extensions) so this runs under
// Node's type-stripping without a bundler. The app uses src/lib/curriculum/index.ts.
import { transform } from "sucrase";
import type { Lesson, Module } from "../src/lib/curriculum/types.ts";
import { MODULES } from "./_modules.ts";

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

  // Python (Pyodide) and SQL (sql.js) execute in a browser WASM runtime we can't
  // spin up under Node, so validate them structurally. JS and TS *are* graded
  // here — TS is transpiled to JS first (mirroring the in-browser runner).
  if (language !== "js" && language !== "ts") {
    if (language === "sql" && (!lesson.setup || !lesson.setup.trim()))
      errors.push(`${where}: SQL lesson needs a "setup" (schema + seed data)`);
    if (lesson.starterCode.trim() === lesson.solution.trim())
      errors.push(`${where}: starterCode is identical to the solution (lesson is pre-solved)`);
    return;
  }

  const toJs = (code: string): string =>
    language === "ts"
      ? transform(code, { transforms: ["typescript"] }).code
      : code;

  const solutionJs = toJs(lesson.solution);
  const starterJs = toJs(lesson.starterCode);

  // ── grading: solution must pass ALL tests ──
  for (const t of lesson.tests) {
    if (!(await testPasses(solutionJs, t)))
      errors.push(`${where}: solution FAILS test "${t.name}"`);
  }

  // ── quality: starter must NOT already pass every test (no pre-solved lessons) ──
  let starterPassesAll = true;
  for (const t of lesson.tests) {
    if (!(await testPasses(starterJs, t))) {
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
