import type { Module } from "./types";

// Python Itertools — chain, islice, groupby, combinations, product, accumulate.
// Runs in the browser via Pyodide (CPython → WASM).
export const pythonItertools: Module = {
  slug: "python-itertools",
  title: "Python: Itertools",
  description:
    "Master Python's itertools library — chain, islice, groupby, combinations, product, and accumulate. Write faster, more expressive code by composing lazy iterators instead of building loops by hand.",
  emoji: "⛓️",
  gradient: "from-violet-400/20 to-indigo-500/10",
  language: "py",
  tagline:
    "Learn Python itertools: chain, islice, groupby, combinations, product, and accumulate for competitive and production Python.",
  keywords: [
    "python itertools",
    "python chain islice groupby",
    "python combinations product",
    "python accumulate",
    "python lazy iterators",
  ],
  lessons: [
    // ── 1. chain ──────────────────────────────────────────────────────────────
    {
      slug: "chain",
      title: "chain — Glue Iterables Together",
      blurb: "Treat multiple sequences as one continuous stream.",
      xp: 25,
      content: `# chain — Glue Iterables Together

\`itertools.chain\` concatenates any number of iterables lazily — no new list is
created until you consume the iterator.

\`\`\`py
from itertools import chain

list(chain([1, 2], [3, 4], [5]))  # [1, 2, 3, 4, 5]
\`\`\`

You can also use \`chain.from_iterable\` to flatten one level of nesting when you
have an iterable of iterables:

\`\`\`py
list(chain.from_iterable([[1, 2], [3, 4]]))  # [1, 2, 3, 4]
\`\`\`

## Your task

Write a function \`flatten_one(lists)\` that takes a list of lists and returns a
single flat list by using \`chain.from_iterable\`.`,
      starterCode: `from itertools import chain

def flatten_one(lists):
    # use chain.from_iterable to flatten one level
    pass
`,
      solution: `from itertools import chain

def flatten_one(lists):
    return list(chain.from_iterable(lists))`,
      tests: [
        {
          name: "flattens basic nested list",
          code: `assert_equals(flatten_one([[1, 2], [3, 4]]), [1, 2, 3, 4])`,
        },
        {
          name: "handles empty inner lists",
          code: `assert_equals(flatten_one([[1], [], [2, 3]]), [1, 2, 3])`,
        },
        {
          name: "empty outer list returns empty",
          code: `assert_equals(flatten_one([]), [])`,
        },
        {
          name: "strings are treated as sequences",
          code: `assert_equals(flatten_one([["a", "b"], ["c"]]), ["a", "b", "c"])`,
        },
      ],
      hints: [
        "Import chain from itertools at the top of your code.",
        "chain.from_iterable takes a single iterable-of-iterables argument.",
        "Wrap the result in list() to get a concrete list back.",
      ],
      explanation: `\`chain.from_iterable(lists)\` is equivalent to \`chain(*lists)\` but avoids
unpacking a potentially huge list at once, making it memory-efficient for large
inputs. Always prefer it when you already have an iterable of iterables.`,
    },

    // ── 2. islice ─────────────────────────────────────────────────────────────
    {
      slug: "islice",
      title: "islice — Lazy Slicing",
      blurb: "Slice any iterator without materialising it.",
      xp: 25,
      content: `# islice — Lazy Slicing

Python's built-in slice notation (\`seq[start:stop:step]\`) only works on
sequences that support random access.  \`itertools.islice\` gives you the same
power for any iterator, lazily.

\`\`\`py
from itertools import islice

def count_up():
    n = 0
    while True:
        yield n
        n += 1

list(islice(count_up(), 5))        # [0, 1, 2, 3, 4]
list(islice(count_up(), 2, 6))     # [2, 3, 4, 5]
list(islice(count_up(), 0, 10, 2)) # [0, 2, 4, 6, 8]
\`\`\`

Signature: \`islice(iterable, stop)\` or \`islice(iterable, start, stop[, step])\`.

## Your task

Write a function \`every_other(iterable)\` that returns a list of every
**second** element (indices 1, 3, 5, …) from the iterable using \`islice\`.`,
      starterCode: `from itertools import islice

def every_other(iterable):
    # return elements at indices 1, 3, 5, ... using islice with start=1, step=2
    pass
`,
      solution: `from itertools import islice

def every_other(iterable):
    return list(islice(iterable, 1, None, 2))`,
      tests: [
        {
          name: "picks indices 1, 3, 5",
          code: `assert_equals(every_other([10, 20, 30, 40, 50, 60]), [20, 40, 60])`,
        },
        {
          name: "works on odd-length input",
          code: `assert_equals(every_other([1, 2, 3, 4, 5]), [2, 4])`,
        },
        {
          name: "single element returns empty",
          code: `assert_equals(every_other([99]), [])`,
        },
        {
          name: "empty iterable returns empty",
          code: `assert_equals(every_other([]), [])`,
        },
      ],
      hints: [
        "islice(iterable, start, stop, step) — pass None for stop to go to the end.",
        "To start at index 1 and take every second element, use start=1, stop=None, step=2.",
      ],
      explanation: `\`islice(iterable, 1, None, 2)\` starts at index 1 and advances by 2 each time,
yielding indices 1, 3, 5, …. \`None\` as the stop argument means "go to the end",
mirroring Python's \`seq[1::2]\` slice on lists.`,
    },

    // ── 3. groupby ────────────────────────────────────────────────────────────
    {
      slug: "groupby",
      title: "groupby — Consecutive Groups",
      blurb: "Cluster sorted data by a key in one pass.",
      xp: 35,
      content: `# groupby — Consecutive Groups

\`itertools.groupby\` splits an iterable into runs of consecutive elements that
share the same key.  **The input must be sorted (or pre-grouped) by that key**,
otherwise you'll get multiple groups for the same key value.

\`\`\`py
from itertools import groupby

data = [("a", 1), ("a", 2), ("b", 3), ("b", 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# a [('a', 1), ('a', 2)]
# b [('b', 3), ('b', 4)]
\`\`\`

Each \`group\` is an iterator — consume it before the next iteration or it will
be exhausted.

## Your task

Write \`group_counts(words)\` that takes a **sorted** list of strings and returns
a dict mapping each unique word to how many times it appears consecutively, using
\`groupby\`.`,
      starterCode: `from itertools import groupby

def group_counts(words):
    # iterate groupby(words), collect {key: len(list(group))} into a dict
    pass
`,
      solution: `from itertools import groupby

def group_counts(words):
    return {key: len(list(group)) for key, group in groupby(words)}`,
      tests: [
        {
          name: "counts consecutive runs",
          code: `assert_equals(group_counts(["a", "a", "b", "c", "c", "c"]), {"a": 2, "b": 1, "c": 3})`,
        },
        {
          name: "single element list",
          code: `assert_equals(group_counts(["x"]), {"x": 1})`,
        },
        {
          name: "empty list returns empty dict",
          code: `assert_equals(group_counts([]), {})`,
        },
        {
          name: "all identical elements",
          code: `assert_equals(group_counts(["z", "z", "z"]), {"z": 3})`,
        },
      ],
      hints: [
        "groupby(words) groups consecutive equal elements — no key= needed for plain strings.",
        "For each (key, group) pair, call len(list(group)) to count items in the group.",
        "Build the result with a dict comprehension: {key: len(list(group)) for key, group in ...}",
      ],
      explanation: `The dict comprehension iterates the (key, group) pairs from \`groupby\`.
Because \`group\` is a lazy iterator, wrapping it in \`list()\` before calling
\`len\` is the idiomatic way to count its elements.`,
    },

    // ── 4. combinations ───────────────────────────────────────────────────────
    {
      slug: "combinations",
      title: "combinations — Choose Without Repeats",
      blurb: "Generate all r-length subsets of a sequence.",
      xp: 35,
      content: `# combinations — Choose Without Repeats

\`itertools.combinations(iterable, r)\` yields all length-\`r\` subsequences of the
input in lexicographic order.  Elements are drawn without replacement, so \`(A, B)\`
and \`(B, A)\` are treated as the same combination.

\`\`\`py
from itertools import combinations

list(combinations("ABC", 2))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

list(combinations([1, 2, 3], 3))
# [(1, 2, 3)]
\`\`\`

The count of combinations of n things taken r at a time is C(n, r) = n! / (r! · (n-r)!).

## Your task

Write \`pair_sums(nums)\` that takes a list of numbers and returns a **sorted**
list of the sums of every unique pair (length-2 combination).`,
      starterCode: `from itertools import combinations

def pair_sums(nums):
    # use combinations(nums, 2), sum each tuple, return sorted list
    pass
`,
      solution: `from itertools import combinations

def pair_sums(nums):
    return sorted(a + b for a, b in combinations(nums, 2))`,
      tests: [
        {
          name: "basic pair sums",
          code: `assert_equals(pair_sums([1, 2, 3]), [3, 4, 5])`,
        },
        {
          name: "four elements",
          code: `assert_equals(pair_sums([1, 2, 3, 4]), [3, 4, 5, 5, 6, 7])`,
        },
        {
          name: "two elements is one pair",
          code: `assert_equals(pair_sums([10, 20]), [30])`,
        },
        {
          name: "single element returns empty (no pairs)",
          code: `assert_equals(pair_sums([5]), [])`,
        },
      ],
      hints: [
        "combinations(nums, 2) yields (a, b) tuples for every pair.",
        "Unpack each tuple directly: for a, b in combinations(nums, 2).",
        "Wrap in sorted() to return a sorted list.",
      ],
      explanation: `\`combinations(nums, 2)\` produces every 2-element subset exactly once.
The generator expression \`a + b for a, b in combinations(nums, 2)\` computes
each sum lazily; \`sorted()\` materialises and sorts the result in one call.`,
    },

    // ── 5. product ────────────────────────────────────────────────────────────
    {
      slug: "product",
      title: "product — Cartesian Product",
      blurb: "Build every combination from two or more pools.",
      xp: 35,
      content: `# product — Cartesian Product

\`itertools.product\` is the Cartesian product — it yields every combination of
one element from each iterable argument, equivalent to nested \`for\` loops.

\`\`\`py
from itertools import product

list(product([1, 2], ["a", "b"]))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# repeat= repeats a single iterable with itself
list(product("AB", repeat=2))
# [('A','A'),('A','B'),('B','A'),('B','B')]
\`\`\`

## Your task

Write \`grid_points(xs, ys)\` that takes two lists of numbers and returns a sorted
list of \`(x, y)\` tuples for every point on the grid defined by \`xs × ys\`.`,
      starterCode: `from itertools import product

def grid_points(xs, ys):
    # use product(xs, ys) and return a sorted list of tuples
    pass
`,
      solution: `from itertools import product

def grid_points(xs, ys):
    return sorted(product(xs, ys))`,
      tests: [
        {
          name: "2x2 grid",
          code: `assert_equals(grid_points([1, 2], [3, 4]), [(1, 3), (1, 4), (2, 3), (2, 4)])`,
        },
        {
          name: "1x3 grid",
          code: `assert_equals(grid_points([0], [1, 2, 3]), [(0, 1), (0, 2), (0, 3)])`,
        },
        {
          name: "empty xs returns empty",
          code: `assert_equals(grid_points([], [1, 2]), [])`,
        },
        {
          name: "single-point grid",
          code: `assert_equals(grid_points([5], [7]), [(5, 7)])`,
        },
      ],
      hints: [
        "product(xs, ys) yields every (x, y) pair in row-major order.",
        "sorted() on a list of tuples sorts lexicographically — first by x, then by y.",
      ],
      explanation: `\`product(xs, ys)\` is equivalent to the nested loop
\`[(x, y) for x in xs for y in ys]\` but is lazy and more composable.
\`sorted()\` gives lexicographic order, which for numeric tuples means
sorted by x first, then by y.`,
    },

    // ── 6. combinations_with_replacement / permutations quiz ─────────────────
    {
      slug: "itertools-combinatorics-quiz",
      title: "Combinatorics Tool Picker",
      blurb: "Choose the right itertools function for the job.",
      xp: 20,
      kind: "quiz",
      content: `# Choosing the Right Combinatoric Tool

Python's itertools offers four combinatoric generators.  Knowing which to reach
for is essential in competitive programming and data analysis.

| Function | Repeats? | Order matters? | Example |
|---|---|---|---|
| \`combinations(it, r)\` | No | No | poker hands |
| \`combinations_with_replacement(it, r)\` | Yes | No | multiset |
| \`permutations(it, r)\` | No | Yes | race rankings |
| \`product(it, repeat=r)\` | Yes | Yes | password combos |

Quick rule of thumb:
- **No repeats + order doesn't matter** → \`combinations\`
- **Repeats allowed + order doesn't matter** → \`combinations_with_replacement\`
- **No repeats + order matters** → \`permutations\`
- **Repeats + order matters** → \`product(..., repeat=r)\``,
      questions: [
        {
          prompt:
            "You need all 5-card hands from a 52-card deck (order doesn't matter, no duplicate cards). Which function?",
          options: [
            "itertools.permutations(deck, 5)",
            "itertools.combinations(deck, 5)",
            "itertools.product(deck, repeat=5)",
            "itertools.combinations_with_replacement(deck, 5)",
          ],
          answer: 1,
          explanation:
            "A poker hand is an unordered set with no repeated cards — exactly what combinations gives you.",
        },
        {
          prompt:
            "You want every possible 4-digit PIN where digits 0-9 can repeat (0000 through 9999). Which function?",
          options: [
            "itertools.combinations(range(10), 4)",
            "itertools.permutations(range(10), 4)",
            "itertools.product(range(10), repeat=4)",
            "itertools.combinations_with_replacement(range(10), 4)",
          ],
          answer: 2,
          explanation:
            "PINs allow repeated digits and order matters (1234 ≠ 4321), so product with repeat=4 is correct.",
        },
        {
          prompt:
            "len(list(itertools.combinations('ABCD', 2))) evaluates to …",
          options: ["4", "6", "8", "12"],
          answer: 1,
          explanation:
            "C(4,2) = 4!/(2!·2!) = 6. The pairs are AB, AC, AD, BC, BD, CD.",
        },
        {
          prompt:
            "Which itertools function is equivalent to a nested for-loop over two independent lists?",
          options: [
            "itertools.chain",
            "itertools.combinations",
            "itertools.product",
            "itertools.permutations",
          ],
          answer: 2,
          explanation:
            "product(xs, ys) yields every (x, y) pair — exactly a nested for x in xs: for y in ys loop.",
        },
      ],
    },

    // ── 7. accumulate ─────────────────────────────────────────────────────────
    {
      slug: "accumulate",
      title: "accumulate — Running Aggregates",
      blurb: "Compute prefix sums, running max, and more.",
      xp: 40,
      content: `# accumulate — Running Aggregates

\`itertools.accumulate\` applies a binary function cumulatively, yielding each
intermediate result.  The default function is addition (prefix sum).

\`\`\`py
from itertools import accumulate
import operator

list(accumulate([1, 2, 3, 4]))             # [1, 3, 6, 10]  (prefix sums)
list(accumulate([3, 1, 4, 1, 5], max))    # [3, 3, 4, 4, 5] (running max)
list(accumulate([1,2,3,4], operator.mul)) # [1, 2, 6, 24]   (factorials)
\`\`\`

Python 3.8+ also supports an \`initial\` keyword argument:

\`\`\`py
list(accumulate([1, 2, 3], initial=10))  # [10, 11, 13, 16]
\`\`\`

## Your task

Write \`running_max(nums)\` that returns a list of the running maximum of a list
of numbers, using \`accumulate\` and the built-in \`max\` as the function.`,
      starterCode: `from itertools import accumulate

def running_max(nums):
    # use accumulate(nums, max) and return as a list
    pass
`,
      solution: `from itertools import accumulate

def running_max(nums):
    return list(accumulate(nums, max))`,
      tests: [
        {
          name: "running max of ascending list",
          code: `assert_equals(running_max([1, 3, 2, 5, 4]), [1, 3, 3, 5, 5])`,
        },
        {
          name: "strictly decreasing list keeps first value",
          code: `assert_equals(running_max([5, 4, 3, 2, 1]), [5, 5, 5, 5, 5])`,
        },
        {
          name: "single element",
          code: `assert_equals(running_max([7]), [7])`,
        },
        {
          name: "all equal elements",
          code: `assert_equals(running_max([3, 3, 3]), [3, 3, 3])`,
        },
      ],
      hints: [
        "accumulate(nums, max) passes max as the binary function — Python's built-in max(a, b) works perfectly.",
        "Wrap the result in list() to get a concrete list.",
      ],
      explanation: `\`accumulate(nums, max)\` computes \`max(nums[0])\`, \`max(nums[0], nums[1])\`,
\`max(nums[0], nums[1], nums[2])\`, … lazily. The first element is always
yielded as-is (there's nothing to compare it against yet).`,
    },

    // ── 8. Chaining operators ─────────────────────────────────────────────────
    {
      slug: "compose-itertools",
      title: "Composing Itertools",
      blurb: "Chain multiple itertools together for expressive pipelines.",
      xp: 50,
      content: `# Composing Itertools

The real power of itertools comes from **composing** multiple tools into a
single lazy pipeline.  No intermediate lists are allocated until you materialise
the final result.

\`\`\`py
from itertools import chain, islice, accumulate

# Sum of the first 5 elements across two lists
data = chain([10, 20], [30, 40, 50, 60])
result = list(accumulate(islice(data, 5)))
# [10, 30, 60, 100, 150]
\`\`\`

## Your task

Write \`top_pairs_product(nums)\` that:
1. Generates all 2-element **combinations** of \`nums\`.
2. Multiplies the two numbers in each pair.
3. Returns the **3 largest** products as a sorted (ascending) list.

Use \`combinations\`, \`islice\`, and \`sorted\` — do not use \`nlargest\` from heapq.`,
      starterCode: `from itertools import combinations, islice

def top_pairs_product(nums):
    # 1. combinations(nums, 2)  -> every pair
    # 2. multiply each pair
    # 3. return the 3 largest products sorted ascending
    pass
`,
      solution: `from itertools import combinations, islice

def top_pairs_product(nums):
    products = sorted(a * b for a, b in combinations(nums, 2))
    return list(islice(reversed(products), 3))[::-1]`,
      tests: [
        {
          name: "basic case [1,2,3,4]",
          code: `assert_equals(top_pairs_product([1, 2, 3, 4]), [6, 8, 12])`,
        },
        {
          name: "five elements",
          code: `assert_equals(top_pairs_product([1, 2, 3, 4, 5]), [12, 15, 20])`,
        },
        {
          name: "exactly three elements",
          code: `assert_equals(top_pairs_product([2, 3, 5]), [6, 10, 15])`,
        },
      ],
      hints: [
        "First build ALL products with a generator expression over combinations(nums, 2).",
        "sorted(...) gives them ascending. The 3 largest are the last 3.",
        "islice(reversed(products), 3) takes the top 3 from the reversed sorted list; [::-1] flips back to ascending.",
        "Alternatively: sorted(products)[-3:] gives the same result more simply.",
      ],
      explanation: `The pipeline: \`combinations\` → products → \`sorted\` → take last 3.
\`islice(reversed(products), 3)[::-1]\` demonstrates composing \`islice\` with
a reverse iterator, but \`sorted(...)[-3:]\` is equally idiomatic for small inputs.`,
    },

    // ── 9. takewhile / dropwhile ──────────────────────────────────────────────
    {
      slug: "takewhile-dropwhile",
      title: "takewhile & dropwhile",
      blurb: "Consume a stream until a condition changes.",
      xp: 40,
      content: `# takewhile & dropwhile

Two more workhorses for processing ordered streams:

- \`takewhile(predicate, iterable)\` — yields elements **while** the predicate is
  True, stops at the first False (and does not resume).
- \`dropwhile(predicate, iterable)\` — **skips** elements while the predicate is
  True, then yields everything from the first False onward.

\`\`\`py
from itertools import takewhile, dropwhile

list(takewhile(lambda x: x < 5, [1, 2, 3, 6, 2]))  # [1, 2, 3]
list(dropwhile(lambda x: x < 5, [1, 2, 3, 6, 2]))  # [6, 2]
\`\`\`

Note: once the predicate flips, both functions never re-evaluate it.

## Your task

Write \`split_at_threshold(nums, threshold)\` that returns a tuple
\`(below, rest)\` where:
- \`below\` is the list of leading elements **strictly less than** \`threshold\`.
- \`rest\` is the remaining elements from the first element >= \`threshold\` onward.

Use \`takewhile\` and \`dropwhile\`.`,
      starterCode: `from itertools import takewhile, dropwhile

def split_at_threshold(nums, threshold):
    # return (list of leading elements < threshold, rest)
    pass
`,
      solution: `from itertools import takewhile, dropwhile

def split_at_threshold(nums, threshold):
    pred = lambda x: x < threshold
    below = list(takewhile(pred, nums))
    rest = list(dropwhile(pred, nums))
    return (below, rest)`,
      tests: [
        {
          name: "splits at 5",
          code: `assert_equals(split_at_threshold([1, 2, 3, 6, 2], 5), ([1, 2, 3], [6, 2]))`,
        },
        {
          name: "all elements below threshold",
          code: `assert_equals(split_at_threshold([1, 2, 3], 10), ([1, 2, 3], []))`,
        },
        {
          name: "no elements below threshold",
          code: `assert_equals(split_at_threshold([5, 6, 7], 5), ([], [5, 6, 7]))`,
        },
        {
          name: "empty list",
          code: `assert_equals(split_at_threshold([], 3), ([], []))`,
        },
      ],
      hints: [
        "Define the predicate once as a lambda and pass it to both takewhile and dropwhile.",
        "Both functions take the same predicate and the same list — they split it at the same boundary.",
      ],
      explanation: `Using the same predicate \`lambda x: x < threshold\` for both calls guarantees
that \`below + rest == nums\` (as long as the list doesn't change). \`takewhile\`
gives the prefix; \`dropwhile\` gives the suffix from the first non-matching element.`,
    },
  ],
};
