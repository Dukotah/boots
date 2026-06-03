import type { Module } from "./types";

// Code Quest: Season 2 — picks up where the teen RPG course (kids.ts) leaves off.
// Levels up from single values to arrays and objects: inventories, spellbooks,
// and party stats, still wrapped in the same playful adventure framing.
export const codeQuest2: Module = {
  slug: "code-quest-2",
  title: "Code Quest: Season 2 🗡️",
  emoji: "🐲",
  gradient: "from-purple-500/20 to-rose-500/10",
  description:
    "The adventure levels up! 🐲 Manage your inventory, search your spellbook, and tally your party's loot using arrays and objects — the next step after Season 1.",
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
    {
      slug: "pick-up-loot",
      title: "Pick Up Loot 🎒",
      blurb: "Add a new item to the end of your backpack.",
      xp: 25,
      content: `# Pick Up Loot 🎒

Your backpack is an **array** — a list of items. To add something to the end, you
use \`.push()\`:

\`\`\`js
const bag = ["sword"];
bag.push("shield"); // bag is now ["sword", "shield"]
\`\`\`

## Your task
Write \`pickUp(bag, item)\` that adds \`item\` to the end of \`bag\` and **returns**
the bag.`,
      starterCode: `function pickUp(bag, item) {
  // push item onto bag, then return bag
}
`,
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
      explanation:
        "🎒 Loot grabbed! `.push()` drops the new item onto the end of your array. Now your backpack is growing.",
    },
    {
      slug: "do-i-have-the-key",
      title: "Do I Have the Key? 🗝️",
      blurb: "Check whether a special item is in your bag.",
      xp: 25,
      content: `# Do I Have the Key? 🗝️

The locked door won't open without the key! Arrays can check if they contain
something with \`.includes()\`, which gives back \`true\` or \`false\`:

\`\`\`js
["bat", "key", "gem"].includes("key"); // true
\`\`\`

## Your task
Write \`hasItem(bag, item)\` that **returns** \`true\` if \`item\` is in \`bag\`, and
\`false\` if it isn't.`,
      starterCode: `function hasItem(bag, item) {
  // return true if item is in bag
}
`,
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
      explanation:
        "🗝️ Click! `.includes()` searched your whole bag and told you yes or no. The door swings open!",
    },
    {
      slug: "count-the-gold",
      title: "Count the Gold 🪙",
      blurb: "Add up every coin in a pile.",
      xp: 30,
      content: `# Count the Gold 🪙

You found a pile of coin stacks! To add up every number in an array, loop through
and keep a running total:

\`\`\`js
function sumAll(nums) {
  let total = 0;
  for (const n of nums) {
    total = total + n;
  }
  return total;
}
\`\`\`

## Your task
Write \`totalGold(coins)\` that returns the sum of all the numbers in the \`coins\`
array. An empty pile is \`0\`.`,
      starterCode: `function totalGold(coins) {
  let total = 0;
  // add up every coin
  return total;
}
`,
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
        "Use a `for...of` loop to visit each coin value.",
        "Add each one onto `total`.",
      ],
      explanation:
        "🪙 Cha-ching! The loop added every coin stack into one grand `total`. You're rich — and you used a loop to count it!",
    },
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
\`\`\`

## Your task
Write \`heal(hp, amount, max)\` that adds \`amount\` to \`hp\`, but never returns more
than \`max\`.`,
      starterCode: `function heal(hp, amount, max) {
  // add amount to hp, but cap it at max
}
`,
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
      explanation:
        "🧪 Glug glug! `Math.min` made sure your health filled up but never spilled over the max. Smart healing!",
    },
    {
      slug: "cast-a-spell",
      title: "Cast a Spell 🔮",
      blurb: "Look up how much damage a spell does in your spellbook.",
      xp: 35,
      content: `# Cast a Spell 🔮

A **spellbook** is an **object** — it pairs each spell name with its damage:

\`\`\`js
const book = { fireball: 30, frost: 20 };
book["fireball"]; // 30
\`\`\`

## Your task
Write \`castSpell(book, name)\` that returns the damage for \`name\`. If the spell
isn't in the book, return \`0\` (a fizzle!).`,
      starterCode: `function castSpell(book, name) {
  // return book[name], or 0 if it's not there
}
`,
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
        "Look it up with `book[name]`.",
        "If it's missing you'll get `undefined` — `book[name] || 0` turns that into 0.",
      ],
      explanation:
        "🔮 Kaboom! You looked the spell up by name in your object spellbook. Missing spells fizzle to 0 thanks to `|| 0`.",
    },
    {
      slug: "count-fallen",
      title: "Count the Fallen Monsters 💀",
      blurb: "How many monsters have 0 health left?",
      xp: 40,
      content: `# Count the Fallen Monsters 💀

After a big battle, you want to count how many monsters are defeated (health is
\`0\` or less). \`.filter()\` keeps only the items that pass a test, and \`.length\`
counts them:

\`\`\`js
[5, 0, 3, 0].filter((hp) => hp === 0).length; // 2
\`\`\`

## Your task
Write \`countDefeated(healths)\` that returns how many numbers in the array are
\`0\` **or less**.`,
      starterCode: `function countDefeated(healths) {
  // count how many values are <= 0
}
`,
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
      explanation:
        "💀 Victory tally! `.filter()` kept just the defeated monsters and `.length` counted them. You're combining array powers now — true Season 2 stuff!",
    },
  ],
};
