// Verifies that every lesson's reference `solution` passes its own `tests`,
// using the same grading logic as the in-browser worker. Run with:
//   node --experimental-strip-types scripts/check-curriculum.ts
// NB: import module files directly (with .ts extensions) so this runs under
// Node's type-stripping without a bundler. The app itself uses the registry in
// src/lib/curriculum/index.ts.
import { javascript } from "../src/lib/curriculum/javascript.ts";
import { aiLlms } from "../src/lib/curriculum/ai-llms.ts";

const MODULES = [javascript, aiLlms];

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function runOne(code: string, test: { name: string; code: string }): void {
  const assertEquals = (a: unknown, b: unknown, m?: string) => {
    if (stringify(a) !== stringify(b))
      throw new Error(m ?? `Expected ${stringify(b)} but got ${stringify(a)}`);
  };
  const assert = (c: unknown, m?: string) => {
    if (!c) throw new Error(m ?? "Assertion failed");
  };
  const fakeConsole = { log() {}, info() {}, warn() {}, error() {} };
  const fn = new Function(
    "console",
    "assertEquals",
    "assert",
    `"use strict";\n${code}\n;\n${test.code}`,
  );
  fn(fakeConsole, assertEquals, assert);
}

let pass = 0;
let fail = 0;
for (const mod of MODULES) {
  for (const lesson of mod.lessons) {
    for (const t of lesson.tests) {
      try {
        runOne(lesson.solution, t);
        pass++;
      } catch (e) {
        fail++;
        console.log(
          `FAIL ${mod.slug}/${lesson.slug} :: ${t.name} :: ${(e as Error).message}`,
        );
      }
    }
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
