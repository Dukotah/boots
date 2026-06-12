import type { Module } from "./types";

// Closures & Higher-Order Functions — the superpower behind hooks, middleware,
// and clean functional JS. Auto-graded in-browser.
//
// Entry ramp note: this is the "I feel dumb" module, so the first three lessons
// are no-code reading/prediction quizzes that walk a counter closure step by
// step BEFORE the learner writes one. Every code lesson carries drag-in `blocks`
// and two-step `hintCode`. Lessons that used to fold two new ideas together
// (e.g. `once` = remember-a-result + rest-args + lazy-call) are preceded by a
// concept quiz so only ONE new idea lands per code task. The depth is unchanged
// — counters, factories, once, currying, and compose all stay — the on-ramp is
// just gentler so a learner arriving from Foundations doesn't hit a wall.
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
    // ── 1. Cold open: read a closure step by step (no code) ──
    {
      slug: "closure-cold-open",
      title: "A Function That Remembers 🔒",
      blurb: "Walk through a counter closure one step at a time — no typing yet.",
      xp: 15,
      kind: "quiz",
      content: `# A Function That Remembers 🔒

Closures are the classic "wait, why does this work?" topic. Good news: you don't
have to *write* one to *understand* one. Let's read a tiny example slowly, then
you'll answer a few questions before touching the editor.

Here is a function that builds a **counter**:

\`\`\`js
function makeCounter() {
  let count = 0;          // a private variable
  return function () {     // we hand back this inner function
    count = count + 1;     // it bumps the count...
    return count;          // ...and returns the new value
  };
}
\`\`\`

Now watch what happens when we use it:

\`\`\`js
const next = makeCounter(); // next is the inner function
next(); // 1
next(); // 2
next(); // 3
\`\`\`

The surprising part: \`makeCounter\` already **finished and returned** before we
ever called \`next()\`. And yet \`count\` is still alive — each call to \`next()\`
remembers the previous value and adds one.

That "the inner function still remembers \`count\`" is the whole idea of a
**closure**. Read the code above carefully, then answer below. 👇`,
      questions: [
        {
          prompt: "What does `makeCounter()` hand back?",
          options: [
            "the number 0",
            "an inner function (the one with `count = count + 1`)",
            "the variable `count` itself",
          ],
          answer: 1,
          explanation:
            "`return function () { ... }` hands back the *inner function*. The number isn't returned until you actually call that function.",
        },
        {
          prompt:
            "After `const next = makeCounter();`, what does the very first `next()` return?",
          options: ["0", "1", "undefined"],
          answer: 1,
          explanation:
            "`count` starts at 0, the call bumps it to 1, then returns 1. The next call makes it 2, and so on.",
        },
        {
          prompt:
            "Why can `next()` still use `count` even though `makeCounter` already returned?",
          options: [
            "Because the inner function kept a live link to the variables where it was created — that's a closure",
            "Because `count` is a global variable",
            "Because JavaScript re-runs `makeCounter` on every call",
          ],
          answer: 0,
          explanation:
            "A closure is a function bundled with the variables it was born next to. Those variables stay alive as long as the inner function does.",
        },
      ],
    },

    // ── 2. Concept: private + independent state (no code) ──
    {
      slug: "two-counters",
      title: "Two Counters, Two Memories 🧠",
      blurb: "Each closure gets its own private copy of the variables.",
      xp: 15,
      kind: "quiz",
      content: `# Two Counters, Two Memories 🧠

Here's the part people miss the first time. Every time you *call*
\`makeCounter()\`, it runs again and makes a **brand-new** \`count\`. So two
counters don't share — they each remember their own number.

\`\`\`js
function makeCounter() {
  let count = 0;
  return function () {
    count = count + 1;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();

a(); // 1
a(); // 2
b(); // 1   ← b has its OWN count, untouched by a
\`\`\`

Because \`a\` and \`b\` came from two separate calls, they hold two separate
\`count\` boxes. \`a\` is at 2; \`b\` is still on its very first step.

This is exactly why closures are used for **private state** — the \`count\` lives
*inside* the function and nothing outside can reach it or mix it up. Read it,
then predict the outputs below. 👇`,
      questions: [
        {
          prompt:
            "After `a()` twice and `b()` once (code above), what has `b()` returned so far?",
          options: ["1", "2", "3"],
          answer: 0,
          explanation:
            "`b` came from its own `makeCounter()` call, so its `count` started fresh. One call → 1.",
        },
        {
          prompt: "Can code *outside* the counter read or change `count` directly?",
          options: [
            "No — `count` only exists inside, which is why this gives private state",
            "Yes — `count` is global, anyone can change it",
            "Only if you use `===`",
          ],
          answer: 0,
          explanation:
            "`count` is trapped inside the closure. The only way to touch it is through the inner function — that privacy is the feature.",
        },
        {
          prompt: "What makes `a` and `b` independent of each other?",
          options: [
            "Each call to `makeCounter()` creates a new, separate `count`",
            "They secretly share one `count`",
            "JavaScript copies `a` into `b`",
          ],
          answer: 0,
          explanation:
            "Two calls = two runs of the function body = two separate `count` variables. Separate memories.",
        },
      ],
    },

    // ── 3. First code task: fill in the counter (max scaffold) ──
    {
      slug: "make-counter",
      title: "A Counter that Remembers",
      blurb: "Write the closure you just read about.",
      xp: 30,
      content: `# A Counter that Remembers

You just read this counter twice — now you'll write it. We've left the shape in
place; you fill in the two lines that do the remembering. Drag the blocks in
order, or tap the hint to fill it in step by step.

The plan (same as the lessons above):
1. Make a private \`count\`, starting at 0.
2. Return an inner function that adds 1 to \`count\` and returns the new value.

\`\`\`js
let count = 0;
return function () {
  count = count + 1;
  return count;
};
\`\`\`

## Your task
Write \`makeCounter\` so each call to the returned function increments a private
count and returns the new value (starting at 1). Two counters must be
independent.`,
      starterCode: `function makeCounter() {
  // 1. make a private count starting at 0
  // 2. return a function that does count + 1 and returns it
}
`,
      blocks: [
        "let count = 0;",
        "return function () {",
        "count = count + 1;",
        "return count;",
        "};",
      ],
      solution: `function makeCounter() {
  let count = 0;
  return function () {
    count = count + 1;
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
      hints: [
        "Start with the private box: `let count = 0;` at the top of `makeCounter`.",
        "Now `return function () { ... }` that does `count = count + 1;` then `return count;`.",
      ],
      hintCode: [
        `function makeCounter() {\n  let count = 0;\n  // now return an inner function that bumps count and returns it\n}\n`,
        `function makeCounter() {\n  let count = 0;\n  return function () {\n    count = count + 1;\n    return count;\n  };\n}\n`,
      ],
      explanation:
        "🔒 That's a closure! The inner function kept a live link to `count`, so it remembers across calls — and each `makeCounter()` makes its own private `count`.",
    },

    // ── 4. Concept: a function that returns a function (no code) ──
    {
      slug: "returns-a-function",
      title: "Functions That Return Functions 🏭",
      blurb: "Bake in an argument now, use it later.",
      xp: 15,
      kind: "quiz",
      content: `# Functions That Return Functions 🏭

A counter remembers a variable it *made* itself. The next move: remember an
**argument you passed in**. That gives you a *function factory* — a function
that builds specialized functions on demand.

\`\`\`js
function makeMultiplier(factor) {
  return function (n) {
    return n * factor;   // remembers the factor we passed in
  };
}

const triple = makeMultiplier(3); // factor is now baked in as 3
triple(5); // 15
triple(10); // 30
\`\`\`

\`makeMultiplier(3)\` returns a function that has \`factor = 3\` locked inside it
(another closure!). Later, \`triple(5)\` uses that remembered \`3\` to compute
\`5 * 3\`.

This pattern — "supply some arguments now, the rest later" — is called **partial
application**, and you'll write one next. Read it, then answer below. 👇`,
      questions: [
        {
          prompt: "After `const triple = makeMultiplier(3);`, what is baked into `triple`?",
          options: [
            "`factor` is remembered as 3",
            "nothing — `triple` is empty",
            "the number 5",
          ],
          answer: 0,
          explanation:
            "`makeMultiplier(3)` returns an inner function that closes over `factor = 3`. That value is locked in.",
        },
        {
          prompt: "What does `triple(10)` return?",
          options: ["13", "30", "10"],
          answer: 1,
          explanation: "`n * factor` → `10 * 3` → 30. The factor came from the closure.",
        },
        {
          prompt: "“Partial application” means:",
          options: [
            "supply some arguments now and the rest later",
            "only run a function halfway",
            "apply to a job",
          ],
          answer: 0,
          explanation:
            "You fix one argument (the factor) up front, and pass the rest (`n`) when you actually call the built function.",
        },
      ],
    },

    // ── 5. Code task: build a function factory (scaffolded) ──
    {
      slug: "adder-factory",
      title: "Function Factories",
      blurb: "Build specialized functions on demand.",
      xp: 35,
      content: `# Function Factories

Same shape as the multiplier you just read — only with \`+\` instead of \`*\`.
\`makeAdder(x)\` should remember \`x\`, then add it to whatever you pass later.

\`\`\`js
return function (y) {
  return x + y;   // x is remembered from the outer call
};
\`\`\`

## Your task
Write \`makeAdder(x)\` that returns a function. The returned function takes \`y\`
and returns \`x + y\`.`,
      starterCode: `function makeAdder(x) {
  // return a function of y that returns x + y
}
`,
      blocks: ["return function (y) {", "return x + y;", "};"],
      solution: `function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}`,
      tests: [
        { name: "add5(3) === 8", code: `const add5 = makeAdder(5); assertEquals(add5(3), 8);` },
        { name: "makeAdder(10)(2) === 12", code: `assertEquals(makeAdder(10)(2), 12);` },
      ],
      hints: [
        "Don't add right away — `return function (y) { ... }` first.",
        "Inside that inner function, `return x + y;`. The `x` is remembered from `makeAdder`.",
      ],
      hintCode: [
        `function makeAdder(x) {\n  return function (y) {\n    // add x and y here\n  };\n}\n`,
        `function makeAdder(x) {\n  return function (y) {\n    return x + y;\n  };\n}\n`,
      ],
      explanation:
        "🏭 You built a factory! `makeAdder(5)` bakes `x = 5` into a closure, and `add5(3)` uses that remembered 5 to compute 8.",
    },

    // ── 6. Concept: higher-order fn + remembering a result (no code) ──
    {
      slug: "remember-a-result",
      title: "Remembering a Result 🗃️",
      blurb: "A function can take another function in — and cache its answer.",
      xp: 15,
      kind: "quiz",
      content: `# Remembering a Result 🗃️

So far we've remembered *numbers*. Closures can remember anything — including
**whether something has happened yet** and **what answer it gave**.

A **higher-order function** is just a function that takes another function as an
argument. Here's one called \`once\`: it wraps a function so it only ever runs a
single time. After the first call, it hands back the saved result without
running again.

\`\`\`js
function once(fn) {
  let called = false;   // remember: have we run yet?
  let result;           // remember: what did fn return?
  return function () {
    if (!called) {
      called = true;
      result = fn();    // run it the FIRST time only
    }
    return result;      // every later call returns the saved result
  };
}
\`\`\`

Two private variables do the remembering: \`called\` (a true/false flag) and
\`result\` (the saved answer). Read it, then predict what happens below. 👇`,
      questions: [
        {
          prompt: "What is the job of the `called` variable?",
          options: [
            "to remember whether `fn` has already run",
            "to count how many arguments there are",
            "to store the function's name",
          ],
          answer: 0,
          explanation:
            "`called` is a flag. It starts false; the first call flips it to true so `fn` never runs a second time.",
        },
        {
          prompt:
            "Suppose `fn` returns 42 the first time. On the SECOND call to the wrapped function, `fn` is…",
          options: [
            "not run at all — the saved 42 is returned",
            "run again, returning 42",
            "run again, returning undefined",
          ],
          answer: 0,
          explanation:
            "After the first call, `called` is true, so the `if` is skipped. We just return the remembered `result` (42).",
        },
        {
          prompt: "A “higher-order function” is one that:",
          options: [
            "takes a function as an argument (or returns one)",
            "uses big numbers",
            "must be written in capital letters",
          ],
          answer: 0,
          explanation:
            "`once` takes `fn` (a function) as input — that's what makes it higher-order.",
        },
      ],
    },

    // ── 7. Code task: once (scaffolded). Rest-args broken out below. ──
    {
      slug: "once",
      title: "Run It Only Once",
      blurb: "Cache the first result forever.",
      xp: 40,
      content: `# Run It Only Once

Time to write the \`once\` you just read. Use two private variables — a \`called\`
flag and a saved \`result\` — to remember what happened.

\`\`\`js
let called = false;
let result;
return function () {
  if (!called) {
    called = true;
    result = fn();
  }
  return result;
};
\`\`\`

## Your task
Write \`once(fn)\` that returns a wrapped function. The first call runs \`fn\` and
remembers its result; every later call returns that same result **without**
calling \`fn\` again.`,
      starterCode: `function once(fn) {
  // 1. a "called" flag (starts false) and a "result" box
  // 2. return a function that runs fn only the first time
}
`,
      blocks: [
        "let called = false;",
        "let result;",
        "return function () {",
        "if (!called) {",
        "called = true;",
        "result = fn();",
        "}",
        "return result;",
        "};",
      ],
      solution: `function once(fn) {
  let called = false;
  let result;
  return function () {
    if (!called) {
      called = true;
      result = fn();
    }
    return result;
  };
}`,
      tests: [
        {
          name: "only calls the inner fn once",
          code: `let calls = 0; const f = once(() => { calls += 1; return 42; }); assertEquals(f(), 42); assertEquals(f(), 42); assertEquals(calls, 1);`,
        },
        {
          name: "later calls return the cached result",
          code: `let n = 0; const g = once(() => ++n); assertEquals(g(), 1); assertEquals(g(), 1); assertEquals(g(), 1);`,
        },
      ],
      hints: [
        "Two memories first: `let called = false;` and `let result;`.",
        "Return a function. Inside it: `if (!called) { called = true; result = fn(); }` then `return result;`.",
      ],
      hintCode: [
        `function once(fn) {\n  let called = false;\n  let result;\n  // now return a function that runs fn only when !called\n}\n`,
        `function once(fn) {\n  let called = false;\n  let result;\n  return function () {\n    if (!called) {\n      called = true;\n      result = fn();\n    }\n    return result;\n  };\n}\n`,
      ],
      explanation:
        "🗃️ The closure remembers two things across calls: the `called` flag and the saved `result`. After the first run, `fn` is skipped forever and you get the cached answer.",
    },

    // ── 8. Concept: passing arguments through a wrapper (no code) ──
    {
      slug: "passing-args-through",
      title: "Passing Arguments Through ➡️",
      blurb: "Collect any arguments with `...args` and forward them.",
      xp: 15,
      kind: "quiz",
      content: `# Passing Arguments Through ➡️

Our \`once\` ignored arguments. Often a wrapper needs to **forward** whatever
arguments it's given to the inner function. JavaScript has a clean tool for
"however many arguments there are": the **rest parameter** \`...args\`.

\`\`\`js
function logThenCall(fn) {
  return function (...args) {   // collect ALL arguments into an array
    return fn(...args);          // spread them back out into fn
  };
}

const add = (a, b) => a + b;
const wrapped = logThenCall(add);
wrapped(2, 3); // 5  — the 2 and 3 passed straight through
\`\`\`

\`...args\` in the **parameter list** *gathers* every argument into an array.
\`...args\` in the **call** *spreads* that array back into separate arguments. Same
three dots, opposite jobs depending on where they sit.

You'll use this in the next code task to make a curried adder. Read it, then
answer below. 👇`,
      questions: [
        {
          prompt: "In `function (...args) { ... }`, what does `...args` do?",
          options: [
            "gathers every argument into an array called `args`",
            "deletes the arguments",
            "limits the function to one argument",
          ],
          answer: 0,
          explanation:
            "As a parameter, `...args` is the *rest* operator — it collects all the passed arguments into one array.",
        },
        {
          prompt: "In the call `fn(...args)`, the three dots now…",
          options: [
            "spread the array back out into separate arguments",
            "turn the array into a string",
            "do nothing",
          ],
          answer: 0,
          explanation:
            "In a call position, `...args` *spreads* the array items back into individual arguments for `fn`.",
        },
        {
          prompt: "What does `wrapped(2, 3)` return in the example?",
          options: ["5", "[2, 3]", "undefined"],
          answer: 0,
          explanation:
            "The args 2 and 3 are gathered, then spread into `add(2, 3)`, which returns 5.",
        },
      ],
    },

    // ── 9. Code task: currying (one new idea: nest the closures) ──
    {
      slug: "curry",
      title: "Currying",
      blurb: "One argument at a time.",
      xp: 40,
      content: `# Currying

A **curried** function takes its arguments one at a time. Each call returns the
*next* function, which remembers the earlier arguments (closures again!), until
all are supplied and you get the answer.

\`\`\`js
add(1)(2)(3); // 6
\`\`\`

Read that as three calls in a row:
- \`add(1)\` returns a function that remembers \`a = 1\`
- \`...(2)\` returns a function that remembers \`a = 1, b = 2\`
- \`...(3)\` now has all three, so it returns \`1 + 2 + 3\`

\`\`\`js
return function (b) {
  return function (c) {
    return a + b + c;
  };
};
\`\`\`

## Your task
Write a curried \`add\` so that \`add(a)(b)(c)\` returns \`a + b + c\`.`,
      starterCode: `function add(a) {
  // return a function of b, which returns a function of c, which returns a + b + c
}
`,
      blocks: [
        "return function (b) {",
        "return function (c) {",
        "return a + b + c;",
        "};",
        "};",
      ],
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
      hints: [
        "`add(a)` shouldn't add yet — it should `return function (b) { ... }`.",
        "Nest one more: inside that, `return function (c) { return a + b + c; };`. The inner function remembers `a` and `b`.",
      ],
      hintCode: [
        `function add(a) {\n  return function (b) {\n    // return one more function of c\n  };\n}\n`,
        `function add(a) {\n  return function (b) {\n    return function (c) {\n      return a + b + c;\n    };\n  };\n}\n`,
      ],
      explanation:
        "🎯 Each layer is a closure that remembers the argument from the layer above. By the third call, the innermost function can see `a`, `b`, and `c` all at once.",
    },

    // ── 10. Code task: compose (capstone, scaffolded) ──
    {
      slug: "compose",
      title: "Composing Functions",
      blurb: "Pipe output into the next function.",
      xp: 45,
      content: `# Composing Functions

**Composition** chains functions so the output of one feeds the next.
\`compose(f, g)(x)\` means "do \`g\` first, then \`f\`" — i.e. \`f(g(x))\`.

\`compose\` is higher-order *and* returns a closure: the returned function
remembers both \`f\` and \`g\`.

\`\`\`js
return function (x) {
  return f(g(x));   // g runs first, then f
};
\`\`\`

## Your task
Write \`compose(f, g)\` that returns a new function. Calling it with \`x\` returns
\`f(g(x))\`.`,
      starterCode: `function compose(f, g) {
  // return a function x => f(g(x))
}
`,
      blocks: ["return function (x) {", "return f(g(x));", "};"],
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
      hints: [
        "Return a function of `x` — don't call `f` or `g` at the top level.",
        "Inside it, the inner call goes first: `return f(g(x));`. `g` runs, then `f` wraps its result.",
      ],
      hintCode: [
        `function compose(f, g) {\n  return function (x) {\n    // call g first, then f\n  };\n}\n`,
        `function compose(f, g) {\n  return function (x) {\n    return f(g(x));\n  };\n}\n`,
      ],
      explanation:
        "🔗 `compose(inc, dbl)(5)` runs `dbl(5)` → 10, then `inc(10)` → 11. The returned closure remembers both `f` and `g` so it can pipe one into the other.",
    },
  ],
};
