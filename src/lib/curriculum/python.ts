import type { Module } from "./types";

// Python Basics — runs in the browser via Pyodide (CPython compiled to WASM).
// Tests are Python: they run after the student's code with `assert` and an
// injected `assert_equals(actual, expected)` helper.
//
// This is the SECOND on-ramp of the Python track and is dialed all the way down
// for total beginners (ages 9–13 and non-technical adults). Concept order
// follows the kids-logic baseline: read code → return a value → use a parameter
// → f-strings → one math idea at a time → if/else → elif → loops → strings.
// Every code task is tiny and heavily scaffolded with drag-in `blocks` and
// step-by-step `hintCode`, and the very first lesson is a no-typing quiz so
// learners read Python before they write any. Double-concept lessons have been
// split so nobody meets two new ideas at once.
export const python: Module = {
  slug: "python",
  title: "Python Basics 🐍",
  description:
    "Learn Python from scratch — read code, return values, do a little math, make choices, loop, and work with text. Real Python runs right in your browser, no install needed. One tiny, friendly step at a time.",
  emoji: "🐍",
  gradient: "from-yellow-400/20 to-sky-500/10",
  language: "py",
  tagline:
    "The gentlest first Python course for total beginners (ages 9–13 and adults): read code, return values, compare numbers, make choices, and loop — in real Python, one tiny step at a time.",
  keywords: [
    "learn python",
    "python tutorial",
    "python for beginners",
    "python exercises",
    "python online",
  ],
  lessons: [
    // ── 1. What a function is (no typing) ──
    {
      slug: "read-python",
      title: "Read Some Python 👀",
      blurb: "Before you write Python, learn to read it.",
      xp: 10,
      kind: "quiz",
      content: `# Read Some Python 👀

Welcome to Python! 🐍 Don't worry — we'll go one tiny step at a time, and you
can't break anything.

Coders read a *lot* of code before they write any. So let's read a little first.

Here is a tiny machine called a **function**. You give it a name, and when you
call it, it **hands something back** with the word \`return\`:

\`\`\`py
def greet():
    return "Hi there!"
\`\`\`

- \`def\` is how you **define** (make) a function.
- \`greet\` is its **name**.
- \`return\` **hands a value back** to whoever called it.

When we call \`greet()\`, it hands back the words \`"Hi there!"\`. The words in
"quotes" are called a **string** — that's just coder-speak for *text*. 🧵

Read the code above, then answer below. 👇`,
      questions: [
        {
          prompt: "When we call `greet()`, what does it hand back?",
          options: ['The word "greet"', '"Hi there!"', "Nothing at all"],
          answer: 1,
          explanation:
            '`return` hands back whatever comes after it — here, the string "Hi there!".',
        },
        {
          prompt:
            "Here is another function:\n\n```py\ndef pet():\n    return \"cat\"\n```\n\nWhat does `pet()` hand back?",
          options: ['"dog"', '"cat"', '"pet"'],
          answer: 1,
          explanation: 'It returns whatever is after `return` — the string "cat".',
        },
        {
          prompt: "The word `def` is used to:",
          options: [
            "define (make) a new function",
            "delete everything",
            "repeat forever",
          ],
          answer: 0,
          explanation: "`def` starts a new function and gives it a name.",
        },
      ],
    },

    // ── 2. First write: return a value ──
    {
      slug: "return-a-word",
      title: "Return a Word ✏️",
      blurb: "Your first Python — make a function hand back a word.",
      xp: 15,
      content: `# Return a Word ✏️

Time to write your very first Python! This is the smallest possible task: you'll
just type a word.

Below is a function called \`shout\`. Right now it has \`pass\`, which means "do
nothing." Your job: replace it with a \`return\` that hands back **any word you
like** in quotes.

\`\`\`py
def shout():
    return "PIZZA"   # hands back the word PIZZA
\`\`\`

## Your task
Make \`shout\` hand back any word that isn't empty. Go wild — your name, your
favorite food, anything! 🍕`,
      starterCode: `def shout():
    pass
`,
      blocks: ["return ", '"PIZZA"'],
      solution: `def shout():
    return "PIZZA"`,
      tests: [
        {
          name: "shout() hands back a word",
          code: `result = shout()
assert isinstance(result, str) and len(result) > 0, "Return a word in quotes so it isn't empty!"`,
        },
      ],
      hints: [
        'Replace `pass` with a return line, like `return "awesome"`.',
        "Empty quotes \"\" don't count — your word needs at least one letter!",
      ],
      hintCode: [`def shout():\n    return "awesome"\n`, undefined],
      explanation:
        "🎉 You did it — your first line of working Python! The function handed back exactly the word you typed.",
    },

    // ── 3. Use a parameter (no f-strings yet) ──
    {
      slug: "use-the-input",
      title: "Use the Input 📥",
      blurb: "A function can take a value in and hand it back.",
      xp: 20,
      content: `# Use the Input 📥

So far \`shout\` handed back the same word every time. Now we'll let a function
take a value **in**.

The word inside the parentheses is a **parameter** — a box that gets filled with
whatever we hand the function. Here \`name\` could be anything:

\`\`\`py
def echo(name):
    return name   # hand back whatever was passed in

echo("Sam")   # "Sam"
echo("Ada")   # "Ada"
\`\`\`

Notice we \`return name\` — *no quotes*. Quotes would hand back the literal word
"name"; without quotes, Python swaps in the value that was passed.

## Your task
Write \`echo(name)\` that simply hands back the \`name\` it was given.`,
      starterCode: `def echo(name):
    pass
`,
      blocks: ["return ", "name"],
      solution: `def echo(name):
    return name`,
      tests: [
        { name: 'echo("Sam") == "Sam"', code: `assert_equals(echo("Sam"), "Sam")` },
        { name: 'echo("Ada") == "Ada"', code: `assert_equals(echo("Ada"), "Ada")` },
      ],
      hints: [
        "Return the parameter with no quotes: `return name`.",
        'Quotes like `"name"` hand back the word "name" — drop them so Python uses the value.',
      ],
      hintCode: [`def echo(name):\n    return name\n`, undefined],
      explanation:
        "📥 Nice! The function took a value in and handed it straight back. That's how inputs work.",
    },

    // ── 4. f-strings (now its own lesson) ──
    {
      slug: "hello-function",
      title: "Say Hello with an f-string 👋",
      blurb: "Drop a value right into a sentence.",
      xp: 25,
      content: `# Say Hello with an f-string 👋

Often you want to put a value **inside** a sentence. Python has a neat tool for
that: the **f-string**. Put an \`f\` before the opening quote, then wrap any value
in \`{curly braces}\`:

\`\`\`py
name = "Sam"
f"Hello, {name}!"   # "Hello, Sam!"
\`\`\`

Python swaps \`{name}\` for the value inside it. Everything else stays as plain
text.

## Your task
Write \`greet(name)\` that returns \`"Hello, <name>!"\` — for example
\`greet("Sam")\` returns \`"Hello, Sam!"\`.`,
      starterCode: `def greet(name):
    pass
`,
      blocks: ["return ", "f", '"Hello, ', "{name}", '!"'],
      solution: `def greet(name):
    return f"Hello, {name}!"`,
      tests: [
        { name: 'greet("Sam") == "Hello, Sam!"', code: `assert_equals(greet("Sam"), "Hello, Sam!")` },
        { name: 'greet("Ada") == "Hello, Ada!"', code: `assert_equals(greet("Ada"), "Hello, Ada!")` },
      ],
      hints: [
        'Start with the f-string: `f"Hello, !"`, then drop `{name}` before the `!`.',
        'The whole answer is `return f"Hello, {name}!"` — keep the `f` and the curly braces.',
      ],
      hintCode: [
        `def greet(name):\n    return f"Hello, !"\n`,
        `def greet(name):\n    return f"Hello, {name}!"\n`,
      ],
      explanation:
        '👋 The `f` and `{name}` let you drop a value right into your text. `greet("Sam")` becomes "Hello, Sam!".',
    },

    // ── 5. Multiply (just one math idea) ──
    {
      slug: "multiply",
      title: "A Little Math ✖️",
      blurb: "Multiply two numbers together.",
      xp: 25,
      content: `# A Little Math ✖️

Computers are great at math. Python uses these symbols:

- \`+\` add
- \`-\` subtract
- \`*\` multiply
- \`/\` divide

The \`*\` (star) means **multiply**:

\`\`\`py
3 * 4   # 12
5 * 5   # 25
\`\`\`

## Your task
Write \`rectangle_area(width, height)\` that returns the area — that's
\`width * height\`.`,
      starterCode: `def rectangle_area(width, height):
    pass
`,
      blocks: ["return ", "width", " * ", "height"],
      solution: `def rectangle_area(width, height):
    return width * height`,
      tests: [
        { name: "area of 3x4 is 12", code: `assert_equals(rectangle_area(3, 4), 12)` },
        { name: "area of 5x5 is 25", code: `assert_equals(rectangle_area(5, 5), 25)` },
      ],
      hints: [
        "Multiply the two boxes with `*`: `width * height`.",
        "The whole answer is `return width * height`.",
      ],
      hintCode: [`def rectangle_area(width, height):\n    return width * height\n`, undefined],
      explanation:
        "✖️ `width * height` multiplies the two numbers and hands back the area.",
    },

    // ── 6. Remainder with % (the other half of the old arithmetic lesson) ──
    {
      slug: "remainder",
      title: "What's Left Over? ➗",
      blurb: "Use % to find the remainder.",
      xp: 25,
      content: `# What's Left Over? ➗

Sometimes you want to know what's **left over** after sharing. Python's \`%\`
(say "remainder") does exactly that:

\`\`\`py
7 % 2   # 1  → 7 shared in 2s leaves 1 left over
6 % 2   # 0  → 6 shares evenly, nothing left over
10 % 3  # 1  → 10 shared in 3s leaves 1
\`\`\`

So \`%\` tells you the leftover amount. It's handy for "is this even?" checks and
lots more.

## Your task
Write \`remainder(a, b)\` that returns what's left over when you divide \`a\` by
\`b\` — that's \`a % b\`.`,
      starterCode: `def remainder(a, b):
    pass
`,
      blocks: ["return ", "a", " % ", "b"],
      solution: `def remainder(a, b):
    return a % b`,
      tests: [
        { name: "7 % 2 == 1", code: `assert_equals(remainder(7, 2), 1)` },
        { name: "6 % 2 == 0", code: `assert_equals(remainder(6, 2), 0)` },
        { name: "10 % 3 == 1", code: `assert_equals(remainder(10, 3), 1)` },
      ],
      hints: [
        "Use the `%` symbol between the two numbers: `a % b`.",
        "The whole answer is `return a % b`.",
      ],
      hintCode: [`def remainder(a, b):\n    return a % b\n`, undefined],
      explanation:
        "➗ `a % b` hands back the leftover after dividing. 7 % 2 is 1 — one left over.",
    },

    // ── 7. Concept: if / else (no typing) ──
    {
      slug: "making-choices",
      title: "Making Choices 🔀",
      blurb: "How Python picks between two paths.",
      xp: 10,
      kind: "quiz",
      content: `# Making Choices 🔀

Real programs make **decisions**. Python uses \`if\` and \`else\`:

> **If** something is true, do this. **Else** (otherwise), do that.

\`\`\`py
def weather(rainy):
    if rainy:
        return "umbrella ☔"
    else:
        return "sunglasses 😎"
\`\`\`

Two important things about Python:

- There are **no braces** \`{}\`. Instead, the **indentation** (4 spaces) shows
  what's inside the \`if\`.
- The line ends with a **colon** \`:\`.

If \`rainy\` is true, it returns the umbrella. Otherwise, the sunglasses. Read it
carefully, then answer below. 👇`,
      questions: [
        {
          prompt: "What does `weather(True)` hand back?",
          options: ['"umbrella ☔"', '"sunglasses 😎"'],
          answer: 0,
          explanation: "rainy is True, so the `if` path runs — grab the umbrella!",
        },
        {
          prompt: "What does `weather(False)` hand back?",
          options: ['"umbrella ☔"', '"sunglasses 😎"'],
          answer: 1,
          explanation: "rainy is False, so the `else` path runs — sunglasses it is.",
        },
        {
          prompt: "In Python, what shows what's inside an `if`?",
          options: ["curly braces { }", "the indentation (spaces)", "a semicolon ;"],
          answer: 1,
          explanation:
            "Python has no braces — the spaces in front of a line show that it belongs to the `if`.",
        },
      ],
    },

    // ── 8. Write an if/else (max scaffold) ──
    {
      slug: "traffic-light",
      title: "Red Light, Green Light 🚦",
      blurb: "Write your first if/else: stop or go?",
      xp: 30,
      content: `# Red Light, Green Light 🚦

Now you write the choice yourself! A traffic light tells cars when to **go** and
when to **stop**.

You can drag the blocks in (in order) instead of typing, or tap the hint to fill
it in step by step. Remember: each line after the \`:\` is **indented 4 spaces**.

\`\`\`py
if color == "green":
    return "go"
else:
    return "stop"
\`\`\`

We use \`==\` (two equals signs) to ask "is it exactly equal?"

## Your task
Write \`light(color)\`. If \`color\` is exactly \`"green"\`, return \`"go"\`.
Otherwise, return \`"stop"\`.`,
      starterCode: `def light(color):
    pass
`,
      blocks: [
        'if color == "green":',
        'return "go"',
        "else:",
        'return "stop"',
      ],
      solution: `def light(color):
    if color == "green":
        return "go"
    else:
        return "stop"`,
      tests: [
        { name: '"green" -> "go"', code: `assert_equals(light("green"), "go")` },
        { name: '"red" -> "stop"', code: `assert_equals(light("red"), "stop")` },
        { name: '"yellow" -> "stop"', code: `assert_equals(light("yellow"), "stop")` },
      ],
      hints: [
        'Check the color with `if color == "green":`. The `==` means "is exactly".',
        'Everything that isn\'t green should `return "stop"` in the `else:`.',
      ],
      hintCode: [
        `def light(color):\n    if color == "green":\n        \n`,
        `def light(color):\n    if color == "green":\n        return "go"\n    else:\n        return "stop"\n`,
      ],
      explanation:
        "🚦 Green means go, everything else means stop! You just wrote an `if/else` — the way code chooses between two paths.",
    },

    // ── 9. elif: a third path ──
    {
      slug: "conditionals",
      title: "A Third Choice with elif 🔢",
      blurb: "Add a middle option with elif.",
      xp: 30,
      content: `# A Third Choice with elif 🔢

Sometimes there are **more than two** paths. Python adds \`elif\` (short for
"else if") in the middle:

\`\`\`py
if score >= 90:
    return "A"
elif score >= 80:
    return "B"
else:
    return "C"
\`\`\`

Python checks each line top to bottom and takes the **first** one that's true.

## Your task
Write \`sign(n)\` that returns \`"positive"\` if \`n > 0\`, \`"negative"\` if
\`n < 0\`, and \`"zero"\` otherwise.`,
      starterCode: `def sign(n):
    pass
`,
      blocks: [
        "if n > 0:",
        'return "positive"',
        "elif n < 0:",
        'return "negative"',
        "else:",
        'return "zero"',
      ],
      solution: `def sign(n):
    if n > 0:
        return "positive"
    elif n < 0:
        return "negative"
    else:
        return "zero"`,
      tests: [
        { name: "positive", code: `assert_equals(sign(5), "positive")` },
        { name: "negative", code: `assert_equals(sign(-3), "negative")` },
        { name: "zero", code: `assert_equals(sign(0), "zero")` },
      ],
      hints: [
        "Start with `if n > 0:` for positive, then add `elif n < 0:` for negative.",
        "Whatever's left (not bigger, not smaller) is `zero` in the `else:`.",
      ],
      hintCode: [
        `def sign(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    else:\n        return "zero"\n`,
        undefined,
      ],
      explanation:
        "🔢 `elif` adds a middle path. Python checks top to bottom and takes the first match.",
    },

    // ── 10. Concept: loops (no typing) ──
    {
      slug: "what-is-a-loop",
      title: "What's a Loop? 🔁",
      blurb: "See how Python repeats things before you write one.",
      xp: 10,
      kind: "quiz",
      content: `# What's a Loop? 🔁

Sometimes you want to do the same thing **many times**. Instead of copying a
line over and over, Python uses a **loop**.

A \`for\` loop walks through a list of numbers. \`range(1, 4)\` gives you
\`1, 2, 3\` (it stops *before* the last number):

\`\`\`py
total = 0
for i in range(1, 4):
    total = total + i   # adds 1, then 2, then 3
# total is now 6
\`\`\`

Each time around the loop, \`i\` becomes the next number, and we add it to
\`total\`. Read it, then answer below — you'll write one next. 👇`,
      questions: [
        {
          prompt: "What numbers does `range(1, 4)` give you?",
          options: ["1, 2, 3, 4", "1, 2, 3", "0, 1, 2, 3"],
          answer: 1,
          explanation: "`range(1, 4)` starts at 1 and stops *before* 4, so: 1, 2, 3.",
        },
        {
          prompt: "After the loop above, what is `total`?",
          options: ["3", "6", "10"],
          answer: 1,
          explanation: "It adds 1 + 2 + 3 = 6.",
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
      ],
    },

    // ── 11. Write a loop (heavily scaffolded) ──
    {
      slug: "loops",
      title: "Add Them Up with a Loop 🔁",
      blurb: "Write your first for loop.",
      xp: 35,
      content: `# Add Them Up with a Loop 🔁

Now you write a loop! You'll add up all the numbers from \`1\` to \`n\`.

The plan is always the same three steps:

1. Start a \`total\` at \`0\`.
2. \`for\` each number from \`1\` to \`n\`, add it to \`total\`.
3. \`return total\`.

\`\`\`py
total = 0
for i in range(1, n + 1):
    total = total + i
return total
\`\`\`

We use \`range(1, n + 1)\` so the last number \`n\` is *included*.

## Your task
Write \`sum_to(n)\` that returns the sum of all integers from \`1\` to \`n\`
inclusive. \`sum_to(5)\` is \`1 + 2 + 3 + 4 + 5 = 15\`.`,
      starterCode: `def sum_to(n):
    pass
`,
      blocks: [
        "total = 0",
        "for i in range(1, n + 1):",
        "total = total + i",
        "return total",
      ],
      solution: `def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total = total + i
    return total`,
      tests: [
        { name: "sum_to(5) == 15", code: `assert_equals(sum_to(5), 15)` },
        { name: "sum_to(1) == 1", code: `assert_equals(sum_to(1), 1)` },
        { name: "sum_to(10) == 55", code: `assert_equals(sum_to(10), 55)` },
      ],
      hints: [
        "Start with `total = 0`, then loop with `for i in range(1, n + 1):`.",
        "Inside the loop add it up: `total = total + i`. After the loop, `return total`.",
      ],
      hintCode: [
        `def sum_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        \n`,
        `def sum_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        total = total + i\n    return total\n`,
      ],
      explanation:
        "🔁 You built up `total` one number at a time. `sum_to(5)` adds 1+2+3+4+5 = 15.",
    },

    // ── 12. One string method ──
    {
      slug: "uppercase",
      title: "SHOUT in Capitals 🔊",
      blurb: "Use .upper() to make text loud.",
      xp: 30,
      content: `# SHOUT in Capitals 🔊

Strings (text) come with handy **methods** — little tools you attach with a dot.
One is \`.upper()\`, which makes every letter a **CAPITAL**:

\`\`\`py
"hi".upper()      # "HI"
"hello".upper()   # "HELLO"
\`\`\`

You can also glue text together with \`+\`:

\`\`\`py
"HI" + "!"   # "HI!"
\`\`\`

## Your task
Write \`shout(text)\` that returns the text in CAPITALS with a \`"!"\` added at the
end. \`shout("go")\` returns \`"GO!"\`.`,
      starterCode: `def shout(text):
    pass
`,
      blocks: ["return ", "text", ".upper()", " + ", '"!"'],
      solution: `def shout(text):
    return text.upper() + "!"`,
      tests: [
        { name: 'shout("go") == "GO!"', code: `assert_equals(shout("go"), "GO!")` },
        { name: 'shout("hi") == "HI!"', code: `assert_equals(shout("hi"), "HI!")` },
      ],
      hints: [
        "Capitalize the text with `text.upper()`.",
        'Then glue a `!` on the end: `text.upper() + "!"`.',
      ],
      hintCode: [
        `def shout(text):\n    return text.upper()\n`,
        `def shout(text):\n    return text.upper() + "!"\n`,
      ],
      explanation:
        '🔊 `.upper()` capitalizes the text and `+ "!"` adds the exclamation. `shout("go")` becomes "GO!".',
    },

    // ── 13. .strip() then chain (second string idea, builds on the last) ──
    {
      slug: "strings",
      title: "Tidy Up Text 🧹",
      blurb: "Trim spaces, then chain methods together.",
      xp: 35,
      content: `# Tidy Up Text 🧹

Text often arrives with messy spaces around it. \`.strip()\` trims the spaces off
both ends:

\`\`\`py
"  hi  ".strip()   # "hi"
\`\`\`

The cool part: you can **chain** methods one after another, left to right. Each
one works on the result of the last:

\`\`\`py
"  hi  ".strip().upper()   # first "hi", then "HI"
\`\`\`

## Your task
Write \`tidy_shout(text)\` that **strips** the spaces, makes it **UPPERCASE**, and
adds a \`"!"\`. \`tidy_shout("  hi ")\` returns \`"HI!"\`.`,
      starterCode: `def tidy_shout(text):
    pass
`,
      blocks: ["return ", "text", ".strip()", ".upper()", " + ", '"!"'],
      solution: `def tidy_shout(text):
    return text.strip().upper() + "!"`,
      tests: [
        { name: 'tidy_shout("  hi ") == "HI!"', code: `assert_equals(tidy_shout("  hi "), "HI!")` },
        { name: 'tidy_shout("go") == "GO!"', code: `assert_equals(tidy_shout("go"), "GO!")` },
      ],
      hints: [
        "First trim the spaces: `text.strip()`.",
        'Then chain on the rest: `text.strip().upper() + "!"`.',
      ],
      hintCode: [
        `def tidy_shout(text):\n    return text.strip()\n`,
        `def tidy_shout(text):\n    return text.strip().upper() + "!"\n`,
      ],
      explanation:
        '🧹 You chained three steps: strip the spaces, uppercase, then add "!". `tidy_shout("  hi ")` becomes "HI!".',
    },

    // ── 14. Default arguments (last, a bit harder) ──
    {
      slug: "default-args",
      title: "Default Arguments ⚙️",
      blurb: "Give a parameter a sensible default.",
      xp: 40,
      content: `# Default Arguments ⚙️

A parameter can have a **default value**, used when the caller leaves it out. You
set it with \`=\` right in the \`def\` line:

\`\`\`py
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Sam")            # "Hello, Sam!"  (used the default)
greet("Sam", "Hi")      # "Hi, Sam!"     (gave our own)
\`\`\`

We also need \`**\` here — that's Python's **power** symbol. \`base ** exp\` means
"base multiplied by itself \`exp\` times":

\`\`\`py
2 ** 3   # 2 * 2 * 2 = 8
3 ** 2   # 3 * 3 = 9
\`\`\`

## Your task
Write \`power(base, exp=2)\` that returns \`base\` raised to \`exp\`. Called with one
argument it should **square** the number: \`power(3)\` returns \`9\`, and
\`power(2, 3)\` returns \`8\`.`,
      starterCode: `def power(base, exp=2):
    pass
`,
      blocks: ["return ", "base", " ** ", "exp"],
      solution: `def power(base, exp=2):
    return base ** exp`,
      tests: [
        { name: "power(3) == 9", code: `assert_equals(power(3), 9)` },
        { name: "power(2, 3) == 8", code: `assert_equals(power(2, 3), 8)` },
        { name: "power(5, 0) == 1", code: `assert_equals(power(5, 0), 1)` },
      ],
      hints: [
        "Use the power symbol `**`: `base ** exp`.",
        "The `exp=2` in the def line means it defaults to squaring. The body is just `return base ** exp`.",
      ],
      hintCode: [`def power(base, exp=2):\n    return base ** exp\n`, undefined],
      explanation:
        "⚙️ Because `exp` defaults to 2, `power(3)` squares to 9. Pass a second argument and it uses that instead — `power(2, 3)` is 8.",
    },
  ],
};
