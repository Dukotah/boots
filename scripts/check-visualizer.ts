// Engine test for the step-through visualizer's tracer. The tracer is pure JS
// (no DOM), so we can exercise it in Node and assert on real traces. Run with:
//   npm run check:viz
import { trace } from "../src/lib/visualizer/trace.ts";

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    failures++;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// ── 1. straight-line variables + console ──
{
  const r = trace(`let a = 1;\nlet b = a + 2;\nconsole.log(a + b);`);
  check("no error on simple program", r.error === null, r.error ?? "");
  check("produces a step per line", r.steps.length >= 3, `got ${r.steps.length}`);
  const last = r.steps[r.steps.length - 1];
  const g = last.frames[0].vars;
  check("captures a=1", g.a === "1", g.a);
  check("captures b=3", g.b === "3", g.b);
  check("captures stdout 4", last.stdout.includes("4"), JSON.stringify(last.stdout));
}

// ── 2. loop updates a variable across iterations ──
{
  const r = trace(`let sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  sum = sum + i;\n}`);
  check("loop: no error", r.error === null, r.error ?? "");
  const sums = r.steps.map((s) => s.frames[0].vars.sum).filter(Boolean);
  check("loop: sum progresses through 1 and 3", sums.includes("1") && sums.includes("3"), sums.join(","));
  const final = r.steps[r.steps.length - 1].frames[0].vars.sum;
  check("loop: final sum = 6", final === "6", final);
}

// ── 3. function call pushes/pops a frame (call stack) ──
{
  const r = trace(`function double(n) {\n  return n * 2;\n}\nlet x = double(21);`);
  check("fn: no error", r.error === null, r.error ?? "");
  const maxDepth = Math.max(...r.steps.map((s) => s.frames.length));
  check("fn: call stack grows to 2 frames", maxDepth === 2, `maxDepth ${maxDepth}`);
  const insideDouble = r.steps.find((s) => s.frames.some((f) => f.fn === "double"));
  check("fn: param n=21 visible in frame", insideDouble?.frames.at(-1)?.vars.n === "21", insideDouble?.frames.at(-1)?.vars.n);
  check("fn: returns to one frame at end", r.steps[r.steps.length - 1].frames.length === 1);
  check("fn: x = 42", r.steps.at(-1)?.frames[0].vars.x === "42");
}

// ── 4. recursion (frames stack and unwind) ──
{
  const r = trace(`function fact(n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}\nlet f = fact(4);`);
  check("recursion: no error", r.error === null, r.error ?? "");
  const maxDepth = Math.max(...r.steps.map((s) => s.frames.length));
  check("recursion: stack deepens (>3 frames)", maxDepth >= 4, `maxDepth ${maxDepth}`);
  check("recursion: fact(4) = 24", r.steps.at(-1)?.frames[0].vars.f === "24");
}

// ── 5. runtime error is captured, not thrown ──
{
  const r = trace(`let x = 1;\nnull.foo;`);
  check("runtime error is reported", r.error !== null, "expected an error");
  check("runtime error keeps prior steps", r.steps.length >= 1, `got ${r.steps.length}`);
}

// ── 6. syntax error is reported cleanly ──
{
  const r = trace(`let x = ;`);
  check("syntax error reported", r.error !== null && r.error.startsWith("Syntax error"), r.error ?? "");
}

// ── 7. infinite loop is bounded ──
{
  const r = trace(`let i = 0;\nwhile (true) {\n  i = i + 1;\n}`);
  check("infinite loop is truncated, not hung", r.truncated === true);
}

// ── 8. object/array mutation shows updated value ──
{
  const r = trace(`let arr = [1, 2];\narr.push(3);\nlet obj = { n: 1 };\nobj.n = 9;`);
  check("array/object: no error", r.error === null, r.error ?? "");
  const v = r.steps.at(-1)?.frames[0].vars;
  check("array mutation reflected", v?.arr === "[1, 2, 3]", v?.arr);
  check("object mutation reflected", v?.obj === "{n: 9}", v?.obj);
}

if (failures) {
  console.log(`\n❌ visualizer: ${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\n✅ visualizer tracer OK — all checks passed.");
