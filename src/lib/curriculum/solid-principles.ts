import type { Module } from "./types";

// SOLID Principles in JavaScript — all five principles taught through live-coded
// challenges, auto-graded in-browser via Web Worker.
export const solidPrinciples: Module = {
  slug: "solid-principles",
  title: "SOLID Principles in JavaScript",
  description:
    "Master the five SOLID design principles — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion — through live-coded JavaScript challenges that auto-grade in your browser.",
  emoji: "🏗️",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Learn SOLID principles in JavaScript: SRP, OCP, LSP, ISP, and DIP through hands-on coding challenges — the design fundamentals every mid-career dev needs.",
  keywords: [
    "SOLID principles JavaScript",
    "single responsibility principle",
    "open closed principle",
    "liskov substitution principle",
    "dependency inversion JavaScript",
    "software design principles",
    "object oriented design",
    "clean code JavaScript",
  ],
  lessons: [
    // ─────────────────────────────────────────────────────────────────────
    // Lesson 1 — Intro quiz: What is SOLID?
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "what-is-solid",
      title: "What Is SOLID?",
      blurb: "A quick map of the five principles before we dive into code.",
      xp: 20,
      kind: "quiz",
      content: `# What Is SOLID?

SOLID is a set of five object-oriented design principles coined by Robert C. Martin
("Uncle Bob"). They guide you toward code that is **easy to understand, extend, and
maintain** without breaking things that already work.

| Letter | Name | One-line summary |
|--------|------|-----------------|
| **S** | Single Responsibility | A class/function should have **one reason to change** |
| **O** | Open / Closed | Open for **extension**, closed for **modification** |
| **L** | Liskov Substitution | Subclasses must be **drop-in replacements** for their parent |
| **I** | Interface Segregation | Don't force callers to depend on methods they **don't use** |
| **D** | Dependency Inversion | Depend on **abstractions**, not concretions |

These principles aren't rigid rules — they're heuristics. Knowing when to apply
them (and when not to over-engineer) is the real skill.`,
      questions: [
        {
          prompt:
            "The 'S' in SOLID stands for Single Responsibility. Which best describes it?",
          options: [
            "A class should do as many things as possible to avoid duplication",
            "A class should have only one reason to change",
            "A class should never be subclassed",
          ],
          answer: 1,
          explanation:
            "Single Responsibility means each class or function owns exactly one piece of behaviour. When requirements change, only the class responsible for that area needs to change.",
        },
        {
          prompt:
            "Open/Closed Principle says code should be open for extension but closed for modification. What does that mean in practice?",
          options: [
            "You should never change any existing code under any circumstances",
            "You add new behaviour by writing new code (subclasses, plugins), not by editing existing, tested code",
            "Functions should be public (open) but variables private (closed)",
          ],
          answer: 1,
          explanation:
            "OCP encourages extension points (inheritance, composition, plugins) so you can add features without risking regressions in existing, stable code.",
        },
        {
          prompt:
            "Which principle is violated when a subclass overrides a parent method in a way that breaks callers that only know about the parent type?",
          options: [
            "Single Responsibility",
            "Dependency Inversion",
            "Liskov Substitution",
          ],
          answer: 2,
          explanation:
            "Liskov Substitution (LSP) requires that objects of a subclass can replace objects of the parent without breaking the program's correctness.",
        },
        {
          prompt: "Dependency Inversion tells us to depend on abstractions. In JavaScript this typically means:",
          options: [
            "Hardcode the concrete class you need inside every function",
            "Accept a dependency as a parameter (or inject it) so the caller decides which concrete implementation to use",
            "Never use classes at all",
          ],
          answer: 1,
          explanation:
            "DIP is usually achieved through dependency injection: receive a collaborator via a constructor or parameter rather than constructing it yourself, making the code testable and flexible.",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 2 — S: Single Responsibility Principle
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "single-responsibility",
      title: "S — Single Responsibility Principle",
      blurb: "Split a god-class into focused, single-purpose classes.",
      xp: 35,
      content: `# S — Single Responsibility Principle

> *A class should have only one reason to change.*

A **god class** mixes unrelated concerns: it fetches data, formats it, and saves
it all in one place. When any one of those concerns changes, you risk breaking
the others.

The fix is to extract each responsibility into its own class or function.

\`\`\`js
// ❌ Violates SRP — three responsibilities in one class
class Report {
  constructor(data) { this.data = data; }
  generate()  { /* compute totals */ }
  formatHtml(){ /* build HTML string */ }
  saveToFile(){ /* write to disk */ }
}

// ✅ Each class owns exactly one responsibility
class ReportGenerator { generate(data) { /* ... */ } }
class ReportFormatter { formatHtml(report) { /* ... */ } }
class ReportSaver     { saveToFile(report) { /* ... */ } }
\`\`\`

## Your task

Below is a \`UserRecord\` class that does too much. Split it into **two** classes:

- \`UserValidator\` — has a method \`isValid(user)\` that returns \`true\` when
  \`user.name\` is a non-empty string and \`user.age\` is a number ≥ 0, otherwise
  \`false\`.
- \`UserSerializer\` — has a method \`serialize(user)\` that returns the JSON string
  of the user object (use \`JSON.stringify\`).

Both classes must be exported-style (assigned to a \`const\`).`,
      starterCode: `// TODO: split into UserValidator and UserSerializer

class UserValidator {
  isValid(user) {
    // return true if user.name is a non-empty string AND user.age >= 0
  }
}

class UserSerializer {
  serialize(user) {
    // return JSON.stringify of the user object
  }
}
`,
      solution: `class UserValidator {
  isValid(user) {
    return (
      typeof user.name === "string" &&
      user.name.length > 0 &&
      typeof user.age === "number" &&
      user.age >= 0
    );
  }
}

class UserSerializer {
  serialize(user) {
    return JSON.stringify(user);
  }
}`,
      tests: [
        {
          name: "UserValidator.isValid — valid user returns true",
          code: `const v = new UserValidator(); assertEquals(v.isValid({ name: "Alice", age: 30 }), true);`,
        },
        {
          name: "UserValidator.isValid — empty name returns false",
          code: `const v = new UserValidator(); assertEquals(v.isValid({ name: "", age: 30 }), false);`,
        },
        {
          name: "UserValidator.isValid — negative age returns false",
          code: `const v = new UserValidator(); assertEquals(v.isValid({ name: "Bob", age: -1 }), false);`,
        },
        {
          name: "UserSerializer.serialize — returns JSON string",
          code: `const s = new UserSerializer(); assertEquals(s.serialize({ name: "Alice", age: 30 }), JSON.stringify({ name: "Alice", age: 30 }));`,
        },
        {
          name: "UserValidator and UserSerializer are separate classes",
          code: `assert(typeof UserValidator === "function" && typeof UserSerializer === "function");`,
        },
      ],
      hints: [
        "UserValidator only needs to know about validation rules — no JSON, no saving.",
        "For isValid, check typeof user.name === 'string' && user.name.length > 0 && typeof user.age === 'number' && user.age >= 0.",
        "UserSerializer's serialize is just return JSON.stringify(user).",
      ],
      explanation: `By giving each class a single job, you can change validation rules without touching serialization, and vice-versa. Each class now has exactly one reason to change.`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 3 — O: Open/Closed Principle
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "open-closed",
      title: "O — Open/Closed Principle",
      blurb: "Add new behaviour by extending, not by editing existing code.",
      xp: 40,
      content: `# O — Open/Closed Principle

> *Software entities should be open for extension, but closed for modification.*

Imagine you have a discount calculator with a big \`if/else\` chain. Every new
discount type means editing the same function — and risking regressions.

\`\`\`js
// ❌ Must edit this function every time a new discount type is added
function getDiscount(type, price) {
  if (type === "vip")     return price * 0.8;
  if (type === "student") return price * 0.9;
  // ... add more here forever ...
  return price;
}
\`\`\`

The OCP solution: define a common interface (a \`apply(price)\` method) and let
each discount type be its own class. The calculator never changes.

\`\`\`js
// ✅ Each new discount is a new class — existing code untouched
class VipDiscount     { apply(price) { return price * 0.8; } }
class StudentDiscount { apply(price) { return price * 0.9; } }

function getDiscount(discount, price) { return discount.apply(price); }
\`\`\`

## Your task

Write three discount classes:

- \`PercentDiscount\` — constructor takes \`percent\` (e.g. \`10\` for 10%).
  \`apply(price)\` returns \`price * (1 - percent / 100)\`.
- \`FlatDiscount\` — constructor takes \`amount\`.
  \`apply(price)\` returns \`price - amount\` (floor at 0 — never negative).
- \`NoDiscount\` — no constructor args.
  \`apply(price)\` returns \`price\` unchanged.

Then write \`applyDiscount(discount, price)\` that delegates to
\`discount.apply(price)\`.`,
      starterCode: `class PercentDiscount {
  constructor(percent) {
    // store percent
  }
  apply(price) {
    // price * (1 - percent / 100)
  }
}

class FlatDiscount {
  constructor(amount) {
    // store amount
  }
  apply(price) {
    // price - amount, minimum 0
  }
}

class NoDiscount {
  apply(price) {
    // return price unchanged
  }
}

function applyDiscount(discount, price) {
  // delegate to discount.apply(price)
}
`,
      solution: `class PercentDiscount {
  constructor(percent) {
    this.percent = percent;
  }
  apply(price) {
    return price * (1 - this.percent / 100);
  }
}

class FlatDiscount {
  constructor(amount) {
    this.amount = amount;
  }
  apply(price) {
    return Math.max(0, price - this.amount);
  }
}

class NoDiscount {
  apply(price) {
    return price;
  }
}

function applyDiscount(discount, price) {
  return discount.apply(price);
}`,
      tests: [
        {
          name: "PercentDiscount(10).apply(200) === 180",
          code: `assertEquals(new PercentDiscount(10).apply(200), 180);`,
        },
        {
          name: "PercentDiscount(25).apply(100) === 75",
          code: `assertEquals(new PercentDiscount(25).apply(100), 75);`,
        },
        {
          name: "FlatDiscount(30).apply(100) === 70",
          code: `assertEquals(new FlatDiscount(30).apply(100), 70);`,
        },
        {
          name: "FlatDiscount floors at 0 when discount > price",
          code: `assertEquals(new FlatDiscount(200).apply(50), 0);`,
        },
        {
          name: "NoDiscount returns price unchanged",
          code: `assertEquals(new NoDiscount().apply(99), 99);`,
        },
        {
          name: "applyDiscount delegates correctly",
          code: `assertEquals(applyDiscount(new PercentDiscount(50), 80), 40);`,
        },
      ],
      hints: [
        "Store percent/amount in the constructor with this.percent = percent.",
        "For FlatDiscount use Math.max(0, price - this.amount) to prevent negative prices.",
        "applyDiscount is just one line: return discount.apply(price).",
      ],
      explanation: `applyDiscount never needs to change no matter how many new discount types you add. Each new type is a new class — the core function stays closed for modification.`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 4 — L: Liskov Substitution Principle
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "liskov-substitution",
      title: "L — Liskov Substitution Principle",
      blurb: "Subclasses must be drop-in replacements for their parent.",
      xp: 40,
      content: `# L — Liskov Substitution Principle

> *Objects of a subclass should be substitutable for objects of the parent class
> without altering the correctness of the program.*

The classic LSP violation: a \`Square\` class extends \`Rectangle\` and overrides
\`setWidth\` / \`setHeight\` so they always keep sides equal — but code that
expects a Rectangle breaks:

\`\`\`js
// ❌ LSP violation — Square breaks Rectangle's contract
class Rectangle {
  setWidth(w)  { this.width = w; }
  setHeight(h) { this.height = h; }
  area()       { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(w)  { this.width = this.height = w; }  // breaks expectations!
  setHeight(h) { this.width = this.height = h; }
}
\`\`\`

The fix: model shapes through a common **abstraction** (\`Shape\`) rather than
forcing an inheritance relationship that isn't truly "is-a".

## Your task

Write a base class \`Shape\` with a method \`area()\` that returns \`0\`.

Then write two subclasses that each **correctly override** \`area()\`:

- \`Circle\` — constructor takes \`radius\`. \`area()\` returns
  \`Math.PI * radius * radius\`.
- \`Rect\` — constructor takes \`width\` and \`height\`. \`area()\` returns
  \`width * height\`.

Finally write \`totalArea(shapes)\` that accepts an array of \`Shape\` instances
(any mix of Circle / Rect) and returns the **sum** of their areas.

All three subclasses must be substitutable: \`totalArea\` must work correctly
regardless of which concrete type is in the array.`,
      starterCode: `class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    // store radius
  }
  area() {
    // Math.PI * radius * radius
  }
}

class Rect extends Shape {
  constructor(width, height) {
    super();
    // store width and height
  }
  area() {
    // width * height
  }
}

function totalArea(shapes) {
  // sum the area of every shape
}
`,
      solution: `class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rect extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

function totalArea(shapes) {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}`,
      tests: [
        {
          name: "Circle(5).area() === Math.PI * 25",
          code: `assertEquals(new Circle(5).area(), Math.PI * 25);`,
        },
        {
          name: "Rect(4, 6).area() === 24",
          code: `assertEquals(new Rect(4, 6).area(), 24);`,
        },
        {
          name: "Shape base area() === 0",
          code: `assertEquals(new Shape().area(), 0);`,
        },
        {
          name: "totalArea with mixed shapes",
          code: `const result = totalArea([new Rect(3, 4), new Circle(0)]); assertEquals(result, 12);`,
        },
        {
          name: "totalArea with empty array returns 0",
          code: `assertEquals(totalArea([]), 0);`,
        },
        {
          name: "Circle and Rect are subclasses of Shape",
          code: `assert(new Circle(1) instanceof Shape); assert(new Rect(1, 1) instanceof Shape);`,
        },
      ],
      hints: [
        "Don't forget to call super() in each subclass constructor.",
        "totalArea can use reduce: shapes.reduce((sum, s) => sum + s.area(), 0).",
        "The key insight: totalArea never needs to check the type — each shape knows its own area().",
      ],
      explanation: `totalArea calls shape.area() polymorphically. Because Circle and Rect honour the same contract as Shape, they are true drop-in replacements — that's LSP in action.`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 5 — I: Interface Segregation Principle
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "interface-segregation",
      title: "I — Interface Segregation Principle",
      blurb: "Don't force classes to implement methods they don't need.",
      xp: 35,
      content: `# I — Interface Segregation Principle

> *No class should be forced to depend on methods it does not use.*

JavaScript doesn't have formal interfaces, but the principle still applies: if
you create one large "interface" (or abstract base), concrete classes may be
forced to stub out methods that make no sense for them.

\`\`\`js
// ❌ Fat "interface" — Printer can't scan, but is forced to have the method
class Device {
  print()  { throw new Error("not implemented"); }
  scan()   { throw new Error("not implemented"); }
  fax()    { throw new Error("not implemented"); }
}
class BasicPrinter extends Device {
  print()  { return "printing"; }
  scan()   { throw new Error("not supported"); } // forced stub
  fax()    { throw new Error("not supported"); } // forced stub
}
\`\`\`

The fix: use **focused mixins** (or separate base classes) so each class only
picks up the behaviour it actually needs.

## Your task

Define three small mixin objects (plain objects with methods):

- \`Printable\` — has \`print()\` that returns \`"printing"\`
- \`Scannable\` — has \`scan()\` that returns \`"scanning"\`
- \`Faxable\` — has \`fax()\` that returns \`"faxing"\`

Then create two classes using \`Object.assign\` in the constructor to mix in only
what each device needs:

- \`BasicPrinter\` — only \`Printable\`. Constructor: \`Object.assign(this, Printable)\`
- \`AllInOne\` — all three mixins (\`Printable\`, \`Scannable\`, \`Faxable\`)

\`BasicPrinter\` should have \`print\` but **not** \`scan\` or \`fax\`.`,
      starterCode: `const Printable = {
  // print() returns "printing"
};

const Scannable = {
  // scan() returns "scanning"
};

const Faxable = {
  // fax() returns "faxing"
};

class BasicPrinter {
  constructor() {
    // mix in only Printable
  }
}

class AllInOne {
  constructor() {
    // mix in all three
  }
}
`,
      solution: `const Printable = {
  print() { return "printing"; },
};

const Scannable = {
  scan() { return "scanning"; },
};

const Faxable = {
  fax() { return "faxing"; },
};

class BasicPrinter {
  constructor() {
    Object.assign(this, Printable);
  }
}

class AllInOne {
  constructor() {
    Object.assign(this, Printable, Scannable, Faxable);
  }
}`,
      tests: [
        {
          name: "BasicPrinter can print",
          code: `assertEquals(new BasicPrinter().print(), "printing");`,
        },
        {
          name: "BasicPrinter does NOT have scan",
          code: `assertEquals(typeof new BasicPrinter().scan, "undefined");`,
        },
        {
          name: "BasicPrinter does NOT have fax",
          code: `assertEquals(typeof new BasicPrinter().fax, "undefined");`,
        },
        {
          name: "AllInOne can print",
          code: `assertEquals(new AllInOne().print(), "printing");`,
        },
        {
          name: "AllInOne can scan",
          code: `assertEquals(new AllInOne().scan(), "scanning");`,
        },
        {
          name: "AllInOne can fax",
          code: `assertEquals(new AllInOne().fax(), "faxing");`,
        },
      ],
      hints: [
        "Each mixin is just a plain object with a method, e.g. const Printable = { print() { return 'printing'; } };",
        "Object.assign(this, Printable) copies all properties of Printable onto the instance.",
        "For AllInOne, chain all three: Object.assign(this, Printable, Scannable, Faxable);",
      ],
      explanation: `BasicPrinter only picks up what it needs. If a scan requirement changes, BasicPrinter is completely unaffected — that's Interface Segregation.`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 6 — D: Dependency Inversion Principle
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "dependency-inversion",
      title: "D — Dependency Inversion Principle",
      blurb: "Inject dependencies so high-level code stays decoupled.",
      xp: 45,
      content: `# D — Dependency Inversion Principle

> *High-level modules should not depend on low-level modules. Both should depend
> on abstractions.*

When a class constructs its own dependencies with \`new\`, it is tightly coupled —
you can't swap the dependency without editing the class.

\`\`\`js
// ❌ OrderProcessor is hardwired to EmailNotifier
class OrderProcessor {
  constructor() {
    this.notifier = new EmailNotifier(); // tight coupling
  }
  process(order) {
    // ...
    this.notifier.notify(order);
  }
}
\`\`\`

The fix: **inject** the dependency. The caller decides which concrete type to
provide — the class only knows the abstract contract (\`notify\`).

\`\`\`js
// ✅ Notifier is injected — any object with .notify() works
class OrderProcessor {
  constructor(notifier) {
    this.notifier = notifier;
  }
  process(order) {
    this.notifier.notify(order);
  }
}
\`\`\`

## Your task

Write two concrete notifier classes:

- \`EmailNotifier\` — \`notify(message)\` returns \`"Email: " + message\`
- \`SmsNotifier\` — \`notify(message)\` returns \`"SMS: " + message\`

Then write \`AlertService\` whose constructor accepts a \`notifier\` and stores it
as \`this.notifier\`. It has a method \`send(message)\` that returns
\`this.notifier.notify(message)\`.

\`AlertService\` must work identically whether you pass an \`EmailNotifier\` or
an \`SmsNotifier\` — it must not contain any \`if/else\` on the notifier type.`,
      starterCode: `class EmailNotifier {
  notify(message) {
    // return "Email: " + message
  }
}

class SmsNotifier {
  notify(message) {
    // return "SMS: " + message
  }
}

class AlertService {
  constructor(notifier) {
    // store the injected notifier
  }
  send(message) {
    // delegate to this.notifier.notify(message)
  }
}
`,
      solution: `class EmailNotifier {
  notify(message) {
    return "Email: " + message;
  }
}

class SmsNotifier {
  notify(message) {
    return "SMS: " + message;
  }
}

class AlertService {
  constructor(notifier) {
    this.notifier = notifier;
  }
  send(message) {
    return this.notifier.notify(message);
  }
}`,
      tests: [
        {
          name: "EmailNotifier.notify prefixes Email:",
          code: `assertEquals(new EmailNotifier().notify("hello"), "Email: hello");`,
        },
        {
          name: "SmsNotifier.notify prefixes SMS:",
          code: `assertEquals(new SmsNotifier().notify("hello"), "SMS: hello");`,
        },
        {
          name: "AlertService with EmailNotifier",
          code: `const svc = new AlertService(new EmailNotifier()); assertEquals(svc.send("order placed"), "Email: order placed");`,
        },
        {
          name: "AlertService with SmsNotifier",
          code: `const svc = new AlertService(new SmsNotifier()); assertEquals(svc.send("order placed"), "SMS: order placed");`,
        },
        {
          name: "AlertService works with any object that has notify()",
          code: `const stub = { notify: (m) => "Stub: " + m }; const svc = new AlertService(stub); assertEquals(svc.send("ping"), "Stub: ping");`,
        },
      ],
      hints: [
        "EmailNotifier.notify just returns 'Email: ' + message.",
        "AlertService stores the notifier in the constructor: this.notifier = notifier.",
        "AlertService.send is one line: return this.notifier.notify(message).",
      ],
      explanation: `AlertService doesn't know or care whether it's talking to email, SMS, or a test stub. By depending on the abstraction (anything with .notify()), it's fully open to extension and easy to test.`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 7 — Applying SOLID Together
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "solid-together",
      title: "Applying SOLID Together",
      blurb: "Refactor a mixed-violation class into clean, SOLID design.",
      xp: 50,
      content: `# Applying SOLID Together

Real codebases rarely violate just one principle. Here's a class that breaks
several at once:

\`\`\`js
// ❌ Violations: SRP (validates + formats + saves), OCP (if/else for format),
//               DIP (constructs its own storage)
class ReportManager {
  constructor() { this.storage = new LocalStorage(); }
  handle(report, format) {
    if (!report.title) throw new Error("invalid");
    let output;
    if (format === "json") output = JSON.stringify(report);
    else if (format === "text") output = report.title + "\\n" + report.body;
    this.storage.save(output);
  }
}
\`\`\`

## Your task

Build a clean version with separated responsibilities and injected dependencies.

Implement **exactly** the following pieces (the tests check each name):

1. **\`validateReport(report)\`** — a plain function. Returns \`true\` if
   \`report.title\` is a non-empty string, \`false\` otherwise.

2. **\`JsonFormatter\`** — a class. \`format(report)\` returns
   \`JSON.stringify(report)\`.

3. **\`TextFormatter\`** — a class. \`format(report)\` returns
   \`report.title + "\\n" + report.body\`.

4. **\`ReportService\`** — a class whose constructor takes \`(formatter, storage)\`.
   It has a \`save(report)\` method that:
   - Throws \`new Error("invalid report")\` if \`validateReport(report)\` is
     \`false\`.
   - Otherwise calls \`formatter.format(report)\` and passes the result to
     \`storage.save()\`, then returns \`true\`.`,
      starterCode: `function validateReport(report) {
  // return true if report.title is a non-empty string
}

class JsonFormatter {
  format(report) {
    // return JSON.stringify(report)
  }
}

class TextFormatter {
  format(report) {
    // return report.title + "\\n" + report.body
  }
}

class ReportService {
  constructor(formatter, storage) {
    // store formatter and storage
  }
  save(report) {
    // validate → format → storage.save → return true
  }
}
`,
      solution: `function validateReport(report) {
  return typeof report.title === "string" && report.title.length > 0;
}

class JsonFormatter {
  format(report) {
    return JSON.stringify(report);
  }
}

class TextFormatter {
  format(report) {
    return report.title + "\\n" + report.body;
  }
}

class ReportService {
  constructor(formatter, storage) {
    this.formatter = formatter;
    this.storage = storage;
  }
  save(report) {
    if (!validateReport(report)) throw new Error("invalid report");
    const output = this.formatter.format(report);
    this.storage.save(output);
    return true;
  }
}`,
      tests: [
        {
          name: "validateReport returns true for valid report",
          code: `assertEquals(validateReport({ title: "Q1", body: "..." }), true);`,
        },
        {
          name: "validateReport returns false for missing title",
          code: `assertEquals(validateReport({ title: "", body: "x" }), false);`,
        },
        {
          name: "JsonFormatter formats as JSON",
          code: `const r = { title: "T", body: "B" }; assertEquals(new JsonFormatter().format(r), JSON.stringify(r));`,
        },
        {
          name: "TextFormatter formats as title\\nbody",
          code: `assertEquals(new TextFormatter().format({ title: "T", body: "B" }), "T\\nB");`,
        },
        {
          name: "ReportService.save returns true on valid report",
          code: `const store = { saved: null, save(v) { this.saved = v; } }; const svc = new ReportService(new JsonFormatter(), store); assertEquals(svc.save({ title: "T", body: "B" }), true);`,
        },
        {
          name: "ReportService.save calls storage.save with formatted output",
          code: `const store = { saved: null, save(v) { this.saved = v; } }; const svc = new ReportService(new TextFormatter(), store); svc.save({ title: "Hi", body: "there" }); assertEquals(store.saved, "Hi\\nthere");`,
        },
        {
          name: "ReportService.save throws on invalid report",
          code: `const store = { save() {} }; const svc = new ReportService(new JsonFormatter(), store); let threw = false; try { svc.save({ title: "" }); } catch(e) { threw = true; } assert(threw);`,
        },
      ],
      hints: [
        "validateReport is standalone — no class needed, just a function.",
        "ReportService stores both dependencies: this.formatter = formatter; this.storage = storage;",
        "In save(), call validateReport(report) first. If false, throw new Error('invalid report').",
        "Then: const output = this.formatter.format(report); this.storage.save(output); return true;",
      ],
      explanation: `Each piece has one job (SRP). ReportService never changes when new formatters are added (OCP). Any formatter that has .format() works as a drop-in (LSP + ISP). ReportService never constructs its own dependencies (DIP).`,
    },

    // ─────────────────────────────────────────────────────────────────────
    // Lesson 8 — SOLID in the Wild (quiz)
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "solid-in-the-wild",
      title: "SOLID in the Wild",
      blurb: "Identify which principle each real-world scenario violates.",
      xp: 25,
      kind: "quiz",
      content: `# SOLID in the Wild

You've coded all five principles — now sharpen your eye for spotting them in
real code reviews.

For each scenario below, pick the SOLID principle most directly violated.`,
      questions: [
        {
          prompt:
            "A `UserService` class handles authentication, sends welcome emails, writes audit logs, and updates the database. Which principle does this most directly violate?",
          options: [
            "Open/Closed Principle",
            "Single Responsibility Principle",
            "Dependency Inversion Principle",
          ],
          answer: 1,
          explanation:
            "A class that does authentication, emailing, logging, and DB writes has four reasons to change — a clear SRP violation. Each responsibility belongs in its own class.",
        },
        {
          prompt:
            "A payment library works fine for credit cards. When PayPal is added, a developer edits the core `processPayment` function to add `if (type === 'paypal') ...`. Which principle is violated?",
          options: [
            "Liskov Substitution Principle",
            "Interface Segregation Principle",
            "Open/Closed Principle",
          ],
          answer: 2,
          explanation:
            "Editing the existing, working function to handle a new type violates OCP. A better approach: each payment provider implements a common interface, and processPayment just calls provider.charge().",
        },
        {
          prompt:
            "A `ReadOnlyFile` class extends `File`. `File` has a `write(data)` method. `ReadOnlyFile.write()` throws `Error('not allowed')`. Code that receives a `File` and calls `write()` breaks when given a `ReadOnlyFile`. Which principle is violated?",
          options: [
            "Liskov Substitution Principle",
            "Single Responsibility Principle",
            "Interface Segregation Principle",
          ],
          answer: 0,
          explanation:
            "LSP requires a subclass to honour the parent's contract. A ReadOnlyFile that throws on write() is not a substitutable File — callers expecting to write will break.",
        },
        {
          prompt:
            "A `Worker` interface has `work()`, `eat()`, and `sleep()`. A `RobotWorker` class implements it but throws on `eat()` and `sleep()` because robots don't do those things. Which principle is violated?",
          options: [
            "Dependency Inversion Principle",
            "Open/Closed Principle",
            "Interface Segregation Principle",
          ],
          answer: 2,
          explanation:
            "ISP: RobotWorker is forced to depend on methods it doesn't use. The fix is to split the interface — e.g. Workable, Eatable, Sleepable — so robots only implement Workable.",
        },
        {
          prompt:
            "A `ReportGenerator` class creates a `new MySQLDatabase()` inside its constructor and is impossible to test without a real MySQL connection. Which principle is violated?",
          options: [
            "Liskov Substitution Principle",
            "Dependency Inversion Principle",
            "Single Responsibility Principle",
          ],
          answer: 1,
          explanation:
            "DIP: high-level code (ReportGenerator) is directly coupled to a low-level module (MySQLDatabase). Injecting a database interface through the constructor would let tests pass a mock and decouple the two.",
        },
      ],
    },
  ],
};
