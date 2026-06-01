import type { Module } from "./types";

// Bit Manipulation — the low-level tricks that show up in interviews and
// performance-critical code. Auto-graded in-browser.
export const bitManipulation: Module = {
  slug: "bit-manipulation",
  title: "Bit Manipulation",
  description:
    "Work with numbers at the binary level: AND, OR, XOR, and shifts. These tricks unlock elegant, O(1) answers to classic interview problems.",
  emoji: "🔢",
  gradient: "from-fuchsia-400/20 to-pink-500/10",
  tagline:
    "Learn bit manipulation in JavaScript: bitwise AND/OR/XOR, shifts, popcount, power of two, and single number.",
  keywords: ["bit manipulation", "bitwise operators", "xor trick", "interview bit tricks"],
  lessons: [
    {
      slug: "is-even-bitwise",
      title: "Even or Odd, the Bitwise Way",
      blurb: "The last bit tells you parity.",
      xp: 30,
      content: `# Even or Odd, the Bitwise Way

The lowest bit of a number is \`1\` for odd numbers and \`0\` for even. \`n & 1\`
isolates it.

\`\`\`js
6 & 1; // 0  (even)
7 & 1; // 1  (odd)
\`\`\`

## Your task
Write \`isEven(n)\` using a **bitwise AND** that returns \`true\` for even numbers.`,
      starterCode: `function isEven(n) {
  // use (n & 1) to decide
}
`,
      solution: `function isEven(n) {
  return (n & 1) === 0;
}`,
      tests: [
        { name: "4 is even", code: `assertEquals(isEven(4), true);` },
        { name: "7 is odd", code: `assertEquals(isEven(7), false);` },
        { name: "0 is even", code: `assertEquals(isEven(0), true);` },
      ],
    },
    {
      slug: "count-bits",
      title: "Count the 1 Bits",
      blurb: "Population count (popcount).",
      xp: 40,
      content: `# Count the 1 Bits

To count set bits, check the lowest bit (\`n & 1\`), then shift right (\`n >>> 1\`)
until the number is 0.

\`\`\`js
5 is 101 → two 1-bits
\`\`\`

## Your task
Write \`countBits(n)\` that returns how many \`1\` bits are in \`n\` (n ≥ 0).`,
      starterCode: `function countBits(n) {
  // count the 1 bits in n
}
`,
      solution: `function countBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n = n >>> 1;
  }
  return count;
}`,
      tests: [
        { name: "countBits(5) === 2", code: `assertEquals(countBits(5), 2);` },
        { name: "countBits(7) === 3", code: `assertEquals(countBits(7), 3);` },
        { name: "countBits(0) === 0", code: `assertEquals(countBits(0), 0);` },
      ],
    },
    {
      slug: "power-of-two",
      title: "Power of Two",
      blurb: "A classic one-liner trick.",
      xp: 40,
      content: `# Power of Two

A power of two has exactly one bit set. Subtracting 1 flips that bit and all
zeros below it, so \`n & (n - 1)\` is \`0\` — and only for powers of two.

## Your task
Write \`isPowerOfTwo(n)\` that returns \`true\` only when \`n\` is a positive power
of two.`,
      starterCode: `function isPowerOfTwo(n) {
  // n > 0 and only one bit set
}
`,
      solution: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      tests: [
        { name: "8 is a power of two", code: `assertEquals(isPowerOfTwo(8), true);` },
        { name: "6 is not", code: `assertEquals(isPowerOfTwo(6), false);` },
        { name: "1 is (2^0)", code: `assertEquals(isPowerOfTwo(1), true);` },
        { name: "0 is not", code: `assertEquals(isPowerOfTwo(0), false);` },
      ],
    },
    {
      slug: "single-number",
      title: "The Single Number",
      blurb: "XOR cancels pairs.",
      xp: 45,
      content: `# The Single Number

XOR has a magic property: \`x ^ x === 0\` and \`x ^ 0 === x\`. So XOR-ing every
number in an array where all values appear twice **except one** leaves just that
one.

## Your task
Write \`singleNumber(nums)\` that returns the value appearing exactly once (every
other value appears exactly twice).`,
      starterCode: `function singleNumber(nums) {
  // XOR everything together
}
`,
      solution: `function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}`,
      tests: [
        { name: "[2,2,1] → 1", code: `assertEquals(singleNumber([2, 2, 1]), 1);` },
        { name: "[4,1,2,1,2] → 4", code: `assertEquals(singleNumber([4, 1, 2, 1, 2]), 4);` },
      ],
    },
    {
      slug: "get-bit",
      title: "Read a Single Bit",
      blurb: "Shift, then mask.",
      xp: 35,
      content: `# Read a Single Bit

To read bit \`i\` (0 = lowest), shift the number right by \`i\` and mask the lowest
bit: \`(n >> i) & 1\`.

\`\`\`js
5 is 101
bit 0 → 1, bit 1 → 0, bit 2 → 1
\`\`\`

## Your task
Write \`getBit(n, i)\` that returns the value (\`0\` or \`1\`) of bit \`i\` in \`n\`.`,
      starterCode: `function getBit(n, i) {
  // return bit i of n (0 or 1)
}
`,
      solution: `function getBit(n, i) {
  return (n >> i) & 1;
}`,
      tests: [
        { name: "bit 0 of 5 is 1", code: `assertEquals(getBit(5, 0), 1);` },
        { name: "bit 1 of 5 is 0", code: `assertEquals(getBit(5, 1), 0);` },
        { name: "bit 2 of 5 is 1", code: `assertEquals(getBit(5, 2), 1);` },
      ],
    },
  ],
};
