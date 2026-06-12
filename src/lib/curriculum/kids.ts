import type { Module } from "./types";

// Coding Level 2: Mini Games — the natural next step after Level 1 (kids-logic),
// for ages 9–13 and classroom use. Picks up the playful RPG framing but keeps the
// gentle, dialed-down difficulty: every code task is one small function, scaffolded
// with drag-in `blocks` and step-by-step `hintCode`, and concept quizzes ("read
// before you write") sit in front of each new idea. This is where learners write
// their FIRST loops — but only after a no-typing quiz explains them, and with the
// loop skeleton pre-filled so they add one line, not the whole thing.
export const kids: Module = {
  slug: "kids",
  title: "Coding Level 2: Mini Games 🎮",
  emoji: "🎮",
  gradient: "from-pink-400/20 to-purple-500/10",
  description:
    "Level up from Level 1! 🎮 Give your function inputs, keep score, brew potions, and write your very first loops — all by building the brains of tiny games in real JavaScript.",
  tagline:
    "The next gentle coding course for ages 9–13: functions with inputs, true/false, and your first loops — learned by building little game pieces, one tiny step at a time.",
  keywords: [
    "coding for kids",
    "coding for ages 9-13",
    "learn javascript for beginners",
    "fun coding course",
    "first loops for beginners",
  ],
  free: true,
  lessons: [
    // ── 1. Concept: parameters ──
    {
      slug: "functions-take-inputs",
      title: "Functions Take Inputs 🎁",
      blurb: "A function can be handed values to work with.",
      xp: 10,
      kind: "quiz",
      content: `# Functions Take Inputs 🎁

In Level 1 you met functions. Now the superpower: a function can be **handed
values** to work with. Those values go inside the parentheses, and we call them
**inputs** (the fancy word is *parameters*).

\`\`\`js
function addGold(gold, found) {
  return gold + found;
}
addGold(10, 5);  // 15
\`\`\`

Here \`gold\` and \`found\` are the inputs. When we call \`addGold(10, 5)\`, the
computer sets \`gold\` to \`10\` and \`found\` to \`5\`, then adds them. Read it, then
answer below. 👇`,
      questions: [
        {
          prompt: "Using the `addGold` function above, what does `addGold(10, 5)` hand back?",
          options: ['"15"', "15", '"gold"'],
          answer: 1,
          explanation: "gold is 10, found is 5, and 10 + 5 = 15.",
        },
        {
          prompt: "The values inside a function's parentheses, like `gold` and `found`, are called:",
          options: ["inputs (parameters)", "monsters", "loops"],
          answer: 0,
          explanation: "They're the inputs you hand the function to work with.",
        },
        {
          prompt: "What does `addGold(3, 4)` hand back?",
          options: ['"34"', "7", "12"],
          answer: 1,
          explanation: "3 + 4 = 7. (Joining text would give \"34\", but these are numbers, so they add.)",
        },
      ],
    },

    // ── 2. Add two inputs ──
    {
      slug: "score-points",
      title: "Score Points 🏆",
      blurb: "Add the points you just earned to your score.",
      xp: 15,
      content: `# Score Points 🏆

You stomped a goblin and earned some points! 🪙 Let's add them to your score.

This time the two numbers are **inputs** to your function — they could be
anything the game hands in:

\`\`\`js
function addGold(gold, found) {
  return gold + found;
}
\`\`\`

## Your task
Write \`addPoints(score, points)\` that hands back your new total
(\`score + points\`).`,
      starterCode: `function addPoints(score, points) {

}
`,
      blocks: ["return ", "score", " + ", "points", ";"],
      solution: `function addPoints(score, points) {
  return score + points;
}`,
      tests: [
        { name: "addPoints(10, 5) is 15", code: `assertEquals(addPoints(10, 5), 15);` },
        { name: "addPoints(0, 100) is 100", code: `assertEquals(addPoints(0, 100), 100);` },
        { name: "addPoints(42, 8) is 50", code: `assertEquals(addPoints(42, 8), 50);` },
      ],
      hints: [
        "Add the two inputs with `+`: `score + points`.",
        "Don't forget `return` — without it your function hands back nothing!",
      ],
      hintCode: [
        `function addPoints(score, points) {\n  return score + points;\n}\n`,
        undefined,
      ],
      explanation:
        "🎯 Nice combo! `return score + points` adds your fresh points onto your old score and hands back the grand total.",
    },

    // ── 3. Multiply ──
    {
      slug: "double-damage",
      title: "Double Damage ⚔️",
      blurb: "A critical hit deals double damage!",
      xp: 15,
      content: `# Double Damage ⚔️

CRITICAL HIT! 💥 When your sword glows, every hit does **double** damage.

Multiply numbers with the \`*\` symbol:

\`\`\`js
function triple(n) {
  return n * 3;
}
\`\`\`

## Your task
Write \`damage(hit)\` that hands back double the damage (\`hit * 2\`).`,
      starterCode: `function damage(hit) {

}
`,
      blocks: ["return ", "hit", " * ", "2", ";"],
      solution: `function damage(hit) {
  return hit * 2;
}`,
      tests: [
        { name: "damage(5) is 10", code: `assertEquals(damage(5), 10);` },
        { name: "damage(0) is 0", code: `assertEquals(damage(0), 0);` },
        { name: "damage(13) is 26", code: `assertEquals(damage(13), 26);` },
      ],
      hints: ["Use `*` to multiply: `hit * 2`.", "Send back twice the number with `return`."],
      hintCode: [`function damage(hit) {\n  return hit * 2;\n}\n`, undefined],
      explanation:
        "🗡️ CRIT! `hit * 2` doubles the incoming damage — that monster never stood a chance.",
    },

    // ── 4. Add one ──
    {
      slug: "level-up",
      title: "Level Up ⬆️",
      blurb: "Enough XP — bump your hero up a level!",
      xp: 15,
      content: `# Level Up ⬆️

DING! 🔔 You earned enough XP to **level up** — that means adding 1 to your
level.

Adding one is everywhere in games:

\`\`\`js
function nextRound(round) {
  return round + 1;
}
\`\`\`

## Your task
Write \`levelUp(level)\` that hands back the next level (\`level + 1\`).`,
      starterCode: `function levelUp(level) {

}
`,
      blocks: ["return ", "level", " + ", "1", ";"],
      solution: `function levelUp(level) {
  return level + 1;
}`,
      tests: [
        { name: "levelUp(1) is 2", code: `assertEquals(levelUp(1), 2);` },
        { name: "levelUp(0) is 1", code: `assertEquals(levelUp(0), 1);` },
        { name: "levelUp(99) is 100", code: `assertEquals(levelUp(99), 100);` },
      ],
      hints: ["Just add 1: `level + 1`.", "Return the result so your hero actually levels up!"],
      hintCode: [`function levelUp(level) {\n  return level + 1;\n}\n`, undefined],
      explanation:
        "✨ LEVEL UP! `level + 1` pushes your hero one step higher. New skills await!",
    },

    // ── 5. Concept: booleans in games ──
    {
      slug: "win-or-lose",
      title: "Win or Lose? 🎯",
      blurb: "A quick recap of true/false, game-style.",
      xp: 10,
      kind: "quiz",
      content: `# Win or Lose? 🎯

Games are full of true/false questions: *Did I win? Is my health zero? Did I
beat the high score?* Remember, a true/false value is called a **boolean**.

One new tool: \`>=\` means **greater than or equal to**. So \`score >= 100\` is true
when the score is 100 **or more**.

\`\`\`js
150 >= 100   // true
100 >= 100   // true  (equal counts!)
99 >= 100    // false
\`\`\`

Read those, then answer below. 👇`,
      questions: [
        {
          prompt: "When `score` is 150, is `score >= 100` true or false?",
          options: ["true", "false"],
          answer: 0,
          explanation: "150 is more than 100, so it's true.",
        },
        {
          prompt: "`>=` means:",
          options: ["greater than or equal to", "much greater than", "exactly equal only"],
          answer: 0,
          explanation: "`>=` is true when the left side is bigger OR exactly equal.",
        },
        {
          prompt: "When `score` is exactly 100, is `score >= 100`…",
          options: ["true", "false"],
          answer: 0,
          explanation: "The 'or equal to' part means 100 counts — true!",
        },
      ],
    },

    // ── 6. Return a boolean with >= ──
    {
      slug: "is-it-a-win",
      title: "Is It a Win? 🥇",
      blurb: "Score 100 or more and you win the round.",
      xp: 20,
      content: `# Is It a Win? 🥇

You win the round if your score is **100 or more**. 🎉

The comparison \`score >= 100\` already gives back true or false, so you can
\`return\` it straight away — no \`if\` needed.

## Your task
Write \`isWin(score)\` that hands back \`true\` if \`score\` is 100 or more, else
\`false\`.`,
      starterCode: `function isWin(score) {

}
`,
      blocks: ["return ", "score", " >= ", "100", ";"],
      solution: `function isWin(score) {
  return score >= 100;
}`,
      tests: [
        { name: "isWin(150) is true", code: `assertEquals(isWin(150), true);` },
        { name: "isWin(100) is true", code: `assertEquals(isWin(100), true);` },
        { name: "isWin(99) is false", code: `assertEquals(isWin(99), false);` },
        { name: "isWin(0) is false", code: `assertEquals(isWin(0), false);` },
      ],
      hints: [
        "Use `>=`: `score >= 100`. It already gives back true or false!",
        "Exactly 100 still counts as a win, so use `>=`, not `>`.",
      ],
      hintCode: [`function isWin(score) {\n  return score >= 100;\n}\n`, undefined],
      explanation:
        "🏅 VICTORY! `score >= 100` is already a true/false answer, so you return it straight up.",
    },

    // ── 7. Array length ──
    {
      slug: "potion-count",
      title: "Count Your Potions 🧪",
      blurb: "Count the potions in your bag.",
      xp: 20,
      content: `# Count Your Potions 🧪

How many potions are in your bag? 🎒 In code, a bag of stuff is a **list** (its
real name is an **array**) — items inside square brackets:

\`\`\`js
const monsters = ["slime", "bat", "ghost"];
monsters.length;   // 3
\`\`\`

Every array knows its own size with \`.length\`.

## Your task
Write \`potions(list)\` that hands back how many items are in the array
(\`list.length\`).`,
      starterCode: `function potions(list) {

}
`,
      blocks: ["return ", "list", ".length", ";"],
      solution: `function potions(list) {
  return list.length;
}`,
      tests: [
        {
          name: 'potions(["red","blue"]) is 2',
          code: `assertEquals(potions(["red", "blue"]), 2);`,
        },
        { name: "potions([]) is 0", code: `assertEquals(potions([]), 0);` },
        {
          name: "potions of 4 items is 4",
          code: `assertEquals(potions(["a", "b", "c", "d"]), 4);`,
        },
      ],
      hints: [
        "Arrays have a built-in counter: `list.length`.",
        "An empty bag `[]` has a length of 0 — that works automatically!",
      ],
      hintCode: [`function potions(list) {\n  return list.length;\n}\n`, undefined],
      explanation:
        "🎒 Inventory checked! `list.length` instantly counts everything in the array, even when the bag is empty.",
    },

    // ── 8. String methods ──
    {
      slug: "battle-cry",
      title: "Battle Cry 📣",
      blurb: "Shout your word in ALL CAPS with a bang!",
      xp: 25,
      content: `# Battle Cry 📣

CHARGE! ⚔️ A battle cry must be LOUD. We'll turn a word into all capitals and add
an exclamation mark.

Strings have a \`.toUpperCase()\` move, and \`+\` glues text together:

\`\`\`js
"boo".toUpperCase();   // "BOO"
"boo" + "!";           // "boo!"
\`\`\`

## Your task
Write \`cry(word)\` that hands back the word in CAPS with a \`"!"\` on the end. So
\`cry("charge")\` → \`"CHARGE!"\`.`,
      starterCode: `function cry(word) {

}
`,
      blocks: ["return ", "word", ".toUpperCase()", " + ", '"!"', ";"],
      solution: `function cry(word) {
  return word.toUpperCase() + "!";
}`,
      tests: [
        { name: 'cry("charge") is "CHARGE!"', code: `assertEquals(cry("charge"), "CHARGE!");` },
        { name: 'cry("attack") is "ATTACK!"', code: `assertEquals(cry("attack"), "ATTACK!");` },
        { name: 'cry("go") is "GO!"', code: `assertEquals(cry("go"), "GO!");` },
      ],
      hints: [
        "Make it loud with `word.toUpperCase()`.",
        'Then glue the `"!"` on the end with `+`: `word.toUpperCase() + "!"`.',
      ],
      hintCode: [`function cry(word) {\n  return word.toUpperCase() + "!";\n}\n`, undefined],
      explanation:
        '📣 FOR GLORY! `.toUpperCase()` shouts the word and `+ "!"` adds the punch. Your whole party heard that one.',
    },

    // ── 9. Mixed math (order of operations) ──
    {
      slug: "treasure-total",
      title: "Treasure Total 💎",
      blurb: "Tally your loot — gems are worth way more than coins!",
      xp: 25,
      content: `# Treasure Total 💎

You cracked open the treasure chest! 🪙💎 Coins are worth **1** each, but each
shiny gem is worth **10**. Let's total up the loot.

You can mix \`*\` and \`+\` in one line. Just like in math class, the \`*\` happens
before the \`+\`:

\`\`\`js
coins + gems * 10
\`\`\`

## Your task
Write \`loot(coins, gems)\` that hands back the total value, where each gem is
worth 10 (\`coins + gems * 10\`).`,
      starterCode: `function loot(coins, gems) {

}
`,
      blocks: ["return ", "coins", " + ", "gems", " * ", "10", ";"],
      solution: `function loot(coins, gems) {
  return coins + gems * 10;
}`,
      tests: [
        { name: "loot(5, 2) is 25", code: `assertEquals(loot(5, 2), 25);` },
        { name: "loot(0, 3) is 30", code: `assertEquals(loot(0, 3), 30);` },
        { name: "loot(100, 0) is 100", code: `assertEquals(loot(100, 0), 100);` },
        { name: "loot(7, 1) is 17", code: `assertEquals(loot(7, 1), 17);` },
      ],
      hints: [
        "Each gem is worth 10, so multiply: `gems * 10`.",
        "Then add your coins on top: `coins + gems * 10`.",
      ],
      hintCode: [`function loot(coins, gems) {\n  return coins + gems * 10;\n}\n`, undefined],
      explanation:
        "💰 JACKPOT! `gems * 10` is calculated first, then your coins are added on — so your loot total is always spot on.",
    },

    // ── 10. Concept: loops ──
    {
      slug: "loops-do-it-again",
      title: "Loops: Do It Again 🔁",
      blurb: "Meet the loop — the way code repeats things.",
      xp: 10,
      kind: "quiz",
      content: `# Loops: Do It Again 🔁

Time for a big one: the **loop**. A loop repeats an action as many times as you
want, without copy-pasting.

Here's the shape we'll use. Read each part:

\`\`\`js
function laugh(times) {
  let sound = "";                          // start empty
  for (let i = 0; i < times; i++) {        // repeat "times" times
    sound = sound + "ha";                  // add "ha" each time
  }
  return sound;                            // hand back the result
}
\`\`\`

- \`let i = 0\` — start counting at 0
- \`i < times\` — keep going while we haven't done enough
- \`i++\` — add 1 to the count each time around

\`laugh(2)\` adds "ha" twice → \`"haha"\`. You'll write loops like this in the next
two lessons — don't worry, the loop will be set up for you. 👇`,
      questions: [
        {
          prompt: "A loop lets you repeat an action:",
          options: ["many times without copying it", "only once, ever", "never"],
          answer: 0,
          explanation: "Repeating without copy-paste is exactly what loops are for.",
        },
        {
          prompt: "Using the `laugh` loop above, what does `laugh(2)` hand back?",
          options: ['"ha"', '"haha"', '"hahaha"'],
          answer: 1,
          explanation: 'It adds "ha" two times: ha + ha = "haha".',
        },
        {
          prompt: "Inside the loop, what does `i++` do?",
          options: ["adds 1 to the count each time", "deletes i", "stops the loop"],
          answer: 0,
          explanation: "`i++` bumps the counter up by 1 each time around the loop.",
        },
      ],
    },

    // ── 11. Write a loop (skeleton pre-filled) ──
    {
      slug: "repeat-jump",
      title: "Jump, Jump, Jump! 🦘",
      blurb: "Write your first loop — the setup is done for you.",
      xp: 30,
      content: `# Jump, Jump, Jump! 🦘

Your first loop! Good news: the tricky parts are already written. The \`moves\`
box and the \`return\` are there. You just add the loop in the middle.

\`\`\`js
for (let i = 0; i < n; i++) {
  moves = moves + "jump ";
}
\`\`\`

Drag the blocks in, or tap the hint to fill it in step by step.

## Your task
Write \`jumps(n)\` so it hands back \`"jump "\` repeated \`n\` times. So \`jumps(2)\` →
\`"jump jump "\` (note the space after each).`,
      starterCode: `function jumps(n) {
  let moves = "";

  return moves;
}
`,
      blocks: ["for (let i = 0; i < n; i++) {", 'moves = moves + "jump ";', "}"],
      solution: `function jumps(n) {
  let moves = "";
  for (let i = 0; i < n; i++) {
    moves = moves + "jump ";
  }
  return moves;
}`,
      tests: [
        { name: 'jumps(2) is "jump jump "', code: `assertEquals(jumps(2), "jump jump ");` },
        { name: 'jumps(1) is "jump "', code: `assertEquals(jumps(1), "jump ");` },
        { name: 'jumps(0) is ""', code: `assertEquals(jumps(0), "");` },
      ],
      hints: [
        "The loop runs `n` times: `for (let i = 0; i < n; i++)`.",
        'Each time around, add to the word: `moves = moves + "jump ";`.',
      ],
      hintCode: [
        `function jumps(n) {\n  let moves = "";\n  for (let i = 0; i < n; i++) {\n    \n  }\n  return moves;\n}\n`,
        `function jumps(n) {\n  let moves = "";\n  for (let i = 0; i < n; i++) {\n    moves = moves + "jump ";\n  }\n  return moves;\n}\n`,
      ],
      explanation:
        '🦘 Boing! The loop added `"jump "` again and again until it ran `n` times. That\'s how computers repeat things super fast!',
    },

    // ── 12. Write a loop that counts and adds ──
    {
      slug: "count-up",
      title: "Count to a Number 🔢",
      blurb: "Add up all the numbers from 1 up to your number.",
      xp: 30,
      content: `# Count to a Number 🔢

One more loop! This time the loop **counts and adds** as it goes. The \`total\`
box and the \`return\` are set up for you — just add the loop.

\`\`\`js
for (let i = 1; i <= n; i++) {
  total = total + i;
}
\`\`\`

## Your task
Write \`addUpTo(n)\` that hands back the sum of all numbers from 1 to \`n\`. So
\`addUpTo(4)\` is \`1 + 2 + 3 + 4 = 10\`.`,
      starterCode: `function addUpTo(n) {
  let total = 0;

  return total;
}
`,
      blocks: ["for (let i = 1; i <= n; i++) {", "total = total + i;", "}"],
      solution: `function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total;
}`,
      tests: [
        { name: "addUpTo(4) is 10", code: `assertEquals(addUpTo(4), 10);` },
        { name: "addUpTo(1) is 1", code: `assertEquals(addUpTo(1), 1);` },
        { name: "addUpTo(5) is 15", code: `assertEquals(addUpTo(5), 15);` },
      ],
      hints: [
        "Start the loop at 1 and keep going while `i <= n`.",
        "Add each `i` onto `total`: `total = total + i;`.",
      ],
      hintCode: [
        `function addUpTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    \n  }\n  return total;\n}\n`,
        `function addUpTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total = total + i;\n  }\n  return total;\n}\n`,
      ],
      explanation:
        "🔢 Awesome counting! The loop visited every number from 1 to `n` and kept a running `total`. You've finished Level 2 — on to building real games! 🎉",
    },
  ],
};
