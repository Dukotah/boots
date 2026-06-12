import type { Module } from "./types";

export const beginner: Module = {
  slug: "beginner",
  title: "Programming for Complete Beginners",
  description:
    "Never written code before? Start here — every step is tiny, gentle, and explained in plain English. You'll write your very first real, working code today, and we'll cheer you on the whole way.",
  emoji: "🌱",
  gradient: "from-green-400/20 to-emerald-500/10",
  tagline:
    "Learn to code from absolute zero — a beginner-friendly, jargon-free first course in your browser.",
  keywords: [
    "learn to code for beginners",
    "programming for beginners",
    "coding for complete beginners",
    "how to start coding",
  ],
  lessons: [
    // ── 1. Read code before writing it (no typing) ──
    {
      slug: "read-before-you-write",
      title: "Read Before You Write 👀",
      blurb: "Predict what a tiny program gives back — no typing yet.",
      xp: 10,
      kind: "quiz",
      content: `# Read Before You Write 👀

Welcome! 👋 You're about to learn to code. Take a breath — we'll go one tiny step
at a time, and you genuinely can't break anything. 🌱

Before you write any code, let's *read* a little. Coders read way more than they
write, so this is the perfect first skill.

Here's the big idea: a program can take a **value** — a number, or some text — and
**hand a value back** to you. The word that hands something back is \`return\`.

Look at this tiny example. It always hands back the number 7:

\`\`\`js
function lucky() {
  return 7;
}
\`\`\`

When we "run" it by writing \`lucky()\`, it hands back \`7\`. That's it!

The text in "quotes" is called a **string** — that's just coder-speak for *words*. 🧵

Read the examples in each question, then pick what gets handed back. You've got
this. 👇`,
      questions: [
        {
          prompt:
            "Look at this:\n\n```js\nfunction lucky() {\n  return 7;\n}\n```\n\nWhen we run `lucky()`, what does it hand back?",
          options: ["The number 7", 'The word "lucky"', "Nothing at all"],
          answer: 0,
          explanation:
            "`return 7` hands back the number 7. Whatever comes after `return` is the value you get.",
        },
        {
          prompt:
            'Here is another one:\n\n```js\nfunction pet() {\n  return "cat";\n}\n```\n\nWhat does `pet()` hand back?',
          options: ['"dog"', '"cat"', '"pet"'],
          answer: 1,
          explanation:
            'It hands back whatever follows `return` — the string "cat".',
        },
        {
          prompt: "The word `return` means:",
          options: [
            "delete everything",
            "hand a value back out",
            "repeat forever",
          ],
          answer: 1,
          explanation:
            "`return` is how your code gives an answer back to whoever asked for it.",
        },
      ],
    },

    // ── 2. First function: return a value ──
    {
      slug: "first-function",
      title: "Your First Function",
      blurb: "Make a little machine that hands back a value.",
      xp: 15,
      content: `# Your First Function

You just *read* code — now you'll write it. This is going to be fun. 🌱

Here's the heart of it: a value you can **name** and **hand back**. You wrap that
up in a little machine called a **function**. You give the machine a name, and
when someone runs it, it hands a value back to them. Handing a value back is
called **returning**.

Here's that same tiny machine that always returns the number 7:

\`\`\`js
function lucky() {
  return 7;
}
\`\`\`

Read it slowly:
- \`function\` says "I'm building a machine."
- \`lucky\` is the machine's name.
- \`return 7\` means "hand back the value 7."

## Your task
Write a function called \`answer\` that returns the number \`42\`.
(Just fill in what's inside the machine — don't worry about the rest yet.)`,
      starterCode: `function answer() {

}
`,
      blocks: ["return ", "42", ";"],
      solution: `function answer() {
  return 42;
}`,
      tests: [
        {
          name: "answer() gives back 42",
          code: `assertEquals(answer(), 42);`,
        },
      ],
      hints: [
        "Inside the curly braces { }, write the word `return` followed by the number.",
        "The whole line is just: `return 42;` — that's it!",
      ],
      hintCode: [
        `function answer() {
  return
}
`,
        `function answer() {
  return 42;
}
`,
      ],
      explanation: `You did it! \`return 42\` tells the machine to hand back the value 42, so calling \`answer()\` gives you \`42\`. That's the heart of every function: it returns a value.`,
    },
    {
      slug: "using-an-input",
      title: "Using an Input",
      blurb: "Let your machine take something in and use it.",
      xp: 18,
      content: `# Using an Input

Last time your machine always gave the same answer. Now let's let it accept
something from the outside — an **input**.

The input goes in the parentheses \`( )\`. We give it a name so we can talk about it.
Here a machine takes a \`name\` and builds a hello message:

\`\`\`js
function hello(name) {
  return "Hello, " + name;
}
\`\`\`

The little \`+\` glues two pieces of text together. So \`hello("Sam")\` returns
\`"Hello, Sam"\`. Notice the space after the comma inside the quotes — that keeps
the words from squishing together. 🙂

## Your task
Write a function \`greet\` that takes \`name\` and returns \`"Hi, "\` followed by the name.
So \`greet("Ada")\` should give back \`"Hi, Ada"\`.`,
      starterCode: `function greet(name) {

}
`,
      blocks: ["return ", '"Hi, "', " + ", "name", ";"],
      solution: `function greet(name) {
  return "Hi, " + name;
}`,
      tests: [
        {
          name: 'greet("Ada") gives "Hi, Ada"',
          code: `assertEquals(greet("Ada"), "Hi, Ada");`,
        },
        {
          name: 'greet("Sam") gives "Hi, Sam"',
          code: `assertEquals(greet("Sam"), "Hi, Sam");`,
        },
      ],
      hints: [
        'Start with `return "Hi, "` and remember the comma and space inside the quotes.',
        'Then glue the name on with a plus sign: `return "Hi, " + name;`',
      ],
      hintCode: [
        `function greet(name) {
  return "Hi, "
}
`,
        `function greet(name) {
  return "Hi, " + name;
}
`,
      ],
      explanation: `Nice work! The word in the parentheses (\`name\`) is a placeholder for whatever someone passes in. \`"Hi, " + name\` glues your greeting to that name and returns the result.`,
    },
    {
      slug: "simple-math",
      title: "A Little Math",
      blurb: "Add one to a number and give it back.",
      xp: 18,
      content: `# A Little Math

Computers are great at math. You can use \`+\` to add, just like on a calculator.

Here's a machine that doubles a number:

\`\`\`js
function double(n) {
  return n + n;
}
\`\`\`

The letter \`n\` is just the name we chose for the number that comes in. You can do
math with it, then return the result.

## Your task
Write a function \`addOne\` that takes a number \`n\` and returns that number plus one.
So \`addOne(5)\` should give back \`6\`.`,
      starterCode: `function addOne(n) {

}
`,
      blocks: ["return ", "n", " + ", "1", ";"],
      solution: `function addOne(n) {
  return n + 1;
}`,
      tests: [
        { name: "addOne(5) gives 6", code: `assertEquals(addOne(5), 6);` },
        { name: "addOne(0) gives 1", code: `assertEquals(addOne(0), 1);` },
        {
          name: "addOne(99) gives 100",
          code: `assertEquals(addOne(99), 100);`,
        },
      ],
      hints: [
        "You want the number that came in, plus one more.",
        "Write it as: `return n + 1;`",
      ],
      hintCode: [
        `function addOne(n) {
  return n
}
`,
        `function addOne(n) {
  return n + 1;
}
`,
      ],
      explanation: `Lovely. \`n + 1\` takes whatever number arrived and adds one, and \`return\` hands the new number back. Math in code reads just like math on paper.`,
    },
    {
      slug: "two-inputs",
      title: "Two Inputs",
      blurb: "Take two numbers and add them together.",
      xp: 20,
      content: `# Two Inputs

A machine can take more than one input. Just list them inside the parentheses,
separated by a comma.

Here a machine takes two numbers and multiplies them:

\`\`\`js
function times(a, b) {
  return a * b;
}
\`\`\`

The \`*\` symbol means multiply. So \`times(3, 4)\` returns \`12\`. We named the two
inputs \`a\` and \`b\`, but you could name them anything.

## Your task
Write a function \`add\` that takes two numbers, \`a\` and \`b\`, and returns their sum.
So \`add(2, 3)\` should give back \`5\`.`,
      starterCode: `function add(a, b) {

}
`,
      blocks: ["return ", "a", " + ", "b", ";"],
      solution: `function add(a, b) {
  return a + b;
}`,
      tests: [
        { name: "add(2, 3) gives 5", code: `assertEquals(add(2, 3), 5);` },
        { name: "add(0, 0) gives 0", code: `assertEquals(add(0, 0), 0);` },
        {
          name: "add(10, 25) gives 35",
          code: `assertEquals(add(10, 25), 35);`,
        },
      ],
      hints: [
        "Both numbers arrive with the names `a` and `b`.",
        "Add them and return the result: `return a + b;`",
      ],
      hintCode: [
        `function add(a, b) {
  return a
}
`,
        `function add(a, b) {
  return a + b;
}
`,
      ],
      explanation: `Great job! With two inputs you just separate them by a comma. \`a + b\` adds the two numbers that came in, and \`return\` gives the total back.`,
    },
    {
      slug: "shout",
      title: "Working with Text",
      blurb: "Turn a word into LOUD capital letters.",
      xp: 20,
      content: `# Working with Text

Text in code is called a **string** — it's just letters wrapped in quotes, like
\`"hello"\`. Strings come with handy built-in tricks you can use by adding a dot \`.\`
and the trick's name.

One trick is \`.toUpperCase()\`, which makes every letter a capital:

\`\`\`js
function loud(word) {
  return word.toUpperCase();
}
\`\`\`

So \`loud("hi")\` returns \`"HI"\`. Don't forget the empty parentheses \`()\` after the
trick's name — that's how you tell it to actually run.

## Your task
Write a function \`shout\` that takes a \`word\` and returns it in ALL CAPITAL letters.
So \`shout("hello")\` should give back \`"HELLO"\`.`,
      starterCode: `function shout(word) {

}
`,
      blocks: ["return ", "word", ".toUpperCase()", ";"],
      solution: `function shout(word) {
  return word.toUpperCase();
}`,
      tests: [
        {
          name: 'shout("hello") gives "HELLO"',
          code: `assertEquals(shout("hello"), "HELLO");`,
        },
        {
          name: 'shout("yay") gives "YAY"',
          code: `assertEquals(shout("yay"), "YAY");`,
        },
      ],
      hints: [
        "Add a dot after the word, then the trick name: `word.toUpperCase`",
        "Don't forget the empty `()` at the end, and `return` the result: `return word.toUpperCase();`",
      ],
      hintCode: [
        `function shout(word) {
  return word.toUpperCase
}
`,
        `function shout(word) {
  return word.toUpperCase();
}
`,
      ],
      explanation: `Wonderful — that was your first built-in string trick! \`.toUpperCase()\` makes a capital-letter copy of the text, and you returned it. Strings have lots more helpers like this waiting for you.`,
    },
    {
      slug: "making-a-choice",
      title: "Making a Choice",
      blurb: "Let your code decide between yes and no.",
      xp: 25,
      content: `# Making a Choice

Sometimes code needs to decide. We use \`if\` and \`else\` for that — like a fork in
the road. The word \`true\` means yes, and \`false\` means no. These yes/no values
are called **booleans**.

Here a machine checks if a number is positive:

\`\`\`js
function isPositive(n) {
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
\`\`\`

Read it as: "**if** \`n\` is greater than 0, return true; **else** (otherwise) return
false." The \`>\` symbol means "greater than."

## Your task
Write a function \`isBig\` that takes a number \`n\` and returns \`true\` if \`n\` is greater
than 10, and \`false\` otherwise. So \`isBig(20)\` is \`true\` and \`isBig(3)\` is \`false\`.`,
      starterCode: `function isBig(n) {

}
`,
      blocks: ["if (", "n > 10", ") {", "return true;", "} else {", "return false;", "}"],
      solution: `function isBig(n) {
  if (n > 10) {
    return true;
  } else {
    return false;
  }
}`,
      tests: [
        {
          name: "isBig(20) is true",
          code: `assertEquals(isBig(20), true);`,
        },
        {
          name: "isBig(3) is false",
          code: `assertEquals(isBig(3), false);`,
        },
        {
          name: "isBig(10) is false (not greater than 10)",
          code: `assertEquals(isBig(10), false);`,
        },
      ],
      hints: [
        "Start with `if (n > 10) {` then return true on the next line.",
        "Add an `else {` block that returns false. Note: 10 is NOT greater than 10, so it should be false.",
      ],
      hintCode: [
        `function isBig(n) {
  if (n > 10) {

  }
}
`,
        `function isBig(n) {
  if (n > 10) {
    return true;
  } else {
    return false;
  }
}
`,
      ],
      explanation: `You just taught your code to make a decision! \`if (n > 10)\` checks the condition: when it's true you return \`true\`, and the \`else\` covers every other case with \`false\`. This is how programs react to different situations.`,
    },
    {
      slug: "a-list",
      title: "A List of Things",
      blurb: "Grab the first item out of a list.",
      xp: 22,
      content: `# A List of Things

An **array** is just a list — several values lined up in square brackets \`[ ]\` and
separated by commas:

\`\`\`js
const pets = ["cat", "dog", "fish"];
\`\`\`

To pick one item, you use its position number in square brackets. Here's the
surprising part: counting starts at **0**, not 1. So \`pets[0]\` is \`"cat"\` (the
first one), \`pets[1]\` is \`"dog"\`, and so on. It feels odd at first — that's totally
normal!

\`\`\`js
function secondPet(list) {
  return list[1];
}
\`\`\`

## Your task
Write a function \`firstItem\` that takes a list and returns its **first** item.
So \`firstItem(["a", "b", "c"])\` should give back \`"a"\`.`,
      starterCode: `function firstItem(list) {

}
`,
      blocks: ["return ", "list", "[0]", ";"],
      solution: `function firstItem(list) {
  return list[0];
}`,
      tests: [
        {
          name: 'firstItem(["a","b","c"]) gives "a"',
          code: `assertEquals(firstItem(["a", "b", "c"]), "a");`,
        },
        {
          name: "firstItem([10, 20, 30]) gives 10",
          code: `assertEquals(firstItem([10, 20, 30]), 10);`,
        },
      ],
      hints: [
        "The first item lives at position 0, not 1.",
        "Use square brackets with the position: `return list[0];`",
      ],
      hintCode: [
        `function firstItem(list) {
  return list
}
`,
        `function firstItem(list) {
  return list[0];
}
`,
      ],
      explanation: `Perfect. Lists count from 0, so \`list[0]\` is the very first item, and you returned it. That "start at zero" rule shows up everywhere in programming — now it's no longer a mystery to you.`,
    },
    {
      slug: "putting-it-together",
      title: "Putting It All Together",
      blurb: "Build a tiny real-world rule for ticket prices.",
      xp: 28,
      content: `# Putting It All Together

You've learned inputs, math, choices, and more. Let's combine them in a tiny
real-world example — figuring out a ticket price based on age.

Imagine a rule: little kids get in free, everyone else pays. We can write that
with an \`if\`:

\`\`\`js
function entryFee(age) {
  if (age < 18) {
    return 0;
  } else {
    return 5;
  }
}
\`\`\`

The \`<\` symbol means "less than." So young visitors return 0, and everyone else
returns 5.

## Your task
Write a function \`ticketPrice\` that takes an \`age\` and returns the price:
- If the age is **less than 5**, the ticket is free — return \`0\`.
- Otherwise, the ticket costs \`10\` — return \`10\`.

So \`ticketPrice(3)\` is \`0\` and \`ticketPrice(30)\` is \`10\`.`,
      starterCode: `function ticketPrice(age) {

}
`,
      blocks: ["if (", "age < 5", ") {", "return 0;", "} else {", "return 10;", "}"],
      solution: `function ticketPrice(age) {
  if (age < 5) {
    return 0;
  } else {
    return 10;
  }
}`,
      tests: [
        {
          name: "ticketPrice(3) is 0 (free for little kids)",
          code: `assertEquals(ticketPrice(3), 0);`,
        },
        {
          name: "ticketPrice(30) is 10",
          code: `assertEquals(ticketPrice(30), 10);`,
        },
        {
          name: "ticketPrice(5) is 10 (5 is not less than 5)",
          code: `assertEquals(ticketPrice(5), 10);`,
        },
      ],
      hints: [
        "Start with `if (age < 5) {` then return 0 on the next line.",
        "Add an `else {` that returns 10. Careful: age 5 is NOT less than 5, so it should be 10.",
      ],
      hintCode: [
        `function ticketPrice(age) {
  if (age < 5) {

  }
}
`,
        `function ticketPrice(age) {
  if (age < 5) {
    return 0;
  } else {
    return 10;
  }
}
`,
      ],
      explanation: `Incredible — you just wrote a real rule that a real app might use! You combined an input (\`age\`), a choice (\`if/else\`), and returning different values. This is genuinely how working software gets built. You're a programmer now. 🎉`,
    },
  ],
};
