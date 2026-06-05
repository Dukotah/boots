import type { Module } from "./types";

// TypeScript Mapped & Conditional Types — build DeepReadonly, DeepPartial,
// UnionToIntersection, and more from scratch.
// Runs in-browser via TypeScript (compiled to JS in a Web Worker).
export const tsMappedConditionalTypes: Module = {
  slug: "ts-mapped-conditional-types",
  title: "Mapped & Conditional Types",
  description:
    "Stop copying utility types — write them yourself. Build DeepReadonly, DeepPartial, UnionToIntersection, and more from first principles to truly master TypeScript's type system.",
  emoji: "🗺️",
  gradient: "from-indigo-400/20 to-violet-500/10",
  tagline:
    "Learn TypeScript mapped types, conditional types, infer, and recursive generics by implementing utility types from scratch.",
  language: "ts",
  keywords: [
    "typescript mapped types",
    "typescript conditional types",
    "typescript utility types",
    "typescript infer keyword",
    "typescript generics advanced",
    "typescript DeepReadonly DeepPartial",
    "typescript UnionToIntersection",
  ],
  lessons: [
    // ── Lesson 1 ─────────────────────────────────────────────────────────────
    {
      slug: "mapped-type-basics",
      title: "Mapped Types: Remapping Every Key",
      blurb: "Turn any object type into a new one by iterating its keys.",
      xp: 25,
      content: `# Mapped Types: Remapping Every Key

A **mapped type** iterates the keys of an existing type and produces a new type:

\`\`\`ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
\`\`\`

The syntax \`[K in keyof T]\` is the "for each key K in T" loop.
\`T[K]\` is the value type at that key — a **lookup type**.

## Your task
Implement \`Nullable<T>\` — a mapped type that makes every property in \`T\`
accept \`null\` in addition to its original type.

\`\`\`ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
\`\`\`

Write that type, then write a helper function \`nullify\` that accepts an object
and returns it cast to \`Nullable<typeof obj>\`. (The runtime body can just
return the argument; the type-level check is what matters.)`,
      starterCode: `// Implement Nullable<T> — every property becomes T[K] | null
type Nullable<T> = {
  // TODO
};

// Helper used by the tests — accepts any object, returns it typed as Nullable<T>
function nullify<T extends object>(obj: T): Nullable<T> {
  // TODO: return obj cast correctly
}
`,
      solution: `type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

function nullify<T extends object>(obj: T): Nullable<T> {
  return obj as Nullable<T>;
}`,
      tests: [
        {
          name: "nullify returns the same object reference",
          code: `const obj = { a: 1, b: "hi" };
const result = nullify(obj);
assertEquals(result, obj);`,
        },
        {
          name: "Nullable type allows null values at runtime",
          code: `const n = nullify({ x: 42 });
(n as any).x = null;
assertEquals((n as any).x, null);`,
        },
        {
          name: "nullify works with nested-key objects",
          code: `const data = { name: "Ada", age: 36 };
const r = nullify(data);
assertEquals(r.name, "Ada");`,
        },
      ],
      hints: [
        "The mapped type body is `[K in keyof T]: T[K] | null;`",
        "For `nullify`, cast `obj as Nullable<T>` in the return statement.",
      ],
      explanation: `\`[K in keyof T]\` iterates every key. Appending \`| null\` to each value type makes every property nullable. The runtime function is a trivial identity cast — all the work happens at the type level.`,
    },
    // ── Lesson 2 ─────────────────────────────────────────────────────────────
    {
      slug: "optional-required",
      title: "Optional & Required: Modifying Modifiers",
      blurb: "Add or strip ? from every property with a mapped type.",
      xp: 30,
      content: `# Optional & Required: Modifying Modifiers

Mapped types can add or remove **modifiers** like \`?\` (optional) and
\`readonly\` using \`+\` (add) or \`-\` (remove):

\`\`\`ts
// Make every key optional
type Partial<T> = { [K in keyof T]?: T[K] };

// Make every key required (strip ?)
type Required<T> = { [K in keyof T]-?: T[K] };
\`\`\`

## Your task
Implement \`Mutable<T>\` — the opposite of \`Readonly<T>\`.
It should strip the \`readonly\` modifier from every property.

\`\`\`ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
\`\`\`

Then write \`mutableCopy<T>(obj: T): Mutable<T>\` which just returns \`obj\`
cast to \`Mutable<T>\`.`,
      starterCode: `// Strip readonly from every property
type Mutable<T> = {
  // TODO: use -readonly modifier
};

function mutableCopy<T>(obj: T): Mutable<T> {
  // TODO
}
`,
      solution: `type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

function mutableCopy<T>(obj: T): Mutable<T> {
  return obj as unknown as Mutable<T>;
}`,
      tests: [
        {
          name: "mutableCopy returns the same reference",
          code: `const obj = { x: 10 } as const;
const m = mutableCopy(obj);
assertEquals(m.x, 10);`,
        },
        {
          name: "mutableCopy works with multi-key objects",
          code: `const o = { a: 1, b: 2, c: 3 } as const;
const mc = mutableCopy(o);
assertEquals(mc.b, 2);`,
        },
      ],
      hints: [
        "Use `-readonly` before the key iterator to strip readonly.",
        "`return obj as unknown as Mutable<T>` is needed because TypeScript won't allow a direct cast from `T` to `Mutable<T>`.",
      ],
    },
    // ── Lesson 3 ─────────────────────────────────────────────────────────────
    {
      slug: "conditional-type-basics",
      title: "Conditional Types: Type-Level if/else",
      blurb: "T extends U ? A : B lets you branch on the shape of a type.",
      xp: 30,
      content: `# Conditional Types: Type-Level if/else

A **conditional type** checks whether a type satisfies a constraint, and
resolves to one of two branches:

\`\`\`ts
type IsString<T> = T extends string ? true : false;
// IsString<"hi">  → true
// IsString<42>    → false
\`\`\`

When used with a union, TypeScript **distributes** over each member:

\`\`\`ts
type IsString<T> = T extends string ? "yes" : "no";
type R = IsString<string | number>; // "yes" | "no"
\`\`\`

## Your task
Implement \`NonNullable<T>\` from scratch — it should remove \`null\` and
\`undefined\` from a union type.

\`\`\`ts
type MyNonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

Write that type alias. Then write \`ensureValue<T>(val: T): MyNonNullable<T>\`
that throws if \`val\` is \`null\` or \`undefined\`, otherwise returns it.`,
      starterCode: `// Remove null and undefined from T using a conditional type
type MyNonNullable<T> = // TODO

function ensureValue<T>(val: T): MyNonNullable<T> {
  // TODO: throw if null/undefined, else return val
}
`,
      solution: `type MyNonNullable<T> = T extends null | undefined ? never : T;

function ensureValue<T>(val: T): MyNonNullable<T> {
  if (val === null || val === undefined) {
    throw new Error("Value is null or undefined");
  }
  return val as MyNonNullable<T>;
}`,
      tests: [
        {
          name: "returns non-null value unchanged",
          code: `assertEquals(ensureValue(42), 42);`,
        },
        {
          name: "returns string unchanged",
          code: `assertEquals(ensureValue("hello"), "hello");`,
        },
        {
          name: "throws on null",
          code: `let threw = false;
try { ensureValue(null); } catch { threw = true; }
assertEquals(threw, true);`,
        },
        {
          name: "throws on undefined",
          code: `let threw = false;
try { ensureValue(undefined); } catch { threw = true; }
assertEquals(threw, true);`,
        },
      ],
      hints: [
        "The conditional type is: `T extends null | undefined ? never : T`",
        "For the function body, check `val === null || val === undefined` and throw; otherwise `return val as MyNonNullable<T>`.",
      ],
    },
    // ── Lesson 4 ─────────────────────────────────────────────────────────────
    {
      slug: "infer-keyword",
      title: "The infer Keyword: Extracting Types",
      blurb: "Use infer to capture and return a type from inside a constraint.",
      xp: 40,
      content: `# The infer Keyword: Extracting Types

Inside a conditional type's \`extends\` clause you can use \`infer R\` to
**capture** a type into a variable \`R\`:

\`\`\`ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// ReturnType<() => string>   → string
// ReturnType<() => number[]> → number[]
\`\`\`

TypeScript "figures out" what \`R\` must be for the match to hold, and lets you
use \`R\` in the true branch.

## Your task
Implement two utilities:

1. \`MyReturnType<T>\` — extracts the return type of a function type \`T\`.
2. \`FirstArg<T>\` — extracts the type of the **first argument** of a function.
   Return \`never\` if \`T\` is not a function or has no arguments.

\`\`\`ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type FirstArg<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never;
\`\`\`

After writing the types, write a runtime helper \`getReturnType\` that just
returns the string label of a return type for testing purposes — i.e., a
function that calls another function and returns its result:

\`\`\`ts
function callFn<T extends () => any>(fn: T): MyReturnType<T> {
  return fn() as MyReturnType<T>;
}
\`\`\``,
      starterCode: `// Implement MyReturnType and FirstArg using infer
type MyReturnType<T> = // TODO

type FirstArg<T> = // TODO

// Runtime helper for tests
function callFn<T extends () => any>(fn: T): MyReturnType<T> {
  // TODO: call fn and return its result
}
`,
      solution: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FirstArg<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never;

function callFn<T extends () => any>(fn: T): MyReturnType<T> {
  return fn() as MyReturnType<T>;
}`,
      tests: [
        {
          name: "callFn returns the function's result",
          code: `assertEquals(callFn(() => 99), 99);`,
        },
        {
          name: "callFn works with string-returning functions",
          code: `assertEquals(callFn(() => "typescript"), "typescript");`,
        },
        {
          name: "callFn works with array-returning functions",
          code: `const result = callFn(() => [1, 2, 3]);
assertEquals(JSON.stringify(result), JSON.stringify([1, 2, 3]));`,
        },
      ],
      hints: [
        "For `MyReturnType`: `T extends (...args: any[]) => infer R ? R : never`",
        "For `FirstArg`: `T extends (first: infer A, ...rest: any[]) => any ? A : never`",
        "For `callFn`: call `fn()` and cast to `MyReturnType<T>`.",
      ],
    },
    // ── Lesson 5 ─────────────────────────────────────────────────────────────
    {
      slug: "deep-readonly",
      title: "DeepReadonly: Recursive Mapped Types",
      blurb: "Recursively make every nested property readonly.",
      xp: 45,
      content: `# DeepReadonly: Recursive Mapped Types

TypeScript's built-in \`Readonly<T>\` only freezes the **top level**.
Nested objects remain mutable:

\`\`\`ts
type Config = { db: { host: string; port: number } };
type RConfig = Readonly<Config>;
// RConfig["db"] is still { host: string; port: number } — mutable!
\`\`\`

To go all the way down we need a **recursive** mapped type:

\`\`\`ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
\`\`\`

The conditional type checks: if the property value is an object, recurse;
otherwise leave it alone.

## Your task
Implement \`DeepReadonly<T>\` exactly as shown above, then write
\`deepFreeze<T extends object>(obj: T): DeepReadonly<T>\` that calls
\`Object.freeze\` recursively on every nested object and returns the result.`,
      starterCode: `// Recursively make every property (and nested property) readonly
type DeepReadonly<T> = {
  // TODO
};

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  // TODO: freeze obj and every nested object property, then return
}
`,
      solution: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  Object.freeze(obj);
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const val = obj[key];
    if (typeof val === "object" && val !== null) {
      deepFreeze(val as object);
    }
  }
  return obj as DeepReadonly<T>;
}`,
      tests: [
        {
          name: "top-level properties are frozen",
          code: `const cfg = deepFreeze({ host: "localhost", port: 5432 });
let threw = false;
try { (cfg as any).host = "other"; } catch { threw = true; }
// In strict mode an error is thrown; in sloppy mode the write is silently ignored.
// Either way, the property must not have changed.
assertEquals(cfg.host, "localhost");`,
        },
        {
          name: "nested objects are also frozen",
          code: `const cfg = deepFreeze({ db: { host: "localhost" } });
let threw = false;
try { (cfg.db as any).host = "other"; } catch { threw = true; }
assertEquals(cfg.db.host, "localhost");`,
        },
        {
          name: "primitive values are preserved",
          code: `const cfg = deepFreeze({ n: 42, s: "hi", b: true });
assertEquals(cfg.n, 42);
assertEquals(cfg.s, "hi");
assertEquals(cfg.b, true);`,
        },
      ],
      hints: [
        "The recursive step is: `T[K] extends object ? DeepReadonly<T[K]> : T[K]`",
        "In `deepFreeze`, use `Object.freeze(obj)`, then iterate keys and recurse on object-type values.",
        "Guard against `null` with `val !== null` before recursing — `typeof null === 'object'` in JS.",
      ],
      explanation: `Recursive mapped types call themselves on nested values, drilling down until they hit primitives. \`deepFreeze\` mirrors this at runtime with \`Object.freeze\`.`,
    },
    // ── Lesson 6 ─────────────────────────────────────────────────────────────
    {
      slug: "deep-partial",
      title: "DeepPartial: Deep Optional Properties",
      blurb: "Make every nested property optional — useful for config merging.",
      xp: 45,
      content: `# DeepPartial: Deep Optional Properties

The built-in \`Partial<T>\` makes top-level properties optional but leaves
nested types unchanged. For config objects and deep merges you often need
\`DeepPartial<T>\`:

\`\`\`ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
\`\`\`

The \`?\` after the key makes every property optional. The conditional type
recurses into nested objects.

## Your task
Implement \`DeepPartial<T>\` as above.

Then write \`mergeDeep<T extends object>(base: T, patch: DeepPartial<T>): T\`
that merges a deep patch into a base object (shallow-merge at each level,
recursing into nested objects). Return a new object — do not mutate \`base\`.

You may use a simple recursive \`Object.assign\`-style merge:
- For each key in \`patch\`, if both \`base[k]\` and \`patch[k]\` are plain objects,
  recurse; otherwise use the patch value.`,
      starterCode: `type DeepPartial<T> = {
  // TODO
};

function mergeDeep<T extends object>(base: T, patch: DeepPartial<T>): T {
  // TODO: return a new merged object
}
`,
      solution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function mergeDeep<T extends object>(base: T, patch: DeepPartial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const pVal = (patch as any)[key];
    const bVal = (base as any)[key];
    if (
      pVal !== null &&
      typeof pVal === "object" &&
      bVal !== null &&
      typeof bVal === "object"
    ) {
      (result as any)[key] = mergeDeep(bVal, pVal);
    } else if (pVal !== undefined) {
      (result as any)[key] = pVal;
    }
  }
  return result;
}`,
      tests: [
        {
          name: "merges top-level scalar",
          code: `const result = mergeDeep({ a: 1, b: 2 }, { b: 99 });
assertEquals(result.a, 1);
assertEquals(result.b, 99);`,
        },
        {
          name: "merges nested object",
          code: `const base = { db: { host: "localhost", port: 5432 } };
const result = mergeDeep(base, { db: { port: 9999 } });
assertEquals(result.db.host, "localhost");
assertEquals(result.db.port, 9999);`,
        },
        {
          name: "does not mutate base",
          code: `const base = { x: 1, y: 2 };
mergeDeep(base, { x: 99 });
assertEquals(base.x, 1);`,
        },
      ],
      hints: [
        "DeepPartial: add `?` after the key — `[K in keyof T]?: ...`",
        "In `mergeDeep`, spread `base` into a new object first so you don't mutate it.",
        "Before recursing, check that both values are non-null objects.",
      ],
    },
    // ── Lesson 7 ─────────────────────────────────────────────────────────────
    {
      slug: "key-remapping",
      title: "Key Remapping with as",
      blurb: "Rename keys in a mapped type using the as clause.",
      xp: 40,
      content: `# Key Remapping with \`as\`

TypeScript 4.1 added **key remapping** in mapped types via the \`as\` clause:

\`\`\`ts
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
\`\`\`

Here \`Capitalize<string & K>\` capitalizes the key name, and the template
literal prefix adds \`"get"\`. You can also **filter keys** by mapping to
\`never\`:

\`\`\`ts
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
\`\`\`

## Your task
Implement two mapped types:

1. \`Getters<T>\` — transforms each key \`k\` of \`T\` into a method
   \`getK(): T[K]\`. Use the template literal \`\`\`get\${Capitalize<string & K>}\`\`\`
   for the new key name.

2. \`PickByValue<T, V>\` — keeps only the keys of \`T\` whose value type extends
   \`V\`. Use \`as\` + \`never\` filtering.

Then write \`makeGetters<T extends object>(obj: T): Getters<T>\` that builds
a getter object at runtime.`,
      starterCode: `// Build getter methods from an object type
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Keep only keys whose value type extends V
type PickByValue<T, V> = {
  // TODO: use K in keyof T as ... to filter
};

// Build getter object at runtime
function makeGetters<T extends object>(obj: T): Getters<T> {
  // TODO
}
`,
      solution: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

function makeGetters<T extends object>(obj: T): Getters<T> {
  const result: any = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const getterName = "get" + String(key).charAt(0).toUpperCase() + String(key).slice(1);
    result[getterName] = () => obj[key];
  }
  return result as Getters<T>;
}`,
      tests: [
        {
          name: "makeGetters creates getName",
          code: `const g = makeGetters({ name: "Ada", age: 36 });
assertEquals((g as any).getName(), "Ada");`,
        },
        {
          name: "makeGetters creates getAge",
          code: `const g = makeGetters({ name: "Ada", age: 36 });
assertEquals((g as any).getAge(), 36);`,
        },
        {
          name: "getters reflect live values (closure over obj)",
          code: `const source: any = { score: 10 };
const g = makeGetters(source);
assertEquals((g as any).getScore(), 10);`,
        },
      ],
      hints: [
        "For `PickByValue`: `[K in keyof T as T[K] extends V ? K : never]: T[K]`",
        "For `makeGetters`: capitalize the first char of each key name and prefix with `'get'`.",
        "Use `Object.keys` and build a plain object, then cast to `Getters<T>`.",
      ],
    },
    // ── Lesson 8 ─────────────────────────────────────────────────────────────
    {
      slug: "union-to-intersection",
      title: "UnionToIntersection: The Variance Trick",
      blurb: "Convert a union of types into their intersection using function contravariance.",
      xp: 50,
      content: `# UnionToIntersection: The Variance Trick

One of the most surprising TypeScript recipes: converting a union type
\`A | B | C\` into an intersection \`A & B & C\`.

The trick exploits **contravariance** — a function parameter position flips
the direction of subtyping. When TypeScript sees a union in a contravariant
position, it must infer a type that works for **all** members, which is their
intersection:

\`\`\`ts
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;
\`\`\`

Step-by-step:
1. \`U extends any ? (k: U) => void : never\` — distribute over each union
   member, wrapping each in a function type.
2. \`extends (k: infer I) => void\` — ask TypeScript to unify all those
   function types. Because the parameter is **contravariant**, TypeScript
   infers the intersection of all the \`U\`s.

## Your task
Implement \`UnionToIntersection<U>\` exactly as shown.

Then implement \`mergeUnion<U extends object>(objects: U[]): UnionToIntersection<U>\`
that merges an array of objects with \`Object.assign\` and returns the result.

\`\`\`ts
mergeUnion([{ a: 1 }, { b: 2 }])
// → { a: 1, b: 2 }  typed as { a: number } & { b: number }
\`\`\``,
      starterCode: `// The contravariance trick
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

function mergeUnion<U extends object>(objects: U[]): UnionToIntersection<U> {
  // TODO: use Object.assign to merge all objects into one
}
`,
      solution: `type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

function mergeUnion<U extends object>(objects: U[]): UnionToIntersection<U> {
  return Object.assign({}, ...objects) as UnionToIntersection<U>;
}`,
      tests: [
        {
          name: "merges two objects",
          code: `const result = mergeUnion([{ a: 1 }, { b: 2 }]);
assertEquals((result as any).a, 1);
assertEquals((result as any).b, 2);`,
        },
        {
          name: "later object overwrites earlier on collision",
          code: `const result = mergeUnion([{ x: 1 }, { x: 99 }]);
assertEquals((result as any).x, 99);`,
        },
        {
          name: "works with single object",
          code: `const result = mergeUnion([{ name: "Grace" }]);
assertEquals((result as any).name, "Grace");`,
        },
        {
          name: "merges three objects",
          code: `const result = mergeUnion([{ a: 1 }, { b: 2 }, { c: 3 }]);
assertEquals((result as any).a, 1);
assertEquals((result as any).c, 3);`,
        },
      ],
      hints: [
        "The `UnionToIntersection` type is already given in the starter; just keep it.",
        "For `mergeUnion`: `Object.assign({}, ...objects)` spreads the array as arguments.",
        "Cast the result to `UnionToIntersection<U>` since TypeScript can't verify it automatically.",
      ],
      explanation: `The contravariance trick is one of the most beautiful patterns in TypeScript's type system. Function parameters are contravariant — they require a type that is a supertype of all callers, which for a union is exactly its intersection.`,
    },
    // ── Lesson 9 (quiz) ──────────────────────────────────────────────────────
    {
      slug: "mapped-conditional-quiz",
      title: "Mapped & Conditional Types: Knowledge Check",
      blurb: "Test your mental model of the type system before moving on.",
      xp: 30,
      kind: "quiz",
      content: `# Mapped & Conditional Types: Knowledge Check

You've built \`Nullable\`, \`Mutable\`, \`DeepReadonly\`, \`DeepPartial\`,
\`Getters\`, and \`UnionToIntersection\` from scratch.

Before moving on, make sure you can answer these questions without looking
at the code.`,
      questions: [
        {
          prompt: "What does `[K in keyof T]-?: T[K]` do?",
          options: [
            "Makes every property readonly",
            "Makes every property required by removing the optional `?` modifier",
            "Deletes all keys from T",
            "Adds null to every value type",
          ],
          answer: 1,
          explanation:
            "The `-?` modifier removes the optionality flag, making every property required. Analogously, `-readonly` removes the readonly flag.",
        },
        {
          prompt: "What does `infer R` do in a conditional type?",
          options: [
            "It declares a new runtime variable named R",
            "It tells TypeScript to infer and capture a type into R inside the extends clause",
            "It imports a type from another module",
            "It makes R optional",
          ],
          answer: 1,
          explanation:
            "`infer R` asks TypeScript to figure out what type R must be for the conditional's extends clause to match, and captures it so you can use R in the true branch.",
        },
        {
          prompt: "Why does `DeepReadonly<T>` need to recurse?",
          options: [
            "Because TypeScript is slow and needs multiple passes",
            "Because `Readonly<T>` only freezes top-level keys; nested object properties remain mutable",
            "Because `keyof T` only returns one key at a time",
            "Because mapped types can't handle unions",
          ],
          answer: 1,
          explanation:
            "Readonly only applies the modifier to the immediate properties. Without recursion, a property like `{ db: { host: string } }` would have a readonly `db` reference but a mutable `db.host`.",
        },
        {
          prompt: "In `UnionToIntersection<U>`, why does placing a union in a function parameter position produce an intersection?",
          options: [
            "Function parameters are covariant, so TypeScript widens them",
            "Function parameters are contravariant — a single function type must handle all union members, forcing TypeScript to infer their intersection",
            "TypeScript always converts unions to intersections in generics",
            "The `infer` keyword reverses unions automatically",
          ],
          answer: 1,
          explanation:
            "Parameters are contravariant: if you need one function that can be called with any member of the union, its parameter type must be the intersection of all those members. TypeScript exploits this when it unifies the distributed function types.",
        },
        {
          prompt: "What does `[K in keyof T as T[K] extends string ? K : never]: T[K]` do?",
          options: [
            "Maps every key to a string type",
            "Keeps only keys whose value type is or extends string, filtering out the rest",
            "Converts all values to string",
            "Renames all keys to strings",
          ],
          answer: 1,
          explanation:
            "When the `as` clause resolves to `never` for a key, that key is excluded from the resulting type. This is the standard pattern for filtering keys by value type.",
        },
      ],
    },
  ],
};
