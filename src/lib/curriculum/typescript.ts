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
      slug: "why-typescript",
      title: "Why TypeScript?",
      blurb: "What types buy you, and why teams adopt them.",
      xp: 25,
      kind: "quiz",
      content: `# Why TypeScript?

**TypeScript** is JavaScript with a *static type system*. You write the same code
you already know, but you can annotate values with their types — and a compiler
checks those annotations *before* the code ever runs.

\`\`\`ts
function greet(name: string) {
  return "Hi, " + name.toUpperCase();
}

greet(42); // ❌ caught at compile time — 42 is not a string
\`\`\`

In plain JavaScript that bug ships to production and blows up at runtime. In
TypeScript your editor underlines it the moment you type it.

**What you get:**
- **Catch bugs early** — typos, wrong arguments, and \`undefined\` access are flagged as you write.
- **Better autocomplete** — the editor knows the shape of every object, so it can suggest fields and methods.
- **Self-documenting code** — types *are* the documentation, and they can never drift out of date.
- **Safe refactors** — rename a field and TypeScript shows you every place that needs to change.

Crucially, types are erased before the code runs. TypeScript **compiles to plain
JavaScript** — the browser and Node never see the type annotations. So there's
zero runtime cost: it's a tool for *you*, the developer, not the machine.`,
      questions: [
        {
          prompt: "When does TypeScript catch a type error like passing a number where a string is expected?",
          options: [
            "At runtime, when that line of code executes",
            "At compile time, before the code ever runs",
            "Never — TypeScript only adds autocomplete",
            "Only if you write a unit test for it",
          ],
          answer: 1,
          explanation:
            "TypeScript's compiler (and your editor) check types statically — before the program runs — so many bugs are caught as you type rather than in production.",
        },
        {
          prompt: "What does TypeScript code turn into before it runs in a browser or Node?",
          options: [
            "A new bytecode format only TypeScript runtimes understand",
            "Plain JavaScript, with the type annotations erased",
            "WebAssembly",
            "It runs the .ts files directly with no compilation",
          ],
          answer: 1,
          explanation:
            "TypeScript compiles to plain JavaScript and strips the type annotations, so there is no runtime cost — the types are a developer-time tool.",
        },
        {
          prompt: "Which of these is NOT a benefit of adding types?",
          options: [
            "Better editor autocomplete and inline documentation",
            "Catching wrong-argument bugs before running the code",
            "Making the compiled JavaScript run dramatically faster",
            "Safer large-scale refactors across a codebase",
          ],
          answer: 2,
          explanation:
            "Types are erased at compile time, so they don't speed up the runtime. Their value is developer experience: early bug detection, autocomplete, and safe refactoring.",
        },
      ],
    },
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
    {
      slug: "enums",
      title: "Enums",
      blurb: "A named set of related constants.",
      xp: 35,
      content: `# Enums

An **enum** gives friendly names to a fixed set of related values, so you pass
\`Direction.Up\` instead of a mystery number or a loose string.

\`\`\`ts
enum Direction {
  Up,
  Down,
}

Direction.Up;   // 0
Direction.Down; // 1
\`\`\`

By default members are numbered from \`0\`, but you can assign your own values —
including strings — which makes them far easier to read in logs and debuggers:

\`\`\`ts
enum Status {
  Active = "ACTIVE",
  Done = "DONE",
}
\`\`\`

Unlike interfaces (which vanish at compile time), an enum compiles to a real
object, so you can read its members at runtime.

## Your task
Define a **string enum** \`Light\` with members \`Red = "RED"\`, \`Yellow = "YELLOW"\`,
and \`Green = "GREEN"\`. Then write \`next(light: Light): Light\` that returns the
next light in a traffic cycle: Red → Green → Yellow → Red.`,
      starterCode: `enum Light {
  // add Red, Yellow, Green
}

function next(light: Light): Light {
  // Red → Green → Yellow → Red
}
`,
      solution: `enum Light {
  Red = "RED",
  Yellow = "YELLOW",
  Green = "GREEN",
}

function next(light: Light): Light {
  if (light === Light.Red) return Light.Green;
  if (light === Light.Green) return Light.Yellow;
  return Light.Red;
}`,
      tests: [
        { name: "Red → Green", code: `assertEquals(next(Light.Red), "GREEN");` },
        { name: "Green → Yellow", code: `assertEquals(next(Light.Green), "YELLOW");` },
        { name: "Yellow → Red", code: `assertEquals(next(Light.Yellow), "RED");` },
      ],
    },
    {
      slug: "type-narrowing",
      title: "Type Narrowing",
      blurb: "Teach the compiler which type you actually have.",
      xp: 40,
      content: `# Type Narrowing

When a value is a union like \`string | number | null\`, TypeScript won't let you
call \`.toFixed()\` on it directly — it might be a string. **Narrowing** is how you
prove, with a runtime check, which type you have in a given branch.

\`\`\`ts
function describe(x: string | number): string {
  if (typeof x === "string") {
    return x.toUpperCase(); // here x is a string
  }
  return x.toFixed(1);      // here x must be a number
}
\`\`\`

Inside each branch the compiler *narrows* the type, so the right methods become
available. Common narrowing tools: \`typeof\`, \`Array.isArray\`, an \`=== null\`
check, and the \`in\` operator for object shapes.

## Your task
Write \`area(shape)\` where \`shape\` is \`{ kind: "circle"; r: number } | { kind: "square"; size: number }\`.
Narrow on \`shape.kind\` and return the area: \`Math.PI * r * r\` for a circle, or
\`size * size\` for a square.`,
      starterCode: `type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  // narrow on shape.kind, then compute the area
}
`,
      solution: `type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.r * shape.r;
  }
  return shape.size * shape.size;
}`,
      tests: [
        {
          name: "square area",
          code: `assertEquals(area({ kind: "square", size: 4 }), 16);`,
        },
        {
          name: "circle area",
          code: `assertEquals(Math.round(area({ kind: "circle", r: 2 })), 13);`,
        },
      ],
    },
    {
      slug: "utility-types",
      title: "Utility Types",
      blurb: "Build new types from existing ones with Partial & Pick.",
      xp: 45,
      content: `# Utility Types

TypeScript ships **utility types** that transform existing types so you don't
repeat yourself. Two of the most useful:

- \`Partial<T>\` — makes every field of \`T\` optional. Perfect for "update" helpers
  where the caller only sends the fields that changed.
- \`Pick<T, Keys>\` — builds a new type with just the listed fields of \`T\`.

\`\`\`ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;        // every field optional
type PublicUser = Pick<User, "id" | "name">; // only id + name
\`\`\`

These are *type-level* tools — they vanish at runtime — but they shape the
function signatures that guard your real code.

## Your task
Given an \`interface User { id: number; name: string; email: string }\`, write
\`applyUpdate(user: User, patch: Partial<User>): User\` that returns a **new** user
object with the patch's fields merged on top of the original.`,
      starterCode: `interface User {
  id: number;
  name: string;
  email: string;
}

function applyUpdate(user: User, patch: Partial<User>): User {
  // return a new User with patch merged over user
}
`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
}

function applyUpdate(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}`,
      tests: [
        {
          name: "merges a single field",
          code: `assertEquals(
  applyUpdate({ id: 1, name: "Ada", email: "a@x.com" }, { name: "Grace" }),
  { id: 1, name: "Grace", email: "a@x.com" }
);`,
        },
        {
          name: "does not mutate the original",
          code: `const original = { id: 2, name: "Sam", email: "s@x.com" };
applyUpdate(original, { email: "new@x.com" });
assertEquals(original.email, "s@x.com");`,
        },
        {
          name: "empty patch returns equal data",
          code: `assertEquals(
  applyUpdate({ id: 3, name: "Lin", email: "l@x.com" }, {}),
  { id: 3, name: "Lin", email: "l@x.com" }
);`,
        },
      ],
    },
  ],
};
