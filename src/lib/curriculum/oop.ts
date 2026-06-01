import type { Module } from "./types";

// Object-Oriented Programming — classes, methods, inheritance, getters, and
// encapsulation in JavaScript. Auto-graded in-browser.
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
    {
      slug: "first-class",
      title: "Your First Class",
      blurb: "A constructor that stores a property.",
      xp: 30,
      content: `# Your First Class

A **class** is a blueprint for objects. The \`constructor\` runs when you write
\`new Circle(5)\`, and \`this\` is the new object being built.

\`\`\`js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p = new Point(2, 3); // p.x === 2
\`\`\`

## Your task
Write a \`Circle\` class whose constructor takes a \`radius\` and stores it on
\`this.radius\`.`,
      starterCode: `class Circle {
  constructor(radius) {
    // store radius on this
  }
}
`,
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
    },
    {
      slug: "add-method",
      title: "Adding a Method",
      blurb: "Methods compute from stored properties.",
      xp: 35,
      content: `# Adding a Method

A **method** is a function defined inside the class. It can read the object's
properties through \`this\`.

\`\`\`js
class Square {
  constructor(side) { this.side = side; }
  area() { return this.side * this.side; }
}
new Square(4).area(); // 16
\`\`\`

## Your task
Give \`Circle\` an \`area()\` method that returns \`Math.PI * radius * radius\`.`,
      starterCode: `class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    // return the area
  }
}
`,
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
    },
    {
      slug: "stateful-methods",
      title: "Methods That Change State",
      blurb: "Multiple methods sharing the same `this`.",
      xp: 40,
      content: `# Methods That Change State

Methods can also **update** properties. Several methods on the same object all
share its \`this\`, so one can change what another reads.

\`\`\`js
class Counter {
  constructor() { this.count = 0; }
  tick() { this.count += 1; }
  value() { return this.count; }
}
\`\`\`

## Your task
Write a \`BankAccount\` that starts at balance \`0\`. \`deposit(amount)\` adds to the
balance and \`getBalance()\` returns it.`,
      starterCode: `class BankAccount {
  constructor() {
    this.balance = 0;
  }
  deposit(amount) {
    // increase the balance
  }
  getBalance() {
    // return the balance
  }
}
`,
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
    },
    {
      slug: "inheritance",
      title: "Inheritance with extends",
      blurb: "Subclasses reuse and override behavior.",
      xp: 45,
      content: `# Inheritance with extends

A class can **extend** another to reuse its code. Call \`super(...)\` to run the
parent constructor, and override methods to specialize behavior.

\`\`\`js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + " makes a sound"; }
}
class Cat extends Animal {
  speak() { return this.name + " says Meow"; }
}
\`\`\`

## Your task
\`Animal\` is given. Write \`Dog extends Animal\` and override \`speak()\` so it
returns \`"<name> says Woof"\` (e.g. \`"Rex says Woof"\`).`,
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
    },
    {
      slug: "getters",
      title: "Getters",
      blurb: "Computed properties that read like fields.",
      xp: 45,
      content: `# Getters

A **getter** is a method you access like a property — no parentheses. Use it for
values derived from other fields.

\`\`\`js
class Temp {
  constructor(c) { this.c = c; }
  get fahrenheit() { return this.c * 9 / 5 + 32; }
}
new Temp(0).fahrenheit; // 32
\`\`\`

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
    },
    {
      slug: "encapsulation",
      title: "Encapsulation with Private Fields",
      blurb: "Hide state behind a controlled accessor.",
      xp: 50,
      content: `# Encapsulation with Private Fields

A field named with \`#\` is **private** — only code inside the class can touch it.
This lets you guard your state behind methods that enforce rules.

\`\`\`js
class Locker {
  #code = 1234;
  unlock(guess) { return guess === this.#code; }
}
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
    // subtract only if enough funds
  }
  getBalance() {
    // return the private balance
  }
}
`,
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
    },
  ],
};
