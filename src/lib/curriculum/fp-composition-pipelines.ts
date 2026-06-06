import type { Module } from "./types";

// Function Composition & Pipelines — pipe, compose, point-free style, and
// real-world JS data pipelines. Auto-graded in-browser via Web Worker.
export const fpCompositionPipelines: Module = {
  slug: "fp-composition-pipelines",
  title: "Function Composition & Pipelines",
  description:
    "Learn to build elegant data pipelines using pipe and compose, write point-free functions, and chain transformations the way real-world FP JavaScript works — skills no free platform teaches end-to-end.",
  emoji: "🔗",
  gradient: "from-violet-400/20 to-fuchsia-500/10",
  tagline:
    "Master pipe, compose, and point-free style to write clean, reusable JavaScript data pipelines.",
  keywords: [
    "function composition javascript",
    "pipe compose js",
    "point-free style",
    "functional programming javascript",
    "data pipelines javascript",
  ],
  language: "js",
  lessons: [
    // ─── Lesson 1: What is function composition? ───────────────────────────
    {
      slug: "what-is-composition",
      title: "What Is Function Composition?",
      blurb: "Combine two functions into one clean transformation.",
      xp: 20,
      content: `# What Is Function Composition?

**Function composition** means taking two (or more) functions and combining them
so the output of one feeds directly into the input of the next.

In math this is written as \`(f ∘ g)(x) = f(g(x))\`.  In JavaScript:

\`\`\`js
const double = (x) => x * 2;
const addOne = (x) => x + 1;

// Manual composition: addOne runs first, then double
const doubleAfterAddOne = (x) => double(addOne(x));
doubleAfterAddOne(3); // double(4) → 8
\`\`\`

The key insight: **each function does one thing**, and composition wires them
together without extra variables or mutation.

## Your task

Write a function \`compose2(f, g)\` that returns a **new function** which applies
\`g\` first, then passes the result to \`f\`.

\`compose2(f, g)(x)\` should equal \`f(g(x))\`.`,
      starterCode: `function compose2(f, g) {
  // return a new function that applies g first, then f
}
`,
      solution: `function compose2(f, g) {
  return (x) => f(g(x));
}`,
      tests: [
        {
          name: "applies g then f",
          code: `const double = (x) => x * 2;
const addOne = (x) => x + 1;
assertEquals(compose2(double, addOne)(3), 8);`,
        },
        {
          name: "order matters: f runs second",
          code: `const double = (x) => x * 2;
const addOne = (x) => x + 1;
assertEquals(compose2(addOne, double)(3), 7);`,
        },
        {
          name: "works with string transforms",
          code: `const trim = (s) => s.trim();
const upper = (s) => s.toUpperCase();
assertEquals(compose2(upper, trim)("  hello  "), "HELLO");`,
        },
      ],
      hints: [
        "The result of compose2 is itself a function — use an arrow function.",
        "Inside that arrow function, call g(x) first, then pass that result to f.",
      ],
      explanation: `\`compose2\` is just a function factory.  It captures \`f\` and \`g\` in a
closure and returns \`(x) => f(g(x))\`.  This is the mathematical definition of
composition: right-to-left, \`g\` first.`,
    },

    // ─── Lesson 2: pipe — left-to-right composition ────────────────────────
    {
      slug: "pipe",
      title: "pipe — Left-to-Right Pipelines",
      blurb: "Wire functions left-to-right, the way data naturally flows.",
      xp: 30,
      content: `# pipe — Left-to-Right Pipelines

\`compose\` applies functions **right-to-left**, which matches math notation but
reads backwards.  \`pipe\` flips that: functions run **left-to-right**, which reads
like a Unix pipe or assembly line.

\`\`\`js
// With compose: last function in the list runs first — confusing to read
compose(double, addOne)(5); // addOne(5) → 6, double(6) → 12

// With pipe: first function in the list runs first — natural reading order
pipe(addOne, double)(5);   // addOne(5) → 6, double(6) → 12
\`\`\`

Both produce the same result here — the difference is just **reading order**.
\`pipe\` tends to be more popular in day-to-day JS because it reads like a
sentence: "start with x, then addOne, then double."

## Your task

Write \`pipe(...fns)\` that accepts **any number** of functions and returns a new
function.  When called with an initial value, it passes that value through each
function in order (left-to-right).

Use \`Array.prototype.reduce\` to thread the value through the list.`,
      starterCode: `function pipe(...fns) {
  // return a new function that threads a value through fns left-to-right
}
`,
      solution: `function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}`,
      tests: [
        {
          name: "single function",
          code: `const double = (x) => x * 2;
assertEquals(pipe(double)(5), 10);`,
        },
        {
          name: "two functions, left-to-right order",
          code: `const addOne = (x) => x + 1;
const double = (x) => x * 2;
assertEquals(pipe(addOne, double)(3), 8);`,
        },
        {
          name: "three functions",
          code: `const addOne = (x) => x + 1;
const double = (x) => x * 2;
const negate = (x) => -x;
assertEquals(pipe(addOne, double, negate)(4), -10);`,
        },
        {
          name: "works with strings",
          code: `const trim = (s) => s.trim();
const upper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";
assertEquals(pipe(trim, upper, exclaim)("  hi  "), "HI!");`,
        },
      ],
      hints: [
        "Use rest parameters `...fns` so you get an array of functions.",
        "Return an arrow function `(x) => ...` that processes the value.",
        "Use `fns.reduce((acc, fn) => fn(acc), x)` to thread `x` through every function.",
      ],
      explanation: `\`pipe\` collects all functions into an array via rest params, then returns a
closure over that array.  When called, it uses \`reduce\` to thread the
accumulator (starting at \`x\`) through each function in turn.  This is
exactly the dual of \`compose\`: same power, opposite reading order.`,
    },

    // ─── Lesson 3: compose (variadic, right-to-left) ───────────────────────
    {
      slug: "compose",
      title: "compose — Right-to-Left (Math Style)",
      blurb: "Build a variadic compose that mirrors mathematical notation.",
      xp: 30,
      content: `# compose — Right-to-Left (Math Style)

You already built \`compose2\` for exactly two functions.  The full \`compose\`
accepts **any number** and applies them **right-to-left** — the same order as
\`f(g(h(x)))\`.

\`\`\`js
const result = compose(double, addOne, square)(3);
// square(3) → 9, addOne(9) → 10, double(10) → 20
\`\`\`

Libraries like Ramda and fp-ts ship exactly this function.

**Relationship to pipe:**
\`compose(f, g, h)(x) === pipe(h, g, f)(x)\`
The lists are just reversed.

## Your task

Write \`compose(...fns)\` that returns a new function which applies \`fns\`
**right-to-left**.

Hint: you can implement it with \`reduceRight\`, or by reversing the array and
reusing the \`pipe\` pattern.`,
      starterCode: `function compose(...fns) {
  // apply fns right-to-left
}
`,
      solution: `function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}`,
      tests: [
        {
          name: "single function",
          code: `const double = (x) => x * 2;
assertEquals(compose(double)(5), 10);`,
        },
        {
          name: "two functions — rightmost runs first",
          code: `const addOne = (x) => x + 1;
const double = (x) => x * 2;
assertEquals(compose(double, addOne)(3), 8);`,
        },
        {
          name: "three functions — rightmost first",
          code: `const square = (x) => x * x;
const addOne = (x) => x + 1;
const double = (x) => x * 2;
assertEquals(compose(double, addOne, square)(3), 20);`,
        },
      ],
      hints: [
        "Use `fns.reduceRight(...)` instead of `fns.reduce(...)` to walk the array from right to left.",
        "The accumulator starts at `x`, just like in pipe.",
      ],
      explanation: `\`reduceRight\` iterates from the last element to the first, making
right-to-left application trivial.  Alternatively you could do
\`[...fns].reverse().reduce(...)\` but \`reduceRight\` avoids the extra array copy.`,
    },

    // ─── Lesson 4: Point-free style ────────────────────────────────────────
    {
      slug: "point-free",
      title: "Point-Free Style",
      blurb: "Define functions by composition alone — no explicit arguments.",
      xp: 35,
      content: `# Point-Free Style

**Point-free** (also called *tacit*) programming means defining a function
without ever mentioning its argument.  Instead of:

\`\`\`js
const shout = (s) => s.toUpperCase() + "!";
\`\`\`

You compose smaller, reusable helpers:

\`\`\`js
const upper  = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";

const shout = pipe(upper, exclaim); // no explicit \`s\`!
shout("hello"); // "HELLO!"
\`\`\`

This style shines when you have a library of tiny, single-purpose helpers —
you just wire them together with \`pipe\` or \`compose\`.

## Your task

You are given these helpers (already in scope — do **not** redefine them):

\`\`\`js
const trim    = (s) => s.trim();
const lower   = (s) => s.toLowerCase();
const replace = (from, to) => (s) => s.split(from).join(to);
\`\`\`

Using \`pipe\` (also already in scope), write **\`slugify\`** in point-free style:
- Trim whitespace
- Lowercase
- Replace every space with a hyphen \`"-"\`

\`slugify("  Hello World  ")\` → \`"hello-world"\``,
      starterCode: `// pipe, trim, lower, replace are already in scope — do not redefine them.
// Write slugify using pipe (point-free — no explicit argument).
const slugify = /* your code here */;
`,
      solution: `const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
const trim    = (s) => s.trim();
const lower   = (s) => s.toLowerCase();
const replace = (from, to) => (s) => s.split(from).join(to);
const slugify = pipe(trim, lower, replace(" ", "-"));`,
      tests: [
        {
          name: 'slugify("  Hello World  ") === "hello-world"',
          code: `assertEquals(slugify("  Hello World  "), "hello-world");`,
        },
        {
          name: 'slugify("Functional JS") === "functional-js"',
          code: `assertEquals(slugify("Functional JS"), "functional-js");`,
        },
        {
          name: 'no trailing spaces in result',
          code: `assertEquals(slugify("  React  "), "react");`,
        },
      ],
      hints: [
        "Think of `pipe(trim, lower, replace(\" \", \"-\"))` — partially apply `replace` right inside the pipe call.",
        "`replace(\" \", \"-\")` returns a function `(s) => s.split(\" \").join(\"-\")`, which is exactly what pipe expects.",
      ],
      explanation: `\`slugify\` is defined purely as a pipeline — no \`(s) =>\` anywhere in sight.
\`replace(\" \", \"-\")\` is a **curried** helper: calling it with two args returns
a single-argument function suitable for pipe.  This is the core pattern that
makes point-free style possible.`,
    },

    // ─── Lesson 5: Currying — the glue of point-free ───────────────────────
    {
      slug: "currying",
      title: "Currying — Functions That Wait for Arguments",
      blurb: "Turn a multi-argument function into a chain of single-argument functions.",
      xp: 35,
      content: `# Currying — Functions That Wait for Arguments

A **curried** function takes its arguments **one at a time**, returning a new
function for each one until it has everything it needs.

\`\`\`js
// Uncurried
const add = (a, b) => a + b;
add(2, 3); // 5

// Curried
const curriedAdd = (a) => (b) => a + b;
curriedAdd(2)(3); // 5

// Partial application — freeze one argument
const add2 = curriedAdd(2); // (b) => 2 + b
add2(10); // 12
\`\`\`

Currying is the reason point-free works: by fixing some arguments, you get
a single-argument function you can drop straight into \`pipe\`.

## Your task

Write \`curry2(fn)\` — a function that takes a **two-argument function** and
returns its curried version.

\`curry2(add)(2)(3)\` must equal \`add(2, 3)\`.`,
      starterCode: `function curry2(fn) {
  // return a curried version of the two-argument function fn
}
`,
      solution: `function curry2(fn) {
  return (a) => (b) => fn(a, b);
}`,
      tests: [
        {
          name: "curry2 on addition",
          code: `const add = (a, b) => a + b;
assertEquals(curry2(add)(2)(3), 5);`,
        },
        {
          name: "partial application creates reusable function",
          code: `const add = (a, b) => a + b;
const add10 = curry2(add)(10);
assertEquals(add10(5), 15);
assertEquals(add10(0), 10);`,
        },
        {
          name: "works with string concat",
          code: `const concat = (a, b) => a + b;
const greet = curry2(concat)("Hello, ");
assertEquals(greet("World"), "Hello, World");`,
        },
      ],
      hints: [
        "`curry2(fn)` should return a function that takes `a`, which in turn returns a function that takes `b`.",
        "The innermost function simply calls `fn(a, b)`.",
      ],
      explanation: `\`curry2\` wraps any two-argument function in a chain of single-argument
closures.  Each closure captures the argument it received.  When the second
argument finally arrives, the original function is called with both.  This
pattern extends naturally to \`curry3\`, \`curry4\`, or the fully generic
\`curry\` from Ramda/lodash.`,
    },

    // ─── Lesson 6: Building a real data pipeline ───────────────────────────
    {
      slug: "data-pipeline",
      title: "Building a Real Data Pipeline",
      blurb: "Chain map, filter, and custom helpers into a readable pipeline.",
      xp: 45,
      content: `# Building a Real Data Pipeline

Now let's put it all together.  A **data pipeline** is a \`pipe\` (or chain) of
pure functions that transforms raw data into the shape you need.

\`\`\`js
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const processOrders = pipe(
  (orders) => orders.filter((o) => o.status === "paid"),
  (orders) => orders.map((o) => o.total),
  (totals) => totals.reduce((sum, t) => sum + t, 0),
);

processOrders(rawOrders); // total revenue from paid orders
\`\`\`

Each step is a single-purpose transformation.  Adding or removing a step is
just one line.

## Your task

You have an array of product objects like:

\`\`\`js
{ name: "Widget", price: 9.99, inStock: true }
\`\`\`

Write \`getAffordableNames(products)\` that — **in a single \`pipe\` call** —
1. Keeps only products that are **in stock**
2. Keeps only products with \`price <= 20\`
3. Returns an array of just their **names** (strings)

You may define \`pipe\` yourself, or inline the pipeline however you like.`,
      starterCode: `function getAffordableNames(products) {
  // build a pipeline: in-stock → price ≤ 20 → extract names
}
`,
      solution: `function getAffordableNames(products) {
  const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
  return pipe(
    (ps) => ps.filter((p) => p.inStock),
    (ps) => ps.filter((p) => p.price <= 20),
    (ps) => ps.map((p) => p.name),
  )(products);
}`,
      tests: [
        {
          name: "returns names of in-stock affordable products",
          code: `const products = [
  { name: "Widget", price: 9.99, inStock: true },
  { name: "Gadget", price: 49.99, inStock: true },
  { name: "Doohickey", price: 14.99, inStock: false },
  { name: "Thingamajig", price: 4.99, inStock: true },
];
assertEquals(JSON.stringify(getAffordableNames(products)), JSON.stringify(["Widget","Thingamajig"]));`,
        },
        {
          name: "empty array returns empty array",
          code: `assertEquals(JSON.stringify(getAffordableNames([])), JSON.stringify([]));`,
        },
        {
          name: "excludes out-of-stock even if cheap",
          code: `const products = [
  { name: "Cheap", price: 1.00, inStock: false },
  { name: "Pricey", price: 100, inStock: true },
];
assertEquals(JSON.stringify(getAffordableNames(products)), JSON.stringify([]));`,
        },
      ],
      hints: [
        "Define `pipe` at the top of your function, then call `pipe(step1, step2, step3)(products)`.",
        "Step 1: `.filter(p => p.inStock)`. Step 2: `.filter(p => p.price <= 20)`. Step 3: `.map(p => p.name)`.",
      ],
      explanation: `Each stage of the pipeline does exactly one thing and returns a new array.
Splitting the two filter conditions into separate steps isn't required — you
could combine them — but keeping them separate makes each step's intention
immediately obvious, which is the whole point of the pipeline style.`,
    },

    // ─── Lesson 7: Transducing concept — compose array operations ──────────
    {
      slug: "compose-transformers",
      title: "Composing Transformers",
      blurb: "Write reusable single-step helpers, then wire them into any pipeline.",
      xp: 40,
      content: `# Composing Transformers

The real power of \`pipe\` comes when you have a **library of reusable steps**
that you mix and match for different pipelines.

\`\`\`js
// Reusable transformer factories
const filterBy  = (pred)  => (arr) => arr.filter(pred);
const mapWith   = (fn)    => (arr) => arr.map(fn);
const sortWith  = (cmp)   => (arr) => [...arr].sort(cmp);
const take      = (n)     => (arr) => arr.slice(0, n);
\`\`\`

Each factory returns a **single-argument function** that takes an array and
returns an array — perfect for pipe!

\`\`\`js
const top3Scores = pipe(
  filterBy((u) => u.active),
  mapWith((u) => u.score),
  sortWith((a, b) => b - a),
  take(3),
);
\`\`\`

## Your task

You are given these helpers already in scope:

\`\`\`js
const filterBy = (pred) => (arr) => arr.filter(pred);
const mapWith  = (fn)   => (arr) => arr.map(fn);
const take     = (n)    => (arr) => arr.slice(0, n);
\`\`\`

And \`pipe\` is also in scope.

Write \`top3EvenSquares(numbers)\` that:
1. Filters to **even** numbers only
2. **Squares** each number
3. Takes the first **3** results

Return the resulting array.`,
      starterCode: `// pipe, filterBy, mapWith, take are already in scope — do not redefine them.
function top3EvenSquares(numbers) {
  // use pipe + the helpers above
}
`,
      solution: `function top3EvenSquares(numbers) {
  const pipe     = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
  const filterBy = (pred)  => (arr) => arr.filter(pred);
  const mapWith  = (fn)    => (arr) => arr.map(fn);
  const take     = (n)     => (arr) => arr.slice(0, n);
  return pipe(
    filterBy((n) => n % 2 === 0),
    mapWith((n) => n * n),
    take(3),
  )(numbers);
}`,
      tests: [
        {
          name: "filters evens, squares, takes 3",
          code: `assertEquals(JSON.stringify(top3EvenSquares([1,2,3,4,5,6,7,8])), JSON.stringify([4,16,36]));`,
        },
        {
          name: "fewer than 3 evens — returns what exists",
          code: `assertEquals(JSON.stringify(top3EvenSquares([1,2,3])), JSON.stringify([4]));`,
        },
        {
          name: "no evens — returns empty array",
          code: `assertEquals(JSON.stringify(top3EvenSquares([1,3,5])), JSON.stringify([]));`,
        },
      ],
      hints: [
        "Call `pipe(filterBy(...), mapWith(...), take(...))(numbers)`.",
        "Even numbers satisfy `n % 2 === 0`.",
      ],
      explanation: `Transformer factories like \`filterBy\` and \`mapWith\` are the standard
vocabulary of a point-free style.  Because every factory returns
\`(arr) => arr\`, they all have the same shape and can be freely combined in
any pipe.  This is the informal precursor to the transducer pattern.`,
    },

    // ─── Lesson 8: Memoize a composed pipeline ─────────────────────────────
    {
      slug: "memoize",
      title: "Memoization — Cache Function Results",
      blurb: "Speed up pure functions by remembering results you've already computed.",
      xp: 40,
      content: `# Memoization — Cache Function Results

Pure functions always return the same output for the same input.  That makes
them perfect candidates for **memoization**: store the result the first time
you compute it, and return the cached version on subsequent calls.

\`\`\`js
function memoize(fn) {
  const cache = new Map();
  return function (x) {
    if (cache.has(x)) return cache.get(x);
    const result = fn(x);
    cache.set(x, result);
    return result;
  };
}
\`\`\`

This is especially useful when you've composed an expensive pipeline and
expect to call it repeatedly with the same values.

## Your task

Implement \`memoize(fn)\` as described above.  It should:
- Accept a single-argument function \`fn\`
- Return a new function that caches results in a \`Map\`
- Call \`fn\` only **once** per unique input; return the cached result every
  time after that`,
      starterCode: `function memoize(fn) {
  // cache results in a Map; call fn only once per unique argument
}
`,
      solution: `function memoize(fn) {
  const cache = new Map();
  return function (x) {
    if (cache.has(x)) return cache.get(x);
    const result = fn(x);
    cache.set(x, result);
    return result;
  };
}`,
      tests: [
        {
          name: "returns correct result",
          code: `const double = memoize((x) => x * 2);
assertEquals(double(5), 10);
assertEquals(double(3), 6);`,
        },
        {
          name: "calls fn only once per unique input",
          code: `let callCount = 0;
const tracked = memoize((x) => { callCount++; return x * 2; });
tracked(4);
tracked(4);
tracked(4);
assertEquals(callCount, 1);`,
        },
        {
          name: "different inputs each invoke fn",
          code: `let callCount = 0;
const tracked = memoize((x) => { callCount++; return x * 3; });
tracked(1);
tracked(2);
tracked(3);
assertEquals(callCount, 3);`,
        },
        {
          name: "cached value matches original result",
          code: `const expensive = memoize((x) => x * x + 2 * x + 1);
const first  = expensive(7);
const second = expensive(7);
assertEquals(first, second);
assertEquals(first, 64);`,
        },
      ],
      hints: [
        "Create `const cache = new Map()` inside `memoize` — it's shared by all calls to the returned function.",
        "Before computing, check `cache.has(x)`. If true, return `cache.get(x)`. Otherwise compute, `cache.set(x, result)`, and return it.",
      ],
      explanation: `The \`Map\` lives in the closure of the returned function, so it persists
across all calls.  \`Map\` is preferred over a plain object here because it
handles any key type (numbers, objects, etc.) without the prototype-pollution
risk of \`{}\`.  For functions with multiple arguments you would need to
serialize the args into a cache key.`,
    },

    // ─── Lesson 9: Quiz — Concepts review ──────────────────────────────────
    {
      slug: "composition-quiz",
      title: "Composition Concepts Quiz",
      blurb: "Check your mental model of pipe, compose, currying, and point-free.",
      xp: 25,
      kind: "quiz",
      content: `# Composition Concepts Quiz

You have built \`pipe\`, \`compose\`, curried functions, and full data pipelines.
Let's make sure the concepts are locked in.`,
      questions: [
        {
          prompt: "Given `pipe(f, g, h)(x)`, which function runs first?",
          options: ["h", "g", "f"],
          answer: 2,
          explanation:
            "pipe applies functions left-to-right, so `f` receives `x` first. The result flows to `g`, then `h`.",
        },
        {
          prompt: "Given `compose(f, g, h)(x)`, which function runs first?",
          options: ["f", "g", "h"],
          answer: 2,
          explanation:
            "compose applies functions right-to-left (mathematical order), so `h` runs first, then `g`, then `f`.",
        },
        {
          prompt: "What does a curried function do?",
          options: [
            "Runs faster because it skips argument validation",
            "Takes its arguments one at a time, returning a new function until all are supplied",
            "Converts an array into a single value using reduce",
          ],
          answer: 1,
          explanation:
            "Currying transforms `(a, b) => ...` into `(a) => (b) => ...`. Each call returns a new function until all arguments are provided.",
        },
        {
          prompt: "Which snippet demonstrates point-free style?",
          options: [
            "const shout = (s) => s.toUpperCase() + '!'",
            "const shout = pipe(upper, exclaim)",
            "function shout(s) { return upper(exclaim(s)); }",
          ],
          answer: 1,
          explanation:
            "Point-free style defines a function without explicitly naming its argument. `pipe(upper, exclaim)` creates `shout` without any `s =>` in sight.",
        },
        {
          prompt: "What is the main advantage of memoizing a pure function?",
          options: [
            "It makes the function impure so it can have side effects",
            "It avoids recomputing results for inputs that have already been processed",
            "It lets the function accept more than one argument",
          ],
          answer: 1,
          explanation:
            "Because a pure function always returns the same result for the same input, you can safely cache that result and skip the computation on repeated calls.",
        },
      ],
    },
  ],
};
