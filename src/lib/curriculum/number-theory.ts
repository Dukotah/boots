import type { Module } from "./types";

// Number Theory for Programmers — GCD, LCM, primes, Sieve, modular arithmetic,
// and fast exponentiation. Runs entirely in the browser via Pyodide (CPython → WASM).
export const numberTheory: Module = {
  slug: "number-theory",
  title: "Number Theory for Programmers",
  description:
    "Build the mathematical toolkit every programmer needs: GCD, LCM, prime testing, the Sieve of Eratosthenes, modular arithmetic, and fast modular exponentiation — all coded and auto-graded in Python.",
  emoji: "🔢",
  gradient: "from-violet-400/20 to-indigo-500/10",
  language: "py",
  tagline:
    "Code GCD, primes, the Sieve of Eratosthenes, and modular exponentiation in Python — directly applicable to cryptography, hashing, and interview problems.",
  keywords: [
    "number theory python",
    "euclidean algorithm",
    "gcd lcm python",
    "sieve of eratosthenes",
    "modular arithmetic",
    "modular exponentiation",
    "prime numbers python",
    "number theory interview",
  ],
  lessons: [
    // ── Lesson 1 ── GCD / Euclidean algorithm ──────────────────────────────
    {
      slug: "euclidean-gcd",
      title: "GCD & the Euclidean Algorithm",
      blurb: "Find the greatest common divisor with one recursive insight.",
      xp: 30,
      content: `# GCD & the Euclidean Algorithm

The **greatest common divisor** (GCD) of two integers is the largest integer
that divides both without a remainder.

The Euclidean algorithm exploits one elegant observation:

> gcd(a, b) = gcd(b, a % b)

Keep reducing until the second argument is 0 — at that point, the first argument
*is* the GCD.

\`\`\`py
gcd(48, 18)
  → gcd(18, 48 % 18)   # gcd(18, 12)
  → gcd(12, 18 % 12)   # gcd(12, 6)
  → gcd(6,  12 % 6)    # gcd(6, 0)
  → 6                  # base case
\`\`\`

This runs in **O(log min(a, b))** time — dramatically faster than trial division.

## Your task

Write \`gcd(a, b)\` using the Euclidean algorithm (recursion or a \`while\` loop).
Return the GCD of the two non-negative integers.  Assume \`gcd(0, n) = n\`.`,
      starterCode: `def gcd(a, b):
    # implement the Euclidean algorithm
    pass
`,
      solution: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`,
      tests: [
        { name: "gcd(48, 18) == 6",    code: `assert_equals(gcd(48, 18), 6)` },
        { name: "gcd(100, 75) == 25",  code: `assert_equals(gcd(100, 75), 25)` },
        { name: "gcd(7, 3) == 1",      code: `assert_equals(gcd(7, 3), 1)` },
        { name: "gcd(0, 5) == 5",      code: `assert_equals(gcd(0, 5), 5)` },
        { name: "gcd(12, 12) == 12",   code: `assert_equals(gcd(12, 12), 12)` },
      ],
      hints: [
        "Use a while loop: keep swapping (a, b) = (b, a % b) until b is 0.",
        "When b reaches 0, a holds the answer — just return a.",
      ],
      explanation: `The loop invariant is \`gcd(a, b)\` never changes. Each iteration replaces the
larger number with the remainder, shrinking the problem. When \`b == 0\`, \`a\`
holds the last non-zero remainder, which is the GCD.`,
    },

    // ── Lesson 2 ── LCM ────────────────────────────────────────────────────
    {
      slug: "lcm",
      title: "Least Common Multiple",
      blurb: "LCM in one formula: a * b // gcd(a, b).",
      xp: 25,
      content: `# Least Common Multiple

The **least common multiple** (LCM) of two integers is the smallest positive
integer divisible by both.

Once you have GCD, LCM comes free:

$$\\text{lcm}(a, b) = \\frac{a \\times b}{\\gcd(a, b)}$$

Divide *before* multiplying to avoid integer overflow:

\`\`\`py
def lcm(a, b):
    return a // gcd(a, b) * b
\`\`\`

LCM is used everywhere fractions are simplified, in scheduling problems
(when do two repeating events coincide?), and in cryptographic key generation.

## Your task

Implement \`gcd(a, b)\` (Euclidean algorithm) **and** \`lcm(a, b)\` that uses it.
Both functions must be defined in your solution.`,
      starterCode: `def gcd(a, b):
    # Euclidean algorithm
    pass

def lcm(a, b):
    # use gcd to compute lcm without overflow
    pass
`,
      solution: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a // gcd(a, b) * b`,
      tests: [
        { name: "lcm(4, 6) == 12",    code: `assert_equals(lcm(4, 6), 12)` },
        { name: "lcm(3, 5) == 15",    code: `assert_equals(lcm(3, 5), 15)` },
        { name: "lcm(12, 18) == 36",  code: `assert_equals(lcm(12, 18), 36)` },
        { name: "lcm(7, 7) == 7",     code: `assert_equals(lcm(7, 7), 7)` },
        { name: "lcm(1, 100) == 100", code: `assert_equals(lcm(1, 100), 100)` },
      ],
      hints: [
        "Copy your gcd from the previous lesson, then use the formula: a // gcd(a, b) * b.",
      ],
    },

    // ── Lesson 3 ── Prime testing ───────────────────────────────────────────
    {
      slug: "prime-test",
      title: "Is It Prime? Trial Division",
      blurb: "Test primality in O(√n) with a tight loop.",
      xp: 35,
      content: `# Is It Prime? Trial Division

A **prime** has exactly two divisors: 1 and itself.

**Key insight:** if \`n\` has a divisor \`d > 1\`, then either \`d ≤ √n\` *or* the
paired factor \`n/d ≤ √n\`. So we only need to check divisors up to \`√n\`.

\`\`\`py
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True
\`\`\`

\`math.isqrt(n)\` is the integer square root — no floating-point rounding issues.

## Your task

Write \`is_prime(n)\` that returns \`True\` if \`n\` is prime, \`False\` otherwise.`,
      starterCode: `import math

def is_prime(n):
    # return True if n is prime, False otherwise
    pass
`,
      solution: `import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True`,
      tests: [
        { name: "is_prime(2) == True",   code: `assert_equals(is_prime(2), True)` },
        { name: "is_prime(17) == True",  code: `assert_equals(is_prime(17), True)` },
        { name: "is_prime(1) == False",  code: `assert_equals(is_prime(1), False)` },
        { name: "is_prime(15) == False", code: `assert_equals(is_prime(15), False)` },
        { name: "is_prime(97) == True",  code: `assert_equals(is_prime(97), True)` },
        { name: "is_prime(0) == False",  code: `assert_equals(is_prime(0), False)` },
      ],
      hints: [
        "Handle n < 2 as a special case (return False).",
        "Loop i from 2 up to math.isqrt(n) inclusive. If n % i == 0, it is composite.",
      ],
      explanation: `Checking only up to √n works because divisors come in pairs (d, n/d).
If both were greater than √n their product would exceed n — contradiction.
So at least one of every factor pair is ≤ √n.`,
    },

    // ── Lesson 4 ── Sieve of Eratosthenes ──────────────────────────────────
    {
      slug: "sieve",
      title: "Sieve of Eratosthenes",
      blurb: "Generate all primes up to n in O(n log log n).",
      xp: 45,
      content: `# Sieve of Eratosthenes

Testing each number individually is slow when you need **all primes up to n**.
The **Sieve of Eratosthenes** pre-eliminates composites in bulk:

1. Create a boolean list \`is_prime\` of size \`n+1\`, all \`True\`.
2. Mark 0 and 1 as \`False\`.
3. For each \`p\` from 2 to \`√n\`:
   - If \`is_prime[p]\`, mark every multiple of \`p\` starting at \`p*p\` as \`False\`.
4. Collect all indices still marked \`True\`.

\`\`\`
n = 10  →  sieve  →  [2, 3, 5, 7]
\`\`\`

Starting at \`p*p\` (not \`2*p\`) is a classic optimisation — smaller multiples of
\`p\` were already crossed off by earlier primes.

## Your task

Write \`sieve(n)\` that returns a **sorted list** of all prime numbers ≤ \`n\`.
Return an empty list when \`n < 2\`.`,
      starterCode: `def sieve(n):
    # return a list of all primes <= n
    pass
`,
      solution: `def sieve(n):
    if n < 2:
        return []
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    return [i for i in range(n + 1) if is_prime[i]]`,
      tests: [
        { name: "sieve(10) == [2,3,5,7]",       code: `assert_equals(sieve(10), [2, 3, 5, 7])` },
        { name: "sieve(1) == []",                code: `assert_equals(sieve(1), [])` },
        { name: "sieve(2) == [2]",               code: `assert_equals(sieve(2), [2])` },
        { name: "sieve(20) has 8 primes",        code: `assert_equals(len(sieve(20)), 8)` },
        { name: "sieve(50) ends with 47",        code: `assert_equals(sieve(50)[-1], 47)` },
      ],
      hints: [
        "Start with a list of True booleans: [True] * (n + 1), then set index 0 and 1 to False.",
        "Outer loop: p from 2 while p*p <= n. Inner loop: mark range(p*p, n+1, p) False.",
        "Collect results: [i for i in range(n+1) if is_prime[i]]",
      ],
      explanation: `Starting the inner loop at \`p*p\` is correct because any composite \`p*k\`
where \`k < p\` has a prime factor \`< p\` that already marked it off. This
roughly halves the work compared to starting at \`2*p\`.`,
    },

    // ── Lesson 5 ── Modular arithmetic basics ──────────────────────────────
    {
      slug: "modular-arithmetic",
      title: "Modular Arithmetic",
      blurb: "Clock arithmetic: add, subtract, and multiply inside a fixed range.",
      xp: 30,
      content: `# Modular Arithmetic

**Modular arithmetic** wraps numbers around a fixed value called the **modulus**.
Think of a 12-hour clock: after 11 comes 0 again (mod 12).

In code \`%\` is the modulo operator:

\`\`\`py
(7 + 8) % 10   # 5  — not 15
(3 - 7) % 10   # 6  — Python's % always returns a non-negative result
(6 * 9) % 10   # 4
\`\`\`

Key properties (let \`m\` be the modulus):

| Operation | Rule |
|-----------|------|
| Add       | \`(a + b) % m\` |
| Subtract  | \`(a - b) % m\` |
| Multiply  | \`(a * b) % m\` |

These properties make modular arithmetic essential in **hashing** (keep indices
in-bounds), **cryptography** (keep numbers in a finite field), and **checksums**.

## Your task

Implement three functions:
- \`mod_add(a, b, m)\` → \`(a + b) % m\`
- \`mod_sub(a, b, m)\` → \`(a - b) % m\`
- \`mod_mul(a, b, m)\` → \`(a * b) % m\``,
      starterCode: `def mod_add(a, b, m):
    pass

def mod_sub(a, b, m):
    pass

def mod_mul(a, b, m):
    pass
`,
      solution: `def mod_add(a, b, m):
    return (a + b) % m

def mod_sub(a, b, m):
    return (a - b) % m

def mod_mul(a, b, m):
    return (a * b) % m`,
      tests: [
        { name: "mod_add(7, 8, 10) == 5",   code: `assert_equals(mod_add(7, 8, 10), 5)` },
        { name: "mod_add(3, 2, 5) == 0",    code: `assert_equals(mod_add(3, 2, 5), 0)` },
        { name: "mod_sub(3, 7, 10) == 6",   code: `assert_equals(mod_sub(3, 7, 10), 6)` },
        { name: "mod_sub(10, 4, 7) == 6",   code: `assert_equals(mod_sub(10, 4, 7), 6)` },
        { name: "mod_mul(6, 9, 10) == 4",   code: `assert_equals(mod_mul(6, 9, 10), 4)` },
        { name: "mod_mul(3, 4, 5) == 2",    code: `assert_equals(mod_mul(3, 4, 5), 2)` },
      ],
    },

    // ── Lesson 6 ── Modular exponentiation ─────────────────────────────────
    {
      slug: "mod-pow",
      title: "Fast Modular Exponentiation",
      blurb: "Raise huge numbers to huge powers in O(log exp) time.",
      xp: 50,
      content: `# Fast Modular Exponentiation

Computing \`base ** exp % mod\` naively produces astronomically large
intermediate values. **Fast modular exponentiation** (exponentiation by squaring)
keeps numbers small at every step:

\`\`\`
base^13 = base^8 * base^4 * base^1   (13 in binary = 1101)
\`\`\`

Algorithm (iterative):

\`\`\`py
def mod_pow(base, exp, mod):
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:        # current bit is set
            result = result * base % mod
        base = base * base % mod  # square
        exp //= 2               # shift right
    return result
\`\`\`

This runs in **O(log exp)** multiplications and is the backbone of RSA
encryption and the Miller-Rabin primality test.

> Python's built-in \`pow(base, exp, mod)\` uses the same algorithm. Implementing
> it yourself is a rite of passage.

## Your task

Write \`mod_pow(base, exp, mod)\` using the iterative square-and-multiply method
shown above.`,
      starterCode: `def mod_pow(base, exp, mod):
    # implement fast modular exponentiation
    pass
`,
      solution: `def mod_pow(base, exp, mod):
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:
            result = result * base % mod
        base = base * base % mod
        exp //= 2
    return result`,
      tests: [
        { name: "mod_pow(2, 10, 1000) == 24",    code: `assert_equals(mod_pow(2, 10, 1000), 24)` },
        { name: "mod_pow(3, 0, 7) == 1",         code: `assert_equals(mod_pow(3, 0, 7), 1)` },
        { name: "mod_pow(2, 8, 256) == 0",       code: `assert_equals(mod_pow(2, 8, 256), 0)` },
        { name: "mod_pow(5, 3, 13) == 8",        code: `assert_equals(mod_pow(5, 3, 13), 8)` },
        { name: "matches Python pow()",          code: `assert_equals(mod_pow(7, 100, 1000000007), pow(7, 100, 1000000007))` },
      ],
      hints: [
        "Start: result = 1, then reduce base = base % mod before the loop.",
        "Inside the loop: if exp is odd, multiply result by base (mod mod). Then square base and halve exp.",
      ],
      explanation: `Each iteration handles one bit of the exponent. When the bit is 1 we
accumulate the current power of \`base\` into \`result\`. After each step we square
\`base\` (moving to the next power of 2). This needs at most 2 * log2(exp)
multiplications — negligible compared to naive repeated multiplication.`,
    },

    // ── Lesson 7 ── Extended Euclidean algorithm ────────────────────────────
    {
      slug: "extended-gcd",
      title: "Extended Euclidean Algorithm",
      blurb: "Find x and y such that a·x + b·y = gcd(a, b).",
      xp: 50,
      content: `# Extended Euclidean Algorithm

The **extended Euclidean algorithm** finds integers \`x\` and \`y\` (Bézout
coefficients) such that:

> **a·x + b·y = gcd(a, b)**

It runs the same Euclidean steps but tracks how each remainder can be expressed
as a linear combination of the originals:

\`\`\`py
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0              # base: a*1 + b*0 = a
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1
\`\`\`

**Example:** \`extended_gcd(35, 15)\`
- gcd = 5
- coefficients: 35·1 + 15·(-2) = 5  ✓

**Why it matters:**
- Computing **modular inverses**: if \`gcd(a, m) = 1\` then \`x\` is the
  modular inverse of \`a\` mod \`m\` (used in RSA decryption).
- Solving linear Diophantine equations.

## Your task

Write \`extended_gcd(a, b)\` that returns a tuple \`(g, x, y)\` where \`g = gcd(a, b)\`
and \`a*x + b*y == g\`.`,
      starterCode: `def extended_gcd(a, b):
    # return (g, x, y) such that a*x + b*y == g == gcd(a, b)
    pass
`,
      solution: `def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1`,
      tests: [
        {
          name: "gcd(35, 15) == 5",
          code: `g, x, y = extended_gcd(35, 15)\nassert_equals(g, 5)`,
        },
        {
          name: "Bezout identity holds for (35, 15)",
          code: `g, x, y = extended_gcd(35, 15)\nassert_equals(35 * x + 15 * y, g)`,
        },
        {
          name: "gcd(48, 18) == 6",
          code: `g, x, y = extended_gcd(48, 18)\nassert_equals(g, 6)`,
        },
        {
          name: "Bezout identity holds for (48, 18)",
          code: `g, x, y = extended_gcd(48, 18)\nassert_equals(48 * x + 18 * y, g)`,
        },
        {
          name: "extended_gcd(7, 3) gcd == 1",
          code: `g, x, y = extended_gcd(7, 3)\nassert_equals(g, 1)`,
        },
        {
          name: "Bezout identity holds for (7, 3)",
          code: `g, x, y = extended_gcd(7, 3)\nassert_equals(7 * x + 3 * y, g)`,
        },
      ],
      hints: [
        "Base case: when b == 0, return (a, 1, 0) because a*1 + 0*0 = a.",
        "Recursive case: call extended_gcd(b, a % b) to get (g, x1, y1), then return (g, y1, x1 - (a // b) * y1).",
      ],
      explanation: `The recurrence derives from the Euclidean step. If \`b*x1 + (a%b)*y1 = g\`,
substituting \`a%b = a - (a//b)*b\` gives \`a*y1 + b*(x1 - (a//b)*y1) = g\`.
So the new coefficients are \`x = y1\` and \`y = x1 - (a//b)*y1\`.`,
    },

    // ── Lesson 8 ── Quiz: applications ─────────────────────────────────────
    {
      slug: "number-theory-quiz",
      title: "Number Theory in the Wild",
      blurb: "Connect the algorithms to real-world uses: crypto, hashing, interviews.",
      xp: 40,
      kind: "quiz",
      content: `# Number Theory in the Wild

You have now coded the core building blocks. Before moving on, let's check that
you can connect **why** each algorithm matters in real software.

Answer the questions below. Each one maps a number-theory concept to a concrete
programming context.`,
      questions: [
        {
          prompt:
            "RSA encryption encrypts a message `m` as `c = m^e mod n`. Which algorithm computes this efficiently without creating astronomically large intermediate numbers?",
          options: [
            "Sieve of Eratosthenes",
            "Fast modular exponentiation (exponentiation by squaring)",
            "Extended Euclidean algorithm",
            "Trial division prime test",
          ],
          answer: 1,
          explanation:
            "Fast modular exponentiation reduces the problem to O(log e) squarings, keeping every intermediate value below n. The Sieve finds primes but doesn't help with the power. Trial division tests primality. The extended GCD is used for key generation (modular inverse), not encryption.",
        },
        {
          prompt:
            "You need to find the modular inverse of `a` mod `m` (i.e., a number `x` such that `a*x ≡ 1 (mod m)`). Which algorithm provides this directly?",
          options: [
            "Sieve of Eratosthenes",
            "Euclidean GCD",
            "Extended Euclidean algorithm",
            "Fast modular exponentiation",
          ],
          answer: 2,
          explanation:
            "The extended GCD returns Bézout coefficients x, y such that a*x + m*y = gcd(a, m). When gcd(a, m) = 1, x is the modular inverse of a mod m. The plain Euclidean GCD only returns the GCD value, not the coefficients.",
        },
        {
          prompt:
            "A hash table of size `m` maps a key `k` to a bucket using `k % m`. Why should `m` be a prime number?",
          options: [
            "Prime numbers are faster to compute modulo.",
            "A prime modulus reduces clustering — it avoids patterns where many keys share the same GCD with m, spreading entries more uniformly.",
            "Only prime moduli allow the Sieve to run correctly.",
            "Composite moduli cause integer overflow.",
          ],
          answer: 1,
          explanation:
            "When m is prime, the only common divisor between m and any key k (not a multiple of m) is 1. This prevents systematic collisions that happen when many keys share a factor with m. Composite moduli create collision hot-spots for keys that are multiples of m's factors.",
        },
        {
          prompt:
            "You want to find all prime numbers up to 1,000,000 as quickly as possible. What is the best approach?",
          options: [
            "Call is_prime(n) for every n from 2 to 1,000,000 — O(n√n) total.",
            "Use the Sieve of Eratosthenes — O(n log log n) total.",
            "Use the extended GCD on each number.",
            "Use fast modular exponentiation to check Fermat's little theorem for each n.",
          ],
          answer: 1,
          explanation:
            "The Sieve marks composites in bulk and runs in O(n log log n) — for n = 1,000,000 that's roughly 4 million operations. Calling is_prime individually is O(n√n) ≈ 10^9 operations. The extended GCD and modular exponentiation are powerful but not designed for bulk prime generation.",
        },
        {
          prompt:
            "Two buses leave a station. Bus A comes every 8 minutes, Bus B every 12 minutes. How many minutes until they depart together again?",
          options: [
            "4 minutes (GCD of 8 and 12)",
            "24 minutes (LCM of 8 and 12)",
            "96 minutes (8 × 12)",
            "20 minutes (8 + 12)",
          ],
          answer: 1,
          explanation:
            "You want the *least common multiple* — the smallest time that is a multiple of both 8 and 12. LCM(8, 12) = 8 * 12 / GCD(8, 12) = 96 / 4 = 24. The GCD (4) is the largest time that evenly divides both periods, not the meeting time.",
        },
      ],
    },
  ],
};
