import type { Module } from "./types";

// Debugging Skills — concept + quiz + hands-on JS lessons covering systematic
// debugging, reading stack traces, common JS errors, and console techniques.
export const debuggingSkills: Module = {
  slug: "debugging-skills",
  title: "Debugging Skills",
  description:
    "Stop guessing and start diagnosing — read stack traces, understand common JavaScript errors, use the console effectively, and apply systematic debugging to fix bugs fast.",
  emoji: "🐛",
  gradient: "from-red-400/20 to-orange-500/10",
  tagline:
    "Learn debugging: reading stack traces, JavaScript error types, console techniques, and systematic debugging strategies.",
  keywords: [
    "debugging javascript",
    "javascript errors",
    "stack trace",
    "console debugging",
    "debugging strategies",
  ],
  lessons: [
    {
      slug: "reading-errors",
      title: "Reading Error Messages",
      blurb: "Every error message tells you exactly what went wrong.",
      xp: 25,
      kind: "quiz",
      content: `# Reading Error Messages

When JavaScript throws an error you see three things:

1. **Error type** — what kind of problem: \`TypeError\`, \`ReferenceError\`, \`SyntaxError\`, etc.
2. **Message** — a human-readable description.
3. **Stack trace** — the chain of function calls that led to the error, most recent first.

\`\`\`
TypeError: Cannot read properties of undefined (reading 'name')
    at getUserName (app.js:12:20)
    at main (app.js:5:10)
\`\`\`

Reading this: the error is on line 12 of \`app.js\` inside \`getUserName\`,
called from \`main\` on line 5.  Something passed in was \`undefined\` when code
expected an object with a \`name\` property.`,
      questions: [
        {
          prompt: "What does a ReferenceError typically mean?",
          options: [
            "You tried to call something that isn't a function",
            "You used a variable that hasn't been declared",
            "Your code has a typo that can't be parsed",
            "You divided by zero",
          ],
          answer: 1,
          explanation: "ReferenceError: `x is not defined` means you used a name that doesn't exist in scope — usually a typo or a missing declaration.",
        },
        {
          prompt: "In a stack trace, which function call is listed first?",
          options: [
            "The function where the program started (main)",
            "The function where the error actually occurred (innermost)",
            "The most-called function",
            "The last function that returned successfully",
          ],
          answer: 1,
          explanation: "Stack traces are printed innermost-first. The top line is where the error occurred; lines below it show how you got there.",
        },
        {
          prompt: "`TypeError: arr.map is not a function` — what is the most likely cause?",
          options: [
            "`arr` is undefined",
            "`arr` is a number or string, not an array",
            "`.map` is spelled wrong",
            "The callback passed to `.map` is missing",
          ],
          answer: 1,
          explanation: "`.map is not a function` usually means the variable isn't the type you expected — often a string, number, or null instead of an array.",
        },
      ],
    },
    {
      slug: "common-js-errors",
      title: "Common JavaScript Errors",
      blurb: "TypeError, ReferenceError, RangeError, SyntaxError.",
      xp: 30,
      kind: "quiz",
      content: `# Common JavaScript Errors

| Error Type | When it happens |
|------------|----------------|
| \`SyntaxError\` | Code can't be parsed — missing bracket, typo in keyword |
| \`ReferenceError\` | Using a variable that doesn't exist in scope |
| \`TypeError\` | Operating on a value of the wrong type (e.g. calling a non-function) |
| \`RangeError\` | Value out of allowed range (e.g. \`new Array(-1)\`) |

**Most common runtime bugs:**
- Calling a method on \`null\` or \`undefined\`
- Forgetting \`await\` — you get a Promise object instead of its value
- Mutating an array while iterating over it
- Off-by-one in loop indices`,
      questions: [
        {
          prompt: "You write `consol.log('hi')` and run your code. What error do you get?",
          options: ["TypeError", "SyntaxError", "ReferenceError", "RangeError"],
          answer: 2,
          explanation: "`consol` is not defined — `ReferenceError: consol is not defined`. It's a typo, not a syntax error because the line is syntactically valid.",
        },
        {
          prompt: "You forget `await` before a fetch call and try to read `.status` on the result. What happens?",
          options: [
            "It works fine",
            "You get a RangeError",
            "You get `undefined` because you're reading `.status` on a Promise object",
            "The browser blocks the request",
          ],
          answer: 2,
          explanation: "Without `await`, `fetch()` returns a Promise. Promises don't have a `.status` property, so you get `undefined` — a subtle bug.",
        },
        {
          prompt: "Which of these will throw a TypeError at runtime?",
          options: [
            "let x = 5 + '3'",
            "null.toString()",
            "undefined === null",
            "[] + {}",
          ],
          answer: 1,
          explanation: "`null.toString()` throws `TypeError: Cannot read properties of null`. The others use JavaScript's type coercion and return a value.",
        },
      ],
    },
    {
      slug: "console-techniques",
      title: "Console Techniques",
      blurb: "Use console.log, console.table, and console.error strategically.",
      xp: 25,
      kind: "quiz",
      content: `# Console Techniques

The \`console\` object has more than \`log\`:

\`\`\`js
console.log("value:", myVar);          // basic output
console.error("Something failed", err); // red output to stderr
console.warn("Deprecated usage");       // yellow warning
console.table([{a:1},{a:2}]);           // structured table view
console.time("label"); /* ... */ console.timeEnd("label"); // timing
console.assert(x > 0, "x must be positive"); // only logs if falsy
\`\`\`

**Tips:**
- Log **labels** with values: \`console.log("user:", user)\` not just \`console.log(user)\`
- Use \`console.error\` for errors — they appear in red and include a stack trace
- Remove debugging logs before committing — or use a proper logger that respects log levels`,
      questions: [
        {
          prompt: "What is the advantage of `console.log('user:', user)` over `console.log(user)`?",
          options: [
            "It runs faster",
            "It adds a label so you know which variable you're looking at",
            "It prevents errors",
            "It formats the output as JSON",
          ],
          answer: 1,
          explanation: "When you have many logs, labels tell you which output belongs to which variable — critical when debugging multiple values.",
        },
        {
          prompt: "You want to measure how long a function takes to run. Which console methods do you use?",
          options: [
            "console.log before and after",
            "console.time and console.timeEnd with the same label",
            "console.assert",
            "console.error",
          ],
          answer: 1,
          explanation: "`console.time('label')` starts a timer. `console.timeEnd('label')` stops it and prints the elapsed time.",
        },
      ],
    },
    {
      slug: "systematic-debugging",
      title: "The Debugging Process",
      blurb: "A repeatable method that finds bugs faster than guessing.",
      xp: 30,
      kind: "quiz",
      content: `# The Debugging Process

Effective debugging is a **scientific process**, not trial and error:

1. **Reproduce** the bug reliably — you can't fix what you can't see.
2. **Understand** the expected vs. actual behavior — write it down.
3. **Narrow** the problem — which function, which line?
4. **Hypothesize** — what could cause this specific symptom?
5. **Test** one hypothesis at a time — change one thing, observe the result.
6. **Fix** and then **verify** the bug is gone (and nothing broke).

**Rubber duck debugging:** explain the code line-by-line to an imaginary listener
(or a literal rubber duck). Articulating assumptions often reveals the bug.

**Binary search debugging:** comment out half the code; if the bug disappears,
it's in the commented half. Repeat until isolated.`,
      questions: [
        {
          prompt: "Why is 'reproduce the bug reliably' the first debugging step?",
          options: [
            "To impress your teammates",
            "So you can verify your fix actually worked",
            "To get a stack trace",
            "To find the line number",
          ],
          answer: 1,
          explanation: "If you can't reproduce the bug, you can't tell whether your fix worked. Reliable reproduction is the foundation of the whole process.",
        },
        {
          prompt: "You change three things at once and the bug disappears. What is the problem with this approach?",
          options: [
            "It takes too long",
            "You don't know which change fixed it (or if a different change broke something else)",
            "You might cause a merge conflict",
            "The bug might come back",
          ],
          answer: 1,
          explanation: "Changing multiple things at once violates the scientific method — you can't isolate the cause. Change one thing, observe, repeat.",
        },
        {
          prompt: "What is 'binary search debugging'?",
          options: [
            "Searching log files for error messages",
            "Asking a colleague to review your code",
            "Commenting out half the code to narrow down where a bug lives",
            "Running the code twice to confirm the error",
          ],
          answer: 2,
          explanation: "Like binary search in algorithms, you halve the search space each step — comment out half, check, repeat until the bug is isolated.",
        },
      ],
    },
    {
      slug: "fix-the-bug",
      title: "Fix the Bug",
      blurb: "Read a broken function and return the corrected version.",
      xp: 40,
      content: `# Fix the Bug

Below is a function meant to sum all numbers in an array.  It has a bug.

\`\`\`js
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i <= arr.length; i++) {  // BUG: off-by-one
    total += arr[i];
  }
  return total;
}
\`\`\`

When \`i === arr.length\`, \`arr[arr.length]\` is \`undefined\`, so adding it makes
\`total\` become \`NaN\`.

## Your task
Write the corrected \`sumArray(arr)\` — change \`<=\` to \`<\` in the loop condition.`,
      starterCode: `function sumArray(arr) {
  let total = 0;
  for (let i = 0; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}
`,
      solution: `function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}`,
      tests: [
        { name: "sums correctly", code: `assertEquals(sumArray([1,2,3,4]), 10);` },
        { name: "empty array → 0", code: `assertEquals(sumArray([]), 0);` },
        { name: "single element", code: `assertEquals(sumArray([7]), 7);` },
      ],
    },
    {
      slug: "defensive-code",
      title: "Defensive Coding",
      blurb: "Guard against bad inputs so bugs are caught early.",
      xp: 40,
      content: `# Defensive Coding

**Defensive code** validates inputs and fails loudly (early) instead of silently
producing wrong results.

\`\`\`js
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
\`\`\`

**Common guards:**
- Check for \`null\` / \`undefined\` before accessing properties
- Validate array inputs with \`Array.isArray\`
- Throw descriptive errors instead of returning silent garbage

## Your task
Write \`safeDivide(a, b)\`:
- If \`b === 0\`, throw an \`Error\` with the message \`"Division by zero"\`.
- Otherwise return \`a / b\`.`,
      starterCode: `function safeDivide(a, b) {
  // throw if b is 0, otherwise return a / b
}
`,
      solution: `function safeDivide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}`,
      tests: [
        { name: "10 / 2 === 5", code: `assertEquals(safeDivide(10, 2), 5);` },
        { name: "throws on divide by zero", code: `let threw = false; try { safeDivide(1, 0); } catch (e) { threw = true; } assert(threw, "should throw");` },
        { name: "error message is correct", code: `let msg = ""; try { safeDivide(5, 0); } catch(e) { msg = e.message; } assertEquals(msg, "Division by zero");` },
      ],
    },
  ],
};
