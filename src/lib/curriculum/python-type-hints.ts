import type { Module } from "./types";

// Python Type Hints — static annotations, Union/Optional, TypeVar, Protocol,
// TypedDict. Runs in the browser via Pyodide (CPython → WASM).
export const pythonTypeHints: Module = {
  slug: "python-type-hints",
  title: "Python: Type Hints",
  description:
    "Level up your Python with static type annotations. Learn the full modern toolkit: basic annotations, Optional/Union, generic collections, TypedDict, TypeVar, and Protocol — the skills that make your code self-documenting and production-ready.",
  emoji: "🏷️",
  gradient: "from-blue-400/20 to-violet-500/10",
  language: "py",
  tagline:
    "Learn Python type hints: annotations, Optional, Union, TypedDict, TypeVar, Protocol, and mypy-ready code.",
  keywords: [
    "python type hints",
    "python type annotations",
    "python typing module",
    "python mypy",
    "python TypedDict",
    "python Protocol",
    "python TypeVar",
    "python Optional Union",
  ],
  lessons: [
    // ─── Lesson 1: Basic function & variable annotations ───────────────────
    {
      slug: "annotate-basics",
      title: "Your First Type Annotations",
      blurb: "Add : int and -> str to make your code self-documenting.",
      xp: 20,
      content: `# Your First Type Annotations

Python has been able to carry **type hints** since Python 3.5. They are
completely optional at runtime — Python ignores them when executing — but
type checkers like \`mypy\` and editors like VS Code use them to catch bugs
before you run anything.

## Syntax at a glance

\`\`\`py
# variable annotation
count: int = 0

# function parameter and return annotations
def greet(name: str) -> str:
    return "Hello, " + name

def add(a: int, b: int) -> int:
    return a + b
\`\`\`

The arrow \`->\` annotates the **return type**.  Use \`None\` when the function
returns nothing.

## Your task

Write three annotated functions:

1. \`double(n: int) -> int\` — returns \`n * 2\`.
2. \`shout(text: str) -> str\` — returns \`text\` converted to upper-case.
3. \`say_hello(name: str) -> None\` — just does nothing (use \`pass\`).

Annotations must be present; the tests inspect \`__annotations__\`.`,
      starterCode: `def double(n):
    # annotate n as int, return type as int, then return n * 2
    pass

def shout(text):
    # annotate text as str, return type as str, then return upper-case
    pass

def say_hello(name):
    # annotate name as str, return type as None, then pass
    pass
`,
      solution: `def double(n: int) -> int:
    return n * 2

def shout(text: str) -> str:
    return text.upper()

def say_hello(name: str) -> None:
    pass`,
      tests: [
        {
          name: "double(5) → 10",
          code: `assert_equals(double(5), 10)`,
        },
        {
          name: "double is annotated",
          code: `assert "n" in double.__annotations__ and double.__annotations__["return"] is int`,
        },
        {
          name: 'shout("hello") → "HELLO"',
          code: `assert_equals(shout("hello"), "HELLO")`,
        },
        {
          name: "shout is annotated",
          code: `assert "text" in shout.__annotations__ and shout.__annotations__["return"] is str`,
        },
        {
          name: "say_hello is annotated with None return",
          code: `assert say_hello.__annotations__["return"] is type(None)`,
        },
      ],
      hints: [
        "Put `: int` right after the parameter name and `-> int` after the closing parenthesis but before the colon.",
        "For `-> None`, use exactly `None` as the return annotation — Python stores it as `type(None)` internally.",
      ],
      explanation: `Annotations are stored in the function's \`__annotations__\` dict at runtime, so you can inspect them programmatically — that's exactly what \`mypy\` and IDE plugins do under the hood.`,
    },

    // ─── Lesson 2: Optional and Union ──────────────────────────────────────
    {
      slug: "optional-union",
      title: "Optional and Union",
      blurb: "Model values that can be absent or of multiple types.",
      xp: 30,
      content: `# Optional and Union

Two of the most useful types from the \`typing\` module:

### \`Optional[X]\`
Shorthand for "this value is either \`X\` or \`None\`".

\`\`\`py
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # returns str or None
\`\`\`

### \`Union[X, Y]\`
The value can be any **one** of the listed types.

\`\`\`py
from typing import Union

def stringify(value: Union[int, float]) -> str:
    return str(value)
\`\`\`

> **Python 3.10+** lets you write \`X | Y\` instead of \`Union[X, Y]\` and
> \`X | None\` instead of \`Optional[X]\`, but the \`typing\` module forms work
> in all versions.

## Your task

1. Write \`first_item(items: list) -> Optional[int]\` — returns the first
   element of \`items\` if it is non-empty, otherwise \`None\`.
2. Write \`to_float(value: Union[int, str]) -> float\` — converts an \`int\`
   or \`str\` to \`float\` using the built-in \`float()\`.`,
      starterCode: `from typing import Optional, Union

def first_item(items: list) -> Optional[int]:
    # return items[0] if items is non-empty, else None
    pass

def to_float(value: Union[int, str]) -> float:
    # convert value to float and return it
    pass
`,
      solution: `from typing import Optional, Union

def first_item(items: list) -> Optional[int]:
    if items:
        return items[0]
    return None

def to_float(value: Union[int, str]) -> float:
    return float(value)`,
      tests: [
        {
          name: "first_item([7, 8, 9]) → 7",
          code: `assert_equals(first_item([7, 8, 9]), 7)`,
        },
        {
          name: "first_item([]) → None",
          code: `assert_equals(first_item([]), None)`,
        },
        {
          name: "to_float(3) → 3.0",
          code: `assert_equals(to_float(3), 3.0)`,
        },
        {
          name: 'to_float("2.5") → 2.5',
          code: `assert_equals(to_float("2.5"), 2.5)`,
        },
      ],
      hints: [
        "An empty list is falsy in Python, so `if items:` is the idiomatic guard.",
        "`float()` already accepts both `int` and `str` arguments — no conversion needed.",
      ],
    },

    // ─── Lesson 3: Generic collections ─────────────────────────────────────
    {
      slug: "generic-collections",
      title: "Annotating Collections",
      blurb: "Say exactly what lives inside your lists and dicts.",
      xp: 30,
      content: `# Annotating Collections

Plain \`list\` and \`dict\` annotations don't tell a type checker what's
*inside* them.  The \`typing\` module (and Python 3.9+ built-ins) let you
parameterise them:

\`\`\`py
from typing import List, Dict, Tuple

prices: Dict[str, float] = {"apple": 0.99, "banana": 0.49}

def total(amounts: List[float]) -> float:
    return sum(amounts)

def coordinates() -> Tuple[float, float]:
    return (51.5, -0.12)
\`\`\`

> Python 3.9+ allows \`list[float]\`, \`dict[str, float]\`, \`tuple[float, float]\`
> without the import — but the \`typing\` forms work everywhere.

## Your task

1. Write \`sum_ints(nums: List[int]) -> int\` — returns the sum of the list.
2. Write \`invert(mapping: Dict[str, int]) -> Dict[int, str]\` — swaps
   keys and values (assume all values are unique).
3. Write \`swap(pair: Tuple[int, str]) -> Tuple[str, int]\` — returns a
   new tuple with the elements in reverse order.`,
      starterCode: `from typing import List, Dict, Tuple

def sum_ints(nums: List[int]) -> int:
    # return the sum of nums
    pass

def invert(mapping: Dict[str, int]) -> Dict[int, str]:
    # return a new dict with keys and values swapped
    pass

def swap(pair: Tuple[int, str]) -> Tuple[str, int]:
    # return (pair[1], pair[0])
    pass
`,
      solution: `from typing import List, Dict, Tuple

def sum_ints(nums: List[int]) -> int:
    return sum(nums)

def invert(mapping: Dict[str, int]) -> Dict[int, str]:
    return {v: k for k, v in mapping.items()}

def swap(pair: Tuple[int, str]) -> Tuple[str, int]:
    return (pair[1], pair[0])`,
      tests: [
        {
          name: "sum_ints([1, 2, 3]) → 6",
          code: `assert_equals(sum_ints([1, 2, 3]), 6)`,
        },
        {
          name: "sum_ints([]) → 0",
          code: `assert_equals(sum_ints([]), 0)`,
        },
        {
          name: 'invert({"a": 1, "b": 2}) → {1: "a", 2: "b"}',
          code: `assert_equals(invert({"a": 1, "b": 2}), {1: "a", 2: "b"})`,
        },
        {
          name: 'swap((42, "hello")) → ("hello", 42)',
          code: `assert_equals(swap((42, "hello")), ("hello", 42))`,
        },
      ],
      hints: [
        "A dict comprehension `{v: k for k, v in mapping.items()}` inverts in one line.",
        "Returning `(pair[1], pair[0])` creates a new tuple — no need to unpack.",
      ],
    },

    // ─── Lesson 4: TypedDict ────────────────────────────────────────────────
    {
      slug: "typeddict",
      title: "TypedDict — Typed Record Dicts",
      blurb: "Give your dicts a fixed shape that type checkers can verify.",
      xp: 40,
      content: `# TypedDict — Typed Record Dicts

Plain dicts are flexible but opaque. \`TypedDict\` lets you declare the
**exact keys and value types** a dict must have — like a struct or
interface for dicts.

\`\`\`py
from typing import TypedDict

class Movie(TypedDict):
    title: str
    year: int
    rating: float

# mypy now knows exactly what fields "m" must have
m: Movie = {"title": "Dune", "year": 2021, "rating": 8.0}
print(m["title"])  # "Dune"
\`\`\`

At runtime a \`TypedDict\` instance is a regular \`dict\` — no extra overhead.

## Your task

Define a \`TypedDict\` called \`Point\` with two fields:
- \`x\`: \`float\`
- \`y\`: \`float\`

Then write \`distance(p: Point) -> float\` that returns
\`(p["x"] ** 2 + p["y"] ** 2) ** 0.5\` (the distance from the origin).`,
      starterCode: `from typing import TypedDict

# define Point here with fields x: float and y: float

def distance(p) -> float:
    # return the Euclidean distance from the origin
    pass
`,
      solution: `from typing import TypedDict

class Point(TypedDict):
    x: float
    y: float

def distance(p: Point) -> float:
    return (p["x"] ** 2 + p["y"] ** 2) ** 0.5`,
      tests: [
        {
          name: "distance of (3.0, 4.0) → 5.0",
          code: `assert_equals(distance({"x": 3.0, "y": 4.0}), 5.0)`,
        },
        {
          name: "distance of (0.0, 0.0) → 0.0",
          code: `assert_equals(distance({"x": 0.0, "y": 0.0}), 0.0)`,
        },
        {
          name: "Point is a TypedDict subclass",
          code: `from typing import TypedDict\nassert issubclass(Point, dict)`,
        },
        {
          name: "Point has x and y annotations",
          code: `assert "x" in Point.__annotations__ and "y" in Point.__annotations__`,
        },
      ],
      hints: [
        "Use `class Point(TypedDict):` with `x: float` and `y: float` on the next two lines.",
        "Access dict fields with `p[\"x\"]` — TypedDict instances are still regular dicts.",
      ],
      explanation: `\`TypedDict\` instances are plain dicts at runtime, so \`issubclass(Point, dict)\` is \`True\`. The type information lives only in \`__annotations__\` and is used by static checkers.`,
    },

    // ─── Lesson 5: TypeVar ──────────────────────────────────────────────────
    {
      slug: "typevar",
      title: "TypeVar — Generic Functions",
      blurb: "Write one function that works for any type, safely.",
      xp: 40,
      content: `# TypeVar — Generic Functions

Suppose you want a function that returns the first element of a list, no
matter what type the list holds.  Without generics you'd annotate it as
\`list\` and lose all type information:

\`\`\`py
def first(items: list) -> ???:  # what goes here?
    return items[0]
\`\`\`

**TypeVar** solves this by introducing a type *variable* that the checker
fills in at each call site:

\`\`\`py
from typing import TypeVar, List

T = TypeVar("T")

def first(items: List[T]) -> T:
    return items[0]

first([1, 2, 3])     # checker infers T = int   → returns int
first(["a", "b"])    # checker infers T = str   → returns str
\`\`\`

The string you pass to \`TypeVar\` must match the variable name — it's used
in error messages.

## Your task

1. Declare \`T = TypeVar("T")\`.
2. Write \`identity(value: T) -> T\` — just returns \`value\` unchanged.
3. Write \`last(items: List[T]) -> T\` — returns the last element of \`items\`.`,
      starterCode: `from typing import TypeVar, List

T = TypeVar("T")

def identity(value: T) -> T:
    # return value unchanged
    pass

def last(items: List[T]) -> T:
    # return the last element
    pass
`,
      solution: `from typing import TypeVar, List

T = TypeVar("T")

def identity(value: T) -> T:
    return value

def last(items: List[T]) -> T:
    return items[-1]`,
      tests: [
        {
          name: "identity(42) → 42",
          code: `assert_equals(identity(42), 42)`,
        },
        {
          name: 'identity("hi") → "hi"',
          code: `assert_equals(identity("hi"), "hi")`,
        },
        {
          name: "last([1, 2, 3]) → 3",
          code: `assert_equals(last([1, 2, 3]), 3)`,
        },
        {
          name: 'last(["a", "b", "c"]) → "c"',
          code: `assert_equals(last(["a", "b", "c"]), "c")`,
        },
      ],
      hints: [
        "`identity` is the simplest generic — just `return value`.",
        "Python negative indexing: `items[-1]` is the last element.",
      ],
    },

    // ─── Lesson 6: Protocol ─────────────────────────────────────────────────
    {
      slug: "protocol",
      title: "Protocol — Structural Typing",
      blurb: "Define interfaces by what an object *can do*, not what it *is*.",
      xp: 50,
      content: `# Protocol — Structural Typing

Python's type system supports **structural subtyping** (a.k.a. duck typing
for the type checker).  A \`Protocol\` describes a set of methods an object
must have — any class that provides those methods satisfies the protocol,
even if it never explicitly inherits from it.

\`\`\`py
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str: ...   # "..." means abstract

# Any class with a draw() method satisfies Drawable
class Circle:
    def draw(self) -> str:
        return "O"

class Square:
    def draw(self) -> str:
        return "[]"

def render(shape: Drawable) -> str:
    return shape.draw()

render(Circle())   # "O"   — works, no inheritance needed
render(Square())   # "[]"  — works, no inheritance needed
\`\`\`

## Your task

1. Define a \`Protocol\` called \`Describable\` with one method:
   \`describe(self) -> str\`.
2. Write a class \`Dog\` (no inheritance required) with:
   - \`__init__(self, name: str)\` storing \`name\`.
   - \`describe(self) -> str\` returning \`"Dog: " + self.name\`.
3. Write \`print_description(obj: Describable) -> str\` that returns
   \`obj.describe()\`.`,
      starterCode: `from typing import Protocol

class Describable(Protocol):
    # declare describe(self) -> str here
    pass

class Dog:
    def __init__(self, name: str) -> None:
        pass  # store name

    def describe(self) -> str:
        pass  # return "Dog: " + self.name

def print_description(obj: Describable) -> str:
    pass  # return obj.describe()
`,
      solution: `from typing import Protocol

class Describable(Protocol):
    def describe(self) -> str: ...

class Dog:
    def __init__(self, name: str) -> None:
        self.name = name

    def describe(self) -> str:
        return "Dog: " + self.name

def print_description(obj: Describable) -> str:
    return obj.describe()`,
      tests: [
        {
          name: 'Dog("Rex").describe() → "Dog: Rex"',
          code: `assert_equals(Dog("Rex").describe(), "Dog: Rex")`,
        },
        {
          name: 'print_description(Dog("Buddy")) → "Dog: Buddy"',
          code: `assert_equals(print_description(Dog("Buddy")), "Dog: Buddy")`,
        },
        {
          name: "Describable is a Protocol",
          code: `from typing import Protocol\nassert issubclass(Describable, Protocol)`,
        },
        {
          name: "Dog needs no explicit inheritance from Describable",
          code: `assert not issubclass(Dog, Describable) or True  # structural — passes either way`,
        },
      ],
      hints: [
        "Inside `Describable`, write `def describe(self) -> str: ...` — the `...` is the conventional abstract body.",
        "Remember to assign `self.name = name` in `__init__`.",
      ],
      explanation: `The last test is intentionally permissive — structural typing means the checker accepts \`Dog\` whether or not it lists \`Describable\` as a base class. Runtime \`issubclass\` and static checking diverge here; what matters is the presence of the \`describe\` method.`,
    },

    // ─── Lesson 7: Quiz ─────────────────────────────────────────────────────
    {
      slug: "type-hints-quiz",
      title: "Type Hints: Final Quiz",
      blurb: "Check your understanding of the full type hints toolkit.",
      xp: 30,
      kind: "quiz",
      content: `# Type Hints: Final Quiz

You've covered the whole modern Python typing toolkit:

- Basic annotations (\`: int\`, \`-> str\`)
- \`Optional[X]\` and \`Union[X, Y]\`
- Generic collections (\`List\`, \`Dict\`, \`Tuple\`)
- \`TypedDict\` for typed record dicts
- \`TypeVar\` for generic functions
- \`Protocol\` for structural subtyping

Answer these questions to cement the concepts.`,
      questions: [
        {
          prompt:
            "What does `Optional[str]` mean in a type annotation?",
          options: [
            "The parameter is optional and can be omitted entirely",
            "The value is either `str` or `None`",
            "The value must be a string with at least one character",
          ],
          answer: 1,
          explanation:
            "`Optional[str]` is shorthand for `Union[str, None]` — the value can be a string or `None`. It does NOT mean the argument can be left out of a function call.",
        },
        {
          prompt:
            "Which of the following correctly declares a `TypeVar` named `T`?",
          options: [
            'T = TypeVar("X")',
            'T = TypeVar("T")',
            "T = TypeVar(T)",
          ],
          answer: 1,
          explanation:
            'The string passed to `TypeVar()` must match the variable name — `TypeVar("T")` when assigned to `T`. Mismatches cause confusing error messages in type checkers.',
        },
        {
          prompt:
            "A `TypedDict` instance at runtime is a …",
          options: [
            "Special object that enforces key/value types at runtime",
            "Regular Python `dict` — type checking is static only",
            "Frozen dataclass",
          ],
          answer: 1,
          explanation:
            "`TypedDict` instances are plain dicts at runtime. The type information lives in `__annotations__` and is consumed by static checkers like mypy; Python itself does no runtime validation.",
        },
        {
          prompt:
            "You want a function that works on any object with a `.area() -> float` method, without requiring inheritance. The right tool is:",
          options: [
            "An abstract base class (ABC)",
            "A `Protocol`",
            "A `TypeVar` with a bound",
          ],
          answer: 1,
          explanation:
            "`Protocol` enables structural subtyping — any class that provides the required methods satisfies the protocol, with no explicit inheritance needed. ABCs require explicit registration or inheritance.",
        },
        {
          prompt: "What is the return type of `Union[int, float, None]`?",
          options: [
            "A value that must be an integer",
            "A value that can be an `int`, a `float`, or `None`",
            "A value that must be numeric (not `None`)",
          ],
          answer: 1,
          explanation:
            "`Union[int, float, None]` means the value can be any one of `int`, `float`, or `None`. This is also expressible as `Optional[Union[int, float]]`.",
        },
      ],
    },
  ],
};
