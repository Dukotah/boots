import type { Module } from "./types";

// JavaScript Generators & the Iteration Protocol
// Covers Symbol.iterator, custom iterables, function*, yield, two-way
// messaging, and async generators — all runnable in-browser via Web Worker.
export const jsGenerators: Module = {
  slug: "js-generators",
  title: "Generators & the Iteration Protocol",
  description:
    "Unlock lazy sequences, custom iterables, and async data streams — the hidden machinery that powers for…of, spread, and modern JavaScript data pipelines.",
  emoji: "⚡",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline:
    "Learn JavaScript generators: Symbol.iterator, function*, yield, two-way messaging, and async generators.",
  keywords: [
    "javascript generators",
    "javascript iteration protocol",
    "symbol iterator",
    "function star yield",
    "async generators javascript",
    "javascript iterables",
  ],
  lessons: [
    // ─── Lesson 1: The Iteration Protocol ────────────────────────────────────
    {
      slug: "iteration-protocol",
      title: "The Iteration Protocol",
      blurb: "Any object with Symbol.iterator is iterable.",
      xp: 25,
      kind: "quiz",
      content: `# The Iteration Protocol

JavaScript's **iteration protocol** is a contract: any object that has a
\`[Symbol.iterator]()\` method is called **iterable**.  That method must return
an **iterator** — an object with a \`next()\` method that returns
\`{ value, done }\` pairs.

\`\`\`js
const iter = [1, 2, 3][Symbol.iterator]();
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 3, done: false }
iter.next(); // { value: undefined, done: true }
\`\`\`

Built-ins like arrays, strings, \`Map\`, \`Set\`, and \`NodeList\` all implement
this protocol, which is why \`for…of\`, spread (\`[...x]\`), and destructuring
(\`const [a, b] = x\`) all "just work" on them.

> **Key terms**
> - **Iterable** — has \`[Symbol.iterator]()\`
> - **Iterator** — has \`.next()\` returning \`{ value, done }\`
> - **Iterator result** — plain object \`{ value: any, done: boolean }\``,
      questions: [
        {
          prompt:
            "An object is **iterable** in JavaScript when it has:",
          options: [
            "A `.length` property",
            "A `[Symbol.iterator]()` method that returns an iterator",
            "A `.forEach()` method",
          ],
          answer: 1,
          explanation:
            "The iteration protocol requires `[Symbol.iterator]()` returning an object with `.next()`. `.length` and `.forEach` are unrelated.",
        },
        {
          prompt:
            "What does an iterator's `.next()` method return?",
          options: [
            "The next value directly",
            "A promise",
            "An object with `value` and `done` properties",
          ],
          answer: 2,
          explanation:
            "`next()` always returns `{ value, done }`. When done is true the sequence is exhausted.",
        },
        {
          prompt:
            "Which JavaScript features rely on the iteration protocol?",
          options: [
            "Only `for…of` loops",
            "`for…of`, spread (`[...x]`), and destructuring all use it",
            "Only `Array.from()`",
          ],
          answer: 1,
          explanation:
            "`for…of`, spread, destructuring, `Array.from`, `Promise.all`, and more all consume iterables through the same protocol.",
        },
      ],
    },

    // ─── Lesson 2: Custom Iterable ────────────────────────────────────────────
    {
      slug: "custom-iterable",
      title: "Build a Custom Iterable",
      blurb: "Implement Symbol.iterator to make your own object iterable.",
      xp: 35,
      content: `# Build a Custom Iterable

You can make **any object** work with \`for…of\` and spread by adding a
\`[Symbol.iterator]()\` method that returns an iterator.

\`\`\`js
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

[...range]; // [1, 2, 3]
\`\`\`

## Your task

Write a function \`makeRange(from, to)\` that returns an iterable object.
Spreading it (\`[...makeRange(1, 4)]\`) should produce every integer from
\`from\` to \`to\` inclusive.`,
      starterCode: `function makeRange(from, to) {
  // return an object with [Symbol.iterator]()
}
`,
      solution: `function makeRange(from, to) {
  return {
    [Symbol.iterator]() {
      let current = from;
      return {
        next() {
          return current <= to
            ? { value: current++, done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}`,
      tests: [
        {
          name: "spreads to correct array",
          code: `assertEquals(JSON.stringify([...makeRange(1, 4)]), JSON.stringify([1,2,3,4]));`,
        },
        {
          name: "single-element range",
          code: `assertEquals(JSON.stringify([...makeRange(5, 5)]), JSON.stringify([5]));`,
        },
        {
          name: "works with for…of",
          code: `const out = []; for (const n of makeRange(10, 12)) out.push(n); assertEquals(JSON.stringify(out), JSON.stringify([10,11,12]));`,
        },
        {
          name: "each call returns a fresh iterator",
          code: `const r = makeRange(1, 2); assertEquals(JSON.stringify([...r]), JSON.stringify([1,2])); assertEquals(JSON.stringify([...r]), JSON.stringify([1,2]));`,
        },
      ],
      hints: [
        "Return an object that has a `[Symbol.iterator]()` method.",
        "Inside `[Symbol.iterator]()`, close over a `current` variable and return an object with `next()`.",
      ],
    },

    // ─── Lesson 3: function* and yield ────────────────────────────────────────
    {
      slug: "generator-basics",
      title: "function* and yield",
      blurb: "Generator functions pause at every yield and resume on demand.",
      xp: 35,
      content: `# function* and yield

A **generator function** is declared with \`function*\`.  Calling it returns a
**generator object** — which is both an iterator *and* an iterable.

Inside the body, \`yield\` pauses execution and emits a value.  Calling
\`.next()\` resumes from where it left off.

\`\`\`js
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = count();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
\`\`\`

Because the generator is also iterable, you can spread or loop it:

\`\`\`js
[...count()]; // [1, 2, 3]
\`\`\`

## Your task

Write a generator function \`fibonacci()\` that yields the Fibonacci sequence
indefinitely: 0, 1, 1, 2, 3, 5, 8, 13 …

Then write \`firstN(gen, n)\` that takes *any* iterator and returns an array of
the first \`n\` values from it.`,
      starterCode: `function* fibonacci() {
  // yield 0, 1, 1, 2, 3, 5, 8, 13 … forever
}

function firstN(gen, n) {
  // collect the first n values from gen into an array
}
`,
      solution: `function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function firstN(gen, n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(gen.next().value);
  }
  return result;
}`,
      tests: [
        {
          name: "first 8 fibonacci numbers",
          code: `assertEquals(JSON.stringify(firstN(fibonacci(), 8)), JSON.stringify([0,1,1,2,3,5,8,13]));`,
        },
        {
          name: "first 1 fibonacci number",
          code: `assertEquals(JSON.stringify(firstN(fibonacci(), 1)), JSON.stringify([0]));`,
        },
        {
          name: "generator is lazy — does not lock up on infinite sequence",
          code: `const g = fibonacci(); g.next(); g.next(); assertEquals(g.next().value, 1);`,
        },
      ],
      hints: [
        "Use a `while (true)` loop inside the generator — `yield` pauses it so it never actually runs forever.",
        "Track two variables `a` and `b`; after each yield swap them: `[a, b] = [b, a + b]`.",
      ],
    },

    // ─── Lesson 4: yield* — delegating to another iterable ───────────────────
    {
      slug: "yield-star",
      title: "yield* — Delegating to Another Iterable",
      blurb: "Flatten a nested iterable into a single generator with yield*.",
      xp: 30,
      content: `# yield* — Delegating to Another Iterable

\`yield*\` forwards every value from *another* iterable into the current
generator.  It is the generator equivalent of spreading an inner array.

\`\`\`js
function* concat(...iterables) {
  for (const it of iterables) {
    yield* it;          // delegate — yield each item from it
  }
}

[...concat([1,2], [3,4])]; // [1, 2, 3, 4]
\`\`\`

\`yield*\` also works with other generators, enabling elegant recursive
decomposition.

## Your task

Write a generator function \`flatten(arr)\` that yields every leaf value from
a **nested array of any depth**, using \`yield*\` recursively.

Example: \`[...flatten([1, [2, [3, 4]], 5])]\` → \`[1, 2, 3, 4, 5]\``,
      starterCode: `function* flatten(arr) {
  // yield leaf values; recurse into nested arrays with yield*
}
`,
      solution: `function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}`,
      tests: [
        {
          name: "flattens two levels",
          code: `assertEquals(JSON.stringify([...flatten([1,[2,[3,4]],5])]), JSON.stringify([1,2,3,4,5]));`,
        },
        {
          name: "flat array unchanged",
          code: `assertEquals(JSON.stringify([...flatten([1,2,3])]), JSON.stringify([1,2,3]));`,
        },
        {
          name: "empty array",
          code: `assertEquals(JSON.stringify([...flatten([])]), JSON.stringify([]));`,
        },
      ],
      hints: [
        "Loop over each item; if it's an array use `yield* flatten(item)`, otherwise `yield item`.",
      ],
    },

    // ─── Lesson 5: Two-way messaging ─────────────────────────────────────────
    {
      slug: "two-way-messaging",
      title: "Two-Way Messaging with next(value)",
      blurb: "Pass a value into a paused generator via next(value).",
      xp: 45,
      content: `# Two-Way Messaging with next(value)

\`yield\` is **two-directional**.  The value you pass to \`.next(value)\` becomes
the *result* of the \`yield\` expression inside the generator:

\`\`\`js
function* adder() {
  let total = 0;
  while (true) {
    const n = yield total;   // n receives whatever next(n) passes in
    total += n;
  }
}

const gen = adder();
gen.next();     // { value: 0, done: false }  — prime the generator
gen.next(10);   // { value: 10, done: false }
gen.next(5);    // { value: 15, done: false }
\`\`\`

**Important:** the very first \`.next()\` runs the generator up to the first
\`yield\` and the value you pass to it is discarded (there is no \`yield\`
expression waiting yet).  That first call is called **priming** the generator.

## Your task

Write a generator function \`accumulator()\` that:
1. Starts with an internal \`total\` of \`0\`.
2. Each time it is resumed with \`.next(n)\`, adds \`n\` to \`total\` and yields
   the new \`total\`.
3. Runs forever (no \`return\`).

Then write \`runAccumulator(values)\` that:
1. Creates an \`accumulator()\` generator.
2. Primes it with one \`.next()\` call (no argument).
3. Feeds each number in \`values\` in order via \`.next(n)\`.
4. Returns an array of the yielded totals (one per value in \`values\`).`,
      starterCode: `function* accumulator() {
  // maintain a running total; yield it after each next(n)
}

function runAccumulator(values) {
  // prime, then feed each value, collect yielded totals
}
`,
      solution: `function* accumulator() {
  let total = 0;
  while (true) {
    const n = yield total;
    total += n;
  }
}

function runAccumulator(values) {
  const gen = accumulator();
  gen.next(); // prime — discard the initial 0
  const results = [];
  for (const n of values) {
    results.push(gen.next(n).value);
  }
  return results;
}`,
      tests: [
        {
          name: "running totals [1,2,3] → [1,3,6]",
          code: `assertEquals(JSON.stringify(runAccumulator([1,2,3])), JSON.stringify([1,3,6]));`,
        },
        {
          name: "single value [10] → [10]",
          code: `assertEquals(JSON.stringify(runAccumulator([10])), JSON.stringify([10]));`,
        },
        {
          name: "empty → []",
          code: `assertEquals(JSON.stringify(runAccumulator([])), JSON.stringify([]));`,
        },
        {
          name: "negative values [5,-3,8] → [5,2,10]",
          code: `assertEquals(JSON.stringify(runAccumulator([5,-3,8])), JSON.stringify([5,2,10]));`,
        },
      ],
      hints: [
        "Remember to *prime* the generator with one `gen.next()` before feeding values.",
        "Inside the generator: `const n = yield total;` — then update total with `total += n`.",
      ],
    },

    // ─── Lesson 6: return() and throw() ──────────────────────────────────────
    {
      slug: "generator-control",
      title: "return() and throw() — Controlling a Generator",
      blurb: "Terminate or inject errors into a running generator.",
      xp: 35,
      content: `# return() and throw() — Controlling a Generator

Generators expose two extra control methods beyond \`.next()\`:

| Method | Effect |
|---|---|
| \`.return(value)\` | Terminates the generator, returning \`{ value, done: true }\` |
| \`.throw(error)\` | Injects an exception at the current \`yield\` point |

\`\`\`js
function* nums() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    yield "caught: " + e.message;
  }
}

const g = nums();
g.next();          // { value: 1, done: false }
g.throw(new Error("oops")); // { value: "caught: oops", done: false }
g.next();          // { value: undefined, done: true }
\`\`\`

\`.return()\` is how \`for…of\` and \`try/finally\` clean up generators early
(e.g., when you \`break\` out of a loop).

## Your task

Write a generator function \`guarded()\` that:
1. Yields \`"start"\`.
2. Yields \`"middle"\`.
3. Yields \`"end"\`.
4. Has a \`try/catch\` around the yields so that if \`.throw()\` is called while
   paused at \`"middle"\`, the generator yields \`"error-handled"\` instead and
   then finishes.

Then write \`runGuarded(throwAtMiddle)\`:
- Creates a \`guarded()\` generator.
- Collects \`"start"\` and \`"middle"\` via two \`.next()\` calls.
- If \`throwAtMiddle\` is \`true\`, calls \`.throw(new Error("boom"))\` and collects
  its yielded value; then checks \`done\` to stop.
- If \`throwAtMiddle\` is \`false\`, just collects \`"end"\`.
- Returns the array of collected values.`,
      starterCode: `function* guarded() {
  // yield "start", "middle", "end"
  // catch any thrown error and yield "error-handled"
}

function runGuarded(throwAtMiddle) {
  // drive the generator per the spec above
}
`,
      solution: `function* guarded() {
  yield "start";
  try {
    yield "middle";
    yield "end";
  } catch (e) {
    yield "error-handled";
  }
}

function runGuarded(throwAtMiddle) {
  const gen = guarded();
  const results = [];
  results.push(gen.next().value);   // "start"
  results.push(gen.next().value);   // "middle"
  if (throwAtMiddle) {
    const { value, done } = gen.throw(new Error("boom"));
    results.push(value);            // "error-handled"
    // done is true here, nothing more to collect
  } else {
    results.push(gen.next().value); // "end"
  }
  return results;
}`,
      tests: [
        {
          name: "happy path → [start, middle, end]",
          code: `assertEquals(JSON.stringify(runGuarded(false)), JSON.stringify(["start","middle","end"]));`,
        },
        {
          name: "throw path → [start, middle, error-handled]",
          code: `assertEquals(JSON.stringify(runGuarded(true)), JSON.stringify(["start","middle","error-handled"]));`,
        },
        {
          name: "generator is done after throw is caught",
          code: `const g = guarded(); g.next(); g.next(); g.throw(new Error("x")); assertEquals(g.next().done, true);`,
        },
      ],
      hints: [
        "Wrap only `yield 'middle'` and `yield 'end'` inside the `try` block so that `throw()` is caught there.",
      ],
    },

    // ─── Lesson 7: Infinite lazy sequences ───────────────────────────────────
    {
      slug: "lazy-sequences",
      title: "Lazy Sequences — Infinite Ranges and Take",
      blurb: "Generate values on-demand instead of building giant arrays.",
      xp: 40,
      content: `# Lazy Sequences — Generate Values on Demand

Because generators pause between yields, they can represent **infinite
sequences** without ever allocating a large array.  You only compute values
you actually consume.

\`\`\`js
function* naturals(start = 0) {
  let n = start;
  while (true) yield n++;
}

// Take the first 5 even numbers squared:
function* filter(it, pred) {
  for (const v of it) if (pred(v)) yield v;
}
function* map(it, fn) {
  for (const v of it) yield fn(v);
}
function take(it, n) {
  const out = [];
  for (const v of it) { out.push(v); if (out.length === n) break; }
  return out;
}

take(map(filter(naturals(), (n) => n % 2 === 0), (n) => n * n), 5);
// [0, 4, 16, 36, 64]
\`\`\`

## Your task

Write three generator utility functions and one plain function:

1. \`naturals(start = 0)\` — yields \`start, start+1, start+2, …\` forever.
2. \`mapGen(it, fn)\` — yields \`fn(v)\` for every \`v\` in iterable \`it\`.
3. \`filterGen(it, pred)\` — yields values from \`it\` where \`pred(v)\` is truthy.
4. \`take(it, n)\` — returns a plain array of the first \`n\` values from \`it\`.`,
      starterCode: `function* naturals(start = 0) {
  // yield start, start+1, start+2, … forever
}

function* mapGen(it, fn) {
  // yield fn(v) for each v in it
}

function* filterGen(it, pred) {
  // yield v for each v in it where pred(v) is true
}

function take(it, n) {
  // return array of first n values from it
}
`,
      solution: `function* naturals(start = 0) {
  let n = start;
  while (true) yield n++;
}

function* mapGen(it, fn) {
  for (const v of it) yield fn(v);
}

function* filterGen(it, pred) {
  for (const v of it) if (pred(v)) yield v;
}

function take(it, n) {
  const out = [];
  for (const v of it) {
    out.push(v);
    if (out.length === n) break;
  }
  return out;
}`,
      tests: [
        {
          name: "naturals from 0: first 5",
          code: `assertEquals(JSON.stringify(take(naturals(), 5)), JSON.stringify([0,1,2,3,4]));`,
        },
        {
          name: "naturals from 10: first 3",
          code: `assertEquals(JSON.stringify(take(naturals(10), 3)), JSON.stringify([10,11,12]));`,
        },
        {
          name: "mapGen doubles",
          code: `assertEquals(JSON.stringify(take(mapGen(naturals(1), n => n * 2), 4)), JSON.stringify([2,4,6,8]));`,
        },
        {
          name: "filterGen keeps evens",
          code: `assertEquals(JSON.stringify(take(filterGen(naturals(), n => n % 2 === 0), 4)), JSON.stringify([0,2,4,6]));`,
        },
        {
          name: "chained: first 4 squares of odd naturals from 1",
          code: `const odds = filterGen(naturals(1), n => n % 2 !== 0); const sq = mapGen(odds, n => n * n); assertEquals(JSON.stringify(take(sq, 4)), JSON.stringify([1,9,25,49]));`,
        },
      ],
      hints: [
        "A `while (true)` loop with `yield` inside is the standard pattern for an infinite generator.",
        "`take` needs a `break` inside the loop once `out.length === n` — otherwise the infinite generator never stops.",
      ],
    },

    // ─── Lesson 8: Async generators ──────────────────────────────────────────
    {
      slug: "async-generators",
      title: "Async Generators and for-await-of",
      blurb: "Stream async data lazily with async function* and for-await-of.",
      xp: 50,
      content: `# Async Generators and for-await-of

An **async generator** combines \`async function*\` with \`yield\`.  Each call to
\`.next()\` returns a **Promise** that resolves to \`{ value, done }\`.  The
\`for await…of\` loop handles this automatically.

\`\`\`js
async function* delayedNums(nums, ms) {
  for (const n of nums) {
    await new Promise((r) => setTimeout(r, ms)); // simulate I/O
    yield n;
  }
}

// Consuming:
async function run() {
  const results = [];
  for await (const n of delayedNums([1, 2, 3], 10)) {
    results.push(n);
  }
  return results; // [1, 2, 3]
}
\`\`\`

Async generators are the natural way to model **paginated APIs**, **WebSocket
streams**, and **chunked file reads** — all lazy, all back-pressured.

## Your task

Write an async generator \`asyncMap(it, asyncFn)\` that:
1. Iterates over any **sync** iterable \`it\`.
2. \`await\`s \`asyncFn(v)\` for each value \`v\`.
3. Yields the resolved result.

Then write \`collectAsync(asyncIt)\` that collects all values from an async
iterable into a plain array (using \`for await…of\`) and returns a Promise.`,
      starterCode: `async function* asyncMap(it, asyncFn) {
  // await asyncFn(v) for each v in it and yield the result
}

async function collectAsync(asyncIt) {
  // collect all values from asyncIt into an array
}
`,
      solution: `async function* asyncMap(it, asyncFn) {
  for (const v of it) {
    yield await asyncFn(v);
  }
}

async function collectAsync(asyncIt) {
  const out = [];
  for await (const v of asyncIt) {
    out.push(v);
  }
  return out;
}`,
      tests: [
        {
          name: "asyncMap with identity async fn",
          code: `const result = await collectAsync(asyncMap([1,2,3], async v => v)); assertEquals(JSON.stringify(result), JSON.stringify([1,2,3]));`,
        },
        {
          name: "asyncMap doubles each value asynchronously",
          code: `const result = await collectAsync(asyncMap([1,2,3], async v => v * 2)); assertEquals(JSON.stringify(result), JSON.stringify([2,4,6]));`,
        },
        {
          name: "asyncMap over empty iterable",
          code: `const result = await collectAsync(asyncMap([], async v => v)); assertEquals(JSON.stringify(result), JSON.stringify([]));`,
        },
      ],
      hints: [
        "Inside the `for…of` loop, `yield await asyncFn(v)` — the `await` resolves the promise before yielding.",
        "`collectAsync` just needs `for await (const v of asyncIt)` and pushes each `v` into an array.",
      ],
    },

    // ─── Lesson 9: Putting it all together ───────────────────────────────────
    {
      slug: "generator-pipeline",
      title: "Generator Pipeline — Putting It All Together",
      blurb: "Chain generators into a lazy, memory-efficient data pipeline.",
      xp: 50,
      content: `# Generator Pipeline

Generators compose naturally into **pipelines**: each stage is a generator that
consumes another iterable and yields transformed values.  Nothing is computed
until the terminal stage pulls a value.

\`\`\`
source → mapGen → filterGen → take  →  result[]
(lazy)   (lazy)   (lazy)    (eager, n items)
\`\`\`

This pattern is used in RxJS, Node.js streams, and many data-processing
libraries.

## Your task

Write \`pipeline(source, ...stages)\` where:
- \`source\` is any iterable.
- Each element of \`stages\` is a function \`(iterable) => iterable\` (i.e. a
  generator wrapper that accepts an iterable and returns a new iterable).
- \`pipeline\` threads \`source\` through each stage left-to-right and returns the
  final iterable.

Example usage (using the \`mapGen\` and \`filterGen\` helpers you wrote earlier,
which are available in scope):

\`\`\`js
const result = [
  ...pipeline(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    (it) => filterGen(it, (n) => n % 2 === 0),  // evens: 2,4,6,8,10
    (it) => mapGen(it, (n) => n * n),            // squares: 4,16,36,64,100
  ),
];
// [4, 16, 36, 64, 100]
\`\`\``,
      starterCode: `// mapGen and filterGen are available from scope (already defined)
function* mapGen(it, fn) { for (const v of it) yield fn(v); }
function* filterGen(it, pred) { for (const v of it) if (pred(v)) yield v; }

function pipeline(source, ...stages) {
  // thread source through each stage
}
`,
      solution: `function* mapGen(it, fn) { for (const v of it) yield fn(v); }
function* filterGen(it, pred) { for (const v of it) if (pred(v)) yield v; }

function pipeline(source, ...stages) {
  return stages.reduce((it, stage) => stage(it), source);
}`,
      tests: [
        {
          name: "evens then squared from 1..10",
          code: `const result = [...pipeline([1,2,3,4,5,6,7,8,9,10], it => filterGen(it, n => n % 2 === 0), it => mapGen(it, n => n * n))]; assertEquals(JSON.stringify(result), JSON.stringify([4,16,36,64,100]));`,
        },
        {
          name: "no stages — source passes through unchanged",
          code: `assertEquals(JSON.stringify([...pipeline([1,2,3])]), JSON.stringify([1,2,3]));`,
        },
        {
          name: "single map stage",
          code: `assertEquals(JSON.stringify([...pipeline([1,2,3], it => mapGen(it, n => n + 10))]), JSON.stringify([11,12,13]));`,
        },
        {
          name: "empty source",
          code: `assertEquals(JSON.stringify([...pipeline([], it => mapGen(it, n => n * 2))]), JSON.stringify([]));`,
        },
      ],
      hints: [
        "`stages.reduce((it, stage) => stage(it), source)` threads `source` through each stage in order.",
      ],
      explanation: `## Why this works

\`Array.prototype.reduce\` is perfect here: starting from \`source\`, it applies
each stage function, passing the output of one stage as input to the next.
Because every stage is a generator, **nothing is evaluated** until the final
\`[...]\` spread pulls values through the entire pipeline.  This is the same
principle used by RxJS operators, Python's \`itertools\`, and Node.js Transform
streams — lazy composition with zero intermediate arrays.`,
    },
  ],
};
