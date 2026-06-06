import type { Module } from "./types";

// Number Systems: Binary, Hex & Octal — foundational CS numerics.
// Auto-graded in-browser via Web Worker (JavaScript).
export const numberSystems: Module = {
  slug: "number-systems",
  title: "Number Systems: Binary, Hex & Octal",
  description:
    "Unlock the way computers really count — from the binary 1s and 0s at the hardware level, to hexadecimal color codes and memory addresses, to the octal permissions on every Unix file.",
  emoji: "🔢",
  gradient: "from-indigo-400/20 to-blue-500/10",
  tagline:
    "Learn binary, hexadecimal, and octal: how computers count, base conversion, and bitwise operators.",
  keywords: [
    "binary numbers",
    "hexadecimal",
    "octal",
    "base conversion",
    "bitwise operators",
    "number systems",
    "computer science fundamentals",
  ],
  lessons: [
    // ── Lesson 1 ─ conceptual quiz ─────────────────────────────────────────
    {
      slug: "why-binary",
      title: "Why Computers Count in Binary",
      blurb: "Transistors only have two states — that's why binary exists.",
      xp: 20,
      kind: "quiz",
      content: `# Why Computers Count in Binary

Every piece of data inside a computer — text, images, video, code — is ultimately stored as a sequence of **bits**.  A bit has exactly two states: **0** (off) and **1** (on), matching the physical reality of a transistor that is either open or closed.

## Positional notation

Every number system is **positional**: the value of a digit depends on its *position*.  In base-10 (decimal) each column is a power of 10:

| thousands | hundreds | tens | ones |
|-----------|----------|------|------|
| 10³ = 1000 | 10² = 100 | 10¹ = 10 | 10⁰ = 1 |

Binary (base-2) works the same way but each column is a power of **2**:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|----|---|---|---|
| 2⁷  | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |

Example: **1101₂** = 8 + 4 + 0 + 1 = **13₁₀**

## Familiar uses of binary
- **File permissions** on Unix systems (e.g. \`chmod 755\`)
- **Color channels** in images (each R/G/B channel is 0–255, i.e. 8 bits)
- **Network masks** — IPv4 subnet masks are 32-bit binary numbers
- **Compression & encryption** — all operate on raw bits`,
      questions: [
        {
          prompt: "Why do computers use binary (base-2) instead of decimal (base-10)?",
          options: [
            "Binary arithmetic is faster for humans to read",
            "Transistors physically have only two states (on/off), making binary natural",
            "Decimal numbers take more storage than binary numbers",
          ],
          answer: 1,
          explanation:
            "A transistor is either conducting or not — two states — so base-2 maps perfectly onto the hardware.",
        },
        {
          prompt: "What is the decimal value of the binary number 1010?",
          options: ["10", "12", "5"],
          answer: 0,
          explanation:
            "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 2 = 10₁₀.",
        },
        {
          prompt: "In a positional number system, the value of a digit depends on:",
          options: [
            "Its shape",
            "Its position (column) in the number",
            "Whether it is even or odd",
          ],
          answer: 1,
          explanation:
            "In any positional system — decimal, binary, hex — the column determines how much each digit contributes to the total.",
        },
        {
          prompt: "How many different values can a single bit hold?",
          options: ["1", "2", "10"],
          answer: 1,
          explanation:
            "A bit is either 0 or 1 — exactly two possible values.",
        },
      ],
    },

    // ── Lesson 2 ─ Binary → Decimal ────────────────────────────────────────
    {
      slug: "binary-to-decimal",
      title: "Binary to Decimal",
      blurb: "Parse a binary string and return its base-10 value.",
      xp: 30,
      content: `# Binary to Decimal

To convert a binary string like \`"1101"\` to decimal, work right to left and
multiply each bit by its column value (a power of 2):

\`\`\`
Position: 3  2  1  0
Bit:       1  1  0  1
Value:     8  4  0  1  →  sum = 13
\`\`\`

JavaScript's built-in \`parseInt(string, radix)\` handles this directly:

\`\`\`js
parseInt("1101", 2); // 13
parseInt("1010", 2); // 10
\`\`\`

## Your task

Write a function \`binaryToDecimal(bits)\` that takes a binary string and returns
its decimal (base-10) value as a number.`,
      starterCode: `function binaryToDecimal(bits) {
  // convert the binary string to a decimal number
}
`,
      solution: `function binaryToDecimal(bits) {
  return parseInt(bits, 2);
}`,
      tests: [
        {
          name: 'binaryToDecimal("1101") === 13',
          code: `assertEquals(binaryToDecimal("1101"), 13);`,
        },
        {
          name: 'binaryToDecimal("1010") === 10',
          code: `assertEquals(binaryToDecimal("1010"), 10);`,
        },
        {
          name: 'binaryToDecimal("1") === 1',
          code: `assertEquals(binaryToDecimal("1"), 1);`,
        },
        {
          name: 'binaryToDecimal("0") === 0',
          code: `assertEquals(binaryToDecimal("0"), 0);`,
        },
        {
          name: 'binaryToDecimal("11111111") === 255',
          code: `assertEquals(binaryToDecimal("11111111"), 255);`,
        },
      ],
      hints: [
        "JavaScript has a built-in function that parses strings in any base.",
        "`parseInt(string, radix)` — pass `2` as the radix for binary.",
      ],
      explanation: `\`parseInt(bits, 2)\` tells JavaScript to interpret the string as a base-2 number.
The second argument — the **radix** — can be any base from 2 to 36.`,
    },

    // ── Lesson 3 ─ Decimal → Binary ────────────────────────────────────────
    {
      slug: "decimal-to-binary",
      title: "Decimal to Binary",
      blurb: "Convert a non-negative integer to its binary string.",
      xp: 30,
      content: `# Decimal to Binary

The reverse of parsing is converting — taking a base-10 number and producing
its binary representation.

One way is repeated division by 2, recording remainders bottom-up:

\`\`\`
13 ÷ 2 = 6 remainder 1
 6 ÷ 2 = 3 remainder 0
 3 ÷ 2 = 1 remainder 1
 1 ÷ 2 = 0 remainder 1
Read remainders bottom-up → 1101
\`\`\`

JavaScript's \`Number.prototype.toString(radix)\` does the same thing in one call:

\`\`\`js
(13).toString(2);  // "1101"
(255).toString(2); // "11111111"
(0).toString(2);   // "0"
\`\`\`

## Your task

Write \`decimalToBinary(n)\` that takes a non-negative integer and returns its
binary representation as a **string**.`,
      starterCode: `function decimalToBinary(n) {
  // return the binary string representation of n
}
`,
      solution: `function decimalToBinary(n) {
  return n.toString(2);
}`,
      tests: [
        {
          name: 'decimalToBinary(13) === "1101"',
          code: `assertEquals(decimalToBinary(13), "1101");`,
        },
        {
          name: 'decimalToBinary(10) === "1010"',
          code: `assertEquals(decimalToBinary(10), "1010");`,
        },
        {
          name: 'decimalToBinary(255) === "11111111"',
          code: `assertEquals(decimalToBinary(255), "11111111");`,
        },
        {
          name: 'decimalToBinary(0) === "0"',
          code: `assertEquals(decimalToBinary(0), "0");`,
        },
        {
          name: 'decimalToBinary(1) === "1"',
          code: `assertEquals(decimalToBinary(1), "1");`,
        },
      ],
      hints: [
        "Every JavaScript number has a `.toString()` method.",
        "`(n).toString(2)` converts `n` to a binary string.",
      ],
      explanation: `\`n.toString(2)\` is the mirror image of \`parseInt(s, 2)\`.
Pass any radix (2–36) to get that base's string representation.`,
    },

    // ── Lesson 4 ─ Hex quiz ─────────────────────────────────────────────────
    {
      slug: "hex-intro",
      title: "Hexadecimal: Base 16",
      blurb: "Hex compresses four bits into one digit — perfect for memory addresses and colors.",
      xp: 20,
      kind: "quiz",
      content: `# Hexadecimal: Base 16

**Hexadecimal** (base-16) uses 16 digits: **0–9** and **A–F**:

| Hex | Decimal | Binary |
|-----|---------|--------|
| 0   | 0       | 0000   |
| 9   | 9       | 1001   |
| A   | 10      | 1010   |
| F   | 15      | 1111   |

One hex digit represents exactly **4 bits** (a *nibble*), so two hex digits
represent a full byte (8 bits, 0–255).

## Where you see hex every day

- **CSS colors** — \`#FF5733\` is R=255, G=87, B=51
- **Memory addresses** — \`0x7ffee4b2c100\` in a debugger
- **SHA / MD5 hashes** — 32 or 64 hex characters
- **IPv6 addresses** — \`2001:0db8:85a3::8a2e:0370:7334\`

The prefix **0x** is a common convention meaning "this is hexadecimal":
\`0xFF === 255\` in JavaScript.`,
      questions: [
        {
          prompt: "How many bits does a single hex digit represent?",
          options: ["2 bits", "4 bits", "8 bits"],
          answer: 1,
          explanation:
            "A hex digit ranges 0–F (0–15), which needs exactly 4 bits (2⁴ = 16 values).",
        },
        {
          prompt: "What is the decimal value of the hex digit F?",
          options: ["6", "12", "15"],
          answer: 2,
          explanation:
            "Hex digits go 0–9 then A=10, B=11, C=12, D=13, E=14, F=15.",
        },
        {
          prompt: "A CSS color like #FF5733 uses hex because:",
          options: [
            "CSS requires hexadecimal by law",
            "Two hex digits compactly represent a full byte (0–255) per color channel",
            "Hex looks more colorful than decimal",
          ],
          answer: 1,
          explanation:
            "Each R/G/B channel is 0–255 (one byte). Two hex digits (00–FF) express the same range compactly.",
        },
        {
          prompt: "What does the prefix `0x` mean in `0xFF`?",
          options: [
            "Multiply by zero",
            "This number is written in hexadecimal",
            "This is a JavaScript variable",
          ],
          answer: 1,
          explanation:
            "`0x` is a standard notation telling parsers and readers that the following digits are base-16.",
        },
      ],
    },

    // ── Lesson 5 ─ Hex → Decimal ───────────────────────────────────────────
    {
      slug: "hex-to-decimal",
      title: "Hex to Decimal",
      blurb: "Parse a hex string and return its decimal value.",
      xp: 30,
      content: `# Hex to Decimal

Each hex digit contributes its value × a power of 16:

\`\`\`
"1A"  → 1×16¹ + 10×16⁰ = 16 + 10 = 26
"FF"  → 15×16  + 15     = 240 + 15 = 255
\`\`\`

\`parseInt(string, 16)\` handles this just like \`parseInt(string, 2)\` does
for binary:

\`\`\`js
parseInt("FF", 16);  // 255
parseInt("1A", 16);  // 26
parseInt("a", 16);   // 10  (case-insensitive)
\`\`\`

## Your task

Write \`hexToDecimal(hex)\` that takes an uppercase or lowercase hex string and
returns its decimal value.`,
      starterCode: `function hexToDecimal(hex) {
  // convert the hex string to a decimal number
}
`,
      solution: `function hexToDecimal(hex) {
  return parseInt(hex, 16);
}`,
      tests: [
        {
          name: 'hexToDecimal("FF") === 255',
          code: `assertEquals(hexToDecimal("FF"), 255);`,
        },
        {
          name: 'hexToDecimal("1A") === 26',
          code: `assertEquals(hexToDecimal("1A"), 26);`,
        },
        {
          name: 'hexToDecimal("0") === 0',
          code: `assertEquals(hexToDecimal("0"), 0);`,
        },
        {
          name: 'hexToDecimal("ff") === 255 (lowercase)',
          code: `assertEquals(hexToDecimal("ff"), 255);`,
        },
        {
          name: 'hexToDecimal("DEAD") === 57005',
          code: `assertEquals(hexToDecimal("DEAD"), 57005);`,
        },
      ],
      hints: [
        "`parseInt` accepts a radix argument — you used it already for binary.",
        "For hexadecimal, the radix is 16.",
      ],
      explanation: `\`parseInt(hex, 16)\` is case-insensitive and handles both \`"FF"\` and \`"ff"\`.
The pattern \`parseInt(s, base)\` works for any base the spec supports.`,
    },

    // ── Lesson 6 ─ Decimal → Hex ───────────────────────────────────────────
    {
      slug: "decimal-to-hex",
      title: "Decimal to Hex",
      blurb: "Turn a decimal number into an uppercase hex string.",
      xp: 35,
      content: `# Decimal to Hex

Just as \`toString(2)\` gave us binary, \`toString(16)\` gives hexadecimal:

\`\`\`js
(255).toString(16);  // "ff"
(26).toString(16);   // "1a"
(0).toString(16);    // "0"
\`\`\`

JavaScript returns **lowercase** hex digits.  In most contexts (CSS, hash
displays, memory dumps) you want uppercase — call \`.toUpperCase()\`:

\`\`\`js
(255).toString(16).toUpperCase();  // "FF"
\`\`\`

## Your task

Write \`decimalToHex(n)\` that returns the hex representation of a non-negative
integer as an **uppercase** string.`,
      starterCode: `function decimalToHex(n) {
  // return uppercase hex string
}
`,
      solution: `function decimalToHex(n) {
  return n.toString(16).toUpperCase();
}`,
      tests: [
        {
          name: 'decimalToHex(255) === "FF"',
          code: `assertEquals(decimalToHex(255), "FF");`,
        },
        {
          name: 'decimalToHex(26) === "1A"',
          code: `assertEquals(decimalToHex(26), "1A");`,
        },
        {
          name: 'decimalToHex(0) === "0"',
          code: `assertEquals(decimalToHex(0), "0");`,
        },
        {
          name: 'decimalToHex(57005) === "DEAD"',
          code: `assertEquals(decimalToHex(57005), "DEAD");`,
        },
        {
          name: 'result is uppercase',
          code: `const r = decimalToHex(26); assertEquals(r, r.toUpperCase());`,
        },
      ],
      hints: [
        "Use `.toString(16)` to get the hex string.",
        "Chain `.toUpperCase()` to ensure uppercase output.",
      ],
      explanation: `\`n.toString(16).toUpperCase()\` is the idiomatic one-liner.
Chaining is fine — \`toString\` returns a string, so \`toUpperCase\` is immediately available.`,
    },

    // ── Lesson 7 ─ Octal ───────────────────────────────────────────────────
    {
      slug: "octal",
      title: "Octal: Base 8",
      blurb: "Unix file permissions live in octal — learn to read chmod 755.",
      xp: 35,
      content: `# Octal: Base 8

**Octal** (base-8) uses digits **0–7**.  Three bits map to exactly one octal
digit (2³ = 8), so octal is a convenient shorthand for groups of three bits.

\`\`\`
Binary:  111 101 101
Octal:    7   5   5   →  "755"
\`\`\`

## Unix file permissions

The \`chmod\` command uses octal.  Each octet encodes **read (4) + write (2) +
execute (1)** for owner, group, and others:

| Octal | Binary | r | w | x |
|-------|--------|---|---|---|
| 7     | 111    | ✓ | ✓ | ✓ |
| 5     | 101    | ✓ |   | ✓ |
| 4     | 100    | ✓ |   |   |

So \`chmod 755\` means: owner=rwx (7), group=rx (5), others=rx (5).

## Your task

Write \`octalToDecimal(oct)\` that takes an octal string and returns its decimal
value, and \`decimalToOctal(n)\` that converts a non-negative decimal integer to
an octal string.`,
      starterCode: `function octalToDecimal(oct) {
  // parse the octal string to decimal
}

function decimalToOctal(n) {
  // return the octal string representation of n
}
`,
      solution: `function octalToDecimal(oct) {
  return parseInt(oct, 8);
}

function decimalToOctal(n) {
  return n.toString(8);
}`,
      tests: [
        {
          name: 'octalToDecimal("17") === 15',
          code: `assertEquals(octalToDecimal("17"), 15);`,
        },
        {
          name: 'octalToDecimal("10") === 8',
          code: `assertEquals(octalToDecimal("10"), 8);`,
        },
        {
          name: 'octalToDecimal("755") === 493',
          code: `assertEquals(octalToDecimal("755"), 493);`,
        },
        {
          name: 'decimalToOctal(8) === "10"',
          code: `assertEquals(decimalToOctal(8), "10");`,
        },
        {
          name: 'decimalToOctal(493) === "755"',
          code: `assertEquals(decimalToOctal(493), "755");`,
        },
        {
          name: 'decimalToOctal(0) === "0"',
          code: `assertEquals(decimalToOctal(0), "0");`,
        },
      ],
      hints: [
        "The same `parseInt(s, radix)` / `n.toString(radix)` pattern applies — just use 8 as the radix.",
      ],
      explanation: `Octal follows the exact same pattern: \`parseInt(oct, 8)\` and \`n.toString(8)\`.
The consistent radix argument is one of the most underused features of JavaScript's number API.`,
    },

    // ── Lesson 8 ─ Bitwise operators ───────────────────────────────────────
    {
      slug: "bitwise-operators",
      title: "Bitwise AND, OR & XOR",
      blurb: "Operate directly on individual bits with &, |, and ^.",
      xp: 45,
      content: `# Bitwise AND, OR & XOR

Bitwise operators treat each integer as a sequence of bits and apply a logical
operation **column by column**:

| Op  | Symbol | Rule           | Example (5 & 3)        |
|-----|--------|----------------|------------------------|
| AND | \`&\`    | 1 only if both | \`101 & 011 = 001\` → 1 |
| OR  | \`|\`    | 1 if either    | \`101 | 011 = 111\` → 7 |
| XOR | \`^\`    | 1 if different | \`101 ^ 011 = 110\` → 6 |

\`\`\`js
5 & 3   // 1
5 | 3   // 7
5 ^ 3   // 6
\`\`\`

## Practical uses

- **AND** — masking bits (e.g. \`n & 1\` checks if \`n\` is odd)
- **OR** — setting bits (add a flag to a set of flags)
- **XOR** — toggling bits, and the classic "swap without temp" trick

## Your task

Write \`bitwiseSummary(a, b)\` that returns an object with three properties:
\`and\`, \`or\`, and \`xor\`, each holding the result of applying that operation
to \`a\` and \`b\`.`,
      starterCode: `function bitwiseSummary(a, b) {
  // return { and: ..., or: ..., xor: ... }
}
`,
      solution: `function bitwiseSummary(a, b) {
  return {
    and: a & b,
    or:  a | b,
    xor: a ^ b,
  };
}`,
      tests: [
        {
          name: "bitwiseSummary(5, 3).and === 1",
          code: `assertEquals(bitwiseSummary(5, 3).and, 1);`,
        },
        {
          name: "bitwiseSummary(5, 3).or === 7",
          code: `assertEquals(bitwiseSummary(5, 3).or, 7);`,
        },
        {
          name: "bitwiseSummary(5, 3).xor === 6",
          code: `assertEquals(bitwiseSummary(5, 3).xor, 6);`,
        },
        {
          name: "bitwiseSummary(12, 10).and === 8",
          code: `assertEquals(bitwiseSummary(12, 10).and, 8);`,
        },
        {
          name: "bitwiseSummary(0, 255).or === 255",
          code: `assertEquals(bitwiseSummary(0, 255).or, 255);`,
        },
        {
          name: "bitwiseSummary(7, 7).xor === 0",
          code: `assertEquals(bitwiseSummary(7, 7).xor, 0);`,
        },
      ],
      hints: [
        "JavaScript uses `&` for bitwise AND, `|` for OR, and `^` for XOR.",
        "Just return a plain object literal `{ and: ..., or: ..., xor: ... }`.",
      ],
      explanation: `5 in binary is \`101\`, 3 is \`011\`.
AND columns: \`1&1=1, 0&1=0, 1&1=1\` → wait, let me restate:
\`101 & 011\`: bit2=1&0=0, bit1=0&1=0, bit0=1&1=1 → 001=1. ✓
XOR: 1^0=1, 0^1=1, 1^1=0 → 110=6. ✓`,
    },

    // ── Lesson 9 ─ Universal base converter ────────────────────────────────
    {
      slug: "base-converter",
      title: "Universal Base Converter",
      blurb: "One function to convert between any two bases — putting it all together.",
      xp: 50,
      content: `# Universal Base Converter

Now that you know the pattern — \`parseInt(s, fromBase)\` and \`n.toString(toBase)\`
— you can compose them into a **universal converter**:

\`\`\`js
function convertBase(value, fromBase, toBase) {
  return parseInt(value, fromBase).toString(toBase).toUpperCase();
}

convertBase("FF", 16, 2);    // "11111111"  hex → binary
convertBase("1010", 2, 16);  // "A"         binary → hex
convertBase("17", 8, 10);    // "15"        octal → decimal
\`\`\`

## Your task

Implement \`convertBase(value, fromBase, toBase)\`:

1. Parse \`value\` (a string) from \`fromBase\`
2. Convert the result to \`toBase\` as a string
3. Return the result in **uppercase**

\`value\` will always be a valid number in \`fromBase\`.
\`fromBase\` and \`toBase\` will be integers between 2 and 36.`,
      starterCode: `function convertBase(value, fromBase, toBase) {
  // 1. parse from fromBase
  // 2. convert to toBase
  // 3. return uppercase string
}
`,
      solution: `function convertBase(value, fromBase, toBase) {
  return parseInt(value, fromBase).toString(toBase).toUpperCase();
}`,
      tests: [
        {
          name: 'hex "FF" → binary "11111111"',
          code: `assertEquals(convertBase("FF", 16, 2), "11111111");`,
        },
        {
          name: 'binary "1010" → hex "A"',
          code: `assertEquals(convertBase("1010", 2, 16), "A");`,
        },
        {
          name: 'octal "17" → decimal "15"',
          code: `assertEquals(convertBase("17", 8, 10), "15");`,
        },
        {
          name: 'decimal "255" → hex "FF"',
          code: `assertEquals(convertBase("255", 10, 16), "FF");`,
        },
        {
          name: 'binary "11111111" → decimal "255"',
          code: `assertEquals(convertBase("11111111", 2, 10), "255");`,
        },
        {
          name: 'decimal "493" → octal "755"',
          code: `assertEquals(convertBase("493", 10, 8), "755");`,
        },
      ],
      hints: [
        "Chain `parseInt` and `toString`: `parseInt(value, fromBase).toString(toBase)`.",
        "Don't forget `.toUpperCase()` at the end.",
      ],
      explanation: `The two-step chain is the key insight: **parse then serialize**.
\`parseInt\` normalizes any base into a JS number; \`toString(base)\` serializes it back.
\`toUpperCase\` ensures consistent output regardless of which base is the target.`,
    },
  ],
};
