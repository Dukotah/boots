// Targets the high-intent query "what is Big-O notation" — a concept every
// learner hits when studying algorithms or preparing for technical interviews.
// Explains O(1), O(n), O(n²), and O(log n) with real code examples, keeping
// the math light so beginners aren't intimidated. Links to /learn/algorithms.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "what-is-big-o-notation",
  title: "What Is Big-O Notation? (Plain-English Guide with Examples)",
  description:
    "Big-O notation explained simply, with real code examples — O(1), O(n), O(n²), and O(log n) — so you can reason about performance without a math degree.",
  date: "2026-06-03",
  readingMinutes: 7,
  tags: ["algorithms", "concepts", "interview"],
  body: `Big-O notation is how programmers describe how fast (or slow) an algorithm is as the amount of data grows. It shows up in textbooks, interviews, and code reviews — but the underlying idea is simpler than the notation suggests. Let's build an intuition with real examples before touching any theory.

## The core question Big-O answers

Imagine you have an algorithm that searches a list of names. It works fine with 100 names. But what happens when the list grows to 100,000?

- Does it take the same time, no matter how long the list is?
- Does it take twice as long if the list is twice as long?
- Does it take *four times* as long if the list doubles?

Big-O notation answers this question by describing how an algorithm's runtime *scales* with input size. The letter \`n\` represents the size of the input. The \`O\` stands for "Order of magnitude."

## The four you'll see most often

### O(1) — Constant time

The algorithm takes the same amount of time regardless of input size.

\`\`\`python
def get_first(items):
    return items[0]
\`\`\`

It doesn't matter if \`items\` has 10 elements or 10 million. Grabbing the first element takes exactly one step. That's O(1).

Another O(1) example: looking up a key in a Python dictionary. The internal structure (a hash table) makes lookups nearly instant no matter how large the dictionary grows.

**Real-world feel:** Like pressing a light switch. It doesn't matter how big the house is.

### O(n) — Linear time

The runtime grows in direct proportion to the input size. Double the input, double the time.

\`\`\`python
def find_name(names, target):
    for name in names:
        if name == target:
            return True
    return False
\`\`\`

In the worst case, the target is at the end — so you check every single name. If \`names\` has 1,000 items, you might look at all 1,000. If it has 10,000, you might look at all 10,000.

**Real-world feel:** Like reading a list from top to bottom looking for one entry.

### O(n²) — Quadratic time

The runtime grows with the *square* of the input size. Double the input, and it takes four times as long.

\`\`\`python
def find_duplicates(items):
    duplicates = []
    for i in range(len(items)):
        for j in range(len(items)):
            if i != j and items[i] == items[j]:
                duplicates.append(items[i])
    return duplicates
\`\`\`

There's a loop *inside* a loop, so for every item you compare it against every other item. With 100 items that's ~10,000 comparisons. With 1,000 items it's ~1,000,000. This blows up fast.

**Real-world feel:** Like checking every seat against every other seat to find pairs who know each other.

O(n²) algorithms often signal that a smarter data structure or algorithm exists — a hash set would cut that duplicate-finder above down to O(n).

### O(log n) — Logarithmic time

The runtime grows slowly — much slower than the input. Each step cuts the remaining work in half.

\`\`\`python
def binary_search(sorted_list, target):
    low, high = 0, len(sorted_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

Binary search requires a *sorted* list. Each guess eliminates half the remaining candidates. With 1,000 items, you need at most 10 guesses. With 1,000,000 items — only 20 guesses.

**Real-world feel:** Like finding a word in a dictionary by opening to the middle, deciding which half it's in, and repeating.

## A quick cheat sheet

| Notation | Name | How it grows |
| --- | --- | --- |
| O(1) | Constant | Doesn't — same time always |
| O(log n) | Logarithmic | Very slowly |
| O(n) | Linear | Proportionally |
| O(n log n) | Linearithmic | Slightly faster than quadratic — most good sorting algorithms land here |
| O(n²) | Quadratic | Quickly — watch out |

## What Big-O leaves out

Big-O describes *scalability*, not raw speed. An O(n²) algorithm on 50 items might run in microseconds — faster than a well-optimized O(n) algorithm on the same tiny input. Big-O matters when the data is large and growth patterns matter.

Also, Big-O describes worst-case behavior unless otherwise specified. The real-world average is often better.

## Why it matters for interviews and code

Interviewers ask Big-O questions because it shows you can reason about your code's behavior at scale — not just "does it work?" but "does it stay fast when the data grows?" That's a different kind of thinking, and it's learnable.

A practical habit: whenever you write a nested loop, ask yourself if you can eliminate one layer with a dictionary or set. That swap from O(n²) to O(n) is one of the most common improvements in coding interviews.

The [algorithms module](/learn/algorithms) on Cantrip walks through these concepts with interactive practice problems, so you can build the intuition by solving real examples instead of just reading about them.

## The bottom line

Big-O answers one question: *how does this algorithm scale?* O(1) is constant and ideal. O(n) grows linearly and is usually fine. O(n²) grows fast and often has a smarter alternative. O(log n) is efficient and powerful. Learn to spot which category your code falls into, and you'll reason about performance the way experienced engineers do. [Start the algorithms module](/learn/algorithms) and practice identifying complexity in real code.`,
};

export default post;
