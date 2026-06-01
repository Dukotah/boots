import type { Module } from "./types";

// Functional Programming — pure functions, immutability, and composition. The
// mindset behind React, Redux, and modern JS. Auto-graded in-browser.
export const functional: Module = {
  slug: "functional",
  title: "Functional Programming",
  description:
    "Pure functions, immutability, and composition — the ideas behind React, Redux, and clean modern JavaScript. Write code that's predictable and easy to test.",
  emoji: "🪄",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Learn pure functions, immutability, compose, pipe, currying, and memoization in JavaScript.",
  lessons: [
    {
      slug: "no-mutation",
      title: "Don't Mutate — Return New",
      blurb: "Pure functions never change their inputs.",
      xp: 35,
      content: `# Don't Mutate — Return New

A **pure** function returns a new value and never modifies its arguments. Instead
of \`arr.push(x)\` (which mutates), build a new array with the spread operator.

\`\`\`js
const next = [...arr, x]; // arr is untouched
\`\`\`

## Your task
Write \`addItem(cart, item)\` that returns a **new** array with \`item\` appended.
The original \`cart\` must not change.`,
      starterCode: `function addItem(cart, item) {
  // return a NEW array with item appended (don't mutate cart)
}
`,
      solution: `function addItem(cart, item) {
  return [...cart, item];
}`,
      tests: [
        {
          name: "appends item",
          code: `assertEquals(addItem([1, 2], 3), [1, 2, 3]);`,
        },
        {
          name: "does not mutate input",
          code: `const c = [1, 2]; addItem(c, 3); assertEquals(c, [1, 2], "the original array must be unchanged");`,
        },
      ],
    },
    {
      slug: "immutable-update",
      title: "Immutable Updates",
      blurb: "Update objects without changing them.",
      xp: 40,
      content: `# Immutable Updates

The same idea for objects: spread the old one, then override the field. This is
exactly how React state updates work.

\`\`\`js
const next = { ...user, name: "New" };
\`\`\`

## Your task
Write \`updateField(obj, key, value)\` that returns a **new** object with \`key\`
set to \`value\`, leaving the original untouched.`,
      starterCode: `function updateField(obj, key, value) {
  // return a new object with key set to value
}
`,
      solution: `function updateField(obj, key, value) {
  return { ...obj, [key]: value };
}`,
      tests: [
        {
          name: "updates a field",
          code: `assertEquals(updateField({ a: 1, b: 2 }, "b", 9), { a: 1, b: 9 });`,
        },
        {
          name: "does not mutate input",
          code: `const o = { a: 1 }; updateField(o, "a", 5); assertEquals(o, { a: 1 });`,
        },
        {
          name: "can add a key",
          code: `assertEquals(updateField({ a: 1 }, "c", 3), { a: 1, c: 3 });`,
        },
      ],
    },
    {
      slug: "compose",
      title: "Compose Two Functions",
      blurb: "Run one function's output into another.",
      xp: 40,
      content: `# Compose Two Functions

**Composition** wires functions together. \`compose(f, g)\` produces a new
function that runs \`g\` first, then feeds its result into \`f\` — i.e.
\`f(g(x))\`, right to left (like math).

## Your task
Write \`compose(f, g)\` that returns a new function \`x => f(g(x))\`.`,
      starterCode: `function compose(f, g) {
  // return a function that applies g, then f
}
`,
      solution: `function compose(f, g) {
  return (x) => f(g(x));
}`,
      tests: [
        {
          name: "double then inc",
          code: `const inc = (n) => n + 1; const double = (n) => n * 2; assertEquals(compose(inc, double)(5), 11);`,
        },
        {
          name: "inc then double",
          code: `const inc = (n) => n + 1; const double = (n) => n * 2; assertEquals(compose(double, inc)(5), 12);`,
        },
      ],
    },
    {
      slug: "pipe",
      title: "Pipe",
      blurb: "Compose left-to-right, any number of steps.",
      xp: 45,
      content: `# Pipe

\`pipe\` is like compose but reads **left to right** and takes any number of
functions: \`pipe(a, b, c)(x)\` is \`c(b(a(x)))\`. \`reduce\` threads the value
through each function in turn.

## Your task
Write \`pipe(...fns)\` that returns a function running each fn left-to-right on the
input. With no functions, it returns the input unchanged.`,
      starterCode: `function pipe(...fns) {
  // return a function that threads its input through every fn, left to right
}
`,
      solution: `function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}`,
      tests: [
        {
          name: "two steps",
          code: `const inc = (n) => n + 1; const double = (n) => n * 2; assertEquals(pipe(inc, double)(5), 12);`,
        },
        {
          name: "three steps",
          code: `const inc = (n) => n + 1; const double = (n) => n * 2; assertEquals(pipe(double, inc, inc)(5), 12);`,
        },
        { name: "no functions → identity", code: `assertEquals(pipe()(7), 7);` },
      ],
    },
    {
      slug: "curry-add",
      title: "Currying",
      blurb: "One argument at a time.",
      xp: 45,
      content: `# Currying

A **curried** function takes its arguments one at a time, returning a new function
until it has them all. \`add(1)(2)(3)\` instead of \`add(1, 2, 3)\`. This enables
powerful partial application.

\`\`\`js
const add = (a) => (b) => (c) => a + b + c;
\`\`\`

## Your task
Write \`add(a)\` so that \`add(a)(b)(c)\` returns \`a + b + c\`.`,
      starterCode: `function add(a) {
  // return a function chain so add(a)(b)(c) === a + b + c
}
`,
      solution: `function add(a) {
  return (b) => (c) => a + b + c;
}`,
      tests: [
        { name: "add(1)(2)(3) === 6", code: `assertEquals(add(1)(2)(3), 6);` },
        { name: "zeros", code: `assertEquals(add(0)(0)(0), 0);` },
        { name: "negatives", code: `assertEquals(add(10)(-5)(5), 10);` },
      ],
    },
    {
      slug: "partial-application",
      title: "Partial Application",
      blurb: "Pre-fill some arguments now.",
      xp: 45,
      content: `# Partial Application

**Partial application** locks in some arguments up front and returns a function
waiting for the rest. Great for building specialized helpers from general ones.

\`\`\`js
const add5 = partial(add, 5);
add5(10); // 15
\`\`\`

## Your task
Write \`partial(fn, ...preset)\` that returns a function taking the remaining
arguments and calling \`fn\` with the preset args followed by the new ones.`,
      starterCode: `function partial(fn, ...preset) {
  // return a function that calls fn with preset args first, then the rest
}
`,
      solution: `function partial(fn, ...preset) {
  return (...rest) => fn(...preset, ...rest);
}`,
      tests: [
        {
          name: "pre-fills numbers",
          code: `const add3 = (a, b, c) => a + b + c; assertEquals(partial(add3, 2, 3)(10), 15);`,
        },
        {
          name: "pre-fills a greeting",
          code: `const greet = (g, name) => g + ", " + name + "!"; assertEquals(partial(greet, "Hi")("Boots"), "Hi, Boots!");`,
        },
      ],
    },
    {
      slug: "memoize",
      title: "Memoization",
      blurb: "Cache results of expensive calls.",
      xp: 50,
      content: `# Memoization

**Memoization** caches a function's result by its input, so repeat calls with the
same argument skip the work. The cache lives in a closure.

## Your task
Write \`memoize(fn)\` that returns a memoized version of \`fn\` (taking a single
argument). On repeated calls with the same argument, \`fn\` must run only once.`,
      starterCode: `function memoize(fn) {
  // return a function that caches results by its argument
}
`,
      solution: `function memoize(fn) {
  const cache = {};
  return (n) => {
    if (n in cache) return cache[n];
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}`,
      tests: [
        {
          name: "calls fn once per unique arg",
          code: `let calls = 0; const slow = (n) => { calls++; return n * 2; }; const fast = memoize(slow); assertEquals(fast(5), 10); assertEquals(fast(5), 10); assertEquals(calls, 1, "fn should run once for repeated args");`,
        },
        {
          name: "different args still work",
          code: `const m = memoize((n) => n + 1); assertEquals(m(1), 2); assertEquals(m(2), 3);`,
        },
      ],
    },
  ],
};
