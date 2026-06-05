// High-intent "how to" post targeting learners in the Python fundamentals module.
// Covers slicing, loops, and built-ins so the reader walks away with real code
// and a natural pull toward /learn/python for guided practice.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "how-to-reverse-a-string-in-python",
  title: "How to Reverse a String in Python (3 Ways, Explained)",
  description:
    "Three practical ways to reverse a string in Python — slice notation, a loop, and the built-in reversed() — with real code examples and when to use each.",
  date: "2026-06-04",
  readingMinutes: 6,
  tags: ["python", "strings", "beginners"],
  body: `Reversing a string is one of the first Python exercises you'll run into, and it shows up everywhere — coding interviews, data cleaning, and everyday scripting. There are three clean ways to do it. Knowing all three tells you a lot about how Python thinks about sequences.

## Method 1: Slice notation (the Pythonic way)

Python's slice syntax \`[start:stop:step]\` lets you walk through any sequence with full control. Setting the step to \`-1\` walks backward from the end to the beginning — which reverses the string.

\`\`\`python
text = "hello"
reversed_text = text[::-1]
print(reversed_text)  # "olleh"
\`\`\`

Breaking it down:
- The empty \`start\` means "start from the end."
- The empty \`stop\` means "go all the way to the beginning."
- The \`-1\` step means "move one character backward each time."

This is the most common approach in real Python code. It's concise and fast, and any experienced Python reader will understand it immediately.

### When to use it

Use \`[::-1]\` whenever you want a quick, readable reversal of a string, list, or tuple. It's the idiomatic choice.

## Method 2: The reversed() built-in with join()

Python has a built-in function called \`reversed()\` that works on any sequence. It returns an iterator, so to get a string back out you join the characters together.

\`\`\`python
text = "hello"
reversed_text = "".join(reversed(text))
print(reversed_text)  # "olleh"
\`\`\`

What's happening here:
1. \`reversed(text)\` produces the characters in reverse order.
2. \`"".join(...)\` stitches them back into a single string with no separator.

This approach is slightly more explicit than slicing, which can make it easier to understand for readers who aren't fluent in slice notation yet.

### When to use it

Use \`reversed()\` when you want to signal intent clearly, or when you're already working with an iterator pipeline and want to stay consistent.

## Method 3: A manual loop

Before you know about slicing or built-ins, you might reach for a loop — and it works perfectly fine.

\`\`\`python
text = "hello"
result = ""
for char in text:
    result = char + result
print(result)  # "olleh"
\`\`\`

Each character gets prepended (added to the front) rather than appended. After the loop, the newest character is at the front and the original first character is at the end.

### A slightly tidier loop version

\`\`\`python
text = "hello"
result = []
for char in text:
    result.insert(0, char)
print("".join(result))  # "olleh"
\`\`\`

### When to use it

A loop is useful when you're learning how reversals work under the hood, or when you need to do something *to* each character as you reverse. For pure reversal, slicing is faster and shorter.

## Quick comparison

| Method | Code | Notes |
| --- | --- | --- |
| Slice | \`s[::-1]\` | Most Pythonic, fastest |
| reversed() + join | \`"".join(reversed(s))\` | Explicit, readable |
| Loop | \`for char in s: ...\` | Great for learning logic |

## What this teaches you about Python

The three methods above aren't just three ways to reverse a string — they're a window into how Python treats sequences:

- **Slicing** works on strings, lists, and tuples the same way.
- **reversed()** is part of Python's iterator protocol, which shows up constantly in loops and functional code.
- **Manual loops** build the mental model that the other two shortcuts are built on.

Once you're comfortable with these, [the Python track's string modules](/learn/python) go deeper into manipulation, formatting, and search patterns. Keep a [Python cheat sheet](/cheatsheet) open while you practice — slicing syntax is easy to forget at first.

## The bottom line

For day-to-day use, \`[::-1]\` is your go-to. Learn to read and write it fluently and it'll serve you constantly. For interviews, be ready to explain the loop version too — it shows you understand what's actually happening. [Practice it in the playground](/playground) right now and make it stick.`,
};

export default post;
