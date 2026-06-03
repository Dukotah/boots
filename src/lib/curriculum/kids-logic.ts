import type { Module } from "./types";

// Scratch-style Logic for Ages 8-12 — the absolute first steps in coding logic:
// sequencing, decisions (if/else), simple repeats, and comparisons, taught as
// tiny, playful JS functions with lots of emoji and gentle hints.
export const kidsLogic: Module = {
  slug: "kids-logic",
  title: "Code Logic for Ages 8–12",
  emoji: "🧩",
  gradient: "from-yellow-400/20 to-pink-500/10",
  description:
    "The very first steps in coding logic! 🧩 Make choices, repeat actions, and compare things — the same ideas as Scratch blocks, now in real code.",
  tagline:
    "A gentle first coding course for ages 8–12: decisions, repeats, and comparisons, the Scratch way — in real JavaScript.",
  keywords: [
    "coding for kids",
    "coding for ages 8-12",
    "scratch to javascript",
    "learn to code kids",
    "first coding course",
  ],
  free: true,
  lessons: [
    {
      slug: "say-hello",
      title: "Say Hello 👋",
      blurb: "Make the computer say hi to anyone you want.",
      xp: 15,
      content: `# Say Hello 👋

In Scratch you drag a **"say"** block. In code, we write a little machine called a
**function** that hands something back with \`return\`.

\`\`\`js
function wave() {
  return "👋";
}
\`\`\`

## Your task
Write \`hello(name)\` that **returns** \`"Hello, "\` with the name and a \`"!"\` on the
end. So \`hello("Sam")\` gives back \`"Hello, Sam!"\`.`,
      starterCode: `function hello(name) {
  // return "Hello, " + name + "!"
}
`,
      solution: `function hello(name) {
  return "Hello, " + name + "!";
}`,
      tests: [
        { name: 'hello("Sam") → "Hello, Sam!"', code: `assertEquals(hello("Sam"), "Hello, Sam!");` },
        { name: 'hello("Ada") → "Hello, Ada!"', code: `assertEquals(hello("Ada"), "Hello, Ada!");` },
      ],
      hints: [
        'Glue words together with `+`: `"Hello, " + name + "!"`.',
        "Don't forget the `!` at the very end. 🎉",
      ],
      explanation:
        'Yes! 🎉 The `+` glues the words and the name into one greeting. You just made a function that can say hi to anybody!',
    },
    {
      slug: "traffic-light",
      title: "Red Light, Green Light 🚦",
      blurb: "Make a decision: should we stop or go?",
      xp: 20,
      content: `# Red Light, Green Light 🚦

Computers make **decisions** with \`if\` and \`else\` — just like the Scratch
"if/else" block.

\`\`\`js
function weather(rainy) {
  if (rainy) {
    return "umbrella ☔";
  } else {
    return "sunglasses 😎";
  }
}
\`\`\`

## Your task
Write \`light(color)\`. If \`color\` is \`"green"\`, return \`"go"\`. Otherwise,
return \`"stop"\`.`,
      starterCode: `function light(color) {
  // if color is "green" return "go", otherwise return "stop"
}
`,
      solution: `function light(color) {
  if (color === "green") {
    return "go";
  } else {
    return "stop";
  }
}`,
      tests: [
        { name: '"green" → "go"', code: `assertEquals(light("green"), "go");` },
        { name: '"red" → "stop"', code: `assertEquals(light("red"), "stop");` },
        { name: '"yellow" → "stop"', code: `assertEquals(light("yellow"), "stop");` },
      ],
      hints: [
        'Check it with `if (color === "green")`. The `===` means "is exactly".',
        "Everything that isn't green should `return \"stop\"` in the `else`.",
      ],
      explanation:
        "🚦 Green means go, everything else means stop! That's an `if/else` — the way code chooses between two paths.",
    },
    {
      slug: "sort-the-candy",
      title: "Even or Odd Candy 🍬",
      blurb: "Can you share the candy evenly with a friend?",
      xp: 25,
      content: `# Even or Odd Candy 🍬

If you can split candy into two equal piles, the number is **even**. The secret
tool is \`%\` (called "remainder"). It tells you what's left over after dividing.

\`\`\`js
6 % 2  // 0  → nothing left over → even!
7 % 2  // 1  → one left over → odd
\`\`\`

## Your task
Write \`isEven(n)\` that **returns** \`true\` if \`n\` is even, and \`false\` if it's
odd.`,
      starterCode: `function isEven(n) {
  // return true if n is even (n % 2 is 0)
}
`,
      solution: `function isEven(n) {
  return n % 2 === 0;
}`,
      tests: [
        { name: "4 is even", code: `assertEquals(isEven(4), true);` },
        { name: "7 is odd", code: `assertEquals(isEven(7), false);` },
        { name: "0 is even", code: `assertEquals(isEven(0), true);` },
      ],
      hints: [
        "`n % 2` is 0 when the number splits evenly.",
        "`n % 2 === 0` is already a true/false answer — just return it!",
      ],
      explanation:
        "🍬 Sharing made easy! `n % 2 === 0` checks if there's nothing left over, which means the candy splits evenly. Even!",
    },
    {
      slug: "repeat-jump",
      title: "Jump, Jump, Jump! 🦘",
      blurb: "Make your character repeat a move lots of times.",
      xp: 30,
      content: `# Jump, Jump, Jump! 🦘

Scratch has a **"repeat 10 times"** block. In code we use a **loop**. This one
builds up a word by repeating it:

\`\`\`js
function laugh(times) {
  let sound = "";
  for (let i = 0; i < times; i++) {
    sound = sound + "ha";
  }
  return sound; // laugh(3) → "hahaha"
}
\`\`\`

## Your task
Write \`jumps(n)\` that returns the word \`"jump "\` repeated \`n\` times (with a
space after each). So \`jumps(2)\` → \`"jump jump "\`.`,
      starterCode: `function jumps(n) {
  let moves = "";
  // repeat "jump " n times
  return moves;
}
`,
      solution: `function jumps(n) {
  let moves = "";
  for (let i = 0; i < n; i++) {
    moves = moves + "jump ";
  }
  return moves;
}`,
      tests: [
        { name: 'jumps(2) → "jump jump "', code: `assertEquals(jumps(2), "jump jump ");` },
        { name: 'jumps(1) → "jump "', code: `assertEquals(jumps(1), "jump ");` },
        { name: 'jumps(0) → ""', code: `assertEquals(jumps(0), "");` },
      ],
      hints: [
        "The loop runs `n` times: `for (let i = 0; i < n; i++)`.",
        'Each time, add to the word: `moves = moves + "jump ";`.',
      ],
      explanation:
        "🦘 Boing! The loop added `\"jump \"` again and again until it ran `n` times. That's how computers repeat things super fast!",
    },
    {
      slug: "count-up",
      title: "Count to a Number 🔢",
      blurb: "Add up all the numbers from 1 up to your number.",
      xp: 30,
      content: `# Count to a Number 🔢

Loops can **count and add** as they go. This one adds every number from 1 up to
\`n\`:

\`\`\`js
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total; // addUpTo(3) → 1 + 2 + 3 = 6
}
\`\`\`

## Your task
Write \`addUpTo(n)\` that returns the sum of all numbers from 1 to \`n\`. So
\`addUpTo(4)\` is \`1 + 2 + 3 + 4 = 10\`.`,
      starterCode: `function addUpTo(n) {
  let total = 0;
  // add each number from 1 up to n
  return total;
}
`,
      solution: `function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total;
}`,
      tests: [
        { name: "addUpTo(4) → 10", code: `assertEquals(addUpTo(4), 10);` },
        { name: "addUpTo(1) → 1", code: `assertEquals(addUpTo(1), 1);` },
        { name: "addUpTo(5) → 15", code: `assertEquals(addUpTo(5), 15);` },
      ],
      hints: [
        "Start the loop at 1 and go while `i <= n`.",
        "Add each `i` onto `total`: `total = total + i;`.",
      ],
      explanation:
        "🔢 Awesome counting! The loop visited every number from 1 to `n` and kept a running `total`. That's a super useful trick.",
    },
    {
      slug: "who-is-taller",
      title: "Who Is Taller? 📏",
      blurb: "Compare two numbers and pick the bigger one.",
      xp: 30,
      content: `# Who Is Taller? 📏

Computers can **compare** things and pick a winner. We can do it with \`if\`, or
with a handy helper called \`Math.max\` that hands back the bigger number:

\`\`\`js
Math.max(3, 9)  // 9
\`\`\`

## Your task
Write \`taller(a, b)\` that returns the **bigger** of the two heights. If they're
the same, returning that number is fine.`,
      starterCode: `function taller(a, b) {
  // return the bigger of a and b
}
`,
      solution: `function taller(a, b) {
  return Math.max(a, b);
}`,
      tests: [
        { name: "taller(120, 150) → 150", code: `assertEquals(taller(120, 150), 150);` },
        { name: "taller(200, 199) → 200", code: `assertEquals(taller(200, 199), 200);` },
        { name: "equal heights", code: `assertEquals(taller(100, 100), 100);` },
      ],
      hints: [
        "`Math.max(a, b)` gives back whichever number is bigger.",
        "Or use an `if`: `if (a > b) return a; else return b;`.",
      ],
      explanation:
        "📏 Great compare! `Math.max` looks at both numbers and hands back the bigger one. Computers love comparing — it's how games decide who wins!",
    },
  ],
};
