import type { Module } from "./types";

// React Fundamentals — taught as JS. The in-browser Worker has no DOM or JSX
// runtime, so the prose explains real React (JSX, hooks, events) while every
// gradeable task is a pure-JS function we can assert on deterministically.
export const react: Module = {
  slug: "react",
  title: "React Fundamentals",
  description:
    "The library that powers most of the modern web. Learn components, props, state, and hooks — the mental model behind every React app — with hands-on, auto-graded exercises.",
  emoji: "⚛️",
  gradient: "from-cyan-500/20 to-sky-500/10",
  language: "js",
  tagline:
    "Learn React: components, props, state, useState, useEffect, events, lists & keys, and conditional rendering — hands-on and auto-graded.",
  keywords: ["learn react", "react tutorial", "react hooks", "usestate useeffect", "react components props"],
  lessons: [
    {
      slug: "what-is-react",
      title: "What is React?",
      blurb: "Components, the virtual DOM, and declarative UI.",
      xp: 25,
      kind: "quiz",
      content: `# What is React?

**React** is a JavaScript library for building user interfaces out of small,
reusable pieces called **components**. Instead of manually poking at the DOM
("find this element, change its text"), you *describe* what the UI should look
like for a given state, and React figures out the minimal changes to make.

\`\`\`jsx
function Hello() {
  return <h1>Hello, world!</h1>;
}
\`\`\`

That \`<h1>...</h1>\` is **JSX** — HTML-like syntax that compiles down to plain
JavaScript function calls. A component is just a function that returns JSX.

**Two ideas power everything:**
- **Declarative** — you say *what* the UI should be for the current data; React
  handles *how* to update the screen. You never write \`document.querySelector\`.
- **Component-based** — UIs are trees of components. A \`<Page>\` renders a
  \`<Header>\` and a \`<Feed>\`, which renders many \`<Post>\` components. Each owns
  its own markup, styling, and behaviour, and you compose them like LEGO.

When data changes, React re-runs the affected components and compares the result
against a lightweight copy of the DOM (the **virtual DOM**), then patches only
what actually changed — which is what makes it fast.`,
      questions: [
        {
          prompt: "What is a React component, at its simplest?",
          options: [
            "An HTML file with embedded styles",
            "A JavaScript function that returns markup (JSX) describing some UI",
            "A CSS class that styles a page section",
            "A database table that stores UI state",
          ],
          answer: 1,
          explanation:
            "A component is just a function that returns JSX. You compose these functions into a tree to build an entire interface.",
        },
        {
          prompt: "What does it mean that React is 'declarative'?",
          options: [
            "You manually select DOM nodes and update them step by step",
            "You describe what the UI should look like for the current state, and React updates the DOM for you",
            "You must declare every variable with const",
            "You write the UI in a separate declaration file",
          ],
          answer: 1,
          explanation:
            "Declarative UI means you describe the result for a given state; React computes and applies the minimal DOM changes, so you don't write imperative DOM code.",
        },
        {
          prompt: "Why does React keep a 'virtual DOM'?",
          options: [
            "To store user passwords securely",
            "To compare the new UI against the old one and patch only what changed",
            "Because browsers can't render HTML directly",
            "To replace JavaScript with a faster language",
          ],
          answer: 1,
          explanation:
            "React diffs the new virtual DOM against the previous one and updates only the parts of the real DOM that actually changed, which keeps updates fast.",
        },
      ],
    },
    {
      slug: "jsx-basics",
      title: "JSX Basics",
      blurb: "Embed JavaScript expressions inside markup.",
      xp: 30,
      content: `# JSX Basics

**JSX** lets you write HTML-like markup inside JavaScript. Its superpower is the
curly braces \`{ }\`: anything inside them is a *JavaScript expression* whose value
gets inserted into the markup.

\`\`\`jsx
const name = "Ada";
const element = <h1>Hello, {name}!</h1>; // → Hello, Ada!
\`\`\`

You can put any expression in the braces — \`{2 + 2}\`, \`{user.name}\`,
\`{items.length}\`. Under the hood JSX compiles to function calls and ultimately
produces strings of text and DOM nodes.

To practise the *interpolation* idea without a JSX runtime, we'll model it with a
template string — exactly the value JSX would render.

## Your task
Write \`renderGreeting(name)\` that returns the string \`"Hello, {name}!"\` — for
example \`renderGreeting("Ada")\` returns \`"Hello, Ada!"\`. This mirrors what the
JSX \`<h1>Hello, {name}!</h1>\` would display.`,
      starterCode: `function renderGreeting(name) {
  // return "Hello, {name}!" with name interpolated
}
`,
      solution: `function renderGreeting(name) {
  return \`Hello, \${name}!\`;
}`,
      tests: [
        { name: 'renderGreeting("Ada")', code: `assertEquals(renderGreeting("Ada"), "Hello, Ada!");` },
        { name: 'renderGreeting("Sam")', code: `assertEquals(renderGreeting("Sam"), "Hello, Sam!");` },
      ],
    },
    {
      slug: "components-and-props",
      title: "Components & Props",
      blurb: "Pass data into a component with props.",
      xp: 35,
      content: `# Components & Props

A component receives data from its parent through **props** — a single object
argument. Props are read-only: a component never modifies the props it's given.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// used as: <Welcome name="Ada" />  → Hello, Ada
\`\`\`

The parent passes \`name="Ada"\` as an attribute; inside \`Welcome\`, it arrives as
\`props.name\`. That's the whole data-flow story: **data flows down** from parent to
child via props.

Since a component is just a function that returns its rendered output, we can
model one as a function that returns the *string* it would render.

## Your task
Write \`Welcome(props)\` that takes a props object with a \`name\` field and returns
the string \`"Hello, {props.name}"\`. For example \`Welcome({ name: "Ada" })\`
returns \`"Hello, Ada"\`.`,
      starterCode: `function Welcome(props) {
  // return "Hello, <name>" using props.name
}
`,
      solution: `function Welcome(props) {
  return \`Hello, \${props.name}\`;
}`,
      tests: [
        { name: "uses props.name", code: `assertEquals(Welcome({ name: "Ada" }), "Hello, Ada");` },
        { name: "different name", code: `assertEquals(Welcome({ name: "Grace" }), "Hello, Grace");` },
      ],
    },
    {
      slug: "usestate-hook",
      title: "useState Hook",
      blurb: "Give a component memory that survives re-renders.",
      xp: 40,
      content: `# useState Hook

A component is just a function, so any local variable resets every render. The
**\`useState\`** hook gives a component *persistent* state plus a setter that, when
called, tells React to re-render with the new value.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

\`useState(0)\` returns a pair: the current value and a function to update it.
Calling \`setCount(count + 1)\` schedules a re-render where \`count\` is one higher.

The key mental model is the *update*: given the current state, the setter
computes the next state. We can capture exactly that logic as a pure function.

## Your task
Write \`increment(count)\` that returns the next counter value — \`count + 1\`. This
is the update \`setCount(count + 1)\` performs on each click.`,
      starterCode: `function increment(count) {
  // return the next count value
}
`,
      solution: `function increment(count) {
  return count + 1;
}`,
      tests: [
        { name: "0 → 1", code: `assertEquals(increment(0), 1);` },
        { name: "41 → 42", code: `assertEquals(increment(41), 42);` },
        {
          name: "chains like repeated clicks",
          code: `assertEquals(increment(increment(increment(0))), 3);`,
        },
      ],
    },
    {
      slug: "useeffect-hook",
      title: "useEffect Hook",
      blurb: "Run side effects when dependencies change.",
      xp: 40,
      content: `# useEffect Hook

Rendering should be pure — but real apps need **side effects**: fetching data,
setting timers, syncing with the document title. The **\`useEffect\`** hook runs a
function *after* render, and re-runs it whenever a value in its **dependency
array** changes.

\`\`\`jsx
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // re-run only when count changes
\`\`\`

The dependency array is the control knob:
- \`[]\` → run once, after the first render.
- \`[count]\` → run after the first render *and* whenever \`count\` changes.
- omitted → run after *every* render.

The core decision useEffect makes is: *did any dependency change since last time?*
If so, re-run. We can model that decision as a pure comparison.

## Your task
Write \`shouldRun(prevDeps, nextDeps)\` that returns \`true\` if the two dependency
arrays differ in any position (so the effect should re-run), and \`false\` if every
element is the same. Assume both arrays have the same length.`,
      starterCode: `function shouldRun(prevDeps, nextDeps) {
  // return true if any element differs between the two arrays
}
`,
      solution: `function shouldRun(prevDeps, nextDeps) {
  return prevDeps.some((dep, i) => dep !== nextDeps[i]);
}`,
      tests: [
        {
          name: "same deps → no re-run",
          code: `assertEquals(shouldRun([1, "a"], [1, "a"]), false);`,
        },
        {
          name: "changed dep → re-run",
          code: `assertEquals(shouldRun([1, "a"], [2, "a"]), true);`,
        },
        {
          name: "empty deps → no re-run",
          code: `assertEquals(shouldRun([], []), false);`,
        },
      ],
    },
    {
      slug: "event-handling",
      title: "Event Handling",
      blurb: "Respond to clicks, input, and other events.",
      xp: 35,
      content: `# Event Handling

In React you attach event handlers as **props** written in camelCase —
\`onClick\`, \`onChange\`, \`onSubmit\` — and pass them a *function* to call when the
event fires.

\`\`\`jsx
function Toggle() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>;
}
\`\`\`

Note you pass \`{() => setOn(!on)}\` — the function itself — **not** \`{setOn(!on)}\`,
which would call it immediately during render. The handler typically computes the
*next state* from the event and the current state.

Here the handler flips a boolean. Let's capture that toggle logic on its own.

## Your task
Write \`handleToggle(isOn)\` that returns the opposite boolean — the new value the
\`onClick\` handler would set. \`handleToggle(false)\` returns \`true\`.`,
      starterCode: `function handleToggle(isOn) {
  // return the flipped boolean
}
`,
      solution: `function handleToggle(isOn) {
  return !isOn;
}`,
      tests: [
        { name: "false → true", code: `assertEquals(handleToggle(false), true);` },
        { name: "true → false", code: `assertEquals(handleToggle(true), false);` },
      ],
    },
    {
      slug: "lists-and-keys",
      title: "Lists & Keys",
      blurb: "Render an array of data into a list of elements.",
      xp: 40,
      content: `# Lists & Keys

To render a collection, you \`.map\` an array of data into an array of elements.
React requires a stable, unique **\`key\`** prop on each item so it can track which
is which across re-renders (and avoid re-rendering the whole list).

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

The shape of this is *transform each data item into rendered output*. We can model
the mapped result as an array of strings — exactly the text each \`<li>\` would show.

## Your task
Write \`renderItems(items)\` where \`items\` is an array of \`{ id, text }\` objects.
Return an array of strings, each formatted as \`"{id}: {text}"\`. For example
\`[{ id: 1, text: "Milk" }]\` returns \`["1: Milk"]\`.`,
      starterCode: `function renderItems(items) {
  // map each { id, text } to the string "id: text"
}
`,
      solution: `function renderItems(items) {
  return items.map((item) => \`\${item.id}: \${item.text}\`);
}`,
      tests: [
        {
          name: "maps two items",
          code: `assertEquals(
  renderItems([{ id: 1, text: "Milk" }, { id: 2, text: "Eggs" }]),
  ["1: Milk", "2: Eggs"]
);`,
        },
        {
          name: "empty list → empty array",
          code: `assertEquals(renderItems([]), []);`,
        },
      ],
    },
    {
      slug: "conditional-rendering",
      title: "Conditional Rendering",
      blurb: "Show different UI based on state.",
      xp: 35,
      content: `# Conditional Rendering

There's no special "if" in JSX — you use ordinary JavaScript expressions to choose
what to render. The two most common patterns:

\`\`\`jsx
// ternary: pick one of two outputs
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// && : render something only when a condition is true
{unread > 0 && <Badge count={unread} />}
\`\`\`

Because these are just expressions, the logic of "which UI?" is a pure decision
based on the current state — something we can model directly.

## Your task
Write \`greeting(isLoggedIn)\` that returns \`"Welcome back!"\` when \`isLoggedIn\` is
true and \`"Please sign in"\` when it's false — the ternary a component would use to
pick which element to render.`,
      starterCode: `function greeting(isLoggedIn) {
  // return the right message based on isLoggedIn
}
`,
      solution: `function greeting(isLoggedIn) {
  return isLoggedIn ? "Welcome back!" : "Please sign in";
}`,
      tests: [
        { name: "logged in", code: `assertEquals(greeting(true), "Welcome back!");` },
        { name: "logged out", code: `assertEquals(greeting(false), "Please sign in");` },
      ],
    },
  ],
};
