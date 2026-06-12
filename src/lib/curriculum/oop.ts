import type { Module } from "./types";

// Object-Oriented Programming — classes, methods, inheritance, getters, and
// encapsulation in JavaScript. Auto-graded in-browser.
//
// This is an intermediate deep-dive, but the ENTRY is deliberately gentle so a
// learner arriving from the Foundations track doesn't hit a wall. The module
// opens with a no-code "what IS an object/class" quiz, then introduces one idea
// per lesson (class → constructor → method → state → inheritance → getters →
// encapsulation) rather than cramming class+constructor+this into a single step.
// Every code lesson ships drag-in `blocks` and step-by-step `hintCode`, and the
// two new concept ideas (objects, inheritance) are previewed as no-typing
// quizzes so learners read the shape before they write it. The depth is intact —
// the pacing is just kinder.
export const oop: Module = {
  slug: "oop",
  title: "Object-Oriented Programming",
  description:
    "Model your code with classes: constructors, methods, inheritance, getters, and encapsulation. Learn the JavaScript class syntax that powers real frameworks and libraries.",
  emoji: "🧱",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline:
    "Learn object-oriented programming in JavaScript: classes, constructors, methods, inheritance, encapsulation, getters, and static methods.",
  keywords: [
    "learn oop",
    "object oriented programming javascript",
    "javascript classes",
    "inheritance encapsulation",
  ],
  lessons: [
    // ── 1. Concept cold-open: what is an object / class? (no typing) ──
    {
      slug: "what-is-an-object",
      title: "What Is an Object?",
      blurb: "An object bundles related data and behavior together.",
      xp: 15,
      kind: "quiz",
      content: `# What Is an Object?

Before we touch any class syntax, let's get the big idea — no typing required.

Most data you've used so far has been *single* values: a number, a string, a
boolean. But real things in a program usually have **several related pieces of
data** that belong together. A circle has a radius. A bank account has a balance.
A user has a name and an email.

An **object** is a bundle that keeps that related data — and the actions you can
take on it — in one place. Here's an object written as a plain bundle:

\`\`\`js
const account = {
  balance: 100,                          // data
  deposit(amount) {                      // behavior
    this.balance = this.balance + amount;
  },
};
account.deposit(50); // account.balance is now 150
\`\`\`

Notice two things: \`balance\` is **data** the object carries, and \`deposit\` is
**behavior** that acts on that data. The word \`this\` inside \`deposit\` means
*"this particular object"* — so \`this.balance\` is **this account's** balance.

A **class** (coming next) is just a reusable **blueprint** for making many
objects that all share the same shape and behavior. Let's check the idea. 👇`,
      questions: [
        {
          prompt: "What does an object bundle together?",
          options: [
            "Only numbers",
            "Related data and the behavior that acts on it",
            "A single string value",
          ],
          answer: 1,
          explanation:
            "An object groups related data (its properties) with the behavior (its methods) that works on that data — all in one value.",
        },
        {
          prompt:
            "In the `account` object above, after `account.deposit(50)`, what is `account.balance`?",
          options: ["50", "100", "150"],
          answer: 2,
          explanation:
            "`deposit(50)` adds 50 to the starting balance of 100, so it becomes 150. The method changed the object's own data.",
        },
        {
          prompt: "Inside a method, what does the word `this` refer to?",
          options: [
            "The whole program",
            "The particular object the method was called on",
            "A brand-new empty object every time",
          ],
          answer: 1,
          explanation:
            "`this` is the specific object you called the method on — so `this.balance` reads/writes that object's own balance.",
        },
        {
          prompt: "A class is best described as…",
          options: [
            "a reusable blueprint for making objects of the same shape",
            "a single number",
            "another word for a loop",
          ],
          answer: 0,
          explanation:
            "A class is a blueprint. You define the shape and behavior once, then stamp out many objects from it.",
        },
      ],
    },

    // ── 2. The class + constructor: store ONE property ──
    {
      slug: "first-class",
      title: "Your First Class",
      blurb: "A constructor that stores one property on `this`.",
      xp: 30,
      content: `# Your First Class

A **class** is the blueprint we just talked about. The special method named
\`constructor\` runs once, automatically, when you build a new object with
\`new\`. Inside it, \`this\` is the brand-new object, and you attach data to it.

\`\`\`js
class Point {
  constructor(x) {
    this.x = x;   // store the value we were given onto this object
  }
}
const p = new Point(2); // p.x === 2
\`\`\`

When you write \`new Point(2)\`, JavaScript creates a fresh empty object, runs the
constructor with \`x\` set to \`2\`, and \`this.x = x\` saves it. We're only storing
**one** property here — that's the whole lesson.

## Your task
Write a \`Circle\` class whose constructor takes a \`radius\` and stores it on
\`this.radius\`.`,
      starterCode: `class Circle {
  constructor(radius) {
    // store radius on this
  }
}
`,
      blocks: ["this.radius", " = ", "radius", ";"],
      solution: `class Circle {
  constructor(radius) {
    this.radius = radius;
  }
}`,
      tests: [
        {
          name: "stores radius",
          code: `const c = new Circle(5); assertEquals(c.radius, 5);`,
        },
        {
          name: "works for another value",
          code: `const c = new Circle(12); assertEquals(c.radius, 12);`,
        },
      ],
      hints: [
        "Inside the constructor, copy the parameter onto the object: `this.radius = ...`.",
        "The value to store is the `radius` parameter itself: `this.radius = radius;`.",
      ],
      hintCode: [
        `class Circle {\n  constructor(radius) {\n    this.radius = \n  }\n}\n`,
        `class Circle {\n  constructor(radius) {\n    this.radius = radius;\n  }\n}\n`,
      ],
      explanation:
        "🧱 That's a class! `new Circle(5)` ran your constructor with `radius` = 5, and `this.radius = radius` saved it onto the new object.",
    },

    // ── 3. Concept check: how `new` and `this` work (no typing) ──
    {
      slug: "how-new-works",
      title: "How `new` and `this` Work",
      blurb: "Trace what happens when you write `new`.",
      xp: 15,
      kind: "quiz",
      content: `# How \`new\` and \`this\` Work

You just wrote a constructor — let's make sure the *mechanics* are solid before
we add behavior. Read this class and trace it in your head:

\`\`\`js
class Dog {
  constructor(name) {
    this.name = name;
    this.legs = 4;
  }
}
const a = new Dog("Rex");
const b = new Dog("Fido");
\`\`\`

When you write \`new Dog("Rex")\`:
1. JavaScript makes a **fresh, empty object**.
2. It runs the \`constructor\` with \`name\` set to \`"Rex"\`, and \`this\` pointing at
   that fresh object.
3. The two \`this.\` lines attach \`name\` and \`legs\` to it.
4. The finished object is handed back and stored in \`a\`.

Crucially, \`a\` and \`b\` are **separate** objects. Each call to \`new\` builds its
own. Read carefully, then answer. 👇`,
      questions: [
        {
          prompt: "What does `new` do *first*, before the constructor body runs?",
          options: [
            "Deletes the class",
            "Creates a fresh empty object for `this` to point at",
            "Returns the string `'Dog'`",
          ],
          answer: 1,
          explanation:
            "`new` allocates a brand-new object and points `this` at it, then runs the constructor to fill it in.",
        },
        {
          prompt: "After the code above, what is `a.name`?",
          options: ['"Fido"', '"Rex"', "undefined"],
          answer: 1,
          explanation:
            "`a` was built with `new Dog(\"Rex\")`, so its own `name` is \"Rex\". `b` is a separate object with \"Fido\".",
        },
        {
          prompt: "Are `a` and `b` the same object?",
          options: [
            "No — each `new` call makes its own separate object",
            "Yes — every `Dog` shares one object",
            "Only if they have the same name",
          ],
          answer: 0,
          explanation:
            "Every `new` builds a distinct object. Changing `a` never touches `b`. That independence is the point of `this`.",
        },
      ],
    },

    // ── 4. Add ONE method that reads a property ──
    {
      slug: "add-method",
      title: "Adding a Method",
      blurb: "A method computes from a stored property.",
      xp: 35,
      content: `# Adding a Method

A **method** is a function defined inside the class body (no \`function\` keyword
needed). It can read the object's own data through \`this\`.

\`\`\`js
class Square {
  constructor(side) { this.side = side; }
  area() { return this.side * this.side; }  // reads this.side
}
new Square(4).area(); // 16
\`\`\`

The constructor stores the data; the method *uses* it. They share the same
\`this\`, so \`area()\` can see whatever the constructor saved.

## Your task
Give \`Circle\` an \`area()\` method that returns \`Math.PI * radius * radius\` (read
the radius from \`this.radius\`).`,
      starterCode: `class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    // return Math.PI * this.radius * this.radius
  }
}
`,
      blocks: ["return ", "Math.PI", " * ", "this.radius", " * ", "this.radius", ";"],
      solution: `class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}`,
      tests: [
        {
          name: "area of radius 1",
          code: `const c = new Circle(1); assertEquals(c.area(), Math.PI);`,
        },
        {
          name: "area of radius 2",
          code: `const c = new Circle(2); assertEquals(c.area(), Math.PI * 4);`,
        },
      ],
      hints: [
        "Read the stored radius with `this.radius` — that's the value the constructor saved.",
        "Multiply it together: `return Math.PI * this.radius * this.radius;`.",
      ],
      hintCode: [
        `class Circle {\n  constructor(radius) {\n    this.radius = radius;\n  }\n  area() {\n    return Math.PI * this.radius;\n  }\n}\n`,
        `class Circle {\n  constructor(radius) {\n    this.radius = radius;\n  }\n  area() {\n    return Math.PI * this.radius * this.radius;\n  }\n}\n`,
      ],
      explanation:
        "📐 The constructor stored the radius; `area()` read it back through `this.radius` and computed from it. That split — store, then use — is the heart of a class.",
    },

    // ── 5. Methods that CHANGE state ──
    {
      slug: "stateful-methods",
      title: "Methods That Change State",
      blurb: "Multiple methods sharing and updating the same `this`.",
      xp: 40,
      content: `# Methods That Change State

Methods don't just read — they can **update** properties too. Several methods on
the same object all share its \`this\`, so one method can change a value that
another method later reads.

\`\`\`js
class Counter {
  constructor() { this.count = 0; }
  tick() { this.count += 1; }   // changes state
  value() { return this.count; } // reads state
}
\`\`\`

\`this.count += 1\` is shorthand for \`this.count = this.count + 1\` — read the
current value, add one, store it back.

## Your task
Write a \`BankAccount\` that starts at balance \`0\`. \`deposit(amount)\` adds to the
balance, and \`getBalance()\` returns it.`,
      starterCode: `class BankAccount {
  constructor() {
    this.balance = 0;
  }
  deposit(amount) {
    // increase the balance by amount
  }
  getBalance() {
    // return the balance
  }
}
`,
      blocks: ["this.balance", " += ", "amount", ";", "return ", "this.balance"],
      solution: `class BankAccount {
  constructor() {
    this.balance = 0;
  }
  deposit(amount) {
    this.balance += amount;
  }
  getBalance() {
    return this.balance;
  }
}`,
      tests: [
        {
          name: "starts at zero",
          code: `const a = new BankAccount(); assertEquals(a.getBalance(), 0);`,
        },
        {
          name: "deposits accumulate",
          code: `const a = new BankAccount(); a.deposit(50); a.deposit(25); assertEquals(a.getBalance(), 75);`,
        },
      ],
      hints: [
        "In `deposit`, grow the balance: `this.balance += amount;`.",
        "In `getBalance`, just hand the current value back: `return this.balance;`.",
      ],
      hintCode: [
        `class BankAccount {\n  constructor() {\n    this.balance = 0;\n  }\n  deposit(amount) {\n    this.balance += amount;\n  }\n  getBalance() {\n    // return the balance\n  }\n}\n`,
        `class BankAccount {\n  constructor() {\n    this.balance = 0;\n  }\n  deposit(amount) {\n    this.balance += amount;\n  }\n  getBalance() {\n    return this.balance;\n  }\n}\n`,
      ],
      explanation:
        "🏦 Two methods, one shared `this`: `deposit` changed the balance and `getBalance` read the updated value. That's stateful object behavior.",
    },

    // ── 6. Concept cold-open: what is inheritance? (no typing) ──
    {
      slug: "what-is-inheritance",
      title: "What Is Inheritance?",
      blurb: "One class can build on another instead of repeating it.",
      xp: 15,
      kind: "quiz",
      content: `# What Is Inheritance?

Sometimes two classes are *almost* the same. A \`Dog\` and a \`Cat\` both have a
name and can speak — only the sound differs. Copy-pasting the shared parts would
be wasteful and error-prone.

**Inheritance** lets one class build on another. The class you build on is the
**parent** (or *base*); the one that extends it is the **child** (or *subclass*).
The child automatically gets the parent's properties and methods, and can
**override** (replace) any it wants to do differently.

\`\`\`js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + " makes a sound"; }
}
class Cat extends Animal {
  speak() { return this.name + " says Meow"; } // override
}
const c = new Cat("Milo");
c.name;     // "Milo"  ← inherited from Animal's constructor
c.speak();  // "Milo says Meow" ← Cat's own version wins
\`\`\`

\`Cat\` never re-declares \`name\` or a constructor — it **inherits** them. It only
writes the one method it wants to change. Read it, then answer. 👇`,
      questions: [
        {
          prompt: "What does `extends` let a class do?",
          options: [
            "Run twice as fast",
            "Reuse another class's properties and methods, then specialize",
            "Delete the parent class",
          ],
          answer: 1,
          explanation:
            "`extends` makes a subclass that inherits everything from its parent, so you only write what's different.",
        },
        {
          prompt: "In the code above, where does `c.name` come from?",
          options: [
            "It's inherited from Animal's constructor",
            "Cat defines it directly",
            "It's undefined",
          ],
          answer: 0,
          explanation:
            "`Cat` has no constructor of its own, so it inherits `Animal`'s — which sets `this.name`.",
        },
        {
          prompt: "When `Cat` defines its own `speak()`, that's called…",
          options: ["overriding the parent method", "deleting the method", "a syntax error"],
          answer: 0,
          explanation:
            "Defining a method that already exists on the parent **overrides** it — the child's version is used for Cat objects.",
        },
      ],
    },

    // ── 7. Write inheritance with extends ──
    {
      slug: "inheritance",
      title: "Inheritance with extends",
      blurb: "A subclass reuses the parent and overrides one method.",
      xp: 45,
      content: `# Inheritance with extends

Now you write it. A class **extends** another to inherit its code. If the child
needs no extra setup, it can skip the constructor entirely and reuse the
parent's. To do something differently, **override** a method by redefining it.

\`\`\`js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + " makes a sound"; }
}
class Cat extends Animal {
  speak() { return this.name + " says Meow"; } // override only this
}
\`\`\`

## Your task
\`Animal\` is given. Write \`Dog extends Animal\` and override \`speak()\` so it
returns \`"<name> says Woof"\` (e.g. \`"Rex says Woof"\`). You don't need a
constructor — \`Dog\` inherits \`Animal\`'s.`,
      starterCode: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  // override speak()
}
`,
      blocks: ["speak() {", "return ", "this.name", ' + " says Woof"', ";", "}"],
      solution: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return this.name + " says Woof";
  }
}`,
      tests: [
        {
          name: "inherits the name from super",
          code: `const d = new Dog("Rex"); assertEquals(d.name, "Rex");`,
        },
        {
          name: "overrides speak",
          code: `const d = new Dog("Rex"); assertEquals(d.speak(), "Rex says Woof");`,
        },
        {
          name: "is still an Animal",
          code: `const d = new Dog("Fido"); assert(d instanceof Animal, "Dog should extend Animal");`,
        },
      ],
      hints: [
        "Give `Dog` its own `speak()` method — that overrides the inherited one.",
        'Read the inherited name and build the string: `return this.name + " says Woof";`.',
      ],
      hintCode: [
        `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return this.name + " makes a sound";\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    // return "<name> says Woof"\n  }\n}\n`,
        `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return this.name + " makes a sound";\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return this.name + " says Woof";\n  }\n}\n`,
      ],
      explanation:
        "🐕 `Dog` inherited the constructor and `name` from `Animal`, stayed an `Animal` (so `instanceof` is true), and overrode only `speak()`. That's inheritance: reuse, then specialize.",
    },

    // ── 8. Getters ──
    {
      slug: "getters",
      title: "Getters",
      blurb: "A computed property you read like a field.",
      xp: 45,
      content: `# Getters

A **getter** is a method you access like a property — **no parentheses**. Use it
for a value *derived* from other fields, so callers read it as if it were stored
data.

\`\`\`js
class Temp {
  constructor(c) { this.c = c; }
  get fahrenheit() { return this.c * 9 / 5 + 32; }
}
new Temp(0).fahrenheit; // 32  ← no () after fahrenheit
\`\`\`

The \`get\` keyword is what makes \`fahrenheit\` readable without \`()\`. Behind the
scenes it still runs your method every time it's read.

## Your task
Write a \`Person\` with \`firstName\` and \`lastName\`, plus a getter \`fullName\` that
returns them joined by a space (e.g. \`"Ada Lovelace"\`).`,
      starterCode: `class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    // return "First Last"
  }
}
`,
      blocks: ["get fullName() {", "return ", "this.firstName", ' + " " + ', "this.lastName", ";", "}"],
      solution: `class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}`,
      tests: [
        {
          name: "joins the names",
          code: `const p = new Person("Ada", "Lovelace"); assertEquals(p.fullName, "Ada Lovelace");`,
        },
        {
          name: "accessed without parentheses",
          code: `const p = new Person("Grace", "Hopper"); assertEquals(p.fullName, "Grace Hopper");`,
        },
      ],
      hints: [
        "Keep the `get` keyword — that's what lets callers read `fullName` without `()`.",
        'Join the two fields with a space: `return this.firstName + " " + this.lastName;`.',
      ],
      hintCode: [
        `class Person {\n  constructor(firstName, lastName) {\n    this.firstName = firstName;\n    this.lastName = lastName;\n  }\n  get fullName() {\n    return this.firstName;\n  }\n}\n`,
        `class Person {\n  constructor(firstName, lastName) {\n    this.firstName = firstName;\n    this.lastName = lastName;\n  }\n  get fullName() {\n    return this.firstName + " " + this.lastName;\n  }\n}\n`,
      ],
      explanation:
        "🧮 `fullName` is computed on the fly from two real fields, but callers read it like a plain property — no `()`. That's a getter.",
    },

    // ── 9. Encapsulation with private fields ──
    {
      slug: "encapsulation",
      title: "Encapsulation with Private Fields",
      blurb: "Hide state behind a controlled accessor.",
      xp: 50,
      content: `# Encapsulation with Private Fields

A field whose name starts with \`#\` is **private** — only code *inside* the class
can touch it. This lets you guard your state behind methods that enforce rules,
so the outside world can't bypass them.

\`\`\`js
class Locker {
  #code = 1234;                    // private field
  unlock(guess) { return guess === this.#code; }
}
const l = new Locker();
l.unlock(1234); // true
l.#code;        // ❌ SyntaxError — can't read it from outside
\`\`\`

## Your task
Write a \`Vault\` whose constructor takes an opening \`amount\` stored in a private
\`#balance\`. \`withdraw(amount)\` subtracts only if there are enough funds
(otherwise it changes nothing), and \`getBalance()\` returns the current balance.`,
      starterCode: `class Vault {
  #balance = 0;
  constructor(amount) {
    this.#balance = amount;
  }
  withdraw(amount) {
    // subtract only if there are enough funds
  }
  getBalance() {
    // return the private balance
  }
}
`,
      blocks: [
        "if (amount <= this.#balance) {",
        "this.#balance -= amount;",
        "}",
        "return ",
        "this.#balance",
        ";",
      ],
      solution: `class Vault {
  #balance = 0;
  constructor(amount) {
    this.#balance = amount;
  }
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
    }
  }
  getBalance() {
    return this.#balance;
  }
}`,
      tests: [
        {
          name: "exposes the opening balance",
          code: `const v = new Vault(100); assertEquals(v.getBalance(), 100);`,
        },
        {
          name: "valid withdrawal subtracts",
          code: `const v = new Vault(100); v.withdraw(40); assertEquals(v.getBalance(), 60);`,
        },
        {
          name: "overdraw is rejected",
          code: `const v = new Vault(100); v.withdraw(150); assertEquals(v.getBalance(), 100);`,
        },
        {
          name: "balance is truly private",
          code: `const v = new Vault(100); assertEquals(v.balance, undefined, "#balance must not be a public property");`,
        },
      ],
      hints: [
        "Guard the withdrawal: only subtract when `amount <= this.#balance`.",
        "If there are enough funds, `this.#balance -= amount;`. `getBalance` just returns `this.#balance`.",
      ],
      hintCode: [
        `class Vault {\n  #balance = 0;\n  constructor(amount) {\n    this.#balance = amount;\n  }\n  withdraw(amount) {\n    if (amount <= this.#balance) {\n      // subtract here\n    }\n  }\n  getBalance() {\n    return this.#balance;\n  }\n}\n`,
        `class Vault {\n  #balance = 0;\n  constructor(amount) {\n    this.#balance = amount;\n  }\n  withdraw(amount) {\n    if (amount <= this.#balance) {\n      this.#balance -= amount;\n    }\n  }\n  getBalance() {\n    return this.#balance;\n  }\n}\n`,
      ],
      explanation:
        "🔒 `#balance` can't be read or overwritten from outside the class, so the only way to change it is through `withdraw`, which enforces the no-overdraw rule. That's encapsulation: state plus the rules that protect it.",
    },
  ],
};
