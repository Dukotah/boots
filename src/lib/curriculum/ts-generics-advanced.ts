import type { Module } from "./types";

// Advanced TypeScript Generics — constraints, infer, keyof/typeof, mapped types,
// template literal types, and higher-order generic patterns.
// Auto-graded in-browser with the TypeScript (ts) runtime.
export const tsGenericsAdvanced: Module = {
  slug: "ts-generics-advanced",
  title: "Advanced TypeScript Generics",
  description:
    "Go beyond basic generics: write constrained, infer-powered, mapped, and higher-order generic utilities that read like magic and are demanded in every senior TypeScript interview.",
  emoji: "🧬",
  gradient: "from-indigo-400/20 to-violet-500/10",
  tagline:
    "Master TypeScript generics: constraints, infer, keyof, typeof, mapped types, template literals, and higher-order patterns.",
  language: "ts",
  keywords: [
    "typescript generics advanced",
    "typescript infer",
    "typescript keyof typeof",
    "typescript mapped types",
    "typescript conditional types",
    "typescript higher order generics",
    "typescript generic constraints",
  ],
  lessons: [
    // ── Lesson 1: Generic Constraints ─────────────────────────────────────────
    {
      slug: "generic-constraints",
      title: "Generic Constraints with extends",
      blurb: "Restrict what T can be so you can safely access its properties.",
      xp: 30,
      language: "ts",
      content: `# Generic Constraints with \`extends\`

Without constraints a generic \`T\` is completely unknown — you can't read any
properties from it. Adding \`extends SomeType\` tells TypeScript: *T must at
least have these members*, which unlocks safe property access.

\`\`\`ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length; // ✅ safe — T is guaranteed to have .length
}

getLength("hello"); // 5
getLength([1, 2, 3]); // 3
\`\`\`

The constraint \`T extends { length: number }\` accepts strings, arrays, or any
object with a \`length\` property, while rejecting \`number\` or \`boolean\`.

## Your task
Write a generic function \`pluck<T extends object, K extends keyof T>(obj: T, key: K): T[K]\`
that returns \`obj[key]\`.

- \`T extends object\` — obj must be an object
- \`K extends keyof T\` — key must be an actual key of obj
- Return type is \`T[K]\` — the exact type of that property`,
      starterCode: `function pluck<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  // return obj[key]
}
`,
      solution: `function pluck<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
      tests: [
        {
          name: "plucks a string property",
          code: `const user = { name: "Alice", age: 30 };
assertEquals(pluck(user, "name"), "Alice");`,
        },
        {
          name: "plucks a number property",
          code: `const user = { name: "Alice", age: 30 };
assertEquals(pluck(user, "age"), 30);`,
        },
        {
          name: "works on nested objects",
          code: `const config = { host: "localhost", port: 8080 };
assertEquals(pluck(config, "port"), 8080);`,
        },
      ],
      hints: [
        "The function body is a one-liner: just return the value at the key.",
        "TypeScript knows T[K] is the type of obj[key] because of the constraints.",
      ],
      explanation: `\`K extends keyof T\` is the key insight — it links the *key parameter*
to the *object type*, so TypeScript can infer the exact return type \`T[K]\`
for every call site. No casts needed.`,
    },

    // ── Lesson 2: keyof and typeof ─────────────────────────────────────────────
    {
      slug: "keyof-typeof",
      title: "keyof and typeof: Type-Level Extraction",
      blurb: "Turn runtime values and shapes into first-class types.",
      xp: 35,
      language: "ts",
      content: `# \`keyof\` and \`typeof\`: Type-Level Extraction

**\`keyof T\`** produces a union of the string/symbol keys of type \`T\`:

\`\`\`ts
type User = { id: number; name: string; admin: boolean };
type UserKey = keyof User; // "id" | "name" | "admin"
\`\`\`

**\`typeof value\`** lifts a *runtime* value into a *type*:

\`\`\`ts
const COLORS = { red: "#f00", green: "#0f0", blue: "#00f" };
type ColorName = keyof typeof COLORS; // "red" | "green" | "blue"
\`\`\`

Together they let you create enums from objects and write APIs that are
automatically in sync with runtime constants — no duplication.

## Your task
Write a generic function \`getKeys<T extends object>(obj: T): Array<keyof T>\`
that returns the object's own enumerable keys as an array typed to \`Array<keyof T>\`.

Use \`Object.keys(obj)\` internally (cast the result appropriately).`,
      starterCode: `function getKeys<T extends object>(obj: T): Array<keyof T> {
  // return Object.keys cast to Array<keyof T>
}
`,
      solution: `function getKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}`,
      tests: [
        {
          name: "returns keys of a plain object",
          code: `const result = getKeys({ a: 1, b: 2, c: 3 });
assertEquals(JSON.stringify(result.sort()), JSON.stringify(["a","b","c"]));`,
        },
        {
          name: "empty object returns empty array",
          code: `assertEquals(JSON.stringify(getKeys({})), JSON.stringify([]));`,
        },
        {
          name: "works for mixed-value objects",
          code: `const keys = getKeys({ x: true, y: "hello", z: 42 });
assert(keys.includes("x"));
assert(keys.includes("y"));
assert(keys.includes("z"));`,
        },
      ],
      hints: [
        "`Object.keys` always returns `string[]`. Cast it to `Array<keyof T>` with the `as` keyword.",
        "The cast is safe here because Object.keys only returns own enumerable keys, which are a subset of keyof T.",
      ],
    },

    // ── Lesson 3: Conditional Types ────────────────────────────────────────────
    {
      slug: "conditional-types",
      title: "Conditional Types: T extends … ? A : B",
      blurb: "Branch on types just like branching on values.",
      xp: 40,
      language: "ts",
      content: `# Conditional Types

Conditional types let you choose between two types based on whether \`T\` satisfies
a constraint:

\`\`\`ts
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false
\`\`\`

The standard library uses this everywhere — \`NonNullable<T>\`,
\`ReturnType<F>\`, \`Parameters<F>\` are all conditional types.

## Your task
Write a generic function \`wrapIfArray<T>(value: T): T extends any[] ? T : T[]\`
that:
- Returns \`value\` unchanged if it is already an array
- Wraps \`value\` in an array \`[value]\` if it is not

Use \`Array.isArray\` to branch at runtime.`,
      starterCode: `function wrapIfArray<T>(value: T): T extends any[] ? T : T[] {
  // if value is already an array, return it; otherwise wrap it
}
`,
      solution: `function wrapIfArray<T>(value: T): T extends any[] ? T : T[] {
  if (Array.isArray(value)) {
    return value as T extends any[] ? T : T[];
  }
  return [value] as T extends any[] ? T : T[];
}`,
      tests: [
        {
          name: "wraps a non-array value",
          code: `const result = wrapIfArray(42);
assertEquals(JSON.stringify(result), JSON.stringify([42]));`,
        },
        {
          name: "returns array unchanged",
          code: `const arr = [1, 2, 3];
const result = wrapIfArray(arr);
assertEquals(JSON.stringify(result), JSON.stringify([1, 2, 3]));`,
        },
        {
          name: "wraps a string",
          code: `const result = wrapIfArray("hello");
assertEquals(JSON.stringify(result), JSON.stringify(["hello"]));`,
        },
        {
          name: "does not double-wrap an array",
          code: `const result = wrapIfArray([10, 20]);
assertEquals(result.length, 2);`,
        },
      ],
      hints: [
        "Use `Array.isArray(value)` to check at runtime.",
        "The conditional return type means TypeScript won't infer the narrowed type automatically — you need `as` casts on both branches.",
      ],
      explanation: `The runtime behavior mirrors the type: \`Array.isArray\` checks at runtime,
and the conditional type \`T extends any[] ? T : T[]\` describes that same
logic at the type level. The \`as\` casts are necessary because TypeScript
cannot yet narrow conditional return types from runtime guards alone.`,
    },

    // ── Lesson 4: infer ────────────────────────────────────────────────────────
    {
      slug: "infer-keyword",
      title: "The infer Keyword: Extract Nested Types",
      blurb: "Pull a type out of another type at compile-time.",
      xp: 45,
      language: "ts",
      content: `# The \`infer\` Keyword

Inside a conditional type you can use \`infer\` to *capture* and *name* a type
that TypeScript infers from a pattern match:

\`\`\`ts
// Built-in: extracts the return type of any function
type ReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never;

type R = ReturnType<() => number>; // number
\`\`\`

\`infer R\` says: "if T matches this shape, call the matched part R and give me R."

## Your task
Write a generic utility type \`UnpackArray<T>\` that, given an array type,
returns its element type; otherwise returns \`T\` unchanged:

\`\`\`ts
type A = UnpackArray<string[]>;  // string
type B = UnpackArray<number[]>;  // number
type C = UnpackArray<boolean>;   // boolean  (not an array — pass-through)
\`\`\`

Then write a runtime function \`unpackFirst<T>(value: T): UnpackArray<T>\`
that returns \`value[0]\` if \`value\` is an array, otherwise returns \`value\` itself.`,
      starterCode: `type UnpackArray<T> = T extends (infer U)[] ? U : T;

function unpackFirst<T>(value: T): UnpackArray<T> {
  // return value[0] if array, otherwise return value
}
`,
      solution: `type UnpackArray<T> = T extends (infer U)[] ? U : T;

function unpackFirst<T>(value: T): UnpackArray<T> {
  if (Array.isArray(value)) {
    return value[0] as UnpackArray<T>;
  }
  return value as UnpackArray<T>;
}`,
      tests: [
        {
          name: "extracts first element of an array",
          code: `const result = unpackFirst([10, 20, 30]);
assertEquals(result, 10);`,
        },
        {
          name: "passes through a non-array value",
          code: `const result = unpackFirst("hello");
assertEquals(result, "hello");`,
        },
        {
          name: "passes through a number",
          code: `const result = unpackFirst(42);
assertEquals(result, 42);`,
        },
        {
          name: "returns undefined for empty array",
          code: `const result = unpackFirst([]);
assertEquals(result, undefined);`,
        },
      ],
      hints: [
        "The type `UnpackArray<T>` is already given in the starter code — focus on the runtime function.",
        "`Array.isArray(value)` narrows the runtime check; use `as UnpackArray<T>` to satisfy the type checker.",
      ],
    },

    // ── Lesson 5: Mapped Types ─────────────────────────────────────────────────
    {
      slug: "mapped-types",
      title: "Mapped Types: Transform Every Property",
      blurb: "Iterate over an object's keys and reshape each value type.",
      xp: 45,
      language: "ts",
      content: `# Mapped Types

A **mapped type** iterates over a union of keys and produces a new object type:

\`\`\`ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

You can modify modifiers too:
- Add \`readonly\` or \`?\` with \`+readonly\` / \`+?\`
- Remove them with \`-readonly\` / \`-?\`

## Your task
Write a function \`makePartial<T extends object>(obj: T): Partial<T>\` that
returns a **shallow copy** of \`obj\` (so the original is not mutated).

Then write \`makeReadonly<T extends object>(obj: T): Readonly<T>\` that also
returns a **shallow copy** (in JavaScript, "readonly" is a type annotation, not
a runtime freeze — just copy the object).`,
      starterCode: `function makePartial<T extends object>(obj: T): Partial<T> {
  // return a shallow copy of obj (all properties are already there, Partial just relaxes the types)
}

function makeReadonly<T extends object>(obj: T): Readonly<T> {
  // return a shallow copy of obj
}
`,
      solution: `function makePartial<T extends object>(obj: T): Partial<T> {
  return { ...obj };
}

function makeReadonly<T extends object>(obj: T): Readonly<T> {
  return { ...obj };
}`,
      tests: [
        {
          name: "makePartial returns a copy with all properties",
          code: `const original = { name: "Bob", age: 25 };
const partial = makePartial(original);
assertEquals(partial.name, "Bob");
assertEquals(partial.age, 25);`,
        },
        {
          name: "makePartial does not mutate the original",
          code: `const original = { x: 1 };
const copy = makePartial(original);
(copy as any).x = 99;
assertEquals(original.x, 1);`,
        },
        {
          name: "makeReadonly returns a copy with all properties",
          code: `const original = { title: "TS", version: 5 };
const frozen = makeReadonly(original);
assertEquals(frozen.title, "TS");
assertEquals(frozen.version, 5);`,
        },
        {
          name: "makeReadonly does not mutate the original",
          code: `const original = { a: 10 };
const copy = makeReadonly(original);
(copy as any).a = 999;
assertEquals(original.a, 10);`,
        },
      ],
      hints: [
        "The simplest implementation of both functions is a spread: `return { ...obj };`.",
        "At runtime, `Partial<T>` and `Readonly<T>` are purely type-level — the JS behavior is identical.",
      ],
      explanation: `\`Partial<T>\` and \`Readonly<T>\` are built-in mapped types. At runtime, a
spread \`{ ...obj }\` satisfies both: it creates a new object (non-mutating)
with the same keys. The type system does the heavy lifting to enforce correct
usage at call sites.`,
    },

    // ── Lesson 6: Pick / Omit via Mapped Types ─────────────────────────────────
    {
      slug: "pick-omit",
      title: "Building Pick and Omit from Scratch",
      blurb: "Implement TypeScript's built-in utilities to understand mapped types deeply.",
      xp: 50,
      language: "ts",
      content: `# Building Pick and Omit from Scratch

TypeScript ships \`Pick<T, K>\` and \`Omit<T, K>\` as built-ins, but building
them yourself cements mapped-type thinking.

\`\`\`ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// Iterates only over the keys in K, keeping their original types.

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
// "as" clause filters keys: if P is in K, remap to never (drop it).
\`\`\`

## Your task
Write two **runtime** functions that implement Pick and Omit behaviour:

1. \`pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>\`
   — returns a new object containing only the listed keys.

2. \`omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>\`
   — returns a new object with the listed keys removed.`,
      starterCode: `function pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // build and return a new object with only the given keys
}

function omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  // build and return a new object excluding the given keys
}
`,
      solution: `function pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

function omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const keySet = new Set(keys as string[]);
  const result = {} as Omit<T, K>;
  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (!keySet.has(key as string)) {
      (result as any)[key] = obj[key];
    }
  }
  return result;
}`,
      tests: [
        {
          name: "pickKeys returns only requested keys",
          code: `const user = { id: 1, name: "Alice", role: "admin", age: 30 };
const picked = pickKeys(user, ["id", "name"]);
assertEquals(picked.id, 1);
assertEquals(picked.name, "Alice");
assertEquals((picked as any).role, undefined);
assertEquals((picked as any).age, undefined);`,
        },
        {
          name: "omitKeys excludes listed keys",
          code: `const user = { id: 1, name: "Alice", password: "secret" };
const safe = omitKeys(user, ["password"]);
assertEquals(safe.id, 1);
assertEquals(safe.name, "Alice");
assertEquals((safe as any).password, undefined);`,
        },
        {
          name: "pickKeys with a single key",
          code: `const data = { a: 10, b: 20, c: 30 };
const result = pickKeys(data, ["b"]);
assertEquals(result.b, 20);`,
        },
        {
          name: "omitKeys with multiple keys",
          code: `const data = { a: 1, b: 2, c: 3, d: 4 };
const result = omitKeys(data, ["a", "c"]);
assertEquals((result as any).a, undefined);
assertEquals((result as any).c, undefined);
assertEquals((result as any).b, 2);
assertEquals((result as any).d, 4);`,
        },
      ],
      hints: [
        "For `pickKeys`: create an empty object, loop over `keys`, copy each property.",
        "For `omitKeys`: create a `Set` from the keys to drop, then loop over `Object.keys(obj)` and copy keys NOT in the set.",
        "TypeScript won't let you index into `result` without a cast — use `result[key] = obj[key]` for pickKeys or `(result as any)[key]` for omitKeys.",
      ],
    },

    // ── Lesson 7: Higher-Order Generic Functions ───────────────────────────────
    {
      slug: "higher-order-generics",
      title: "Higher-Order Generic Functions",
      blurb: "Write functions that accept and return other generic functions.",
      xp: 50,
      language: "ts",
      content: `# Higher-Order Generic Functions

A **higher-order function** takes or returns another function. In TypeScript you
can express these fully generically so callers get end-to-end type inference:

\`\`\`ts
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key)!;
  }) as T;
}
\`\`\`

The built-in utility types **\`ReturnType<F>\`** and **\`Parameters<F>\`** are
indispensable here — they use \`infer\` under the hood.

## Your task
Write a generic function \`once<T extends (...args: any[]) => any>(fn: T): T\`
that returns a wrapper which calls \`fn\` the **first time** it is invoked, caches
the result, and returns that cached result on every subsequent call without
calling \`fn\` again.`,
      starterCode: `function once<T extends (...args: any[]) => any>(fn: T): T {
  // the returned wrapper should call fn only on the first invocation
}
`,
      solution: `function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}`,
      tests: [
        {
          name: "calls fn once and returns its result",
          code: `let count = 0;
const init = once(() => { count++; return 42; });
const r1 = init();
const r2 = init();
assertEquals(r1, 42);
assertEquals(r2, 42);
assertEquals(count, 1);`,
        },
        {
          name: "subsequent calls return the cached result",
          code: `const expensive = once((x: number) => x * x);
assertEquals(expensive(5), 25);
assertEquals(expensive(99), 25); // still returns first call's result`,
        },
        {
          name: "works with no arguments",
          code: `let invoked = 0;
const greet = once(() => { invoked++; return "hello"; });
greet(); greet(); greet();
assertEquals(invoked, 1);`,
        },
      ],
      hints: [
        "Keep a `called` boolean flag in the closure.",
        "Store `result` as a variable in the outer scope; assign it on the first call and return it every time.",
        "Cast the returned arrow function `as T` so TypeScript accepts it as the same function type.",
      ],
      explanation: `The \`once\` pattern is a classic in functional programming. The generic
signature \`T extends (...args: any[]) => any\` means the wrapper preserves
the exact argument and return types of the original function — callers get
full autocomplete and type checking.`,
    },

    // ── Lesson 8: Template Literal Types ──────────────────────────────────────
    {
      slug: "template-literal-types",
      title: "Template Literal Types",
      blurb: "Compose string literal types like template strings.",
      xp: 40,
      language: "ts",
      content: `# Template Literal Types

TypeScript 4.1+ lets you build string literal types using template syntax:

\`\`\`ts
type EventName = "click" | "focus" | "blur";
type Handler = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"
\`\`\`

Combined with mapped types, you can auto-generate event handler object shapes:

\`\`\`ts
type Handlers<T extends string> = {
  [K in T as \`on\${Capitalize<K>}\`]: () => void;
};
\`\`\`

## Your task
Write a generic function \`createEventMap<T extends string>(events: T[]): Record<string, null>\`
that takes an array of event name strings and returns an object where each key
is \`"on" + capitalized event name\` and each value is \`null\`.

Example: \`createEventMap(["click", "focus"])\` →
\`{ onClick: null, onFocus: null }\``,
      starterCode: `function createEventMap<T extends string>(events: T[]): Record<string, null> {
  // for each event, create a key "on" + Capitalized(event) with value null
}
`,
      solution: `function createEventMap<T extends string>(events: T[]): Record<string, null> {
  const result: Record<string, null> = {};
  for (const event of events) {
    const key = "on" + event.charAt(0).toUpperCase() + event.slice(1);
    result[key] = null;
  }
  return result;
}`,
      tests: [
        {
          name: "creates onClick and onFocus",
          code: `const map = createEventMap(["click", "focus"]);
assertEquals(map["onClick"], null);
assertEquals(map["onFocus"], null);`,
        },
        {
          name: "capitalizes single-character event names",
          code: `const map = createEventMap(["x"]);
assertEquals(map["onX"], null);`,
        },
        {
          name: "empty array returns empty object",
          code: `const map = createEventMap([]);
assertEquals(Object.keys(map).length, 0);`,
        },
        {
          name: "handles multiple events",
          code: `const map = createEventMap(["blur", "change", "submit"]);
assertEquals(map["onBlur"], null);
assertEquals(map["onChange"], null);
assertEquals(map["onSubmit"], null);`,
        },
      ],
      hints: [
        "Capitalize the first character with `event.charAt(0).toUpperCase() + event.slice(1)`.",
        "Prefix with `\"on\"` to match the template literal type pattern `\\`on\\${Capitalize<K>}\\``.",
      ],
      explanation: `Template literal types let TypeScript's type system manipulate string
shapes at compile-time, but you still implement the runtime behavior with
normal string operations. The type \`\\\`on\\\${Capitalize<T>}\\\`\` and the runtime
\`"on" + capitalize(event)\` are two sides of the same coin.`,
    },

    // ── Lesson 9: Variance Quiz ────────────────────────────────────────────────
    {
      slug: "variance-quiz",
      title: "Covariance, Contravariance & Generics",
      blurb: "Understand why some generic types are safe to widen and others aren't.",
      xp: 35,
      kind: "quiz",
      content: `# Covariance, Contravariance & Generics

**Variance** describes how subtype relationships propagate through generic types.

**Covariant** — the generic preserves the subtype direction.
\`string extends string | number\`, so \`Array<string> extends Array<string | number>\` ✅

**Contravariant** — the subtype direction *flips* for function parameters.
\`(val: string | number) => void\` is assignable to \`(val: string) => void\` ✅
(accepts more, so it's safe for callers that pass strings)

**Invariant** — neither direction is safe.
Mutable generic containers like a writable \`Box<T>\` are invariant.

TypeScript uses **structural typing** and often approximates variance rather
than enforcing it strictly, but understanding these rules explains why
seemingly safe assignments sometimes fail — and vice versa.

Key rules to remember:
- **Return types** are covariant (narrow → wide is safe for consumers)
- **Parameter types** are contravariant (wide → narrow is safe for callers)
- **Readonly arrays** (\`ReadonlyArray<T>\`) are covariant; **mutable arrays** are technically invariant but TypeScript treats them covariantly (with a bivariant escape hatch for methods)`,
      questions: [
        {
          prompt:
            "You have `type Producer<T> = () => T`. Is `Producer<string>` assignable to `Producer<string | number>`?",
          options: [
            "Yes — return types are covariant, so a narrower return type is assignable to a wider one",
            "No — generic types are always invariant in TypeScript",
            "Only if you add `readonly`",
          ],
          answer: 0,
          explanation:
            "`Producer<T>` only produces values (return type). Return types are covariant: `string` is a subtype of `string | number`, so `Producer<string>` is a subtype of `Producer<string | number>`. A caller expecting a `string | number` back is perfectly happy receiving a `string`.",
        },
        {
          prompt:
            "You have `type Consumer<T> = (val: T) => void`. Is `Consumer<string | number>` assignable to `Consumer<string>`?",
          options: [
            "No — parameter types must match exactly",
            "Yes — parameter types are contravariant: a function that handles more is safe where less is expected",
            "Only with a generic constraint",
          ],
          answer: 1,
          explanation:
            "Parameter types are contravariant. A `Consumer<string | number>` can handle any string (and more), so it is safe to use wherever a `Consumer<string>` is expected. The direction flips compared to return types.",
        },
        {
          prompt:
            "Why does TypeScript sometimes allow `Array<string>` to be assigned to `Array<string | number>` even though mutable arrays are technically invariant?",
          options: [
            "TypeScript enforces strict invariance for all arrays — this assignment is never allowed",
            "TypeScript uses structural/bivariant checking for array methods, so it allows the assignment but it can be unsound in edge cases",
            "Arrays are always readonly in TypeScript",
          ],
          answer: 1,
          explanation:
            "TypeScript prioritizes usability and uses structural typing. Mutable arrays are technically invariant (you could push a `number` into an `Array<string>` through an `Array<string | number>` reference), but TypeScript allows the assignment with bivariant method checking. For truly sound covariance use `ReadonlyArray<T>`.",
        },
        {
          prompt:
            "Which utility type makes a generic type safe for covariant use by preventing mutation?",
          options: [
            "Partial<T>",
            "ReadonlyArray<T> / Readonly<T>",
            "Required<T>",
          ],
          answer: 1,
          explanation:
            "`ReadonlyArray<T>` (and `Readonly<T>` for objects) removes mutating methods, making the type covariant and safe to assign in the narrower-to-wider direction without soundness issues.",
        },
      ],
    },
  ],
};
