import type { Module } from "./types";

// Python Decorators — wrapping functions to add behavior without changing source.
// Runs in the browser via Pyodide (CPython → WASM).
export const pythonDecorators: Module = {
  slug: "python-decorators",
  title: "Python: Decorators",
  description:
    "Master Python decorators — the @ syntax that wraps functions to add logging, caching, access control, and more without touching the original code.",
  emoji: "🎀",
  gradient: "from-pink-400/20 to-rose-500/10",
  language: "py",
  tagline:
    "Learn Python decorators: writing wrappers, using @functools.wraps, caching, and stacking decorators.",
  keywords: [
    "python decorators",
    "python functools",
    "python wrapper functions",
    "python @ syntax",
  ],
  lessons: [
    {
      slug: "wrapper-basics",
      title: "Writing a Wrapper",
      blurb: "A decorator is a function that returns a function.",
      xp: 35,
      content: `# Writing a Wrapper

A **decorator** is a function that takes another function and returns a
replacement. The \`@\` syntax is just shorthand for reassigning the name.

\`\`\`py
def shout(fn):
    def wrapper(*args, **kwargs):
        result = fn(*args, **kwargs)
        return str(result).upper()
    return wrapper

@shout
def greet(name):
    return f"hello {name}"

greet("world")  # "HELLO WORLD"
\`\`\`

## Your task
Write a decorator \`double_result\` that wraps any function and returns its result
multiplied by 2.  Apply it to a function \`add(a, b)\` that returns \`a + b\`.`,
      starterCode: `def double_result(fn):
    # return a wrapper that doubles fn's return value
    pass

@double_result
def add(a, b):
    pass
`,
      solution: `def double_result(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs) * 2
    return wrapper

@double_result
def add(a, b):
    return a + b`,
      tests: [
        { name: "add(3, 4) → 14", code: `assert_equals(add(3, 4), 14)` },
        { name: "add(1, 1) → 4", code: `assert_equals(add(1, 1), 4)` },
      ],
    },
    {
      slug: "call-counter",
      title: "Counting Calls",
      blurb: "Track how many times a function is called.",
      xp: 40,
      content: `# Counting Calls

Decorators can keep state in a closure. A **call counter** wraps a function and
records how often it has been invoked.

## Your task
Write a decorator \`count_calls\` that adds a \`call_count\` attribute to the
wrapper.  Each call to the wrapped function should increment \`wrapper.call_count\`
by 1 (start at 0).  Apply it to \`say_hi()\` which returns \`"hi"\`.`,
      starterCode: `def count_calls(fn):
    # wrapper should track how many times fn was called via wrapper.call_count
    pass

@count_calls
def say_hi():
    return "hi"
`,
      solution: `def count_calls(fn):
    def wrapper(*args, **kwargs):
        wrapper.call_count += 1
        return fn(*args, **kwargs)
    wrapper.call_count = 0
    return wrapper

@count_calls
def say_hi():
    return "hi"`,
      tests: [
        { name: "starts at 0", code: `assert_equals(say_hi.call_count, 0)` },
        {
          name: "increments on each call",
          code: `say_hi()\nsay_hi()\nassert_equals(say_hi.call_count, 2)`,
        },
        { name: "still returns hi", code: `assert_equals(say_hi(), "hi")` },
      ],
    },
    {
      slug: "functools-wraps",
      title: "Preserving Metadata with @wraps",
      blurb: "Keep __name__ and __doc__ intact.",
      xp: 35,
      content: `# Preserving Metadata with @wraps

Without \`functools.wraps\`, a decorated function loses its \`__name__\` and
\`__doc__\`. Apply \`@wraps(fn)\` to the inner wrapper to copy them over.

\`\`\`py
import functools

def my_decorator(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper
\`\`\`

## Your task
Write a decorator \`tag\` that prepends \`"[INFO] "\` to the string a function
returns, and uses \`@functools.wraps\` so the wrapper keeps the original name.
Apply it to \`status()\` which returns \`"ok"\`.`,
      starterCode: `import functools

def tag(fn):
    # use @functools.wraps(fn) on the wrapper
    pass

@tag
def status():
    """Returns ok."""
    return "ok"
`,
      solution: `import functools

def tag(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return "[INFO] " + fn(*args, **kwargs)
    return wrapper

@tag
def status():
    """Returns ok."""
    return "ok"`,
      tests: [
        { name: "prepends [INFO]", code: `assert_equals(status(), "[INFO] ok")` },
        { name: "preserves __name__", code: `assert_equals(status.__name__, "status")` },
      ],
    },
    {
      slug: "memoize",
      title: "Simple Memoization",
      blurb: "Cache results to avoid recomputation.",
      xp: 50,
      content: `# Simple Memoization

A **memoization** decorator stores previously computed results in a dict keyed by
the arguments.  On a cache hit it returns the stored value instantly.

\`\`\`py
def memoize(fn):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    return wrapper
\`\`\`

## Your task
Write \`memoize\` exactly as above, then apply it to \`slow_square(n)\` which
returns \`n * n\`.  A \`call_log\` list (defined outside the function) appends \`n\`
each time the real function body runs — use this to prove the cache works.`,
      starterCode: `call_log = []

def memoize(fn):
    # cache results by args tuple
    pass

@memoize
def slow_square(n):
    call_log.append(n)
    return n * n
`,
      solution: `call_log = []

def memoize(fn):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    return wrapper

@memoize
def slow_square(n):
    call_log.append(n)
    return n * n`,
      tests: [
        { name: "computes correctly", code: `assert_equals(slow_square(4), 16)` },
        {
          name: "caches: fn only called once per unique arg",
          code: `slow_square(5)\nslow_square(5)\nassert_equals(call_log.count(5), 1)`,
        },
        {
          name: "different args computed independently",
          code: `assert_equals(slow_square(3), 9)`,
        },
      ],
    },
    {
      slug: "decorator-with-args",
      title: "Decorators with Arguments",
      blurb: "A decorator factory takes configuration.",
      xp: 50,
      content: `# Decorators with Arguments

To pass arguments to a decorator you add another layer: a **factory** that
returns the actual decorator.

\`\`\`py
def repeat(times):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                fn(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def hello():
    print("hello")
\`\`\`

## Your task
Write a decorator factory \`prefix(text)\` that returns a decorator.  The
decorator wraps a function so it prepends \`text + " "\` to the string the
function returns.  Apply \`@prefix("WARN")\` to \`alert(msg)\` which returns \`msg\`.`,
      starterCode: `def prefix(text):
    # return a decorator that prepends text + " " to fn's result
    pass

@prefix("WARN")
def alert(msg):
    return msg
`,
      solution: `def prefix(text):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            return text + " " + fn(*args, **kwargs)
        return wrapper
    return decorator

@prefix("WARN")
def alert(msg):
    return msg`,
      tests: [
        { name: 'alert("disk full") → "WARN disk full"', code: `assert_equals(alert("disk full"), "WARN disk full")` },
        { name: 'alert("low memory") → "WARN low memory"', code: `assert_equals(alert("low memory"), "WARN low memory")` },
      ],
    },
    {
      slug: "stacking-decorators",
      title: "Stacking Decorators",
      blurb: "Multiple @ lines compose outside-in.",
      xp: 40,
      content: `# Stacking Decorators

You can stack decorators — the one closest to the function is applied first,
then each outer one wraps the result.

\`\`\`py
@A
@B
def fn(): ...
# equivalent to: fn = A(B(fn))
\`\`\`

## Your task
Write two decorators:
- \`add_exclamation\`: appends \`"!"\` to the function's string result.
- \`upper_case\`: converts the result to upper-case.

Then write \`greet(name)\` that returns \`"hello " + name\`, decorated with
\`@upper_case\` on top, \`@add_exclamation\` below it.

So \`greet("world")\` → \`"HELLO WORLD!"\`.`,
      starterCode: `def add_exclamation(fn):
    pass

def upper_case(fn):
    pass

@upper_case
@add_exclamation
def greet(name):
    return "hello " + name
`,
      solution: `def add_exclamation(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs) + "!"
    return wrapper

def upper_case(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs).upper()
    return wrapper

@upper_case
@add_exclamation
def greet(name):
    return "hello " + name`,
      tests: [
        { name: 'greet("world") → "HELLO WORLD!"', code: `assert_equals(greet("world"), "HELLO WORLD!")` },
        { name: 'greet("ada") → "HELLO ADA!"', code: `assert_equals(greet("ada"), "HELLO ADA!")` },
      ],
    },
  ],
};
