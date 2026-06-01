import type { Module } from "./types";

// Intermediate JavaScript — unlocks after "JavaScript Foundations". Every
// exercise is synchronous so it grades on the existing in-browser worker.
export const javascriptNext: Module = {
  slug: "javascript-next",
  title: "JavaScript: Next Steps",
  description:
    "Go beyond the basics: closures, higher-order functions, recursion, classes, and writing resilient code.",
  emoji: "🟦",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline:
    "Intermediate JavaScript: closures, higher-order functions, recursion, error handling, and classes.",
  lessons: [
    {
      slug: "closures",
      title: "Closures",
      blurb: "Functions remember the scope they were born in.",
      xp: 30,
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
    },
    {
      slug: "higher-order-functions",
      title: "Higher-Order Functions",
      blurb: "Functions that make functions.",
      xp: 30,
      content: `# Higher-Order Functions

A **higher-order function** either takes a function as an argument or **returns**
one. Returning a customized function is a powerful, reusable pattern.

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
    },
    {
      slug: "destructuring",
      title: "Destructuring",
      blurb: "Pull values straight out of objects and arrays.",
      xp: 30,
      content: `# Destructuring

**Destructuring** lets you unpack values from objects and arrays into variables
in one line — cleaner than reaching in with \`.\` or \`[ ]\` repeatedly.

\`\`\`js
const user = { first: "Ada", last: "Lovelace" };
const { first, last } = user;
first; // "Ada"
\`\`\`

## Your task
Write \`fullName(user)\` where \`user\` has \`first\` and \`last\` keys, and return
\`"first last"\` (a single space between them). Use destructuring.`,
      starterCode: `function fullName(user) {
  // destructure first and last, then return "first last"
}
`,
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
    },
    {
      slug: "spread-rest",
      title: "Spread & Rest",
      blurb: "Gather many args, or spread an array out.",
      xp: 35,
      content: `# Spread & Rest

The \`...\` syntax does two complementary jobs:
- **Rest** gathers many arguments into an array: \`function f(...args) {}\`
- **Spread** expands an array into pieces: \`Math.max(...[1, 2, 3])\`

\`\`\`js
function log(...items) {
  return items.length;
}
log(1, 2, 3); // 3
\`\`\`

## Your task
Write \`sumAll\` that accepts **any number** of numbers (using rest params) and
returns their total. With no arguments it returns \`0\`.`,
      starterCode: `function sumAll() {
  // use rest params to accept any number of numbers and return their sum
}
`,
      solution: `function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}`,
      tests: [
        { name: "sumAll(1, 2, 3) === 6", code: `assertEquals(sumAll(1, 2, 3), 6);` },
        { name: "sumAll() === 0", code: `assertEquals(sumAll(), 0);` },
        { name: "sumAll(10, -4) === 6", code: `assertEquals(sumAll(10, -4), 6);` },
      ],
    },
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
      solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      tests: [
        { name: "factorial(0) === 1", code: `assertEquals(factorial(0), 1);` },
        { name: "factorial(1) === 1", code: `assertEquals(factorial(1), 1);` },
        { name: "factorial(5) === 120", code: `assertEquals(factorial(5), 120);` },
      ],
    },
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
    },
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
    },
  ],
};
