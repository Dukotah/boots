import type { Module } from "./types";

// Math for Programmers — bite-sized number problems solved in pure JavaScript,
// from parity and primes up to GCD, digit sums, clamping, and averages. Each
// lesson is auto-graded in-browser with synchronous JS.
export const math: Module = {
  slug: "math",
  title: "Math for Programmers",
  description:
    "Practice the everyday math that shows up in real code: parity, primes, divisors, digits, and ranges. Each problem is a small, self-contained JavaScript function you can solve in a few lines.",
  emoji: "🧮",
  gradient: "from-cyan-400/20 to-blue-500/10",
  tagline: "solve math and number problems in JavaScript",
  keywords: [
    "programming math",
    "javascript math",
    "number theory basics",
    "math problems code",
  ],
  lessons: [
    {
      slug: "is-even",
      title: "Even or Odd",
      blurb: "Use the modulo operator to test parity.",
      xp: 25,
      content: `# Even or Odd

The **modulo** operator \`%\` gives the remainder of a division. A number is
**even** when dividing it by 2 leaves no remainder.

\`\`\`js
10 % 2; // 0  → even
7 % 2;  // 1  → odd
function isEven(n) {
  return n % 2 === 0;
}
\`\`\`

## Your task
Write \`isEven(n)\` that returns \`true\` when \`n\` is even and \`false\` when it is
odd. It should work for negative numbers too (e.g. \`-4\` is even).`,
      starterCode: `function isEven(n) {
  // TODO: use the % operator
}
`,
      solution: `function isEven(n) {
  return n % 2 === 0;
}`,
      tests: [
        { name: "isEven(10) → true", code: `assertEquals(isEven(10), true);` },
        { name: "isEven(7) → false", code: `assertEquals(isEven(7), false);` },
        { name: "isEven(0) → true", code: `assertEquals(isEven(0), true);` },
        { name: "isEven(-4) → true", code: `assertEquals(isEven(-4), true);` },
        { name: "isEven(-3) → false", code: `assertEquals(isEven(-3), false);` },
      ],
    },
    {
      slug: "is-prime",
      title: "Is It Prime?",
      blurb: "Check whether a number has exactly two divisors.",
      xp: 35,
      content: `# Is It Prime?

A **prime** is an integer greater than 1 whose only divisors are 1 and itself.
You only need to test divisors up to the square root of \`n\`.

\`\`\`js
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false; // found a divisor
  }
  return true;
}
\`\`\`

## Your task
Write \`isPrime(n)\` that returns \`true\` if \`n\` is prime and \`false\` otherwise.
Numbers less than 2 are not prime.`,
      starterCode: `function isPrime(n) {
  // TODO: rule out n < 2, then test for divisors
  return true;
}
`,
      solution: `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}`,
      tests: [
        { name: "isPrime(2) → true", code: `assertEquals(isPrime(2), true);` },
        { name: "isPrime(13) → true", code: `assertEquals(isPrime(13), true);` },
        { name: "isPrime(1) → false", code: `assertEquals(isPrime(1), false);` },
        { name: "isPrime(0) → false", code: `assertEquals(isPrime(0), false);` },
        { name: "isPrime(15) → false", code: `assertEquals(isPrime(15), false);` },
        { name: "isPrime(97) → true", code: `assertEquals(isPrime(97), true);` },
      ],
    },
    {
      slug: "gcd",
      title: "Greatest Common Divisor",
      blurb: "Find the largest number that divides two integers.",
      xp: 35,
      content: `# Greatest Common Divisor

The **GCD** of two numbers is the largest integer that divides both. Euclid's
algorithm finds it fast: replace \`(a, b)\` with \`(b, a % b)\` until \`b\` is 0.

\`\`\`js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
gcd(12, 18); // 6
\`\`\`

## Your task
Write \`gcd(a, b)\` using Euclid's algorithm. Assume both inputs are positive
integers. \`gcd(a, 0)\` should return \`a\`.`,
      starterCode: `function gcd(a, b) {
  // TODO: loop while b !== 0
  return 1;
}
`,
      solution: `function gcd(a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}`,
      tests: [
        { name: "gcd(12, 18) → 6", code: `assertEquals(gcd(12, 18), 6);` },
        { name: "gcd(18, 12) → 6", code: `assertEquals(gcd(18, 12), 6);` },
        { name: "gcd(7, 13) → 1", code: `assertEquals(gcd(7, 13), 1);` },
        { name: "gcd(48, 36) → 12", code: `assertEquals(gcd(48, 36), 12);` },
        { name: "gcd(5, 0) → 5", code: `assertEquals(gcd(5, 0), 5);` },
      ],
    },
    {
      slug: "sum-of-digits",
      title: "Sum of Digits",
      blurb: "Add up every digit of an integer.",
      xp: 35,
      content: `# Sum of Digits

You can peel digits off a number with \`% 10\` (last digit) and
\`Math.floor(n / 10)\` (drop the last digit). Repeat until nothing is left.

\`\`\`js
function sumOfDigits(n) {
  n = Math.abs(n);
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
sumOfDigits(123); // 6
\`\`\`

## Your task
Write \`sumOfDigits(n)\` that returns the sum of the digits of \`n\`. Handle
negative numbers by treating them like their absolute value, and \`0\` returns \`0\`.`,
      starterCode: `function sumOfDigits(n) {
  // TODO: peel digits with % 10
  return 0;
}
`,
      solution: `function sumOfDigits(n) {
  n = Math.abs(n);
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
      tests: [
        { name: "sumOfDigits(123) → 6", code: `assertEquals(sumOfDigits(123), 6);` },
        { name: "sumOfDigits(0) → 0", code: `assertEquals(sumOfDigits(0), 0);` },
        { name: "sumOfDigits(9) → 9", code: `assertEquals(sumOfDigits(9), 9);` },
        { name: "sumOfDigits(-456) → 15", code: `assertEquals(sumOfDigits(-456), 15);` },
        { name: "sumOfDigits(1000) → 1", code: `assertEquals(sumOfDigits(1000), 1);` },
      ],
    },
    {
      slug: "clamp",
      title: "Clamp a Number",
      blurb: "Keep a value inside a min/max range.",
      xp: 30,
      content: `# Clamp a Number

**Clamping** forces a value to stay within a range: anything below \`min\`
becomes \`min\`, anything above \`max\` becomes \`max\`, everything else is unchanged.

\`\`\`js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
clamp(15, 0, 10); // 10
clamp(-3, 0, 10); // 0
\`\`\`

## Your task
Write \`clamp(value, min, max)\` that returns \`value\` constrained to the inclusive
range \`[min, max]\`. A value already inside the range comes back unchanged.`,
      starterCode: `function clamp(value, min, max) {
  // TODO: clamp to [min, max]
  return value;
}
`,
      solution: `function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}`,
      tests: [
        { name: "clamp(15, 0, 10) → 10", code: `assertEquals(clamp(15, 0, 10), 10);` },
        { name: "clamp(-3, 0, 10) → 0", code: `assertEquals(clamp(-3, 0, 10), 0);` },
        { name: "clamp(5, 0, 10) → 5", code: `assertEquals(clamp(5, 0, 10), 5);` },
        { name: "clamp(0, 0, 10) → 0", code: `assertEquals(clamp(0, 0, 10), 0);` },
        { name: "clamp(10, 0, 10) → 10", code: `assertEquals(clamp(10, 0, 10), 10);` },
      ],
    },
    {
      slug: "average",
      title: "Average of an Array",
      blurb: "Sum the numbers, then divide by the count.",
      xp: 35,
      content: `# Average of an Array

The **average** (mean) is the sum of all values divided by how many there are.
The result is often a fraction, so compare it with a small tolerance.

\`\`\`js
function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (const n of nums) sum += n;
  return sum / nums.length;
}
average([1, 2, 3, 4]); // 2.5
\`\`\`

## Your task
Write \`average(nums)\` that returns the mean of the numbers in \`nums\`. For an
empty array, return \`0\`.`,
      starterCode: `function average(nums) {
  // TODO: sum then divide by length
  return 0;
}
`,
      solution: `function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (const n of nums) sum += n;
  return sum / nums.length;
}`,
      tests: [
        {
          name: "average([1,2,3,4]) → 2.5",
          code: `assert(Math.abs(average([1, 2, 3, 4]) - 2.5) < 1e-9);`,
        },
        {
          name: "average([10]) → 10",
          code: `assert(Math.abs(average([10]) - 10) < 1e-9);`,
        },
        {
          name: "average([]) → 0",
          code: `assert(Math.abs(average([]) - 0) < 1e-9);`,
        },
        {
          name: "average([1,2]) → 1.5",
          code: `assert(Math.abs(average([1, 2]) - 1.5) < 1e-9);`,
        },
        {
          name: "average([2,2,2]) → 2",
          code: `assert(Math.abs(average([2, 2, 2]) - 2) < 1e-9);`,
        },
      ],
    },
  ],
};
