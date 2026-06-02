import type { Module } from "./types";

export const asyncJs: Module = {
  slug: "async",
  title: "Asynchronous JavaScript",
  description:
    "Promises, async/await, and concurrency — the skills behind every API call, database query, and network request.",
  emoji: "⏳",
  gradient: "from-sky-400/20 to-cyan-500/10",
  tagline:
    "Learn async JavaScript: Promises, async/await, Promise.all, and error handling.",
  keywords: ["async javascript", "promises", "async await", "promise.all"],
  lessons: [
    {
      slug: "promises",
      title: "Promises",
      blurb: "A value that arrives later.",
      xp: 30,
      content: `# Promises

A **Promise** represents a value that isn't ready yet — like data from a server.
\`Promise.resolve(x)\` makes a promise that immediately succeeds with \`x\`.

\`\`\`js
const p = Promise.resolve(42);
p.then((value) => console.log(value)); // 42
\`\`\`

## Your task
Write a function \`getValue\` that **returns a Promise** that resolves to the
number \`42\`.`,
      starterCode: `function getValue() {
  // return a Promise that resolves to 42
}
`,
      solution: `function getValue() {
  return Promise.resolve(42);
}`,
      tests: [
        {
          name: "resolves to 42",
          code: `assertEquals(await getValue(), 42);`,
        },
        {
          name: "returns a Promise",
          code: `assert(typeof getValue().then === "function", "getValue should return a Promise");`,
        },
      ],
    },
    {
      slug: "async-await",
      title: "async / await",
      blurb: "Write async code that reads top-to-bottom.",
      xp: 30,
      content: `# async / await

An \`async\` function always returns a Promise. Inside it, \`await\` pauses until a
Promise resolves, giving you the plain value — no \`.then()\` chains needed.

\`\`\`js
async function load() {
  const value = await Promise.resolve(10);
  return value + 1; // 11
}
\`\`\`

## Your task
Write an \`async\` function \`doubleAsync\` that takes a number and returns it
doubled.`,
      starterCode: `async function doubleAsync(n) {
  // return n doubled
}
`,
      solution: `async function doubleAsync(n) {
  return n * 2;
}`,
      tests: [
        { name: "doubleAsync(5) → 10", code: `assertEquals(await doubleAsync(5), 10);` },
        { name: "doubleAsync(0) → 0", code: `assertEquals(await doubleAsync(0), 0);` },
      ],
    },
    {
      slug: "awaiting-values",
      title: "Awaiting Values",
      blurb: "Combine awaited results.",
      xp: 35,
      content: `# Awaiting Values

You can \`await\` a Promise, then use its result in more logic.

\`\`\`js
const a = await Promise.resolve(3);
return a + 1; // 4
\`\`\`

## Your task
Write an \`async\` function \`addOneThenDouble\` that takes a number \`n\`, awaits
\`Promise.resolve(n + 1)\`, then returns that result **doubled**.

For example \`addOneThenDouble(3)\` → \`(3 + 1) * 2\` → \`8\`.`,
      starterCode: `async function addOneThenDouble(n) {
  // await Promise.resolve(n + 1), then return it doubled
}
`,
      solution: `async function addOneThenDouble(n) {
  const plusOne = await Promise.resolve(n + 1);
  return plusOne * 2;
}`,
      tests: [
        { name: "addOneThenDouble(3) → 8", code: `assertEquals(await addOneThenDouble(3), 8);` },
        { name: "addOneThenDouble(9) → 20", code: `assertEquals(await addOneThenDouble(9), 20);` },
      ],
    },
    {
      slug: "promise-all",
      title: "Promise.all",
      blurb: "Run many promises at once.",
      xp: 40,
      content: `# Promise.all

\`Promise.all\` waits for an **array of promises** and gives you back an array of
their results — all running concurrently.

\`\`\`js
const results = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);
// results is [1, 2]
\`\`\`

## Your task
Write an \`async\` function \`sumAll\` that takes an array of promises, awaits them
all with \`Promise.all\`, and returns the **sum** of their resolved values. An
empty array returns \`0\`.`,
      starterCode: `async function sumAll(promises) {
  // await all the promises, then return the sum of their values
}
`,
      solution: `async function sumAll(promises) {
  const values = await Promise.all(promises);
  return values.reduce((total, n) => total + n, 0);
}`,
      tests: [
        {
          name: "sums resolved values",
          code: `assertEquals(await sumAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]), 6);`,
        },
        { name: "empty array → 0", code: `assertEquals(await sumAll([]), 0);` },
      ],
    },
    {
      slug: "try-catch-async",
      title: "Handling Failures",
      blurb: "Catch a rejected promise.",
      xp: 40,
      content: `# Handling Failures

A Promise can **reject** (fail). Wrap \`await\` in \`try/catch\` to handle it
gracefully instead of crashing.

\`\`\`js
try {
  const data = await mightFail();
} catch (err) {
  // handle the error
}
\`\`\`

## Your task
Write an \`async\` function \`settle\` that takes a promise. If it resolves, return
its value. If it **rejects**, catch the error and return the string \`"failed"\`.`,
      starterCode: `async function settle(promise) {
  // return the resolved value, or "failed" if it rejects
}
`,
      solution: `async function settle(promise) {
  try {
    return await promise;
  } catch (err) {
    return "failed";
  }
}`,
      tests: [
        {
          name: "returns the resolved value",
          code: `assertEquals(await settle(Promise.resolve("ok")), "ok");`,
        },
        {
          name: "returns 'failed' on rejection",
          code: `assertEquals(await settle(Promise.reject(new Error("boom"))), "failed");`,
        },
      ],
    },
  ],
};
