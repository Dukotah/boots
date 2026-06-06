import type { Module } from "./types";

// Python Generators & Iterators — lazy sequences, yield, next(), and itertools.
// Runs in the browser via Pyodide (CPython → WASM).
export const pythonGenerators: Module = {
  slug: "python-generators",
  title: "Python: Generators & Iterators",
  description:
    "Unlock lazy evaluation with generators — produce values on demand, build infinite sequences, and pipeline data without loading everything into memory.",
  emoji: "⚡",
  gradient: "from-yellow-400/20 to-amber-500/10",
  language: "py",
  tagline:
    "Learn Python generators: yield, generator expressions, next(), and building pipelines with itertools.",
  keywords: [
    "python generators",
    "python yield",
    "python iterators",
    "python itertools",
    "python lazy evaluation",
  ],
  lessons: [
    {
      slug: "first-generator",
      title: "Your First Generator",
      blurb: "Use yield to produce values one at a time.",
      xp: 35,
      content: `# Your First Generator

A **generator function** uses \`yield\` instead of \`return\`. Calling it returns a
**generator object** — values are produced lazily on each \`next()\` call.

\`\`\`py
def count_up(n):
    for i in range(n):
        yield i

list(count_up(3))  # [0, 1, 2]
\`\`\`

## Your task
Write a generator function \`squares(n)\` that yields the squares of the numbers
\`1\` through \`n\` inclusive (e.g. \`n=4\` → \`1, 4, 9, 16\`).`,
      starterCode: `def squares(n):
    # yield squares of 1 to n
    pass
`,
      solution: `def squares(n):
    for i in range(1, n + 1):
        yield i * i`,
      tests: [
        { name: "squares(4) → [1,4,9,16]", code: `assert_equals(list(squares(4)), [1, 4, 9, 16])` },
        { name: "squares(1) → [1]", code: `assert_equals(list(squares(1)), [1])` },
        { name: "squares(0) → []", code: `assert_equals(list(squares(0)), [])` },
      ],
    },
    {
      slug: "next-and-stopiteration",
      title: "next() and StopIteration",
      blurb: "Pull values manually from a generator.",
      xp: 35,
      content: `# next() and StopIteration

Use \`next(gen)\` to pull one value at a time.  When the generator is exhausted it
raises \`StopIteration\`.  You can also pass a **default** to avoid the exception.

\`\`\`py
def two_items():
    yield "a"
    yield "b"

g = two_items()
next(g)  # "a"
next(g)  # "b"
next(g, "done")  # "done"  (no StopIteration)
\`\`\`

## Your task
Write a generator \`first_three()\` that yields the strings \`"one"\`, \`"two"\`,
\`"three"\` — nothing else.  Then write a function \`get_second()\` that creates a
fresh \`first_three\` generator and returns the **second** value using \`next()\`.`,
      starterCode: `def first_three():
    # yield "one", "two", "three"
    pass

def get_second():
    # return the second value from first_three()
    pass
`,
      solution: `def first_three():
    yield "one"
    yield "two"
    yield "three"

def get_second():
    g = first_three()
    next(g)
    return next(g)`,
      tests: [
        { name: 'get_second() → "two"', code: `assert_equals(get_second(), "two")` },
        {
          name: "first_three yields all three",
          code: `assert_equals(list(first_three()), ["one", "two", "three"])`,
        },
      ],
    },
    {
      slug: "infinite-generator",
      title: "Infinite Sequences",
      blurb: "A generator that never stops — until you do.",
      xp: 45,
      content: `# Infinite Sequences

A generator can loop forever — callers decide when to stop consuming.

\`\`\`py
def natural_numbers():
    n = 1
    while True:
        yield n
        n += 1
\`\`\`

Use \`itertools.islice\` or a manual loop with a \`break\` to take only what you need.

## Your task
Write a generator \`fibonacci()\` that yields the Fibonacci sequence indefinitely
(1, 1, 2, 3, 5, 8 …).  Then write \`first_n_fibs(n)\` that returns the first \`n\`
Fibonacci numbers as a list.`,
      starterCode: `def fibonacci():
    # yield 1, 1, 2, 3, 5, 8, ... forever
    pass

def first_n_fibs(n):
    # return first n values from fibonacci()
    pass
`,
      solution: `def fibonacci():
    a, b = 1, 1
    while True:
        yield a
        a, b = b, a + b

def first_n_fibs(n):
    result = []
    gen = fibonacci()
    for _ in range(n):
        result.append(next(gen))
    return result`,
      tests: [
        {
          name: "first 7 fibs",
          code: `assert_equals(first_n_fibs(7), [1, 1, 2, 3, 5, 8, 13])`,
        },
        { name: "first_n_fibs(1) → [1]", code: `assert_equals(first_n_fibs(1), [1])` },
        { name: "first_n_fibs(0) → []", code: `assert_equals(first_n_fibs(0), [])` },
      ],
    },
    {
      slug: "generator-expressions",
      title: "Generator Expressions",
      blurb: "Compact lazy sequences without def.",
      xp: 35,
      content: `# Generator Expressions

A **generator expression** is like a list comprehension but with \`()\` instead of
\`[]\`.  It is lazy — values are produced on demand, not stored all at once.

\`\`\`py
evens = (x for x in range(10) if x % 2 == 0)
list(evens)  # [0, 2, 4, 6, 8]
\`\`\`

## Your task
Write a function \`even_squares(n)\` that returns a generator expression yielding
the squares of all even numbers from \`0\` to \`n - 1\` (i.e. where \`x % 2 == 0\`).`,
      starterCode: `def even_squares(n):
    # return a generator expression: squares of even numbers in range(n)
    pass
`,
      solution: `def even_squares(n):
    return (x * x for x in range(n) if x % 2 == 0)`,
      tests: [
        {
          name: "even_squares(10) → [0,4,16,36,64]",
          code: `assert_equals(list(even_squares(10)), [0, 4, 16, 36, 64])`,
        },
        { name: "even_squares(1) → [0]", code: `assert_equals(list(even_squares(1)), [0])` },
      ],
    },
    {
      slug: "yield-from",
      title: "Delegating with yield from",
      blurb: "Flatten nested iterables effortlessly.",
      xp: 45,
      content: `# Delegating with yield from

\`yield from iterable\` yields every value from an iterable — flattening one level
of nesting and letting you compose generators cleanly.

\`\`\`py
def chain(a, b):
    yield from a
    yield from b

list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]
\`\`\`

## Your task
Write a generator \`flatten(nested)\` that accepts a list of lists and yields every
element from each inner list in order — one level of flattening only.`,
      starterCode: `def flatten(nested):
    # yield from each inner list
    pass
`,
      solution: `def flatten(nested):
    for inner in nested:
        yield from inner`,
      tests: [
        {
          name: "flattens one level",
          code: `assert_equals(list(flatten([[1, 2], [3], [4, 5]])), [1, 2, 3, 4, 5])`,
        },
        { name: "empty input → []", code: `assert_equals(list(flatten([])), [])` },
        {
          name: "single inner list",
          code: `assert_equals(list(flatten([[10, 20]])), [10, 20])`,
        },
      ],
    },
    {
      slug: "generator-pipeline",
      title: "Generator Pipelines",
      blurb: "Chain generators to process data lazily.",
      xp: 50,
      content: `# Generator Pipelines

Because generators are lazy, you can chain them into a **pipeline**: each stage
transforms values from the previous one without materialising the whole sequence.

\`\`\`py
def numbers():
    yield from range(10)

def doubled(source):
    for n in source:
        yield n * 2

list(doubled(numbers()))  # [0, 2, 4, 6, ...]
\`\`\`

## Your task
Write three generators that form a pipeline:
1. \`integers(n)\` — yields \`0\` through \`n - 1\`.
2. \`only_odd(source)\` — yields values from \`source\` where \`value % 2 != 0\`.
3. \`squared(source)\` — yields each value from \`source\` squared.

Then write \`odd_squares(n)\` that wires them together and returns a list.`,
      starterCode: `def integers(n):
    pass

def only_odd(source):
    pass

def squared(source):
    pass

def odd_squares(n):
    # chain: integers → only_odd → squared, return as list
    pass
`,
      solution: `def integers(n):
    yield from range(n)

def only_odd(source):
    for v in source:
        if v % 2 != 0:
            yield v

def squared(source):
    for v in source:
        yield v * v

def odd_squares(n):
    return list(squared(only_odd(integers(n))))`,
      tests: [
        {
          name: "odd_squares(10) → [1,9,25,49,81]",
          code: `assert_equals(odd_squares(10), [1, 9, 25, 49, 81])`,
        },
        { name: "odd_squares(2) → [1]", code: `assert_equals(odd_squares(2), [1])` },
        { name: "odd_squares(1) → []", code: `assert_equals(odd_squares(1), [])` },
      ],
    },
  ],
};
