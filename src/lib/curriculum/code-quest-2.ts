import type { Module } from "./types";

// Code Quest: Season 2 — picks up where the teen RPG course (kids.ts) leaves off.
// Levels up from single values to arrays and objects: inventories, spellbooks,
// and party stats, still wrapped in the same playful adventure framing.
//
// Dialed down for total beginners (ages 9–13 AND non-technical adults): the
// module now opens with a no-typing quiz so nobody is asked to write an array
// before they've *read* one. Concept order follows kids-logic best practice —
// read code → tiny scaffolded edit → predict-the-output quiz → next idea. Every
// code lesson has drag-in `blocks` and step-by-step `hintCode`, and any lesson
// that used to stack two new ideas (object lookup + `|| 0` fallback; arrow
// callbacks + `.filter` + `.length`) is split so each step teaches ONE thing.
export const codeQuest2: Module = {
  slug: "code-quest-2",
  title: "Coding Level 4: Arrays & Objects 🎒",
  emoji: "🐲",
  gradient: "from-purple-500/20 to-rose-500/10",
  description:
    "The adventure levels up! 🐲 Manage your inventory, search your spellbook, and tally your party's loot using arrays and objects — your next step after building a game.",
  tagline:
    "Season 2 of the teen coding RPG: arrays and objects through inventories, spellbooks, and party battles in real JavaScript.",
  keywords: [
    "coding for teens",
    "javascript arrays for beginners",
    "javascript objects beginner",
    "fun coding course",
    "code quest",
  ],
  lessons: [
    // ── 1. Cold open: what an array is (no typing) ──
    {
      slug: "what-is-an-array",
      title: "What's an Array? 🎒",
      blurb: "An array is a list — like the items in your backpack.",
      xp: 10,
      kind: "quiz",
      content: `# What's an Array? 🎒

Welcome back, adventurer! 🐲 In Season 2 your hero gets a **backpack**, a
**spellbook**, and a whole **party** of friends. To handle all that, you need one
big new idea: the **array**.

An **array** is just a **list** of things, written between square brackets \`[ ]\`,
with commas between them:

\`\`\`js
const bag = ["sword", "shield", "potion"];
\`\`\`

That's a backpack holding three items. Each item sits in its own slot, **in
order**: \`"sword"\` is first, \`"potion"\` is last.

You can ask an array how many things it holds with \`.length\`:

\`\`\`js
bag.length;   // 3  → three items in the bag
\`\`\`

No typing yet — just read the code above, then check the big idea below. 👇`,
      questions: [
        {
          prompt: "What is an array?",
          options: [
            "A list of things, written between square brackets",
            "A single number",
            "A kind of dragon",
          ],
          answer: 0,
          explanation:
            "An array is an ordered list — perfect for a backpack full of items.",
        },
        {
          prompt: 'In `const bag = ["sword", "shield", "potion"];`, what is the **first** item?',
          options: ['"potion"', '"sword"', '"shield"'],
          answer: 1,
          explanation:
            "Arrays keep their order. The first slot holds \"sword\".",
        },
        {
          prompt: "What does `bag.length` give you?",
          options: [
            "how many items are in the bag",
            "the first item",
            "the word \"length\"",
          ],
          answer: 0,
          explanation:
            "`.length` counts the slots — here, 3 items.",
        },
      ],
    },

    // ── 2. First code task: add to an array (.push) ──
    {
      slug: "pick-up-loot",
      title: "Pick Up Loot 🎒",
      blurb: "Add a new item to the end of your backpack.",
      xp: 25,
      content: `# Pick Up Loot 🎒

You just learned that a backpack is an **array** — a list of items. Now let's add
something to it!

To add an item to the **end** of an array, you use \`.push()\`:

\`\`\`js
const bag = ["sword"];
bag.push("shield"); // bag is now ["sword", "shield"]
\`\`\`

You can drag the blocks in (in order) instead of typing from scratch, or tap the
hint to fill it in step by step.

## Your task
Write \`pickUp(bag, item)\` that adds \`item\` to the end of \`bag\` and **returns**
the bag.`,
      starterCode: `function pickUp(bag, item) {

}
`,
      blocks: ["bag.push(item); ", "return bag;"],
      solution: `function pickUp(bag, item) {
  bag.push(item);
  return bag;
}`,
      tests: [
        {
          name: "adds an item",
          code: `assertEquals(pickUp(["sword"], "shield"), ["sword", "shield"]);`,
        },
        {
          name: "adds to an empty bag",
          code: `assertEquals(pickUp([], "potion"), ["potion"]);`,
        },
      ],
      hints: [
        "`bag.push(item)` adds it to the end of the array.",
        "After pushing, `return bag;` to hand it back.",
      ],
      hintCode: [
        `function pickUp(bag, item) {\n  bag.push(item);\n\n}\n`,
        `function pickUp(bag, item) {\n  bag.push(item);\n  return bag;\n}\n`,
      ],
      explanation:
        "🎒 Loot grabbed! `.push()` drops the new item onto the end of your array. Now your backpack is growing.",
    },

    // ── 3. Ask an array a yes/no question (.includes) ──
    {
      slug: "do-i-have-the-key",
      title: "Do I Have the Key? 🗝️",
      blurb: "Check whether a special item is in your bag.",
      xp: 25,
      content: `# Do I Have the Key? 🗝️

The locked door won't open without the key! Arrays can check if they contain
something with \`.includes()\`, which hands back \`true\` or \`false\`:

\`\`\`js
["bat", "key", "gem"].includes("key"); // true
["bat", "gem"].includes("key");        // false
\`\`\`

Because \`.includes()\` is *already* true or false, you can just \`return\` it — no
\`if\` needed!

## Your task
Write \`hasItem(bag, item)\` that **returns** \`true\` if \`item\` is in \`bag\`, and
\`false\` if it isn't.`,
      starterCode: `function hasItem(bag, item) {

}
`,
      blocks: ["return ", "bag", ".includes(item)", ";"],
      solution: `function hasItem(bag, item) {
  return bag.includes(item);
}`,
      tests: [
        {
          name: "has the key",
          code: `assertEquals(hasItem(["map", "key"], "key"), true);`,
        },
        {
          name: "no key here",
          code: `assertEquals(hasItem(["map", "rope"], "key"), false);`,
        },
      ],
      hints: [
        "`bag.includes(item)` already returns true or false.",
        "Just return it — no `if` needed!",
      ],
      hintCode: [
        `function hasItem(bag, item) {\n  return bag.includes(item);\n}\n`,
        undefined,
      ],
      explanation:
        "🗝️ Click! `.includes()` searched your whole bag and told you yes or no. The door swings open!",
    },

    // ── 4. Read a loop before writing one (no typing) ──
    {
      slug: "reading-a-loop",
      title: "Reading a Loop 🔁",
      blurb: "Before you write a loop, learn to read one.",
      xp: 10,
      kind: "quiz",
      content: `# Reading a Loop 🔁

Soon you'll add up a pile of gold coins. To do that, you visit **every item** in
an array, one at a time. The tool for that is a **\`for...of\` loop**.

Read this slowly — it's a little machine that walks through a list:

\`\`\`js
const coins = [5, 10, 2];
let total = 0;
for (const n of coins) {
  total = total + n;   // add this coin onto the total
}
// total is now 17
\`\`\`

Here's what happens, step by step:
1. \`total\` starts at \`0\`.
2. The loop grabs each coin in turn: first \`5\`, then \`10\`, then \`2\`.
3. Each time, it adds that coin onto \`total\`: 0 → 5 → 15 → 17.

The \`n\` is just a temporary name for "the coin we're looking at right now."

No typing — just read it and answer below. You'll write your own loop next. 👇`,
      questions: [
        {
          prompt: "What is a `for...of` loop for?",
          options: [
            "visiting every item in an array, one at a time",
            "deleting an array",
            "making a brand-new dragon",
          ],
          answer: 0,
          explanation:
            "`for...of` walks through a list and lets you do something with each item.",
        },
        {
          prompt: "In the gold example, what is `total` at the very start?",
          options: ["17", "0", "5"],
          answer: 1,
          explanation:
            "We start `total` at 0, then add each coin onto it.",
        },
        {
          prompt: "After the loop visits 5, then 10, then 2, what is `total`?",
          options: ["15", "17", "10"],
          answer: 1,
          explanation:
            "5 + 10 + 2 = 17. The loop added every coin onto the running total.",
        },
      ],
    },

    // ── 5. Write the for-of loop (now scaffolded) ──
    {
      slug: "count-the-gold",
      title: "Count the Gold 🪙",
      blurb: "Add up every coin in a pile.",
      xp: 30,
      content: `# Count the Gold 🪙

You just *read* a counting loop — now you'll write one! 🪙 You found a pile of
coin stacks and want one grand total.

The plan is exactly the one from the last lesson:
1. Start \`total\` at \`0\` (already done for you).
2. Loop through every coin with \`for (const n of coins)\`.
3. Add each coin onto \`total\`.
4. Return \`total\`.

Drag the blocks in (in order) to build the loop, or tap the hint to fill it in
step by step.

\`\`\`js
for (const n of coins) {
  total = total + n;
}
\`\`\`

## Your task
Write \`totalGold(coins)\` that returns the sum of all the numbers in the \`coins\`
array. An empty pile is \`0\`.`,
      starterCode: `function totalGold(coins) {
  let total = 0;

  return total;
}
`,
      blocks: [
        "for (const n of coins) {",
        "total = total + n;",
        "}",
      ],
      solution: `function totalGold(coins) {
  let total = 0;
  for (const n of coins) {
    total = total + n;
  }
  return total;
}`,
      tests: [
        { name: "[5, 10, 2] → 17", code: `assertEquals(totalGold([5, 10, 2]), 17);` },
        { name: "empty pile → 0", code: `assertEquals(totalGold([]), 0);` },
        { name: "single stack", code: `assertEquals(totalGold([100]), 100);` },
      ],
      hints: [
        "Visit each coin with `for (const n of coins) {` … `}`.",
        "Inside the loop, add each one on: `total = total + n;`.",
      ],
      hintCode: [
        `function totalGold(coins) {\n  let total = 0;\n  for (const n of coins) {\n\n  }\n  return total;\n}\n`,
        `function totalGold(coins) {\n  let total = 0;\n  for (const n of coins) {\n    total = total + n;\n  }\n  return total;\n}\n`,
      ],
      explanation:
        "🪙 Cha-ching! The loop added every coin stack into one grand `total`. You're rich — and you used a loop to count it!",
    },

    // ── 6. Cap a value with Math.min ──
    {
      slug: "drink-potion",
      title: "Drink a Potion 🧪",
      blurb: "Heal up — but you can't go over full health!",
      xp: 35,
      content: `# Drink a Potion 🧪

A potion heals you, but your health can't go **over the maximum**. \`Math.min\`
picks the **smaller** of two numbers, which is a clever way to "cap" a value:

\`\`\`js
Math.min(120, 100); // 100 — can't go above 100
Math.min(70, 100);  // 70  — already under the cap
\`\`\`

So if you heal up to \`hp + amount\`, but cap it with \`Math.min(hp + amount, max)\`,
you'll never spill over the maximum.

## Your task
Write \`heal(hp, amount, max)\` that adds \`amount\` to \`hp\`, but never returns more
than \`max\`.`,
      starterCode: `function heal(hp, amount, max) {

}
`,
      blocks: ["return ", "Math.min(", "hp + amount", ", ", "max", ")", ";"],
      solution: `function heal(hp, amount, max) {
  return Math.min(hp + amount, max);
}`,
      tests: [
        { name: "normal heal", code: `assertEquals(heal(50, 20, 100), 70);` },
        { name: "can't overheal", code: `assertEquals(heal(90, 50, 100), 100);` },
        { name: "exactly full", code: `assertEquals(heal(80, 20, 100), 100);` },
      ],
      hints: [
        "First add: `hp + amount`.",
        "Then cap it with `Math.min(hp + amount, max)`.",
      ],
      hintCode: [
        `function heal(hp, amount, max) {\n  return hp + amount;\n}\n`,
        `function heal(hp, amount, max) {\n  return Math.min(hp + amount, max);\n}\n`,
      ],
      explanation:
        "🧪 Glug glug! `Math.min` made sure your health filled up but never spilled over the max. Smart healing!",
    },

    // ── 7. Object lookup (ONE idea: read a value by key) ──
    {
      slug: "look-up-a-spell",
      title: "Look Up a Spell 📖",
      blurb: "Find a spell's damage in your spellbook.",
      xp: 30,
      content: `# Look Up a Spell 📖

A **spellbook** is an **object** — it pairs each spell **name** with its damage.
We write objects with curly braces \`{ }\`:

\`\`\`js
const book = { fireball: 30, frost: 20 };
\`\`\`

To look something up, put the name in square brackets:

\`\`\`js
book["fireball"]; // 30
book["frost"];    // 20
\`\`\`

This is just like a backpack, but instead of slots numbered by order, you look
things up by **name**. 🔖

For now, every spell you ask for is really in the book — so you just hand back
what you find. (Next lesson: what happens when it's missing!)

## Your task
Write \`spellDamage(book, name)\` that returns the damage for \`name\`.`,
      starterCode: `function spellDamage(book, name) {

}
`,
      blocks: ["return ", "book[name]", ";"],
      solution: `function spellDamage(book, name) {
  return book[name];
}`,
      tests: [
        {
          name: "fireball does 30",
          code: `assertEquals(spellDamage({ fireball: 30, frost: 20 }, "fireball"), 30);`,
        },
        {
          name: "frost does 20",
          code: `assertEquals(spellDamage({ fireball: 30, frost: 20 }, "frost"), 20);`,
        },
      ],
      hints: [
        "Look it up by name with `book[name]`.",
        "That gives you the damage — just `return` it.",
      ],
      hintCode: [
        `function spellDamage(book, name) {\n  return book[name];\n}\n`,
        undefined,
      ],
      explanation:
        "📖 Found it! You looked the spell up by name in your object spellbook and handed back its damage.",
    },

    // ── 8. The || 0 fallback (ONE new idea on top of lookup) ──
    {
      slug: "cast-a-spell",
      title: "Cast a Spell 🔮",
      blurb: "Look up a spell — but missing spells should fizzle to 0.",
      xp: 35,
      content: `# Cast a Spell 🔮

Last lesson, every spell was really in the book. But what if you ask for a spell
that **isn't there**?

\`\`\`js
const book = { fireball: 30 };
book["sparkle"]; // undefined — there's no such spell!
\`\`\`

\`undefined\` means "nothing's there." To turn a missing spell into a tidy \`0\` (a
fizzle!), we use \`|| 0\`, which means *"use the left side, but if it's missing,
use 0 instead"*:

\`\`\`js
book["sparkle"] || 0; // 0
book["fireball"] || 0; // 30
\`\`\`

## Your task
Write \`castSpell(book, name)\` that returns the damage for \`name\`. If the spell
isn't in the book, return \`0\`.`,
      starterCode: `function castSpell(book, name) {

}
`,
      blocks: ["return ", "book[name]", " || ", "0", ";"],
      solution: `function castSpell(book, name) {
  return book[name] || 0;
}`,
      tests: [
        {
          name: "fireball does 30",
          code: `assertEquals(castSpell({ fireball: 30, frost: 20 }, "fireball"), 30);`,
        },
        {
          name: "unknown spell fizzles",
          code: `assertEquals(castSpell({ fireball: 30 }, "sparkle"), 0);`,
        },
      ],
      hints: [
        "Start with the lookup you already know: `book[name]`.",
        "If it's missing you'll get `undefined` — `book[name] || 0` turns that into 0.",
      ],
      hintCode: [
        `function castSpell(book, name) {\n  return book[name];\n}\n`,
        `function castSpell(book, name) {\n  return book[name] || 0;\n}\n`,
      ],
      explanation:
        "🔮 Kaboom! You looked the spell up by name, and `|| 0` made missing spells fizzle safely to 0 instead of `undefined`.",
    },

    // ── 9. Gentle arrow-function intro (no typing) ──
    {
      slug: "what-is-an-arrow",
      title: "Tiny Machines: Arrows ➡️",
      blurb: "Meet the arrow function — a mini machine you hand to a list.",
      xp: 10,
      kind: "quiz",
      content: `# Tiny Machines: Arrows ➡️

You're about to count defeated monsters. To do that, you'll hand a **tiny
machine** to your array and let it decide which monsters to keep.

That tiny machine is an **arrow function**. It takes something in on the left, and
the \`=>\` arrow points to the answer it hands back:

\`\`\`js
(hp) => hp <= 0
\`\`\`

Read that as: *"give me an \`hp\`, and I'll tell you whether it's 0 or less."*

It's just a yes/no test in a tiny package:

\`\`\`js
const isDefeated = (hp) => hp <= 0;
isDefeated(0);  // true  → defeated
isDefeated(7);  // false → still fighting
\`\`\`

No typing — just get comfy with the \`=>\` arrow, then answer below. 👇`,
      questions: [
        {
          prompt: "In `(hp) => hp <= 0`, what does the `=>` arrow point to?",
          options: [
            "the answer the tiny machine hands back",
            "the name of the array",
            "a comment",
          ],
          answer: 0,
          explanation:
            "Left of `=>` is what goes in; right of `=>` is the answer that comes out.",
        },
        {
          prompt: "What does `(hp) => hp <= 0` hand back when `hp` is `0`?",
          options: ["true", "false", "0"],
          answer: 0,
          explanation:
            "0 is 0 or less, so the test is true — that monster is defeated.",
        },
        {
          prompt: "What does `(hp) => hp <= 0` hand back when `hp` is `7`?",
          options: ["true", "false", "7"],
          answer: 1,
          explanation:
            "7 is greater than 0, so the test is false — still fighting!",
        },
      ],
    },

    // ── 10. Combine arrow + .filter + .length ──
    {
      slug: "count-fallen",
      title: "Count the Fallen Monsters 💀",
      blurb: "How many monsters have 0 health left?",
      xp: 40,
      content: `# Count the Fallen Monsters 💀

Now let's use that tiny arrow machine! After a big battle, you want to count how
many monsters are defeated (health is \`0\` or less).

\`.filter()\` walks the array and **keeps only** the items your arrow says
\`true\` for. Then \`.length\` counts how many made it through:

\`\`\`js
[5, 0, 3, 0].filter((hp) => hp === 0); // [0, 0]  → keeps the zeros
[5, 0, 3, 0].filter((hp) => hp === 0).length; // 2
\`\`\`

You already met the arrow \`(hp) => hp <= 0\` — drop it into \`.filter()\` and add
\`.length\` to count.

## Your task
Write \`countDefeated(healths)\` that returns how many numbers in the array are
\`0\` **or less**.`,
      starterCode: `function countDefeated(healths) {

}
`,
      blocks: ["return ", "healths", ".filter((hp) => hp <= 0)", ".length", ";"],
      solution: `function countDefeated(healths) {
  return healths.filter((hp) => hp <= 0).length;
}`,
      tests: [
        {
          name: "two defeated",
          code: `assertEquals(countDefeated([10, 0, 5, -2]), 2);`,
        },
        {
          name: "none defeated",
          code: `assertEquals(countDefeated([3, 1, 8]), 0);`,
        },
        { name: "empty battlefield", code: `assertEquals(countDefeated([]), 0);` },
      ],
      hints: [
        "`.filter((hp) => hp <= 0)` keeps only the fallen monsters.",
        "Then `.length` counts how many are left.",
      ],
      hintCode: [
        `function countDefeated(healths) {\n  return healths.filter((hp) => hp <= 0);\n}\n`,
        `function countDefeated(healths) {\n  return healths.filter((hp) => hp <= 0).length;\n}\n`,
      ],
      explanation:
        "💀 Victory tally! `.filter()` kept just the defeated monsters and `.length` counted them. You combined a tiny arrow machine with two array powers — true Season 2 stuff!",
    },
  ],
};
