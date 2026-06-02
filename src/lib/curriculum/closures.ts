import type { Module } from "./types";

// Closures & Higher-Order Functions — the superpower behind hooks, middleware,
// and clean functional JS. Auto-graded in-browser.
export const closures: Module = {
  slug: "closures",
  title: "Closures & Higher-Order Functions",
  description:
    "Functions that remember, functions that return functions. Closures power React hooks, middleware, and currying — master them and JavaScript clicks.",
  emoji: "🔒",
  gradient: "from-indigo-400/20 to-purple-500/10",
  tagline:
    "Learn JavaScript closures and higher-order functions: counters, factories, currying, once, and compose.",
  keywords: ["javascript closures", "higher order functions", "currying", "function factory"],
  lessons: [
    {
      slug: "make-counter",
      title: "A Counter that Remembers",
      blurb: "A closure keeps private state.",
      xp: 35,
      content: `# A Counter that Remembers

A **closure** is a function that "remembers" variables from where it was created,
even after that outer function has returned. That gives you private state.

\`\`\`js
function makeGreeter(greeting) {
  return (name) => greeting + ", " + name;
}
const hi = makeGreeter("Hi");
hi("Boots"); // "Hi, Boots"
\`\`\`

## Your task
Write \`makeCounter\` that returns a function. Each call to that returned function
increments a private count and returns the new value (starting at 1). Two
counters must be independent.`,
      starterCode: `function makeCounter() {
  // return a function that returns 1, then 2, then 3...
}
`,
      solution: `function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}`,
      tests: [
        {
          name: "counts up 1, 2, 3",
          code: `const c = makeCounter(); assertEquals(c(), 1); assertEquals(c(), 2); assertEquals(c(), 3);`,
        },
        {
          name: "counters are independent",
          code: `const a = makeCounter(); const b = makeCounter(); a(); a(); assertEquals(a(), 3); assertEquals(b(), 1);`,
        },
      ],
    },
    {
      slug: "adder-factory",
      title: "Function Factories",
      blurb: "Build specialized functions on demand.",
      xp: 35,
      content: `# Function Factories

A function that **returns a function** lets you bake in some arguments now and
supply the rest later (partial application).

\`\`\`js
const makeMultiplier = (factor) => (n) => n * factor;
const triple = makeMultiplier(3);
triple(5); // 15
\`\`\`

## Your task
Write \`makeAdder(x)\` that returns a function. The returned function takes \`y\`
and returns \`x + y\`.`,
      starterCode: `function makeAdder(x) {
  // return a function that adds x to its argument
}
`,
      solution: `function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}`,
      tests: [
        { name: "add5(3) === 8", code: `const add5 = makeAdder(5); assertEquals(add5(3), 8);` },
        { name: "makeAdder(10)(2) === 12", code: `assertEquals(makeAdder(10)(2), 12);` },
      ],
    },
    {
      slug: "once",
      title: "Run It Only Once",
      blurb: "Cache the first result forever.",
      xp: 40,
      content: `# Run It Only Once

A higher-order function takes a function as input. \`once\` wraps a function so it
only ever runs a single time — after that it returns the cached result. (Think:
initializing something exactly once.)

## Your task
Write \`once(fn)\` that returns a wrapped function. The first call runs \`fn\` and
remembers its result; every later call returns that same result **without**
calling \`fn\` again.`,
      starterCode: `function once(fn) {
  // return a function that only calls fn the first time
}
`,
      solution: `function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}`,
      tests: [
        {
          name: "only calls the inner fn once",
          code: `let calls = 0; const f = once(() => { calls += 1; return 42; }); assertEquals(f(), 42); assertEquals(f(), 42); assertEquals(calls, 1);`,
        },
      ],
    },
    {
      slug: "curry",
      title: "Currying",
      blurb: "One argument at a time.",
      xp: 40,
      content: `# Currying

A **curried** function takes its arguments one at a time, each call returning the
next function until all are supplied.

\`\`\`js
add(1)(2)(3); // 6
\`\`\`

## Your task
Write a curried \`add\` so that \`add(a)(b)(c)\` returns \`a + b + c\`.`,
      starterCode: `function add(a) {
  // return a function of b, that returns a function of c...
}
`,
      solution: `function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}`,
      tests: [
        { name: "add(1)(2)(3) === 6", code: `assertEquals(add(1)(2)(3), 6);` },
        { name: "add(10)(20)(30) === 60", code: `assertEquals(add(10)(20)(30), 60);` },
      ],
    },
    {
      slug: "compose",
      title: "Composing Functions",
      blurb: "Pipe output into the next function.",
      xp: 45,
      content: `# Composing Functions

**Composition** chains functions so the output of one feeds the next.
\`compose(f, g)(x)\` means "do \`g\` first, then \`f\`" — i.e. \`f(g(x))\`.

## Your task
Write \`compose(f, g)\` that returns a new function. Calling it with \`x\` returns
\`f(g(x))\`.`,
      starterCode: `function compose(f, g) {
  // return a function x => f(g(x))
}
`,
      solution: `function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}`,
      tests: [
        {
          name: "applies g then f",
          code: `const inc = (n) => n + 1; const dbl = (n) => n * 2; assertEquals(compose(inc, dbl)(5), 11);`,
        },
        {
          name: "order matters",
          code: `const inc = (n) => n + 1; const dbl = (n) => n * 2; assertEquals(compose(dbl, inc)(5), 12);`,
        },
      ],
    },
  ],
};
