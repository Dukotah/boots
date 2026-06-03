import type { Module } from "./types";

// Web Security Basics — the two classic web vulns (XSS, SQL injection) explained
// from the DEFENDER'S side: escape output, parameterize queries, validate input
// with allowlists, and lock down transport/cookies. Code lessons teach the fix,
// not the exploit; quizzes cover the concepts.
export const webSecurity: Module = {
  slug: "web-security",
  title: "Web Security Basics",
  description:
    "Understand the web's classic vulnerabilities — XSS and SQL injection — and write the defenses: escape output, parameterize queries, validate input, and secure cookies.",
  emoji: "🧱",
  gradient: "from-red-500/20 to-orange-500/10",
  tagline:
    "Learn web security basics: prevent XSS by escaping output, stop SQL injection with parameterized queries, validate input, and secure cookies.",
  keywords: [
    "web security basics",
    "prevent xss",
    "sql injection explained",
    "input validation",
    "secure cookies",
  ],
  lessons: [
    {
      slug: "escape-html",
      title: "Escape Output to Stop XSS",
      blurb: "Render user text as text — never as live HTML.",
      xp: 35,
      content: `# Escape Output to Stop XSS

**Cross-Site Scripting (XSS)** happens when a site takes user input and drops it
straight into the page as HTML. If someone types \`<script>...</script>\` and the
site renders it raw, that script runs in other users' browsers.

The defense is **output escaping**: convert the characters that have special
meaning in HTML into harmless entities, so the browser shows them as plain text
instead of running them.

| char | becomes |
|------|---------|
| \`&\`  | \`&amp;\` |
| \`<\`  | \`&lt;\`  |
| \`>\`  | \`&gt;\`  |

## Your task
Write \`escapeHtml(text)\` that replaces \`&\` → \`&amp;\`, \`<\` → \`&lt;\`, and
\`>\` → \`&gt;\`. Replace \`&\` **first** so you don't double-escape the others.`,
      starterCode: `function escapeHtml(text) {
  // replace & first, then < and >
}
`,
      solution: `function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}`,
      tests: [
        {
          name: "neutralizes a script tag",
          code: `assertEquals(escapeHtml("<script>x</script>"), "&lt;script&gt;x&lt;/script&gt;");`,
        },
        {
          name: "escapes ampersand first",
          code: `assertEquals(escapeHtml("Tom & Jerry"), "Tom &amp; Jerry");`,
        },
        {
          name: "plain text untouched",
          code: `assertEquals(escapeHtml("hello world"), "hello world");`,
        },
      ],
      hints: [
        "Chain three `.replace(/.../g, ...)` calls.",
        "Do `&` → `&amp;` first, otherwise you'd turn the `&` in `&lt;` into `&amp;lt;`.",
      ],
      explanation:
        "Escaping on output is the core XSS defense: the browser displays `<script>` as visible text instead of executing it. Modern frameworks (React, etc.) escape by default — bypassing that (e.g. dangerouslySetInnerHTML) is where XSS sneaks back in.",
    },
    {
      slug: "xss-explained",
      title: "Where XSS Comes From",
      blurb: "Untrusted input + raw rendering = trouble.",
      xp: 25,
      kind: "quiz",
      content: `# Where XSS Comes From

XSS isn't magic — it's a chain: **untrusted input** flows into the page and gets
**rendered as code** instead of data. A comment box, a username, a URL parameter,
a search term — any of these can carry a script if the site renders them raw.

The impact is serious: an injected script runs with the **victim's** session, so
it can steal cookies, perform actions as them, or deface the page. And it's not
just \`<script>\` — event handlers (\`onerror=...\`) and \`javascript:\` URLs can
trigger it too.

Defenses, in order:
1. **Escape on output** (the previous lesson) — context-appropriate encoding.
2. Let your **framework** auto-escape; avoid "raw HTML" escape hatches.
3. Add a **Content-Security-Policy** header as a backstop.

**Things to remember:**
- XSS = untrusted input **rendered as code** in someone's browser
- It runs with the **victim's** privileges (their session, their cookies)
- Defend by **escaping output** and trusting your framework's auto-escaping`,
      questions: [
        {
          prompt: "XSS becomes possible when a site:",
          options: [
            "Stores passwords as hashes",
            "Renders untrusted user input as raw HTML/JavaScript instead of plain text",
            "Uses HTTPS",
          ],
          answer: 1,
          explanation:
            "The vulnerability is rendering untrusted input as executable code rather than escaping it as data.",
        },
        {
          prompt: "Why is an injected XSS script dangerous?",
          options: [
            "It slows the page down",
            "It runs in the victim's browser with their session — it can steal cookies or act as them",
            "It only affects the attacker's own browser",
          ],
          answer: 1,
          explanation:
            "The script executes with the victim's privileges, enabling cookie theft and actions performed as that user.",
        },
        {
          prompt: "A strong primary defense against XSS is:",
          options: [
            "Escaping/encoding output and relying on framework auto-escaping",
            "Making the page load faster",
            "Hiding the comment box with CSS",
          ],
          answer: 0,
          explanation:
            "Context-aware output escaping (plus framework auto-escaping and a CSP backstop) is the core defense.",
        },
      ],
    },
    {
      slug: "parameterized-queries",
      title: "Parameterize to Stop SQL Injection",
      blurb: "Keep data out of the query string — pass it separately.",
      xp: 40,
      content: `# Parameterize to Stop SQL Injection

**SQL injection** happens when user input is glued directly into a SQL string.
Build a query like \`"SELECT * FROM users WHERE name = '" + input + "'"\` and a
crafted input can change what the query *does*.

The fix is **parameterized queries** (a.k.a. prepared statements): you write the
SQL with **placeholders** and pass the values **separately**. The database treats
those values strictly as data — never as SQL — so they can't alter the query.

## Your task
Instead of concatenating, build a query object. Write \`buildQuery(name)\` that
returns:

\`\`\`js
{ text: "SELECT * FROM users WHERE name = $1", params: [name] }
\`\`\`

The value goes in \`params\`, never inside \`text\`.`,
      starterCode: `function buildQuery(name) {
  // return { text: "SELECT * FROM users WHERE name = $1", params: [name] }
}
`,
      solution: `function buildQuery(name) {
  return { text: "SELECT * FROM users WHERE name = $1", params: [name] };
}`,
      tests: [
        {
          name: "keeps the value in params",
          code: `assertEquals(buildQuery("alice"), { text: "SELECT * FROM users WHERE name = $1", params: ["alice"] });`,
        },
        {
          name: "even malicious input stays data",
          code: `assertEquals(buildQuery("' OR 1=1 --"), { text: "SELECT * FROM users WHERE name = $1", params: ["' OR 1=1 --"] });`,
        },
      ],
      hints: [
        "The SQL `text` is a fixed string with a `$1` placeholder — the input never goes inside it.",
        "Put the value in the `params` array instead.",
      ],
      explanation:
        "Notice the second test: even a classic injection string is harmless because it lands in `params` as pure data, never parsed as SQL. Parameterizing — not 'sanitizing strings yourself' — is the real fix.",
    },
    {
      slug: "sql-injection-explained",
      title: "Why SQL Injection Works",
      blurb: "The database can't tell your data from your commands.",
      xp: 25,
      kind: "quiz",
      content: `# Why SQL Injection Works

The root cause of SQL injection is **mixing code and data**. When you concatenate
user input into a query string, the database parser can no longer tell where your
*command* ends and the *user's data* begins. A value like \`' OR '1'='1\` can flip
a \`WHERE\` clause to always-true, and worse inputs can read or destroy whole
tables.

Trying to fix it by **blacklisting bad characters** is a losing game — there are
too many encodings and edge cases. The reliable fix is **parameterized queries**,
which keep data in a separate channel the parser never treats as SQL. ORMs and
query builders do this for you.

**Things to remember:**
- SQL injection comes from **mixing user data into the query string**
- **Blacklisting characters** is fragile and keeps getting bypassed
- **Parameterized queries / prepared statements** are the dependable fix`,
      questions: [
        {
          prompt: "The fundamental cause of SQL injection is:",
          options: [
            "Using a slow database",
            "Mixing untrusted data into the SQL command so the parser can't separate code from data",
            "Having too many tables",
          ],
          answer: 1,
          explanation:
            "When data is concatenated into the query text, the parser can't tell command from input — that's the whole vulnerability.",
        },
        {
          prompt: "Trying to block SQL injection by filtering out 'bad characters' is:",
          options: [
            "The recommended best practice",
            "Fragile — attackers find encodings and edge cases that slip past blacklists",
            "Impossible to bypass",
          ],
          answer: 1,
          explanation:
            "Blacklist filtering is brittle and routinely bypassed. Parameterized queries address the root cause instead.",
        },
        {
          prompt: "The dependable defense against SQL injection is:",
          options: [
            "Parameterized queries / prepared statements (or an ORM that uses them)",
            "Hiding the database server",
            "Renaming your tables",
          ],
          answer: 0,
          explanation:
            "Parameterization keeps values in a data channel the parser never executes as SQL — the real, reliable fix.",
        },
      ],
    },
    {
      slug: "validate-input",
      title: "Validate with an Allowlist",
      blurb: "Accept only what you expect; reject the rest.",
      xp: 35,
      content: `# Validate with an Allowlist

Defense in depth means also **validating input** at the edge. The robust approach
is an **allowlist** (whitelist): define exactly what's valid and reject anything
else — the opposite of trying to list everything that's bad (a blocklist), which
always misses cases.

## Your task
Write \`isValidUsername(name)\` that returns \`true\` only when \`name\` is 3–16
characters long and contains **only** letters, digits, and underscores.`,
      starterCode: `function isValidUsername(name) {
  // true only if 3-16 chars of [a-zA-Z0-9_]
}
`,
      solution: `function isValidUsername(name) {
  return /^[a-zA-Z0-9_]{3,16}$/.test(name);
}`,
      tests: [
        { name: "valid name", code: `assertEquals(isValidUsername("dukotah_99"), true);` },
        { name: "too short", code: `assertEquals(isValidUsername("ab"), false);` },
        {
          name: "rejects symbols/spaces",
          code: `assertEquals(isValidUsername("bad name!"), false);`,
        },
        {
          name: "rejects injection-looking input",
          code: `assertEquals(isValidUsername("'; DROP TABLE"), false);`,
        },
      ],
      hints: [
        "Anchor the regex with `^` and `$` so the *whole* string must match.",
        "`[a-zA-Z0-9_]{3,16}` allows only those characters, 3 to 16 of them.",
      ],
      explanation:
        "Allowlisting is stronger than blocklisting because you specify the small set of valid input instead of chasing an endless set of bad input. It's validation — a complement to (never a replacement for) escaping and parameterizing.",
    },
    {
      slug: "https-and-cookies",
      title: "Lock Down Transport & Cookies",
      blurb: "HTTPS in transit, and cookies that scripts and snoops can't grab.",
      xp: 30,
      kind: "quiz",
      content: `# Lock Down Transport & Cookies

Two everyday protections wrap almost every web app:

**HTTPS (TLS)** encrypts data **in transit** so someone on the same Wi-Fi can't
read or tamper with it. Login pages and anything with personal data must use it —
the padlock means the connection is encrypted, *not* that the site is honest.

**Cookie flags** protect the session cookie that proves you're logged in:
- \`HttpOnly\` — JavaScript can't read the cookie, blunting cookie theft via XSS.
- \`Secure\` — the cookie is only sent over HTTPS, never plain HTTP.
- \`SameSite\` — limits sending the cookie on cross-site requests, helping against
  CSRF (tricking your browser into acting on a site where you're logged in).

**Things to remember:**
- **HTTPS/TLS** protects data **in transit**; the padlock ≠ "trustworthy site"
- **HttpOnly** cookies can't be read by JavaScript (limits XSS damage)
- **Secure** + **SameSite** flags harden the session cookie further`,
      questions: [
        {
          prompt: "What does HTTPS (TLS) actually protect?",
          options: [
            "It guarantees the website is honest and safe",
            "It encrypts data in transit so eavesdroppers can't read or tamper with it",
            "It stops all viruses",
          ],
          answer: 1,
          explanation:
            "HTTPS secures the connection (data in transit). A padlock means encrypted transport — not that the site itself is trustworthy.",
        },
        {
          prompt: "Marking a session cookie 'HttpOnly' helps because:",
          options: [
            "It makes the cookie load faster",
            "JavaScript can't read it, so an XSS script can't easily steal the session",
            "It encrypts the whole database",
          ],
          answer: 1,
          explanation:
            "HttpOnly keeps the cookie out of reach of page scripts, limiting how much damage an XSS bug can do.",
        },
        {
          prompt: "The 'Secure' cookie flag ensures the cookie is:",
          options: [
            "Only sent over HTTPS, never plain HTTP",
            "Stored forever",
            "Visible to every website",
          ],
          answer: 0,
          explanation:
            "Secure cookies are only transmitted over encrypted HTTPS connections, never in the clear over HTTP.",
        },
      ],
    },
  ],
};
