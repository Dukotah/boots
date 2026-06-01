import type { Module } from "./types";

// Recursion — a function calling itself, broken down from a simple base case to
// classic recursive challenges. Auto-graded in-browser with pure synchronous JS.
export const recursion: Module = {
  slug: "recursion",
  title: "Recursion",
  description:
    "Learn to solve problems by having a function call itself. Master the base case, the recursive step, and the classic patterns that show up everywhere.",
  emoji: "🔁",
  gradient: "from-violet-400/20 to-purple-500/10",
  tagline:
    "Learn recursion in JavaScript with hands-on exercises: base cases, factorials, Fibonacci, and flattening nested arrays.",
  keywords: [
    "learn recursion",
    "recursion javascript",
    "recursive functions",
    "base case recursion",
  ],
  lessons: [
    {
      slug: "countdown",
      title: "Countdown",
      blurb: "Your first recursive function.",
      xp: 35,
      content: `# Countdown

A **recursive** function calls itself. Every recursion needs a **base case** — a
condition that stops it — otherwise it loops forever.

\`\`\`js
function countdown(n) {
  if (n <= 0) return [];        // base case: stop
  return [n, ...countdown(n - 1)]; // recursive step
}
countdown(3); // [3, 2, 1]
\`\`\`

## Your task
Write \`countdown(n)\` that returns an array \`[n, n-1, ..., 1]\`. For \`n <= 0\`
return an empty array \`[]\`.`,
      starterCode: `function countdown(n) {
  // TODO: base case, then recurse
}
`,
      solution: `function countdown(n) {
  if (n <= 0) return [];
  return [n, ...countdown(n - 1)];
}`,
      tests: [
        { name: "countdown(3) → [3,2,1]", code: `assertEquals(countdown(3), [3, 2, 1]);` },
        { name: "countdown(1) → [1]", code: `assertEquals(countdown(1), [1]);` },
        { name: "countdown(0) → []", code: `assertEquals(countdown(0), []);` },
        { name: "countdown(5) → [5,4,3,2,1]", code: `assertEquals(countdown(5), [5, 4, 3, 2, 1]);` },
      ],
    },
    {
      slug: "factorial",
      title: "Factorial",
      blurb: "n! = n × (n-1) × ... × 1.",
      xp: 35,
      content: `# Factorial

The factorial of \`n\` is \`n × (n-1) × ... × 1\`, and \`0! = 1\`. This is the
textbook recursion: \`n! = n × (n-1)!\`.

\`\`\`js
function factorial(n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive step
}
factorial(5); // 120
\`\`\`

## Your task
Write \`factorial(n)\` that returns \`n!\`. Assume \`n >= 0\`.`,
      starterCode: `function factorial(n) {
  // TODO
}
`,
      solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      tests: [
        { name: "factorial(5) → 120", code: `assertEquals(factorial(5), 120);` },
        { name: "factorial(0) → 1", code: `assertEquals(factorial(0), 1);` },
        { name: "factorial(1) → 1", code: `assertEquals(factorial(1), 1);` },
        { name: "factorial(6) → 720", code: `assertEquals(factorial(6), 720);` },
      ],
    },
    {
      slug: "sum-array",
      title: "Sum an Array",
      blurb: "Add up numbers without a loop.",
      xp: 40,
      content: `# Sum an Array

You can sum an array by adding the **first** element to the sum of the **rest**.
The base case is the empty array, which sums to \`0\`.

\`\`\`js
function sumArray(arr) {
  if (arr.length === 0) return 0;        // base case
  return arr[0] + sumArray(arr.slice(1)); // first + sum of rest
}
sumArray([1, 2, 3]); // 6
\`\`\`

## Your task
Write \`sumArray(arr)\` that returns the sum of all numbers in \`arr\`, using
recursion (no \`for\`/\`while\` loops).`,
      starterCode: `function sumArray(arr) {
  // TODO
}
`,
      solution: `function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}`,
      tests: [
        { name: "sumArray([1,2,3]) → 6", code: `assertEquals(sumArray([1, 2, 3]), 6);` },
        { name: "sumArray([]) → 0", code: `assertEquals(sumArray([]), 0);` },
        { name: "sumArray([10]) → 10", code: `assertEquals(sumArray([10]), 10);` },
        { name: "sumArray([5,5,5,5]) → 20", code: `assertEquals(sumArray([5, 5, 5, 5]), 20);` },
        {
          name: "handles negatives",
          code: `assertEquals(sumArray([-1, 2, -3, 4]), 2);`,
        },
      ],
    },
    {
      slug: "reverse-string",
      title: "Reverse a String",
      blurb: "Flip a string recursively.",
      xp: 40,
      content: `# Reverse a String

To reverse a string recursively, take the **first** character and stick it on
the **end** of the reversed rest. An empty string reverses to itself.

\`\`\`js
function reverse(str) {
  if (str === "") return "";              // base case
  return reverse(str.slice(1)) + str[0];  // reverse rest + first char
}
reverse("abc"); // "cba"
\`\`\`

## Your task
Write \`reverse(str)\` that returns \`str\` reversed, using recursion (no
\`.reverse()\` and no loops).`,
      starterCode: `function reverse(str) {
  // TODO
}
`,
      solution: `function reverse(str) {
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
}`,
      tests: [
        { name: '"hello" → "olleh"', code: `assertEquals(reverse("hello"), "olleh");` },
        { name: "empty string", code: `assertEquals(reverse(""), "");` },
        { name: '"a" → "a"', code: `assertEquals(reverse("a"), "a");` },
        { name: '"Boots" → "stooB"', code: `assertEquals(reverse("Boots"), "stooB");` },
      ],
    },
    {
      slug: "power",
      title: "Power",
      blurb: "Compute base^exp without **.",
      xp: 45,
      content: `# Power

Raising \`base\` to the \`exp\` power means multiplying \`base\` by itself \`exp\`
times. Recursively: \`base^exp = base × base^(exp-1)\`, and \`base^0 = 1\`.

\`\`\`js
function power(base, exp) {
  if (exp === 0) return 1;               // base case
  return base * power(base, exp - 1);    // recursive step
}
power(2, 5); // 32
\`\`\`

## Your task
Write \`power(base, exp)\` that returns \`base\` raised to \`exp\` without using
\`**\` or \`Math.pow\`. Assume \`exp >= 0\`.`,
      starterCode: `function power(base, exp) {
  // TODO
}
`,
      solution: `function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`,
      tests: [
        { name: "power(2, 5) → 32", code: `assertEquals(power(2, 5), 32);` },
        { name: "power(5, 0) → 1", code: `assertEquals(power(5, 0), 1);` },
        { name: "power(3, 3) → 27", code: `assertEquals(power(3, 3), 27);` },
        { name: "power(10, 1) → 10", code: `assertEquals(power(10, 1), 10);` },
        { name: "power(7, 2) → 49", code: `assertEquals(power(7, 2), 49);` },
      ],
    },
    {
      slug: "fibonacci",
      title: "Fibonacci",
      blurb: "The nth number in the famous sequence.",
      xp: 45,
      content: `# Fibonacci

The Fibonacci sequence starts \`0, 1, 1, 2, 3, 5, 8, ...\` — each number is the
sum of the two before it. This recursion has **two** base cases.

\`\`\`js
function fib(n) {
  if (n < 2) return n;             // fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);  // sum of the two previous
}
fib(7); // 13
\`\`\`

## Your task
Write \`fib(n)\` that returns the \`n\`th Fibonacci number (0-indexed, so
\`fib(0) === 0\` and \`fib(1) === 1\`).`,
      starterCode: `function fib(n) {
  // TODO
}
`,
      solution: `function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}`,
      tests: [
        { name: "fib(0) → 0", code: `assertEquals(fib(0), 0);` },
        { name: "fib(1) → 1", code: `assertEquals(fib(1), 1);` },
        { name: "fib(7) → 13", code: `assertEquals(fib(7), 13);` },
        { name: "fib(10) → 55", code: `assertEquals(fib(10), 55);` },
        { name: "fib(15) → 610", code: `assertEquals(fib(15), 610);` },
      ],
    },
    {
      slug: "flatten",
      title: "Flatten Nested Arrays",
      blurb: "Crush a nested array into a flat one.",
      xp: 55,
      content: `# Flatten Nested Arrays

An array can contain numbers **or** more arrays, nested any number of levels
deep. To flatten it, walk each item: if it's an array, flatten it and merge; if
it's a number, keep it. The base case is reaching a plain number.

\`\`\`js
function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result = result.concat(flatten(item));
    else result.push(item);
  }
  return result;
}
flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]
\`\`\`

## Your task
Write \`flatten(arr)\` that returns a single flat array of all the numbers, in
order, no matter how deeply nested. Don't use the built-in \`Array.prototype.flat\`.`,
      starterCode: `function flatten(arr) {
  // TODO: recurse into nested arrays
}
`,
      solution: `function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result = result.concat(flatten(item));
    else result.push(item);
  }
  return result;
}`,
      tests: [
        {
          name: "flatten([1,[2,[3,4]],5]) → [1,2,3,4,5]",
          code: `assertEquals(flatten([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);`,
        },
        { name: "already flat", code: `assertEquals(flatten([1, 2, 3]), [1, 2, 3]);` },
        { name: "empty array", code: `assertEquals(flatten([]), []);` },
        {
          name: "deeply nested",
          code: `assertEquals(flatten([[[[1]]], 2, [[3]]]), [1, 2, 3]);`,
        },
        {
          name: "nested empties",
          code: `assertEquals(flatten([1, [], [2, []], 3]), [1, 2, 3]);`,
        },
      ],
    },
  ],
};
