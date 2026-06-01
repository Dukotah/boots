import type { Module } from "./types";

// Python Algorithms — classic problems in Python: factorial, FizzBuzz, primes,
// and counting. Runs in the browser via Pyodide; tests use `assert_equals`.
export const pythonAlgorithms: Module = {
  slug: "python-algorithms",
  title: "Python: Algorithms",
  description:
    "Put Python to work on classic problems: factorials, FizzBuzz, prime checks, and counting. The exercises every new programmer should be able to solve.",
  emoji: "🐍",
  gradient: "from-rose-400/20 to-pink-500/10",
  language: "py",
  tagline:
    "Practice classic Python algorithms: factorial, FizzBuzz, prime numbers, and counting vowels.",
  keywords: [
    "python algorithms",
    "python fizzbuzz",
    "python factorial",
    "python prime number",
  ],
  lessons: [
    {
      slug: "total",
      title: "Sum a List",
      blurb: "Add up the numbers.",
      xp: 30,
      content: `# Sum a List

Python's built-in \`sum()\` adds an iterable of numbers; an empty list sums to 0.

## Your task
Write \`total(nums)\` that returns the sum of the list.`,
      starterCode: `def total(nums):
    pass
`,
      solution: `def total(nums):
    return sum(nums)`,
      tests: [
        { name: "[1,2,3] → 6", code: `assert_equals(total([1, 2, 3]), 6)` },
        { name: "empty → 0", code: `assert_equals(total([]), 0)` },
      ],
    },
    {
      slug: "factorial",
      title: "Factorial",
      blurb: "n! with a loop.",
      xp: 40,
      content: `# Factorial

\`n!\` is the product \`1 × 2 × … × n\`, and \`0! = 1\`.

## Your task
Write \`factorial(n)\` that returns \`n!\` (n ≥ 0).`,
      starterCode: `def factorial(n):
    pass
`,
      solution: `def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`,
      tests: [
        { name: "5! = 120", code: `assert_equals(factorial(5), 120)` },
        { name: "0! = 1", code: `assert_equals(factorial(0), 1)` },
      ],
    },
    {
      slug: "fizzbuzz",
      title: "FizzBuzz",
      blurb: "The classic interview warmup.",
      xp: 45,
      content: `# FizzBuzz

For \`1\` to \`n\`: multiples of 3 → \`"Fizz"\`, of 5 → \`"Buzz"\`, of both →
\`"FizzBuzz"\`, otherwise the number itself. Check the both-case **first**.

## Your task
Write \`fizzbuzz(n)\` that returns the list for \`1..n\`. For example
\`fizzbuzz(5)\` → \`[1, 2, "Fizz", 4, "Buzz"]\`.`,
      starterCode: `def fizzbuzz(n):
    pass
`,
      solution: `def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(i)
    return out`,
      tests: [
        {
          name: "fizzbuzz(5)",
          code: `assert_equals(fizzbuzz(5), [1, 2, "Fizz", 4, "Buzz"])`,
        },
        {
          name: "includes FizzBuzz at 15",
          code: `assert_equals(fizzbuzz(15)[14], "FizzBuzz")`,
        },
      ],
    },
    {
      slug: "is-prime",
      title: "Prime Check",
      blurb: "Trial division up to √n.",
      xp: 45,
      content: `# Prime Check

A prime is only divisible by 1 and itself. You only need to test divisors up to
\`√n\` (i.e. while \`i * i <= n\`). Numbers below 2 are not prime.

## Your task
Write \`is_prime(n)\` returning \`True\` if \`n\` is prime, else \`False\`.`,
      starterCode: `def is_prime(n):
    pass
`,
      solution: `def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True`,
      tests: [
        { name: "7 is prime", code: `assert_equals(is_prime(7), True)` },
        { name: "9 is not", code: `assert_equals(is_prime(9), False)` },
        { name: "1 is not", code: `assert_equals(is_prime(1), False)` },
      ],
    },
    {
      slug: "count-vowels",
      title: "Count Vowels",
      blurb: "Tally letters with a condition.",
      xp: 35,
      content: `# Count Vowels

Loop the characters (lowercased) and count those in \`"aeiou"\`. A generator with
\`sum()\` makes it a one-liner.

## Your task
Write \`count_vowels(text)\` that returns how many vowels are in \`text\`
(case-insensitive).`,
      starterCode: `def count_vowels(text):
    pass
`,
      solution: `def count_vowels(text):
    return sum(1 for c in text.lower() if c in "aeiou")`,
      tests: [
        { name: '"Hello" → 2', code: `assert_equals(count_vowels("Hello"), 2)` },
        { name: '"xyz" → 0', code: `assert_equals(count_vowels("xyz"), 0)` },
        { name: '"AEIOU" → 5', code: `assert_equals(count_vowels("AEIOU"), 5)` },
      ],
    },
  ],
};
