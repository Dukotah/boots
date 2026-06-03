import type { Module } from "./types";

// Capture The Flag (CTF) Intro — the friendly on-ramp to security competitions.
// One concept lesson, then the classic beginner skills as runnable puzzles:
// finding flags, ROT13, Base64, hex, and single-byte XOR. All benign decoding.
export const ctfIntro: Module = {
  slug: "ctf-intro",
  title: "Capture The Flag (CTF) Intro",
  description:
    "Your first taste of CTF security puzzles: spot the flag format, then crack the beginner classics — ROT13, Base64, hex, and XOR — all by writing real code.",
  emoji: "🚩",
  gradient: "from-emerald-500/20 to-lime-500/10",
  tagline:
    "Learn Capture The Flag basics: flag formats, ROT13, Base64 and hex decoding, and single-byte XOR — hands-on beginner CTF challenges.",
  keywords: [
    "capture the flag",
    "ctf for beginners",
    "rot13 decode",
    "base64 decode",
    "beginner ctf challenges",
  ],
  lessons: [
    {
      slug: "what-is-ctf",
      title: "What Is a CTF?",
      blurb: "Legal, gamified hacking puzzles — and the 'flag' you're hunting.",
      xp: 25,
      kind: "quiz",
      content: `# What Is a CTF?

A **Capture The Flag (CTF)** is a security competition made of puzzles. Solving a
challenge reveals a **flag** — a special string, usually in a format like
\`flag{...}\` or \`CTF{...}\` — which you submit for points. It's a **legal,
intentional** playground for practicing security skills (the authorization rule
is satisfied by design).

Common challenge categories:
- **Crypto** — decode or break (weak) ciphers and encodings
- **Web** — find flaws in a deliberately vulnerable web app
- **Forensics** — dig a flag out of a file, image, or network capture
- **Reversing / Pwn** — analyze a program to understand or exploit it
- **OSINT** — find information from public sources

This course focuses on the **crypto/encoding** basics — the friendliest entry
point — by actually writing the decoders.

**Things to remember:**
- A **flag** is the target string you recover and submit (e.g. \`flag{...}\`)
- CTFs are a **legal, built-for-it** way to practice
- Categories include **crypto, web, forensics, reversing, OSINT**`,
      questions: [
        {
          prompt: "In a CTF, the 'flag' is:",
          options: [
            "A country's flag image",
            "A special string you recover by solving a challenge and submit for points",
            "A warning that you've been banned",
          ],
          answer: 1,
          explanation:
            "Flags like flag{...} are the proof you solved a challenge; submitting them scores points.",
        },
        {
          prompt: "Why is practicing on a CTF legal when random hacking isn't?",
          options: [
            "Because no one is watching",
            "CTFs are intentionally built and authorized for you to attack",
            "Because flags aren't real data",
          ],
          answer: 1,
          explanation:
            "CTF targets are purpose-built and authorized — the permission requirement is satisfied by design.",
        },
        {
          prompt: "Which is a typical CTF category?",
          options: [
            "Cryptography / encoding puzzles",
            "Competitive cooking",
            "Spelling bees",
          ],
          answer: 0,
          explanation:
            "Crypto, web, forensics, reversing, pwn, and OSINT are standard CTF categories. This course starts with crypto/encoding.",
        },
      ],
    },
    {
      slug: "find-the-flag",
      title: "Find the Flag",
      blurb: "Sift the flag out of a wall of noisy text.",
      xp: 30,
      content: `# Find the Flag

Challenges often bury the flag in a dump of text. Step one is simply
**extracting** the part that matches the flag format. Here the format is
\`flag{...}\` — the word \`flag\`, an opening brace, some content, a closing brace.

## Your task
Write \`findFlag(text)\` that returns the first \`flag{...}\` substring found in
\`text\` (including the braces), or \`""\` if there isn't one. The contents inside
the braces won't contain a \`}\`.`,
      starterCode: `function findFlag(text) {
  // return the first flag{...} match, or "" if none
}
`,
      solution: `function findFlag(text) {
  const match = text.match(/flag\\{[^}]*\\}/);
  return match ? match[0] : "";
}`,
      tests: [
        {
          name: "pulls the flag out of noise",
          code: `assertEquals(findFlag("blah blah flag{w3lc0me} more text"), "flag{w3lc0me}");`,
        },
        {
          name: "no flag → empty string",
          code: `assertEquals(findFlag("nothing to see here"), "");`,
        },
        {
          name: "grabs the first match",
          code: `assertEquals(findFlag("flag{one} flag{two}"), "flag{one}");`,
        },
      ],
      hints: [
        "A regex like `/flag\\{[^}]*\\}/` matches `flag{` then anything up to the first `}`.",
        "`text.match(...)` returns `null` when there's no match — handle that with `match ? match[0] : \"\"`.",
      ],
      explanation:
        "Pattern-matching the flag format is a constant CTF reflex — you'll often pipe a whole file through a `grep` for `flag{` to find it instantly.",
    },
    {
      slug: "rot13",
      title: "Crack ROT13",
      blurb: "A Caesar cipher fixed at 13 — its own inverse.",
      xp: 30,
      content: `# Crack ROT13

**ROT13** rotates each letter 13 places through the alphabet. Because the
alphabet has 26 letters, applying ROT13 **twice** gets you back to the start — so
the same function both encodes and decodes. It's a classic "warm-up" CTF
encoding.

## Your task
Write \`rot13(text)\` that rotates every letter (both \`a\`–\`z\` and \`A\`–\`Z\`) by 13,
wrapping around, and leaves other characters unchanged.`,
      starterCode: `function rot13(text) {
  // rotate each letter by 13, preserving case; leave other chars alone
}
`,
      solution: `function rot13(text) {
  let out = "";
  for (const ch of text) {
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) {
      out += String.fromCharCode(((c - 65 + 13) % 26) + 65);
    } else if (c >= 97 && c <= 122) {
      out += String.fromCharCode(((c - 97 + 13) % 26) + 97);
    } else {
      out += ch;
    }
  }
  return out;
}`,
      tests: [
        { name: 'decodes "uryyb" → "hello"', code: `assertEquals(rot13("uryyb"), "hello");` },
        { name: "round-trips", code: `assertEquals(rot13(rot13("Secret!")), "Secret!");` },
        {
          name: "reveals a flag",
          code: `assertEquals(rot13("synt{ebgngrq}"), "flag{rotated}");`,
        },
      ],
      hints: [
        "Handle uppercase (65–90) and lowercase (97–122) ranges separately.",
        "The shift is `(c - base + 13) % 26 + base` for each range.",
      ],
      explanation:
        "ROT13 is symmetric: encode = decode. It teaches the modular-arithmetic trick behind every rotation cipher, and you'll meet it in real warm-up challenges constantly.",
    },
    {
      slug: "base64-decode",
      title: "Decode Base64",
      blurb: "Text that ends in '=' is a classic giveaway.",
      xp: 35,
      content: `# Decode Base64

**Base64** encodes binary/text as a set of 64 safe characters (A–Z, a–z, 0–9,
\`+\`, \`/\`), often padded with \`=\`. It's **encoding, not encryption** — no key,
fully reversible — and seeing trailing \`=\` (or only those 64 chars) is a strong
hint you're looking at Base64.

The browser provides \`atob()\` to decode a Base64 string back to text.

## Your task
Write \`fromBase64(encoded)\` that returns the decoded string using \`atob\`.`,
      starterCode: `function fromBase64(encoded) {
  // use atob() to decode the Base64 string
}
`,
      solution: `function fromBase64(encoded) {
  return atob(encoded);
}`,
      tests: [
        {
          name: 'decodes "aGVsbG8=" → "hello"',
          code: `assertEquals(fromBase64("aGVsbG8="), "hello");`,
        },
        {
          name: "reveals a flag",
          code: `assertEquals(fromBase64("ZmxhZ3tiNjR9"), "flag{b64}");`,
        },
      ],
      hints: [
        "`atob(encoded)` does the whole decode in one call.",
        "Base64 is reversible encoding — `btoa` would re-encode it.",
      ],
      explanation:
        "Recognizing and decoding Base64 is a daily CTF skill. The big takeaway: Base64 obscures but does not protect — anyone can decode it, so it's never a security measure.",
    },
    {
      slug: "hex-decode",
      title: "Decode Hex",
      blurb: "Two hex digits per character — translate them back to text.",
      xp: 35,
      content: `# Decode Hex

Data is often shown in **hexadecimal**: each character becomes two hex digits
(\`h\` → \`68\`, \`i\` → \`69\`). To decode, read the string two characters at a time,
parse each pair as a base-16 number, and turn that code back into a character.

## Your task
Write \`fromHex(hex)\` that decodes a string of hex pairs into text. You can assume
\`hex\` has an even length and no spaces.`,
      starterCode: `function fromHex(hex) {
  // read two chars at a time, parse base-16, build the string
}
`,
      solution: `function fromHex(hex) {
  let out = "";
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.slice(i, i + 2), 16);
    out += String.fromCharCode(code);
  }
  return out;
}`,
      tests: [
        { name: '"6869" → "hi"', code: `assertEquals(fromHex("6869"), "hi");` },
        {
          name: "reveals a flag",
          code: `assertEquals(fromHex("666c61677b6865787d"), "flag{hex}");`,
        },
        { name: "empty → empty", code: `assertEquals(fromHex(""), "");` },
      ],
      hints: [
        "Step by 2: `for (let i = 0; i < hex.length; i += 2)`.",
        "`parseInt(pair, 16)` parses a hex pair; `String.fromCharCode` turns the code into a character.",
      ],
      explanation:
        "Hex is everywhere in security — file dumps, byte values, encodings. Converting between hex, characters, and numbers fluently is a core reversing/forensics muscle.",
    },
    {
      slug: "xor-decode",
      title: "Single-Byte XOR",
      blurb: "The simplest real cipher — and how a known key undoes it.",
      xp: 40,
      content: `# Single-Byte XOR

**XOR** is a bitwise operation with a neat property: \`a ^ b ^ b === a\`. So if you
XOR each character's code with a secret **key byte**, XOR-ing again with the same
key restores the original. That's single-byte XOR "encryption" — and decoding is
identical when you know the key.

## Your task
Write \`xorDecode(codes, key)\` where \`codes\` is an array of character codes and
\`key\` is a number 0–255. XOR each code with \`key\` and return the resulting
**string**.`,
      starterCode: `function xorDecode(codes, key) {
  // XOR each code with key, turn codes back into characters, join into a string
}
`,
      solution: `function xorDecode(codes, key) {
  return codes.map((c) => String.fromCharCode(c ^ key)).join("");
}`,
      tests: [
        {
          name: 'decodes with key 1 → "hello"',
          code: `assertEquals(xorDecode([105, 100, 109, 109, 110], 1), "hello");`,
        },
        {
          name: "round-trips with the same key",
          code: `const codes = "flag{xor}".split("").map((ch) => ch.charCodeAt(0) ^ 42); assertEquals(xorDecode(codes, 42), "flag{xor}");`,
        },
      ],
      hints: [
        "`^` is XOR in JavaScript: `c ^ key`.",
        "Map each code to `String.fromCharCode(c ^ key)`, then `.join(\"\")`.",
      ],
      explanation:
        "XOR is the seed of real cryptography (stream ciphers, one-time pads). The lesson's point: a cipher is only as strong as its key — single-byte XOR has just 256 keys, so it's brute-forced in an instant.",
    },
  ],
};
