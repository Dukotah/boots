// Server-side grading for JS/TS lessons. Re-runs the student's code against the
// canonical tests in a Node `vm` context with a hard timeout, so XP is awarded
// only after the *server* confirms the solution — the client grader can no
// longer be bypassed.
//
// SECURITY NOTE: `node:vm` is an isolation *boundary*, not a hardened sandbox
// (a determined attacker can escape it). It's a solid first layer paired with a
// code-size cap + timeout + no host globals. For untrusted production traffic,
// run this behind a real sandbox (isolated-vm, or a Judge0/Firecracker worker).
import vm from "node:vm";
import { transform } from "sucrase";
import type { Lesson } from "./curriculum/types";

export type ServerTestResult = { name: string; pass: boolean; error?: string };
export type ServerGradeResult = { results: ServerTestResult[]; allPass: boolean };

const TEST_TIMEOUT_MS = 2000;

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timed out")), ms),
    ),
  ]);
}

async function runOne(
  code: string,
  test: { name: string; code: string },
): Promise<ServerTestResult> {
  const assertEquals = (actual: unknown, expected: unknown, msg?: string) => {
    if (stringify(actual) !== stringify(expected))
      throw new Error(msg ?? `Expected ${stringify(expected)} but got ${stringify(actual)}`);
  };
  const assert = (cond: unknown, msg?: string) => {
    if (!cond) throw new Error(msg ?? "Assertion failed");
  };

  // Fresh, minimal context: only the language built-ins (Object, Array, Promise,
  // JSON, Math…) plus the helpers we inject. No require/process/global leak in.
  const sandbox = {
    assertEquals,
    assert,
    console: { log() {}, info() {}, warn() {}, error() {} },
  };
  vm.createContext(sandbox);

  // Async IIFE so lessons may use `await`. The vm `timeout` guards synchronous
  // infinite loops; withTimeout adds a wall-clock guard for async ones.
  const src = `(async () => { "use strict";\n${code}\n;\n${test.code}\n})()`;
  try {
    const script = new vm.Script(src);
    const resultPromise = script.runInContext(sandbox, {
      timeout: TEST_TIMEOUT_MS,
    }) as Promise<unknown>;
    await withTimeout(Promise.resolve(resultPromise), TEST_TIMEOUT_MS + 500);
    return { name: test.name, pass: true };
  } catch (err) {
    return {
      name: test.name,
      pass: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function gradeJsOrTs(
  code: string,
  lesson: Lesson,
  language: "js" | "ts",
): Promise<ServerGradeResult> {
  const tests = lesson.tests ?? [];
  let js = code;
  if (language === "ts") {
    try {
      js = transform(code, { transforms: ["typescript"] }).code;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        allPass: false,
        results: tests.map((t) => ({
          name: t.name,
          pass: false,
          error: `TypeScript error: ${message}`,
        })),
      };
    }
  }

  const results: ServerTestResult[] = [];
  for (const t of tests) results.push(await runOne(js, t));
  return { results, allPass: results.every((r) => r.pass) };
}
