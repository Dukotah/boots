// Sandboxed code runner. Runs entirely in a Web Worker (its own thread, no DOM
// access) so untrusted student code can't touch the page. Each test is compiled
// with `new Function` and a fake `console`, then executed.
//
// This is the "free, instant, zero-infra" execution path from the gameplan —
// good for any JS-based lesson. Compiled/other languages get a server sandbox
// (Judge0/WASM) later.

type TestCase = { name: string; code: string };
type IncomingMessage = { code: string; tests: TestCase[] };

export type TestResult = {
  name: string;
  pass: boolean;
  error?: string;
  logs: string[];
};

async function runOne(code: string, test: TestCase): Promise<TestResult> {
  const logs: string[] = [];

  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
    info: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
    warn: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
    error: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
  };

  const assertEquals = (actual: unknown, expected: unknown, msg?: string) => {
    const a = stringify(actual);
    const b = stringify(expected);
    if (a !== b) {
      throw new Error(msg ?? `Expected ${b} but got ${a}`);
    }
  };

  const assert = (cond: unknown, msg?: string) => {
    if (!cond) throw new Error(msg ?? "Assertion failed");
  };

  try {
    // Student code + test code share one scope, wrapped in an async IIFE so
    // tests can `await` Promises (async/await lessons). Awaiting a non-Promise
    // is a no-op, so synchronous lessons behave exactly as before.
    const fn = new Function(
      "console",
      "assertEquals",
      "assert",
      `"use strict";\nreturn (async () => {\n${code}\n;\n${test.code}\n})();`,
    );
    await fn(fakeConsole, assertEquals, assert);
    return { name: test.name, pass: true, logs };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { name: test.name, pass: false, error: message, logs };
  }
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

self.onmessage = async (e: MessageEvent<IncomingMessage>) => {
  const { code, tests } = e.data;
  const results: TestResult[] = [];
  for (const t of tests) results.push(await runOne(code, t));
  (self as unknown as Worker).postMessage({ results });
};
