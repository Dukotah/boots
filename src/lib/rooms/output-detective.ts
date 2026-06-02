import type { Room } from "./types";

// Read JavaScript, predict exactly what it prints, submit that as the flag.
// Pure language-mechanics — coercion, methods, closures — no security framing.
export const outputDetective: Room = {
  slug: "output-detective",
  title: "Output Detective",
  emoji: "🕵️",
  gradient: "from-amber-500/20 to-orange-500/10",
  difficulty: "easy",
  tags: ["javascript", "debugging", "fundamentals"],
  blurb: "Read the JavaScript and submit exactly what it logs. No running it!",
  intro: `# Output Detective

A great developer can **read code and predict what it does** without running it.
Each task shows a small JavaScript snippet. Work out exactly what it prints to the
console and submit that as your flag.

Submit the printed text **exactly** — same characters, same order. Whitespace at
the ends is ignored, and answers aren't case-sensitive here.`,
  tasks: [
    {
      slug: "coercion-chain",
      prompt: "What does this log?",
      code: `console.log(2 + "2" + 2);`,
      hint: "`+` with a string concatenates. `2 + \"2\"` becomes the string \"22\", then \"22\" + 2…",
      answer: "222",
      xp: 15,
    },
    {
      slug: "map-join",
      prompt: "What does this log?",
      code: `console.log([1, 2, 3].map((x) => x * 2).join("-"));`,
      hint: "Double each element first, then join the array with dashes.",
      answer: "2-4-6",
      xp: 15,
    },
    {
      slug: "typeof-null",
      prompt: "What does this log?",
      code: `console.log(typeof null);`,
      hint: "This is a famous, long-standing JavaScript quirk.",
      answer: "object",
      xp: 20,
    },
    {
      slug: "banana",
      prompt: "What does this log?",
      code: `console.log(("b" + "a" + +"a" + "a").toLowerCase());`,
      hint: "`+\"a\"` tries to make \"a\" a number — and fails. What value means \"not a number\"?",
      answer: "banana",
      xp: 25,
    },
  ],
};
