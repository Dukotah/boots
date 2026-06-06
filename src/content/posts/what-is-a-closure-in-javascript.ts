// Targets "what is a closure in JavaScript" — a core concept that trips up
// beginners and is a near-universal interview topic. Builds intuition with
// three progressively real examples, then connects to practical patterns
// learners will use in the /paths/frontend track.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "what-is-a-closure-in-javascript",
  title: "What Is a Closure in JavaScript? (With Real Examples)",
  description:
    "Closures explained clearly — what they are, why they work, and three practical examples that show where you already use them without knowing it.",
  date: "2026-06-01",
  readingMinutes: 7,
  tags: ["javascript", "concepts", "interview"],
  body: `Closures are one of those JavaScript concepts that sound abstract until they suddenly click — and once they do, you start seeing them everywhere. By the end of this post you'll understand what a closure is, why JavaScript behaves the way it does, and how closures show up in code you write every day.

## Start with scope

To understand closures, you need to understand *scope*: the idea that variables are only accessible within the block of code where they're defined.

\`\`\`javascript
function greet() {
  const name = "Alice";  // 'name' is scoped to greet()
  console.log("Hello, " + name);
}

greet();          // "Hello, Alice"
console.log(name); // ReferenceError — 'name' doesn't exist out here
\`\`\`

The variable \`name\` lives inside \`greet()\`. Code outside can't see it.

## Now add a nested function

Here's where closures enter. When you define a function *inside* another function, the inner function can access the outer function's variables — even after the outer function has finished running.

\`\`\`javascript
function makeGreeter() {
  const name = "Alice";  // defined in the outer function

  function greet() {
    console.log("Hello, " + name);  // uses the outer variable
  }

  return greet;  // return the inner function itself
}

const sayHello = makeGreeter();
sayHello();  // "Hello, Alice"
\`\`\`

Wait — \`makeGreeter()\` finished running before \`sayHello()\` was ever called. Shouldn't \`name\` be gone?

This is the closure. When \`greet\` was created, JavaScript packaged up the surrounding variables it references — in this case \`name\` — and kept them alive. That package travels with the function wherever it goes.

**A closure is a function that remembers the variables from the scope where it was created, even after that scope has closed.**

## Example 1: A counter

A classic use case — a function that keeps private state.

\`\`\`javascript
function makeCounter() {
  let count = 0;  // private — nothing outside can touch this directly

  return {
    increment() { count++; },
    decrement() { count--; },
    value()     { return count; }
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value());  // 2
\`\`\`

The variable \`count\` is completely private. Nothing outside \`makeCounter\` can read or change it except through the returned methods. This is closures acting as a lightweight encapsulation mechanism — similar to private fields in class-based languages.

## Example 2: Functions with baked-in configuration

Closures make it easy to create families of related functions without repeating yourself.

\`\`\`javascript
function makeMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(double(10));  // 20
\`\`\`

\`double\` and \`triple\` are two separate closures that each captured a different value of \`factor\`. They're independent — changing one doesn't affect the other.

This pattern shows up constantly in real code: logger functions pre-configured with a module name, API callers pre-configured with a base URL, event handlers pre-configured with an element ID.

## Example 3: The loop trap (and the fix)

Here's a classic gotcha that catches beginners:

\`\`\`javascript
// BROKEN — all callbacks log "3"
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
\`\`\`

You might expect it to log \`0\`, \`1\`, \`2\`. It logs \`3\` three times. Why? Because \`var\` doesn't create a new scope per loop iteration — all three callbacks share the *same* \`i\`, and by the time they run, the loop has finished and \`i\` is \`3\`.

The fix: use \`let\`, which *does* create a fresh binding per iteration:

\`\`\`javascript
// FIXED — logs 0, 1, 2
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
\`\`\`

Each iteration creates a new closure over its own copy of \`i\`. This is one reason the modern advice is to prefer \`let\` and \`const\` over \`var\`.

## Where closures appear in everyday JavaScript

Once you know what to look for, closures are everywhere:

- **Event handlers** — an onclick handler that references the button's data closes over that data.
- **React hooks** — \`useEffect\` and \`useCallback\` rely heavily on closure behavior. The "stale closure" bug is a classic React gotcha rooted in this.
- **Module patterns** — the classic pre-ES6 way to create private state was via closures.
- **Callbacks and async code** — any callback that uses a variable from its outer scope is a closure.

## Why interviewers ask about closures

Closures come up in nearly every JavaScript interview because they test whether you understand how scope and function execution actually work in the language. Being able to explain what a closure is, write one from scratch, and identify the loop trap demonstrates a level of understanding that separates candidates who've read docs from candidates who've built things.

The [JavaScript modules in the frontend path](/paths/frontend) walk through scope, closures, and async patterns with interactive exercises, so you can build the intuition by writing code rather than memorizing definitions.

## The bottom line

A closure is a function that remembers its surrounding scope even after that scope has ended. They enable private state, configurable functions, and a lot of the async patterns JavaScript relies on. The best way to make them stick is to write a few yourself. [Open a playground](/playground) and try building a counter from scratch — the moment it works, closures will stop feeling abstract.`,
};

export default post;
