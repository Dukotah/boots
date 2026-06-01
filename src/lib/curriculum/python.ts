import type { Module } from "./types";

// Python Basics — runs in the browser via Pyodide (CPython compiled to WASM).
// Tests are Python: they run after the student's code with `assert` and an
// injected `assert_equals(actual, expected)` helper.
export const python: Module = {
  slug: "python",
  title: "Python Basics",
  description:
    "Learn Python from scratch — variables, arithmetic, conditionals, loops, strings, and functions. Real Python runs right in your browser, no install needed.",
  emoji: "🐍",
  gradient: "from-yellow-400/20 to-sky-500/10",
  language: "py",
  tagline:
    "Learn Python online with interactive, auto-graded exercises — variables, loops, strings, and functions.",
  keywords: [
    "learn python",
    "python tutorial",
    "python for beginners",
    "python exercises",
    "python online",
  ],
  lessons: [
    {
      slug: "hello-function",
      title: "Your First Function",
      blurb: "Define a function and return a string.",
      xp: 30,
      content: `# Your First Function

In Python, functions are defined with \`def\` and return a value with \`return\`.
F-strings let you drop variables straight into text.

\`\`\`py
def square(n):
    return n * n
\`\`\`

## Your task
Write \`greet(name)\` that returns the string \`"Hello, <name>!"\` — for example
\`greet("Sam")\` returns \`"Hello, Sam!"\`.`,
      starterCode: `def greet(name):
    pass
`,
      solution: `def greet(name):
    return f"Hello, {name}!"`,
      tests: [
        { name: 'greet("Sam") == "Hello, Sam!"', code: `assert_equals(greet("Sam"), "Hello, Sam!")` },
        { name: 'greet("Ada") == "Hello, Ada!"', code: `assert_equals(greet("Ada"), "Hello, Ada!")` },
      ],
    },
    {
      slug: "arithmetic",
      title: "Arithmetic",
      blurb: "Do math with numbers.",
      xp: 30,
      content: `# Arithmetic

Python uses \`+ - * /\` for math. \`/\` always gives a float; \`//\` does integer
division and \`%\` gives the remainder.

\`\`\`py
print(7 // 2)  # 3
print(7 % 2)   # 1
\`\`\`

## Your task
Write \`rectangle_area(width, height)\` that returns the area (width × height).`,
      starterCode: `def rectangle_area(width, height):
    pass
`,
      solution: `def rectangle_area(width, height):
    return width * height`,
      tests: [
        { name: "area of 3x4 is 12", code: `assert_equals(rectangle_area(3, 4), 12)` },
        { name: "area of 5x5 is 25", code: `assert_equals(rectangle_area(5, 5), 25)` },
      ],
    },
    {
      slug: "conditionals",
      title: "If / Elif / Else",
      blurb: "Make decisions with conditions.",
      xp: 35,
      content: `# If / Elif / Else

Python branches with \`if\`, \`elif\`, and \`else\`. Indentation (4 spaces) defines
the block — there are no braces.

\`\`\`py
if score >= 60:
    return "pass"
else:
    return "fail"
\`\`\`

## Your task
Write \`sign(n)\` that returns \`"positive"\` if n > 0, \`"negative"\` if n < 0,
and \`"zero"\` otherwise.`,
      starterCode: `def sign(n):
    pass
`,
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
    },
    {
      slug: "loops",
      title: "Loops & range",
      blurb: "Repeat work with a for loop.",
      xp: 35,
      content: `# Loops & range

\`for\` loops iterate over a sequence. \`range(1, n + 1)\` gives the numbers
\`1, 2, ..., n\`.

\`\`\`py
total = 0
for i in range(1, 4):
    total += i  # 1 + 2 + 3 = 6
\`\`\`

## Your task
Write \`sum_to(n)\` that returns the sum of all integers from 1 to \`n\` inclusive.`,
      starterCode: `def sum_to(n):
    pass
`,
      solution: `def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total`,
      tests: [
        { name: "sum_to(5) == 15", code: `assert_equals(sum_to(5), 15)` },
        { name: "sum_to(1) == 1", code: `assert_equals(sum_to(1), 1)` },
        { name: "sum_to(10) == 55", code: `assert_equals(sum_to(10), 55)` },
      ],
    },
    {
      slug: "strings",
      title: "String Methods",
      blurb: "Transform text.",
      xp: 35,
      content: `# String Methods

Strings have handy methods: \`.upper()\`, \`.lower()\`, \`.strip()\`, \`.replace()\`.

\`\`\`py
print("  hi  ".strip().upper())  # "HI"
\`\`\`

## Your task
Write \`shout(text)\` that strips surrounding whitespace, upper-cases the text,
and adds a \`"!"\` at the end. \`shout("  hi ")\` returns \`"HI!"\`.`,
      starterCode: `def shout(text):
    pass
`,
      solution: `def shout(text):
    return text.strip().upper() + "!"`,
      tests: [
        { name: 'shout("  hi ") == "HI!"', code: `assert_equals(shout("  hi "), "HI!")` },
        { name: 'shout("go") == "GO!"', code: `assert_equals(shout("go"), "GO!")` },
      ],
    },
    {
      slug: "default-args",
      title: "Default Arguments",
      blurb: "Give parameters sensible defaults.",
      xp: 40,
      content: `# Default Arguments

A parameter can have a default value, used when the caller omits it.

\`\`\`py
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
\`\`\`

## Your task
Write \`power(base, exp=2)\` that returns \`base\` raised to \`exp\`. Called with one
argument it should square the number: \`power(3)\` returns \`9\`, \`power(2, 3)\`
returns \`8\`.`,
      starterCode: `def power(base, exp=2):
    pass
`,
      solution: `def power(base, exp=2):
    return base ** exp`,
      tests: [
        { name: "power(3) == 9", code: `assert_equals(power(3), 9)` },
        { name: "power(2, 3) == 8", code: `assert_equals(power(2, 3), 8)` },
        { name: "power(5, 0) == 1", code: `assert_equals(power(5, 0), 1)` },
      ],
    },
  ],
};
