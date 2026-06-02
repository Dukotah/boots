// Engine test for the code-quality analyzer (pure, no DOM). Run with:
//   npm run check:quality
import { analyze } from "../src/lib/quality/analyze.ts";

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// ── clean, simple code → grade A, no smells ──
{
  const r = analyze(`const double = (n) => n * 2;\nconst x = double(21);`);
  check("clean: ok", r.ok === true);
  if (r.ok) {
    check("clean: counts functions", r.metrics.functions === 1, String(r.metrics.functions));
    check("clean: low complexity", r.metrics.complexity === 1, String(r.metrics.complexity));
    check("clean: grade A", r.grade === "A", r.grade);
  }
}

// ── deeply nested + complex → lower grade + tips ──
{
  const messy = `function f(a, b) {
  if (a) {
    for (let i = 0; i < b; i++) {
      while (i < a) {
        if (i && b || a) {
          i++;
        }
      }
    }
  }
  return a;
}`;
  const r = analyze(messy);
  check("messy: ok", r.ok === true);
  if (r.ok) {
    check("messy: detects deep nesting (>=4)", r.metrics.maxNesting >= 4, String(r.metrics.maxNesting));
    check("messy: complexity counted", r.metrics.complexity >= 5, String(r.metrics.complexity));
    check("messy: grade below A", r.grade !== "A", r.grade);
    check("messy: produces tips", r.tips.length > 0, String(r.tips.length));
  }
}

// ── var usage is flagged ──
{
  const r = analyze(`var a = 1;\nvar b = 2;\nconst c = a + b;`);
  check("var: ok", r.ok === true);
  if (r.ok) {
    check("var: counts 2 vars", r.metrics.varCount === 2, String(r.metrics.varCount));
    check("var: tip mentions var", r.tips.some((t) => t.includes("var")), r.tips.join(" | "));
  }
}

// ── empty + syntax error handled ──
{
  check("empty: not ok", analyze("   ").ok === false);
  check("syntax error: not ok", analyze("const = ;").ok === false);
}

// ── score is bounded 0..100 ──
{
  const r = analyze(`function g(){ if(a){ if(b){ if(c){ if(d){ for(;;){ while(x){ var z=1; } } } } } } }`);
  if (r.ok) check("score bounded 0..100", r.score >= 0 && r.score <= 100, String(r.score));
}

if (failures) {
  console.log(`\n❌ quality: ${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\n✅ quality analyzer OK — all checks passed.");
