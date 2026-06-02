import type { Module } from "./types";

// Python OOP — classes, methods, dunder methods, and inheritance. Runs in the
// browser via Pyodide (CPython → WASM); tests are Python with `assert_equals`.
export const pythonOop: Module = {
  slug: "python-oop",
  title: "Python: Object-Oriented",
  description:
    "Model the world with classes. Learn __init__, methods, __str__, and inheritance — the backbone of real Python codebases. Runs in your browser, no install.",
  emoji: "🐍",
  gradient: "from-emerald-400/20 to-sky-500/10",
  language: "py",
  tagline:
    "Learn Python object-oriented programming: classes, __init__, methods, __str__, and inheritance.",
  keywords: [
    "python classes",
    "python oop",
    "python __init__",
    "python inheritance",
  ],
  lessons: [
    {
      slug: "class-basics",
      title: "Your First Class",
      blurb: "Define a class with __init__ and a method.",
      xp: 35,
      content: `# Your First Class

A **class** is a blueprint. \`__init__\` runs when you create an instance and sets
up its data on \`self\`. Methods are functions defined inside the class.

\`\`\`py
class Cat:
    def __init__(self, name):
        self.name = name
    def meow(self):
        return f"{self.name} says meow"
\`\`\`

## Your task
Write a class \`Dog\` whose \`__init__\` takes a \`name\`, and whose \`bark\` method
returns \`"<name> says woof"\` — e.g. \`Dog("Rex").bark()\` → \`"Rex says woof"\`.`,
      starterCode: `class Dog:
    pass
`,
      solution: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof"`,
      tests: [
        { name: 'Dog("Rex").bark()', code: `assert_equals(Dog("Rex").bark(), "Rex says woof")` },
        { name: 'Dog("Ada").bark()', code: `assert_equals(Dog("Ada").bark(), "Ada says woof")` },
      ],
    },
    {
      slug: "counter-class",
      title: "State in an Object",
      blurb: "Methods that change the instance.",
      xp: 35,
      content: `# State in an Object

An object can hold state that its methods read and update via \`self\`.

## Your task
Write a class \`Counter\` that starts at \`0\`. Its \`increment\` method adds 1, and
its \`value\` method returns the current count.`,
      starterCode: `class Counter:
    pass
`,
      solution: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def value(self):
        return self.count`,
      tests: [
        {
          name: "counts two increments",
          code: `c = Counter()\nc.increment()\nc.increment()\nassert_equals(c.value(), 2)`,
        },
        { name: "starts at 0", code: `assert_equals(Counter().value(), 0)` },
      ],
    },
    {
      slug: "str-method",
      title: "The __str__ Method",
      blurb: "Control how an object prints.",
      xp: 40,
      content: `# The __str__ Method

Defining \`__str__\` controls what \`str(obj)\` (and \`print\`) shows.

\`\`\`py
class Money:
    def __init__(self, amount):
        self.amount = amount
    def __str__(self):
        return f"$"+str(self.amount)
\`\`\`

## Your task
Write a class \`Point\` with \`__init__(self, x, y)\` and a \`__str__\` that returns
\`"(x, y)"\` — e.g. \`str(Point(1, 2))\` → \`"(1, 2)"\`.`,
      starterCode: `class Point:
    pass
`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"`,
      tests: [
        { name: "str(Point(1, 2))", code: `assert_equals(str(Point(1, 2)), "(1, 2)")` },
        { name: "str(Point(3, 4))", code: `assert_equals(str(Point(3, 4)), "(3, 4)")` },
      ],
    },
    {
      slug: "inheritance",
      title: "Inheritance",
      blurb: "Subclasses override behavior.",
      xp: 40,
      content: `# Inheritance

A subclass inherits from a parent and can **override** its methods.

\`\`\`py
class Animal:
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return "meow"
\`\`\`

## Your task
Create \`Animal\` with a \`speak\` method returning \`"..."\`, and a subclass \`Cat\`
that overrides \`speak\` to return \`"meow"\`. \`Cat\` should inherit from \`Animal\`.`,
      starterCode: `class Animal:
    pass

# make Cat inherit from Animal
`,
      solution: `class Animal:
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return "meow"`,
      tests: [
        { name: "Cat speaks meow", code: `assert_equals(Cat().speak(), "meow")` },
        { name: "Animal speaks ...", code: `assert_equals(Animal().speak(), "...")` },
        { name: "Cat is an Animal", code: `assert isinstance(Cat(), Animal)` },
      ],
    },
    {
      slug: "rectangle-area",
      title: "Methods that Compute",
      blurb: "Derive values from stored data.",
      xp: 35,
      content: `# Methods that Compute

Methods often compute something from the object's data rather than just storing
it.

## Your task
Write a class \`Rectangle\` with \`__init__(self, width, height)\` and an \`area\`
method that returns \`width * height\`.`,
      starterCode: `class Rectangle:
    pass
`,
      solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height`,
      tests: [
        { name: "3 x 4 = 12", code: `assert_equals(Rectangle(3, 4).area(), 12)` },
        { name: "5 x 5 = 25", code: `assert_equals(Rectangle(5, 5).area(), 25)` },
      ],
    },
  ],
};
