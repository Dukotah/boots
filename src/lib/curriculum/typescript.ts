import type { Module } from "./types";

// TypeScript — JavaScript with a type system. Authored as .ts and transpiled to
// JS with sucrase before running in the same in-browser Worker as JS lessons.
export const typescript: Module = {
  slug: "typescript",
  title: "TypeScript",
  description:
    "JavaScript that scales. Add types to catch bugs before they run — annotations, interfaces, unions, and generics, the toolkit behind every serious modern codebase.",
  emoji: "🔷",
  gradient: "from-blue-500/20 to-sky-500/10",
  language: "ts",
  tagline:
    "Learn TypeScript: type annotations, interfaces, union types, optional parameters, and generics — hands-on and auto-graded.",
  keywords: ["learn typescript", "typescript tutorial", "typescript interfaces", "typescript generics"],
  lessons: [
    {
      slug: "typed-function",
      title: "Typed Functions",
      blurb: "Annotate parameters and returns.",
      xp: 30,
      content: `# Typed Functions

TypeScript adds **type annotations** to JavaScript. You declare the type of each
parameter and the return value with \`: type\`.

\`\`\`ts
function double(n: number): number {
  return n * 2;
}
\`\`\`

If you ever call \`double("hi")\`, TypeScript flags it *before* the code runs.

## Your task
Write \`triple(n: number): number\` that returns \`n\` multiplied by 3.`,
      starterCode: `function triple(n: number): number {
  // return n * 3
}
`,
      solution: `function triple(n: number): number {
  return n * 3;
}`,
      tests: [
        { name: "triple(3) === 9", code: `assertEquals(triple(3), 9);` },
        { name: "triple(0) === 0", code: `assertEquals(triple(0), 0);` },
      ],
    },
    {
      slug: "typed-arrays",
      title: "Typed Arrays",
      blurb: "Type a list of values.",
      xp: 30,
      content: `# Typed Arrays

An array of numbers is \`number[]\`; an array of strings is \`string[]\`.

\`\`\`ts
const scores: number[] = [10, 20, 30];
\`\`\`

## Your task
Write \`total(nums: number[]): number\` that returns the sum of the array. An empty
array returns \`0\`.`,
      starterCode: `function total(nums: number[]): number {
  // sum the numbers
}
`,
      solution: `function total(nums: number[]): number {
  return nums.reduce((sum, n) => sum + n, 0);
}`,
      tests: [
        { name: "[1,2,3] → 6", code: `assertEquals(total([1, 2, 3]), 6);` },
        { name: "[] → 0", code: `assertEquals(total([]), 0);` },
      ],
    },
    {
      slug: "interfaces",
      title: "Interfaces",
      blurb: "Describe the shape of an object.",
      xp: 35,
      content: `# Interfaces

An **interface** names the shape an object must have:

\`\`\`ts
interface User {
  name: string;
  age: number;
}
\`\`\`

Now any \`User\` must have exactly those fields with those types.

## Your task
Define an interface \`User\` with a \`name: string\` and \`age: number\`, then write
\`makeUser(name: string, age: number): User\` that returns such an object.`,
      starterCode: `interface User {
  // add name and age
}

function makeUser(name: string, age: number): User {
  // return a User
}
`,
      solution: `interface User {
  name: string;
  age: number;
}

function makeUser(name: string, age: number): User {
  return { name, age };
}`,
      tests: [
        {
          name: "builds a user",
          code: `assertEquals(makeUser("Ada", 30), { name: "Ada", age: 30 });`,
        },
      ],
    },
    {
      slug: "union-types",
      title: "Union Types",
      blurb: "A value that can be one of several types.",
      xp: 35,
      content: `# Union Types

A **union** type allows more than one type with \`|\`:

\`\`\`ts
function format(x: string | number): string { ... }
\`\`\`

Use \`typeof\` to narrow which one you actually got at runtime.

## Your task
Write \`kindOf(x: string | number): string\` that returns \`"text"\` if \`x\` is a
string and \`"number"\` if it's a number.`,
      starterCode: `function kindOf(x: string | number): string {
  // return "text" or "number"
}
`,
      solution: `function kindOf(x: string | number): string {
  return typeof x === "string" ? "text" : "number";
}`,
      tests: [
        { name: '"hi" → "text"', code: `assertEquals(kindOf("hi"), "text");` },
        { name: "42 → number", code: `assertEquals(kindOf(42), "number");` },
      ],
    },
    {
      slug: "optional-params",
      title: "Optional & Default Params",
      blurb: "Parameters that don't have to be passed.",
      xp: 35,
      content: `# Optional & Default Params

A **default** parameter is used when the caller omits it:

\`\`\`ts
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}
\`\`\`

## Your task
Write \`greet(name: string, greeting: string = "Hello"): string\` that returns
\`"{greeting}, {name}!"\`. Calling \`greet("Ada")\` should use the default.`,
      starterCode: `function greet(name: string, greeting: string = "Hello"): string {
  // return "{greeting}, {name}!"
}
`,
      solution: `function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}`,
      tests: [
        { name: "uses the default", code: `assertEquals(greet("Ada"), "Hello, Ada!");` },
        { name: "custom greeting", code: `assertEquals(greet("Sam", "Hi"), "Hi, Sam!");` },
      ],
    },
    {
      slug: "generics",
      title: "Generics",
      blurb: "Types that work with any type.",
      xp: 45,
      content: `# Generics

A **generic** lets a function work with any type while keeping it type-safe. The
type variable \`<T>\` stands in for whatever type is used:

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}
\`\`\`

## Your task
Write a generic \`firstItem<T>(items: T[]): T\` that returns the first element of
the array.`,
      starterCode: `function firstItem<T>(items: T[]): T {
  // return the first element
}
`,
      solution: `function firstItem<T>(items: T[]): T {
  return items[0];
}`,
      tests: [
        { name: "numbers", code: `assertEquals(firstItem([1, 2, 3]), 1);` },
        { name: "strings", code: `assertEquals(firstItem(["a", "b"]), "a");` },
      ],
    },
  ],
};
