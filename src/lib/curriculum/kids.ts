import type { Module } from "./types";

export const kids: Module = {
  slug: "kids",
  title: "Code Quest for Teens",
  emoji: "🎮",
  gradient: "from-pink-400/20 to-purple-500/10",
  description:
    "Learn to code by building tiny games and adventures! 🐉 Earn points, brew potions, and battle monsters — all while writing real JavaScript.",
  tagline:
    "A fun, beginner coding course for teens — learn JavaScript by building little games.",
  keywords: [
    "coding for kids",
    "coding for teens",
    "learn javascript for beginners",
    "fun coding course",
  ],
  lessons: [
    {
      slug: "hero-name",
      title: "Your Hero's Name 🦸",
      blurb: "Every quest needs a hero. Give yours a name!",
      xp: 15,
      content: `# Your Hero's Name 🦸

Welcome, adventurer! Before we slay any monsters, your hero needs a **name**.

A **function** is a little machine: you call it, and it hands something back with
\`return\`. Here's a function that hands back a word:

\`\`\`js
function pet() {
  return "Sparkle the Dragon"; // 🐉
}
\`\`\`

## Your task
Write a function \`hero\` that **returns** any hero name you like — go wild!
(But make sure it actually returns a name, not an empty string. 😉)`,
      starterCode: `function hero() {
  // Return your hero's name as a string!
  return "";
}
`,
      solution: `function hero() {
  return "Captain Pixel";
}`,
      tests: [
        {
          name: "hero() returns a non-empty name",
          code: `assert(typeof hero() === "string" && hero().length > 0, "hero() should return a non-empty name string!");`,
        },
      ],
      hints: [
        "Put your name between the quotes, like `return \"Sir Bytes-a-Lot\";` 🛡️",
        "An empty string `\"\"` won't count — your hero needs at least one letter!",
      ],
      explanation:
        "Boom! 💥 Your function hands back a real name, and the test checks it's a string with at least one character. A hero is born!",
    },
    {
      slug: "score-points",
      title: "Score Points 🏆",
      blurb: "Add the points you just earned to your score.",
      xp: 20,
      content: `# Score Points 🏆

You stomped a goblin and earned some points! 🪙 Time to add them to your score.

Functions can take **inputs** (called parameters) and use them in the answer:

\`\`\`js
function addGold(gold, found) {
  return gold + found; // stack 'em up!
}
\`\`\`

## Your task
Write \`addPoints(score, points)\` that **returns** your new total (\`score + points\`).`,
      starterCode: `function addPoints(score, points) {
  // Return the new total score
}
`,
      solution: `function addPoints(score, points) {
  return score + points;
}`,
      tests: [
        { name: "addPoints(10, 5) === 15", code: `assertEquals(addPoints(10, 5), 15);` },
        { name: "addPoints(0, 100) === 100", code: `assertEquals(addPoints(0, 100), 100);` },
        { name: "addPoints(42, 8) === 50", code: `assertEquals(addPoints(42, 8), 50);` },
      ],
      hints: [
        "Use the `+` sign to add the two numbers together. ➕",
        "Don't forget `return` — without it your function gives back nothing!",
      ],
      explanation:
        "Nice combo! 🎯 `return score + points` adds your fresh points onto your old score and hands back the grand total.",
    },
    {
      slug: "double-damage",
      title: "Double Damage ⚔️",
      blurb: "A critical hit deals double damage!",
      xp: 20,
      content: `# Double Damage ⚔️

CRITICAL HIT! 💥 When your sword glows, every hit does **double** damage.

You can multiply numbers with the \`*\` symbol:

\`\`\`js
function triple(n) {
  return n * 3; // three times the power!
}
\`\`\`

## Your task
Write \`damage(hit)\` that **returns** double the damage (\`hit * 2\`).`,
      starterCode: `function damage(hit) {
  // Return double the damage
}
`,
      solution: `function damage(hit) {
  return hit * 2;
}`,
      tests: [
        { name: "damage(5) === 10", code: `assertEquals(damage(5), 10);` },
        { name: "damage(0) === 0", code: `assertEquals(damage(0), 0);` },
        { name: "damage(13) === 26", code: `assertEquals(damage(13), 26);` },
      ],
      hints: [
        "Use `*` to multiply: `hit * 2`. ✖️",
        "Whatever number comes in, send back twice as much with `return`.",
      ],
      explanation:
        "CRIT! 🗡️ `hit * 2` doubles the incoming damage — that monster never stood a chance.",
    },
    {
      slug: "level-up",
      title: "Level Up ⬆️",
      blurb: "Enough XP — bump your hero up a level!",
      xp: 20,
      content: `# Level Up ⬆️

DING! 🔔 You earned enough XP to **level up**. That means adding 1 to your level.

Adding one is super common in games:

\`\`\`js
function nextRound(round) {
  return round + 1; // onward!
}
\`\`\`

## Your task
Write \`levelUp(level)\` that **returns** the next level (\`level + 1\`).`,
      starterCode: `function levelUp(level) {
  // Return the next level
}
`,
      solution: `function levelUp(level) {
  return level + 1;
}`,
      tests: [
        { name: "levelUp(1) === 2", code: `assertEquals(levelUp(1), 2);` },
        { name: "levelUp(0) === 1", code: `assertEquals(levelUp(0), 1);` },
        { name: "levelUp(99) === 100", code: `assertEquals(levelUp(99), 100);` },
      ],
      hints: [
        "Just add 1: `level + 1`. ➕",
        "Return the result so your hero actually levels up!",
      ],
      explanation:
        "LEVEL UP! ✨ `level + 1` pushes your hero one step higher. New skills await!",
    },
    {
      slug: "is-it-a-win",
      title: "Is It a Win? 🥇",
      blurb: "Score 100 or more and you win the round.",
      xp: 25,
      content: `# Is It a Win? 🥇

Did you win?! You win the round if your score is **100 or more**. 🎉

We can compare numbers and get back \`true\` or \`false\` (a **boolean**):

\`\`\`js
function isFull(hp) {
  return hp >= 100; // true when hp is 100 or higher
}
\`\`\`

The \`>=\` means "greater than or equal to".

## Your task
Write \`isWin(score)\` that **returns** \`true\` if \`score\` is 100 or more, else \`false\`.`,
      starterCode: `function isWin(score) {
  // Return true if score is 100 or more, otherwise false
}
`,
      solution: `function isWin(score) {
  return score >= 100;
}`,
      tests: [
        { name: "isWin(150) === true", code: `assertEquals(isWin(150), true);` },
        { name: "isWin(100) === true", code: `assertEquals(isWin(100), true);` },
        { name: "isWin(99) === false", code: `assertEquals(isWin(99), false);` },
        { name: "isWin(0) === false", code: `assertEquals(isWin(0), false);` },
      ],
      hints: [
        "Use the `>=` comparison: `score >= 100`. It already gives back true or false! ⚖️",
        "Exactly 100 still counts as a win, so use `>=`, not `>`.",
      ],
      explanation:
        "VICTORY! 🏅 `score >= 100` is already a true/false answer, so you can return it straight up. No need for an `if`!",
    },
    {
      slug: "potion-count",
      title: "Potion Count 🧪",
      blurb: "Count the potions in your bag.",
      xp: 25,
      content: `# Potion Count 🧪

How many potions are in your bag? 🎒 In code, a bag of stuff is an **array** —
a list wrapped in square brackets:

\`\`\`js
const monsters = ["slime", "bat", "ghost"];
monsters.length; // 3 monsters!
\`\`\`

Every array knows its own size with \`.length\`.

## Your task
Write \`potions(list)\` that **returns** how many items are in the array (\`list.length\`).`,
      starterCode: `function potions(list) {
  // Return how many potions are in the list
}
`,
      solution: `function potions(list) {
  return list.length;
}`,
      tests: [
        {
          name: 'potions(["red","blue"]) === 2',
          code: `assertEquals(potions(["red", "blue"]), 2);`,
        },
        { name: "potions([]) === 0", code: `assertEquals(potions([]), 0);` },
        {
          name: "potions of 4 items === 4",
          code: `assertEquals(potions(["a", "b", "c", "d"]), 4);`,
        },
      ],
      hints: [
        "Arrays have a built-in counter: `list.length`. 🔢",
        "An empty bag `[]` has a length of 0 — that should work automatically!",
      ],
      explanation:
        "Inventory checked! 🎒 `list.length` instantly counts everything in the array, even when the bag is empty.",
    },
    {
      slug: "battle-cry",
      title: "Battle Cry 📣",
      blurb: "Shout your word in ALL CAPS with a bang!",
      xp: 30,
      content: `# Battle Cry 📣

CHARGE! ⚔️ A battle cry must be LOUD. We'll turn a word into all capitals and
add an exclamation mark.

Strings have a \`.toUpperCase()\` move, and \`+\` glues text together:

\`\`\`js
function whisper(word) {
  return word + "..."; // glue on some dots
}
whisper("boo"); // "boo..."
\`\`\`

## Your task
Write \`cry(word)\` that **returns** the word in CAPS with a \`"!"\` on the end.
Example: \`cry("charge")\` → \`"CHARGE!"\``,
      starterCode: `function cry(word) {
  // Return the word in CAPS followed by "!"
}
`,
      solution: `function cry(word) {
  return word.toUpperCase() + "!";
}`,
      tests: [
        { name: 'cry("charge") === "CHARGE!"', code: `assertEquals(cry("charge"), "CHARGE!");` },
        { name: 'cry("attack") === "ATTACK!"', code: `assertEquals(cry("attack"), "ATTACK!");` },
        { name: 'cry("go") === "GO!"', code: `assertEquals(cry("go"), "GO!");` },
      ],
      hints: [
        "Make it loud with `word.toUpperCase()`. 🔊",
        'Then glue the `"!"` on the end with `+`: `word.toUpperCase() + "!"`.',
      ],
      explanation:
        "FOR GLORY! 📣 `.toUpperCase()` shouts the word and `+ \"!\"` adds the punch. Your whole party heard that one.",
    },
    {
      slug: "treasure-total",
      title: "Treasure Total 💎",
      blurb: "Tally your loot — gems are worth way more than coins!",
      xp: 30,
      content: `# Treasure Total 💎

You cracked open the treasure chest! 🪙💎 Coins are worth **1** each, but each
shiny gem is worth **10**. Let's total up the loot.

You can mix multiplication and addition in one line:

\`\`\`js
function shopBill(apples, swords) {
  return apples + swords * 50; // swords cost 50 each
}
\`\`\`

Math does the \`*\` before the \`+\`, just like in school. 🧮

## Your task
Write \`loot(coins, gems)\` that **returns** the total value, where each gem is
worth 10 (\`coins + gems * 10\`).`,
      starterCode: `function loot(coins, gems) {
  // Return total treasure: coins plus 10 per gem
}
`,
      solution: `function loot(coins, gems) {
  return coins + gems * 10;
}`,
      tests: [
        { name: "loot(5, 2) === 25", code: `assertEquals(loot(5, 2), 25);` },
        { name: "loot(0, 3) === 30", code: `assertEquals(loot(0, 3), 30);` },
        { name: "loot(100, 0) === 100", code: `assertEquals(loot(100, 0), 100);` },
        { name: "loot(7, 1) === 17", code: `assertEquals(loot(7, 1), 17);` },
      ],
      hints: [
        "Each gem is worth 10, so multiply: `gems * 10`. 💎",
        "Then add your coins on top: `coins + gems * 10`.",
      ],
      explanation:
        "JACKPOT! 💰 `gems * 10` is calculated first, then your coins are added on — so your loot total is always spot on.",
    },
  ],
};
