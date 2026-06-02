// A lightweight static "code review" for a JS/TS solution: cyclomatic
// complexity, nesting depth, function length, and a few style smells, distilled
// into a 0–100 clarity score, a letter grade, and actionable tips.
//
// This is a heuristic teaching aid, not a linter — it rewards simple, readable
// code and nudges away from common beginner smells. Pure (no DOM) so it's
// unit-testable in Node, and it parses with the same acorn we use elsewhere.

import { parse } from "acorn";

export type QualityMetrics = {
  loc: number; // non-blank lines
  functions: number;
  maxNesting: number; // deepest control-flow nesting
  complexity: number; // cyclomatic (1 + decision points)
  longestFunction: number; // lines in the longest function body
  varCount: number; // `var` declarations (prefer let/const)
};

export type QualityReport =
  | { ok: false; error: string }
  | {
      ok: true;
      metrics: QualityMetrics;
      score: number; // 0–100
      grade: "A" | "B" | "C" | "D";
      tips: string[];
    };

/* eslint-disable @typescript-eslint/no-explicit-any */
type Node = any;

// +1 to nesting depth when we enter one of these control structures.
const NESTING = new Set([
  "IfStatement",
  "ForStatement",
  "ForInStatement",
  "ForOfStatement",
  "WhileStatement",
  "DoWhileStatement",
  "SwitchStatement",
  "CatchClause",
]);

const FUNCTIONS = new Set([
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression",
]);

export function analyze(code: string, lang: "js" | "ts" = "js"): QualityReport {
  if (!code.trim()) return { ok: false, error: "Nothing to analyze yet." };

  let ast: Node;
  try {
    // We only do JS here; TS lessons are transpiled before grading elsewhere, so
    // for analysis we parse the JS-ish source leniently and bail out gracefully.
    ast = parse(code, { ecmaVersion: 2021, locations: true });
  } catch {
    return { ok: false, error: "Couldn't parse the code for analysis." };
  }
  void lang;

  let functions = 0;
  let complexity = 1;
  let maxNesting = 0;
  let longestFunction = 0;
  let varCount = 0;

  function visit(node: Node, depth: number) {
    if (!node || typeof node.type !== "string") return;

    // ── metrics ──
    if (FUNCTIONS.has(node.type)) {
      functions++;
      if (node.loc) {
        longestFunction = Math.max(
          longestFunction,
          node.loc.end.line - node.loc.start.line + 1,
        );
      }
    }
    if (node.type === "VariableDeclaration" && node.kind === "var") varCount++;

    // ── cyclomatic complexity: +1 per decision point ──
    if (
      node.type === "IfStatement" ||
      node.type === "ForStatement" ||
      node.type === "ForInStatement" ||
      node.type === "ForOfStatement" ||
      node.type === "WhileStatement" ||
      node.type === "DoWhileStatement" ||
      node.type === "ConditionalExpression" ||
      node.type === "CatchClause"
    ) {
      complexity++;
    }
    if (node.type === "SwitchCase" && node.test) complexity++;
    if (node.type === "LogicalExpression" && ["&&", "||", "??"].includes(node.operator)) {
      complexity++;
    }

    // ── nesting depth ──
    const childDepth = NESTING.has(node.type) ? depth + 1 : depth;
    if (NESTING.has(node.type)) maxNesting = Math.max(maxNesting, childDepth);

    for (const key of Object.keys(node)) {
      if (key === "loc" || key === "start" || key === "end") continue;
      const child = node[key];
      if (Array.isArray(child)) child.forEach((c) => visit(c, childDepth));
      else if (child && typeof child.type === "string") visit(child, childDepth);
    }
  }
  visit(ast, 0);

  const loc = code.split("\n").filter((l) => l.trim().length > 0).length;
  const metrics: QualityMetrics = {
    loc,
    functions,
    maxNesting,
    complexity,
    longestFunction,
    varCount,
  };

  // ── score + tips ──
  const tips: string[] = [];
  let score = 100;

  if (complexity > 10) {
    score -= 20;
    tips.push(
      `High cyclomatic complexity (${complexity}). Lots of branches make code hard to follow — try splitting logic into smaller functions.`,
    );
  } else if (complexity > 6) {
    score -= 8;
    tips.push(`Moderate complexity (${complexity}). Keep an eye on the number of branches.`);
  }

  if (maxNesting > 3) {
    score -= 15;
    tips.push(
      `Deep nesting (${maxNesting} levels). Early returns or guard clauses can flatten this out.`,
    );
  } else if (maxNesting === 3) {
    score -= 5;
  }

  if (longestFunction > 30) {
    score -= 12;
    tips.push(
      `Your longest function is ${longestFunction} lines. Smaller, single-purpose functions are easier to read and test.`,
    );
  }

  if (varCount > 0) {
    score -= Math.min(10, varCount * 4);
    tips.push(
      `Found ${varCount} \`var\` declaration${varCount > 1 ? "s" : ""}. Prefer \`const\` (or \`let\`) for clearer, block-scoped variables.`,
    );
  }

  score = Math.max(0, Math.min(100, score));
  const grade: "A" | "B" | "C" | "D" =
    score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "D";

  if (tips.length === 0) {
    tips.push("Clean and readable — nice work. No smells detected.");
  }

  return { ok: true, metrics, score, grade, tips };
}
