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
      hints: [
        "Start the line with `const`, then the name you want: `const greeting`.",
        "Use `=` to assign, and wrap the text in quotes: `\"hello world\"`. End with a semicolon.",
      ],
      explanation: `\`const greeting = "hello world";\` creates a constant named \`greeting\` and binds it to the string \`"hello world"\`. Because it's a \`const\`, that binding can't be reassigned later — perfect for a value that never changes.`,
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
      hints: [
        "The two inputs arrive as the parameters `a` and `b`.",
        "Use the `return` keyword — without it the function gives back `undefined`. Return `a + b`.",
      ],
      explanation: `The function receives its two inputs as the parameters \`a\` and \`b\`, then \`return a + b\` hands the sum back to whoever called it. Returning (not just computing) is what lets \`add(2, 3)\` evaluate to \`5\`.`,
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
    {
      slug: "strings",
      title: "Strings",
      blurb: "Text is data you can transform.",
      xp: 25,
      content: `# Strings

A **string** is text. JavaScript gives strings handy built-in methods like
\`.toUpperCase()\`, \`.toLowerCase()\`, \`.length\`, and \`.includes()\`.

\`\`\`js
"boots".toUpperCase(); // "BOOTS"
"boots".length;        // 5
\`\`\`

## Your task
Write a function \`shout\` that takes a string and returns it in **UPPERCASE**
with a single \`"!"\` added to the end.`,
      starterCode: `function shout(text) {
  // return text uppercased, with "!" on the end
}
`,
      solution: `function shout(text) {
  return text.toUpperCase() + "!";
}`,
      tests: [
        { name: 'shout("hi") === "HI!"', code: `assertEquals(shout("hi"), "HI!");` },
        { name: 'shout("boots") === "BOOTS!"', code: `assertEquals(shout("boots"), "BOOTS!");` },
      ],
    },
    {
      slug: "template-literals",
      title: "Template Literals",
      blurb: "Build strings with embedded values.",
      xp: 25,
      content: `# Template Literals

**Template literals** are strings written with backticks instead of quotes. They
let you drop values straight into the text, which is cleaner than joining strings
with \`+\`.

\`\`\`js
const name = "Boots";
\`Hi \${name}!\`; // "Hi Boots!"
\`\`\`

## Your task
Write \`greet(name, level)\` that returns exactly this string:

\`Hello {name}, you are level {level}!\`

For example, \`greet("Boots", 7)\` returns \`Hello Boots, you are level 7!\`.`,
      starterCode: `function greet(name, level) {
  // return "Hello {name}, you are level {level}!"
}
`,
      solution: `function greet(name, level) {
  return \`Hello \${name}, you are level \${level}!\`;
}`,
      tests: [
        {
          name: "greet formats correctly",
          code: `assertEquals(greet("Boots", 7), "Hello Boots, you are level 7!");`,
        },
        {
          name: "works with other values",
          code: `assertEquals(greet("Ada", 1), "Hello Ada, you are level 1!");`,
        },
      ],
    },
    {
      slug: "array-map",
      title: "Transform with map()",
      blurb: "Make a new array from an old one.",
      xp: 30,
      content: `# Transform with map()

\`.map()\` builds a **new** array by running a function on every item — the
original array is left untouched.

\`\`\`js
[1, 2, 3].map((n) => n + 1); // [2, 3, 4]
\`\`\`

## Your task
Write \`doubleAll\` that takes an array of numbers and returns a new array with
every number doubled. An empty array returns \`[]\`.`,
      starterCode: `function doubleAll(numbers) {
  // return a new array with each number doubled
}
`,
      solution: `function doubleAll(numbers) {
  return numbers.map((n) => n * 2);
}`,
      tests: [
        { name: "doubleAll([1,2,3]) → [2,4,6]", code: `assertEquals(doubleAll([1, 2, 3]), [2, 4, 6]);` },
        { name: "doubleAll([]) → []", code: `assertEquals(doubleAll([]), []);` },
        { name: "handles negatives", code: `assertEquals(doubleAll([-2, 5]), [-4, 10]);` },
      ],
    },
    {
      slug: "array-filter",
      title: "Select with filter()",
      blurb: "Keep only the items you want.",
      xp: 30,
      content: `# Select with filter()

\`.filter()\` returns a new array containing only the items for which your
function returns \`true\`.

\`\`\`js
[1, 2, 3, 4].filter((n) => n > 2); // [3, 4]
\`\`\`

## Your task
Write \`onlyEvens\` that returns a new array containing only the even numbers, in
their original order.`,
      starterCode: `function onlyEvens(numbers) {
  // return only the even numbers
}
`,
      solution: `function onlyEvens(numbers) {
  return numbers.filter((n) => n % 2 === 0);
}`,
      tests: [
        { name: "[1,2,3,4] → [2,4]", code: `assertEquals(onlyEvens([1, 2, 3, 4]), [2, 4]);` },
        { name: "no evens → []", code: `assertEquals(onlyEvens([1, 3, 5]), []);` },
        { name: "[] → []", code: `assertEquals(onlyEvens([]), []);` },
      ],
    },
    {
      slug: "reduce",
      title: "Boil it down with reduce()",
      blurb: "Collapse a list into a single value.",
      xp: 35,
      content: `# Boil it down with reduce()

\`.reduce()\` walks the array carrying an **accumulator**, returning one final
value — a sum, a max, a joined string, anything.

\`\`\`js
[1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
\`\`\`

## Your task
Write \`max\` that returns the **largest** number in a non-empty array. (You can use
\`reduce\`, \`Math.max\`, or a loop — only the result is graded.)`,
      starterCode: `function max(numbers) {
  // return the largest number
}
`,
      solution: `function max(numbers) {
  return numbers.reduce((m, n) => (n > m ? n : m));
}`,
      tests: [
        { name: "max([1,5,3]) === 5", code: `assertEquals(max([1, 5, 3]), 5);` },
        { name: "all negative", code: `assertEquals(max([-2, -9, -4]), -2);` },
        { name: "single item", code: `assertEquals(max([42]), 42);` },
      ],
    },
    {
      slug: "fizzbuzz",
      title: "Capstone: FizzBuzz",
      blurb: "The classic interview warm-up.",
      xp: 40,
      content: `# Capstone: FizzBuzz

Time to combine conditionals with the modulo operator. **FizzBuzz** is a
programming rite of passage.

## Your task
Write \`fizzbuzz(n)\` that returns:
- \`"FizzBuzz"\` if \`n\` is divisible by **both** 3 and 5
- \`"Fizz"\` if divisible by 3
- \`"Buzz"\` if divisible by 5
- otherwise the number \`n\` itself

Order matters — check the "both" case first!`,
      starterCode: `function fizzbuzz(n) {
  // return "Fizz", "Buzz", "FizzBuzz", or n
}
`,
      solution: `function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n;
}`,
      tests: [
        { name: "3 → Fizz", code: `assertEquals(fizzbuzz(3), "Fizz");` },
        { name: "5 → Buzz", code: `assertEquals(fizzbuzz(5), "Buzz");` },
        { name: "15 → FizzBuzz", code: `assertEquals(fizzbuzz(15), "FizzBuzz");` },
        { name: "1 → 1", code: `assertEquals(fizzbuzz(1), 1);` },
      ],
    },
    {
      slug: "math-basics",
      title: "Numbers & Math",
      blurb: "Clamp, round, and the Math object.",
      xp: 25,
      content: `# Numbers & Math

JavaScript's \`Math\` object has handy helpers: \`Math.min\`, \`Math.max\`,
\`Math.round\`, \`Math.floor\`. A common need is to **clamp** a value into a
range — never below a minimum, never above a maximum.

\`\`\`js
Math.max(0, Math.min(10, value)); // keep value within 0..10
\`\`\`

## Your task
Write \`clamp(n, min, max)\` that returns \`n\` limited to the range
\`[min, max]\`.`,
      starterCode: `function clamp(n, min, max) {
  // keep n within [min, max]
}
`,
      solution: `function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}`,
      tests: [
        { name: "in range", code: `assertEquals(clamp(5, 0, 10), 5);` },
        { name: "below min", code: `assertEquals(clamp(-3, 0, 10), 0);` },
        { name: "above max", code: `assertEquals(clamp(99, 0, 10), 10);` },
      ],
    },
    {
      slug: "logic",
      title: "Boolean Logic",
      blurb: "Combine conditions with && and ||.",
      xp: 25,
      content: `# Boolean Logic

Combine true/false values with logical operators: \`&&\` (and — both must be
true), \`||\` (or — either), and \`!\` (not). Comparisons like \`>=\` produce
booleans you can combine.

\`\`\`js
age >= 18 && hasTicket; // true only if both hold
\`\`\`

## Your task
Write \`canVote(age, isCitizen)\` that returns \`true\` only when \`age\` is at
least 18 **and** \`isCitizen\` is true.`,
      starterCode: `function canVote(age, isCitizen) {
  // true only if age >= 18 AND isCitizen
}
`,
      solution: `function canVote(age, isCitizen) {
  return age >= 18 && isCitizen;
}`,
      tests: [
        { name: "adult citizen", code: `assertEquals(canVote(20, true), true);` },
        { name: "too young", code: `assertEquals(canVote(16, true), false);` },
        { name: "not a citizen", code: `assertEquals(canVote(40, false), false);` },
      ],
    },
    {
      slug: "while-loops",
      title: "While Loops",
      blurb: "Repeat until a condition fails.",
      xp: 30,
      content: `# While Loops

A \`while\` loop repeats as long as its condition is true. Make sure something
changes each pass or it'll loop forever!

\`\`\`js
let i = 3;
while (i > 0) {
  i--; // moves toward the exit
}
\`\`\`

## Your task
Write \`countdown(n)\` that returns an array \`[n, n-1, …, 1]\` using a while
loop. If \`n\` is 0 or less, return \`[]\`.`,
      starterCode: `function countdown(n) {
  // build [n, n-1, ..., 1] with a while loop
}
`,
      solution: `function countdown(n) {
  const out = [];
  let i = n;
  while (i > 0) {
    out.push(i);
    i--;
  }
  return out;
}`,
      tests: [
        { name: "countdown(3)", code: `assertEquals(countdown(3), [3, 2, 1]);` },
        { name: "countdown(0)", code: `assertEquals(countdown(0), []);` },
        { name: "countdown(1)", code: `assertEquals(countdown(1), [1]);` },
      ],
    },
  ],
};
