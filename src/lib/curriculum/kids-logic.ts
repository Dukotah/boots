import type { Module } from "./types";

// Coding Level 1: First Steps — the gentlest possible on-ramp, designed for
// ages 9–13 (and total-beginner teachers) to use in a classroom. Concept order
// follows CS-education best practice: read code → values → variables → simple
// math → true/false → if/else. Every code task is tiny (often "change one
// thing"), heavily scaffolded with drag-in `blocks` and step-by-step `hintCode`,
// and interleaved with no-typing "predict the output" quizzes so learners read
// code before they write it. There are NO loops to write here — learners only
// *read* one at the very end; writing loops waits for Level 2. This keeps the
// cognitive load low so nobody bounces off lesson one.
export const kidsLogic: Module = {
  slug: "kids-logic",
  title: "Coding Level 1: First Steps 🌱",
  emoji: "🌱",
  gradient: "from-yellow-400/20 to-pink-500/10",
  description:
    "Your very first steps in real code! 🌱 Read tiny programs, store values in boxes, do a little math, and teach the computer to make a choice — one small, friendly step at a time.",
  tagline:
    "The gentlest first coding course for ages 9–13 (and total beginners): read code, use variables, compare numbers, and make choices — in real JavaScript, one tiny step at a time.",
  keywords: [
    "coding for kids",
    "coding for beginners",
    "coding for ages 9-13",
    "first coding course",
    "learn to code in school",
    "coding for classrooms",
  ],
  free: true,
  lessons: [
    // ── 1. What code is (no typing) ──
    {
      slug: "what-is-code",
      title: "What Is Code? 🌱",
      blurb: "Code is just a list of instructions a computer follows.",
      xp: 10,
      kind: "quiz",
      content: `# What Is Code? 🌱

Welcome! 👋 You're about to write your first real code. Don't worry — we'll go
one tiny step at a time, and you can't break anything.

**Code** is just a list of **instructions** that a computer follows. The computer
is super fast, but it isn't clever — it does *exactly* what you tell it, in the
*exact order* you tell it.

Think about making a peanut-butter sandwich:
1. Get the bread 🍞
2. Spread the peanut butter 🥜
3. Put the slices together

If you swap the order — put the slices together *before* the peanut butter — you
get a sad, empty sandwich. Computers are the same: **order matters**.

In this course you'll write little instructions like that, but for a computer.
Let's check you've got the big idea. 👇`,
      questions: [
        {
          prompt: "What is a computer program?",
          options: [
            "A list of step-by-step instructions a computer follows",
            "A photo of a computer",
            "A kind of video game controller",
          ],
          answer: 0,
          explanation:
            "A program is just instructions. You write the steps, and the computer follows them.",
        },
        {
          prompt: "A computer follows your instructions…",
          options: [
            "in any order it feels like",
            "exactly, and in the order you wrote them",
            "only on weekends",
          ],
          answer: 1,
          explanation:
            "Computers do exactly what you say, in order. That's why the order of your steps matters.",
        },
        {
          prompt: "If your instructions are in the wrong order, the program will probably…",
          options: ["fix itself", "do the wrong thing", "call you on the phone"],
          answer: 1,
          explanation:
            "Wrong order = wrong result, just like building a sandwich out of order. No worries — you can always reorder and try again!",
        },
      ],
    },

    // ── 2. Read code before writing it ──
    {
      slug: "read-the-code",
      title: "Read the Code 👀",
      blurb: "Before you write code, learn to read it.",
      xp: 10,
      kind: "quiz",
      content: `# Read the Code 👀

Coders read a *lot* of code. Let's practice reading a tiny bit before we write
any.

Here is a little machine called a **function**. You give it a name and, when you
call it, it **hands something back** with the word \`return\`:

\`\`\`js
function greet() {
  return "Hi there!";
}
\`\`\`

When we call \`greet()\`, it hands back the words \`"Hi there!"\`.

The words in "quotes" are called a **string** — that's just coder-speak for
*text*. 🧵

Read the code above, then answer below. 👇`,
      questions: [
        {
          prompt: "When we call `greet()`, what does it hand back?",
          options: ['The word "greet"', '"Hi there!"', "Nothing at all"],
          answer: 1,
          explanation:
            "`return` hands back whatever comes after it — here, the string \"Hi there!\".",
        },
        {
          prompt:
            'Here is another function:\n\n```js\nfunction pet() {\n  return "cat";\n}\n```\n\nWhat does `pet()` hand back?',
          options: ['"dog"', '"cat"', '"pet"'],
          answer: 1,
          explanation: "It returns whatever is after `return` — the string \"cat\".",
        },
        {
          prompt: "The word `return` means:",
          options: [
            "delete everything",
            "hand a value back out of the function",
            "repeat forever",
          ],
          answer: 1,
          explanation:
            "`return` is how a function gives an answer back to whoever called it.",
        },
      ],
    },

    // ── 3. First real edit: change one word ──
    {
      slug: "change-one-word",
      title: "Change One Word ✏️",
      blurb: "Your first edit — make the computer say your word.",
      xp: 15,
      content: `# Change One Word ✏️

Time to write your very first code! This is the smallest possible change: you'll
just type a word.

Below is a function called \`shout\`. Right now it hands back an **empty** string
\`""\` — nothing between the quotes. Your job: put **any word you like** between
the quotes.

\`\`\`js
return "PIZZA";   // hands back the word PIZZA
\`\`\`

## Your task
Make \`shout\` hand back any word that isn't empty. Go wild — your name, your
favorite food, anything! 🍕`,
      starterCode: `function shout() {
  // Put any word you like between the quotes!
  return "";
}
`,
      solution: `function shout() {
  return "PIZZA";
}`,
      tests: [
        {
          name: "shout() hands back a word",
          code: `assert(typeof shout() === "string" && shout().length > 0, "Put a word between the quotes so it isn't empty!");`,
        },
      ],
      hints: [
        'Type a word between the two quote marks, like `return "awesome";`.',
        "Empty quotes `\"\"` don't count — your word needs at least one letter!",
      ],
      hintCode: [`function shout() {\n  return "awesome";\n}\n`, undefined],
      explanation:
        "🎉 You did it — your first line of working code! The computer handed back exactly the word you typed.",
    },

    // ── 4. Concept: variables (no typing) ──
    {
      slug: "what-is-a-variable",
      title: "What's a Variable? 📦",
      blurb: "A variable is a labeled box that holds a value.",
      xp: 10,
      kind: "quiz",
      content: `# What's a Variable? 📦

A **variable** is a **labeled box** that holds a value so you can use it later.

We make a box with the word \`let\`, give it a name, and put something inside with
\`=\`:

\`\`\`js
let score = 10;   // a box named "score" holding 10
let name = "Sam"; // a box named "name" holding "Sam"
\`\`\`

Later, whenever you write \`score\`, the computer swaps in what's inside the box —
\`10\`.

You'll use boxes constantly: a score, a number of lives, a player's name… all of
them live in variables. 📦`,
      questions: [
        {
          prompt: "A variable is like:",
          options: ["a labeled box that holds a value", "a kind of monster", "a website"],
          answer: 0,
          explanation: "Exactly — a named box you can put a value into and read back later.",
        },
        {
          prompt: "After `let lives = 3;`, what is inside the box named `lives`?",
          options: ['the word "lives"', "3", 'the word "let"'],
          answer: 1,
          explanation: "`= 3` puts the number 3 into the box named lives.",
        },
        {
          prompt: "The word `let` is used to:",
          options: ["make a new variable box", "end the program", "shout loudly"],
          answer: 0,
          explanation: "`let` creates a new variable (a new box) for you to use.",
        },
      ],
    },

    // ── 5. Set a variable ──
    {
      slug: "make-a-box",
      title: "Make a Box 📦",
      blurb: "Put your own value into a variable.",
      xp: 15,
      content: `# Make a Box 📦

Now you make a box and put a value in it.

Below, the box \`age\` starts at \`0\`. Change the \`0\` to **how old you are** (any
number bigger than 0).

\`\`\`js
let age = 11;   // a box holding the number 11
\`\`\`

## Your task
Set \`age\` to your age (a number bigger than 0). The function hands the box back
for you.`,
      starterCode: `function myAge() {
  let age = 0; // change 0 to how old you are
  return age;
}
`,
      solution: `function myAge() {
  let age = 10;
  return age;
}`,
      tests: [
        {
          name: "age is set to a number bigger than 0",
          code: `assert(typeof myAge() === "number" && myAge() > 0, "Change 0 to your age — a number bigger than 0!");`,
        },
      ],
      hints: [
        "Replace the `0` with a number, like `let age = 11;`.",
        "Any number bigger than 0 works — it's the box that matters!",
      ],
      hintCode: [`function myAge() {\n  let age = 11;\n  return age;\n}\n`, undefined],
      explanation:
        "📦 Nice! You made a box, put a value inside, and handed it back. That's the heart of every program.",
    },

    // ── 6. Add two variables ──
    {
      slug: "add-them-up",
      title: "Add Them Up ➕",
      blurb: "Use + to add two boxes together.",
      xp: 20,
      content: `# Add Them Up ➕

Computers are great at math. You can add two numbers (or two boxes) with the
\`+\` sign:

\`\`\`js
let a = 2;
let b = 3;
a + b;   // 5
\`\`\`

Below you have a box of \`cookies\` and a box of \`candies\`. Right now the function
only hands back the cookies. Add the candies too!

## Your task
Make \`snackTotal\` hand back \`cookies + candies\` (that's \`2 + 3 = 5\`).`,
      starterCode: `function snackTotal() {
  let cookies = 2;
  let candies = 3;
  return cookies; // add candies too!
}
`,
      blocks: ["return ", "cookies", " + ", "candies", ";"],
      solution: `function snackTotal() {
  let cookies = 2;
  let candies = 3;
  return cookies + candies;
}`,
      tests: [
        { name: "snackTotal() is 5", code: `assertEquals(snackTotal(), 5);` },
      ],
      hints: [
        "Glue the two boxes together with `+`: `cookies + candies`.",
        "Drag the blocks in order, or type `return cookies + candies;`.",
      ],
      hintCode: [
        `function snackTotal() {\n  let cookies = 2;\n  let candies = 3;\n  return cookies + candies;\n}\n`,
        undefined,
      ],
      explanation:
        "➕ Yum! `cookies + candies` adds the two boxes and hands back the total: 5 snacks.",
    },

    // ── 7. Concept: true/false ──
    {
      slug: "true-or-false",
      title: "True or False? ✅",
      blurb: "Computers compare things and answer true or false.",
      xp: 10,
      kind: "quiz",
      content: `# True or False? ✅

Computers can **compare** two numbers and answer with **true** or **false**.
A true/false value even has a special name: a **boolean**.

Here are the comparing tools:

- \`>\` means **greater than** (bigger)
- \`<\` means **less than** (smaller)
- \`===\` means **exactly equal**

\`\`\`js
5 > 3     // true  (5 is bigger than 3)
2 > 10    // false (2 is not bigger than 10)
4 === 4   // true  (4 is exactly 4)
\`\`\`

Try reading each one in the quiz below. 👇`,
      questions: [
        {
          prompt: "Is `5 > 3` true or false?",
          options: ["true", "false"],
          answer: 0,
          explanation: "5 really is bigger than 3, so it's true.",
        },
        {
          prompt: "Is `2 > 10` true or false?",
          options: ["true", "false"],
          answer: 1,
          explanation: "2 is NOT bigger than 10, so it's false.",
        },
        {
          prompt: "`===` checks if two things are:",
          options: ["exactly equal", "totally different", "both even"],
          answer: 0,
          explanation: "`===` is the 'exactly equal?' check.",
        },
        {
          prompt: "Is `4 === 4` true or false?",
          options: ["true", "false"],
          answer: 0,
          explanation: "4 is exactly equal to 4 — true!",
        },
      ],
    },

    // ── 8. Return a boolean (first parameter) ──
    {
      slug: "is-it-big",
      title: "Is It Big? 🔍",
      blurb: "Hand a number in, get back true or false.",
      xp: 20,
      content: `# Is It Big? 🔍

So far our functions worked with the same numbers every time. Now we'll let the
function take a number **in**. The \`n\` inside the parentheses is the number we
hand it — it could be anything!

\`\`\`js
function isTiny(n) {
  return n < 5;   // true when n is smaller than 5
}
isTiny(2);  // true
isTiny(9);  // false
\`\`\`

The comparison \`n < 5\` already gives back true or false, so we just \`return\` it.

## Your task
Write \`isBig(n)\` that hands back \`true\` when \`n\` is **bigger than 100**, and
\`false\` otherwise.`,
      starterCode: `function isBig(n) {
  return false; // change this: is n bigger than 100?
}
`,
      blocks: ["return ", "n", " > ", "100", ";"],
      solution: `function isBig(n) {
  return n > 100;
}`,
      tests: [
        { name: "isBig(200) is true", code: `assertEquals(isBig(200), true);` },
        { name: "isBig(5) is false", code: `assertEquals(isBig(5), false);` },
        { name: "isBig(100) is false", code: `assertEquals(isBig(100), false);` },
      ],
      hints: [
        "Use `>` to compare: `n > 100`.",
        "`n > 100` is already true or false — just return it, no `if` needed!",
      ],
      hintCode: [`function isBig(n) {\n  return n > 100;\n}\n`, undefined],
      explanation:
        "🔍 Nice compare! `n > 100` checks the number you handed in and answers true or false all by itself.",
    },

    // ── 9. Concept: if / else ──
    {
      slug: "making-choices",
      title: "Making Choices 🔀",
      blurb: "How code picks between two paths.",
      xp: 10,
      kind: "quiz",
      content: `# Making Choices 🔀

Real programs make **decisions**. We use \`if\` and \`else\`:

> **If** something is true, do this. **Else** (otherwise), do that.

\`\`\`js
function weather(rainy) {
  if (rainy) {
    return "umbrella ☔";
  } else {
    return "sunglasses 😎";
  }
}
\`\`\`

If \`rainy\` is true, it returns the umbrella. Otherwise, it returns the
sunglasses. Read it carefully, then answer below. 👇`,
      questions: [
        {
          prompt: "What does `weather(true)` hand back?",
          options: ['"umbrella ☔"', '"sunglasses 😎"'],
          answer: 0,
          explanation: "rainy is true, so the `if` path runs — grab the umbrella!",
        },
        {
          prompt: "What does `weather(false)` hand back?",
          options: ['"umbrella ☔"', '"sunglasses 😎"'],
          answer: 1,
          explanation: "rainy is false, so the `else` path runs — sunglasses it is.",
        },
        {
          prompt: "`if / else` lets the computer:",
          options: ["pick between two paths", "count to ten", "delete your code"],
          answer: 0,
          explanation: "`if / else` is how code chooses what to do.",
        },
      ],
    },

    // ── 10. Write an if/else (max scaffold) ──
    {
      slug: "traffic-light",
      title: "Red Light, Green Light 🚦",
      blurb: "Write your first if/else: stop or go?",
      xp: 25,
      content: `# Red Light, Green Light 🚦

Now you write the choice yourself! A traffic light tells cars when to **go** and
when to **stop**.

You can drag the blocks in (in order) instead of typing from scratch, or tap the
hint to fill it in step by step.

\`\`\`js
if (color === "green") {
  return "go";
} else {
  return "stop";
}
\`\`\`

## Your task
Write \`light(color)\`. If \`color\` is exactly \`"green"\`, return \`"go"\`. Otherwise,
return \`"stop"\`.`,
      starterCode: `function light(color) {

}
`,
      blocks: [
        'if (color === "green") {',
        'return "go";',
        "} else {",
        'return "stop";',
        "}",
      ],
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
        'Check the color with `if (color === "green")`. The `===` means "is exactly".',
        'Everything that isn\'t green should `return "stop"` in the `else`.',
      ],
      hintCode: [
        `function light(color) {\n  if (color === "green") {\n    \n  }\n}\n`,
        `function light(color) {\n  if (color === "green") {\n    return "go";\n  } else {\n    return "stop";\n  }\n}\n`,
      ],
      explanation:
        "🚦 Green means go, everything else means stop! You just wrote an `if/else` — the way code chooses between two paths.",
    },

    // ── 11. Even/odd (a second if-free boolean, with %) ──
    {
      slug: "even-or-odd",
      title: "Even or Odd? 🍬",
      blurb: "Can you share the candy evenly with a friend?",
      xp: 25,
      content: `# Even or Odd? 🍬

If you can split your candy into two equal piles, the number is **even**. If one
piece is left over, it's **odd**.

The secret tool is \`%\` (say "remainder"). It tells you what's *left over* after
sharing:

\`\`\`js
6 % 2   // 0  → nothing left over → even!
7 % 2   // 1  → one left over → odd
\`\`\`

So \`n % 2 === 0\` is **true** when the number is even.

## Your task
Write \`isEven(n)\` that hands back \`true\` when \`n\` is even, and \`false\` when it's
odd.`,
      starterCode: `function isEven(n) {
  return false; // change this: is there nothing left over?
}
`,
      blocks: ["return ", "n", " % ", "2", " === ", "0", ";"],
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
      hintCode: [`function isEven(n) {\n  return n % 2 === 0;\n}\n`, undefined],
      explanation:
        "🍬 Sharing made easy! `n % 2 === 0` checks if there's nothing left over, which means the candy splits evenly. Even!",
    },

    // ── 12. Read a loop (preview of Level 2) ──
    {
      slug: "what-is-a-loop",
      title: "A Peek at Loops 🔁",
      blurb: "See how computers repeat things — you'll write these in Level 2.",
      xp: 15,
      kind: "quiz",
      content: `# A Peek at Loops 🔁

You've reached the last lesson of Level 1 — amazing work! 🌟 Here's a peek at
what's coming next.

Sometimes you want to do the same thing **many times**. Instead of copying a line
over and over, computers use a **loop**. This one builds up a laugh:

\`\`\`js
function laugh(times) {
  let sound = "";
  for (let i = 0; i < times; i++) {
    sound = sound + "ha";
  }
  return sound;
}
\`\`\`

\`laugh(3)\` adds "ha" three times and hands back \`"hahaha"\`.

You don't have to write this yet — just **read** it and get the idea. In
**Level 2: Mini Games**, you'll write your own loops, one step at a time. 👇`,
      questions: [
        {
          prompt: "What does `laugh(3)` hand back?",
          options: ['"ha"', '"hahaha"', '"hahahaha"'],
          answer: 1,
          explanation: 'It adds "ha" three times: ha + ha + ha = "hahaha".',
        },
        {
          prompt: "A loop is handy when you want to:",
          options: [
            "do something many times without writing it many times",
            "never repeat anything",
            "delete a variable",
          ],
          answer: 0,
          explanation: "That's the whole point of a loop — repeat without copy-pasting.",
        },
        {
          prompt: "What's next for you?",
          options: [
            "Level 2: Mini Games, where you write your own loops",
            "Nothing — coding is over",
            "Start again from the very beginning",
          ],
          answer: 0,
          explanation:
            "Onward to Level 2! You've got values, variables, math, true/false, and choices under your belt. 🎉",
        },
      ],
    },
  ],
};
