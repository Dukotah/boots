import type { Module } from "./types";

// Intermediate JavaScript — unlocks after "JavaScript Foundations". Every
// exercise is synchronous so it grades on the existing in-browser worker.
//
// Entry pacing: a learner arriving from Foundations meets modern syntax one
// feature at a time. Lesson 1 is a no-typing "predict the output" quiz so they
// READ modern syntax before writing it; the first write task is a tiny one-line
// arrow function; every code lesson ships drag-in `blocks` and step-by-step
// `hintCode`; and any topic that bundled two new syntaxes (spread + rest,
// optional-chaining + nullish) is split so each idea lands on its own. The real
// depth — closures, recursion, classes, error handling — is unchanged.
export const javascriptNext: Module = {
  slug: "javascript-next",
  title: "JavaScript: Next Steps",
  description:
    "Go beyond the basics: modern syntax, closures, higher-order functions, recursion, classes, and writing resilient code.",
  emoji: "🟦",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline:
    "Intermediate JavaScript: arrow functions, destructuring, spread/rest, closures, higher-order functions, recursion, error handling, and classes.",
  keywords: [
    "intermediate javascript",
    "modern javascript",
    "es6 javascript",
    "arrow functions",
    "destructuring",
    "spread and rest",
    "optional chaining",
    "javascript closures",
  ],
  lessons: [
    // ── 1. Cold open: read modern syntax, no typing ──
    {
      slug: "predict-modern-js",
      title: "Predict the Output",
      blurb: "Read modern JavaScript before you write any.",
      xp: 15,
      kind: "quiz",
      content: `# Predict the Output

Welcome to Next Steps. 👋 You already know functions, variables, and arrays from
Foundations — this course adds the **modern syntax** professional JavaScript is
written in, one feature at a time.

Before you type anything, let's *read* a few modern snippets and predict what they
do. Reading code fluently is half the job.

### Arrow functions
An **arrow function** is a shorter way to write a function. These two are the same:

\`\`\`js
const double = function (x) { return x * 2; };
const double = (x) => x * 2;   // arrow: no "function", no "return" needed
\`\`\`

When the body is a single expression, the arrow **returns it automatically** — no
\`return\`, no braces.

### Destructuring
**Destructuring** unpacks values out of an object (or array) into variables:

\`\`\`js
const user = { name: "Ada", city: "London" };
const { name } = user;   // name === "Ada"
\`\`\`

Read each snippet below and predict the result. 👇`,
      questions: [
        {
          prompt:
            "What does this arrow function return?\n\n```js\nconst inc = (n) => n + 1;\ninc(4);\n```",
          options: ["4", "5", "undefined"],
          answer: 1,
          explanation:
            "A single-expression arrow returns its body automatically, so `inc(4)` is `4 + 1` = `5`.",
        },
        {
          prompt:
            "After destructuring, what is `city`?\n\n```js\nconst u = { name: \"Ada\", city: \"London\" };\nconst { city } = u;\n```",
          options: ['"Ada"', '"London"', "undefined"],
          answer: 1,
          explanation:
            "`const { city } = u` pulls the `city` property out of the object — `\"London\"`.",
        },
        {
          prompt:
            "Which arrow function is equivalent to this?\n\n```js\nfunction triple(x) { return x * 3; }\n```",
          options: [
            "const triple = (x) => x * 3;",
            "const triple = (x) => { x * 3; };",
            "const triple = x * 3 => (x);",
          ],
          answer: 0,
          explanation:
            "Option B uses braces but no `return`, so it returns `undefined`. The brace-less arrow `(x) => x * 3` returns the expression directly.",
        },
      ],
    },

    // ── 2. First WRITE task: tiny one-line arrow function ──
    {
      slug: "arrow-functions",
      title: "Arrow Functions",
      blurb: "Your first modern syntax — a one-line function.",
      xp: 20,
      content: `# Arrow Functions

Time to write your first modern syntax. This is the smallest possible step: a
single-line arrow function.

A brace-less arrow returns its expression automatically:

\`\`\`js
const square = (x) => x * x;   // returns x * x, no "return" keyword
square(5); // 25
\`\`\`

## Your task
Complete \`half\` so it returns its argument divided by 2. Just fill in the one
expression after the arrow — no \`return\`, no braces needed.`,
      starterCode: `const half = (x) => ;
`,
      blocks: ["const half = ", "(x)", " => ", "x / 2", ";"],
      solution: `const half = (x) => x / 2;`,
      tests: [
        { name: "half(10) === 5", code: `assertEquals(half(10), 5);` },
        { name: "half(7) === 3.5", code: `assertEquals(half(7), 3.5);` },
        { name: "half(0) === 0", code: `assertEquals(half(0), 0);` },
      ],
      hints: [
        "The body is a single expression — write `x / 2` right after the `=>`.",
        "No braces and no `return`: `const half = (x) => x / 2;`.",
      ],
      hintCode: [`const half = (x) => x / 2;`, undefined],
      explanation:
        "Nice — a single-expression arrow returns its body automatically, so `x / 2` is handed straight back.",
    },

    // ── 3. Destructuring (objects) ──
    {
      slug: "destructuring",
      title: "Destructuring",
      blurb: "Pull values straight out of objects.",
      xp: 25,
      content: `# Destructuring

**Destructuring** lets you unpack values from an object into variables in one
line — cleaner than reaching in with \`.\` repeatedly.

\`\`\`js
const user = { first: "Ada", last: "Lovelace" };
const { first, last } = user;
first; // "Ada"
\`\`\`

You can even destructure right in the **parameter list**, so the function receives
already-unpacked values:

\`\`\`js
function greet({ first }) {
  return "Hi " + first;
}
\`\`\`

## Your task
Write \`fullName(user)\` where \`user\` has \`first\` and \`last\` keys, and return
\`"first last"\` (a single space between them). Use destructuring.`,
      starterCode: `function fullName(user) {
  // destructure first and last, then return "first last"
}
`,
      blocks: ["function fullName(", "{ first, last }", ") {", "return first + \" \" + last;", "}"],
      solution: `function fullName({ first, last }) {
  return first + " " + last;
}`,
      tests: [
        {
          name: "joins first and last",
          code: `assertEquals(fullName({ first: "Ada", last: "Lovelace" }), "Ada Lovelace");`,
        },
        {
          name: "works with other names",
          code: `assertEquals(fullName({ first: "Boots", last: "Dog" }), "Boots Dog");`,
        },
      ],
      hints: [
        "Destructure in the parameter list: `function fullName({ first, last })`.",
        'Then join them: `return first + " " + last;` — note the single space.',
      ],
      hintCode: [
        `function fullName({ first, last }) {\n  // now combine first and last\n}\n`,
        `function fullName({ first, last }) {\n  return first + " " + last;\n}`,
      ],
      explanation:
        "Destructuring in the parameter list unpacks `first` and `last` for you, so the body stays clean.",
    },

    // ── 4. Default parameters ──
    {
      slug: "default-params",
      title: "Default Parameters",
      blurb: "Give a parameter a fallback value.",
      xp: 25,
      content: `# Default Parameters

A **default parameter** supplies a value to use when the caller leaves an argument
out (so it would otherwise be \`undefined\`):

\`\`\`js
function greet(name = "friend") {
  return "Hi " + name;
}
greet("Ada"); // "Hi Ada"
greet();      // "Hi friend"
\`\`\`

The default kicks in only when the argument is missing or \`undefined\`.

## Your task
Write \`greet(name)\` that returns \`"Hello, " + name + "!"\`. If no name is passed,
use \`"World"\` so \`greet()\` returns \`"Hello, World!"\`.`,
      starterCode: `function greet(name) {
  // give name a default of "World", then return the greeting
}
`,
      blocks: ['function greet(name = "World") {', 'return "Hello, " + name + "!";', "}"],
      solution: `function greet(name = "World") {
  return "Hello, " + name + "!";
}`,
      tests: [
        {
          name: "uses the name passed in",
          code: `assertEquals(greet("Ada"), "Hello, Ada!");`,
        },
        {
          name: "falls back to World",
          code: `assertEquals(greet(), "Hello, World!");`,
        },
      ],
      hints: [
        'Put the fallback in the parameter list: `function greet(name = "World")`.',
        'Then build the string: `return "Hello, " + name + "!";`.',
      ],
      hintCode: [
        `function greet(name = "World") {\n  // now return the greeting\n}\n`,
        `function greet(name = "World") {\n  return "Hello, " + name + "!";\n}`,
      ],
      explanation:
        '`name = "World"` only applies when the argument is missing, so `greet()` greets the World while `greet("Ada")` greets Ada.',
    },

    // ── 5. Rest parameters (gather) — half of the old spread/rest ──
    {
      slug: "rest-params",
      title: "Rest Parameters",
      blurb: "Gather any number of arguments into an array.",
      xp: 30,
      content: `# Rest Parameters

The \`...\` in a **parameter list** gathers every remaining argument into a single
array. That lets a function accept *any number* of arguments:

\`\`\`js
function count(...items) {
  return items.length; // items is a real array
}
count(1, 2, 3); // 3
count();        // 0
\`\`\`

(We'll meet the *other* job of \`...\` — **spread** — in the next lesson.)

## Your task
Write \`sumAll\` that accepts **any number** of numbers using a rest parameter and
returns their total. With no arguments it returns \`0\`.`,
      starterCode: `function sumAll() {
  // use a rest parameter to accept any number of numbers, then total them
}
`,
      blocks: ["function sumAll(", "...nums", ") {", "return nums.reduce((total, n) => total + n, 0);", "}"],
      solution: `function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}`,
      tests: [
        { name: "sumAll(1, 2, 3) === 6", code: `assertEquals(sumAll(1, 2, 3), 6);` },
        { name: "sumAll() === 0", code: `assertEquals(sumAll(), 0);` },
        { name: "sumAll(10, -4) === 6", code: `assertEquals(sumAll(10, -4), 6);` },
      ],
      hints: [
        "Collect the arguments with a rest parameter: `function sumAll(...nums)`.",
        "`nums` is a real array, so `nums.reduce((total, n) => total + n, 0)` totals it (starting at 0 handles the empty case).",
      ],
      hintCode: [
        `function sumAll(...nums) {\n  // nums is now an array — total it up\n}\n`,
        `function sumAll(...nums) {\n  return nums.reduce((total, n) => total + n, 0);\n}`,
      ],
      explanation:
        "A rest parameter packs the arguments into the array `nums`; `reduce` with a starting value of `0` totals them (and returns `0` when empty).",
    },

    // ── 6. Spread (expand) — the other half ──
    {
      slug: "spread",
      title: "Spread",
      blurb: "Expand an array out into its pieces.",
      xp: 30,
      content: `# Spread

That same \`...\` does the **opposite** job when used on an *existing* array: it
**spreads** the array out into individual pieces.

\`\`\`js
const nums = [1, 2, 3];
Math.max(...nums);       // same as Math.max(1, 2, 3)
const more = [0, ...nums]; // [0, 1, 2, 3] — copies nums in
\`\`\`

Spreading into a new array is the idiomatic way to **copy** an array without
mutating the original.

## Your task
Write \`concatAll(a, b)\` that returns a **new** array containing every element of
\`a\` followed by every element of \`b\`. Use spread (don't mutate the inputs).`,
      starterCode: `function concatAll(a, b) {
  // return a new array: all of a, then all of b
}
`,
      blocks: ["function concatAll(a, b) {", "return [", "...a", ", ", "...b", "];", "}"],
      solution: `function concatAll(a, b) {
  return [...a, ...b];
}`,
      tests: [
        {
          name: "joins two arrays",
          code: `assertEquals(concatAll([1, 2], [3, 4]), [1, 2, 3, 4]);`,
        },
        {
          name: "handles empties",
          code: `assertEquals(concatAll([], [9]), [9]);`,
        },
        {
          name: "does not mutate inputs",
          code: `const a = [1]; const b = [2]; concatAll(a, b); assertEquals(a, [1]); assertEquals(b, [2]);`,
        },
      ],
      hints: [
        "Build a brand-new array literal with `[ ... ]`.",
        "Spread both inputs into it, in order: `return [...a, ...b];`.",
      ],
      hintCode: [
        `function concatAll(a, b) {\n  return [/* spread a, then b */];\n}\n`,
        `function concatAll(a, b) {\n  return [...a, ...b];\n}`,
      ],
      explanation:
        "Spreading both arrays into a fresh `[ ]` literal builds a new array and leaves the originals untouched.",
    },

    // ── 7. Optional chaining — half of old optional-chaining lesson ──
    {
      slug: "optional-chaining",
      title: "Optional Chaining",
      blurb: "Reach into nested data without crashing.",
      xp: 30,
      content: `# Optional Chaining

Reaching into nested objects crashes if a link in the chain is missing
(\`Cannot read properties of undefined\`). The optional-chaining operator \`?.\`
short-circuits to \`undefined\` instead of throwing:

\`\`\`js
const a = {};
a.address.city;   // 💥 throws — a.address is undefined
a?.address?.city; // ✅ undefined — stops safely
\`\`\`

(Next we'll add \`??\` to swap that \`undefined\` for a real fallback.)

## Your task
Write \`getCity(user)\` that returns \`user.address.city\` when it exists, and
\`undefined\` (without crashing) when \`address\` is missing. Use \`?.\`.`,
      starterCode: `function getCity(user) {
  // safely reach user.address.city with optional chaining
}
`,
      blocks: ["function getCity(user) {", "return user", "?.address", "?.city", ";", "}"],
      solution: `function getCity(user) {
  return user?.address?.city;
}`,
      tests: [
        {
          name: "nested city",
          code: `assertEquals(getCity({ address: { city: "NYC" } }), "NYC");`,
        },
        {
          name: "missing address → undefined, no crash",
          code: `assertEquals(getCity({}), undefined);`,
        },
        {
          name: "null user → undefined, no crash",
          code: `assertEquals(getCity(null), undefined);`,
        },
      ],
      hints: [
        "Put `?.` before each step that might be missing: `user?.address`.",
        "Chain it all the way down: `return user?.address?.city;`.",
      ],
      hintCode: [
        `function getCity(user) {\n  return user?.address /* ...?.city */;\n}\n`,
        `function getCity(user) {\n  return user?.address?.city;\n}`,
      ],
      explanation:
        "Each `?.` checks the left side first; if it's `null`/`undefined` the whole chain short-circuits to `undefined` instead of throwing.",
    },

    // ── 8. Nullish coalescing — the fallback half ──
    {
      slug: "nullish-coalescing",
      title: "Nullish Coalescing",
      blurb: "Supply a fallback for null or undefined.",
      xp: 30,
      content: `# Nullish Coalescing

The nullish-coalescing operator \`??\` returns its right side **only** when the
left is \`null\` or \`undefined\`:

\`\`\`js
undefined ?? "Unknown"; // "Unknown"
0 ?? "Unknown";          // 0  ← important: 0 is kept!
"" ?? "Unknown";         // "" ← kept too
\`\`\`

That's why \`??\` is safer than \`||\` for defaults: \`||\` would wrongly replace
\`0\` or \`""\`, but \`??\` only fills in for *nullish* values.

Pair it with the \`?.\` you just learned to read nested data **and** supply a
fallback in one expression.

## Your task
Write \`getCity(user)\` that returns \`user.address.city\` if present, otherwise the
string \`"Unknown"\`. Combine \`?.\` and \`??\`.`,
      starterCode: `function getCity(user) {
  // reach the city with ?., then fall back to "Unknown" with ??
}
`,
      blocks: ["function getCity(user) {", "return user?.address?.city", " ?? ", '"Unknown"', ";", "}"],
      solution: `function getCity(user) {
  return user?.address?.city ?? "Unknown";
}`,
      tests: [
        {
          name: "nested city",
          code: `assertEquals(getCity({ address: { city: "NYC" } }), "NYC");`,
        },
        { name: "missing address", code: `assertEquals(getCity({}), "Unknown");` },
        { name: "null user", code: `assertEquals(getCity(null), "Unknown");` },
      ],
      hints: [
        "Start with the safe lookup from the last lesson: `user?.address?.city`.",
        'Add a fallback on the right of `??`: `... ?? "Unknown"`.',
      ],
      hintCode: [
        `function getCity(user) {\n  return user?.address?.city /* ?? fallback */;\n}\n`,
        `function getCity(user) {\n  return user?.address?.city ?? "Unknown";\n}`,
      ],
      explanation:
        "`?.` keeps the lookup from crashing and `??` swaps the resulting `undefined` for `\"Unknown\"` — without clobbering legit falsy values like `0` or `\"\"`.",
    },

    // ── 9. Closures ──
    {
      slug: "closures",
      title: "Closures",
      blurb: "Functions remember the scope they were born in.",
      xp: 35,
      content: `# Closures

A **closure** is a function that "remembers" variables from where it was created,
even after that outer function has returned. It's the foundation of private state
in JavaScript.

\`\`\`js
function makeAdder(x) {
  return (y) => x + y; // remembers x
}
const add10 = makeAdder(10);
add10(5); // 15
\`\`\`

## Your task
Write \`makeCounter\` that returns a **function**. Each time that returned function
is called it returns the next number, starting at \`1\` (so \`1\`, then \`2\`, then
\`3\`…). Two separate counters must not share state.`,
      starterCode: `function makeCounter() {
  // return a function that returns 1, then 2, then 3, ... on each call
}
`,
      blocks: ["function makeCounter() {", "let count = 0;", "return function () {", "count += 1;", "return count;", "};", "}"],
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
          code: `const a = makeCounter(); const b = makeCounter(); a(); a(); assertEquals(b(), 1, "each counter keeps its own count");`,
        },
      ],
      hints: [
        "Declare `let count = 0;` *outside* the inner function so it survives between calls.",
        "Return a function that does `count += 1;` then `return count;` — each `makeCounter()` call gets its own `count`.",
      ],
      hintCode: [
        `function makeCounter() {\n  let count = 0;\n  // return a function that bumps and returns count\n}\n`,
        `function makeCounter() {\n  let count = 0;\n  return function () {\n    count += 1;\n    return count;\n  };\n}`,
      ],
      explanation:
        "The inner function closes over `count`. Each call to `makeCounter()` creates a fresh `count`, so the two counters never share state.",
    },

    // ── 10. Higher-order functions ──
    {
      slug: "higher-order-functions",
      title: "Higher-Order Functions",
      blurb: "Functions that make functions.",
      xp: 35,
      content: `# Higher-Order Functions

A **higher-order function** either takes a function as an argument or **returns**
one. Returning a customized function is a powerful, reusable pattern — and now you
can write it compactly with the arrow syntax from lesson 2.

\`\`\`js
const greaterThan = (n) => (x) => x > n;
const over18 = greaterThan(18);
over18(21); // true
\`\`\`

## Your task
Write \`multiplier(n)\` that **returns a function**. That returned function takes a
number and multiplies it by \`n\`.`,
      starterCode: `function multiplier(n) {
  // return a function that multiplies its argument by n
}
`,
      blocks: ["function multiplier(n) {", "return function (x) {", "return x * n;", "};", "}"],
      solution: `function multiplier(n) {
  return function (x) {
    return x * n;
  };
}`,
      tests: [
        {
          name: "multiplier(3)(5) === 15",
          code: `const triple = multiplier(3); assertEquals(triple(5), 15);`,
        },
        {
          name: "multiplier(10) works",
          code: `const tenx = multiplier(10); assertEquals(tenx(0), 0); assertEquals(tenx(4), 40);`,
        },
      ],
      hints: [
        "`multiplier` should `return` a function, not a number.",
        "The inner function captures `n`: `return function (x) { return x * n; };` (or `(x) => x * n`).",
      ],
      hintCode: [
        `function multiplier(n) {\n  return function (x) {\n    // multiply x by n\n  };\n}\n`,
        `function multiplier(n) {\n  return function (x) {\n    return x * n;\n  };\n}`,
      ],
      explanation:
        "The returned function closes over `n`, so `multiplier(3)` hands back a tripler that remembers `n === 3`.",
    },

    // ── 11. Recursion ──
    {
      slug: "recursion",
      title: "Recursion",
      blurb: "A function that calls itself.",
      xp: 35,
      content: `# Recursion

A **recursive** function solves a problem by calling itself on a smaller piece,
until it hits a **base case** that stops the recursion.

\`\`\`js
function countdown(n) {
  if (n === 0) return;   // base case
  countdown(n - 1);      // recursive step
}
\`\`\`

## Your task
Write \`factorial(n)\` that returns \`n!\` (n × (n−1) × … × 1). By definition
\`factorial(0)\` is \`1\`. Solve it **recursively**.`,
      starterCode: `function factorial(n) {
  // base case, then recursive step
}
`,
      blocks: ["function factorial(n) {", "if (n <= 1) return 1;", "return n * factorial(n - 1);", "}"],
      solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      tests: [
        { name: "factorial(0) === 1", code: `assertEquals(factorial(0), 1);` },
        { name: "factorial(1) === 1", code: `assertEquals(factorial(1), 1);` },
        { name: "factorial(5) === 120", code: `assertEquals(factorial(5), 120);` },
      ],
      hints: [
        "Start with the base case so the recursion can stop: `if (n <= 1) return 1;`.",
        "Then the recursive step multiplies down: `return n * factorial(n - 1);`.",
      ],
      hintCode: [
        `function factorial(n) {\n  if (n <= 1) return 1;\n  // recursive step\n}\n`,
        `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
      ],
      explanation:
        "Each call multiplies `n` by the factorial of `n - 1`, and `n <= 1` stops the chain — covering both `factorial(0)` and `factorial(1)`.",
    },

    // ── 12. Error handling ──
    {
      slug: "error-handling",
      title: "Error Handling",
      blurb: "Catch failures and recover gracefully.",
      xp: 40,
      content: `# Error Handling

\`try\` / \`catch\` lets risky code fail without crashing your whole program. You
attempt something, and if it throws, you handle it.

\`\`\`js
try {
  JSON.parse(input);
} catch {
  // handle the bad input
}
\`\`\`

## Your task
Write \`safeParse(jsonString, fallback)\` that returns the parsed JSON, or returns
\`fallback\` if the string can't be parsed.`,
      starterCode: `function safeParse(jsonString, fallback) {
  // return parsed JSON, or fallback if it can't be parsed
}
`,
      blocks: ["function safeParse(jsonString, fallback) {", "try {", "return JSON.parse(jsonString);", "} catch {", "return fallback;", "}", "}"],
      solution: `function safeParse(jsonString, fallback) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}`,
      tests: [
        {
          name: "parses valid JSON",
          code: `assertEquals(safeParse('{"a":1}', null), { a: 1 });`,
        },
        {
          name: "returns fallback on bad input",
          code: `assertEquals(safeParse("not json", "oops"), "oops");`,
        },
        {
          name: "parses arrays too",
          code: `assertEquals(safeParse("[1,2]", []), [1, 2]);`,
        },
      ],
      hints: [
        "Put the risky `JSON.parse(jsonString)` inside a `try` and `return` it.",
        "In the `catch`, return the `fallback` so bad input never throws.",
      ],
      hintCode: [
        `function safeParse(jsonString, fallback) {\n  try {\n    return JSON.parse(jsonString);\n  } catch {\n    // return the fallback here\n  }\n}\n`,
        `function safeParse(jsonString, fallback) {\n  try {\n    return JSON.parse(jsonString);\n  } catch {\n    return fallback;\n  }\n}`,
      ],
      explanation:
        "If `JSON.parse` throws on malformed input, the `catch` swallows it and returns the fallback instead of crashing.",
    },

    // ── 13. Classes ──
    {
      slug: "classes",
      title: "Classes",
      blurb: "Blueprints for objects with behavior.",
      xp: 45,
      content: `# Classes

A **class** is a blueprint for creating objects that bundle data with the methods
that act on it.

\`\`\`js
class Dog {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " says woof";
  }
}
new Dog("Boots").speak(); // "Boots says woof"
\`\`\`

## Your task
Create a class \`Stack\` (last-in, first-out) with:
- \`push(x)\` — add an item
- \`pop()\` — remove **and return** the most recently added item
- a \`size\` **getter** — the current number of items`,
      starterCode: `class Stack {
  // add a constructor, push(x), pop(), and a size getter
}
`,
      blocks: ["class Stack {", "constructor() {", "this.items = [];", "}", "push(x) {", "this.items.push(x);", "}", "pop() {", "return this.items.pop();", "}", "get size() {", "return this.items.length;", "}", "}"],
      solution: `class Stack {
  constructor() {
    this.items = [];
  }
  push(x) {
    this.items.push(x);
  }
  pop() {
    return this.items.pop();
  }
  get size() {
    return this.items.length;
  }
}`,
      tests: [
        {
          name: "push / pop / size work",
          code: `const s = new Stack(); s.push(1); s.push(2); assertEquals(s.size, 2); assertEquals(s.pop(), 2); assertEquals(s.size, 1);`,
        },
        {
          name: "new stack is empty",
          code: `const s = new Stack(); assertEquals(s.size, 0);`,
        },
      ],
      hints: [
        "In the `constructor`, give each Stack its own array: `this.items = [];`.",
        "Back the methods with that array: `push`/`pop` delegate to `this.items`, and `get size()` returns `this.items.length`.",
      ],
      hintCode: [
        `class Stack {\n  constructor() {\n    this.items = [];\n  }\n  // add push, pop, and a size getter\n}\n`,
        `class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(x) {\n    this.items.push(x);\n  }\n  pop() {\n    return this.items.pop();\n  }\n  get size() {\n    return this.items.length;\n  }\n}`,
      ],
      explanation:
        "Each `new Stack()` gets its own `items` array. The methods delegate to it, and the `get size()` getter reads the length like a property: `s.size`.",
    },

    // ── 14. Searching arrays ──
    {
      slug: "array-search",
      title: "Searching Arrays",
      blurb: "find, some, and every.",
      xp: 30,
      content: `# Searching Arrays

Three array methods answer common questions:
- \`find\` — the first matching element
- \`some\` — does **any** element match?
- \`every\` — do **all** elements match?

\`\`\`js
[1, 2, 3].some((n) => n > 2);  // true
[1, 2, 3].every((n) => n > 0); // true
\`\`\`

## Your task
Write \`allPositive(nums)\` that returns \`true\` if **every** number is greater
than 0. An empty array returns \`true\`.`,
      starterCode: `function allPositive(nums) {
  // true if every number is > 0
}
`,
      blocks: ["function allPositive(nums) {", "return nums.every(", "(n) => n > 0", ");", "}"],
      solution: `function allPositive(nums) {
  return nums.every((n) => n > 0);
}`,
      tests: [
        { name: "all positive", code: `assertEquals(allPositive([1, 2, 3]), true);` },
        { name: "has a negative", code: `assertEquals(allPositive([1, -2]), false);` },
        { name: "empty → true", code: `assertEquals(allPositive([]), true);` },
      ],
      hints: [
        "`every` returns true only when the callback is true for *all* elements.",
        "Pass an arrow predicate: `nums.every((n) => n > 0)` (an empty array is vacuously true).",
      ],
      hintCode: [
        `function allPositive(nums) {\n  return nums.every(/* predicate */);\n}\n`,
        `function allPositive(nums) {\n  return nums.every((n) => n > 0);\n}`,
      ],
      explanation:
        "`every` checks all elements against the predicate and returns `true` for an empty array by definition.",
    },

    // ── 15. Sorting with a comparator ──
    {
      slug: "sorting",
      title: "Sorting with a Comparator",
      blurb: "sort() needs a compare function for numbers.",
      xp: 35,
      content: `# Sorting with a Comparator

\`.sort()\` sorts as **strings** by default (so \`[10, 2]\` becomes \`[10, 2]\`
wrong!). For numbers, pass a comparator: return negative to keep order, positive
to swap.

\`\`\`js
[3, 1, 2].sort((a, b) => a - b); // ascending
\`\`\`

\`sort\` mutates, so copy first with \`[...arr]\` — the spread you learned earlier.

## Your task
Write \`sortDesc(nums)\` returning a **new** array sorted in **descending** order.`,
      starterCode: `function sortDesc(nums) {
  // return a new array sorted high to low
}
`,
      blocks: ["function sortDesc(nums) {", "return [...nums]", ".sort(", "(a, b) => b - a", ");", "}"],
      solution: `function sortDesc(nums) {
  return [...nums].sort((a, b) => b - a);
}`,
      tests: [
        { name: "sorts descending", code: `assertEquals(sortDesc([3, 1, 2]), [3, 2, 1]);` },
        { name: "empty", code: `assertEquals(sortDesc([]), []);` },
        { name: "with duplicates", code: `assertEquals(sortDesc([5, 5, 1]), [5, 5, 1]);` },
      ],
      hints: [
        "Copy first so you don't mutate the input: `[...nums]`.",
        "Descending order swaps the comparator: `.sort((a, b) => b - a)`.",
      ],
      hintCode: [
        `function sortDesc(nums) {\n  return [...nums].sort(/* comparator */);\n}\n`,
        `function sortDesc(nums) {\n  return [...nums].sort((a, b) => b - a);\n}`,
      ],
      explanation:
        "`[...nums]` copies the array so the original isn't mutated, and `b - a` orders the copy from high to low.",
    },

    // ── 16. Iterating objects ──
    {
      slug: "object-iteration",
      title: "Iterating Objects",
      blurb: "Object.keys, values, and entries.",
      xp: 35,
      content: `# Iterating Objects

To loop over an object, turn it into arrays:
- \`Object.keys(obj)\` → the keys
- \`Object.values(obj)\` → the values
- \`Object.entries(obj)\` → \`[key, value]\` pairs

\`\`\`js
Object.values({ a: 1, b: 2 }); // [1, 2]
\`\`\`

## Your task
Write \`sumValues(obj)\` returning the sum of all the (numeric) values in the
object. An empty object sums to \`0\`.`,
      starterCode: `function sumValues(obj) {
  // sum all the values of obj
}
`,
      blocks: ["function sumValues(obj) {", "return Object.values(obj)", ".reduce((total, v) => total + v, 0)", ";", "}"],
      solution: `function sumValues(obj) {
  return Object.values(obj).reduce((total, v) => total + v, 0);
}`,
      tests: [
        { name: "three values", code: `assertEquals(sumValues({ a: 1, b: 2, c: 3 }), 6);` },
        { name: "empty → 0", code: `assertEquals(sumValues({}), 0);` },
        { name: "single", code: `assertEquals(sumValues({ x: 10 }), 10);` },
      ],
      hints: [
        "Get the values as an array first: `Object.values(obj)`.",
        "Then total them with `reduce`, starting at 0: `.reduce((total, v) => total + v, 0)`.",
      ],
      hintCode: [
        `function sumValues(obj) {\n  return Object.values(obj)/* .reduce(...) */;\n}\n`,
        `function sumValues(obj) {\n  return Object.values(obj).reduce((total, v) => total + v, 0);\n}`,
      ],
      explanation:
        "`Object.values` turns the object into an array of its values, and `reduce` with a starting `0` totals them (so an empty object is `0`).",
    },

    // ── 17. Map & Set ──
    {
      slug: "map-set-basics",
      title: "Map & Set",
      blurb: "Built-in collections for keys and uniqueness.",
      xp: 35,
      content: `# Map & Set

\`Set\` stores **unique** values; \`Map\` stores key→value pairs (with any key
type). \`new Set(array).size\` is the quickest way to count distinct items.

\`\`\`js
new Set([1, 1, 2]).size; // 2
\`\`\`

## Your task
Write \`countUnique(arr)\` returning how many **distinct** values the array
contains.`,
      starterCode: `function countUnique(arr) {
  // how many distinct values are in arr?
}
`,
      blocks: ["function countUnique(arr) {", "return new Set(arr)", ".size", ";", "}"],
      solution: `function countUnique(arr) {
  return new Set(arr).size;
}`,
      tests: [
        { name: "some duplicates", code: `assertEquals(countUnique([1, 2, 2, 3]), 3);` },
        { name: "empty → 0", code: `assertEquals(countUnique([]), 0);` },
        { name: "all same", code: `assertEquals(countUnique(["a", "a"]), 1);` },
      ],
      hints: [
        "Feeding an array to `new Set(arr)` drops duplicate values automatically.",
        "A Set's `.size` is the count of distinct values: `return new Set(arr).size;`.",
      ],
      hintCode: [
        `function countUnique(arr) {\n  return new Set(arr)/* .size */;\n}\n`,
        `function countUnique(arr) {\n  return new Set(arr).size;\n}`,
      ],
      explanation:
        "A `Set` keeps only distinct values, so `new Set(arr).size` is the count of unique items — `0` for an empty array.",
    },
  ],
};
