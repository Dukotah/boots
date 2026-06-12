import type { Module } from "./types";

// Functional Programming — pure functions, immutability, and composition. The
// mindset behind React, Redux, and modern JS. Auto-graded in-browser.
//
// This is an *intermediate* deep-dive, but the ENTRY is intentionally gentle so a
// learner arriving from the Foundations track doesn't hit a wall. Order follows
// easy → hard: a no-code "predict the output" quiz cold-open, then the core
// collection toolkit (map → filter → reduce) before we touch composition and
// currying. Every code lesson is scaffolded with drag-in `blocks` and two-step
// `hintCode`, and concept-heavy topics (composition, currying) lead with a
// read-before-write quiz so learners read the shape before they type it. The
// rigor is unchanged — the on-ramp is just smoother.
export const functional: Module = {
  slug: "functional",
  title: "Functional Programming",
  description:
    "Pure functions, immutability, and composition — the ideas behind React, Redux, and clean modern JavaScript. Write code that's predictable and easy to test.",
  emoji: "🪄",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Learn map, filter, reduce, pure functions, immutability, compose, pipe, currying, and memoization in JavaScript.",
  keywords: [
    "functional programming javascript",
    "map filter reduce",
    "pure functions",
    "function composition",
    "currying javascript",
    "memoization",
  ],
  lessons: [
    // ── 1. Cold-open quiz: read map & filter before writing them ──
    {
      slug: "read-map-filter",
      title: "Read a Transform First 👀",
      blurb: "Predict what map and filter return — before you write any.",
      xp: 15,
      kind: "quiz",
      content: `# Read a Transform First 👀

Welcome to Functional Programming. You already know loops — here you'll learn the
*declarative* toolkit that replaces most of them: \`map\`, \`filter\`, and \`reduce\`.
Before writing any, let's read a little, the way working developers do.

Two array methods do almost all the heavy lifting:

\`\`\`js
[1, 2, 3].map((n) => n * 10);      // [10, 20, 30]  — transform every element
[1, 2, 3, 4].filter((n) => n > 2); // [3, 4]        — keep only some elements
\`\`\`

- **\`map\`** runs your function on each element and returns a **new array of the
  same length** — every value transformed.
- **\`filter\`** runs your function (which returns \`true\`/\`false\`) on each element
  and returns a **new array** containing only the elements that passed.

Crucially, both return a **brand-new array** — the original is never touched. Read
the snippets above, then predict the results below. 👇`,
      questions: [
        {
          prompt: "What does `[1, 2, 3].map((n) => n + 1)` return?",
          options: ["[1, 2, 3]", "[2, 3, 4]", "6", "[1, 2, 3, 1]"],
          answer: 1,
          explanation:
            "`map` transforms every element with your function: 1→2, 2→3, 3→4. Same length, new array.",
        },
        {
          prompt: "What does `[5, 8, 2, 10].filter((n) => n >= 8)` return?",
          options: ["[5, 2]", "[8, 10]", "true", "[5, 8, 2, 10]"],
          answer: 1,
          explanation:
            "`filter` keeps only the elements where your function returns `true`. 8 and 10 are ≥ 8; 5 and 2 are dropped.",
        },
        {
          prompt:
            "After `const a = [1, 2]; const b = a.map((n) => n * 2);`, what is `a`?",
          options: ["[2, 4]", "[1, 2]", "[1, 2, 2, 4]", "undefined"],
          answer: 1,
          explanation:
            "`map` never mutates. It returns a new array `b = [2, 4]`, while the original `a` stays `[1, 2]`.",
        },
      ],
    },

    // ── 2. map (easiest write) ──
    {
      slug: "map-double",
      title: "Map: Transform Every Element",
      blurb: "Build a new array by transforming each item.",
      xp: 30,
      content: `# Map: Transform Every Element

\`map\` is the workhorse of functional JavaScript. You hand it a function, and it
returns a **new array** where every element has been run through that function —
same length, original untouched.

\`\`\`js
[1, 2, 3].map((n) => n * 10); // [10, 20, 30]
\`\`\`

This replaces the classic "make an empty array, loop, push" pattern with a single
expression that reads like its intent.

## Your task
Write \`doubleAll(nums)\` that returns a **new** array with every number doubled.
Use \`map\` — don't mutate \`nums\`.`,
      starterCode: `function doubleAll(nums) {
  // use nums.map(...) to return a new array with every number doubled
}
`,
      blocks: ["return nums", ".map(", "(n) => n * 2", ")", ";"],
      solution: `function doubleAll(nums) {
  return nums.map((n) => n * 2);
}`,
      tests: [
        {
          name: "doubles each number",
          code: `assertEquals(doubleAll([1, 2, 3]), [2, 4, 6]);`,
        },
        { name: "empty array → empty array", code: `assertEquals(doubleAll([]), []);` },
        {
          name: "does not mutate input",
          code: `const src = [1, 2]; doubleAll(src); assertEquals(src, [1, 2], "map must not change the original array");`,
        },
      ],
      hints: [
        "Call `.map()` on `nums` and `return` the result.",
        "Your transform function takes one number and returns it doubled: `(n) => n * 2`.",
      ],
      hintCode: [
        `function doubleAll(nums) {\n  return nums.map(/* transform here */);\n}\n`,
        `function doubleAll(nums) {\n  return nums.map((n) => n * 2);\n}\n`,
      ],
      explanation:
        "`map` runs your function on each element and collects the results into a new array of the same length — no loop, no mutation.",
    },

    // ── 3. filter (easy write) ──
    {
      slug: "filter-evens",
      title: "Filter: Keep What Passes",
      blurb: "Return a new array of only the elements you want.",
      xp: 30,
      content: `# Filter: Keep What Passes

Where \`map\` transforms, \`filter\` **selects**. You give it a function that returns
\`true\` or \`false\` (a *predicate*), and it returns a **new array** of only the
elements for which the predicate was \`true\`.

\`\`\`js
[1, 2, 3, 4].filter((n) => n > 2); // [3, 4]
\`\`\`

The result is never longer than the input — it can only keep or drop, never
transform.

## Your task
Write \`keepEvens(nums)\` that returns a **new** array containing only the even
numbers. (A number is even when \`n % 2 === 0\`.)`,
      starterCode: `function keepEvens(nums) {
  // use nums.filter(...) to keep only the even numbers
}
`,
      blocks: ["return nums", ".filter(", "(n) => n % 2 === 0", ")", ";"],
      solution: `function keepEvens(nums) {
  return nums.filter((n) => n % 2 === 0);
}`,
      tests: [
        {
          name: "keeps only evens",
          code: `assertEquals(keepEvens([1, 2, 3, 4]), [2, 4]);`,
        },
        {
          name: "no evens → empty array",
          code: `assertEquals(keepEvens([1, 3, 5]), []);`,
        },
        {
          name: "all evens kept",
          code: `assertEquals(keepEvens([2, 4, 6]), [2, 4, 6]);`,
        },
      ],
      hints: [
        "Call `.filter()` on `nums` and `return` the result.",
        "The predicate keeps a number when it's even: `(n) => n % 2 === 0`.",
      ],
      hintCode: [
        `function keepEvens(nums) {\n  return nums.filter(/* predicate here */);\n}\n`,
        `function keepEvens(nums) {\n  return nums.filter((n) => n % 2 === 0);\n}\n`,
      ],
      explanation:
        "`filter` keeps each element only when your predicate returns `true`. It selects; it never transforms.",
    },

    // ── 4. reduce (the harder one — comes after map & filter) ──
    {
      slug: "reduce-sum",
      title: "Reduce: Fold Into One Value",
      blurb: "Collapse an array down to a single result.",
      xp: 40,
      content: `# Reduce: Fold Into One Value

\`map\` and \`filter\` both return arrays. \`reduce\` is the general tool that collapses
an array down to **one** value — a sum, a max, a joined string, even a new object.

It threads an **accumulator** through the array. You give it two things: a function
\`(acc, item) => newAcc\`, and a **starting value** for \`acc\`.

\`\`\`js
[1, 2, 3].reduce((acc, n) => acc + n, 0);
// step 1: acc=0, n=1 → 1
// step 2: acc=1, n=2 → 3
// step 3: acc=3, n=3 → 6   → result: 6
\`\`\`

The \`0\` at the end is the starting accumulator — that's why the empty array
returns \`0\` and never crashes.

## Your task
Write \`sum(nums)\` that returns the total of all the numbers, using \`reduce\` with a
starting value of \`0\`.`,
      starterCode: `function sum(nums) {
  // use nums.reduce((acc, n) => ..., 0) to add everything up
}
`,
      blocks: ["return nums", ".reduce(", "(acc, n) => acc + n", ", 0)", ";"],
      solution: `function sum(nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}`,
      tests: [
        { name: "sums the numbers", code: `assertEquals(sum([1, 2, 3, 4]), 10);` },
        {
          name: "empty array → 0 (the starting value)",
          code: `assertEquals(sum([]), 0);`,
        },
        { name: "single element", code: `assertEquals(sum([7]), 7);` },
      ],
      hints: [
        "Call `.reduce()` with two arguments: the folding function, then the starting value `0`.",
        "Each step adds the current number to the running total: `(acc, n) => acc + n`.",
      ],
      hintCode: [
        `function sum(nums) {\n  return nums.reduce((acc, n) => /* combine */, 0);\n}\n`,
        `function sum(nums) {\n  return nums.reduce((acc, n) => acc + n, 0);\n}\n`,
      ],
      explanation:
        "`reduce` carries an accumulator across the array. Starting at `0`, it adds each number in turn and returns the final total — and the start value keeps the empty case safe.",
    },

    // ── 5. Concept quiz: pure vs. impure (read before the immutability tasks) ──
    {
      slug: "what-is-pure",
      title: "Pure vs. Impure 🧪",
      blurb: "Spot the function that quietly changes its input.",
      xp: 15,
      kind: "quiz",
      content: `# Pure vs. Impure 🧪

You may have noticed: \`map\`, \`filter\`, and \`reduce\` all return **new** values and
leave their inputs alone. That's the heart of functional programming — **pure
functions**.

A function is **pure** when:

1. Given the same input, it always returns the same output.
2. It has **no side effects** — it doesn't change anything outside itself,
   including its own arguments.

Compare these two:

\`\`\`js
// IMPURE — mutates the array it was given
function addImpure(arr, x) {
  arr.push(x);
  return arr;
}

// PURE — returns a new array, leaves arr alone
function addPure(arr, x) {
  return [...arr, x];
}
\`\`\`

The next lessons are all about writing the *pure* version. Read the two functions
above, then answer below. 👇`,
      questions: [
        {
          prompt: "Why is `addImpure` impure?",
          options: [
            "It returns an array",
            "It mutates `arr` (a side effect on its input)",
            "It uses the spread operator",
            "It takes two arguments",
          ],
          answer: 1,
          explanation:
            "`arr.push(x)` changes the caller's array in place — a side effect. Pure functions never modify their arguments.",
        },
        {
          prompt:
            "After `const a = [1]; addPure(a, 2);`, what is `a`?",
          options: ["[1, 2]", "[1]", "[2]", "undefined"],
          answer: 1,
          explanation:
            "`addPure` builds and returns a *new* array `[1, 2]`, but `a` itself is never touched — it stays `[1]`.",
        },
        {
          prompt:
            "A pure function called twice with the same input will…",
          options: [
            "sometimes return different results",
            "always return the same result",
            "throw an error the second time",
            "modify a global variable",
          ],
          answer: 1,
          explanation:
            "Same input → same output, every time. That predictability is exactly what makes pure functions easy to test and reason about.",
        },
      ],
    },

    // ── 6. no-mutation (kept slug) ──
    {
      slug: "no-mutation",
      title: "Don't Mutate — Return New",
      blurb: "Pure functions never change their inputs.",
      xp: 35,
      content: `# Don't Mutate — Return New

Now you write the pure version yourself. Instead of \`arr.push(x)\` (which mutates),
build a **new** array with the spread operator:

\`\`\`js
const next = [...arr, x]; // arr is untouched
\`\`\`

The \`...arr\` copies every existing element into the new array, then \`x\` is added
on the end.

## Your task
Write \`addItem(cart, item)\` that returns a **new** array with \`item\` appended.
The original \`cart\` must not change.`,
      starterCode: `function addItem(cart, item) {
  // return a NEW array with item appended (don't mutate cart)
}
`,
      blocks: ["return [", "...cart", ", item", "]", ";"],
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
      hints: [
        "Build a fresh array literal with `[` and `]` — don't call `.push()`.",
        "Spread the old items first, then add the new one: `[...cart, item]`.",
      ],
      hintCode: [
        `function addItem(cart, item) {\n  return [/* spread cart, then item */];\n}\n`,
        `function addItem(cart, item) {\n  return [...cart, item];\n}\n`,
      ],
      explanation:
        "`[...cart, item]` copies every existing element into a brand-new array and appends `item`, so the caller's `cart` is never modified.",
    },

    // ── 7. immutable-update (kept slug) ──
    {
      slug: "immutable-update",
      title: "Immutable Updates",
      blurb: "Update objects without changing them.",
      xp: 40,
      content: `# Immutable Updates

Same idea, now for **objects**: spread the old one, then override the field. This
is exactly how React state updates work — you never edit state in place.

\`\`\`js
const next = { ...user, name: "New" };
\`\`\`

\`...user\` copies every existing key, then \`name: "New"\` overwrites just that one.
The original \`user\` is untouched. To set a key whose name lives in a variable, use
a **computed key**: \`{ ...obj, [key]: value }\`.

## Your task
Write \`updateField(obj, key, value)\` that returns a **new** object with \`key\` set
to \`value\`, leaving the original untouched.`,
      starterCode: `function updateField(obj, key, value) {
  // return a new object with key set to value (don't mutate obj)
}
`,
      blocks: ["return {", " ...obj", ", [key]: value", " }", ";"],
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
      hints: [
        "Build a new object literal `{ ... }` — spread `obj` to copy its keys.",
        "Override with a computed key so the variable's value is used as the key name: `[key]: value`.",
      ],
      hintCode: [
        `function updateField(obj, key, value) {\n  return { ...obj /* then set [key] */ };\n}\n`,
        `function updateField(obj, key, value) {\n  return { ...obj, [key]: value };\n}\n`,
      ],
      explanation:
        "`{ ...obj, [key]: value }` copies every key into a new object, then the computed key `[key]` overrides (or adds) just one — the original object is never mutated.",
    },

    // ── 8. compose (kept slug) — concept-light, two functions only ──
    {
      slug: "compose",
      title: "Compose Two Functions",
      blurb: "Run one function's output into another.",
      xp: 40,
      content: `# Compose Two Functions

**Composition** wires functions together so the output of one becomes the input of
the next. We'll start with just two.

\`compose(f, g)\` returns a *new* function that runs \`g\` first, then feeds its
result into \`f\` — that is \`f(g(x))\`. It reads **right to left**, like math
notation:

\`\`\`js
const shout = (s) => s + "!";
const upper = (s) => s.toUpperCase();
compose(shout, upper)("hi"); // upper("hi") → "HI", then shout → "HI!"
\`\`\`

## Your task
Write \`compose(f, g)\` that returns a new function \`x => f(g(x))\`.`,
      starterCode: `function compose(f, g) {
  // return a NEW function that applies g first, then f
}
`,
      blocks: ["return ", "(x) => ", "f(", "g(x)", ")", ";"],
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
      hints: [
        "Return an arrow function that takes one argument `x` — don't call `f` or `g` yet.",
        "Inside it, run `g` first, then pass that into `f`: `f(g(x))`.",
      ],
      hintCode: [
        `function compose(f, g) {\n  return (x) => /* f and g, right to left */;\n}\n`,
        `function compose(f, g) {\n  return (x) => f(g(x));\n}\n`,
      ],
      explanation:
        "`compose(f, g)` returns `x => f(g(x))`: `g` runs first, then its result flows into `f`. Reading right to left mirrors mathematical function composition.",
    },

    // ── 9. pipe (kept slug) — generalizes compose to N functions ──
    {
      slug: "pipe",
      title: "Pipe: Compose Many, Left to Right",
      blurb: "Generalize compose to any number of steps.",
      xp: 45,
      content: `# Pipe: Compose Many, Left to Right

\`compose\` handled two functions, right to left. \`pipe\` generalizes it: **any
number** of functions, read **left to right** — the order data actually flows.

\`pipe(a, b, c)(x)\` is \`c(b(a(x)))\`. The trick is \`reduce\`: start with the input
value as the accumulator, then thread it through each function in turn.

\`\`\`js
fns.reduce((acc, fn) => fn(acc), x);
// acc starts as x; each step replaces acc with fn(acc)
\`\`\`

With no functions at all, \`reduce\` returns the starting value unchanged — so
\`pipe()(7)\` is just \`7\`.

## Your task
Write \`pipe(...fns)\` that returns a function running each fn left-to-right on its
input. With no functions, it returns the input unchanged.`,
      starterCode: `function pipe(...fns) {
  // return a function that threads its input through every fn, left to right
}
`,
      blocks: [
        "return ",
        "(x) => ",
        "fns.reduce(",
        "(acc, fn) => fn(acc)",
        ", x)",
        ";",
      ],
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
      hints: [
        "Return an arrow function `(x) => ...`. Inside, reduce over `fns` starting from `x`.",
        "Each reduce step applies the next function to the running value: `(acc, fn) => fn(acc)`, with `x` as the seed.",
      ],
      hintCode: [
        `function pipe(...fns) {\n  return (x) => fns.reduce(/* fold */, x);\n}\n`,
        `function pipe(...fns) {\n  return (x) => fns.reduce((acc, fn) => fn(acc), x);\n}\n`,
      ],
      explanation:
        "`reduce` threads the value through each function left to right, seeding the accumulator with the input. An empty `fns` makes `reduce` return the seed untouched — a free identity function.",
    },

    // ── 10. Currying cold-open quiz: read the curried shape first ──
    {
      slug: "read-currying",
      title: "Read a Curried Call 👀",
      blurb: "Decode `add(1)(2)(3)` before you write it.",
      xp: 15,
      kind: "quiz",
      content: `# Read a Curried Call 👀

The next idea looks strange the first time you see it: a function called with
**multiple sets of parentheses** in a row, like \`add(1)(2)(3)\`. Let's read it
before writing it.

A **curried** function takes its arguments **one at a time**. Each call returns
*another function* that's waiting for the next argument, until it finally has them
all:

\`\`\`js
const add = (a) => (b) => (c) => a + b + c;

add(1);        // a function still waiting for b and c
add(1)(2);     // a function still waiting for c
add(1)(2)(3);  // now it has all three → 1 + 2 + 3 = 6
\`\`\`

Each \`(…)\` supplies exactly one argument. Read the chain above, then predict the
results below. 👇`,
      questions: [
        {
          prompt:
            "Given `const add = (a) => (b) => (c) => a + b + c;`, what is `add(2)(3)(4)`?",
          options: ["9", "24", "234", "a function"],
          answer: 0,
          explanation:
            "Each set of parentheses supplies one argument: a=2, b=3, c=4, so the final result is 2 + 3 + 4 = 9.",
        },
        {
          prompt: "What is the *type* of `add(2)` on its own (just one call)?",
          options: ["a number", "a string", "a function (still waiting for more args)", "undefined"],
          answer: 2,
          explanation:
            "`add(2)` has only received `a`. It returns the next function, still waiting for `b` (and then `c`). It isn't a number yet.",
        },
        {
          prompt: "Why is currying useful?",
          options: [
            "It makes functions run faster",
            "It lets you supply some arguments now and the rest later (partial application)",
            "It prevents functions from returning values",
            "It is required by JavaScript",
          ],
          answer: 1,
          explanation:
            "Currying lets you lock in early arguments and reuse the partially-applied function — the basis of building specialized helpers from general ones.",
        },
      ],
    },

    // ── 11. curry-add (kept slug) ──
    {
      slug: "curry-add",
      title: "Currying: One Argument at a Time",
      blurb: "Write the curried add you just read.",
      xp: 45,
      content: `# Currying: One Argument at a Time

Now write the curried function you just decoded. Each layer takes **one** argument
and returns a function waiting for the next, until the innermost one has them all
and does the work:

\`\`\`js
const add = (a) => (b) => (c) => a + b + c;
\`\`\`

Read it as nested arrows: \`add\` returns a function that returns a function that
finally returns the sum.

## Your task
Write \`add(a)\` so that \`add(a)(b)(c)\` returns \`a + b + c\`.`,
      starterCode: `function add(a) {
  // return a function chain so add(a)(b)(c) === a + b + c
}
`,
      blocks: ["return ", "(b) => ", "(c) => ", "a + b + c", ";"],
      solution: `function add(a) {
  return (b) => (c) => a + b + c;
}`,
      tests: [
        { name: "add(1)(2)(3) === 6", code: `assertEquals(add(1)(2)(3), 6);` },
        { name: "zeros", code: `assertEquals(add(0)(0)(0), 0);` },
        { name: "negatives", code: `assertEquals(add(10)(-5)(5), 10);` },
      ],
      hints: [
        "`add` already has `a`. Return a function that takes `b`...",
        "...and that function returns one more function that takes `c` and finally returns `a + b + c`: `(b) => (c) => a + b + c`.",
      ],
      hintCode: [
        `function add(a) {\n  return (b) => /* one more level, then the sum */;\n}\n`,
        `function add(a) {\n  return (b) => (c) => a + b + c;\n}\n`,
      ],
      explanation:
        "Each arrow captures one argument in a closure and returns the next function. Only the innermost call — once it holds `a`, `b`, and `c` — computes the sum.",
    },

    // ── 12. partial-application (kept slug) ──
    {
      slug: "partial-application",
      title: "Partial Application",
      blurb: "Pre-fill some arguments now.",
      xp: 45,
      content: `# Partial Application

Currying's payoff is **partial application**: lock in some arguments up front and
get back a function waiting for the rest. Great for building specialized helpers
from general ones.

\`\`\`js
const add5 = partial(add, 5);
add5(10); // 15
\`\`\`

The key tools are rest/spread: collect the preset args with \`...preset\`, collect
the later args with \`...rest\`, then call \`fn\` with both spread in order.

## Your task
Write \`partial(fn, ...preset)\` that returns a function taking the remaining
arguments and calling \`fn\` with the preset args followed by the new ones.`,
      starterCode: `function partial(fn, ...preset) {
  // return a function that calls fn with preset args first, then the rest
}
`,
      blocks: ["return ", "(...rest) => ", "fn(", "...preset, ...rest", ")", ";"],
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
      hints: [
        "Return a function that gathers its own arguments with a rest parameter: `(...rest) => ...`.",
        "Call `fn` with both lists spread, presets first: `fn(...preset, ...rest)`.",
      ],
      hintCode: [
        `function partial(fn, ...preset) {\n  return (...rest) => fn(/* preset then rest */);\n}\n`,
        `function partial(fn, ...preset) {\n  return (...rest) => fn(...preset, ...rest);\n}\n`,
      ],
      explanation:
        "The returned closure remembers `preset` and, when finally called, spreads the presets ahead of the new `rest` args into `fn` — supplying some arguments now and the rest later.",
    },

    // ── 13. memoize (kept slug) — hardest, last ──
    {
      slug: "memoize",
      title: "Memoization",
      blurb: "Cache results of expensive calls.",
      xp: 50,
      content: `# Memoization

**Memoization** caches a function's result by its input, so repeat calls with the
same argument skip the work. The cache lives in a **closure** — a private object
that persists between calls but stays hidden from the outside.

The shape: on each call, check the cache; if it's a hit, return it; otherwise
compute, store, and return.

\`\`\`js
if (n in cache) return cache[n];   // hit — skip the work
const result = fn(n);              // miss — compute once
cache[n] = result;                 // remember it
\`\`\`

## Your task
Write \`memoize(fn)\` that returns a memoized version of \`fn\` (taking a single
argument). On repeated calls with the same argument, \`fn\` must run only once.`,
      starterCode: `function memoize(fn) {
  // create a cache, then return a function that uses it
}
`,
      blocks: [
        "const cache = {};",
        "return (n) => {",
        "  if (n in cache) return cache[n];",
        "  const result = fn(n);",
        "  cache[n] = result;",
        "  return result;",
        "};",
      ],
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
      hints: [
        "Declare the cache (`const cache = {};`) *outside* the returned function so it survives between calls.",
        "Inside the returned function: return early on a cache hit, otherwise compute with `fn(n)`, store it in `cache[n]`, and return it.",
      ],
      hintCode: [
        `function memoize(fn) {\n  const cache = {};\n  return (n) => {\n    // hit? compute? store?\n  };\n}\n`,
        `function memoize(fn) {\n  const cache = {};\n  return (n) => {\n    if (n in cache) return cache[n];\n    const result = fn(n);\n    cache[n] = result;\n    return result;\n  };\n}\n`,
      ],
      explanation:
        "The `cache` object lives in the closure, persisting across calls. A cache hit returns instantly; a miss runs `fn` exactly once and records the result — so repeated arguments never recompute.",
    },
  ],
};
