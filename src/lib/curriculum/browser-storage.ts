import type { Module } from "./types";

// Browser Storage & Auth Tokens — cookies vs localStorage vs sessionStorage,
// HttpOnly, SameSite, XSS/CSRF exposure. Auto-graded in-browser via Web Worker.
export const browserStorage: Module = {
  slug: "browser-storage",
  title: "Browser Storage & Auth Tokens",
  description:
    "Master the client-side storage decision: when to use cookies vs localStorage vs sessionStorage, how HttpOnly and SameSite flags protect against XSS/CSRF attacks, and how real auth token flows work in production apps.",
  emoji: "🍪",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline:
    "Learn browser storage security: cookies vs localStorage vs sessionStorage, HttpOnly, SameSite, XSS, CSRF, and auth token best practices.",
  keywords: [
    "browser storage",
    "cookies vs localStorage",
    "HttpOnly cookie",
    "SameSite cookie",
    "XSS CSRF prevention",
    "auth tokens browser",
    "sessionStorage",
    "web security interview",
  ],
  language: "js",
  lessons: [
    {
      slug: "storage-overview",
      title: "The Three Browser Storages",
      blurb: "localStorage, sessionStorage, and cookies — what each one is for.",
      xp: 20,
      kind: "quiz",
      content: `# The Three Browser Storages

The browser gives you three places to persist data on the client:

| Storage | Persists until | Scope | Sent with requests? |
|---|---|---|---|
| \`localStorage\` | Manually cleared | Origin (scheme+host+port) | No |
| \`sessionStorage\` | Tab/window closed | Origin + tab | No |
| \`cookie\` | Expiry date (or session) | Configurable domain/path | Yes — automatically |

**The critical difference**: cookies are automatically included in every HTTP
request to their domain. localStorage and sessionStorage are never sent
automatically — you have to read them in JS and add them yourself (e.g., as a
header).

This single difference drives most of the security tradeoffs you'll face.

## Key terms
- **Origin** — the combination of scheme (\`https\`), host (\`example.com\`), and
  port (\`443\`). Two pages with the same origin can share storage.
- **Session** — in cookie context, "session cookie" means it expires when the
  browser closes (no \`Expires\`/\`Max-Age\` attribute set).`,
      questions: [
        {
          prompt:
            "Which storage mechanism is automatically attached to every HTTP request to its domain?",
          options: ["localStorage", "sessionStorage", "Cookies"],
          answer: 2,
          explanation:
            "Cookies are sent by the browser with every matching request. localStorage and sessionStorage are never sent automatically — you must read them in JavaScript and attach them manually (e.g., as an Authorization header).",
        },
        {
          prompt:
            "A user has data in sessionStorage. They open a new tab to the same site. Can the new tab read that data?",
          options: [
            "Yes — sessionStorage is shared across all tabs for the same origin",
            "No — sessionStorage is scoped to the individual tab/window",
            "Only if both tabs use HTTPS",
          ],
          answer: 1,
          explanation:
            "sessionStorage is per-tab. Each tab gets its own isolated sessionStorage, even for the same origin. localStorage, by contrast, is shared across all tabs of the same origin.",
        },
        {
          prompt:
            "A cookie with no Expires or Max-Age attribute is called a…",
          options: [
            "Persistent cookie",
            "Session cookie",
            "Secure cookie",
          ],
          answer: 1,
          explanation:
            "Without an expiry time, a cookie is a 'session cookie' — it lives only until the browser is closed. Persistent cookies have an explicit Expires or Max-Age.",
        },
      ],
    },
    {
      slug: "localstorage-basics",
      title: "localStorage — Read, Write, Delete",
      blurb: "Persist key-value strings across page loads with the Storage API.",
      xp: 25,
      content: `# localStorage — Read, Write, Delete

\`localStorage\` is synchronous, string-based key-value storage scoped to an
origin. It survives page refreshes, tab closes, and browser restarts until
explicitly cleared.

\`\`\`js
// Write
localStorage.setItem("theme", "dark");

// Read (returns null if missing)
const theme = localStorage.getItem("theme"); // "dark"

// Delete one key
localStorage.removeItem("theme");

// Delete everything for this origin
localStorage.clear();
\`\`\`

**Everything is a string.** To store objects, \`JSON.stringify\` on the way in
and \`JSON.parse\` on the way out.

## Your task
Write a function \`savePrefs(prefs)\` that serialises a \`prefs\` object and saves
it under the key \`"prefs"\` in localStorage.
Then write \`loadPrefs()\` that reads and deserialises it, returning \`null\` if
nothing is stored.`,
      starterCode: `function savePrefs(prefs) {
  // serialise prefs and store under "prefs"
}

function loadPrefs() {
  // read and deserialise; return null if missing
}
`,
      solution: `function savePrefs(prefs) {
  localStorage.setItem("prefs", JSON.stringify(prefs));
}

function loadPrefs() {
  const raw = localStorage.getItem("prefs");
  if (raw === null) return null;
  return JSON.parse(raw);
}`,
      tests: [
        {
          name: "savePrefs stores serialised object",
          code: `globalThis.localStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
savePrefs({ theme: "dark", lang: "en" });
const raw = localStorage.getItem("prefs");
assertEquals(raw, JSON.stringify({ theme: "dark", lang: "en" }));`,
        },
        {
          name: "loadPrefs returns parsed object",
          code: `globalThis.localStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
savePrefs({ fontSize: 16 });
const result = loadPrefs();
assertEquals(result.fontSize, 16);`,
        },
        {
          name: "loadPrefs returns null when nothing stored",
          code: `globalThis.localStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
assertEquals(loadPrefs(), null);`,
        },
      ],
      hints: [
        "Use JSON.stringify(prefs) to convert the object to a string before setItem.",
        "JSON.parse(raw) converts the string back to an object. But check for null first — getItem returns null when the key doesn't exist.",
      ],
    },
    {
      slug: "sessionstorage-scope",
      title: "sessionStorage — Tab-Scoped Scratch Pad",
      blurb: "Store temporary state that vanishes when the tab closes.",
      xp: 25,
      content: `# sessionStorage — Tab-Scoped Scratch Pad

\`sessionStorage\` has the **same API** as \`localStorage\` but a shorter
lifetime: it disappears when the tab (or window) is closed.

\`\`\`js
sessionStorage.setItem("wizard-step", "2");
const step = sessionStorage.getItem("wizard-step"); // "2"
sessionStorage.removeItem("wizard-step");
\`\`\`

**Good fit for:**
- Multi-step form progress within one session
- Temporary UI state (scroll position, expanded panels)
- One-time data that must not bleed into another session

**Bad fit for:**
- Anything that needs to survive a tab close (use localStorage)
- Auth tokens — if the user closes and reopens the tab they'd be logged out

## Your task
Write a function \`trackStep(step)\` that stores the current wizard step number
(as a string) under the key \`"step"\` in **sessionStorage**.
Write \`getStep()\` that returns the stored step number as an **integer**, or
\`1\` if nothing is stored yet.`,
      starterCode: `function trackStep(step) {
  // store step in sessionStorage under "step"
}

function getStep() {
  // return stored step as integer, default 1
}
`,
      solution: `function trackStep(step) {
  sessionStorage.setItem("step", String(step));
}

function getStep() {
  const val = sessionStorage.getItem("step");
  if (val === null) return 1;
  return parseInt(val, 10);
}`,
      tests: [
        {
          name: "trackStep stores the step",
          code: `globalThis.sessionStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
trackStep(3);
assertEquals(sessionStorage.getItem("step"), "3");`,
        },
        {
          name: "getStep returns stored step as integer",
          code: `globalThis.sessionStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
trackStep(5);
assertEquals(getStep(), 5);`,
        },
        {
          name: "getStep defaults to 1 when nothing stored",
          code: `globalThis.sessionStorage = { _m: new Map(), getItem(k){ return this._m.has(k) ? this._m.get(k) : null; }, setItem(k,v){ this._m.set(k, String(v)); }, removeItem(k){ this._m.delete(k); }, clear(){ this._m.clear(); } };
assertEquals(getStep(), 1);`,
        },
      ],
      hints: [
        "sessionStorage.setItem requires a string. Use String(step) or Template literal to coerce the number.",
        "parseInt(val, 10) converts the stored string back to an integer. The second argument (10) ensures base-10 parsing.",
      ],
    },
    {
      slug: "cookie-attributes",
      title: "Cookie Security Attributes",
      blurb: "HttpOnly, Secure, SameSite — three flags that block major attacks.",
      xp: 35,
      kind: "quiz",
      content: `# Cookie Security Attributes

Cookies carry three flags that dramatically change their security posture:

## HttpOnly
\`\`\`
Set-Cookie: token=abc123; HttpOnly
\`\`\`
JavaScript **cannot read** this cookie. \`document.cookie\` will not include it.
This is the single most important defence against **XSS** stealing auth tokens —
even if an attacker injects a script, they cannot exfiltrate an HttpOnly cookie.

## Secure
\`\`\`
Set-Cookie: token=abc123; Secure
\`\`\`
The cookie is **only sent over HTTPS**. Prevents it travelling in plaintext over
an HTTP connection. Always set this for any sensitive cookie in production.

## SameSite
Controls when the browser sends the cookie with **cross-site** requests:

| Value | Behaviour |
|---|---|
| \`Strict\` | Never sent cross-site. Best protection, can break OAuth flows. |
| \`Lax\` | Sent on top-level navigations (e.g., clicking a link). Default in modern browsers. |
| \`None\` | Always sent. **Must also set \`Secure\`**. Required for embedded iframes. |

\`SameSite=Lax\` or \`Strict\` blocks most **CSRF** attacks because the forged
request from attacker.com won't carry the cookie.

## The gold standard for auth cookies
\`\`\`
Set-Cookie: token=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
\`\`\``,
      questions: [
        {
          prompt:
            "Which cookie attribute prevents JavaScript from reading the cookie value?",
          options: ["Secure", "SameSite=Strict", "HttpOnly"],
          answer: 2,
          explanation:
            "HttpOnly makes the cookie invisible to document.cookie and any JavaScript. This prevents XSS scripts from stealing the token even if they run on the page.",
        },
        {
          prompt:
            "A bank sets its session cookie with SameSite=Lax. A user visits evil.com which silently POSTs a form to bank.com. Will the session cookie be sent?",
          options: [
            "Yes — SameSite=Lax sends the cookie with all cross-site requests",
            "No — SameSite=Lax only sends the cookie on top-level navigations, not cross-site form POSTs",
            "Only if Secure is also set",
          ],
          answer: 1,
          explanation:
            "SameSite=Lax blocks the cookie on cross-site sub-resource requests (like background form POSTs or AJAX). It only allows it on top-level navigations (e.g., the user clicking a link that lands them on bank.com). This blocks the classic CSRF scenario.",
        },
        {
          prompt:
            "You need a cookie visible to JavaScript (so a third-party widget embedded in an iframe can read it). Which SameSite value must you use?",
          options: ["Lax", "Strict", "None (and also add Secure)"],
          answer: 2,
          explanation:
            "SameSite=None allows the cookie in cross-site contexts including iframes. Browsers require the Secure flag to be present whenever SameSite=None is set — they will reject the cookie otherwise.",
        },
      ],
    },
    {
      slug: "parse-cookie-string",
      title: "Parsing Cookie Strings",
      blurb: "Read individual cookies out of document.cookie in plain JS.",
      xp: 30,
      content: `# Parsing Cookie Strings

\`document.cookie\` returns a single string of all **non-HttpOnly** cookies as
semicolon-separated \`name=value\` pairs:

\`\`\`js
// document.cookie might look like:
"theme=dark; lang=en; visited=true"
\`\`\`

To read one cookie by name you must split and search manually
(the browser provides no \`getCookie(name)\` helper):

\`\`\`js
function getCookie(name) {
  const pairs = document.cookie.split("; ");
  for (const pair of pairs) {
    const [key, val] = pair.split("=");
    if (key === name) return val;
  }
  return null;
}
\`\`\`

Note: values can contain \`=\` characters (e.g. base64), so use
\`pair.split("=", 2)\` with a limit or use \`indexOf\` to split only on the first
\`=\`.

## Your task
Write \`parseCookies(cookieStr)\` that takes a raw cookie string (the format
returned by \`document.cookie\`) and returns a plain object mapping each cookie
name to its value.

Example: \`"a=1; b=2; c=3"\` → \`{ a: "1", b: "2", c: "3" }\`

Values may contain \`=\` — split only on the **first** \`=\` in each pair.`,
      starterCode: `function parseCookies(cookieStr) {
  // parse "name=value; name2=value2" into { name: "value", name2: "value2" }
  // remember: values can contain "=" — split on first "=" only
}
`,
      solution: `function parseCookies(cookieStr) {
  const result = {};
  if (!cookieStr) return result;
  for (const pair of cookieStr.split("; ")) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const name = pair.slice(0, idx);
    const value = pair.slice(idx + 1);
    result[name] = value;
  }
  return result;
}`,
      tests: [
        {
          name: "parses simple cookie string",
          code: `const result = parseCookies("a=1; b=2; c=3");
assertEquals(result.a, "1");
assertEquals(result.b, "2");
assertEquals(result.c, "3");`,
        },
        {
          name: "handles value containing equals sign",
          code: `const result = parseCookies("token=abc=def==");
assertEquals(result.token, "abc=def==");`,
        },
        {
          name: "returns empty object for empty string",
          code: `const result = parseCookies("");
assertEquals(JSON.stringify(result), JSON.stringify({}));`,
        },
        {
          name: "single cookie",
          code: `const result = parseCookies("theme=dark");
assertEquals(result.theme, "dark");`,
        },
      ],
      hints: [
        "Split the string on \"; \" to get individual pairs.",
        "Use pair.indexOf(\"=\") to find the first equals sign, then pair.slice(0, idx) for the name and pair.slice(idx + 1) for the value.",
      ],
    },
    {
      slug: "xss-csrf-tradeoffs",
      title: "XSS vs CSRF — The Storage Tradeoff",
      blurb: "Why where you store tokens determines which attacks can hit you.",
      xp: 40,
      content: `# XSS vs CSRF — The Storage Tradeoff

Every token storage strategy has a different threat model:

## localStorage / sessionStorage tokens (e.g. Bearer tokens in headers)

\`\`\`js
// Common SPA pattern
const token = localStorage.getItem("jwt");
fetch("/api/user", {
  headers: { Authorization: \`Bearer \${token}\` }
});
\`\`\`

**CSRF risk: low** — the attacker's site can't make requests with your
Authorization header (cross-origin fetch is blocked by CORS, and there's no
auto-attachment).

**XSS risk: high** — if any script on your page is compromised (your code, a
dependency, an ad), it can call \`localStorage.getItem("jwt")\` and exfiltrate
your token. This is a **persistent** exfiltration — the token lives until it
expires or is cleared.

## HttpOnly cookies

**CSRF risk: moderate** (mitigated by SameSite=Lax/Strict + CSRF tokens) —
cookies are sent automatically, so a forged form POST from evil.com could
include them, unless SameSite blocks it.

**XSS risk: low** — JS cannot read the cookie at all. Even if a script runs on
your page, it cannot access the token value.

## The verdict most security engineers land on

> Use **HttpOnly + Secure + SameSite=Lax** cookies for auth tokens.
> Combine with a CSRF token for state-mutating requests if you can't rely on SameSite alone.

## Your task
Write a function \`riskProfile(storageType)\` that accepts \`"localStorage"\`,
\`"sessionStorage"\`, or \`"httpOnlyCookie"\` and returns an object with boolean
fields \`xssRisk\` and \`csrfRisk\`:

- \`"localStorage"\` and \`"sessionStorage"\`: high XSS risk (\`true\`), low CSRF risk (\`false\`)
- \`"httpOnlyCookie"\`: low XSS risk (\`false\`), moderate CSRF risk (\`true\`)`,
      starterCode: `function riskProfile(storageType) {
  // return { xssRisk: boolean, csrfRisk: boolean }
  // localStorage/sessionStorage: xssRisk true, csrfRisk false
  // httpOnlyCookie: xssRisk false, csrfRisk true
}
`,
      solution: `function riskProfile(storageType) {
  if (storageType === "httpOnlyCookie") {
    return { xssRisk: false, csrfRisk: true };
  }
  return { xssRisk: true, csrfRisk: false };
}`,
      tests: [
        {
          name: "localStorage has xssRisk=true, csrfRisk=false",
          code: `const p = riskProfile("localStorage");
assertEquals(p.xssRisk, true);
assertEquals(p.csrfRisk, false);`,
        },
        {
          name: "sessionStorage has xssRisk=true, csrfRisk=false",
          code: `const p = riskProfile("sessionStorage");
assertEquals(p.xssRisk, true);
assertEquals(p.csrfRisk, false);`,
        },
        {
          name: "httpOnlyCookie has xssRisk=false, csrfRisk=true",
          code: `const p = riskProfile("httpOnlyCookie");
assertEquals(p.xssRisk, false);
assertEquals(p.csrfRisk, true);`,
        },
      ],
      hints: [
        "Think about which attacks each mechanism is vulnerable to: JS-readable storage = XSS target; auto-sent cookies = CSRF target.",
        "A simple if/else or ternary on storageType === \"httpOnlyCookie\" gives you all three cases.",
      ],
    },
    {
      slug: "token-expiry-check",
      title: "JWT Expiry Checks in the Client",
      blurb: "Decode a JWT payload to read claims like exp without a library.",
      xp: 40,
      content: `# JWT Expiry Checks in the Client

A **JWT (JSON Web Token)** has three base64url-encoded parts separated by dots:

\`\`\`
header.payload.signature
\`\`\`

The **payload** contains claims like \`exp\` (expiry, seconds since Unix epoch)
and \`sub\` (subject — usually the user ID).

Even if the token is in an HttpOnly cookie (so you can't access it via JS), if
it is stored in localStorage you can decode the payload to check whether it has
expired *before* making an API call, avoiding a wasted round-trip.

**Important**: decoding the payload in JS does **not** verify the signature.
Never trust decoded claims for authorization — only the server can verify the
signature. But reading \`exp\` to decide "should I refresh the token?" is fine.

\`\`\`js
function decodePayload(jwt) {
  const b64 = jwt.split(".")[1]
    .replace(/-/g, "+").replace(/_/g, "/"); // base64url → base64
  return JSON.parse(atob(b64));
}
\`\`\`

## Your task
Write \`isTokenExpired(jwt, nowSeconds)\` that:
1. Decodes the JWT payload (middle segment, base64url).
2. Returns \`true\` if \`payload.exp <= nowSeconds\`, \`false\` otherwise.

Use \`atob\` to decode base64 and \`JSON.parse\` to parse the payload.
Convert base64url to base64 by replacing \`-\` with \`+\` and \`_\` with \`/\`.`,
      starterCode: `function isTokenExpired(jwt, nowSeconds) {
  // 1. extract middle segment
  // 2. convert base64url to base64 (replace - with + and _ with /)
  // 3. atob() then JSON.parse()
  // 4. return true if payload.exp <= nowSeconds
}
`,
      solution: `function isTokenExpired(jwt, nowSeconds) {
  const b64url = jwt.split(".")[1];
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(atob(b64));
  return payload.exp <= nowSeconds;
}`,
      tests: [
        {
          name: "returns true for expired token",
          code: `// payload: { exp: 1000 }, exp is in the past
const payload = { exp: 1000 };
const b64 = btoa(JSON.stringify(payload)).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=/g, "");
const jwt = "header." + b64 + ".sig";
assertEquals(isTokenExpired(jwt, 2000), true);`,
        },
        {
          name: "returns false for valid token",
          code: `const payload = { exp: 9999999999 };
const b64 = btoa(JSON.stringify(payload)).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=/g, "");
const jwt = "header." + b64 + ".sig";
assertEquals(isTokenExpired(jwt, 1000), false);`,
        },
        {
          name: "returns true when exp equals nowSeconds (boundary)",
          code: `const payload = { exp: 5000 };
const b64 = btoa(JSON.stringify(payload)).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=/g, "");
const jwt = "header." + b64 + ".sig";
assertEquals(isTokenExpired(jwt, 5000), true);`,
        },
      ],
      hints: [
        "jwt.split(\".\")[1] gives you the base64url-encoded payload segment.",
        "Replace - with + and _ with / to convert base64url back to standard base64, then call atob() on the result.",
        "JSON.parse(atob(b64)) gives you the payload object. Check payload.exp <= nowSeconds.",
      ],
    },
    {
      slug: "storage-policy",
      title: "Choosing the Right Storage",
      blurb: "Apply the decision framework: pick the safest home for each data type.",
      xp: 45,
      content: `# Choosing the Right Storage

Given what you now know, here is a practical decision tree:

\`\`\`
Is this sensitive (auth token, PII, financial data)?
  ├── Yes → Use HttpOnly cookie (server sets it, JS can't touch it)
  └── No → Is it needed only for this tab session?
              ├── Yes → sessionStorage
              └── No  → localStorage
\`\`\`

## Common real-world mappings

| Data | Recommended storage |
|---|---|
| JWT / session token | HttpOnly + Secure + SameSite=Lax cookie |
| CSRF double-submit token | localStorage or non-HttpOnly cookie (JS must read it) |
| UI theme preference | localStorage |
| Multi-step form state | sessionStorage |
| OAuth \`state\` parameter | sessionStorage (must survive the redirect, then discard) |
| Shopping cart (anonymous) | localStorage |

## Your task
Write \`recommendStorage(dataType)\` that accepts one of these strings and returns
the recommended storage as a string:

- \`"authToken"\` → \`"httpOnlyCookie"\`
- \`"csrfToken"\` → \`"localStorage"\`
- \`"themePreference"\` → \`"localStorage"\`
- \`"wizardFormState"\` → \`"sessionStorage"\`
- \`"oauthState"\` → \`"sessionStorage"\``,
      starterCode: `function recommendStorage(dataType) {
  // return "httpOnlyCookie", "localStorage", or "sessionStorage"
  // based on the data type
}
`,
      solution: `function recommendStorage(dataType) {
  const map = {
    authToken: "httpOnlyCookie",
    csrfToken: "localStorage",
    themePreference: "localStorage",
    wizardFormState: "sessionStorage",
    oauthState: "sessionStorage",
  };
  return map[dataType];
}`,
      tests: [
        {
          name: "authToken → httpOnlyCookie",
          code: `assertEquals(recommendStorage("authToken"), "httpOnlyCookie");`,
        },
        {
          name: "csrfToken → localStorage",
          code: `assertEquals(recommendStorage("csrfToken"), "localStorage");`,
        },
        {
          name: "themePreference → localStorage",
          code: `assertEquals(recommendStorage("themePreference"), "localStorage");`,
        },
        {
          name: "wizardFormState → sessionStorage",
          code: `assertEquals(recommendStorage("wizardFormState"), "sessionStorage");`,
        },
        {
          name: "oauthState → sessionStorage",
          code: `assertEquals(recommendStorage("oauthState"), "sessionStorage");`,
        },
      ],
      hints: [
        "A lookup object (map) indexed by dataType is the cleanest approach here.",
        "Remember the rule: sensitive auth tokens belong in HttpOnly cookies; temporary tab state belongs in sessionStorage; everything else in localStorage.",
      ],
    },
  ],
};
