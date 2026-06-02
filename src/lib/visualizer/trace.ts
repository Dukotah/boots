// A step-through execution tracer for a practical subset of JavaScript.
//
// Strategy: parse with acorn, then INSERT tiny probe calls into the source at
// statement boundaries (we never rewrite existing code, only splice in calls):
//   • `__line(n)`  before each statement in a block → records a step
//   • `__set(name, value)` after each declaration / simple assignment → records
//      the new value into the current call frame
//   • `__enter(fn, args)` + a try/finally `__exit()` wrapping each function body
//      → maintains the call stack across calls, recursion, returns, and throws
//
// The instrumented code runs in a `new Function` sandbox with our probe impls
// and a captured `console`. Values are serialized to display strings AT each
// step, so later mutations never retroactively change an earlier snapshot.
//
// This is intentionally engine-only (no DOM) so it can be unit-tested in Node.
// Known simplifications: only statements inside `{ }` blocks get their own step,
// and locals are tracked per call frame (block-level shadowing isn't modeled).

import { parse } from "acorn";

export type Frame = { fn: string; vars: Record<string, string> };
export type Step = { line: number; frames: Frame[]; stdout: string[] };
export type TraceResult = { steps: Step[]; error: string | null; truncated: boolean };

const MAX_STEPS = 4000; // guards against infinite loops

// ── value preview (frozen per step) ──────────────────────────────────────────
function preview(v: unknown, depth = 0): string {
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  const t = typeof v;
  if (t === "number" || t === "boolean" || t === "bigint") return String(v);
  if (t === "string") return JSON.stringify(v);
  if (t === "symbol") return String(v);
  if (t === "function") return `ƒ ${(v as () => void).name || "anonymous"}`;
  if (Array.isArray(v)) {
    if (depth > 1) return "[…]";
    const items = v.slice(0, 20).map((x) => preview(x, depth + 1));
    return `[${items.join(", ")}${v.length > 20 ? ", …" : ""}]`;
  }
  if (t === "object") {
    if (depth > 1) return "{…}";
    const o = v as Record<string, unknown>;
    const keys = Object.keys(o).slice(0, 20);
    const body = keys.map((k) => `${k}: ${preview(o[k], depth + 1)}`).join(", ");
    return `{${body}${Object.keys(o).length > 20 ? ", …" : ""}}`;
  }
  return String(v);
}

// ── AST helpers ───────────────────────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
type Node = any;

type Insertion = { pos: number; text: string; order: number };

function paramNames(params: Node[]): string[] {
  return params.filter((p) => p.type === "Identifier").map((p) => p.name);
}

/** The identifier name a simple assignment/declaration targets, if any. */
function assignTarget(node: Node): string | null {
  if (node.type === "Identifier") return node.name;
  // obj.k = … / arr[i] = … → record the (identifier) base so mutations show up.
  if (node.type === "MemberExpression" && node.object?.type === "Identifier") {
    return node.object.name;
  }
  return null;
}

function instrument(src: string): string {
  const ast: Node = parse(src, { ecmaVersion: 2021, locations: true });
  const ins: Insertion[] = [];
  let order = 0;
  const add = (pos: number, text: string) => ins.push({ pos, text, order: order++ });

  // Walk a statement list inside a `{ }` (or Program), adding line + value probes.
  function walkBody(body: Node[]) {
    for (const stmt of body) {
      const line = stmt.loc.start.line;
      add(stmt.start, `__line(${line});`);

      if (stmt.type === "VariableDeclaration") {
        for (const d of stmt.declarations) {
          if (d.id?.type === "Identifier") {
            add(stmt.end, `__set(${JSON.stringify(d.id.name)},${d.id.name},${line});`);
          }
        }
      } else if (
        stmt.type === "ExpressionStatement" &&
        stmt.expression?.type === "AssignmentExpression"
      ) {
        const name = assignTarget(stmt.expression.left);
        if (name) add(stmt.end, `__set(${JSON.stringify(name)},${name},${line});`);
      }

      walkNode(stmt);
    }
  }

  // Recurse into a node looking for nested blocks and function bodies.
  function walkNode(node: Node) {
    if (!node || typeof node.type !== "string") return;

    if (
      node.type === "FunctionDeclaration" ||
      node.type === "FunctionExpression" ||
      (node.type === "ArrowFunctionExpression" && node.body.type === "BlockStatement")
    ) {
      const fnName =
        node.id?.name || (node.type === "ArrowFunctionExpression" ? "arrow" : "anonymous");
      const args = paramNames(node.params);
      const argObj = `{${args.map((a) => `${JSON.stringify(a)}:${a}`).join(",")}}`;
      const body = node.body; // BlockStatement
      // After `{`: enter the frame and open a try so finally always pops it.
      add(body.start + 1, `__enter(${JSON.stringify(fnName)},${argObj});try{`);
      // Before `}`: close the try and pop the frame.
      add(body.end - 1, `}finally{__exit();}`);
      walkBody(body.body);
      return;
    }

    if (node.type === "BlockStatement") {
      walkBody(node.body);
      return;
    }

    // Descend into every child so we reach nested blocks/functions everywhere.
    for (const key of Object.keys(node)) {
      if (key === "loc" || key === "start" || key === "end") continue;
      const child = (node as Record<string, unknown>)[key];
      if (Array.isArray(child)) child.forEach((c) => walkNode(c));
      else if (child && typeof (child as Node).type === "string") walkNode(child);
    }
  }

  walkBody(ast.body);

  // A final snapshot so the last statement's effect (and any trailing output)
  // is visible — mirrors "stepping past" the last line in a debugger.
  const endLine = ast.body.length
    ? ast.body[ast.body.length - 1].loc.end.line
    : 1;
  add(src.length, `;__line(${endLine});`);

  // Apply insertions right-to-left so earlier positions stay valid.
  ins.sort((a, b) => b.pos - a.pos || b.order - a.order);
  let out = src;
  for (const { pos, text } of ins) out = out.slice(0, pos) + text + out.slice(pos);
  return out;
}

/**
 * Run `code` and return the ordered list of execution steps. Never throws:
 * syntax/runtime errors are returned in `error`, with any steps gathered so far.
 */
export function trace(code: string): TraceResult {
  const steps: Step[] = [];
  const stdout: string[] = [];
  const frames: { fn: string; vars: Record<string, unknown> }[] = [
    { fn: "(global)", vars: {} },
  ];
  let truncated = false;

  const snapshot = (line: number) => {
    if (steps.length >= MAX_STEPS) {
      truncated = true;
      throw new Error(`Stopped after ${MAX_STEPS} steps (possible infinite loop).`);
    }
    steps.push({
      line,
      frames: frames.map((f) => {
        const vars: Record<string, string> = {};
        for (const k of Object.keys(f.vars)) vars[k] = preview(f.vars[k]);
        return { fn: f.fn, vars };
      }),
      stdout: [...stdout],
    });
  };

  const probes = {
    __line: (line: number) => snapshot(line),
    __set: (name: string, value: unknown, line: number) => {
      frames[frames.length - 1].vars[name] = value;
      snapshot(line); // show the value change as its own step
    },
    __enter: (fn: string, args: Record<string, unknown>) => {
      frames.push({ fn, vars: { ...args } });
    },
    __exit: () => {
      if (frames.length > 1) frames.pop();
    },
    console: {
      log: (...a: unknown[]) => stdout.push(a.map((x) => preview(x)).join(" ")),
      info: (...a: unknown[]) => stdout.push(a.map((x) => preview(x)).join(" ")),
      warn: (...a: unknown[]) => stdout.push(a.map((x) => preview(x)).join(" ")),
      error: (...a: unknown[]) => stdout.push(a.map((x) => preview(x)).join(" ")),
    },
  };

  let instrumented: string;
  try {
    instrumented = instrument(code);
  } catch (e) {
    return {
      steps: [],
      error: `Syntax error: ${e instanceof Error ? e.message : String(e)}`,
      truncated: false,
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function(
      "__line",
      "__set",
      "__enter",
      "__exit",
      "console",
      `"use strict";\n${instrumented}`,
    );
    fn(probes.__line, probes.__set, probes.__enter, probes.__exit, probes.console);
  } catch (e) {
    if (truncated) return { steps, error: null, truncated: true };
    return {
      steps,
      error: e instanceof Error ? e.message : String(e),
      truncated: false,
    };
  }

  return { steps, error: null, truncated };
}
