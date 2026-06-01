import type { TestCase } from "./curriculum/types";
import type { TestResult } from "@/workers/codeRunner";

export type RunOutcome = {
  results: TestResult[];
  timedOut: boolean;
};

const TIMEOUT_MS = 4000;

// Spawns a fresh worker per run so a runaway loop can be terminated cleanly.
export function runCode(code: string, tests: TestCase[]): Promise<RunOutcome> {
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
