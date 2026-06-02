import type { TestCase } from "./curriculum/types";
import type { RunOutcome } from "./runner";

// HTML/CSS runtime. Unlike the JS/Python/SQL runners (which execute code), this
// one *renders* the student's markup in a hidden, sandboxed <iframe> and grades
// by inspecting the resulting DOM and computed styles.
//
// The iframe uses sandbox="allow-same-origin" but deliberately omits
// allow-scripts: student <script> tags never execute, so this is safe for
// untrusted markup and is purely about HTML structure + CSS computed styles.
const TIMEOUT_MS = 4000;

export function runHtml(code: string, tests: TestCase[]): Promise<RunOutcome> {
  return new Promise((resolve) => {
    // Same-origin (so we can read contentDocument), but no scripts.
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-same-origin");
    iframe.style.position = "fixed";
    iframe.style.width = "800px";
    iframe.style.height = "600px";
    iframe.style.left = "-99999px";
    iframe.style.top = "0";
    iframe.style.opacity = "0";
    iframe.style.border = "0";
    iframe.setAttribute("aria-hidden", "true");

    let settled = false;
    const cleanup = () => {
      try {
        iframe.remove();
      } catch {
        /* already gone */
      }
    };

    const finish = (outcome: RunOutcome) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        resolve(outcome);
      } finally {
        cleanup();
      }
    };

    // Safety net: if onload never fires (or a render hangs), fail every test.
    const timer = setTimeout(() => {
      finish({
        timedOut: true,
        results: tests.map((t) => ({
          name: t.name,
          pass: false,
          error: "Timed out — your page didn't finish rendering.",
          logs: [],
        })),
      });
    }, TIMEOUT_MS);

    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) {
          finish({
            timedOut: false,
            results: tests.map((t) => ({
              name: t.name,
              pass: false,
              error: "Couldn't read the rendered page.",
              logs: [],
            })),
          });
          return;
        }

        const assert = (cond: unknown, msg?: string) => {
          if (!cond) throw new Error(msg ?? "Assertion failed");
        };
        const assertEquals = (actual: unknown, expected: unknown, msg?: string) => {
          const a = stringify(actual);
          const b = stringify(expected);
          if (a !== b) {
            throw new Error(msg ?? `Expected ${b} but got ${a}`);
          }
        };
        // Resolve a selector (or element) to its computed style, or null.
        const css = (selOrEl: unknown): CSSStyleDeclaration | null => {
          const el =
            typeof selOrEl === "string"
              ? doc.querySelector(selOrEl)
              : (selOrEl as Element | null);
          return el ? iframe.contentWindow!.getComputedStyle(el) : null;
        };

        const results = tests.map((test) => {
          try {
            const fn = new Function(
              "doc",
              "css",
              "assert",
              "assertEquals",
              `"use strict";\n${test.code}`,
            );
            fn(doc, css, assert, assertEquals);
            return { name: test.name, pass: true, logs: [] as string[] };
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return { name: test.name, pass: false, error: message, logs: [] as string[] };
          }
        });

        finish({ results, timedOut: false });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        finish({
          timedOut: false,
          results: tests.map((t) => ({
            name: t.name,
            pass: false,
            error: message,
            logs: [],
          })),
        });
      }
    };

    document.body.appendChild(iframe);
    // Render the student's markup. srcdoc triggers `onload` once parsed.
    iframe.srcdoc = code;
  });
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
