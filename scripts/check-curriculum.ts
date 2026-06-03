// Curriculum quality gate. Validates every lesson against the same grading logic
// the in-browser worker uses, plus structural/quality checks. Run with:
//   npm run check
// (which calls: node --experimental-strip-types scripts/check-curriculum.ts)
//
// NB: import module files directly (with .ts extensions) so this runs under
// Node's type-stripping without a bundler. The app uses src/lib/curriculum/index.ts.
import { beginner } from "../src/lib/curriculum/beginner.ts";
import { kids } from "../src/lib/curriculum/kids.ts";
import { html } from "../src/lib/curriculum/html.ts";
import { css } from "../src/lib/curriculum/css.ts";
import { digitalSafety } from "../src/lib/curriculum/digital-safety.ts";
import { javascript } from "../src/lib/curriculum/javascript.ts";
import { javascriptNext } from "../src/lib/curriculum/javascript-next.ts";
import { strings } from "../src/lib/curriculum/strings.ts";
import { functional } from "../src/lib/curriculum/functional.ts";
import { oop } from "../src/lib/curriculum/oop.ts";
import { recursion } from "../src/lib/curriculum/recursion.ts";
import { regex } from "../src/lib/curriculum/regex.ts";
import { errorHandling } from "../src/lib/curriculum/error-handling.ts";
import { json } from "../src/lib/curriculum/json.ts";
import { math } from "../src/lib/curriculum/math.ts";
import { algorithms } from "../src/lib/curriculum/algorithms.ts";
import { dataStructures } from "../src/lib/curriculum/data-structures.ts";
import { dynamicProgramming } from "../src/lib/curriculum/dynamic-programming.ts";
import { interview } from "../src/lib/curriculum/interview.ts";
import { python } from "../src/lib/curriculum/python.ts";
import { pythonData } from "../src/lib/curriculum/python-data.ts";
import { sql } from "../src/lib/curriculum/sql.ts";
import { sqlJoins } from "../src/lib/curriculum/sql-joins.ts";
import { aiLlms } from "../src/lib/curriculum/ai-llms.ts";
import { closures } from "../src/lib/curriculum/closures.ts";
import { dataFormats } from "../src/lib/curriculum/data-formats.ts";
import { collections } from "../src/lib/curriculum/collections.ts";
import { asyncJs } from "../src/lib/curriculum/async.ts";
import { webApis } from "../src/lib/curriculum/web-apis.ts";
import { typescript } from "../src/lib/curriculum/typescript.ts";
import { twoPointers } from "../src/lib/curriculum/two-pointers.ts";
import { bitManipulation } from "../src/lib/curriculum/bit-manipulation.ts";
import { pythonStrings } from "../src/lib/curriculum/python-strings.ts";
import { pythonComprehensions } from "../src/lib/curriculum/python-comprehensions.ts";
import { pythonOop } from "../src/lib/curriculum/python-oop.ts";
import { pythonAlgorithms } from "../src/lib/curriculum/python-algorithms.ts";
import { sqlAggregations } from "../src/lib/curriculum/sql-aggregations.ts";
import { sqlSubqueries } from "../src/lib/curriculum/sql-subqueries.ts";
import { gitGithub } from "../src/lib/curriculum/git-github.ts";
import { promptEngineering } from "../src/lib/curriculum/prompt-engineering.ts";
import { aiApps } from "../src/lib/curriculum/ai-apps.ts";
import { aiAgents } from "../src/lib/curriculum/ai-agents.ts";
import { aiEmbeddings } from "../src/lib/curriculum/ai-embeddings.ts";
import { aiEthics } from "../src/lib/curriculum/ai-ethics.ts";
import { hackerMindset } from "../src/lib/curriculum/hacker-mindset.ts";
import { passwordsAuth } from "../src/lib/curriculum/passwords-auth.ts";
import { webSecurity } from "../src/lib/curriculum/web-security.ts";
import { networkSecurity } from "../src/lib/curriculum/network-security.ts";
import { ctfIntro } from "../src/lib/curriculum/ctf-intro.ts";
import { kidsLogic } from "../src/lib/curriculum/kids-logic.ts";
import { codeQuest2 } from "../src/lib/curriculum/code-quest-2.ts";
import { buildYourFirstGame } from "../src/lib/curriculum/build-your-first-game.ts";
import { internetForKids } from "../src/lib/curriculum/internet-for-kids.ts";
import { aiSafetyKids } from "../src/lib/curriculum/ai-safety-kids.ts";
import { digitalCitizenship } from "../src/lib/curriculum/digital-citizenship.ts";
import type { Lesson, Module } from "../src/lib/curriculum/types.ts";

// Keep in sync with src/lib/curriculum/index.ts. (New module? Add it here too.)
const MODULES: Module[] = [
  beginner,
  kids,
  html,
  css,
  digitalSafety,
  javascript,
  javascriptNext,
  strings,
  functional,
  oop,
  recursion,
  regex,
  errorHandling,
  json,
  dataFormats,
  collections,
  asyncJs,
  webApis,
  closures,
  math,
  typescript,
  algorithms,
  dataStructures,
  dynamicProgramming,
  twoPointers,
  bitManipulation,
  interview,
  python,
  pythonData,
  pythonStrings,
  pythonComprehensions,
  pythonOop,
  pythonAlgorithms,
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  gitGithub,
  aiLlms,
  promptEngineering,
  aiApps,
  aiAgents,
  aiEmbeddings,
  aiEthics,
  hackerMindset,
  passwordsAuth,
  webSecurity,
  networkSecurity,
  ctfIntro,
  kidsLogic,
  codeQuest2,
  buildYourFirstGame,
  internetForKids,
  aiSafetyKids,
  digitalCitizenship,
];

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

/** Run a single test against code; resolve true if it passes (no throw).
 *  Wrapped in an async IIFE + awaited so async/await lessons grade correctly;
 *  synchronous lessons are unaffected (awaiting a non-Promise is a no-op). */
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
    const fn = new Function(
      "console",
      "assertEquals",
      "assert",
      `"use strict";\nreturn (async () => {\n${code}\n;\n${test.code}\n})();`,
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

  for (const field of ["title", "blurb", "content"] as const) {
    if (!lesson[field] || String(lesson[field]).trim() === "")
      errors.push(`${where}: empty "${field}"`);
  }
  if (!(lesson.xp > 0)) errors.push(`${where}: xp must be > 0 (got ${lesson.xp})`);

  // ── quiz lessons: validate questions, then stop (no code to grade) ──
  if (lesson.kind === "quiz") {
    const qs = lesson.questions ?? [];
    if (qs.length === 0) errors.push(`${where}: quiz lesson needs at least one question`);
    qs.forEach((q, i) => {
      if (!q.prompt || !q.prompt.trim()) errors.push(`${where}: question ${i + 1} has no prompt`);
      if (!q.options || q.options.length < 2)
        errors.push(`${where}: question ${i + 1} needs at least 2 options`);
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options?.length ?? 0))
        errors.push(`${where}: question ${i + 1} has an out-of-range answer index`);
    });
    return;
  }

  // ── code lessons: require the code fields ──
  for (const field of ["starterCode", "solution"] as const) {
    if (!lesson[field] || String(lesson[field]).trim() === "")
      errors.push(`${where}: empty "${field}"`);
  }
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

async function main() {
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
}

main();
