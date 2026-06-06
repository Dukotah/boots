import type { Module } from "./types";

// Go (Golang) — taught as JS. The in-browser Worker has no Go runtime (no
// `go build`, goroutines, channels, or a real scheduler), so — exactly like the
// Node and React courses — the prose teaches real Go while every gradeable task
// is a pure-JS function modelling the concept (multiple returns, slices, maps,
// structs, fan-in concurrency, the value/err idiom) that we can assert on
// deterministically. Each coding lesson says so plainly so learners aren't
// confused about why they're typing JS to learn Go.
export const go: Module = {
  slug: "go",
  title: "Go (Golang)",
  description:
    "Google's fast, simple language for servers and tools. Learn Go's types, multiple returns, slices, maps, structs, goroutines, and its famous error-handling idiom — explained with real Go and reinforced with hands-on, auto-graded exercises.",
  emoji: "🐹",
  gradient: "from-sky-500/20 to-cyan-500/10",
  language: "js",
  tagline:
    "Learn Go (Golang): variables and types, functions with multiple returns, slices, maps, structs, goroutines and channels, and idiomatic error handling — hands-on and auto-graded.",
  keywords: ["learn go", "golang tutorial", "go programming", "goroutines channels", "go error handling"],
  lessons: [
    {
      slug: "what-is-go",
      title: "What is Go?",
      blurb: "A compiled, concurrent language built for simplicity and scale.",
      xp: 25,
      kind: "quiz",
      content: `# What is Go?

**Go** (often called **Golang**) is an open-source programming language created
at Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. It was
designed to make large-scale software *simple, fast, and reliable* — a reaction
to slow builds and tangled dependencies in big C++ and Java codebases.

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")
}
\`\`\`

**What makes Go distinctive:**
- **Compiled and fast** — Go compiles straight to a single self-contained native
  binary. No virtual machine, no interpreter, no runtime to install on the
  server — you ship one file.
- **Built-in concurrency** — lightweight **goroutines** and **channels** make it
  easy to run thousands of tasks at once. This is Go's headline feature and why
  it powers tools like Docker, Kubernetes, and Terraform.
- **Deliberately small and simple** — the whole language fits in your head. No
  classes or inheritance, no exceptions, minimal keywords. There's usually one
  obvious way to do something.
- **A garbage collector** — like Java or JavaScript, Go manages memory for you,
  but with low-latency pauses suited to servers.

Go is statically typed and compiled, so a whole class of mistakes is caught
*before* your program ever runs — yet it reads almost as cleanly as a scripting
language.

> **Heads up for this course:** there's no Go compiler inside your browser, so —
> just like our Node and React courses — you'll *read* real Go in every lesson,
> then practise the underlying idea by writing a small **JavaScript** function
> the auto-grader can run. The Go concept is the lesson; the JS is just the gym.`,
      questions: [
        {
          prompt: "What does the Go compiler produce?",
          options: [
            "Bytecode that needs a virtual machine to run",
            "A single self-contained native binary",
            "An interpreted script run line by line",
            "HTML and CSS for the browser",
          ],
          answer: 1,
          explanation:
            "Go compiles ahead of time to one native binary with no external runtime, so deploying a Go program is often just copying a single file to the server.",
        },
        {
          prompt: "What is Go best known for making easy?",
          options: [
            "Object-oriented class hierarchies and inheritance",
            "Concurrency, via lightweight goroutines and channels",
            "Dynamic typing with no type declarations",
            "Throwing and catching exceptions",
          ],
          answer: 1,
          explanation:
            "Go's headline feature is cheap concurrency: goroutines are far lighter than OS threads, and channels coordinate them. Go deliberately omits classes/inheritance and exceptions.",
        },
        {
          prompt: "Why is Go considered 'simple' as a language?",
          options: [
            "It has no types, so there's nothing to learn",
            "It has a small feature set with usually one obvious way to do things",
            "It runs only on a single operating system",
            "It hides all of its source code from the programmer",
          ],
          answer: 1,
          explanation:
            "Go intentionally keeps its feature set small — few keywords, no inheritance, no exceptions — so the whole language fits in your head and code stays readable.",
        },
      ],
    },
    {
      slug: "variables-and-types",
      title: "Variables & Types",
      blurb: "Declare typed values and let Go infer the rest.",
      xp: 30,
      content: `# Variables & Types

Go is **statically typed**: every variable has a type, fixed at compile time.
You can write the type out, or let Go *infer* it from the value with the short
declaration operator \`:=\`.

\`\`\`go
var name string = "Ada"   // explicit type
age := 36                 // inferred as int
price := 4.99             // inferred as float64
active := true            // inferred as bool
\`\`\`

Go's basic types include \`string\`, \`int\`, \`float64\`, and \`bool\`. A key Go rule:
**zero values**. A variable declared without a value isn't \`undefined\` — it gets
its type's *zero value*: \`0\` for numbers, \`""\` for strings, \`false\` for bools.

\`\`\`go
var count int      // count is 0, not undefined
var label string   // label is "", not undefined
\`\`\`

This means Go programs never start from "undefined" the way JavaScript can.

> **In JS for the grader:** there's no Go runtime here, so we'll model Go's
> *zero-value* rule with a plain JS function.

## Your task
Write \`zeroValue(type)\` that returns Go's zero value for a type name:
- \`"int"\` and \`"float64"\` → \`0\`
- \`"string"\` → \`""\` (empty string)
- \`"bool"\` → \`false\`

For any other type name, return \`null\` (modelling Go's \`nil\`).`,
      starterCode: `function zeroValue(type) {
  // return Go's zero value for the given type name
}
`,
      solution: `function zeroValue(type) {
  switch (type) {
    case "int":
    case "float64":
      return 0;
    case "string":
      return "";
    case "bool":
      return false;
    default:
      return null;
  }
}`,
      tests: [
        { name: "int → 0", code: `assertEquals(zeroValue("int"), 0);` },
        { name: "float64 → 0", code: `assertEquals(zeroValue("float64"), 0);` },
        { name: "string → empty string", code: `assertEquals(zeroValue("string"), "");` },
        { name: "bool → false", code: `assertEquals(zeroValue("bool"), false);` },
        { name: "unknown → nil/null", code: `assertEquals(zeroValue("Widget"), null);` },
      ],
    },
    {
      slug: "functions-multiple-returns",
      title: "Functions & Multiple Returns",
      howToTitle: "return multiple values from a function",
      blurb: "Go functions can hand back more than one value at once.",
      xp: 35,
      content: `# Functions & Multiple Returns

A Go function declares its parameter types and its return type(s) right in the
signature. The standout feature: a function can return **multiple values**.

\`\`\`go
func divmod(a, b int) (int, int) {
    return a / b, a % b
}

q, r := divmod(17, 5) // q = 3, r = 2
\`\`\`

This is everywhere in Go. Instead of bundling results into an object, you just
return them side by side and unpack them with \`q, r :=\`. It's also the
foundation of Go's error handling, where functions return \`(result, error)\` — a
pattern you'll meet in the final lesson.

> **In JS for the grader:** JavaScript can't return two values loose, but the
> idiomatic stand-in is to return an **array** (a tuple) and destructure it —
> \`const [q, r] = divmod(17, 5)\` — which mirrors Go's \`q, r := divmod(17, 5)\`.

## Your task
Write \`divmod(a, b)\` that returns a two-element array \`[quotient, remainder]\`,
using integer (floor) division. For example \`divmod(17, 5)\` returns \`[3, 2]\`.`,
      starterCode: `function divmod(a, b) {
  // return [quotient, remainder] like Go's "return a / b, a % b"
}
`,
      solution: `function divmod(a, b) {
  return [Math.floor(a / b), a % b];
}`,
      tests: [
        { name: "divmod(17, 5)", code: `assertEquals(divmod(17, 5), [3, 2]);` },
        { name: "divmod(10, 2)", code: `assertEquals(divmod(10, 2), [5, 0]);` },
        {
          name: "destructures like Go",
          code: `const [q, r] = divmod(23, 4);
assertEquals(q, 5);
assertEquals(r, 3);`,
        },
      ],
    },
    {
      slug: "slices",
      title: "Slices",
      blurb: "Go's flexible, growable view over a sequence of values.",
      xp: 35,
      content: `# Slices

Arrays in Go have a fixed length, so most code uses **slices** instead — a
dynamic, growable view over a sequence. You build one up with the built-in
\`append\`, which returns the (possibly larger) slice.

\`\`\`go
nums := []int{1, 2, 3}
nums = append(nums, 4)   // nums is now [1 2 3 4]

total := 0
for _, n := range nums { // range yields index, value
    total += n
}
// total == 10
\`\`\`

Notice \`for _, n := range nums\`: \`range\` gives you each index and value, and the
blank identifier \`_\` discards the index when you only want the value. Summing a
slice this way is one of the most common loops in all of Go.

> **In JS for the grader:** a Go slice maps cleanly onto a JS array, so we model
> the classic "range and accumulate" loop directly.

## Your task
Write \`sumSlice(nums)\` that returns the sum of all numbers in the array \`nums\`,
mirroring Go's \`for _, n := range nums { total += n }\`. An empty array returns
\`0\` (Go's zero value for the total).`,
      starterCode: `function sumSlice(nums) {
  // range over nums and accumulate the total
}
`,
      solution: `function sumSlice(nums) {
  let total = 0;
  for (const n of nums) {
    total += n;
  }
  return total;
}`,
      tests: [
        { name: "sums [1,2,3,4]", code: `assertEquals(sumSlice([1, 2, 3, 4]), 10);` },
        { name: "single element", code: `assertEquals(sumSlice([42]), 42);` },
        { name: "empty slice → 0", code: `assertEquals(sumSlice([]), 0);` },
      ],
    },
    {
      slug: "maps",
      title: "Maps",
      blurb: "Key–value lookups, and the comma-ok idiom.",
      xp: 35,
      content: `# Maps

A **map** in Go is a key–value store, like a JS object or a Python dict. You
declare its key and value types, then read and write by key.

\`\`\`go
counts := map[string]int{"apples": 3}
counts["pears"] = 5
n := counts["apples"] // 3
\`\`\`

Go has a famous trick for reads: the **comma-ok** idiom. Indexing a map returns
*two* values — the value, and a boolean saying whether the key was actually
present:

\`\`\`go
v, ok := counts["bananas"]
// v == 0 (the zero value), ok == false
\`\`\`

This matters because a missing key returns the value type's *zero value*, so you
can't tell "absent" from "present but zero" by the value alone — \`ok\` tells you.

> **In JS for the grader:** we model comma-ok as a function returning a
> \`[value, ok]\` tuple, just like \`v, ok := m[key]\` in Go.

## Your task
Write \`mapGet(m, key)\` that returns a two-element array \`[value, ok]\`:
- If \`key\` exists in object \`m\`, return \`[m[key], true]\`.
- If it's missing, return \`[0, false]\` (Go's int zero value, plus \`ok = false\`).`,
      starterCode: `function mapGet(m, key) {
  // return [value, ok] like Go's "v, ok := m[key]"
}
`,
      solution: `function mapGet(m, key) {
  if (Object.prototype.hasOwnProperty.call(m, key)) {
    return [m[key], true];
  }
  return [0, false];
}`,
      tests: [
        {
          name: "present key → [value, true]",
          code: `assertEquals(mapGet({ apples: 3 }, "apples"), [3, true]);`,
        },
        {
          name: "missing key → [0, false]",
          code: `assertEquals(mapGet({ apples: 3 }, "bananas"), [0, false]);`,
        },
        {
          name: "destructures like comma-ok",
          code: `const [v, ok] = mapGet({ x: 9 }, "x");
assertEquals(v, 9);
assertEquals(ok, true);`,
        },
      ],
    },
    {
      slug: "structs",
      title: "Structs",
      blurb: "Group related fields into a custom type, with methods.",
      xp: 35,
      content: `# Structs

Go has no classes. Instead you group related fields into a **struct**, then
attach behaviour with **methods** that take a *receiver*.

\`\`\`go
type Rectangle struct {
    Width  float64
    Height float64
}

// method with a receiver (r Rectangle)
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

r := Rectangle{Width: 3, Height: 4}
r.Area() // 12
\`\`\`

The \`(r Rectangle)\` before the method name is the **receiver** — it's how Go
says "this method belongs to Rectangle", taking the place of \`this\` in other
languages. Structs plus methods give you most of what objects do, without
inheritance.

> **In JS for the grader:** we model a struct as a plain object \`{ width, height }\`
> and the \`Area()\` method as a function that takes that struct — the receiver
> becomes an ordinary argument.

## Your task
Write \`area(rect)\` where \`rect\` is \`{ width, height }\`. Return \`width * height\`,
exactly what Go's \`Rectangle.Area()\` method computes. For example
\`area({ width: 3, height: 4 })\` returns \`12\`.`,
      starterCode: `function area(rect) {
  // return the rectangle's area from its width and height
}
`,
      solution: `function area(rect) {
  return rect.width * rect.height;
}`,
      tests: [
        { name: "3 x 4 → 12", code: `assertEquals(area({ width: 3, height: 4 }), 12);` },
        { name: "2.5 x 2 → 5", code: `assertEquals(area({ width: 2.5, height: 2 }), 5);` },
        { name: "zero width → 0", code: `assertEquals(area({ width: 0, height: 9 }), 0);` },
      ],
    },
    {
      slug: "goroutines-and-concurrency",
      title: "Goroutines & Concurrency",
      howToTitle: "fan in results from concurrent goroutines",
      blurb: "Run work concurrently and collect the results on a channel.",
      xp: 45,
      content: `# Goroutines & Concurrency

A **goroutine** is a function running concurrently with the rest of your program.
You start one by putting \`go\` in front of a call — it's so cheap you can launch
thousands. Goroutines talk to each other through **channels**, typed pipes you
send to with \`ch <- value\` and receive from with \`<-ch\`.

\`\`\`go
func worker(n int, ch chan int) {
    ch <- n * n          // send the square onto the channel
}

func main() {
    nums := []int{1, 2, 3, 4}
    ch := make(chan int)

    for _, n := range nums {
        go worker(n, ch)   // launch a goroutine per number
    }

    total := 0
    for range nums {
        total += <-ch      // fan-in: receive every result
    }
    // total == 1 + 4 + 9 + 16 == 30
}
\`\`\`

This is the **fan-out / fan-in** pattern: fan *out* by launching a goroutine per
item, then fan *in* by receiving every result on one channel and combining them.
Because each worker is independent and addition is associative, the **final total
is deterministic** even though the goroutines may finish in any order.

> **In JS for the grader:** there's no real scheduler or channel here, so we model
> the *deterministic outcome* of fan-out/fan-in — each worker computes a result,
> and we combine them all into the final total. The order workers finish in
> doesn't change the sum, which is exactly why this pattern is safe in Go.

## Your task
Write \`fanInSquares(nums)\` that simulates the program above: for each number in
\`nums\`, compute its square (the "goroutine" result), then return the sum of all
the squares collected off the "channel". For example \`fanInSquares([1, 2, 3, 4])\`
returns \`30\`. An empty array returns \`0\`.`,
      starterCode: `function fanInSquares(nums) {
  // square each number (the goroutine results) and sum them (fan-in)
}
`,
      solution: `function fanInSquares(nums) {
  let total = 0;
  for (const n of nums) {
    const result = n * n; // what a worker goroutine would send on the channel
    total += result;      // fan-in: combine every received result
  }
  return total;
}`,
      tests: [
        { name: "fanInSquares([1,2,3,4]) → 30", code: `assertEquals(fanInSquares([1, 2, 3, 4]), 30);` },
        { name: "single worker", code: `assertEquals(fanInSquares([5]), 25);` },
        { name: "no goroutines → 0", code: `assertEquals(fanInSquares([]), 0);` },
        {
          name: "order-independent (shuffled input, same sum)",
          code: `assertEquals(fanInSquares([3, 1, 4, 2]), fanInSquares([1, 2, 3, 4]));`,
        },
      ],
    },
    {
      slug: "error-handling",
      title: "Error Handling",
      howToTitle: "handle errors with the value, err idiom",
      blurb: "Go's signature pattern: return a value and an error, and check it.",
      xp: 40,
      content: `# Error Handling

Go has **no exceptions**. Instead, a function that can fail returns an extra
**error** value as its *last* return, and the caller checks it immediately. This
is the most recognisable pattern in all of Go.

\`\`\`go
func safeDivide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("divide by zero")
    }
    return a / b, nil
}

result, err := safeDivide(10, 0)
if err != nil {
    // handle the failure
    fmt.Println("error:", err)
} else {
    fmt.Println("ok:", result)
}
\`\`\`

The contract is strict and consistent:
- On **success**, return the real value and \`nil\` for the error.
- On **failure**, return the type's zero value *and* a non-\`nil\` error.
- The caller **must** check \`if err != nil\` before trusting the result.

There's no hidden control flow — errors are ordinary values you pass around and
inspect, which keeps Go programs explicit about what can go wrong.

> **In JS for the grader:** we model \`(result, error)\` as a returned tuple
> \`[result, error]\`, with \`error\` being \`null\` to stand in for Go's \`nil\`. This
> mirrors \`result, err := safeDivide(a, b)\` exactly.

## Your task
Write \`safeDivide(a, b)\` that returns a two-element array \`[result, error]\`:
- If \`b\` is \`0\`, return \`[0, "divide by zero"]\` (zero value plus an error message).
- Otherwise return \`[Math.floor(a / b), null]\` (the quotient, and \`null\` for nil).`,
      starterCode: `function safeDivide(a, b) {
  // return [result, error] — error is null on success, a message on failure
}
`,
      solution: `function safeDivide(a, b) {
  if (b === 0) {
    return [0, "divide by zero"];
  }
  return [Math.floor(a / b), null];
}`,
      tests: [
        {
          name: "success → [result, null]",
          code: `assertEquals(safeDivide(10, 2), [5, null]);`,
        },
        {
          name: "divide by zero → [0, error]",
          code: `assertEquals(safeDivide(10, 0), [0, "divide by zero"]);`,
        },
        {
          name: "caller checks err like Go",
          code: `const [result, err] = safeDivide(9, 0);
assert(err !== null, "expected a non-nil error");
assertEquals(result, 0);`,
        },
      ],
    },
  ],
};
