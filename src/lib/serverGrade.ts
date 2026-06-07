// Server-side grading for JS/TS lessons. Re-runs the student's code against the
// canonical tests so XP is awarded only after the *server* confirms the solution
// — the client grader can no longer be bypassed.
//
// SECURITY: untrusted code is executed inside a dedicated `worker_thread` that is
// given an EMPTY environment (`env: {}`), so a vm escape cannot read service-role
// keys or any other secret from `process.env`, and is capped with `resourceLimits`
// so a memory bomb is killed instead of OOM-ing the function. Inside the worker we
// still run each test in a fresh `node:vm` context (no host globals) with a hard
// per-test timeout, and the main thread enforces a wall-clock cap by terminating
// the worker. Layers: empty-env worker → memory cap → fresh vm context → timeouts.
import { Worker } from "node:worker_threads";
import { transform } from "sucrase";
import type { Lesson } from "./curriculum/types";

export type ServerTestResult = { name: string; pass: boolean; error?: string };
export type ServerGradeResult = { results: ServerTestResult[]; allPass: boolean };

const TEST_TIMEOUT_MS = 2000;
// Overall wall-clock cap for the whole batch; the main thread terminates the
// worker if it blows past this (covers async loops the vm timeout can't catch).
const WORKER_WALL_MS = 6000;

// The worker runs as CommonJS (eval:true). It owns all execution of untrusted
// code; the main thread only feeds it transpiled JS + tests and reads results.
const WORKER_SRC = `
const { parentPort } = require('node:worker_threads');
const vm = require('node:vm');
const TEST_TIMEOUT_MS = ${TEST_TIMEOUT_MS};

function stringify(value) {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value); } catch { return String(value); }
}

async function runOne(code, test) {
  const assertEquals = (actual, expected, msg) => {
    if (stringify(actual) !== stringify(expected))
      throw new Error(msg || ('Expected ' + stringify(expected) + ' but got ' + stringify(actual)));
  };
  const assert = (cond, msg) => { if (!cond) throw new Error(msg || 'Assertion failed'); };

  // Fresh, minimal context: language built-ins + our helpers only. No require/
  // process/global leak in.
  const sandbox = { assertEquals, assert, console: { log() {}, info() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);

  const src = '(async () => { "use strict";\\n' + code + '\\n;\\n' + test.code + '\\n})()';
  try {
    const script = new vm.Script(src);
    const resultPromise = script.runInContext(sandbox, { timeout: TEST_TIMEOUT_MS });
    await Promise.race([
      Promise.resolve(resultPromise),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timed out')), TEST_TIMEOUT_MS + 500)),
    ]);
    return { name: test.name, pass: true };
  } catch (err) {
    return { name: test.name, pass: false, error: (err && err.message) ? err.message : String(err) };
  }
}

parentPort.on('message', async (payload) => {
  const { code, tests } = payload;
  const results = [];
  for (const t of tests) results.push(await runOne(code, t));
  parentPort.postMessage(results);
});
`;

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

  return new Promise<ServerGradeResult>((resolve) => {
    const failAll = (message: string) =>
      resolve({
        allPass: false,
        results: tests.map((t) => ({ name: t.name, pass: false, error: message })),
      });

    let settled = false;
    let worker: Worker;
    try {
      worker = new Worker(WORKER_SRC, {
        eval: true,
        env: {}, // no secrets reachable from inside the sandbox
        resourceLimits: {
          maxOldGenerationSizeMb: 64,
          maxYoungGenerationSizeMb: 16,
          stackSizeMb: 4,
        },
      });
    } catch (err) {
      return failAll(err instanceof Error ? err.message : "Sandbox unavailable");
    }

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      void worker.terminate();
      fn();
    };

    const timer = setTimeout(
      () => finish(() => failAll("Timed out — possible infinite loop?")),
      WORKER_WALL_MS,
    );

    worker.once("message", (results: ServerTestResult[]) =>
      finish(() =>
        resolve({ results, allPass: results.every((r) => r.pass) }),
      ),
    );
    worker.once("error", (err: Error) =>
      finish(() => failAll(err?.message || "Sandbox error")),
    );
    worker.once("exit", (code) => {
      if (code !== 0) finish(() => failAll("Sandbox terminated"));
    });

    worker.postMessage({ code: js, tests });
  });
}
