import type { Module } from "./types";

// Test-Driven Development in Practice — red-green-refactor reps in plain JS.
// Runs entirely in-browser via Web Worker; no framework needed.
export const tddPractice: Module = {
  slug: "tdd-practice",
  title: "Test-Driven Development in Practice",
  description:
    "Write the failing test first, make it pass with the simplest code, then clean up — the full red-green-refactor loop without any framework. Pure JavaScript, in-browser, instant feedback.",
  emoji: "🧪",
  gradient: "from-red-400/20 to-green-500/10",
  tagline:
    "Learn TDD hands-on: red-green-refactor, writing tests before code, and building a mini test suite entirely in the browser.",
  keywords: [
    "test driven development",
    "TDD red green refactor",
    "javascript unit testing",
    "write tests first",
    "assert equals javascript",
  ],
  lessons: [
    // ─── Lesson 1: Quiz — What is TDD? ──────────────────────────────────────
    {
      slug: "what-is-tdd",
      title: "What Is Test-Driven Development?",
      blurb: "Understand the red-green-refactor cycle before writing a line.",
      xp: 20,
      kind: "quiz",
      content: `# What Is Test-Driven Development?

**Test-Driven Development (TDD)** flips the normal workflow: you write a
_failing test_ before you write any production code, then you write the minimum
code to make it pass, then you clean it up.

The three-step cycle is called **red → green → refactor**:

| Step | What you do | Why |
|------|-------------|-----|
| 🔴 Red | Write a test that fails | Forces you to think about the interface first |
| 🟢 Green | Write the simplest code to pass it | Gets you to a working state fast |
| 🔵 Refactor | Clean up without breaking tests | Safe changes — tests catch regressions |

### Why bother?

- **Clarity first.** Writing the test makes you decide _what_ the function
  should do before worrying about _how_.
- **Built-in regression net.** Every feature ships with proof it works.
- **Small steps.** You always have a target: make the next failing test green.

In this module you'll do each step yourself — no testing framework required,
just plain \`assert\` calls that throw on failure.`,
      questions: [
        {
          prompt: "In TDD you write the test …",
          options: [
            "After the function is working and you're happy with it",
            "Before writing the production function — so it starts failing (red)",
            "Only when a bug is reported",
          ],
          answer: 1,
          explanation:
            "TDD means Test-FIRST. The failing test is your specification; green code comes after.",
        },
        {
          prompt: "What does 'green' mean in red-green-refactor?",
          options: [
            "The code is production-ready and fully optimised",
            "You've written the minimum code needed to make the failing test pass",
            "You've deleted the test so nothing can fail",
          ],
          answer: 1,
          explanation:
            "Green = all current tests pass. It doesn't mean the code is beautiful yet — that's what refactor is for.",
        },
        {
          prompt: "Why is the refactor step safe in TDD?",
          options: [
            "You just guessed really well",
            "Refactoring never changes behaviour anyway",
            "Your existing tests immediately catch any regression you introduce",
          ],
          answer: 2,
          explanation:
            "If you break behaviour while cleaning up, a test turns red instantly — so you can fix it before anyone notices.",
        },
        {
          prompt: "The biggest benefit of writing the test FIRST is:",
          options: [
            "It forces you to think about the interface and expected behaviour before implementation",
            "It makes the test run faster",
            "You can skip writing documentation",
          ],
          answer: 0,
          explanation:
            "Writing the test first is a design exercise — it makes you specify what success looks like before touching implementation.",
        },
      ],
    },

    // ─── Lesson 2: Your first assert ─────────────────────────────────────────
    {
      slug: "first-assert",
      title: "Your First assert",
      blurb: "Use assertEquals to make a passing test and a failing one.",
      xp: 25,
      content: `# Your First assert

In this module every test is just a call to **\`assertEquals(actual, expected)\`**
(or bare \`assert(condition, message)\`).  When the values match, the test passes
silently; when they don't, it throws and the test runner marks it red.

\`\`\`js
assertEquals(2 + 2, 4);   // passes — nothing happens
assertEquals(2 + 2, 5);   // throws → test marked ❌
\`\`\`

## Your task

Write a function \`add(a, b)\` that returns the sum of two numbers.

Sounds trivial — and it is — but notice the workflow:

1. The tests below are already written (red stage is done for you).
2. Your job is to make them all green by implementing \`add\`.`,
      starterCode: `function add(a, b) {
  // TODO: return the sum of a and b
}
`,
      solution: `function add(a, b) {
  return a + b;
}`,
      tests: [
        {
          name: "add(1, 2) === 3",
          code: `assertEquals(add(1, 2), 3);`,
        },
        {
          name: "add(0, 0) === 0",
          code: `assertEquals(add(0, 0), 0);`,
        },
        {
          name: "add(-1, 1) === 0",
          code: `assertEquals(add(-1, 1), 0);`,
        },
        {
          name: "add(100, 200) === 300",
          code: `assertEquals(add(100, 200), 300);`,
        },
      ],
      hints: [
        "The return keyword is required — `add` must produce a value.",
        "Use the `+` operator between `a` and `b`.",
      ],
      explanation: `\`return a + b\` is deliberately the simplest possible implementation.
In TDD, **simple is good at the green stage**. You haven't over-engineered,
and every test passes. If a future requirement changes, a new test will go red
first and guide the next change.`,
    },

    // ─── Lesson 3: Red before green ──────────────────────────────────────────
    {
      slug: "red-before-green",
      title: "Red Before Green",
      blurb: "See why a test must fail first before you trust its green.",
      xp: 30,
      content: `# Red Before Green

A test that was **never** red is suspicious — it could be passing for the wrong
reason (e.g. the assertion has a typo, or it always returns \`true\`).

Here's the TDD discipline: write the test, run it, watch it fail, **then** write
code to fix it.

In this lesson you'll practice the pattern by implementing \`multiply(a, b)\`.
The tests below represent the "red" specification someone wrote before the code
existed.

## Your task

Implement \`multiply(a, b)\` so all tests turn green.

A common beginner mistake is to return \`a + b\` — notice test 3 would catch that.`,
      starterCode: `function multiply(a, b) {
  // TODO: return the product of a and b
}
`,
      solution: `function multiply(a, b) {
  return a * b;
}`,
      tests: [
        {
          name: "multiply(3, 4) === 12",
          code: `assertEquals(multiply(3, 4), 12);`,
        },
        {
          name: "multiply(0, 99) === 0",
          code: `assertEquals(multiply(0, 99), 0);`,
        },
        {
          name: "multiply(2, 3) !== 5 (not add!)",
          code: `assert(multiply(2, 3) !== 5, "multiply should NOT return a+b");`,
        },
        {
          name: "multiply(-2, 3) === -6",
          code: `assertEquals(multiply(-2, 3), -6);`,
        },
      ],
      hints: [
        "Use the `*` operator.",
        "Test 3 checks that you're not accidentally adding — confirm your result is 6, not 5, for inputs 2 and 3.",
      ],
      explanation: `Test 3 is the interesting one: \`assert(multiply(2, 3) !== 5, ...)\`.
It would catch the mistake of writing \`return a + b\` instead of \`return a * b\`.
This is why each test should describe one specific expectation — even a
"negative" assertion can guard a common wrong answer.`,
    },

    // ─── Lesson 4: Testing edge cases ────────────────────────────────────────
    {
      slug: "edge-cases",
      title: "Testing Edge Cases",
      blurb: "Good tests cover happy path, empty input, and boundary values.",
      xp: 35,
      content: `# Testing Edge Cases

A unit test suite is only as good as its edge-case coverage.  Three categories
to always consider:

| Category | Example for a "max of array" function |
|----------|--------------------------------------|
| Happy path | \`maxOf([3, 1, 4, 1, 5])\` → \`5\` |
| Boundary | Single-element array \`[7]\` → \`7\` |
| Negative/empty | Empty array → \`-Infinity\` (or throw) |

## Your task

Implement \`maxOf(arr)\` — returns the largest number in an array.

- For an **empty array**, return \`-Infinity\`.
- For a **single element**, return that element.
- For multiple elements, return the maximum.

**Do not use** \`Math.max(...arr)\` — implement it with a loop or \`reduce\` so
you exercise the logic the tests are verifying.`,
      starterCode: `function maxOf(arr) {
  // TODO: return the largest number in arr, or -Infinity if empty
}
`,
      solution: `function maxOf(arr) {
  if (arr.length === 0) return -Infinity;
  return arr.reduce((max, n) => (n > max ? n : max), arr[0]);
}`,
      tests: [
        {
          name: "maxOf([3,1,4,1,5]) === 5",
          code: `assertEquals(maxOf([3, 1, 4, 1, 5]), 5);`,
        },
        {
          name: "maxOf([7]) === 7 (single element)",
          code: `assertEquals(maxOf([7]), 7);`,
        },
        {
          name: "maxOf([]) === -Infinity (empty array)",
          code: `assertEquals(maxOf([]), -Infinity);`,
        },
        {
          name: "maxOf([-3,-1,-9]) === -1 (all negatives)",
          code: `assertEquals(maxOf([-3, -1, -9]), -1);`,
        },
      ],
      hints: [
        "Handle the empty array case first with an early return.",
        "Use `reduce` starting with `arr[0]` as the initial max, comparing each element.",
        "For all-negatives, the reduce approach works correctly if you start with `arr[0]` (a negative number) not `0`.",
      ],
      explanation: `Starting reduce with \`arr[0]\` (not \`0\`) is key for all-negative arrays.
If you started with \`0\`, \`maxOf([-3, -1, -9])\` would return \`0\` — wrong.
The edge-case test (\`[-3,-1,-9] === -1\`) would have caught that during TDD.`,
    },

    // ─── Lesson 5: Refactor without breaking ─────────────────────────────────
    {
      slug: "refactor",
      title: "Refactor Without Breaking",
      blurb: "Clean up the implementation while keeping every test green.",
      xp: 35,
      content: `# Refactor Without Breaking

After going green, the TDD loop says **refactor** — improve the code's
readability or efficiency without changing its observable behaviour.

Your tests are your safety net: as long as they stay green, your refactor is
correct by definition.

## Your task

Below is a working but verbose implementation of \`capitalize(str)\` — it
converts the first letter of a string to upper-case and the rest to lower-case.

\`\`\`js
function capitalize(str) {
  if (str.length === 0) return "";
  var first = str[0].toUpperCase();
  var rest = "";
  for (var i = 1; i < str.length; i++) {
    rest = rest + str[i].toLowerCase();
  }
  return first + rest;
}
\`\`\`

**Refactor it** to a concise one-liner (or two lines) using string methods
\`toUpperCase\`, \`toLowerCase\`, \`slice\`.  All tests must still pass.`,
      starterCode: `// The verbose version is shown in the lesson above — your job is to
// refactor it. Rewrite capitalize as a concise one or two lines using
// toUpperCase, slice, and toLowerCase. Every test must still pass.
function capitalize(str) {
  // TODO: refactor to a concise implementation
}
`,
      solution: `function capitalize(str) {
  if (str.length === 0) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}`,
      tests: [
        {
          name: 'capitalize("hello") === "Hello"',
          code: `assertEquals(capitalize("hello"), "Hello");`,
        },
        {
          name: 'capitalize("WORLD") === "World"',
          code: `assertEquals(capitalize("WORLD"), "World");`,
        },
        {
          name: 'capitalize("") === "" (empty string)',
          code: `assertEquals(capitalize(""), "");`,
        },
        {
          name: 'capitalize("a") === "A" (single char)',
          code: `assertEquals(capitalize("a"), "A");`,
        },
      ],
      hints: [
        "`str[0].toUpperCase()` gives the capitalised first letter.",
        "`str.slice(1)` gives everything after the first character.",
        "Chain `.toLowerCase()` onto `str.slice(1)` and concatenate.",
      ],
      explanation: `\`str[0].toUpperCase() + str.slice(1).toLowerCase()\` replaces the entire
loop.  The tests didn't change — they described the contract, not the
implementation.  That's the power of the refactor step: the tests let you
improve code freely.`,
    },

    // ─── Lesson 6: Writing tests and code together ───────────────────────────
    {
      slug: "fizzbuzz-tdd",
      title: "FizzBuzz the TDD Way",
      blurb: "Implement FizzBuzz incrementally, one failing test at a time.",
      xp: 40,
      content: `# FizzBuzz the TDD Way

FizzBuzz is the classic interview exercise, but it's also a perfect TDD
kata because you can add requirements one test at a time:

1. Returns the number as a string by default.
2. Returns \`"Fizz"\` for multiples of 3.
3. Returns \`"Buzz"\` for multiples of 5.
4. Returns \`"FizzBuzz"\` for multiples of both 3 and 5.

In real TDD you'd add one test, make it red, then green, then move to the next.
Here all four tests are provided — implement \`fizzbuzz(n)\` so they all pass.

**Rules:**
- Input is a positive integer.
- \`"FizzBuzz"\` check must come before \`"Fizz"\` and \`"Buzz"\` to avoid a
  common order-of-checks bug.`,
      starterCode: `function fizzbuzz(n) {
  // TODO: implement FizzBuzz
  // 1. multiples of 15 → "FizzBuzz"
  // 2. multiples of 3  → "Fizz"
  // 3. multiples of 5  → "Buzz"
  // 4. otherwise       → String(n)
}
`,
      solution: `function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}`,
      tests: [
        {
          name: 'fizzbuzz(1) === "1"',
          code: `assertEquals(fizzbuzz(1), "1");`,
        },
        {
          name: 'fizzbuzz(9) === "Fizz"',
          code: `assertEquals(fizzbuzz(9), "Fizz");`,
        },
        {
          name: 'fizzbuzz(10) === "Buzz"',
          code: `assertEquals(fizzbuzz(10), "Buzz");`,
        },
        {
          name: 'fizzbuzz(15) === "FizzBuzz"',
          code: `assertEquals(fizzbuzz(15), "FizzBuzz");`,
        },
        {
          name: 'fizzbuzz(30) === "FizzBuzz"',
          code: `assertEquals(fizzbuzz(30), "FizzBuzz");`,
        },
      ],
      hints: [
        "Check `n % 15 === 0` FIRST — otherwise 15 would match the `n % 3` branch and return `\"Fizz\"` instead of `\"FizzBuzz\"`.",
        "Use `String(n)` (or `n.toString()`) for the default case.",
      ],
      explanation: `The order of checks matters: \`% 15\` must precede \`% 3\` and \`% 5\`.
In TDD, the \`fizzbuzz(15) === "FizzBuzz"\` test would turn red the moment you
got the order wrong — exactly the kind of logic bug tests are designed to catch.`,
    },

    // ─── Lesson 7: Test isolation with pure functions ────────────────────────
    {
      slug: "pure-functions",
      title: "Test Isolation with Pure Functions",
      blurb: "Functions with no side-effects are trivially testable.",
      xp: 40,
      content: `# Test Isolation with Pure Functions

A **pure function** always returns the same output for the same input and
produces no side effects (no mutations, no network calls, no global state).

Pure functions are the easiest to test because:
- No setup or teardown needed.
- No hidden state that changes between test runs.
- Each test call is independent.

## Your task

Write a pure function \`getDiscount(price, percent)\` that returns the final
price after applying a percentage discount.

- \`price\` is a number (original price in cents or dollars — consistent units).
- \`percent\` is a number like \`20\` (meaning 20%).
- Returns the discounted price **rounded to two decimal places**.
- If \`percent\` is 0, return \`price\` unchanged.
- If \`percent\` is 100, return \`0\`.

Use \`Math.round(value * 100) / 100\` for rounding.`,
      starterCode: `function getDiscount(price, percent) {
  // TODO: return price after applying percent% discount,
  //       rounded to two decimal places
}
`,
      solution: `function getDiscount(price, percent) {
  const discounted = price * (1 - percent / 100);
  return Math.round(discounted * 100) / 100;
}`,
      tests: [
        {
          name: "getDiscount(100, 20) === 80",
          code: `assertEquals(getDiscount(100, 20), 80);`,
        },
        {
          name: "getDiscount(50, 10) === 45",
          code: `assertEquals(getDiscount(50, 10), 45);`,
        },
        {
          name: "getDiscount(100, 0) === 100 (no discount)",
          code: `assertEquals(getDiscount(100, 0), 100);`,
        },
        {
          name: "getDiscount(100, 100) === 0 (full discount)",
          code: `assertEquals(getDiscount(100, 100), 0);`,
        },
        {
          name: "getDiscount(9.99, 10) === 8.99 (float rounding)",
          code: `assertEquals(getDiscount(9.99, 10), 8.99);`,
        },
      ],
      hints: [
        "The discount fraction is `percent / 100`, so the remaining fraction is `1 - percent / 100`.",
        "Multiply `price` by that remaining fraction to get the discounted price.",
        "`Math.round(x * 100) / 100` rounds to two decimal places.",
      ],
      explanation: `\`price * (1 - percent / 100)\` computes the discounted value in one expression.
The rounding step (\`Math.round(... * 100) / 100\`) handles floating-point
imprecision — without it, \`9.99 * 0.9\` returns \`8.991000000000001\` in JS.
The float-rounding test would catch that immediately.`,
    },

    // ─── Lesson 8: Testing objects / return shapes ───────────────────────────
    {
      slug: "testing-objects",
      title: "Testing Object Return Values",
      blurb: "Use JSON.stringify to assert on the shape of returned objects.",
      xp: 45,
      content: `# Testing Object Return Values

When a function returns an object, compare it with \`JSON.stringify\` to check
the whole shape at once:

\`\`\`js
assertEquals(
  JSON.stringify(getUser(1)),
  JSON.stringify({ id: 1, name: "Alice" })
);
\`\`\`

## Your task

Write \`parseName(fullName)\` that splits a full name string into parts.

- Input: a string like \`"Grace Hopper"\` or \`"Linus Benedict Torvalds"\`.
- Output: \`{ first, last }\` where \`first\` is the first word and \`last\` is the
  **last** word.
- Middle names are ignored.
- Assume at least two words separated by a single space.

Examples:
- \`"Grace Hopper"\` → \`{ first: "Grace", last: "Hopper" }\`
- \`"Linus Benedict Torvalds"\` → \`{ first: "Linus", last: "Torvalds" }\``,
      starterCode: `function parseName(fullName) {
  // TODO: return { first, last } from a full name string
}
`,
      solution: `function parseName(fullName) {
  const parts = fullName.split(" ");
  return { first: parts[0], last: parts[parts.length - 1] };
}`,
      tests: [
        {
          name: 'parseName("Grace Hopper") → {first:"Grace",last:"Hopper"}',
          code: `assertEquals(JSON.stringify(parseName("Grace Hopper")), JSON.stringify({ first: "Grace", last: "Hopper" }));`,
        },
        {
          name: 'parseName("Linus Benedict Torvalds") → {first:"Linus",last:"Torvalds"}',
          code: `assertEquals(JSON.stringify(parseName("Linus Benedict Torvalds")), JSON.stringify({ first: "Linus", last: "Torvalds" }));`,
        },
        {
          name: 'parseName("Ada Lovelace") → {first:"Ada",last:"Lovelace"}',
          code: `assertEquals(JSON.stringify(parseName("Ada Lovelace")), JSON.stringify({ first: "Ada", last: "Lovelace" }));`,
        },
      ],
      hints: [
        "`fullName.split(\" \")` returns an array of words.",
        "The first word is `parts[0]`, the last word is `parts[parts.length - 1]`.",
      ],
      explanation: `\`parts[parts.length - 1]\` always gives the last element regardless of how
many words are in the name.  Testing with both two-word and three-word names
ensures the middle-word case doesn't bleed into \`last\`.`,
    },

    // ─── Lesson 9: Mini TDD kata — stack ────────────────────────────────────
    {
      slug: "stack-kata",
      title: "Mini Kata: Build a Stack",
      blurb: "Implement a push/pop/peek stack guided entirely by failing tests.",
      xp: 50,
      content: `# Mini Kata: Build a Stack

A **stack** is a last-in-first-out (LIFO) data structure with three operations:

| Method | Behaviour |
|--------|-----------|
| \`push(value)\` | Add a value to the top |
| \`pop()\` | Remove and return the top value (return \`undefined\` if empty) |
| \`peek()\` | Return the top value without removing it (return \`undefined\` if empty) |
| \`size\` | Property — number of items currently in the stack |

## Your task

Implement a \`Stack\` class (or factory function) that satisfies all tests below.
This is the closest thing to a real TDD kata: the tests define the API contract,
your job is to make them green.

\`\`\`js
const s = new Stack();
s.push(1);
s.push(2);
s.peek(); // 2  — top of stack, not removed
s.pop();  // 2  — removed
s.size;   // 1  — one item remains
\`\`\``,
      starterCode: `class Stack {
  constructor() {
    // TODO: initialise internal storage
  }

  push(value) {
    // TODO: add value to top
  }

  pop() {
    // TODO: remove and return top, or undefined if empty
  }

  peek() {
    // TODO: return top without removing, or undefined if empty
  }

  get size() {
    // TODO: return number of items
  }
}
`,
      solution: `class Stack {
  constructor() {
    this._items = [];
  }

  push(value) {
    this._items.push(value);
  }

  pop() {
    return this._items.pop();
  }

  peek() {
    return this._items[this._items.length - 1];
  }

  get size() {
    return this._items.length;
  }
}`,
      tests: [
        {
          name: "new Stack() starts with size 0",
          code: `const s1 = new Stack(); assertEquals(s1.size, 0);`,
        },
        {
          name: "push increases size",
          code: `const s2 = new Stack(); s2.push(10); assertEquals(s2.size, 1);`,
        },
        {
          name: "pop returns top value",
          code: `const s3 = new Stack(); s3.push(1); s3.push(2); assertEquals(s3.pop(), 2);`,
        },
        {
          name: "pop decreases size",
          code: `const s4 = new Stack(); s4.push(1); s4.push(2); s4.pop(); assertEquals(s4.size, 1);`,
        },
        {
          name: "pop on empty returns undefined",
          code: `const s5 = new Stack(); assertEquals(s5.pop(), undefined);`,
        },
        {
          name: "peek returns top without removing",
          code: `const s6 = new Stack(); s6.push(7); assertEquals(s6.peek(), 7); assertEquals(s6.size, 1);`,
        },
        {
          name: "peek on empty returns undefined",
          code: `const s7 = new Stack(); assertEquals(s7.peek(), undefined);`,
        },
        {
          name: "LIFO order: last pushed is first popped",
          code: `const s8 = new Stack(); s8.push("a"); s8.push("b"); s8.push("c"); assertEquals(s8.pop(), "c"); assertEquals(s8.pop(), "b");`,
        },
      ],
      hints: [
        "Use an internal array `this._items = []` to store values.",
        "JavaScript's `Array.prototype.push` and `Array.prototype.pop` already work LIFO — delegate to them.",
        "`peek()` is `this._items[this._items.length - 1]`, which is `undefined` when the array is empty — no special case needed.",
        "A `get size()` getter returns `this._items.length`.",
      ],
      explanation: `Arrays are natural stacks: \`push\` adds to the end, \`pop\` removes from the
end — perfect LIFO.  Each test targets one behaviour in isolation (size,
push, pop, peek, empty cases, order).  If you had written this class first
and added tests after, you might have missed the empty-pop / empty-peek edge
cases.  TDD forces them into the spec up front.`,
    },
  ],
};
