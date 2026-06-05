import type { Module } from "./types";

// Behavioral Design Patterns — Observer, Strategy, Command, State, and more.
// Auto-graded in-browser via Web Worker (JS).
export const behavioralPatterns: Module = {
  slug: "behavioral-patterns",
  title: "Behavioral Design Patterns",
  description:
    "Build Observer, Strategy, Command, and State patterns from scratch in JavaScript — the four patterns that turn tangled if/else chains into clean, extensible systems.",
  emoji: "🧩",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline:
    "Learn behavioral design patterns in JavaScript: Observer, Strategy, Command, State, and Iterator built from scratch.",
  keywords: [
    "behavioral design patterns javascript",
    "observer pattern js",
    "strategy pattern js",
    "command pattern js",
    "state pattern js",
    "design patterns interview",
  ],
  lessons: [
    {
      slug: "what-are-behavioral-patterns",
      title: "What Are Behavioral Patterns?",
      blurb: "How objects communicate and delegate responsibility.",
      xp: 20,
      kind: "quiz",
      content: `# What Are Behavioral Patterns?

Design patterns are battle-tested blueprints for solving recurring software problems. **Behavioral patterns** specifically focus on **how objects communicate** and distribute responsibility.

The Gang of Four defined 11 behavioral patterns. In this module you will build the most practical four:

| Pattern | Core idea |
|---------|-----------|
| **Observer** | Objects subscribe to events and get notified automatically |
| **Strategy** | Swap algorithms at runtime without changing the caller |
| **Command** | Wrap an action as an object (enables undo, queuing, logging) |
| **State** | Change an object's behavior by switching its internal state object |

## Why should you care?

Without patterns you end up with:
- Massive \`if/else\` chains to handle every case
- Tight coupling: changing one class breaks five others
- Copy-pasted logic scattered across the codebase

With patterns you get **open/closed** code: open for extension, closed for modification.`,
      questions: [
        {
          prompt: "Which category of design patterns focuses on how objects communicate and delegate responsibility?",
          options: [
            "Creational patterns",
            "Structural patterns",
            "Behavioral patterns",
          ],
          answer: 2,
          explanation:
            "Behavioral patterns (Observer, Strategy, Command, State, etc.) describe how objects interact and distribute work. Creational patterns handle object creation; structural patterns handle composition.",
        },
        {
          prompt: "The Observer pattern is best described as:",
          options: [
            "Swapping one algorithm for another at runtime",
            "Objects subscribing to events and being notified automatically",
            "Wrapping an action as an object to support undo",
          ],
          answer: 1,
          explanation:
            "Observer defines a one-to-many dependency: when one object changes state, all dependents are notified automatically.",
        },
        {
          prompt: "The main benefit of wrapping an action as a Command object is:",
          options: [
            "It makes your code run faster",
            "It enables undo, queuing, and logging of actions",
            "It removes the need for functions entirely",
          ],
          answer: 1,
          explanation:
            "Turning actions into first-class objects means you can store, queue, replay, or reverse them — something plain function calls cannot do as easily.",
        },
      ],
    },
    {
      slug: "observer-event-emitter",
      title: "Observer — EventEmitter from Scratch",
      blurb: "Build a publish/subscribe EventEmitter in 15 lines.",
      xp: 40,
      content: `# Observer — EventEmitter from Scratch

The **Observer pattern** (also called Pub/Sub) lets many objects listen for events on a single source.

Node's \`EventEmitter\` and the browser's \`addEventListener\` are both Observer implementations. Here you will build a minimal version.

\`\`\`js
const emitter = new EventEmitter();
emitter.on("greet", (name) => console.log("Hello " + name));
emitter.emit("greet", "world"); // Hello world
\`\`\`

## Your task

Implement \`EventEmitter\` with three methods:

- \`on(event, listener)\` — register a listener function for an event
- \`off(event, listener)\` — remove a specific listener
- \`emit(event, ...args)\` — call every registered listener for the event with the given args

Listeners for the same event should be called in registration order.`,
      starterCode: `class EventEmitter {
  constructor() {
    // store listeners here
  }

  on(event, listener) {
    // register listener
  }

  off(event, listener) {
    // remove listener
  }

  emit(event, ...args) {
    // call all listeners for event
  }
}
`,
      solution: `class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  on(event, listener) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(listener);
  }

  off(event, listener) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this._listeners[event]) return;
    for (const listener of this._listeners[event]) {
      listener(...args);
    }
  }
}`,
      tests: [
        {
          name: "on + emit calls listener with args",
          code: `const ee = new EventEmitter();
const log = [];
ee.on("data", (x) => log.push(x));
ee.emit("data", 42);
assertEquals(log[0], 42);`,
        },
        {
          name: "multiple listeners called in order",
          code: `const ee = new EventEmitter();
const order = [];
ee.on("tick", () => order.push(1));
ee.on("tick", () => order.push(2));
ee.emit("tick");
assertEquals(JSON.stringify(order), JSON.stringify([1, 2]));`,
        },
        {
          name: "off removes a listener",
          code: `const ee = new EventEmitter();
const log = [];
const fn = (x) => log.push(x);
ee.on("x", fn);
ee.off("x", fn);
ee.emit("x", 99);
assertEquals(log.length, 0);`,
        },
        {
          name: "emit on unknown event does not throw",
          code: `const ee = new EventEmitter();
ee.emit("ghost"); // should not throw`,
        },
      ],
      hints: [
        "Store listeners in a plain object keyed by event name, each value being an array.",
        "For `off`, use `.filter()` to keep all listeners that are NOT the one being removed.",
        "For `emit`, guard against missing keys with an early return, then loop with `for...of`.",
      ],
      explanation: `The key insight is that \`this._listeners\` is just a dictionary from event name → array of functions. \`on\` pushes, \`off\` filters, \`emit\` spreads the args into each listener. This is exactly how Node's built-in \`EventEmitter\` works under the hood.`,
    },
    {
      slug: "observer-once",
      title: "Observer — One-Time Listeners",
      blurb: "Add once() so a listener auto-removes after firing.",
      xp: 35,
      content: `# Observer — One-Time Listeners

Real event emitters have a \`once(event, listener)\` method that fires the listener **exactly once**, then removes it automatically.

The trick is to wrap the original listener in a disposable function that calls \`off\` on itself before invoking the real callback.

\`\`\`js
emitter.once("connect", () => console.log("connected!"));
emitter.emit("connect"); // "connected!"
emitter.emit("connect"); // nothing
\`\`\`

## Your task

Extend the \`EventEmitter\` class from the previous lesson by adding:

- \`once(event, listener)\` — registers a wrapper that calls the real listener **once**, then removes itself

You can copy your previous \`on\`, \`off\`, and \`emit\` implementation here.`,
      starterCode: `class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  on(event, listener) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(listener);
  }

  off(event, listener) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this._listeners[event]) return;
    for (const listener of this._listeners[event]) listener(...args);
  }

  once(event, listener) {
    // wrap listener so it fires once then removes itself
  }
}
`,
      solution: `class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  on(event, listener) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(listener);
  }

  off(event, listener) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this._listeners[event]) return;
    for (const listener of this._listeners[event]) listener(...args);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    this.on(event, wrapper);
  }
}`,
      tests: [
        {
          name: "once fires on first emit",
          code: `const ee = new EventEmitter();
const log = [];
ee.once("ping", (v) => log.push(v));
ee.emit("ping", 1);
assertEquals(log[0], 1);`,
        },
        {
          name: "once does NOT fire on second emit",
          code: `const ee = new EventEmitter();
let count = 0;
ee.once("ping", () => count++);
ee.emit("ping");
ee.emit("ping");
assertEquals(count, 1);`,
        },
        {
          name: "once passes args correctly",
          code: `const ee = new EventEmitter();
let result = null;
ee.once("add", (a, b) => { result = a + b; });
ee.emit("add", 3, 4);
assertEquals(result, 7);`,
        },
      ],
      hints: [
        "Create a `wrapper` function inside `once` that calls `off(event, wrapper)` then calls the original `listener`.",
        "Register `wrapper` (not the original `listener`) with `on`.",
      ],
    },
    {
      slug: "strategy-pattern",
      title: "Strategy — Swappable Algorithms",
      blurb: "Encapsulate algorithms behind a common interface.",
      xp: 40,
      content: `# Strategy — Swappable Algorithms

The **Strategy pattern** defines a family of algorithms, encapsulates each one, and makes them interchangeable. The caller picks a strategy at runtime without knowing its internals.

Classic example: a shopping cart that can apply different discount strategies.

\`\`\`
NoDiscount    → price * 1
TenPercent    → price * 0.9
HalfOff       → price * 0.5
\`\`\`

The \`Cart\` class holds a reference to whichever strategy is active:

\`\`\`js
const cart = new Cart(new TenPercentDiscount());
cart.total(100); // 90
cart.setStrategy(new HalfOffDiscount());
cart.total(100); // 50
\`\`\`

## Your task

1. Implement three strategy classes, each with a \`calculate(price)\` method:
   - \`NoDiscount\` — returns \`price\` unchanged
   - \`TenPercentDiscount\` — returns \`price * 0.9\`
   - \`HalfOffDiscount\` — returns \`price * 0.5\`

2. Implement \`Cart\` with:
   - \`constructor(strategy)\` — stores the initial strategy
   - \`setStrategy(strategy)\` — swaps the strategy
   - \`total(price)\` — delegates to \`strategy.calculate(price)\``,
      starterCode: `class NoDiscount {
  calculate(price) {
    // return price unchanged
  }
}

class TenPercentDiscount {
  calculate(price) {
    // return 10% off
  }
}

class HalfOffDiscount {
  calculate(price) {
    // return 50% off
  }
}

class Cart {
  constructor(strategy) {
    // store strategy
  }

  setStrategy(strategy) {
    // swap strategy
  }

  total(price) {
    // delegate to strategy
  }
}
`,
      solution: `class NoDiscount {
  calculate(price) {
    return price;
  }
}

class TenPercentDiscount {
  calculate(price) {
    return price * 0.9;
  }
}

class HalfOffDiscount {
  calculate(price) {
    return price * 0.5;
  }
}

class Cart {
  constructor(strategy) {
    this._strategy = strategy;
  }

  setStrategy(strategy) {
    this._strategy = strategy;
  }

  total(price) {
    return this._strategy.calculate(price);
  }
}`,
      tests: [
        {
          name: "NoDiscount returns full price",
          code: `const cart = new Cart(new NoDiscount());
assertEquals(cart.total(100), 100);`,
        },
        {
          name: "TenPercentDiscount returns 90",
          code: `const cart = new Cart(new TenPercentDiscount());
assertEquals(cart.total(100), 90);`,
        },
        {
          name: "HalfOffDiscount returns 50",
          code: `const cart = new Cart(new HalfOffDiscount());
assertEquals(cart.total(100), 50);`,
        },
        {
          name: "setStrategy swaps at runtime",
          code: `const cart = new Cart(new NoDiscount());
assertEquals(cart.total(200), 200);
cart.setStrategy(new HalfOffDiscount());
assertEquals(cart.total(200), 100);`,
        },
      ],
      hints: [
        "Each strategy class only needs a single `calculate(price)` method.",
        "`Cart.total` should just return `this._strategy.calculate(price)` — no logic needed in `Cart` itself.",
      ],
      explanation: `The power of Strategy is that \`Cart\` never needs an \`if/else\` chain. Adding a new discount type means adding a new class — \`Cart\` does not change at all. This is the Open/Closed Principle in action.`,
    },
    {
      slug: "command-pattern",
      title: "Command — Actions as Objects",
      blurb: "Wrap operations so you can queue, log, or undo them.",
      xp: 45,
      content: `# Command — Actions as Objects

The **Command pattern** turns a request into a stand-alone object. That object contains everything needed to perform the action later — and optionally, to reverse it.

A \`TextEditor\` with undo needs exactly this. Every edit becomes a Command:

\`\`\`js
editor.execute(new InsertCommand("Hello"));
editor.execute(new InsertCommand(" World"));
editor.undo(); // removes " World"
editor.undo(); // removes "Hello"
\`\`\`

## Your task

1. Implement \`InsertCommand\` with:
   - \`constructor(text)\` — stores the text to insert
   - \`execute(editor)\` — appends \`text\` to \`editor.content\`
   - \`undo(editor)\` — removes the last \`text.length\` characters from \`editor.content\`

2. Implement \`TextEditor\` with:
   - \`constructor()\` — initializes \`content\` to \`""\` and a \`_history\` stack to \`[]\`
   - \`execute(command)\` — calls \`command.execute(this)\` and pushes the command onto \`_history\`
   - \`undo()\` — pops the last command and calls its \`undo(this)\`; does nothing if history is empty`,
      starterCode: `class InsertCommand {
  constructor(text) {
    // store text
  }

  execute(editor) {
    // append this.text to editor.content
  }

  undo(editor) {
    // remove the last this.text.length characters from editor.content
  }
}

class TextEditor {
  constructor() {
    this.content = "";
    // initialize history stack
  }

  execute(command) {
    // run command and push to history
  }

  undo() {
    // pop last command and call its undo
  }
}
`,
      solution: `class InsertCommand {
  constructor(text) {
    this.text = text;
  }

  execute(editor) {
    editor.content += this.text;
  }

  undo(editor) {
    editor.content = editor.content.slice(0, editor.content.length - this.text.length);
  }
}

class TextEditor {
  constructor() {
    this.content = "";
    this._history = [];
  }

  execute(command) {
    command.execute(this);
    this._history.push(command);
  }

  undo() {
    const command = this._history.pop();
    if (command) command.undo(this);
  }
}`,
      tests: [
        {
          name: "execute inserts text",
          code: `const ed = new TextEditor();
ed.execute(new InsertCommand("Hello"));
assertEquals(ed.content, "Hello");`,
        },
        {
          name: "two executes concat correctly",
          code: `const ed = new TextEditor();
ed.execute(new InsertCommand("foo"));
ed.execute(new InsertCommand("bar"));
assertEquals(ed.content, "foobar");`,
        },
        {
          name: "undo removes last insert",
          code: `const ed = new TextEditor();
ed.execute(new InsertCommand("foo"));
ed.execute(new InsertCommand("bar"));
ed.undo();
assertEquals(ed.content, "foo");`,
        },
        {
          name: "undo twice restores empty string",
          code: `const ed = new TextEditor();
ed.execute(new InsertCommand("Hello"));
ed.execute(new InsertCommand(" World"));
ed.undo();
ed.undo();
assertEquals(ed.content, "");`,
        },
        {
          name: "undo on empty history does not throw",
          code: `const ed = new TextEditor();
ed.undo(); // should not throw
assertEquals(ed.content, "");`,
        },
      ],
      hints: [
        "`undo` for an insert is just slicing off `this.text.length` characters from the end of `editor.content`.",
        "Use an array as a stack: `push` in `execute`, `pop` in `undo`.",
        "Guard `undo` with `if (command)` in case the history is empty.",
      ],
      explanation: `The Command pattern separates *what* an action does from *when* it runs. Because each Command carries its own undo logic, the \`TextEditor\` itself stays clean — it never needs to know about the specifics of inserting or deleting text.`,
    },
    {
      slug: "state-pattern",
      title: "State — Behavior That Changes with Context",
      blurb: "Replace boolean flags with state objects that know how to behave.",
      xp: 45,
      content: `# State — Behavior That Changes with Context

The **State pattern** lets an object change its behavior when its internal state changes. Instead of giant \`if/else\` or \`switch\` chains, you create a separate class for each state and delegate to it.

Classic example: a traffic light with three states — red, yellow, green — each knowing what the next state is.

\`\`\`js
const light = new TrafficLight();
light.getColor(); // "red"
light.next();
light.getColor(); // "green"
light.next();
light.getColor(); // "yellow"
light.next();
light.getColor(); // "red"
\`\`\`

## Your task

1. Implement three state classes — \`RedState\`, \`GreenState\`, \`YellowState\` — each with:
   - \`color()\` — returns the string name of the color (\`"red"\`, \`"green"\`, \`"yellow"\`)
   - \`next(light)\` — calls \`light.setState()\` with the appropriate next state object

   Cycle: Red → Green → Yellow → Red

2. Implement \`TrafficLight\` with:
   - \`constructor()\` — initializes state to a new \`RedState()\`
   - \`setState(state)\` — replaces the current state
   - \`getColor()\` — delegates to \`state.color()\`
   - \`next()\` — delegates to \`state.next(this)\``,
      starterCode: `class RedState {
  color() { return "red"; }
  next(light) {
    // transition to green
  }
}

class GreenState {
  color() { return "green"; }
  next(light) {
    // transition to yellow
  }
}

class YellowState {
  color() { return "yellow"; }
  next(light) {
    // transition to red
  }
}

class TrafficLight {
  constructor() {
    // initialize state to RedState
  }

  setState(state) {
    // store new state
  }

  getColor() {
    // delegate to state
  }

  next() {
    // delegate to state
  }
}
`,
      solution: `class RedState {
  color() { return "red"; }
  next(light) { light.setState(new GreenState()); }
}

class GreenState {
  color() { return "green"; }
  next(light) { light.setState(new YellowState()); }
}

class YellowState {
  color() { return "yellow"; }
  next(light) { light.setState(new RedState()); }
}

class TrafficLight {
  constructor() {
    this._state = new RedState();
  }

  setState(state) {
    this._state = state;
  }

  getColor() {
    return this._state.color();
  }

  next() {
    this._state.next(this);
  }
}`,
      tests: [
        {
          name: "starts red",
          code: `const light = new TrafficLight();
assertEquals(light.getColor(), "red");`,
        },
        {
          name: "red → green after one next()",
          code: `const light = new TrafficLight();
light.next();
assertEquals(light.getColor(), "green");`,
        },
        {
          name: "green → yellow after two next() calls",
          code: `const light = new TrafficLight();
light.next();
light.next();
assertEquals(light.getColor(), "yellow");`,
        },
        {
          name: "full cycle returns to red",
          code: `const light = new TrafficLight();
light.next(); // green
light.next(); // yellow
light.next(); // red
assertEquals(light.getColor(), "red");`,
        },
        {
          name: "two full cycles remain consistent",
          code: `const light = new TrafficLight();
for (let i = 0; i < 6; i++) light.next(); // 2 full cycles
assertEquals(light.getColor(), "red");`,
        },
      ],
      hints: [
        "Each state's `next(light)` just calls `light.setState(new NextState())` — one line each.",
        "`TrafficLight` itself has zero knowledge of the cycle; all that logic lives in the state objects.",
      ],
      explanation: `Without the State pattern, \`TrafficLight\` would need a string field and a \`switch\` statement in \`next()\`. With it, adding a new state (like a flashing yellow) means adding one new class — \`TrafficLight\` never changes.`,
    },
    {
      slug: "iterator-pattern",
      title: "Iterator — Custom Sequences",
      blurb: "Make any object work with for...of by implementing the iterator protocol.",
      xp: 40,
      content: `# Iterator — Custom Sequences

The **Iterator pattern** provides a standard way to traverse a collection without exposing its internal structure. In JavaScript, any object that implements the **iterable protocol** works with \`for...of\`, spread, and destructuring.

An object is iterable if it has a \`[Symbol.iterator]()\` method that returns an iterator. An iterator is an object with a \`next()\` method that returns \`{ value, done }\`.

\`\`\`js
const range = new Range(1, 3);
for (const n of range) console.log(n); // 1, 2, 3
[...new Range(2, 4)]; // [2, 3, 4]
\`\`\`

## Your task

Implement a \`Range\` class that generates integers from \`start\` to \`end\` (inclusive).

- \`constructor(start, end)\` — stores the range bounds
- \`[Symbol.iterator]()\` — returns an iterator object with a \`next()\` method

The \`next()\` method should return:
- \`{ value: currentNumber, done: false }\` while numbers remain
- \`{ value: undefined, done: true }\` when the range is exhausted`,
      starterCode: `class Range {
  constructor(start, end) {
    // store start and end
  }

  [Symbol.iterator]() {
    // return an iterator object with a next() method
  }
}
`,
      solution: `class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}`,
      tests: [
        {
          name: "spread produces correct array",
          code: `assertEquals(JSON.stringify([...new Range(1, 3)]), JSON.stringify([1, 2, 3]));`,
        },
        {
          name: "for...of visits all values",
          code: `const vals = [];
for (const n of new Range(5, 7)) vals.push(n);
assertEquals(JSON.stringify(vals), JSON.stringify([5, 6, 7]));`,
        },
        {
          name: "single-element range",
          code: `assertEquals(JSON.stringify([...new Range(4, 4)]), JSON.stringify([4]));`,
        },
        {
          name: "each iterator is independent",
          code: `const r = new Range(1, 2);
assertEquals(JSON.stringify([...r]), JSON.stringify([1, 2]));
assertEquals(JSON.stringify([...r]), JSON.stringify([1, 2]));`,
        },
      ],
      hints: [
        "The `current` counter lives inside `[Symbol.iterator]()` as a closure variable, not on `this`.",
        "Return an object literal `{ next() { ... } }` from `[Symbol.iterator]()`.",
        "Each call to `[Symbol.iterator]()` must create a fresh `current` so the range can be iterated multiple times.",
      ],
      explanation: `The iterator protocol is the foundation of all ES6 iteration: generators, \`for...of\`, spread, and destructuring all rely on it. Building \`Range\` by hand shows exactly what Babel or TypeScript compiles generator functions down to.`,
    },
    {
      slug: "patterns-combined",
      title: "Patterns Combined — Reactive Store",
      blurb: "Combine Observer + State to build a mini reactive state store.",
      xp: 50,
      content: `# Patterns Combined — Reactive Store

Real applications combine multiple patterns. Redux-style state management uses:

- **Observer** — components subscribe to store changes
- **Command** — actions are dispatched to describe *what happened*
- **Strategy** — a reducer function determines *how* state changes

In this challenge you will build a minimal reactive \`Store\` that:
1. Holds a single piece of state
2. Accepts a **reducer** function \`(state, action) => nextState\`
3. Exposes \`dispatch(action)\` to update state
4. Lets listeners \`subscribe\` to be notified after every dispatch
5. Returns an \`unsubscribe\` function from \`subscribe\`

\`\`\`js
const store = new Store({ count: 0 }, (state, action) => {
  if (action.type === "INCREMENT") return { count: state.count + 1 };
  return state;
});

const unsub = store.subscribe((state) => console.log(state.count));
store.dispatch({ type: "INCREMENT" }); // logs 1
store.dispatch({ type: "INCREMENT" }); // logs 2
unsub();
store.dispatch({ type: "INCREMENT" }); // logs nothing
store.getState(); // { count: 3 }
\`\`\`

## Your task

Implement \`Store\` with:
- \`constructor(initialState, reducer)\`
- \`getState()\` — returns current state
- \`dispatch(action)\` — computes next state via reducer, then notifies all subscribers
- \`subscribe(listener)\` — adds a listener; **returns an unsubscribe function**`,
      starterCode: `class Store {
  constructor(initialState, reducer) {
    // store state, reducer, and listeners list
  }

  getState() {
    // return current state
  }

  dispatch(action) {
    // compute next state and notify subscribers
  }

  subscribe(listener) {
    // add listener, return unsubscribe function
  }
}
`,
      solution: `class Store {
  constructor(initialState, reducer) {
    this._state = initialState;
    this._reducer = reducer;
    this._listeners = [];
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    this._state = this._reducer(this._state, action);
    for (const listener of this._listeners) {
      listener(this._state);
    }
  }

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }
}`,
      tests: [
        {
          name: "getState returns initial state",
          code: `const store = new Store({ count: 0 }, (s) => s);
assertEquals(store.getState().count, 0);`,
        },
        {
          name: "dispatch updates state via reducer",
          code: `const store = new Store({ count: 0 }, (state, action) => {
  if (action.type === "INC") return { count: state.count + 1 };
  return state;
});
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
assertEquals(store.getState().count, 2);`,
        },
        {
          name: "subscribe listener receives new state",
          code: `const store = new Store({ count: 0 }, (state, action) => {
  if (action.type === "INC") return { count: state.count + 1 };
  return state;
});
const log = [];
store.subscribe((s) => log.push(s.count));
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
assertEquals(JSON.stringify(log), JSON.stringify([1, 2]));`,
        },
        {
          name: "unsubscribe stops notifications",
          code: `const store = new Store({ count: 0 }, (state, action) => {
  if (action.type === "INC") return { count: state.count + 1 };
  return state;
});
const log = [];
const unsub = store.subscribe((s) => log.push(s.count));
store.dispatch({ type: "INC" });
unsub();
store.dispatch({ type: "INC" });
assertEquals(log.length, 1);
assertEquals(store.getState().count, 2);`,
        },
      ],
      hints: [
        "The reducer pattern: `this._state = this._reducer(this._state, action)` — then loop through listeners.",
        "Return a closure from `subscribe`: `return () => { this._listeners = this._listeners.filter(...) }`.",
      ],
      explanation: `This mini Store is structurally identical to Redux. The reducer is a Strategy (swappable algorithm). The subscriber list is Observer. The dispatched action is a Command. Recognizing these patterns in mature libraries is what separates junior devs from seniors.`,
    },
  ],
};
