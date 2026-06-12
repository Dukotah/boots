import type { Module } from "./types";

// Recursion — a function calling itself, broken down from a simple base case to
// classic recursive challenges. Auto-graded in-browser with pure synchronous JS.
//
// Entry pacing (Entry-4): this is a deep-dive module, but the first two lessons
// are no-typing quizzes that make the call stack *visible* before anyone writes a
// recursive call. We always teach the BASE CASE first, then the recursive step.
// Every code lesson ships drag-in `blocks` and two-step `hintCode` so a learner
// arriving from Foundations has a scaffold instead of a blank page. Multi-concept
// lessons are split (e.g. "is it an array?" is taught before flattening).
export const recursion: Module = {
  slug: "recursion",
  title: "Recursion",
  description:
    "Learn to solve problems by having a function call itself. Master the base case, the recursive step, and the classic patterns that show up everywhere.",
  emoji: "🔁",
  gradient: "from-violet-400/20 to-purple-500/10",
  tagline:
    "Learn recursion in JavaScript with hands-on exercises: base cases, factorials, Fibonacci, and flattening nested arrays.",
  keywords: [
    "learn recursion",
    "recursion javascript",
    "recursive functions",
    "base case recursion",
  ],
  lessons: [
    // ── 1. Cold open: trace the call stack (no typing) ──
    {
      slug: "trace-the-call-stack",
      title: "Trace the Call Stack",
      blurb: "Watch a recursive call unwind, step by step, before you write one.",
      xp: 15,
      kind: "quiz",
      content: `# Trace the Call Stack

A **recursive** function is one that calls *itself*. That sounds dizzying, so
before you write one, let's slow down and *watch* one run.

Here's a tiny countdown. Read it top to bottom:

\`\`\`js
function countdown(n) {
  if (n <= 0) return [];            // base case: stop here
  return [n, ...countdown(n - 1)];  // recursive step: n, then count down the rest
}
\`\`\`

Now let's trace \`countdown(3)\` by hand. Each call **pauses** and waits for the
call inside it to finish — the paused calls stack up:

\`\`\`text
countdown(3) → [3, ...countdown(2)]   ⏸ waiting on countdown(2)
  countdown(2) → [2, ...countdown(1)]   ⏸ waiting on countdown(1)
    countdown(1) → [1, ...countdown(0)]   ⏸ waiting on countdown(0)
      countdown(0) → []   ✅ base case! nothing to wait for
\`\`\`

The bottom call hits the **base case** and returns \`[]\`. Now the stack
**unwinds** — each paused call fills in its blank and returns:

\`\`\`text
countdown(0) returns []
countdown(1) returns [1, ...[]]      → [1]
countdown(2) returns [2, ...[1]]     → [2, 1]
countdown(3) returns [3, ...[2, 1]]  → [3, 2, 1]
\`\`\`

Two ideas to hold onto: a recursive call **goes down** until it hits the base
case, then **comes back up** building the answer. Trace it in your head, then
answer below. 👇`,
      questions: [
        {
          prompt: "What stops `countdown` from calling itself forever?",
          options: [
            "Nothing — it does run forever",
            "The base case `if (n <= 0) return [];`",
            "The `...` spread operator",
          ],
          answer: 1,
          explanation:
            "The base case is the condition that returns *without* recursing. Without it, the function would call itself endlessly.",
        },
        {
          prompt:
            "In the trace, which call returns FIRST (reaches its answer before any other)?",
          options: [
            "`countdown(3)` — it was called first",
            "`countdown(0)` — the base case at the bottom",
            "They all return at the same instant",
          ],
          answer: 1,
          explanation:
            "Calls pause on the way down. The deepest call, `countdown(0)`, hits the base case and returns first. Then the stack unwinds upward.",
        },
        {
          prompt:
            "While `countdown(3)` is waiting, how many calls are paused on the stack at the deepest point?",
          options: [
            "1 — only the current one",
            "4 — countdown(3), (2), (1), and (0) are all in flight",
            "0 — recursion doesn't use a stack",
          ],
          answer: 1,
          explanation:
            "At the deepest point all four calls exist at once: 3, 2, 1 are paused waiting, and 0 is running. That's the call stack growing.",
        },
        {
          prompt: "What does `countdown(3)` ultimately return?",
          options: ["`[1, 2, 3]`", "`[3, 2, 1]`", "`[0, 1, 2, 3]`"],
          answer: 1,
          explanation:
            "As the stack unwinds: [3, ...[2, 1]] = [3, 2, 1]. The first call ends up at the front.",
        },
      ],
    },

    // ── 2. Concept: always write the base case first (no typing) ──
    {
      slug: "base-case-first",
      title: "Base Case First",
      blurb: "Every recursion needs a stopping condition — write it before the recursion.",
      xp: 15,
      kind: "quiz",
      content: `# Base Case First

You just saw that the **base case** is what lets a recursion *finish*. It's so
important that we have a rule: **write the base case first**, before you write
the part that calls itself.

Every recursive function has exactly two pieces:

1. **Base case** — the simplest input, where you know the answer outright and
   return *without* recursing. (\`countdown(0)\` → \`[]\`.)
2. **Recursive step** — solve a *slightly smaller* problem and combine.
   (\`countdown(n)\` → \`[n, ...countdown(n - 1)]\`.)

Why first? Because the recursive step has to move **toward** the base case. If
you forget the base case, the function never stops:

\`\`\`js
function broken(n) {
  return n + broken(n - 1); // ❌ no base case → runs until it crashes
}
\`\`\`

That crash even has a name: a **stack overflow** — the call stack grew until it
ran out of room. The fix is always the same: add a base case the recursion
actually reaches.

Read carefully, then answer below. 👇`,
      questions: [
        {
          prompt: "The two parts of every recursive function are:",
          options: [
            "a base case and a recursive step",
            "a loop and a counter",
            "an import and an export",
          ],
          answer: 0,
          explanation:
            "Base case (where it stops) + recursive step (a smaller call). Master those two and you can write any recursion.",
        },
        {
          prompt:
            "Why does `broken(n)` above crash?",
          options: [
            "It uses `+` instead of `-`",
            "It has no base case, so it never stops calling itself",
            "Functions aren't allowed to call themselves",
          ],
          answer: 1,
          explanation:
            "With no base case the recursion never returns. The stack keeps growing until it overflows.",
        },
        {
          prompt:
            "The recursive step must always move the input…",
          options: [
            "further from the base case",
            "toward the base case (a smaller / simpler problem)",
            "it doesn't matter which way",
          ],
          answer: 1,
          explanation:
            "Each call has to get closer to the base case (e.g. `n - 1`), or the base case is never reached.",
        },
        {
          prompt: "What's the practical rule when writing a recursive function?",
          options: [
            "Write the recursive call first, add the base case if it crashes",
            "Write the base case first, then the recursive step",
            "Skip the base case for short functions",
          ],
          answer: 1,
          explanation:
            "Always start with the base case. It's your stopping condition, and the recursive step is designed to reach it.",
        },
      ],
    },

    // ── 3. First recursive function you write: countdown ──
    {
      slug: "countdown",
      title: "Countdown",
      blurb: "Your first recursive function.",
      xp: 35,
      content: `# Countdown

Time to write the function you just traced. Remember the two pieces, and write
the **base case first**:

\`\`\`js
function countdown(n) {
  if (n <= 0) return [];           // 1. base case: stop
  return [n, ...countdown(n - 1)]; // 2. recursive step: n, then the rest
}
countdown(3); // [3, 2, 1]
\`\`\`

The \`...\` (spread) unpacks the smaller array so you get one flat list:
\`[3, ...[2, 1]]\` becomes \`[3, 2, 1]\`.

## Your task
Write \`countdown(n)\` that returns an array \`[n, n-1, ..., 1]\`. For \`n <= 0\`
return an empty array \`[]\`.`,
      starterCode: `function countdown(n) {
  // 1. base case first: if n <= 0, return []
  // 2. then recurse: [n, ...countdown(n - 1)]
}
`,
      blocks: [
        "if (n <= 0) return [];",
        "return [n, ",
        "...countdown(n - 1)",
        "];",
      ],
      solution: `function countdown(n) {
  if (n <= 0) return [];
  return [n, ...countdown(n - 1)];
}`,
      tests: [
        { name: "countdown(3) → [3,2,1]", code: `assertEquals(countdown(3), [3, 2, 1]);` },
        { name: "countdown(1) → [1]", code: `assertEquals(countdown(1), [1]);` },
        { name: "countdown(0) → []", code: `assertEquals(countdown(0), []);` },
        { name: "countdown(5) → [5,4,3,2,1]", code: `assertEquals(countdown(5), [5, 4, 3, 2, 1]);` },
      ],
      hints: [
        "Start with the base case: `if (n <= 0) return [];` so the recursion can stop.",
        "Now the recursive step: put `n` first, then spread the smaller countdown — `return [n, ...countdown(n - 1)];`.",
      ],
      hintCode: [
        `function countdown(n) {\n  if (n <= 0) return [];\n  // now the recursive step\n}\n`,
        `function countdown(n) {\n  if (n <= 0) return [];\n  return [n, ...countdown(n - 1)];\n}\n`,
      ],
      explanation:
        "🔁 You wrote your first recursion! Base case `[]` stops it, and `[n, ...countdown(n - 1)]` builds the list as the stack unwinds.",
    },

    // ── 4. Factorial (returns a number, classic n × (n-1)!) ──
    {
      slug: "factorial",
      title: "Factorial",
      blurb: "n! = n × (n-1) × ... × 1.",
      xp: 35,
      content: `# Factorial

The factorial of \`n\` is \`n × (n-1) × ... × 1\`, and \`0! = 1\`. This is the
textbook recursion: \`n! = n × (n-1)!\`.

Same two pieces as countdown — base case first, then a smaller call:

\`\`\`js
function factorial(n) {
  if (n <= 1) return 1;          // base case: 0! and 1! are both 1
  return n * factorial(n - 1);   // recursive step
}
factorial(5); // 120
\`\`\`

Notice the only real difference from countdown: here we **multiply** the result
of the smaller call instead of putting it in an array.

## Your task
Write \`factorial(n)\` that returns \`n!\`. Assume \`n >= 0\`.`,
      starterCode: `function factorial(n) {
  // 1. base case first: if n <= 1, return 1
  // 2. then recurse: n * factorial(n - 1)
}
`,
      blocks: ["if (n <= 1) return 1;", "return n * ", "factorial(n - 1)", ";"],
      solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      tests: [
        { name: "factorial(5) → 120", code: `assertEquals(factorial(5), 120);` },
        { name: "factorial(0) → 1", code: `assertEquals(factorial(0), 1);` },
        { name: "factorial(1) → 1", code: `assertEquals(factorial(1), 1);` },
        { name: "factorial(6) → 720", code: `assertEquals(factorial(6), 720);` },
      ],
      hints: [
        "Base case first: `if (n <= 1) return 1;` — both 0! and 1! equal 1.",
        "Recursive step: multiply `n` by the factorial of one less — `return n * factorial(n - 1);`.",
      ],
      hintCode: [
        `function factorial(n) {\n  if (n <= 1) return 1;\n  // now the recursive step\n}\n`,
        `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n`,
      ],
      explanation:
        "✖️ Each call multiplies n by the answer to a smaller factorial, all the way down to the base case 1.",
    },

    // ── 5. Sum an array (recursion over a list: first + rest) ──
    {
      slug: "sum-array",
      title: "Sum an Array",
      blurb: "Add up numbers without a loop.",
      xp: 40,
      content: `# Sum an Array

So far \`n\` got smaller. You can recurse over a **list** the same way: shrink the
array by peeling off the **first** element each call.

The pattern is "**first + rest**": add the first element to the sum of everything
after it. The base case is the empty array, which sums to \`0\`.

\`\`\`js
function sumArray(arr) {
  if (arr.length === 0) return 0;         // base case: empty sums to 0
  return arr[0] + sumArray(arr.slice(1)); // first + sum of the rest
}
sumArray([1, 2, 3]); // 6
\`\`\`

\`arr.slice(1)\` returns a new array with everything *except* the first item — so
each call works on a shorter list, marching toward the empty-array base case.

## Your task
Write \`sumArray(arr)\` that returns the sum of all numbers in \`arr\`, using
recursion (no \`for\`/\`while\` loops).`,
      starterCode: `function sumArray(arr) {
  // 1. base case first: empty array sums to 0
  // 2. then recurse: arr[0] + sumArray(arr.slice(1))
}
`,
      blocks: [
        "if (arr.length === 0) return 0;",
        "return arr[0] + ",
        "sumArray(arr.slice(1))",
        ";",
      ],
      solution: `function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}`,
      tests: [
        { name: "sumArray([1,2,3]) → 6", code: `assertEquals(sumArray([1, 2, 3]), 6);` },
        { name: "sumArray([]) → 0", code: `assertEquals(sumArray([]), 0);` },
        { name: "sumArray([10]) → 10", code: `assertEquals(sumArray([10]), 10);` },
        { name: "sumArray([5,5,5,5]) → 20", code: `assertEquals(sumArray([5, 5, 5, 5]), 20);` },
        {
          name: "handles negatives",
          code: `assertEquals(sumArray([-1, 2, -3, 4]), 2);`,
        },
      ],
      hints: [
        "Base case first: an empty array has nothing to add, so `if (arr.length === 0) return 0;`.",
        "Recursive step: add the first item to the sum of the rest — `return arr[0] + sumArray(arr.slice(1));`. `slice(1)` drops the first element.",
      ],
      hintCode: [
        `function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  // now the recursive step\n}\n`,
        `function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sumArray(arr.slice(1));\n}\n`,
      ],
      explanation:
        "➕ The 'first + rest' pattern: peel off `arr[0]`, recurse on the shorter `slice(1)`, and the empty array stops it at 0.",
    },

    // ── 6. Reverse a string (recursion over a string: rest + first) ──
    {
      slug: "reverse-string",
      title: "Reverse a String",
      blurb: "Flip a string recursively.",
      xp: 40,
      content: `# Reverse a String

Strings can be sliced just like arrays, so the same "first / rest" idea works —
but for a reverse, the order flips. Take the **first** character and stick it on
the **end** of the reversed rest. An empty string reverses to itself.

\`\`\`js
function reverse(str) {
  if (str === "") return "";              // base case
  return reverse(str.slice(1)) + str[0];  // reverse the rest, THEN add first
}
reverse("abc"); // "cba"
\`\`\`

The key is putting \`str[0]\` *after* the recursive call. That's what pushes the
first character to the back: \`reverse("bc") + "a"\` → \`"cb" + "a"\` → \`"cba"\`.

## Your task
Write \`reverse(str)\` that returns \`str\` reversed, using recursion (no
\`.reverse()\` and no loops).`,
      starterCode: `function reverse(str) {
  // 1. base case first: empty string returns ""
  // 2. then recurse: reverse(str.slice(1)) + str[0]
}
`,
      blocks: [
        'if (str === "") return "";',
        "return reverse(str.slice(1))",
        " + str[0]",
        ";",
      ],
      solution: `function reverse(str) {
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
}`,
      tests: [
        { name: '"hello" → "olleh"', code: `assertEquals(reverse("hello"), "olleh");` },
        { name: "empty string", code: `assertEquals(reverse(""), "");` },
        { name: '"a" → "a"', code: `assertEquals(reverse("a"), "a");` },
        { name: '"Boots" → "stooB"', code: `assertEquals(reverse("Boots"), "stooB");` },
      ],
      hints: [
        'Base case first: `if (str === "") return "";` — an empty string is already reversed.',
        "Recursive step: reverse the rest, then add the first character *at the end* — `return reverse(str.slice(1)) + str[0];`.",
      ],
      hintCode: [
        `function reverse(str) {\n  if (str === "") return "";\n  // now the recursive step\n}\n`,
        `function reverse(str) {\n  if (str === "") return "";\n  return reverse(str.slice(1)) + str[0];\n}\n`,
      ],
      explanation:
        "🔄 Putting `str[0]` after the recursive call sends each first character to the back, flipping the whole string.",
    },

    // ── 7. Power (two arguments; one shrinks, one stays) ──
    {
      slug: "power",
      title: "Power",
      blurb: "Compute base^exp without **.",
      xp: 45,
      content: `# Power

Now a function with **two** arguments. Only one of them shrinks each call — that's
the one driving you toward the base case.

Raising \`base\` to the \`exp\` power means multiplying \`base\` by itself \`exp\`
times. Recursively: \`base^exp = base × base^(exp-1)\`, and \`base^0 = 1\`.

\`\`\`js
function power(base, exp) {
  if (exp === 0) return 1;             // base case: anything^0 is 1
  return base * power(base, exp - 1);  // base stays, exp shrinks
}
power(2, 5); // 32
\`\`\`

Watch which argument changes: \`base\` is passed along unchanged, while \`exp\`
counts down to \`0\`. That's deliberate — the *shrinking* argument is what reaches
the base case.

## Your task
Write \`power(base, exp)\` that returns \`base\` raised to \`exp\` without using
\`**\` or \`Math.pow\`. Assume \`exp >= 0\`.`,
      starterCode: `function power(base, exp) {
  // 1. base case first: if exp === 0, return 1
  // 2. then recurse: base * power(base, exp - 1)
}
`,
      blocks: ["if (exp === 0) return 1;", "return base * ", "power(base, exp - 1)", ";"],
      solution: `function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`,
      tests: [
        { name: "power(2, 5) → 32", code: `assertEquals(power(2, 5), 32);` },
        { name: "power(5, 0) → 1", code: `assertEquals(power(5, 0), 1);` },
        { name: "power(3, 3) → 27", code: `assertEquals(power(3, 3), 27);` },
        { name: "power(10, 1) → 10", code: `assertEquals(power(10, 1), 10);` },
        { name: "power(7, 2) → 49", code: `assertEquals(power(7, 2), 49);` },
      ],
      hints: [
        "Base case first: any number to the power 0 is 1, so `if (exp === 0) return 1;`.",
        "Recursive step: multiply `base` by `power(base, exp - 1)`. Keep `base` the same; only `exp` shrinks.",
      ],
      hintCode: [
        `function power(base, exp) {\n  if (exp === 0) return 1;\n  // now the recursive step\n}\n`,
        `function power(base, exp) {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}\n`,
      ],
      explanation:
        "⚡ Only the shrinking argument (`exp`) drives the recursion to its base case; `base` rides along unchanged.",
    },

    // ── 8. Concept: two base cases (no typing, preps Fibonacci) ──
    {
      slug: "two-base-cases",
      title: "When You Need Two Base Cases",
      blurb: "Some recursions stop on more than one input — and call themselves twice.",
      xp: 15,
      kind: "quiz",
      content: `# When You Need Two Base Cases

Everything so far had **one** base case and made **one** recursive call. Some
problems need more. Fibonacci needs **two** base cases and makes **two**
recursive calls.

The sequence starts \`0, 1, 1, 2, 3, 5, 8, ...\` — each number is the sum of the
two before it. So you need to know the *two* smallest answers outright:

\`\`\`js
function fib(n) {
  if (n < 2) return n;             // base cases: fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);  // TWO recursive calls, summed
}
\`\`\`

\`if (n < 2) return n\` is a tidy way to cover **both** base cases at once
(\`fib(0)\` returns 0, \`fib(1)\` returns 1). And because each call spawns two more,
the work branches into a tree — beautiful, but slow for large \`n\`.

Read it, then answer below. 👇`,
      questions: [
        {
          prompt: "Why does `fib` need two base cases?",
          options: [
            "To make it run faster",
            "Each number depends on the *two* before it, so the two smallest must be known directly",
            "JavaScript requires two base cases",
          ],
          answer: 1,
          explanation:
            "fib(n) = fib(n-1) + fib(n-2), so you need fib(0) and fib(1) defined outright, or the recursion can't bottom out.",
        },
        {
          prompt: "What does the single check `if (n < 2) return n;` handle?",
          options: [
            "Only fib(0)",
            "Both fib(0) → 0 and fib(1) → 1",
            "Every value of n",
          ],
          answer: 1,
          explanation:
            "For n = 0 it returns 0, for n = 1 it returns 1. One line, both base cases.",
        },
        {
          prompt: "How many recursive calls does each non-base `fib(n)` make?",
          options: ["One", "Two: fib(n-1) and fib(n-2)", "Zero"],
          answer: 1,
          explanation:
            "Two calls per step. That branching is what makes naive Fibonacci grow exponentially.",
        },
      ],
    },

    // ── 9. Fibonacci (now write the two-base-case recursion) ──
    {
      slug: "fibonacci",
      title: "Fibonacci",
      blurb: "The nth number in the famous sequence.",
      xp: 45,
      content: `# Fibonacci

Now write the recursion you just studied. Two base cases, two recursive calls:

\`\`\`js
function fib(n) {
  if (n < 2) return n;             // base cases: fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);  // sum of the two previous
}
fib(7); // 13
\`\`\`

## Your task
Write \`fib(n)\` that returns the \`n\`th Fibonacci number (0-indexed, so
\`fib(0) === 0\` and \`fib(1) === 1\`).`,
      starterCode: `function fib(n) {
  // 1. base cases first: if n < 2, return n
  // 2. then recurse twice: fib(n - 1) + fib(n - 2)
}
`,
      blocks: ["if (n < 2) return n;", "return fib(n - 1)", " + fib(n - 2)", ";"],
      solution: `function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}`,
      tests: [
        { name: "fib(0) → 0", code: `assertEquals(fib(0), 0);` },
        { name: "fib(1) → 1", code: `assertEquals(fib(1), 1);` },
        { name: "fib(7) → 13", code: `assertEquals(fib(7), 13);` },
        { name: "fib(10) → 55", code: `assertEquals(fib(10), 55);` },
        { name: "fib(15) → 610", code: `assertEquals(fib(15), 610);` },
      ],
      hints: [
        "Base cases first: `if (n < 2) return n;` covers fib(0) and fib(1) in one line.",
        "Recursive step: sum the two previous numbers — `return fib(n - 1) + fib(n - 2);`.",
      ],
      hintCode: [
        `function fib(n) {\n  if (n < 2) return n;\n  // now sum the two previous\n}\n`,
        `function fib(n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n`,
      ],
      explanation:
        "🌀 Two base cases stop it; two recursive calls branch and sum. This is the classic 'tree' recursion.",
    },

    // ── 10. Concept split: detect a nested array (preps flatten) ──
    {
      slug: "is-it-an-array",
      title: "Is It an Array?",
      blurb: "Before flattening, learn the one check that decides 'recurse or keep'.",
      xp: 25,
      content: `# Is It an Array?

The next challenge is **flattening** a nested array, where an item can be a
number *or* another array. Before we recurse into it, we need one small tool:
how to ask "**is this item an array?**"

JavaScript gives you exactly that — \`Array.isArray\`:

\`\`\`js
Array.isArray([1, 2]); // true
Array.isArray(7);      // false
Array.isArray("hi");   // false
\`\`\`

This is the decision that drives a flatten: if an item **is an array**, we'll
recurse into it; if it **isn't**, we keep it as-is. Let's nail the check on its
own first, so flatten is one less thing to think about.

## Your task
Write \`shouldRecurse(item)\` that returns \`true\` when \`item\` is an array and
\`false\` otherwise.`,
      starterCode: `function shouldRecurse(item) {
  // return true only when item is an array
}
`,
      blocks: ["return Array.isArray(item)", ";"],
      solution: `function shouldRecurse(item) {
  return Array.isArray(item);
}`,
      tests: [
        { name: "[1,2] is an array", code: `assertEquals(shouldRecurse([1, 2]), true);` },
        { name: "empty array counts", code: `assertEquals(shouldRecurse([]), true);` },
        { name: "7 is not an array", code: `assertEquals(shouldRecurse(7), false);` },
        { name: '"hi" is not an array', code: `assertEquals(shouldRecurse("hi"), false);` },
      ],
      hints: [
        "Use the built-in check `Array.isArray(item)` — it returns true or false on its own.",
        "`Array.isArray(item)` is already a boolean, so just `return Array.isArray(item);`.",
      ],
      hintCode: [
        `function shouldRecurse(item) {\n  return Array.isArray(item);\n}\n`,
        undefined,
      ],
      explanation:
        "🧭 `Array.isArray` is the fork in the road: array → recurse into it, not an array → keep it. You'll use it in the next lesson.",
    },

    // ── 11. Flatten nested arrays (the capstone, now with the check already known) ──
    {
      slug: "flatten",
      title: "Flatten Nested Arrays",
      blurb: "Crush a nested array into a flat one.",
      xp: 55,
      content: `# Flatten Nested Arrays

Capstone time. An array can contain numbers **or** more arrays, nested any
number of levels deep. You already learned the key check — \`Array.isArray\` —
so now you just wire it into a recursion.

Walk each item: if it's an array, **flatten it and merge** the result; if it's a
number, **keep it**. The base case here is subtle — it's reaching a plain number
(an item that isn't an array), so there's nothing deeper to recurse into.

\`\`\`js
function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result = result.concat(flatten(item)); // recurse + merge
    else result.push(item);                                         // keep the number
  }
  return result;
}
flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]
\`\`\`

\`result.concat(flatten(item))\` merges the flattened sub-array onto what we have
so far; \`result.push(item)\` adds a single number. An empty input array just
returns the empty \`result\`.

## Your task
Write \`flatten(arr)\` that returns a single flat array of all the numbers, in
order, no matter how deeply nested. Don't use the built-in \`Array.prototype.flat\`.`,
      starterCode: `function flatten(arr) {
  let result = [];
  for (const item of arr) {
    // if item is an array, flatten it and merge; otherwise push the number
  }
  return result;
}
`,
      blocks: [
        "for (const item of arr) {",
        "if (Array.isArray(item))",
        " result = result.concat(flatten(item));",
        "else result.push(item);",
        "}",
      ],
      solution: `function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result = result.concat(flatten(item));
    else result.push(item);
  }
  return result;
}`,
      tests: [
        {
          name: "flatten([1,[2,[3,4]],5]) → [1,2,3,4,5]",
          code: `assertEquals(flatten([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);`,
        },
        { name: "already flat", code: `assertEquals(flatten([1, 2, 3]), [1, 2, 3]);` },
        { name: "empty array", code: `assertEquals(flatten([]), []);` },
        {
          name: "deeply nested",
          code: `assertEquals(flatten([[[[1]]], 2, [[3]]]), [1, 2, 3]);`,
        },
        {
          name: "nested empties",
          code: `assertEquals(flatten([1, [], [2, []], 3]), [1, 2, 3]);`,
        },
      ],
      hints: [
        "Loop over every item with `for (const item of arr) { ... }`, collecting into `result`.",
        "Use the check you learned: `if (Array.isArray(item)) result = result.concat(flatten(item)); else result.push(item);`.",
      ],
      hintCode: [
        `function flatten(arr) {\n  let result = [];\n  for (const item of arr) {\n    // decide: recurse or keep\n  }\n  return result;\n}\n`,
        `function flatten(arr) {\n  let result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) result = result.concat(flatten(item));\n    else result.push(item);\n  }\n  return result;\n}\n`,
      ],
      explanation:
        "🏆 Recursion + a loop together: arrays get flattened and merged, plain numbers get kept. That handles any depth of nesting.",
    },
  ],
};
