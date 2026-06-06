import type { Module } from "./types";

// Rust — taught as JS. The in-browser Worker has no Rust compiler or runtime
// (no `cargo`, no ownership checker, no `match`), so — exactly like the Node and
// React courses — the prose teaches *real* Rust in ```rust fences while every
// gradeable task is a pure-JS function that *models* the concept (move/clone
// semantics, `match` dispatch, `Option`/`Result`, iterator adapters) so the
// Worker can run it and assert on it deterministically.
export const rust: Module = {
  slug: "rust",
  title: "Rust",
  description:
    "The language that makes systems programming safe. Learn ownership, borrowing, pattern matching, and Rust's fearless approach to memory — explained with real Rust and reinforced by hands-on, auto-graded exercises.",
  emoji: "🦀",
  gradient: "from-orange-500/20 to-amber-600/10",
  language: "js",
  tagline:
    "Learn Rust: variables & mutability, ownership & borrowing, structs, enums & pattern matching, Option & Result, and iterators — explained with real Rust and auto-graded.",
  keywords: ["learn rust", "rust tutorial", "rust ownership", "rust pattern matching", "systems programming"],
  lessons: [
    {
      slug: "what-is-rust",
      title: "What is Rust?",
      blurb: "Memory safety without a garbage collector.",
      xp: 25,
      kind: "quiz",
      content: `# What is Rust?

**Rust** is a systems programming language focused on **safety**, **speed**, and
**concurrency**. It compiles to fast native code like C or C++ — but it catches a
whole class of memory bugs *at compile time*, before your program ever runs.

\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

**What makes Rust distinctive:**
- **Memory safety without a garbage collector.** Languages like Java or Go use a
  runtime garbage collector to clean up memory; C and C++ make you do it by hand
  (and crash when you get it wrong). Rust uses a compile-time system called
  **ownership** instead — no GC pauses, no manual \`free\`, no use-after-free.
- **The borrow checker.** Rust's compiler tracks who *owns* each piece of data
  and who has *borrowed* it. Code that could cause a data race or a dangling
  pointer simply won't compile.
- **Zero-cost abstractions.** High-level features like iterators and pattern
  matching compile down to code as fast as hand-written loops.

The result is a language people reach for when they need C-level performance but
can't afford C-level bugs: operating systems, browsers, game engines, and
high-performance web services.`,
      questions: [
        {
          prompt: "How does Rust manage memory safely?",
          options: [
            "With a garbage collector that runs in the background",
            "With a compile-time ownership system — no garbage collector needed",
            "By never freeing memory until the program exits",
            "By asking the programmer to call free() manually everywhere",
          ],
          answer: 1,
          explanation:
            "Rust enforces memory safety at compile time through ownership and borrowing, so it needs neither a garbage collector nor manual free() calls.",
        },
        {
          prompt: "When does Rust catch most memory-safety bugs?",
          options: [
            "At runtime, when the bug is triggered",
            "Never — you find them in production",
            "At compile time, before the program runs",
            "Only when running a separate sanitizer tool",
          ],
          answer: 2,
          explanation:
            "Rust's borrow checker rejects unsafe code during compilation, so use-after-free and data-race bugs are caught before the program ever runs.",
        },
        {
          prompt: "What does 'zero-cost abstraction' mean in Rust?",
          options: [
            "Abstractions are free to download",
            "High-level features compile to code as fast as hand-written low-level code",
            "The compiler removes all your functions",
            "You don't pay for a license to use the standard library",
          ],
          answer: 1,
          explanation:
            "Zero-cost means convenient high-level constructs (iterators, pattern matching, generics) compile down to machine code with no runtime overhead compared to writing the equivalent by hand.",
        },
      ],
    },
    {
      slug: "variables-and-mutability",
      title: "Variables & Mutability",
      blurb: "Bindings are immutable by default — opt in to change.",
      xp: 30,
      content: `# Variables & Mutability

In Rust you bind a value to a name with \`let\`. The twist: variables are
**immutable by default**. Once bound, you can't reassign — unless you explicitly
add \`mut\`.

\`\`\`rust
let x = 5;
// x = 6;      // ❌ compile error: cannot assign twice to immutable \`x\`

let mut y = 5;
y = 6;          // ✅ \`mut\` makes it mutable
\`\`\`

This default flips the usual assumption: instead of *everything* being changeable
and hoping you don't mutate the wrong thing, Rust makes you *announce* mutation.
The compiler then helps you reason about what can and can't change.

Rust runs in a real compiler, not the browser. To practise the *idea* of a
controlled mutation without that compiler, we'll model it as a plain JS function:
given a starting value, apply the one mutation a \`mut\` binding would allow and
return the new value.

## Your task
Write \`applyMutation(start, delta)\` that models a \`let mut total = start;\`
followed by \`total += delta;\` — return \`start + delta\`. For example
\`applyMutation(5, 1)\` returns \`6\`, just like flipping \`y\` from 5 to 6 above.`,
      starterCode: `function applyMutation(start, delta) {
  // return the value after adding delta to start
}
`,
      solution: `function applyMutation(start, delta) {
  return start + delta;
}`,
      tests: [
        { name: "5 += 1 → 6", code: `assertEquals(applyMutation(5, 1), 6);` },
        { name: "0 += 10 → 10", code: `assertEquals(applyMutation(0, 10), 10);` },
        { name: "negative delta", code: `assertEquals(applyMutation(7, -3), 4);` },
      ],
    },
    {
      slug: "functions",
      title: "Functions",
      blurb: "Declare with fn, type the params, return the last expression.",
      xp: 30,
      content: `# Functions

Rust functions are declared with \`fn\`. Every parameter needs a type, and the
return type comes after an arrow \`->\`. Notably, the **last expression** in a
function body is its return value — no \`return\` keyword needed (and no semicolon
on that final line).

\`\`\`rust
fn square(n: i32) -> i32 {
    n * n        // last expression → returned (no semicolon, no \`return\`)
}

fn main() {
    println!("{}", square(4)); // 16
}
\`\`\`

That \`i32\` means a 32-bit signed integer — Rust makes you state the type so the
compiler can check your math. The *behaviour* of the function, though, is plain
arithmetic, which we can model directly in JS.

## Your task
Write \`square(n)\` that returns \`n * n\` — the same logic as the Rust \`fn square\`
above. For example \`square(4)\` returns \`16\`.`,
      starterCode: `function square(n) {
  // return n times itself
}
`,
      solution: `function square(n) {
  return n * n;
}`,
      tests: [
        { name: "square(4) → 16", code: `assertEquals(square(4), 16);` },
        { name: "square(0) → 0", code: `assertEquals(square(0), 0);` },
        { name: "square(-3) → 9", code: `assertEquals(square(-3), 9);` },
      ],
    },
    {
      slug: "ownership-and-borrowing",
      title: "Ownership & Borrowing",
      blurb: "Move transfers ownership; clone copies; borrow lends a reference.",
      xp: 45,
      content: `# Ownership & Borrowing

**Ownership** is Rust's headline feature. Every value has exactly one **owner**.
When you assign a value to another variable, ownership **moves** — and the
original binding is no longer usable.

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;            // ownership MOVES from s1 to s2
// println!("{}", s1); // ❌ error: value borrowed here after move
\`\`\`

If you want two independent copies, you **clone**, which makes a deep copy and
leaves the original valid:

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1.clone();   // deep copy — both s1 and s2 are usable
\`\`\`

And if you just need to *read* a value without taking it, you **borrow** it with
\`&\` — a reference that doesn't take ownership and never mutates the original:

\`\`\`rust
fn len(s: &String) -> usize { s.len() } // borrows; caller keeps ownership
\`\`\`

The principle that makes all of this safe is simple: **a borrow (or a clone)
never mutates the value it was given**. We can model exactly that guarantee in JS
— a function that derives a *new* value from its input without ever mutating the
input it was handed.

## Your task
Write \`cloneAndPush(list, value)\` that models \`clone\`-then-mutate: return a
**new** array equal to \`list\` with \`value\` appended, **without mutating the
original \`list\`** (the caller still owns the untouched original). For example
\`cloneAndPush([1, 2], 3)\` returns \`[1, 2, 3]\` and the passed-in array is still
\`[1, 2]\`.`,
      starterCode: `function cloneAndPush(list, value) {
  // return a NEW array with value appended; do not mutate list
}
`,
      solution: `function cloneAndPush(list, value) {
  return [...list, value];
}`,
      tests: [
        {
          name: "returns a new array with value appended",
          code: `assertEquals(cloneAndPush([1, 2], 3), [1, 2, 3]);`,
        },
        {
          name: "does NOT mutate the original (clone semantics)",
          code: `const original = [1, 2];
cloneAndPush(original, 3);
assertEquals(original, [1, 2]);`,
        },
        {
          name: "returns a distinct array reference",
          code: `const original = [9];
assert(cloneAndPush(original, 8) !== original, "should return a new array, not the same reference");`,
        },
      ],
    },
    {
      slug: "structs-and-impl",
      title: "Structs & Impl",
      blurb: "Group related data, then attach methods with impl.",
      xp: 35,
      content: `# Structs & Impl

A **struct** groups related fields under one named type. You then attach
behaviour to it in an **\`impl\`** block, where methods take \`&self\` to read the
struct's own fields.

\`\`\`rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 3, height: 4 };
    println!("{}", rect.area()); // 12
}
\`\`\`

\`&self\` borrows the instance so \`area\` can read \`self.width\` and \`self.height\`
without taking ownership. A struct is essentially a record of named fields, and a
method is a function over those fields — which maps cleanly onto a JS object and a
function that reads it.

## Your task
Write \`area(rect)\` where \`rect\` is an object \`{ width, height }\`, returning
\`width * height\` — the same computation as the Rust \`area\` method. For example
\`area({ width: 3, height: 4 })\` returns \`12\`.`,
      starterCode: `function area(rect) {
  // return rect.width * rect.height
}
`,
      solution: `function area(rect) {
  return rect.width * rect.height;
}`,
      tests: [
        { name: "3 × 4 → 12", code: `assertEquals(area({ width: 3, height: 4 }), 12);` },
        { name: "square 5 × 5 → 25", code: `assertEquals(area({ width: 5, height: 5 }), 25);` },
        { name: "zero width → 0", code: `assertEquals(area({ width: 0, height: 9 }), 0);` },
      ],
    },
    {
      slug: "enums-and-pattern-matching",
      title: "Enums & Pattern Matching",
      blurb: "Model a value that is one of several variants, then match on it.",
      xp: 40,
      content: `# Enums & Pattern Matching

An **enum** defines a type that can be exactly *one of* several **variants**.
Paired with \`match\`, Rust forces you to handle every variant — the compiler
errors if you forget one, so whole categories of bugs disappear.

\`\`\`rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn describe(d: Direction) -> &'static str {
    match d {
        Direction::North => "up",
        Direction::South => "down",
        Direction::East  => "right",
        Direction::West  => "left",
    }
}
\`\`\`

A \`match\` is a dispatch: it takes a *tagged* value (which variant?) and maps it to
a result. We can model the variant as a plain string tag, and the \`match\` as a
JS function mapping that tag to its result.

## Your task
Write \`describe(direction)\` where \`direction\` is one of the strings
\`"North"\`, \`"South"\`, \`"East"\`, \`"West"\`. Return \`"up"\`, \`"down"\`, \`"right"\`,
\`"left"\` respectively — the same mapping as the Rust \`match\` above. For any other
input, return \`"unknown"\` (Rust's compiler would force a catch-all arm here too).`,
      starterCode: `function describe(direction) {
  // map the direction tag to its description
}
`,
      solution: `function describe(direction) {
  switch (direction) {
    case "North":
      return "up";
    case "South":
      return "down";
    case "East":
      return "right";
    case "West":
      return "left";
    default:
      return "unknown";
  }
}`,
      tests: [
        { name: "North → up", code: `assertEquals(describe("North"), "up");` },
        { name: "South → down", code: `assertEquals(describe("South"), "down");` },
        { name: "East → right", code: `assertEquals(describe("East"), "right");` },
        { name: "West → left", code: `assertEquals(describe("West"), "left");` },
        { name: "catch-all → unknown", code: `assertEquals(describe("Up"), "unknown");` },
      ],
    },
    {
      slug: "option-and-result",
      title: "Option & Result",
      blurb: "Encode 'maybe a value' and 'success or error' in the type system.",
      xp: 40,
      content: `# Option & Result

Rust has **no \`null\`**. Instead, a value that might be absent has type
\`Option<T>\` — either \`Some(value)\` or \`None\`. And an operation that might fail
returns \`Result<T, E>\` — either \`Ok(value)\` or \`Err(error)\`. The type system
forces you to handle the missing/failing case; you can't accidentally use a value
that isn't there.

\`\`\`rust
fn divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    match divide(10, 2) {
        Some(n) => println!("got {}", n), // got 5
        None => println!("can't divide by zero"),
    }
}
\`\`\`

A clean way to model \`Option<T>\` in JS is to return the value for \`Some\`, and
\`null\` for \`None\` — the caller checks for \`null\` exactly as Rust forces a
\`match\` on \`None\`.

## Your task
Write \`divide(a, b)\` modelling the Rust \`Option<i32>\` above: return \`a / b\` when
\`b\` is not zero (this is the \`Some\` case), and return \`null\` when \`b\` is zero
(the \`None\` case). Use integer division — \`Math.trunc(a / b)\` — to match Rust's
\`i32\` math. For example \`divide(10, 2)\` returns \`5\` and \`divide(1, 0)\` returns
\`null\`.`,
      starterCode: `function divide(a, b) {
  // return integer a / b, or null when b is 0
}
`,
      solution: `function divide(a, b) {
  if (b === 0) {
    return null;
  }
  return Math.trunc(a / b);
}`,
      tests: [
        { name: "Some: 10 / 2 → 5", code: `assertEquals(divide(10, 2), 5);` },
        {
          name: "Some: integer (truncating) division 7 / 2 → 3",
          code: `assertEquals(divide(7, 2), 3);`,
        },
        { name: "None: divide by zero → null", code: `assertEquals(divide(1, 0), null);` },
      ],
    },
    {
      slug: "vectors-and-iterators",
      title: "Vectors & Iterators",
      blurb: "Transform a Vec with map, filter, and fold.",
      xp: 40,
      content: `# Vectors & Iterators

A **\`Vec<T>\`** is Rust's growable array. Its real power comes from **iterators** —
lazy chains of adapters like \`map\`, \`filter\`, and \`fold\` that transform a
collection without explicit loops. This is one of Rust's zero-cost abstractions:
it reads high-level but compiles down to a tight loop.

\`\`\`rust
fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    let sum_of_even_squares: i32 = nums
        .iter()
        .filter(|&&n| n % 2 == 0) // keep evens: 2, 4
        .map(|&n| n * n)          // square them: 4, 16
        .sum();                   // fold into a total: 20

    println!("{}", sum_of_even_squares); // 20
}
\`\`\`

\`filter\` keeps elements that pass a test, \`map\` transforms each element, and
\`sum\`/\`fold\` collapses the sequence to a single value. JS arrays have the exact
same methods (\`filter\`, \`map\`, \`reduce\`), so the iterator pipeline ports over
almost line for line.

## Your task
Write \`sumOfEvenSquares(nums)\` that, given an array of numbers, keeps the even
ones, squares each, and returns their total — the same pipeline as the Rust
iterator above. For example \`sumOfEvenSquares([1, 2, 3, 4, 5])\` returns \`20\`.`,
      starterCode: `function sumOfEvenSquares(nums) {
  // filter to evens, square each, sum them
}
`,
      solution: `function sumOfEvenSquares(nums) {
  return nums
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .reduce((total, n) => total + n, 0);
}`,
      tests: [
        {
          name: "[1,2,3,4,5] → 20",
          code: `assertEquals(sumOfEvenSquares([1, 2, 3, 4, 5]), 20);`,
        },
        {
          name: "all odd → 0",
          code: `assertEquals(sumOfEvenSquares([1, 3, 5]), 0);`,
        },
        {
          name: "empty array → 0",
          code: `assertEquals(sumOfEvenSquares([]), 0);`,
        },
      ],
    },
  ],
};
