import type { Module } from "./types";

export const javascript: Module = {
  slug: "javascript",
  title: "JavaScript Foundations",
  description:
    "The language that runs everywhere. Start from zero and write real, tested code in your browser.",
  emoji: "🟨",
  gradient: "from-yellow-400/20 to-amber-500/10",
  tagline: "Learn JavaScript from scratch with interactive, auto-graded exercises.",
  keywords: [
    "learn javascript",
    "javascript for beginners",
    "javascript tutorial",
    "js variables functions",
    "javascript map filter reduce",
    "coding for beginners",
  ],
  lessons: [
    // ── 1. Cold-open: read code, predict the output (no typing) ──
    {
      slug: "predict-the-output",
      title: "Read the Code 👀",
      blurb: "Before you write JavaScript, learn to read it.",
      xp: 10,
      kind: "quiz",
      content: `# Read the Code 👀

Welcome! 👋 You're about to write real JavaScript. We'll go one tiny step at a
time, and you can't break anything.

Coders read a *lot* of code before they write any. So let's warm up by **reading**
a couple of tiny programs and predicting what they do.

A **variable** is a named box that holds a value. You make one with \`const\` (a box
whose value never changes) or \`let\` (a box you can change later):

\`\`\`js
const name = "Boots";
let score = 10;
score = 20;   // ok, because it's "let"
\`\`\`

The words in "quotes" are a **string** — that's coder-speak for *text*. 🧵

Read the snippets in each question, then pick what you think the answer is. 👇`,
      questions: [
        {
          prompt:
            "After this code runs, what is inside the box `color`?\n\n```js\nconst color = \"blue\";\n```",
          options: ['the word "const"', '"blue"', "nothing"],
          answer: 1,
          explanation:
            '`= "blue"` puts the string "blue" into the box named `color`. Reading `color` later gives you "blue".',
        },
        {
          prompt: "Which keyword makes a box you can change again later?",
          options: ["`const`", "`let`", "neither — boxes never change"],
          answer: 1,
          explanation:
            "`let` makes a changeable box. `const` makes one that's locked once you set it.",
        },
        {
          prompt:
            "What is `score` at the end?\n\n```js\nlet score = 5;\nscore = score + 3;\n```",
          options: ["5", "8", '"score"'],
          answer: 1,
          explanation:
            "`score + 3` is `5 + 3` = `8`, and we store that back in `score`. So `score` is now 8.",
        },
      ],
    },

    // ── 2. Variables (first real edit) ──
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
      blocks: ["const ", "greeting", " = ", '"hello world"', ";"],
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
      hintCode: [`const greeting = `, `const greeting = "hello world";`],
      explanation: `\`const greeting = "hello world";\` creates a constant named \`greeting\` and binds it to the string \`"hello world"\`. Because it's a \`const\`, that binding can't be reassigned later — perfect for a value that never changes.`,
    },

    // ── 3. Math & operators ──
    {
      slug: "math-basics",
      title: "Numbers & Math",
      blurb: "Add, clamp, round, and the Math object.",
      xp: 25,
      content: `# Numbers & Math

JavaScript does math with the symbols you already know: \`+\` add, \`-\` subtract,
\`*\` multiply, \`/\` divide.

\`\`\`js
3 + 4;   // 7
10 / 2;  // 5
\`\`\`

It also has a \`Math\` object full of helpers: \`Math.min\`, \`Math.max\`,
\`Math.round\`, \`Math.floor\`. A common need is to **clamp** a value into a
range — never below a minimum, never above a maximum.

\`\`\`js
Math.max(0, Math.min(10, value)); // keep value within 0..10
\`\`\`

Read that inside-out: \`Math.min(10, value)\` caps the top at 10, then
\`Math.max(0, …)\` lifts the bottom up to 0.

## Your task
Write \`clamp(n, min, max)\` that returns \`n\` limited to the range
\`[min, max]\`.`,
      starterCode: `function clamp(n, min, max) {
  // keep n within [min, max]
}
`,
      blocks: ["return ", "Math.max(min, ", "Math.min(max, n)", ")", ";"],
      solution: `function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}`,
      tests: [
        { name: "in range", code: `assertEquals(clamp(5, 0, 10), 5);` },
        { name: "below min", code: `assertEquals(clamp(-3, 0, 10), 0);` },
        { name: "above max", code: `assertEquals(clamp(99, 0, 10), 10);` },
      ],
      hints: [
        "First cap the top: `Math.min(max, n)` never lets the value go above `max`.",
        "Then lift the bottom: wrap it in `Math.max(min, …)` so it never drops below `min`.",
      ],
      hintCode: [
        `function clamp(n, min, max) {\n  return Math.min(max, n);\n}\n`,
        `function clamp(n, min, max) {\n  return Math.max(min, Math.min(max, n));\n}\n`,
      ],
      explanation: `\`Math.min(max, n)\` caps the value at \`max\`, then \`Math.max(min, …)\` raises it up to \`min\` if it dipped too low. Together they squeeze \`n\` into the \`[min, max]\` range.`,
    },

    // ── 4. Conditionals (already dialed-down — keep if/else + blocks + hints) ──
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
      blocks: ["if (", "n % 2 === 0", ") {", 'return "even";', "} else {", 'return "odd";', "}"],
      solution: `function evenOrOdd(n) {
  if (n % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
}`,
      tests: [
        { name: 'evenOrOdd(4) === "even"', code: `assertEquals(evenOrOdd(4), "even");` },
        { name: 'evenOrOdd(7) === "odd"', code: `assertEquals(evenOrOdd(7), "odd");` },
        { name: 'evenOrOdd(0) === "even"', code: `assertEquals(evenOrOdd(0), "even");` },
      ],
      hints: [
        "`n % 2` is `0` when `n` is even — check it with `if (n % 2 === 0)`.",
        'Return `"even"` inside the `if`, and `"odd"` in the `else`.',
      ],
      hintCode: [
        `function evenOrOdd(n) {\n  if (n % 2 === 0) {\n    \n  }\n}\n`,
        `function evenOrOdd(n) {\n  if (n % 2 === 0) {\n    return "even";\n  } else {\n    return "odd";\n  }\n}\n`,
      ],
      explanation: `\`n % 2 === 0\` is \`true\` for even numbers (no remainder), so the \`if\` returns \`"even"\` and the \`else\` covers everything odd. This is the same \`if/else\` shape from the lesson above — once you're comfortable, there are shorter ways to write it, but clear and correct beats clever.`,
    },

    // ── 5. Boolean logic ──
    {
      slug: "logic",
      title: "Boolean Logic",
      blurb: "Combine conditions with && and ||.",
      xp: 25,
      content: `# Boolean Logic

A **boolean** is a true/false value. Comparisons like \`>=\` produce booleans, and
you can combine them with logical operators: \`&&\` (and — both must be true),
\`||\` (or — either one), and \`!\` (not — flips it).

\`\`\`js
age >= 18 && hasTicket; // true only if BOTH hold
age < 13 || age > 65;   // true if EITHER holds
\`\`\`

## Your task
Write \`canVote(age, isCitizen)\` that returns \`true\` only when \`age\` is at
least 18 **and** \`isCitizen\` is true.`,
      starterCode: `function canVote(age, isCitizen) {
  // true only if age >= 18 AND isCitizen
}
`,
      blocks: ["return ", "age >= 18", " && ", "isCitizen", ";"],
      solution: `function canVote(age, isCitizen) {
  return age >= 18 && isCitizen;
}`,
      tests: [
        { name: "adult citizen", code: `assertEquals(canVote(20, true), true);` },
        { name: "too young", code: `assertEquals(canVote(16, true), false);` },
        { name: "not a citizen", code: `assertEquals(canVote(40, false), false);` },
      ],
      hints: [
        "`age >= 18` is already a true/false value — start there.",
        "Join it to `isCitizen` with `&&` so BOTH must be true: `age >= 18 && isCitizen`.",
      ],
      hintCode: [
        `function canVote(age, isCitizen) {\n  return age >= 18;\n}\n`,
        `function canVote(age, isCitizen) {\n  return age >= 18 && isCitizen;\n}\n`,
      ],
      explanation: `\`&&\` only gives \`true\` when the value on its left *and* its right are both true. So \`age >= 18 && isCitizen\` is true exactly when the person is old enough and a citizen — and false the moment either part fails.`,
    },

    // ── 6. Predict the output before Functions (no typing) ──
    {
      slug: "predict-functions",
      title: "What's a Function? 🛠️",
      blurb: "Read a function and predict what it hands back.",
      xp: 10,
      kind: "quiz",
      content: `# What's a Function? 🛠️

Next you'll write **functions** — little machines that take inputs and hand back an
output. Let's read a few first so the shape feels familiar.

A function has a **name**, takes **inputs** in parentheses, and hands a value back
with the word \`return\`:

\`\`\`js
function double(n) {
  return n * 2;
}
double(5); // 10
\`\`\`

The value in the parentheses (\`5\`) becomes \`n\` inside the function. Without
\`return\`, a function hands back \`undefined\` — nothing useful.

Read each snippet below and predict the answer. 👇`,
      questions: [
        {
          prompt:
            "What does `double(10)` hand back?\n\n```js\nfunction double(n) {\n  return n * 2;\n}\n```",
          options: ["10", "20", "`n * 2`"],
          answer: 1,
          explanation: "`n` becomes 10, and `10 * 2` is 20.",
        },
        {
          prompt:
            "What does `greet(\"Sam\")` hand back?\n\n```js\nfunction greet(name) {\n  return \"Hi \" + name;\n}\n```",
          options: ['"Hi name"', '"Hi Sam"', '"Sam"'],
          answer: 1,
          explanation: '`name` becomes "Sam", so `"Hi " + name` is "Hi Sam".',
        },
        {
          prompt:
            "What does this function hand back?\n\n```js\nfunction mystery(n) {\n  n + 1;\n}\n```",
          options: ["`n + 1`", "the next number", "`undefined` — there's no `return`!"],
          answer: 2,
          explanation:
            "It computes `n + 1` but never `return`s it, so the function hands back `undefined`. Always remember to `return`!",
        },
      ],
    },

    // ── 7. Functions ──
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
      blocks: ["return ", "a", " + ", "b", ";"],
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
      hintCode: [
        `function add(a, b) {\n  return a;\n}\n`,
        `function add(a, b) {\n  return a + b;\n}\n`,
      ],
      explanation: `The function receives its two inputs as the parameters \`a\` and \`b\`, then \`return a + b\` hands the sum back to whoever called it. Returning (not just computing) is what lets \`add(2, 3)\` evaluate to \`5\`.`,
    },

    // ── 8. Arrays & loops ──
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
      blocks: [
        "let total = 0;",
        "for (const n of numbers) {",
        "total += n;",
        "}",
        "return total;",
      ],
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
      hints: [
        "Start a running total at zero before the loop: `let total = 0;`.",
        "Visit each number with `for (const n of numbers)` and add it on: `total += n;`. Then `return total`.",
      ],
      hintCode: [
        `function sum(numbers) {\n  let total = 0;\n\n  return total;\n}\n`,
        `function sum(numbers) {\n  let total = 0;\n  for (const n of numbers) {\n    total += n;\n  }\n  return total;\n}\n`,
      ],
      explanation: `We start a \`total\` at \`0\`, then the \`for…of\` loop walks every number and adds it on with \`total += n\`. An empty array means the loop never runs, so \`total\` stays \`0\` — exactly what we want.`,
    },

    // ── 9. Objects ──
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

When a key and the variable holding its value have the **same name**, you can use
the shorthand \`{ name, level }\` instead of \`{ name: name, level: level }\`.

## Your task
Write a function \`makeUser\` that takes a \`name\` and a \`level\` and returns an
object with exactly those two keys: \`{ name, level }\`.`,
      starterCode: `function makeUser(name, level) {
  // return an object: { name, level }
}
`,
      blocks: ["return ", "{ ", "name, ", "level", " }", ";"],
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
      hints: [
        "Wrap the two values in curly braces — that's an object: `{ … }`.",
        "Because the keys match the parameters, the shorthand `{ name, level }` is all you need.",
      ],
      hintCode: [
        `function makeUser(name, level) {\n  return { name: name };\n}\n`,
        `function makeUser(name, level) {\n  return { name, level };\n}\n`,
      ],
      explanation: `\`{ name, level }\` builds an object whose keys are \`name\` and \`level\`, each holding the matching parameter's value. It's shorthand for \`{ name: name, level: level }\` — JavaScript fills in the values for you when the names line up.`,
    },

    // ── 10. Strings ──
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

You can glue strings together with \`+\`: \`"BOOTS" + "!"\` is \`"BOOTS!"\`.

## Your task
Write a function \`shout\` that takes a string and returns it in **UPPERCASE**
with a single \`"!"\` added to the end.`,
      starterCode: `function shout(text) {
  // return text uppercased, with "!" on the end
}
`,
      blocks: ["return ", "text.toUpperCase()", " + ", '"!"', ";"],
      solution: `function shout(text) {
  return text.toUpperCase() + "!";
}`,
      tests: [
        { name: 'shout("hi") === "HI!"', code: `assertEquals(shout("hi"), "HI!");` },
        { name: 'shout("boots") === "BOOTS!"', code: `assertEquals(shout("boots"), "BOOTS!");` },
      ],
      hints: [
        "Uppercase the text first: `text.toUpperCase()`.",
        'Then glue a `"!"` on the end with `+`: `text.toUpperCase() + "!"`.',
      ],
      hintCode: [
        `function shout(text) {\n  return text.toUpperCase();\n}\n`,
        `function shout(text) {\n  return text.toUpperCase() + "!";\n}\n`,
      ],
      explanation: `\`.toUpperCase()\` returns a new, all-caps copy of the text, and \`+ "!"\` glues an exclamation mark onto the end. Strings are never changed in place — the method hands back a brand-new string.`,
    },

    // ── 11. Template literals ──
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

Inside the backticks, \`\${...}\` is a window where any value can show through.

## Your task
Write \`greet(name, level)\` that returns exactly this string:

\`Hello {name}, you are level {level}!\`

For example, \`greet("Boots", 7)\` returns \`Hello Boots, you are level 7!\`.`,
      starterCode: `function greet(name, level) {
  // return "Hello {name}, you are level {level}!"
}
`,
      blocks: ["return ", "`Hello ", "${name}", ", you are level ", "${level}", "!`", ";"],
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
      hints: [
        "Wrap the whole sentence in backticks `` ` `` (not normal quotes).",
        "Drop each value in with `${…}`: `` `Hello ${name}, you are level ${level}!` ``.",
      ],
      hintCode: [
        `function greet(name, level) {\n  return \`Hello \${name}\`;\n}\n`,
        `function greet(name, level) {\n  return \`Hello \${name}, you are level \${level}!\`;\n}\n`,
      ],
      explanation: `Backtick strings let you embed values with \`\${…}\`. So \`\${name}\` and \`\${level}\` are replaced by the actual arguments, building the full sentence without any messy \`+\` joins.`,
    },

    // ── 12. Predict the output before map() (no typing) ──
    {
      slug: "predict-map",
      title: "Reading map() 🗺️",
      blurb: "Predict what map() builds before you write it.",
      xp: 10,
      kind: "quiz",
      content: `# Reading map() 🗺️

Next you'll transform whole lists at once with \`.map()\`. Let's read it first.

\`.map()\` builds a **new** array by running a little function on **every** item. The
original array is left untouched.

\`\`\`js
[1, 2, 3].map((n) => n + 1); // [2, 3, 4]
\`\`\`

That \`(n) => n + 1\` is an **arrow function** — a quick way to say "take \`n\`, hand
back \`n + 1\`." \`map\` runs it once per item and collects the results into a new array.

Read each snippet and predict the new array. 👇`,
      questions: [
        {
          prompt: "What does this produce?\n\n```js\n[1, 2, 3].map((n) => n * 10);\n```",
          options: ["`[1, 2, 3]`", "`[10, 20, 30]`", "`60`"],
          answer: 1,
          explanation:
            "`map` runs `n * 10` on each item: 1→10, 2→20, 3→30, giving `[10, 20, 30]`.",
        },
        {
          prompt: "What does this produce?\n\n```js\n[5, 6].map((n) => n - 1);\n```",
          options: ["`[4, 5]`", "`[6, 7]`", "`11`"],
          answer: 0,
          explanation: "Each item drops by one: 5→4 and 6→5, so `[4, 5]`.",
        },
        {
          prompt: "After `[1, 2, 3].map((n) => n + 1)` runs, the ORIGINAL array is…",
          options: [
            "changed to `[2, 3, 4]`",
            "still `[1, 2, 3]` — map makes a NEW array",
            "deleted",
          ],
          answer: 1,
          explanation:
            "`map` never changes the original — it always hands back a brand-new array.",
        },
      ],
    },

    // ── 13. map() ──
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
      blocks: ["return ", "numbers.map(", "(n) => ", "n * 2", ")", ";"],
      solution: `function doubleAll(numbers) {
  return numbers.map((n) => n * 2);
}`,
      tests: [
        { name: "doubleAll([1,2,3]) → [2,4,6]", code: `assertEquals(doubleAll([1, 2, 3]), [2, 4, 6]);` },
        { name: "doubleAll([]) → []", code: `assertEquals(doubleAll([]), []);` },
        { name: "handles negatives", code: `assertEquals(doubleAll([-2, 5]), [-4, 10]);` },
      ],
      hints: [
        "Call `.map()` on the array: `numbers.map(…)`.",
        "Give it an arrow function that doubles each item: `(n) => n * 2`.",
      ],
      hintCode: [
        `function doubleAll(numbers) {\n  return numbers.map((n) => n);\n}\n`,
        `function doubleAll(numbers) {\n  return numbers.map((n) => n * 2);\n}\n`,
      ],
      explanation: `\`numbers.map((n) => n * 2)\` runs \`n * 2\` on every item and collects the results into a new array. The empty array just maps to another empty array, so \`[]\` returns \`[]\`.`,
    },

    // ── 14. filter() ──
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
      blocks: ["return ", "numbers.filter(", "(n) => ", "n % 2 === 0", ")", ";"],
      solution: `function onlyEvens(numbers) {
  return numbers.filter((n) => n % 2 === 0);
}`,
      tests: [
        { name: "[1,2,3,4] → [2,4]", code: `assertEquals(onlyEvens([1, 2, 3, 4]), [2, 4]);` },
        { name: "no evens → []", code: `assertEquals(onlyEvens([1, 3, 5]), []);` },
        { name: "[] → []", code: `assertEquals(onlyEvens([]), []);` },
      ],
      hints: [
        "Call `.filter()` on the array: `numbers.filter(…)`.",
        "Keep the items where the test is true — even means `n % 2 === 0`.",
      ],
      hintCode: [
        `function onlyEvens(numbers) {\n  return numbers.filter((n) => n);\n}\n`,
        `function onlyEvens(numbers) {\n  return numbers.filter((n) => n % 2 === 0);\n}\n`,
      ],
      explanation: `\`filter\` keeps only the items whose test returns \`true\`. \`n % 2 === 0\` is true for even numbers, so the new array holds just the evens — in their original order.`,
    },

    // ── 15. reduce() ──
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
      blocks: ["return ", "numbers.reduce(", "(m, n) => ", "(n > m ? n : m)", ")", ";"],
      solution: `function max(numbers) {
  return numbers.reduce((m, n) => (n > m ? n : m));
}`,
      tests: [
        { name: "max([1,5,3]) === 5", code: `assertEquals(max([1, 5, 3]), 5);` },
        { name: "all negative", code: `assertEquals(max([-2, -9, -4]), -2);` },
        { name: "single item", code: `assertEquals(max([42]), 42);` },
      ],
      hints: [
        "`reduce` carries a running 'best so far' — call it `m` — across the array.",
        "Each step keep the bigger of the two: `(m, n) => (n > m ? n : m)`.",
      ],
      hintCode: [
        `function max(numbers) {\n  return numbers.reduce((m, n) => m);\n}\n`,
        `function max(numbers) {\n  return numbers.reduce((m, n) => (n > m ? n : m));\n}\n`,
      ],
      explanation: `\`reduce\` carries \`m\` (the largest seen so far) across the array. At each item, \`n > m ? n : m\` keeps whichever is bigger, so the final value is the maximum. With no starting value given, \`reduce\` uses the first item as \`m\`.`,
    },

    // ── 16. while loops ──
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
      blocks: [
        "const out = [];",
        "let i = n;",
        "while (i > 0) {",
        "out.push(i);",
        "i--;",
        "}",
        "return out;",
      ],
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
      hints: [
        "Make an empty array `out` and a counter `let i = n;` that starts at the top.",
        "While `i > 0`, push `i` then count down with `i--`. After the loop, `return out`.",
      ],
      hintCode: [
        `function countdown(n) {\n  const out = [];\n  let i = n;\n\n  return out;\n}\n`,
        `function countdown(n) {\n  const out = [];\n  let i = n;\n  while (i > 0) {\n    out.push(i);\n    i--;\n  }\n  return out;\n}\n`,
      ],
      explanation: `We start \`i\` at \`n\` and, while \`i > 0\`, push \`i\` into the array then drop it by one with \`i--\`. The \`i--\` is what eventually makes the condition false and ends the loop. If \`n\` starts at 0 or less, the loop never runs and we return \`[]\`.`,
    },

    // ── 17. Capstone: FizzBuzz ──
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
      blocks: [
        'if (n % 15 === 0) return "FizzBuzz";',
        'if (n % 3 === 0) return "Fizz";',
        'if (n % 5 === 0) return "Buzz";',
        "return n;",
      ],
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
      hints: [
        'Check the "both" case FIRST: `if (n % 15 === 0) return "FizzBuzz";` (15 = 3 × 5).',
        'Then handle `n % 3 === 0` → "Fizz", `n % 5 === 0` → "Buzz", and finally `return n`.',
      ],
      hintCode: [
        `function fizzbuzz(n) {\n  if (n % 15 === 0) return "FizzBuzz";\n\n  return n;\n}\n`,
        `function fizzbuzz(n) {\n  if (n % 15 === 0) return "FizzBuzz";\n  if (n % 3 === 0) return "Fizz";\n  if (n % 5 === 0) return "Buzz";\n  return n;\n}\n`,
      ],
      explanation: `Checking \`n % 15 === 0\` first catches numbers divisible by both 3 and 5 before the single checks can grab them. Then \`% 3\` and \`% 5\` handle Fizz and Buzz, and anything left over falls through to \`return n\`. Order is everything here!`,
    },
  ],
};
