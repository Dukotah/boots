import type { Module } from "./types";

// Portfolio TypeScript — real, portfolio-worthy projects written in typed TypeScript.
// Each lesson is a complete mini-project: spec → typed implementation → auto-graded tests.
// Demonstrates to employers that you write production-quality, type-safe code.
export const portfolioTypescript: Module = {
  slug: "portfolio-typescript",
  title: "TypeScript Projects",
  description:
    "Build five real, typed projects you can drop straight into a portfolio or GitHub. Each one solves a genuine engineering problem — state machines, validators, event buses, Result utilities, and safe deep-access — using the TypeScript features employers actually look for.",
  emoji: "🟦",
  gradient: "from-blue-500/20 to-indigo-500/10",
  tagline: "build typed portfolio projects that prove you know TypeScript",
  language: "ts",
  keywords: [
    "typescript projects",
    "typescript portfolio",
    "typescript state machine",
    "typescript generics projects",
    "learn typescript by building",
  ],
  lessons: [
    // ── Lesson 1: Typed Finite-State Machine ─────────────────────────────────
    {
      slug: "typed-state-machine",
      title: "Typed Finite-State Machine",
      blurb: "Model any process as a typed graph of states and transitions.",
      xp: 50,
      language: "ts",
      content: `## What you're building

A generic, typed **finite-state machine (FSM)** — the backbone of traffic lights,
game logic, order management, and UI flows. Your FSM will enforce that only
valid transitions are accepted, returning an error string when an invalid one is
attempted.

## Requirements

- Define \`StateMachine<S extends string, E extends string>\` — a class parameterised
  over a union of state names and a union of event names.
- Constructor accepts:
  - \`initial: S\` — the starting state
  - \`transitions: Array<{ from: S; event: E; to: S }>\`
- \`getState(): S\` — returns the current state.
- \`send(event: E): { ok: true; state: S } | { ok: false; error: string }\`
  - If a matching transition exists for \`(currentState, event)\`, move to \`to\` and
    return \`{ ok: true, state: to }\`.
  - Otherwise return \`{ ok: false, error: "Invalid transition" }\`.

## Stretch goals

- Add a \`onEnter\` callback per state, fired whenever that state is entered.
- Support \`guard\` predicates on transitions.

## What this proves

You understand generics, discriminated unions, and how to model domain rules as
data — all marquee TypeScript skills on any engineering job description.`,
      starterCode: `interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
}

class StateMachine<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[];

  constructor(initial: S, transitions: Transition<S, E>[]) {
    this.current = initial;
    this.transitions = transitions;
  }

  getState(): S {
    return this.current;
  }

  send(event: E): { ok: true; state: S } | { ok: false; error: string } {
    // Find a transition matching (this.current, event)
    // If found: update this.current and return { ok: true, state: ... }
    // If not found: return { ok: false, error: "Invalid transition" }
    return { ok: false, error: "not implemented" };
  }
}
`,
      solution: `interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
}

class StateMachine<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[];

  constructor(initial: S, transitions: Transition<S, E>[]) {
    this.current = initial;
    this.transitions = transitions;
  }

  getState(): S {
    return this.current;
  }

  send(event: E): { ok: true; state: S } | { ok: false; error: string } {
    const match = this.transitions.find(
      (t) => t.from === this.current && t.event === event
    );
    if (!match) return { ok: false, error: "Invalid transition" };
    this.current = match.to;
    return { ok: true, state: this.current };
  }
}
`,
      tests: [
        {
          name: "starts in initial state",
          code: `type TrafficState = "red" | "green" | "yellow";
type TrafficEvent = "go" | "slow" | "stop";
const fsm = new StateMachine<TrafficState, TrafficEvent>("red", [
  { from: "red",    event: "go",   to: "green"  },
  { from: "green",  event: "slow", to: "yellow" },
  { from: "yellow", event: "stop", to: "red"    },
]);
assertEquals(fsm.getState(), "red");`,
        },
        {
          name: "valid transition advances state",
          code: `type TrafficState = "red" | "green" | "yellow";
type TrafficEvent = "go" | "slow" | "stop";
const fsm = new StateMachine<TrafficState, TrafficEvent>("red", [
  { from: "red",    event: "go",   to: "green"  },
  { from: "green",  event: "slow", to: "yellow" },
  { from: "yellow", event: "stop", to: "red"    },
]);
const result = fsm.send("go");
assertEquals(result.ok, true);
if (result.ok) assertEquals(result.state, "green");`,
        },
        {
          name: "invalid transition returns error",
          code: `type TrafficState = "red" | "green" | "yellow";
type TrafficEvent = "go" | "slow" | "stop";
const fsm = new StateMachine<TrafficState, TrafficEvent>("red", [
  { from: "red",    event: "go",   to: "green"  },
  { from: "green",  event: "slow", to: "yellow" },
  { from: "yellow", event: "stop", to: "red"    },
]);
const result = fsm.send("stop");
assertEquals(result.ok, false);`,
        },
        {
          name: "full cycle red → green → yellow → red",
          code: `type TrafficState = "red" | "green" | "yellow";
type TrafficEvent = "go" | "slow" | "stop";
const fsm = new StateMachine<TrafficState, TrafficEvent>("red", [
  { from: "red",    event: "go",   to: "green"  },
  { from: "green",  event: "slow", to: "yellow" },
  { from: "yellow", event: "stop", to: "red"    },
]);
fsm.send("go");
fsm.send("slow");
fsm.send("stop");
assertEquals(fsm.getState(), "red");`,
        },
      ],
      hints: [
        "Use Array.prototype.find to locate the matching transition row.",
        "Store the current state in a private field and update it on a valid transition.",
        "Return the discriminated union literal exactly — { ok: true, state: ... } or { ok: false, error: ... }.",
      ],
    },

    // ── Lesson 2: Schema Validator ────────────────────────────────────────────
    {
      slug: "schema-validator",
      title: "Schema Validator",
      blurb: "Roll your own Zod-lite: validate objects against a typed schema.",
      xp: 40,
      language: "ts",
      content: `## What you're building

A lightweight **schema validator** — a miniature version of what Zod and Yup do.
Given a schema object that describes expected field types, validate any unknown
value against it and collect human-readable errors.

## Requirements

- \`type FieldType = "string" | "number" | "boolean"\`
- \`type Schema = Record<string, FieldType>\`
- \`validate(schema: Schema, data: unknown): { valid: true } | { valid: false; errors: string[] }\`
  - Returns \`{ valid: true }\` when \`data\` is an object **and** every key in the
    schema exists in \`data\` with the correct \`typeof\`.
  - Returns \`{ valid: false, errors }\` listing every failing field as
    \`"field: expected <type>, got <actualType>"\`.
  - If \`data\` is not an object (or is null), return a single error
    \`"data is not an object"\`.

## Stretch goals

- Add \`"optional":\` prefix support so missing fields don't fail.
- Support \`array\` and \`object\` field types recursively.

## What this proves

You can reason about \`unknown\` input safely, use \`typeof\`, and produce clear
validation messages — a staple of form handling, API deserialization, and CLIs.`,
      starterCode: `type FieldType = "string" | "number" | "boolean";
type Schema = Record<string, FieldType>;

function validate(
  schema: Schema,
  data: unknown
): { valid: true } | { valid: false; errors: string[] } {
  // 1. Check that data is a non-null object; if not, return the single error.
  // 2. For each key in schema, check typeof (data as any)[key] === schema[key].
  //    Collect errors like "name: expected string, got undefined".
  // 3. Return { valid: true } if no errors, else { valid: false, errors }.
  return { valid: false, errors: ["not implemented"] };
}
`,
      solution: `type FieldType = "string" | "number" | "boolean";
type Schema = Record<string, FieldType>;

function validate(
  schema: Schema,
  data: unknown
): { valid: true } | { valid: false; errors: string[] } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, errors: ["data is not an object"] };
  }
  const obj = data as Record<string, unknown>;
  const errors: string[] = [];
  for (const key of Object.keys(schema)) {
    const expected = schema[key];
    const actual = typeof obj[key];
    if (actual !== expected) {
      errors.push(\`\${key}: expected \${expected}, got \${actual}\`);
    }
  }
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}
`,
      tests: [
        {
          name: "valid object passes",
          code: `const schema: Record<string, "string" | "number" | "boolean"> = { name: "string", age: "number" };
const result = validate(schema, { name: "Ada", age: 30 });
assertEquals(result.valid, true);`,
        },
        {
          name: "missing field is an error",
          code: `const schema: Record<string, "string" | "number" | "boolean"> = { name: "string", age: "number" };
const result = validate(schema, { name: "Ada" });
assertEquals(result.valid, false);
if (!result.valid) assert(result.errors.some((e: string) => e.startsWith("age:")));`,
        },
        {
          name: "non-object data returns single error",
          code: `const schema: Record<string, "string" | "number" | "boolean"> = { name: "string" };
const result = validate(schema, null);
assertEquals(result.valid, false);
if (!result.valid) assertEquals(result.errors[0], "data is not an object");`,
        },
        {
          name: "wrong type is flagged",
          code: `const schema: Record<string, "string" | "number" | "boolean"> = { active: "boolean" };
const result = validate(schema, { active: "yes" });
assertEquals(result.valid, false);
if (!result.valid) assert(result.errors[0].includes("expected boolean"));`,
        },
      ],
      hints: [
        "Check null explicitly — typeof null === 'object' in JavaScript.",
        "Object.keys(schema) gives you the required fields to check.",
        "typeof obj[key] on a missing key returns 'undefined', not the expected type.",
      ],
    },

    // ── Lesson 3: Typed Event Bus ─────────────────────────────────────────────
    {
      slug: "typed-event-bus",
      title: "Typed Event Bus",
      blurb: "A fully type-safe pub/sub bus — no string soup, no any.",
      xp: 50,
      language: "ts",
      content: `## What you're building

A **typed event bus** where every event name is locked to a specific payload type.
Unlike a plain EventEmitter, the TypeScript compiler will refuse to subscribe with
the wrong callback signature or emit the wrong payload shape.

## Requirements

Define \`EventBus<Events extends Record<string, unknown>>\` — a class parameterised
over a map of \`{ eventName: payloadType }\`.

- \`on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void\`
  — subscribe a typed handler.
- \`off<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void\`
  — remove the exact handler reference.
- \`emit<K extends keyof Events>(event: K, payload: Events[K]): void\`
  — call every handler subscribed to this event with the payload.

## Stretch goals

- Add \`once<K>\` that auto-unsubscribes after first fire.
- Return a dispose function from \`on\` for convenient cleanup.

## What this proves

You can use mapped/indexed access types (\`Events[K]\`) to create APIs that are
ergonomic AND type-safe — a pattern used throughout large React, Vue, and Node
codebases.`,
      starterCode: `class EventBus<Events extends Record<string, unknown>> {
  private handlers = new Map<keyof Events, Array<(payload: unknown) => void>>();

  on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
    // Register handler under event
  }

  off<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
    // Remove the exact handler reference
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    // Call every registered handler with payload
  }
}
`,
      solution: `class EventBus<Events extends Record<string, unknown>> {
  private handlers = new Map<keyof Events, Array<(payload: unknown) => void>>();

  on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event)!.push(handler as (payload: unknown) => void);
  }

  off<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
    const list = this.handlers.get(event);
    if (list) {
      this.handlers.set(
        event,
        list.filter((h) => h !== (handler as (payload: unknown) => void))
      );
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const list = this.handlers.get(event);
    if (list) list.forEach((h) => h(payload));
  }
}
`,
      tests: [
        {
          name: "emit calls the handler with payload",
          code: `type AppEvents = { login: { userId: string }; logout: { userId: string } };
const bus = new EventBus<AppEvents>();
let received: string | null = null;
bus.on("login", (p) => { received = p.userId; });
bus.emit("login", { userId: "u1" });
assertEquals(received, "u1");`,
        },
        {
          name: "off removes handler so it stops firing",
          code: `type AppEvents = { ping: number };
const bus = new EventBus<AppEvents>();
let count = 0;
const handler = (n: number) => { count += n; };
bus.on("ping", handler);
bus.off("ping", handler);
bus.emit("ping", 5);
assertEquals(count, 0);`,
        },
        {
          name: "multiple handlers all fire",
          code: `type AppEvents = { tick: number };
const bus = new EventBus<AppEvents>();
let sum = 0;
bus.on("tick", (n) => { sum += n; });
bus.on("tick", (n) => { sum += n; });
bus.emit("tick", 3);
assertEquals(sum, 6);`,
        },
        {
          name: "emit on event with no handlers does nothing",
          code: `type AppEvents = { ready: void };
const bus = new EventBus<AppEvents>();
bus.emit("ready", undefined as unknown as void);
assert(true);`,
        },
      ],
      hints: [
        "Store handlers as Array<(payload: unknown) => void> internally; cast at the boundary.",
        "Use Map.has / Map.get / Map.set to manage the handler lists.",
        "Filter by reference identity (h !== handler) inside off.",
      ],
    },

    // ── Lesson 4: Result / Option Utilities ───────────────────────────────────
    {
      slug: "result-option-utils",
      title: "Result & Option Utilities",
      blurb: "Eliminate null crashes with typed Result and Option helpers.",
      xp: 40,
      language: "ts",
      content: `## What you're building

Two foundational utilities from functional programming — **Result** and **Option**
— that make error handling explicit and impossible to ignore at the type level.

## Requirements

### Result<T, E>

\`type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E }\`

Write these helpers:

- \`ok<T>(value: T): Result<T, never>\` — wraps a success value.
- \`err<E>(error: E): Result<never, E>\` — wraps an error.
- \`mapResult<T, U, E>(result: Result<T, E>, fn: (v: T) => U): Result<U, E>\`
  — apply \`fn\` to the value if ok, pass the error through unchanged.

### Option<T>

\`type Option<T> = { some: true; value: T } | { some: false }\`

Write these helpers:

- \`some<T>(value: T): Option<T>\` — wraps a present value.
- \`none(): Option<never>\` — the absent value.
- \`getOrElse<T>(option: Option<T>, fallback: T): T\`
  — return the value if present, else the fallback.

## Stretch goals

- \`flatMapResult\` — chain Results without nesting.
- \`optionFromNullable\` — wrap a \`T | null | undefined\` into an Option.

## What this proves

You understand discriminated unions, generics, and the "railway oriented" pattern
used in Rust, Haskell, and modern TypeScript codebases to avoid \`throw\`/\`try\`.`,
      starterCode: `// Result
type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  // wrap a success
  return null as any;
}

function err<E>(error: E): Result<never, E> {
  // wrap an error
  return null as any;
}

function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (v: T) => U
): Result<U, E> {
  // if ok, apply fn and return ok; else pass error through
  return null as any;
}

// Option
type Option<T> =
  | { some: true; value: T }
  | { some: false };

function some<T>(value: T): Option<T> {
  return null as any;
}

function none(): Option<never> {
  return null as any;
}

function getOrElse<T>(option: Option<T>, fallback: T): T {
  return fallback;
}
`,
      solution: `// Result
type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (v: T) => U
): Result<U, E> {
  if (result.ok) return { ok: true, value: fn(result.value) };
  return result;
}

// Option
type Option<T> =
  | { some: true; value: T }
  | { some: false };

function some<T>(value: T): Option<T> {
  return { some: true, value };
}

function none(): Option<never> {
  return { some: false };
}

function getOrElse<T>(option: Option<T>, fallback: T): T {
  return option.some ? option.value : fallback;
}
`,
      tests: [
        {
          name: "ok wraps a value",
          code: `const r = ok(42);
assertEquals(r.ok, true);
if (r.ok) assertEquals(r.value, 42);`,
        },
        {
          name: "err wraps an error",
          code: `const r = err("oops");
assertEquals(r.ok, false);
if (!r.ok) assertEquals(r.error, "oops");`,
        },
        {
          name: "mapResult transforms ok value",
          code: `const r = mapResult(ok(5), (n) => n * 2);
assertEquals(r.ok, true);
if (r.ok) assertEquals(r.value, 10);`,
        },
        {
          name: "getOrElse returns fallback for none",
          code: `const opt = none();
assertEquals(getOrElse(opt as Option<number>, 99), 99);`,
        },
        {
          name: "getOrElse returns value for some",
          code: `const opt = some(7);
assertEquals(getOrElse(opt, 0), 7);`,
        },
      ],
      hints: [
        "ok() returns { ok: true, value }, err() returns { ok: false, error }.",
        "mapResult checks result.ok before calling fn — pass errors straight through.",
        "getOrElse checks option.some; if false, return the fallback.",
      ],
    },

    // ── Lesson 5: Typed Deep-Get ──────────────────────────────────────────────
    {
      slug: "typed-deep-get",
      title: "Typed Deep-Get",
      blurb: "Safe nested property access with dot-path strings and full type inference.",
      xp: 60,
      language: "ts",
      content: `## What you're building

A **\`deepGet\`** utility that drills into a nested object using a dot-separated
path string and returns the value — or \`undefined\` if any segment is missing —
without ever throwing.

This is the runtime logic behind libraries like Lodash \`_.get\` and many config
readers. The bonus: we add TypeScript overloads so callers get the correct
return type for known paths.

## Requirements

Write \`deepGet(obj: Record<string, unknown>, path: string): unknown\`:

- \`path\` is a dot-separated key string, e.g. \`"user.address.city"\`.
- Split on \`"."\` and walk the object one key at a time.
- If any intermediate value is \`null\`, \`undefined\`, or not an object, return
  \`undefined\` immediately (do **not** throw).
- An empty path string returns \`undefined\`.
- Single-segment paths (no dot) return the top-level field value.

## Stretch goals

- Implement array index support so \`"items.0.name"\` works on arrays.
- Add a typed overload: \`deepGet<T>(obj: T, path: P): DeepValue<T, P>\` using
  template-literal types and recursive conditional types.

## What this proves

You can implement safe, defensive traversal logic and reason about runtime shapes
of \`unknown\` data — essential for working with API responses, config objects, and
any \`JSON.parse\` output.`,
      starterCode: `function deepGet(obj: Record<string, unknown>, path: string): unknown {
  // Split path on "."
  // Walk the object: for each segment, descend into the current value.
  // If the current value is null/undefined or not an object, return undefined.
  // Return the final value.
  return undefined;
}
`,
      solution: `function deepGet(obj: Record<string, unknown>, path: string): unknown {
  if (!path) return undefined;
  const segments = path.split(".");
  let current: unknown = obj;
  for (const seg of segments) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[seg];
  }
  return current;
}
`,
      tests: [
        {
          name: "retrieves a top-level key",
          code: `const data: Record<string, unknown> = { name: "Ada" };
assertEquals(deepGet(data, "name"), "Ada");`,
        },
        {
          name: "drills two levels deep",
          code: `const data: Record<string, unknown> = { user: { age: 30 } };
assertEquals(deepGet(data, "user.age"), 30);`,
        },
        {
          name: "returns undefined for missing key",
          code: `const data: Record<string, unknown> = { user: { name: "Sam" } };
assertEquals(deepGet(data, "user.email"), undefined);`,
        },
        {
          name: "returns undefined when intermediate is not an object",
          code: `const data: Record<string, unknown> = { score: 42 };
assertEquals(deepGet(data, "score.value"), undefined);`,
        },
      ],
      hints: [
        "String.prototype.split('.') gives you the path segments as an array.",
        "Check typeof current === 'object' AND current !== null before indexing.",
        "Cast to Record<string, unknown> at each step to keep TypeScript happy.",
      ],
    },
  ],
};
