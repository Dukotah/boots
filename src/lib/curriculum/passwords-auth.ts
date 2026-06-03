import type { Module } from "./types";

// Passwords, Encryption & Auth — the everyday cryptography developers must get
// right: password strength, why we hash (never store) passwords, symmetric
// encryption as a reversible-with-a-key idea, session expiry, and MFA. Mix of
// runnable JS exercises and conceptual quizzes.
export const passwordsAuth: Module = {
  slug: "passwords-auth",
  title: "Passwords, Encryption & Auth",
  description:
    "Get authentication right: score password strength, understand hashing vs. encryption, see symmetric encryption in action, handle session expiry, and use MFA.",
  emoji: "🔐",
  gradient: "from-amber-500/20 to-rose-500/10",
  tagline:
    "Learn password security, hashing vs. encryption, symmetric ciphers, session expiry, and multi-factor authentication.",
  keywords: [
    "password security",
    "hashing vs encryption",
    "how password hashing works",
    "multi-factor authentication",
    "auth basics",
  ],
  lessons: [
    {
      slug: "password-strength",
      title: "Score Password Strength",
      blurb: "Length and variety make a password hard to crack.",
      xp: 30,
      content: `# Score Password Strength

What makes a password strong? Mostly **length**, plus a **mix of character
types**. Attackers guess short, simple passwords first, so a long passphrase with
variety is far harder to crack.

Let's score by counting categories present: lowercase, uppercase, digit, and
symbol — then factor in length.

## Your task
Write \`strength(pw)\` that returns:
- \`"weak"\` if the password is shorter than 8 characters,
- \`"strong"\` if it's at least 12 characters **and** contains a lowercase letter,
  an uppercase letter, and a digit,
- \`"medium"\` otherwise.`,
      starterCode: `function strength(pw) {
  // "weak" if < 8 chars
  // "strong" if >= 12 chars AND has lower, upper, and a digit
  // "medium" otherwise
}
`,
      solution: `function strength(pw) {
  if (pw.length < 8) return "weak";
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  if (pw.length >= 12 && hasLower && hasUpper && hasDigit) return "strong";
  return "medium";
}`,
      tests: [
        { name: '"abc" → weak', code: `assertEquals(strength("abc"), "weak");` },
        { name: '"password" → medium', code: `assertEquals(strength("password"), "medium");` },
        {
          name: '"CorrectHorse9" → strong',
          code: `assertEquals(strength("CorrectHorse9"), "strong");`,
        },
        {
          name: 'long but all lowercase → medium',
          code: `assertEquals(strength("aaaaaaaaaaaa"), "medium");`,
        },
      ],
      hints: [
        "Check `pw.length < 8` first and return early.",
        "Use small regexes like `/[A-Z]/.test(pw)` to detect each character type.",
      ],
      explanation:
        "Real strength meters (like zxcvbn) are smarter, but the principle holds: length dominates, and variety helps. A long passphrase beats a short 'P@ss1' every time.",
    },
    {
      slug: "hash-dont-store",
      title: "Hash It, Never Store It",
      blurb: "Databases should never hold your actual password.",
      xp: 25,
      kind: "quiz",
      content: `# Hash It, Never Store It

A golden rule: a service should **never store your actual password.** Instead it
stores a **hash** — the output of a one-way function. When you log in, the site
hashes what you typed and compares hashes. If the database leaks, attackers get
hashes, not your real password.

Two more essentials:
- **One-way**: a good password hash (bcrypt, scrypt, Argon2) can't be reversed
  back into the password.
- **Salt**: a random value added per-user before hashing, so two people with the
  same password get different hashes — and precomputed "rainbow table" attacks
  fail.

This is different from encryption: encryption is **reversible** (you can decrypt
with a key); hashing a password is **not meant to be reversible** at all.

**Things to remember:**
- Store a **salted hash**, never the plaintext password
- Good password hashes are **one-way** (can't be reversed)
- A **salt** makes identical passwords hash differently`,
      questions: [
        {
          prompt: "A well-built site stores your password as:",
          options: [
            "The plaintext password, so it can email it back to you",
            "A salted one-way hash, never the plaintext",
            "An encrypted copy it can decrypt anytime",
          ],
          answer: 1,
          explanation:
            "Passwords are stored as salted hashes. If a site can email you your original password, that's a serious red flag.",
        },
        {
          prompt: "What does adding a unique 'salt' to each password before hashing achieve?",
          options: [
            "It makes the password taste better",
            "Identical passwords get different hashes, defeating precomputed (rainbow table) attacks",
            "It lets the server decrypt the password later",
          ],
          answer: 1,
          explanation:
            "Per-user salts mean two users with the same password produce different hashes, breaking rainbow-table lookups.",
        },
        {
          prompt: "The key difference between hashing a password and encrypting it is:",
          options: [
            "Hashing is reversible; encryption is not",
            "Password hashing is meant to be one-way (irreversible); encryption is reversible with a key",
            "They are exactly the same",
          ],
          answer: 1,
          explanation:
            "Encryption is reversible with a key; password hashing is intentionally one-way so a leak doesn't reveal the password.",
        },
      ],
    },
    {
      slug: "caesar-cipher",
      title: "Symmetric Encryption (Caesar)",
      blurb: "A reversible cipher: same key locks and unlocks.",
      xp: 35,
      content: `# Symmetric Encryption (Caesar)

Unlike hashing, **encryption is reversible**: with the **key** you can get the
original back. The Caesar cipher is the simplest example — shift each letter
forward by \`key\` positions to encrypt, and the same key reverses it.

(It's trivially breakable, so it's a *teaching* tool, not real security — but it
shows the core idea of symmetric encryption: one shared key, both directions.)

## Your task
Write \`caesar(text, shift)\` that shifts each **lowercase letter** \`a\`–\`z\`
forward by \`shift\` positions, wrapping around (\`z\` + 1 → \`a\`). Leave any other
character unchanged.`,
      starterCode: `function caesar(text, shift) {
  // shift each a-z letter forward by \`shift\`, wrapping z -> a
}
`,
      solution: `function caesar(text, shift) {
  let out = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      out += String.fromCharCode(((code - 97 + shift) % 26) + 97);
    } else {
      out += ch;
    }
  }
  return out;
}`,
      tests: [
        { name: '"abc" shift 1 → "bcd"', code: `assertEquals(caesar("abc", 1), "bcd");` },
        { name: 'wraps z → a', code: `assertEquals(caesar("xyz", 3), "abc");` },
        {
          name: "leaves spaces/symbols alone",
          code: `assertEquals(caesar("hi there!", 1), "ij uifsf!");`,
        },
      ],
      hints: [
        "Letter codes: `a` is 97, `z` is 122. Use `charCodeAt(0)` and `String.fromCharCode`.",
        "Wrap with modulo: `(code - 97 + shift) % 26 + 97`.",
      ],
      explanation:
        "Caesar captures the essence of symmetric encryption: the same key transforms and reverses. Decrypting is just `caesar(cipher, 26 - shift)`. Real ciphers (AES) use the same one-shared-key idea with vastly stronger math.",
    },
    {
      slug: "session-expiry",
      title: "Expire the Session",
      blurb: "Logins shouldn't last forever — check the clock.",
      xp: 35,
      content: `# Expire the Session

After you log in, the server gives you a **session token** that's valid for a
limited time (its **TTL**, time-to-live). Expiring sessions limits the damage if
a token is ever stolen. The check is simple time arithmetic.

## Your task
Write \`isExpired(issuedAt, ttl, now)\` (all in seconds). The session is expired
when \`now\` is **at or after** \`issuedAt + ttl\`. Return \`true\` if expired,
\`false\` otherwise.`,
      starterCode: `function isExpired(issuedAt, ttl, now) {
  // expired when now >= issuedAt + ttl
}
`,
      solution: `function isExpired(issuedAt, ttl, now) {
  return now >= issuedAt + ttl;
}`,
      tests: [
        {
          name: "still valid",
          code: `assertEquals(isExpired(1000, 3600, 2000), false);`,
        },
        {
          name: "exactly at expiry → expired",
          code: `assertEquals(isExpired(1000, 3600, 4600), true);`,
        },
        {
          name: "well past expiry",
          code: `assertEquals(isExpired(0, 60, 999), true);`,
        },
      ],
      hints: [
        "Add the lifetime to the issue time: `issuedAt + ttl`.",
        "Use `>=` so the exact expiry moment counts as expired.",
      ],
      explanation:
        "Short-lived tokens are a cheap, powerful defense: even a stolen session stops working soon. This is why 'remember me' and banking sessions have very different TTLs.",
    },
    {
      slug: "multi-factor",
      title: "Multi-Factor Authentication",
      blurb: "Something you know, plus something you have.",
      xp: 30,
      kind: "quiz",
      content: `# Multi-Factor Authentication

A password is **one factor** — *something you know*. **Multi-factor
authentication (MFA / 2FA)** adds a second, different kind of factor so a stolen
password alone isn't enough:

- **Something you know** — a password or PIN
- **Something you have** — a phone app code, a hardware key, a passkey
- **Something you are** — a fingerprint or face scan

The factors must be **different types**. Two passwords aren't MFA. The strongest
common options are **authenticator apps**, **hardware security keys**, and
**passkeys** — all far better than SMS codes, which can be intercepted or
SIM-swapped.

And remember the rule from the scams course: a real service will **never** ask
you to read your one-time code to someone. That code is the second factor —
sharing it hands over your account.

**Things to remember:**
- MFA combines **different factor types** (know / have / are)
- Two passwords are **not** MFA
- **Authenticator apps, passkeys, and hardware keys** beat SMS codes`,
      questions: [
        {
          prompt: "Which pair is true multi-factor authentication?",
          options: [
            "A password and a security question (both 'something you know')",
            "A password plus a one-time code from an authenticator app",
            "Two different passwords",
          ],
          answer: 1,
          explanation:
            "MFA needs different factor types. A password (know) + app code (have) qualifies; two things-you-know do not.",
        },
        {
          prompt: "Among common second factors, which is generally the weakest?",
          options: [
            "A hardware security key",
            "An SMS text code (can be intercepted or SIM-swapped)",
            "A passkey",
          ],
          answer: 1,
          explanation:
            "SMS is better than nothing but vulnerable to interception and SIM-swap attacks. Apps, passkeys, and hardware keys are stronger.",
        },
        {
          prompt: "Someone calls claiming to be support and asks you to read the 6-digit code your app just generated. You should:",
          options: [
            "Read it — they need it to verify you",
            "Refuse — that code is your second factor and no real service asks for it",
            "Read only the first three digits",
          ],
          answer: 1,
          explanation:
            "A one-time code is the second factor. Sharing it lets an attacker complete a login. No legitimate service asks you to read it aloud.",
        },
      ],
    },
  ],
};
