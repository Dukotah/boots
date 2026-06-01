import type { Module } from "./types";

// Python: Lists, Dicts & Comprehensions — runs in-browser via Pyodide.
export const pythonData: Module = {
  slug: "python-data",
  title: "Python Lists & Dicts",
  description:
    "Work with Python's core data structures — lists, dictionaries, slicing, and list comprehensions. The bread and butter of everyday Python.",
  emoji: "📦",
  gradient: "from-sky-400/20 to-emerald-500/10",
  language: "py",
  tagline:
    "Learn Python lists, dictionaries, slicing, and list comprehensions with interactive exercises.",
  keywords: [
    "python lists",
    "python dictionaries",
    "python list comprehension",
    "python data structures",
    "learn python",
  ],
  lessons: [
    {
      slug: "indexing",
      title: "List Indexing",
      blurb: "Reach into a list by position.",
      xp: 30,
      content: `# List Indexing

Lists are ordered. \`items[0]\` is the first element; \`items[-1]\` is the last.

\`\`\`py
nums = [10, 20, 30]
print(nums[0], nums[-1])  # 10 30
\`\`\`

## Your task
Write \`first_last(items)\` that returns a new list \`[first, last]\` from the
given non-empty list.`,
      starterCode: `def first_last(items):
    pass
`,
      solution: `def first_last(items):
    return [items[0], items[-1]]`,
      tests: [
        { name: "[1,2,3] -> [1,3]", code: `assert_equals(first_last([1, 2, 3]), [1, 3])` },
        { name: "['a','b'] -> ['a','b']", code: `assert_equals(first_last(["a", "b"]), ["a", "b"])` },
      ],
    },
    {
      slug: "average",
      title: "sum() and len()",
      blurb: "Aggregate a list of numbers.",
      xp: 35,
      content: `# sum() and len()

\`sum(nums)\` adds a list of numbers; \`len(nums)\` counts them.

\`\`\`py
nums = [2, 4, 6]
print(sum(nums) / len(nums))  # 4.0
\`\`\`

## Your task
Write \`average(nums)\` that returns the mean of a non-empty list of numbers.`,
      starterCode: `def average(nums):
    pass
`,
      solution: `def average(nums):
    return sum(nums) / len(nums)`,
      tests: [
        { name: "[2,4,6] -> 4.0", code: `assert_equals(average([2, 4, 6]), 4.0)` },
        { name: "[10] -> 10.0", code: `assert_equals(average([10]), 10.0)` },
      ],
    },
    {
      slug: "dict-access",
      title: "Dictionaries",
      blurb: "Look up values by key.",
      xp: 35,
      content: `# Dictionaries

A dict maps keys to values. \`.get(key, default)\` avoids errors when a key is
missing.

\`\`\`py
ages = {"sam": 30}
print(ages.get("sam"))      # 30
print(ages.get("x", 0))     # 0
\`\`\`

## Your task
Write \`lookup(d, key)\` that returns the value for \`key\`, or the string
\`"unknown"\` if the key is not present.`,
      starterCode: `def lookup(d, key):
    pass
`,
      solution: `def lookup(d, key):
    return d.get(key, "unknown")`,
      tests: [
        { name: "present key", code: `assert_equals(lookup({"a": 1}, "a"), 1)` },
        { name: "missing key", code: `assert_equals(lookup({"a": 1}, "z"), "unknown")` },
      ],
    },
    {
      slug: "comprehension",
      title: "List Comprehensions",
      blurb: "Build a list in one expressive line.",
      xp: 40,
      content: `# List Comprehensions

A comprehension transforms a sequence into a new list compactly.

\`\`\`py
squares = [n * n for n in range(1, 4)]  # [1, 4, 9]
\`\`\`

## Your task
Write \`squares(n)\` that returns a list of the squares of \`1\` through \`n\`:
\`squares(3)\` returns \`[1, 4, 9]\`.`,
      starterCode: `def squares(n):
    pass
`,
      solution: `def squares(n):
    return [i * i for i in range(1, n + 1)]`,
      tests: [
        { name: "squares(3)", code: `assert_equals(squares(3), [1, 4, 9])` },
        { name: "squares(1)", code: `assert_equals(squares(1), [1])` },
      ],
    },
    {
      slug: "filter-evens",
      title: "Filtering",
      blurb: "Keep only the items you want.",
      xp: 40,
      content: `# Filtering

Add an \`if\` to a comprehension to keep only matching items.

\`\`\`py
evens = [x for x in [1, 2, 3, 4] if x % 2 == 0]  # [2, 4]
\`\`\`

## Your task
Write \`evens(nums)\` that returns a new list containing only the even numbers,
in their original order.`,
      starterCode: `def evens(nums):
    pass
`,
      solution: `def evens(nums):
    return [x for x in nums if x % 2 == 0]`,
      tests: [
        { name: "[1,2,3,4] -> [2,4]", code: `assert_equals(evens([1, 2, 3, 4]), [2, 4])` },
        { name: "no evens -> []", code: `assert_equals(evens([1, 3, 5]), [])` },
      ],
    },
    {
      slug: "sorting",
      title: "Sorting",
      blurb: "Order a list, ascending or descending.",
      xp: 40,
      content: `# Sorting

\`sorted(seq)\` returns a new sorted list; pass \`reverse=True\` for descending.

\`\`\`py
print(sorted([3, 1, 2]))               # [1, 2, 3]
print(sorted([3, 1, 2], reverse=True)) # [3, 2, 1]
\`\`\`

## Your task
Write \`top_three(nums)\` that returns the three largest numbers, highest first.
\`top_three([5, 1, 9, 3, 7])\` returns \`[9, 7, 5]\`.`,
      starterCode: `def top_three(nums):
    pass
`,
      solution: `def top_three(nums):
    return sorted(nums, reverse=True)[:3]`,
      tests: [
        { name: "picks top 3", code: `assert_equals(top_three([5, 1, 9, 3, 7]), [9, 7, 5])` },
        { name: "already sorted", code: `assert_equals(top_three([3, 2, 1]), [3, 2, 1])` },
      ],
    },
  ],
};
