import type { Module } from "./types";

// JavaScript Proxy & Reflect — traps, handler objects, and Reflect passthrough.
// Auto-graded in-browser via Web Worker. Teaches the metaprogramming layer that
// powers Vue 3 reactivity, MobX, and validation libraries.
export const jsProxyReflect: Module = {
  slug: "js-proxy-reflect",
  title: "Metaprogramming with Proxy & Reflect",
  description:
    "Learn to intercept and redefine fundamental JavaScript operations using Proxy traps and Reflect passthrough — the same mechanism powering Vue 3 reactivity and MobX.",
  emoji: "🪞",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Master JavaScript Proxy and Reflect: get/set traps, validation, reactive patterns, and the metaprogramming layer under Vue 3.",
  language: "js",
  keywords: [
    "javascript proxy",
    "javascript reflect",
    "javascript metaprogramming",
    "javascript proxy traps",
    "vue reactivity internals",
    "proxy handler object",
  ],
  lessons: [
    {
      slug: "proxy-basics",
      title: "Creating a Proxy — the get Trap",
      blurb: "Intercept property reads with a handler object.",
      xp: 30,
      content: `# Creating a Proxy — the get Trap

A **Proxy** wraps a target object and lets you intercept (trap) fundamental operations. The simplest trap is \`get\`, which fires every time a property is read.

\`\`\`js
const handler = {
  get(target, key) {
    return key in target ? target[key] : "default";
  }
};

const p = new Proxy({ color: "red" }, handler);
p.color;   // "red"
p.missing; // "default"
\`\`\`

The handler is a plain object whose methods are called **traps**. The two arguments to \`get\` are the **target** (the original object) and the **key** (the property name as a string or Symbol).

## Your task
Write a function \`makeProxy(target)\` that returns a Proxy of \`target\`. The proxy's \`get\` trap should return the property value if it exists on the target, or \`0\` (zero) for any missing numeric-style lookup.`,
      starterCode: `function makeProxy(target) {
  // return a Proxy with a get trap that returns 0 for missing keys
}
`,
      solution: `function makeProxy(target) {
  return new Proxy(target, {
    get(t, key) {
      return key in t ? t[key] : 0;
    }
  });
}`,
      tests: [
        {
          name: "returns existing value",
          code: `const p = makeProxy({ a: 1, b: 2 }); assertEquals(p.a, 1);`,
        },
        {
          name: "returns 0 for missing key",
          code: `const p = makeProxy({ a: 1 }); assertEquals(p.missing, 0);`,
        },
        {
          name: "works with multiple missing keys",
          code: `const p = makeProxy({}); assertEquals(p.x + p.y, 0);`,
        },
      ],
      hints: [
        "Use `new Proxy(target, handler)` where handler has a `get(t, key)` method.",
        "Check `key in t` to tell if a property exists, then return `t[key]` or `0`.",
      ],
      explanation: `The \`get\` trap fires for every property read. By checking \`key in target\` you can decide what to return when the key is absent — here, \`0\`. This pattern powers default-value proxies used in libraries like \`immer\`.`,
    },
    {
      slug: "set-trap",
      title: "The set Trap — Validation on Write",
      blurb: "Intercept property assignments to enforce type constraints.",
      xp: 35,
      content: `# The set Trap — Validation on Write

The \`set\` trap intercepts assignments (\`obj.x = value\`). It receives the target, the key, and the new value. **You must return \`true\`** to confirm the assignment succeeded, or \`false\` (or throw) to reject it.

\`\`\`js
const handler = {
  set(target, key, value) {
    if (typeof value !== "string") {
      throw new TypeError(\`\${key} must be a string\`);
    }
    target[key] = value;
    return true; // required — signals "write accepted"
  }
};
\`\`\`

This is how validation libraries and typed stores reject bad data at the boundary without extra boilerplate on every setter.

## Your task
Write a function \`makeNumbersOnly()\` that returns a Proxy of a plain empty object \`{}\`. The proxy's \`set\` trap should:
- Throw a \`TypeError\` with message \`"Only numbers allowed"\` if the value is not a \`number\` type.
- Otherwise store the value and return \`true\`.`,
      starterCode: `function makeNumbersOnly() {
  // return a Proxy that only accepts number values
}
`,
      solution: `function makeNumbersOnly() {
  return new Proxy({}, {
    set(target, key, value) {
      if (typeof value !== "number") {
        throw new TypeError("Only numbers allowed");
      }
      target[key] = value;
      return true;
    }
  });
}`,
      tests: [
        {
          name: "accepts number values",
          code: `const p = makeNumbersOnly(); p.x = 42; assertEquals(p.x, 42);`,
        },
        {
          name: "throws TypeError for string value",
          code: `const p = makeNumbersOnly(); let threw = false; try { p.x = "hello"; } catch(e) { threw = e instanceof TypeError; } assertEquals(threw, true);`,
        },
        {
          name: "error message says 'Only numbers allowed'",
          code: `const p = makeNumbersOnly(); let msg = ""; try { p.x = true; } catch(e) { msg = e.message; } assertEquals(msg, "Only numbers allowed");`,
        },
      ],
      hints: [
        "Use `typeof value !== \"number\"` to detect non-numbers.",
        "Remember to `return true` after writing `target[key] = value`, or the Proxy will throw a TypeError itself.",
      ],
      explanation: `The \`set\` trap is the backbone of reactive stores and typed schemas. Notice that returning \`true\` is mandatory — omitting it signals a failed write, which in strict mode throws automatically.`,
    },
    {
      slug: "has-trap",
      title: "The has Trap — Overriding the 'in' Operator",
      blurb: "Make 'in' behave exactly how you want.",
      xp: 30,
      content: `# The has Trap — Overriding the in Operator

The \`has\` trap intercepts the \`in\` operator (\`"key" in obj\`). It lets you change what the object *appears* to contain.

\`\`\`js
const range = new Proxy({ min: 1, max: 10 }, {
  has(target, key) {
    const n = Number(key);
    return n >= target.min && n <= target.max;
  }
});

5 in range;  // true
15 in range; // false
\`\`\`

## Your task
Write a function \`makeCaseInsensitive(obj)\` that returns a Proxy where the \`in\` operator matches keys **case-insensitively** (e.g. \`"NAME" in proxy\` is true if \`"name"\` is in \`obj\`).

The \`has\` trap receives the target and the key (a string). You can iterate over target keys with \`Object.keys(target)\`.`,
      starterCode: `function makeCaseInsensitive(obj) {
  // return a Proxy whose 'in' operator ignores case
}
`,
      solution: `function makeCaseInsensitive(obj) {
  return new Proxy(obj, {
    has(target, key) {
      const lower = key.toLowerCase();
      return Object.keys(target).some(k => k.toLowerCase() === lower);
    }
  });
}`,
      tests: [
        {
          name: "exact match still works",
          code: `const p = makeCaseInsensitive({ name: "Alice" }); assertEquals("name" in p, true);`,
        },
        {
          name: "uppercase version matches lowercase key",
          code: `const p = makeCaseInsensitive({ name: "Alice" }); assertEquals("NAME" in p, true);`,
        },
        {
          name: "missing key returns false",
          code: `const p = makeCaseInsensitive({ name: "Alice" }); assertEquals("age" in p, false);`,
        },
        {
          name: "mixed case match",
          code: `const p = makeCaseInsensitive({ Color: "red" }); assertEquals("color" in p, true);`,
        },
      ],
      hints: [
        "Use `.toLowerCase()` on both the incoming key and each existing key before comparing.",
        "`Object.keys(target).some(k => ...)` is a clean way to check if any key matches.",
      ],
    },
    {
      slug: "reflect-passthrough",
      title: "Reflect — Safe Passthrough in Traps",
      blurb: "Use Reflect to forward operations without breaking the target.",
      xp: 40,
      content: `# Reflect — Safe Passthrough in Traps

When writing a trap, you often want to **log or observe** an operation and then let it proceed normally. You could write \`target[key]\` yourself — but that misses edge cases like prototype chains and Symbol keys.

The **Reflect** API mirrors every proxy trap as a safe passthrough:

\`\`\`js
Reflect.get(target, key, receiver) // same as target[key], but correct for inheritance
Reflect.set(target, key, value, receiver)
Reflect.has(target, key)           // same as key in target
\`\`\`

Always return \`Reflect.*\` inside traps to ensure correct default behavior:

\`\`\`js
const logger = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("reading", key);
    return Reflect.get(target, key, receiver); // correct passthrough
  }
});
\`\`\`

## Your task
Write a function \`makeLogger(obj)\` that returns a Proxy. Every time a property is **read**, push the key name (as a string) onto an array called \`log\` (defined outside and returned alongside the proxy). The read should still return the correct value via \`Reflect.get\`.

Return an object \`{ proxy, log }\` where \`log\` starts as an empty array.`,
      starterCode: `function makeLogger(obj) {
  const log = [];
  // create a proxy whose get trap pushes key to log, then uses Reflect.get
  return { proxy: null, log };
}
`,
      solution: `function makeLogger(obj) {
  const log = [];
  const proxy = new Proxy(obj, {
    get(target, key, receiver) {
      log.push(String(key));
      return Reflect.get(target, key, receiver);
    }
  });
  return { proxy, log };
}`,
      tests: [
        {
          name: "returns correct value",
          code: `const { proxy } = makeLogger({ x: 42 }); assertEquals(proxy.x, 42);`,
        },
        {
          name: "logs the accessed key",
          code: `const { proxy, log } = makeLogger({ x: 42 }); proxy.x; assertEquals(log[0], "x");`,
        },
        {
          name: "logs multiple accesses in order",
          code: `const { proxy, log } = makeLogger({ a: 1, b: 2 }); proxy.a; proxy.b; proxy.a; assertEquals(JSON.stringify(log), JSON.stringify(["a","b","a"]));`,
        },
      ],
      hints: [
        "Push `String(key)` (not just `key`) so Symbol keys become their string description rather than breaking the test.",
        "Use `Reflect.get(target, key, receiver)` as the return value — this correctly handles getters and prototype lookups.",
      ],
      explanation: `\`Reflect\` exists specifically so trap implementations can delegate back to the engine's default behavior safely. Using \`target[key]\` directly can silently break getter/setter chains when inheritance is involved.`,
    },
    {
      slug: "revocable-proxy",
      title: "Proxy.revocable() — Temporary Access",
      blurb: "Grant access that can be permanently shut off.",
      xp: 35,
      content: `# Proxy.revocable() — Temporary Access

\`Proxy.revocable(target, handler)\` returns \`{ proxy, revoke }\`. After calling \`revoke()\`, **any** access to the proxy throws a \`TypeError\`. The link to the target is permanently severed.

\`\`\`js
const { proxy, revoke } = Proxy.revocable({ secret: 42 }, {});

proxy.secret; // 42 — still works
revoke();
proxy.secret; // TypeError: Cannot perform 'get' on a proxy that has been revoked
\`\`\`

This pattern appears in capability-based security: hand a caller a revocable proxy, and you can cut off their access at any time without modifying the underlying object.

## Your task
Write a function \`createSession(data)\` that:
1. Creates a revocable proxy of \`data\` with an empty handler \`{}\`.
2. Returns \`{ proxy, revoke }\`.

After the caller calls \`revoke()\`, any property access on \`proxy\` should throw.`,
      starterCode: `function createSession(data) {
  // use Proxy.revocable and return { proxy, revoke }
}
`,
      solution: `function createSession(data) {
  return Proxy.revocable(data, {});
}`,
      tests: [
        {
          name: "proxy works before revoke",
          code: `const { proxy } = createSession({ token: "abc" }); assertEquals(proxy.token, "abc");`,
        },
        {
          name: "throws after revoke",
          code: `const { proxy, revoke } = createSession({ token: "abc" }); revoke(); let threw = false; try { proxy.token; } catch(e) { threw = true; } assertEquals(threw, true);`,
        },
        {
          name: "revoke is a function",
          code: `const { revoke } = createSession({}); assertEquals(typeof revoke, "function");`,
        },
      ],
      hints: [
        "`Proxy.revocable(target, handler)` already returns `{ proxy, revoke }` — you can return it directly.",
      ],
      explanation: `Revocable proxies are used in sandboxing and module systems to grant short-lived, revocable access to resources. Once revoked, there is no way to re-enable the proxy — you'd need to create a new one.`,
    },
    {
      slug: "default-values",
      title: "Default Values for Missing Keys",
      blurb: "Return a sensible default instead of undefined.",
      xp: 30,
      content: `# Default Values for Missing Keys

JavaScript returns \`undefined\` for any missing property. A Proxy can change this so every missing key gets a meaningful default, avoiding "\`undefined\` is not a function" errors.

This is a real pattern used by Webpack's environment objects and config libraries:

\`\`\`js
function withDefault(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, key) {
      return key in target ? target[key] : defaultValue;
    }
  });
}

const config = withDefault({ debug: true }, false);
config.debug;    // true  (key exists)
config.verbose;  // false (missing key → default)
\`\`\`

## Your task
Write \`withDefault(obj, defaultValue)\` exactly as shown. It should return a new Proxy where any property that doesn't exist on \`obj\` returns \`defaultValue\`.`,
      starterCode: `function withDefault(obj, defaultValue) {
  // return a Proxy that returns defaultValue for missing keys
}
`,
      solution: `function withDefault(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, key) {
      return key in target ? target[key] : defaultValue;
    }
  });
}`,
      tests: [
        {
          name: "returns existing value unchanged",
          code: `const p = withDefault({ x: 10 }, 0); assertEquals(p.x, 10);`,
        },
        {
          name: "returns defaultValue for missing key",
          code: `const p = withDefault({ x: 10 }, 0); assertEquals(p.missing, 0);`,
        },
        {
          name: "works with string default",
          code: `const p = withDefault({}, "N/A"); assertEquals(p.name, "N/A");`,
        },
        {
          name: "falsy default of 0 works",
          code: `const p = withDefault({}, 0); assertEquals(p.count, 0);`,
        },
      ],
      hints: [
        "Use `key in target` (not `target[key]`) to check existence — this handles keys whose value is `undefined` or `0`.",
      ],
    },
    {
      slug: "reactive-object",
      title: "Building a Reactive Object",
      blurb: "Fire a callback whenever any property changes — Vue-style.",
      xp: 50,
      content: `# Building a Reactive Object

Vue 3's \`reactive()\` and MobX's \`observable()\` are both built on Proxy. The core idea: intercept \`set\`, run side effects (re-render, notify subscribers), then commit the write via \`Reflect.set\`.

\`\`\`js
function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      onChange(key, value);   // notify AFTER the write
      return result;
    }
  });
}
\`\`\`

The \`receiver\` argument is needed so \`Reflect.set\` correctly handles setters on the prototype chain.

## Your task
Implement \`reactive(obj, onChange)\` exactly as above. \`onChange(key, value)\` should be called **after** every successful write, with the property key (string) and the new value.`,
      starterCode: `function reactive(obj, onChange) {
  // intercept set, call onChange(key, value) after writing, return Reflect.set result
}
`,
      solution: `function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      onChange(key, value);
      return result;
    }
  });
}`,
      tests: [
        {
          name: "onChange fires when property is set",
          code: `let called = false; const r = reactive({}, () => { called = true; }); r.x = 1; assertEquals(called, true);`,
        },
        {
          name: "onChange receives correct key",
          code: `let gotKey = ""; const r = reactive({}, (k) => { gotKey = k; }); r.name = "Alice"; assertEquals(gotKey, "name");`,
        },
        {
          name: "onChange receives correct value",
          code: `let gotVal; const r = reactive({}, (k, v) => { gotVal = v; }); r.score = 99; assertEquals(gotVal, 99);`,
        },
        {
          name: "write actually persists on the object",
          code: `const r = reactive({}, () => {}); r.count = 7; assertEquals(r.count, 7);`,
        },
      ],
      hints: [
        "Call `Reflect.set(target, key, value, receiver)` first and capture its return value — this is what your `set` trap should return.",
        "Call `onChange(key, value)` after the write so observers see the updated state.",
      ],
      explanation: `This is the exact shape of Vue 3's reactive core. In practice Vue also wraps nested objects recursively and batches change notifications, but the Proxy + Reflect.set pattern is identical.`,
    },
    {
      slug: "proxy-reflect-quiz",
      title: "Proxy & Reflect — Concepts Check",
      blurb: "Test your mental model of traps, Reflect, and gotchas.",
      xp: 25,
      kind: "quiz",
      content: `# Proxy & Reflect — Concepts Check

You've built get traps, set traps, has traps, revocable proxies, and a reactive system. Before you go, check your mental model on a few tricky points.

Key rules to remember:
- A \`set\` trap **must return \`true\`** to signal success (omitting it causes a TypeError in strict mode).
- \`Reflect\` methods mirror each trap exactly — always use them for safe passthrough.
- \`Proxy.revocable()\` is permanent: once revoked, the proxy cannot be re-enabled.
- Proxies are **transparent** to \`typeof\` — \`typeof proxy\` still returns \`"object"\`.
- The \`has\` trap intercepts the \`in\` operator, **not** \`hasOwnProperty\`.`,
      questions: [
        {
          prompt: "What happens if a `set` trap does not return `true` in strict mode?",
          options: [
            "The assignment silently fails",
            "A TypeError is thrown",
            "The proxy is automatically revoked",
          ],
          answer: 1,
          explanation:
            "A falsy return from a `set` trap causes a TypeError ('Cannot set property...'). Always return `true` (or the result of `Reflect.set`) after a successful write.",
        },
        {
          prompt: "Why should you use `Reflect.get(target, key, receiver)` instead of `target[key]` inside a `get` trap?",
          options: [
            "`target[key]` would cause infinite recursion",
            "`Reflect.get` correctly handles inherited getters and the prototype chain, while `target[key]` can silently break them",
            "They are identical — `Reflect.get` is just syntax sugar",
          ],
          answer: 1,
          explanation:
            "`target[key]` bypasses the `receiver` (the proxy itself), which breaks getters defined on prototypes that rely on `this`. `Reflect.get` forwards the receiver correctly.",
        },
        {
          prompt: "After calling `revoke()` on a revocable proxy, you need to access the data. What do you do?",
          options: [
            "Call `revoke(false)` to re-enable it",
            "Access the original target object directly",
            "Create a new revocable proxy wrapping the original target",
          ],
          answer: 2,
          explanation:
            "Revocation is permanent and one-way. To re-enable proxied access you must create a new proxy. This is intentional — it makes capability revocation guarantees possible.",
        },
        {
          prompt: "Which operation does the `has` trap intercept?",
          options: [
            "obj.hasOwnProperty(key)",
            "The `in` operator: `key in obj`",
            "Object.keys(obj)",
          ],
          answer: 1,
          explanation:
            "The `has` trap fires for the `in` operator only. `hasOwnProperty` and `Object.keys` have their own traps (`getOwnPropertyDescriptor` and `ownKeys` respectively).",
        },
        {
          prompt: "Vue 3 reactivity is built on Proxy. Which trap does it primarily use to trigger UI re-renders?",
          options: [
            "The `get` trap — reading a property schedules a re-render",
            "The `set` trap — writing a property notifies subscribers and triggers re-renders",
            "The `has` trap — checking property existence triggers updates",
          ],
          answer: 1,
          explanation:
            "Vue's `reactive()` uses the `set` trap to detect mutations and notify subscribers. The `get` trap is used for *dependency tracking* (recording which component reads which property), not re-rendering.",
        },
      ],
    },
  ],
};
