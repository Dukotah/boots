import type { Module } from "./types";

export const javascript: Module = {
  slug: "javascript",
  title: "JavaScript Foundations",
  description:
    "The language that runs everywhere. Start from zero and write real, tested code in your browser.",
  emoji: "🟨",
  gradient: "from-yellow-400/20 to-amber-500/10",
  tagline: "Learn JavaScript from scratch with interactive, auto-graded exercises.",
  lessons: [
    {
      slug: "variables",
      title: "Variables & Values",
      blurb: "Store data in named boxes.",
      xp: 20,
      content: `# Variables & Values

A **variable** is a named box that holds a value. In modern JavaScript you create
one with \`const\` (for values that don't change) or \`let\` (for values that do).

\`\`\`js
const name = "Boots";
let level = 1;
level = 2; // ok, because it's "let"
\`\`\`

## Your task
Declare a variable called \`greeting\` and set it to the string \`"hello world"\`.`,
      starterCode: `// Declare a variable called greeting set to "hello world"
`,
      solution: `const greeting = "hello world";`,
      tests: [
        {
          name: "greeting is defined",
          code: `assert(typeof greeting !== "undefined", "greeting is not defined yet");`,
        },
        {
          name: 'greeting equals "hello world"',
          code: `assertEquals(greeting, "hello world");`,
        },
      ],
    },
    {
      slug: "functions",
      title: "Functions",
      blurb: "Reusable machines that take input and return output.",
      xp: 25,
      content: `# Functions

A **function** takes inputs (arguments) and returns an output. They're how you
package up logic to reuse it.

\`\`\`js
function double(n) {
  return n * 2;
}
double(5); // 10
\`\`\`

## Your task
Write a function \`add\` that takes two numbers and **returns** their sum.`,
      starterCode: `function add(a, b) {
  // return the sum of a and b
}
`,
      solution: `function add(a, b) {
  return a + b;
}`,
      tests: [
        { name: "add(2, 3) === 5", code: `assertEquals(add(2, 3), 5);` },
        { name: "add(-1, 1) === 0", code: `assertEquals(add(-1, 1), 0);` },
        { name: "add(10, 20) === 30", code: `assertEquals(add(10, 20), 30);` },
      ],
    },
    {
      slug: "conditionals",
      title: "Conditionals",
      blurb: "Make your code choose a path.",
      xp: 25,
      content: `# Conditionals

\`if\` / \`else\` let your program make decisions.

\`\`\`js
if (score > 100) {
  return "high";
} else {
  return "low";
}
\`\`\`

The \`%\` (modulo) operator gives the remainder of a division. \`n % 2\` is \`0\`
for even numbers.

## Your task
Write a function \`evenOrOdd\` that returns the string \`"even"\` if the number is
even, and \`"odd"\` otherwise.`,
      starterCode: `function evenOrOdd(n) {
  // return "even" or "odd"
}
`,
      solution: `function evenOrOdd(n) {
  return n % 2 === 0 ? "even" : "odd";
}`,
      tests: [
        { name: 'evenOrOdd(4) === "even"', code: `assertEquals(evenOrOdd(4), "even");` },
        { name: 'evenOrOdd(7) === "odd"', code: `assertEquals(evenOrOdd(7), "odd");` },
        { name: 'evenOrOdd(0) === "even"', code: `assertEquals(evenOrOdd(0), "even");` },
      ],
    },
    {
      slug: "arrays-loops",
      title: "Arrays & Loops",
      blurb: "Work with lists of things.",
      xp: 30,
      content: `# Arrays & Loops

An **array** is an ordered list. A **loop** lets you visit each item.

\`\`\`js
const nums = [1, 2, 3];
let total = 0;
for (const n of nums) {
  total += n;
}
// total is 6
\`\`\`

## Your task
Write a function \`sum\` that takes an array of numbers and returns their total.
An empty array should return \`0\`.`,
      starterCode: `function sum(numbers) {
  // add up every number and return the total
}
`,
      solution: `function sum(numbers) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}`,
      tests: [
        { name: "sum([1,2,3]) === 6", code: `assertEquals(sum([1, 2, 3]), 6);` },
        { name: "sum([]) === 0", code: `assertEquals(sum([]), 0);` },
        { name: "sum([10, -4, 4]) === 10", code: `assertEquals(sum([10, -4, 4]), 10);` },
      ],
    },
    {
      slug: "objects",
      title: "Objects",
      blurb: "Bundle related data together.",
      xp: 30,
      content: `# Objects

An **object** groups related values under named keys.

\`\`\`js
const user = { name: "Boots", level: 7 };
user.name; // "Boots"
\`\`\`

## Your task
Write a function \`makeUser\` that takes a \`name\` and a \`level\` and returns an
object with exactly those two keys: \`{ name, level }\`.`,
      starterCode: `function makeUser(name, level) {
  // return an object: { name, level }
}
`,
      solution: `function makeUser(name, level) {
  return { name, level };
}`,
      tests: [
        {
          name: "returns the right object",
          code: `assertEquals(makeUser("Boots", 7), { name: "Boots", level: 7 });`,
        },
        {
          name: "works with other values",
          code: `assertEquals(makeUser("Ada", 1), { name: "Ada", level: 1 });`,
        },
      ],
    },
  ],
};
