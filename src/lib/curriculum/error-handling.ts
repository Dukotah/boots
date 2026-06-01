import type { Module } from "./types";

// Error Handling — throwing, try/catch/finally, custom error classes, and the
// "result object" pattern. Auto-graded in-browser.
export const errorHandling: Module = {
  slug: "error-handling",
  title: "Error Handling",
  description:
    "Master JavaScript errors — throw when inputs are invalid, recover with try/catch/finally, and design custom error classes. Learn the patterns that keep real programs from crashing.",
  emoji: "🚨",
  gradient: "from-rose-400/20 to-red-500/10",
  tagline:
    "learn error handling in JavaScript: throw, try/catch, custom errors",
  keywords: [
    "javascript error handling",
    "try catch javascript",
    "throw error",
    "custom error class",
  ],
  lessons: [
    {
      slug: "throw-on-invalid",
      title: "Throw on Invalid Input",
      blurb: "Reject bad input by throwing an Error.",
      xp: 30,
      content: `# Throw on Invalid Input

When a function gets input it can't work with, the cleanest response is to
**throw** an \`Error\`. The string you pass becomes \`error.message\`.

\`\`\`js
function half(n) {
  if (typeof n !== "number") throw new Error("expected a number");
  return n / 2;
}
\`\`\`

## Your task
Write \`requirePositive(n)\` that returns \`n\` when it is greater than 0, and
otherwise throws \`new Error("must be positive")\`.`,
      starterCode: `function requirePositive(n) {
  // return n when n > 0, otherwise throw new Error("must be positive")
  return n;
}
`,
      solution: `function requirePositive(n) {
  if (n > 0) return n;
  throw new Error("must be positive");
}`,
      tests: [
        {
          name: "returns positive numbers unchanged",
          code: `assertEquals(requirePositive(5), 5);`,
        },
        {
          name: "throws on zero or negative",
          code: `let threw = false; let msg = ""; try { requirePositive(0); } catch (e) { threw = true; msg = e.message; } assert(threw, "should throw for 0"); assertEquals(msg, "must be positive");`,
        },
      ],
    },
    {
      slug: "try-catch-fallback",
      title: "Catch and Fall Back",
      blurb: "Use try/catch to return a safe default.",
      xp: 35,
      content: `# Catch and Fall Back

Wrap risky code in \`try\` and handle failures in \`catch\`. A common pattern is
to return a **fallback** value instead of letting the error escape.

\`\`\`js
function toNumber(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return 0;
  }
}
\`\`\`

## Your task
Write \`safeParse(text, fallback)\` that returns \`JSON.parse(text)\`, but returns
\`fallback\` if parsing throws.`,
      starterCode: `function safeParse(text, fallback) {
  // return JSON.parse(text), or fallback if it throws
  return JSON.parse(text);
}
`,
      solution: `function safeParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return fallback;
  }
}`,
      tests: [
        {
          name: "parses valid JSON",
          code: `assertEquals(safeParse('{"a":1}', null), { a: 1 });`,
        },
        {
          name: "returns fallback on bad JSON",
          code: `assertEquals(safeParse("not json", -1), -1);`,
        },
      ],
    },
    {
      slug: "finally-cleanup",
      title: "Always Run finally",
      blurb: "finally runs whether or not an error was thrown.",
      xp: 40,
      content: `# Always Run finally

A \`finally\` block runs no matter what — after a successful \`try\`, or after a
\`catch\`. It's perfect for cleanup that must always happen.

\`\`\`js
function read(fn) {
  try {
    return fn();
  } finally {
    console.log("done");
  }
}
\`\`\`

## Your task
Write \`attempt(fn, counter)\` where \`counter\` is an object with a numeric
\`calls\` field. Call \`fn()\` and return its result; if \`fn\` throws, return
\`null\`. Either way, increment \`counter.calls\` by 1 in a \`finally\` block.`,
      starterCode: `function attempt(fn, counter) {
  // call fn(), return its result or null on error,
  // and always do counter.calls++ in finally
  return fn();
}
`,
      solution: `function attempt(fn, counter) {
  try {
    return fn();
  } catch (e) {
    return null;
  } finally {
    counter.calls++;
  }
}`,
      tests: [
        {
          name: "returns result and counts the call",
          code: `const c = { calls: 0 }; const r = attempt(function () { return 42; }, c); assertEquals(r, 42); assertEquals(c.calls, 1);`,
        },
        {
          name: "returns null on throw but still counts",
          code: `const c = { calls: 0 }; const r = attempt(function () { throw new Error("boom"); }, c); assertEquals(r, null); assertEquals(c.calls, 1);`,
        },
      ],
    },
    {
      slug: "custom-error",
      title: "Custom Error Classes",
      blurb: "Subclass Error to label your failures.",
      xp: 45,
      content: `# Custom Error Classes

You can \`extend Error\` to create error types you can identify with
\`instanceof\`. Always set the \`name\` so logs read clearly.

\`\`\`js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
\`\`\`

## Your task
Define a class \`ValidationError\` that \`extends Error\`, sets \`this.name\` to
\`"ValidationError"\`, and keeps the message passed to it.`,
      starterCode: `class ValidationError extends Error {
  // set this.name to "ValidationError" in the constructor
}
`,
      solution: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}`,
      tests: [
        {
          name: "is an instance of Error and ValidationError",
          code: `const e = new ValidationError("bad"); assert(e instanceof Error, "should be an Error"); assert(e instanceof ValidationError, "should be a ValidationError");`,
        },
        {
          name: "has the right name and message",
          code: `const e = new ValidationError("bad"); assertEquals(e.name, "ValidationError"); assertEquals(e.message, "bad");`,
        },
      ],
    },
    {
      slug: "range-validation",
      title: "Validate a Range",
      blurb: "Throw a specific message when input is out of bounds.",
      xp: 45,
      content: `# Validate a Range

Good validation explains exactly what went wrong. Check the bounds and throw a
clear, specific message for each failure.

\`\`\`js
function setVolume(n) {
  if (n < 0) throw new Error("volume too low");
  if (n > 11) throw new Error("volume too high");
  return n;
}
\`\`\`

## Your task
Write \`parseAge(value)\`. Throw \`new Error("not a number")\` if \`value\` is not a
number, \`new Error("too young")\` if it is below 0, \`new Error("too old")\` if it
is above 130, otherwise return \`value\`.`,
      starterCode: `function parseAge(value) {
  // throw "not a number", "too young", or "too old"; else return value
  return value;
}
`,
      solution: `function parseAge(value) {
  if (typeof value !== "number") throw new Error("not a number");
  if (value < 0) throw new Error("too young");
  if (value > 130) throw new Error("too old");
  return value;
}`,
      tests: [
        {
          name: "returns valid ages",
          code: `assertEquals(parseAge(30), 30);`,
        },
        {
          name: "throws specific messages",
          code: `function msg(fn) { try { fn(); } catch (e) { return e.message; } return "no throw"; } assertEquals(msg(function () { return parseAge("x"); }), "not a number"); assertEquals(msg(function () { return parseAge(-1); }), "too young"); assertEquals(msg(function () { return parseAge(200); }), "too old");`,
        },
      ],
    },
    {
      slug: "safe-result",
      title: "The Result Object",
      blurb: "Return success/failure instead of throwing.",
      xp: 50,
      content: `# The Result Object

Instead of throwing across boundaries, many APIs return a **result object**:
\`{ ok: true, value }\` on success or \`{ ok: false, error }\` on failure. The
caller checks \`ok\` instead of writing try/catch everywhere.

\`\`\`js
function tryRun(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
\`\`\`

## Your task
Write \`safeDivide(a, b)\`. Return \`{ ok: true, value: a / b }\`, but if \`b\` is
\`0\` return \`{ ok: false, error: "divide by zero" }\`.`,
      starterCode: `function safeDivide(a, b) {
  // return { ok: true, value } or { ok: false, error: "divide by zero" }
  return { ok: true, value: a / b };
}
`,
      solution: `function safeDivide(a, b) {
  if (b === 0) return { ok: false, error: "divide by zero" };
  return { ok: true, value: a / b };
}`,
      tests: [
        {
          name: "returns ok result for valid division",
          code: `assertEquals(safeDivide(10, 2), { ok: true, value: 5 });`,
        },
        {
          name: "returns error result for divide by zero",
          code: `assertEquals(safeDivide(1, 0), { ok: false, error: "divide by zero" });`,
        },
      ],
    },
  ],
};
