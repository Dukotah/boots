import type { Module } from "./types";

// Unit Testing Fundamentals — writing assertions, AAA pattern, test isolation,
// and the red-green-refactor cycle using Python's stdlib unittest patterns.
// Runs entirely client-side via Pyodide.
export const unitTestingFundamentals: Module = {
  slug: "unit-testing-fundamentals",
  title: "Unit Testing Fundamentals",
  description:
    "Learn to write reliable Python tests from scratch: assertions, the Arrange-Act-Assert pattern, test isolation, exception testing, and the red-green-refactor cycle — all using Python's built-in tools.",
  emoji: "🧪",
  gradient: "from-green-400/20 to-emerald-500/10",
  language: "py",
  tagline:
    "Master unit testing in Python: assertions, AAA pattern, test isolation, and red-green-refactor using stdlib unittest.",
  keywords: [
    "python unit testing",
    "python unittest",
    "test driven development",
    "python assertions",
    "AAA pattern",
    "red green refactor",
    "beginner python testing",
  ],
  lessons: [
    {
      slug: "what-is-a-unit-test",
      title: "What Is a Unit Test?",
      blurb: "A unit test checks one small piece of code in isolation.",
      xp: 20,
      kind: "quiz",
      content: `# What Is a Unit Test?

A **unit test** is a short piece of code that checks whether a single function
(or "unit") behaves correctly.  Instead of running your whole program and
eyeballing the output, unit tests give you automatic, repeatable proof.

\`\`\`py
def add(a, b):
    return a + b

# A simple unit test:
assert add(2, 3) == 5, "add(2, 3) should be 5"
\`\`\`

## Why bother?

- **Catch bugs early** — the moment you break something, a test fails loudly.
- **Document intent** — tests describe what a function is *supposed* to do.
- **Refactor safely** — change the internals without fear, as long as tests stay green.

## The three questions every unit test answers

1. **What are you testing?** (the function under test)
2. **What input are you giving it?** (the test case)
3. **What output do you expect?** (the assertion)`,
      questions: [
        {
          prompt: "What is the primary goal of a unit test?",
          options: [
            "Make the program run faster",
            "Check that one small function behaves correctly in isolation",
            "Replace all comments in your code",
          ],
          answer: 1,
          explanation:
            "Unit tests verify the behaviour of a single function (unit) so bugs are caught early and automatically.",
        },
        {
          prompt: "Which of these is a benefit of writing unit tests?",
          options: [
            "You never need to think about edge cases",
            "You can refactor code safely because tests catch regressions",
            "Tests make code run without errors by default",
          ],
          answer: 1,
          explanation:
            "When tests are green you can confidently refactor internals — if something breaks, a test will fail immediately.",
        },
        {
          prompt: "A 'unit' in unit testing refers to:",
          options: [
            "The entire application",
            "A database table",
            "A small, isolated piece of code — typically a single function",
          ],
          answer: 2,
          explanation:
            "Unit testing focuses on the smallest testable piece — usually one function — tested in isolation from the rest of the system.",
        },
      ],
    },
    {
      slug: "first-assertion",
      title: "Your First Assertion",
      blurb: "Use assert to prove a function returns the right value.",
      xp: 25,
      content: `# Your First Assertion

The simplest way to test Python code is the built-in \`assert\` statement.
It raises an \`AssertionError\` if the condition is \`False\`.

\`\`\`py
assert 1 + 1 == 2          # passes silently
assert 1 + 1 == 3          # raises AssertionError
assert 1 + 1 == 3, "math is broken"  # with a message
\`\`\`

Testing platforms (including this one) also provide a helper:

\`\`\`py
assert_equals(actual, expected)
# equivalent to: assert actual == expected
\`\`\`

## Your task

Write a function \`add(a, b)\` that returns the sum of two numbers.
Then the built-in tests will call \`assert_equals\` on it for you.`,
      starterCode: `def add(a, b):
    # return the sum of a and b
    pass
`,
      solution: `def add(a, b):
    return a + b`,
      tests: [
        { name: "add(2, 3) → 5", code: `assert_equals(add(2, 3), 5)` },
        { name: "add(-1, 1) → 0", code: `assert_equals(add(-1, 1), 0)` },
        { name: "add(0, 0) → 0", code: `assert_equals(add(0, 0), 0)` },
      ],
      hints: [
        "The function body should simply `return a + b`.",
      ],
      explanation:
        "`assert_equals(actual, expected)` checks that the two values are equal. If they differ it raises an error with a descriptive message — much nicer than a plain `AssertionError`.",
    },
    {
      slug: "aaa-pattern",
      title: "Arrange – Act – Assert",
      blurb: "Structure every test in three clear steps.",
      xp: 30,
      content: `# Arrange – Act – Assert (AAA)

Professional tests follow a three-step pattern that keeps them readable:

| Step | What you do |
|------|-------------|
| **Arrange** | Set up inputs and any required state |
| **Act** | Call the function under test |
| **Assert** | Check the result matches expectations |

\`\`\`py
# Arrange
numbers = [3, 1, 4, 1, 5]

# Act
result = max(numbers)

# Assert
assert result == 5
\`\`\`

Separating the three steps makes it immediately clear *what* is being tested
and *why* a failure matters.

## Your task

Write a function \`is_even(n)\` that returns \`True\` when \`n\` is even and
\`False\` otherwise.  The tests below follow the AAA pattern.`,
      starterCode: `def is_even(n):
    # return True if n is even, False otherwise
    pass
`,
      solution: `def is_even(n):
    return n % 2 == 0`,
      tests: [
        {
          name: "is_even(4) → True",
          code: `# Arrange
n = 4
# Act
result = is_even(n)
# Assert
assert_equals(result, True)`,
        },
        {
          name: "is_even(7) → False",
          code: `n = 7
result = is_even(n)
assert_equals(result, False)`,
        },
        {
          name: "is_even(0) → True",
          code: `n = 0
result = is_even(n)
assert_equals(result, True)`,
        },
      ],
      hints: [
        "Use the modulo operator: `n % 2 == 0` is `True` for even numbers.",
      ],
      explanation:
        "The AAA pattern keeps tests short and scannable. When a test fails you can immediately see what was arranged, what action caused the failure, and what assertion was violated.",
    },
    {
      slug: "test-equality",
      title: "Testing with Different Types",
      blurb: "assert_equals works with numbers, strings, lists, and booleans.",
      xp: 30,
      content: `# Testing with Different Types

\`assert_equals\` (and plain \`assert\`) work with any Python value — not just
integers.  You can test floats, strings, lists, and booleans.

\`\`\`py
assert_equals("hello".upper(), "HELLO")
assert_equals([1, 2] + [3], [1, 2, 3])
assert_equals(round(3.14159, 2), 3.14)
\`\`\`

> **Tip for floats:** avoid \`==\` on raw floating-point arithmetic results
> when precision matters.  Use \`round()\` to compare to a fixed decimal place.

## Your task

Write \`celsius_to_fahrenheit(c)\` that converts Celsius to Fahrenheit using
the formula: **F = C × 9/5 + 32**.

Return the result as a \`float\`.`,
      starterCode: `def celsius_to_fahrenheit(c):
    # F = C * 9/5 + 32
    pass
`,
      solution: `def celsius_to_fahrenheit(c):
    return c * 9 / 5 + 32`,
      tests: [
        {
          name: "0 °C → 32.0 °F (freezing point)",
          code: `assert_equals(celsius_to_fahrenheit(0), 32.0)`,
        },
        {
          name: "100 °C → 212.0 °F (boiling point)",
          code: `assert_equals(celsius_to_fahrenheit(100), 212.0)`,
        },
        {
          name: "-40 °C → -40.0 °F (the crossover point)",
          code: `assert_equals(celsius_to_fahrenheit(-40), -40.0)`,
        },
      ],
      hints: [
        "The formula is `c * 9 / 5 + 32`. Python's `/` always returns a float.",
      ],
      explanation:
        "The three test cases cover a zero point, a large positive value, and the famous -40 crossover where Celsius and Fahrenheit are equal. Multiple cases increase confidence that the formula is correct, not just lucky for one value.",
    },
    {
      slug: "test-exceptions",
      title: "Testing That Errors Are Raised",
      blurb: "Good code raises exceptions on bad input — test that too.",
      xp: 35,
      content: `# Testing That Errors Are Raised

A well-written function raises an exception instead of silently returning a
wrong answer when given bad input.  You should test that behaviour too.

In plain Python you can check for a raised exception with a \`try/except\`:

\`\`\`py
raised = False
try:
    risky_function(bad_input)
except ValueError:
    raised = True

assert raised, "Expected ValueError was not raised"
\`\`\`

Or more concisely using \`unittest.TestCase.assertRaises\` (covered later), but
the try/except approach works everywhere, including Pyodide.

## Your task

Write \`safe_divide(a, b)\` that:
- Returns \`a / b\` (as a float) when \`b != 0\`
- Raises \`ValueError("Cannot divide by zero")\` when \`b == 0\``,
      starterCode: `def safe_divide(a, b):
    # raise ValueError if b is 0, otherwise return a / b
    pass
`,
      solution: `def safe_divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b`,
      tests: [
        {
          name: "safe_divide(10, 2) → 5.0",
          code: `assert_equals(safe_divide(10, 2), 5.0)`,
        },
        {
          name: "safe_divide(9, 3) → 3.0",
          code: `assert_equals(safe_divide(9, 3), 3.0)`,
        },
        {
          name: "safe_divide(x, 0) raises ValueError",
          code: `raised = False
try:
    safe_divide(5, 0)
except ValueError:
    raised = True
assert raised, "Expected ValueError when dividing by zero"`,
        },
      ],
      hints: [
        "Check `if b == 0:` first, then `raise ValueError(...)`, then `return a / b`.",
      ],
      explanation:
        "Testing the error path is just as important as the happy path. If `safe_divide` silently returned `None` or `0` on division by zero, callers would get subtle bugs instead of a clear error message.",
    },
    {
      slug: "test-isolation",
      title: "Test Isolation — No Shared State",
      blurb: "Each test must set up its own state or results become unreliable.",
      xp: 40,
      content: `# Test Isolation — No Shared State

Tests that share state can **interfere with each other** — a passing test today
can cause a different test to fail tomorrow if run in a different order.

**Bad:** two tests share a single list object.

\`\`\`py
items = []          # shared — dangerous!

# Test A appends, then Test B checks length.
# If Test A never ran, Test B gives the wrong answer.
\`\`\`

**Good:** each test creates its own fresh object.

\`\`\`py
def test_a():
    items = []      # local — isolated
    items.append(1)
    assert len(items) == 1
\`\`\`

## Your task

Write a \`BankAccount\` class with:
- \`__init__(self)\` — starts with \`balance = 0\`
- \`deposit(self, amount)\` — adds \`amount\` to the balance
- \`withdraw(self, amount)\` — subtracts \`amount\` from the balance

Each test below creates its **own** \`BankAccount\` instance to stay isolated.`,
      starterCode: `class BankAccount:
    def __init__(self):
        # set self.balance to 0
        pass

    def deposit(self, amount):
        # add amount to self.balance
        pass

    def withdraw(self, amount):
        # subtract amount from self.balance
        pass
`,
      solution: `class BankAccount:
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount`,
      tests: [
        {
          name: "fresh account starts at 0",
          code: `account = BankAccount()
assert_equals(account.balance, 0)`,
        },
        {
          name: "deposit increases balance",
          code: `account = BankAccount()
account.deposit(100)
assert_equals(account.balance, 100)`,
        },
        {
          name: "withdraw decreases balance",
          code: `account = BankAccount()
account.deposit(200)
account.withdraw(50)
assert_equals(account.balance, 150)`,
        },
        {
          name: "multiple deposits accumulate",
          code: `account = BankAccount()
account.deposit(30)
account.deposit(20)
assert_equals(account.balance, 50)`,
        },
      ],
      hints: [
        "In `__init__`, write `self.balance = 0`.",
        "In `deposit`, write `self.balance += amount`.",
        "In `withdraw`, write `self.balance -= amount`.",
      ],
      explanation:
        "Every test creates a brand-new `BankAccount()`. This means no test can accidentally pollute another. If tests shared one account object, deposits in one test would affect the balance checks in every later test.",
    },
    {
      slug: "red-green-refactor",
      title: "Red – Green – Refactor",
      blurb: "The TDD loop: write a failing test, make it pass, then clean up.",
      xp: 25,
      kind: "quiz",
      content: `# Red – Green – Refactor

**Test-Driven Development (TDD)** is a workflow where you write the test
*before* the code.  It follows three short steps repeated in a loop:

\`\`\`
RED    → Write a test. It fails because the code doesn't exist yet.
GREEN  → Write just enough code to make the test pass.
REFACTOR → Clean up the code without changing its behaviour.
           Tests must still be green after refactoring.
\`\`\`

### Why write the test first?

- Forces you to think about **what** the function should do before **how**.
- The failing test proves the test is actually checking something real.
- "Refactor" is safe because green tests catch any mistake immediately.

### Example

\`\`\`py
# RED: write a failing test
assert multiply(3, 4) == 12   # NameError — multiply doesn't exist yet

# GREEN: write the minimum code
def multiply(a, b):
    return a * b              # test passes

# REFACTOR: nothing to clean up here — done!
\`\`\``,
      questions: [
        {
          prompt: "In TDD, what does the 'Red' step mean?",
          options: [
            "Delete all existing tests",
            "Write a test that fails because the code does not exist yet",
            "Paint your editor theme red for inspiration",
          ],
          answer: 1,
          explanation:
            "Red means the test fails (most test runners show failures in red). Writing a failing test first proves it is really checking something.",
        },
        {
          prompt: "What is the goal of the 'Green' step?",
          options: [
            "Write the cleanest, most elegant code possible",
            "Write just enough code to make the failing test pass",
            "Refactor existing tests",
          ],
          answer: 1,
          explanation:
            "In the Green step you write the *minimum* code needed to turn the red test green. Premature elegance belongs in the Refactor step.",
        },
        {
          prompt: "After refactoring, what must be true?",
          options: [
            "All tests must still pass (still green)",
            "At least one test must fail to show something changed",
            "You should delete the tests you wrote",
          ],
          answer: 0,
          explanation:
            "Refactoring means improving code structure without changing behaviour. If any test turns red, you introduced a regression.",
        },
        {
          prompt: "Why is it useful to see a test fail (Red) before making it pass?",
          options: [
            "Failing tests earn more XP",
            "It proves the test is actually checking something — a test that never fails could be broken",
            "It forces you to restart your computer",
          ],
          answer: 1,
          explanation:
            "A test that never fails might be vacuously passing (e.g., `assert True`). Seeing it go red first confirms it is really verifying the function's behaviour.",
        },
      ],
    },
    {
      slug: "multiple-test-cases",
      title: "Covering Edge Cases",
      blurb: "One test is good. Several tests covering edge cases are better.",
      xp: 45,
      content: `# Covering Edge Cases

A single passing test only proves the code works for *one* input.  Professional
tests cover:

- **Normal cases** — typical expected input
- **Edge cases** — boundaries, empty values, zero, negative numbers
- **Known tricky cases** — inputs that have caused bugs before

\`\`\`py
# Testing a string-reversal function:
assert_equals(reverse("hello"), "olleh")   # normal
assert_equals(reverse(""),      "")        # empty string edge case
assert_equals(reverse("a"),     "a")       # single character edge case
assert_equals(reverse("racecar"), "racecar")  # palindrome (same forwards/back)
\`\`\`

## Your task

Write \`is_palindrome(s)\` that returns \`True\` if the string reads the same
forwards and backwards, \`False\` otherwise.

> **Hint:** Python's slice \`s[::-1]\` reverses a string.`,
      starterCode: `def is_palindrome(s):
    # return True if s reads the same forwards and backwards
    pass
`,
      solution: `def is_palindrome(s):
    return s == s[::-1]`,
      tests: [
        {
          name: '"racecar" is a palindrome',
          code: `assert_equals(is_palindrome("racecar"), True)`,
        },
        {
          name: '"hello" is not a palindrome',
          code: `assert_equals(is_palindrome("hello"), False)`,
        },
        {
          name: 'empty string "" is a palindrome',
          code: `assert_equals(is_palindrome(""), True)`,
        },
        {
          name: 'single character "a" is a palindrome',
          code: `assert_equals(is_palindrome("a"), True)`,
        },
        {
          name: '"madam" is a palindrome',
          code: `assert_equals(is_palindrome("madam"), True)`,
        },
      ],
      hints: [
        "Reverse the string with `s[::-1]` and compare it to the original with `==`.",
      ],
      explanation:
        "Five tests cover: a classic palindrome, a non-palindrome, the empty-string edge case, a single-character edge case, and a second palindrome to rule out lucky coincidences. Together they give high confidence the logic is correct.",
    },
  ],
};
