import type { Module } from "./types";

// Browser Cryptography: The Web Crypto API
// Hands-on SubtleCrypto — digest, sign/verify, HMAC, deriveKey, and random bytes.
// Runs entirely in-browser via the Web Worker JS sandbox.
export const webcryptoApi: Module = {
  slug: "webcrypto-api",
  title: "Browser Cryptography: The Web Crypto API",
  description:
    "Hash data, generate cryptographic keys, sign and verify messages, and derive keys from passwords — all with the native SubtleCrypto API built into every modern browser and Node.js.",
  emoji: "🔐",
  gradient: "from-indigo-400/20 to-violet-500/10",
  tagline:
    "Learn the Web Crypto API: SHA-256 hashing, HMAC signing, key generation, AES encryption, and PBKDF2 key derivation — in real runnable code.",
  keywords: [
    "web crypto api",
    "subtlecrypto javascript",
    "sha-256 javascript",
    "hmac javascript",
    "aes encryption browser",
    "pbkdf2 javascript",
    "webcrypto tutorial",
    "javascript cryptography",
  ],
  language: "js",
  lessons: [
    // ── Lesson 1 ── Random Bytes ─────────────────────────────────────────
    {
      slug: "random-bytes",
      title: "Secure Random Bytes",
      blurb: "Generate cryptographically strong random data with getRandomValues.",
      xp: 20,
      content: `# Secure Random Bytes

\`Math.random()\` is **not** cryptographically secure — it is predictable enough
that an attacker could guess the values. The Web Crypto API provides
\`crypto.getRandomValues(typedArray)\` which fills a typed array with
cryptographically strong random bytes sourced from the OS.

\`\`\`js
// fill 16 bytes (128 bits) of secure randomness
const buf = new Uint8Array(16);
crypto.getRandomValues(buf);
// buf now holds 16 random bytes, e.g. [203, 17, 88, ...]
\`\`\`

The call mutates **and returns** the same array. It is synchronous — no await
needed.

## Your task

Write \`randomBytes(n)\` that returns a \`Uint8Array\` of \`n\` cryptographically
secure random bytes using \`crypto.getRandomValues\`.`,
      starterCode: `function randomBytes(n) {
  // fill an n-byte Uint8Array with secure random data and return it
}
`,
      solution: `function randomBytes(n) {
  const buf = new Uint8Array(n);
  crypto.getRandomValues(buf);
  return buf;
}`,
      tests: [
        {
          name: "returns a Uint8Array",
          code: `assert(randomBytes(8) instanceof Uint8Array, "should return Uint8Array");`,
        },
        {
          name: "length matches n",
          code: `assertEquals(randomBytes(16).length, 16);`,
        },
        {
          name: "length 0 is valid",
          code: `assertEquals(randomBytes(0).length, 0);`,
        },
        {
          name: "two calls produce different values (probabilistic)",
          code: `const a = randomBytes(8); const b = randomBytes(8); assert(a.join() !== b.join(), "should differ");`,
        },
      ],
      hints: [
        "Create a `new Uint8Array(n)` first, then pass it to `crypto.getRandomValues`.",
        "`crypto.getRandomValues` returns the same array it was given — just return that.",
      ],
      explanation: `\`crypto.getRandomValues\` reads from the OS CSPRNG (e.g. \`/dev/urandom\` on Linux).
It is the correct primitive for generating nonces, IVs, salts, and session tokens in the browser.`,
    },

    // ── Lesson 2 ── SHA-256 Digest ───────────────────────────────────────
    {
      slug: "sha256-digest",
      title: "Hashing with SHA-256",
      blurb: "Turn any string into a fixed 32-byte fingerprint via SubtleCrypto.digest.",
      xp: 35,
      content: `# Hashing with SHA-256

A **cryptographic hash** maps any input to a fixed-size digest. SHA-256 always
produces 256 bits (32 bytes). The same input always gives the same output;
different inputs almost certainly give different outputs; and you cannot reverse
the hash to recover the original.

\`\`\`js
async function sha256(message) {
  const encoded = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(hashBuffer); // 32 bytes
}
\`\`\`

### Hex encoding

Raw bytes are usually displayed as lowercase hex:

\`\`\`js
function toHex(bytes) {
  return [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
}
\`\`\`

## Your task

Write \`sha256hex(message)\` — an async function that:
1. Encodes \`message\` to bytes with \`TextEncoder\`.
2. Calls \`crypto.subtle.digest("SHA-256", ...)\` to get an \`ArrayBuffer\`.
3. Converts the result to a lowercase hex string and returns it.

The SHA-256 hash of \`"hello"\` is:
\`2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\``,
      starterCode: `async function sha256hex(message) {
  // 1. encode the string
  // 2. digest with SHA-256
  // 3. return lowercase hex string
}
`,
      solution: `async function sha256hex(message) {
  const encoded = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = new Uint8Array(hashBuffer);
  return [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
}`,
      tests: [
        {
          name: 'sha256hex("hello") == known digest',
          code: `assertEquals(await sha256hex("hello"), "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");`,
        },
        {
          name: "output is 64 hex chars (256 bits)",
          code: `assertEquals((await sha256hex("boots")).length, 64);`,
        },
        {
          name: "same input same output",
          code: `assertEquals(await sha256hex("abc"), await sha256hex("abc"));`,
        },
        {
          name: "different inputs differ",
          code: `assert(await sha256hex("a") !== await sha256hex("b"), "different inputs must differ");`,
        },
      ],
      hints: [
        "Use `new TextEncoder().encode(message)` to turn the string into a `Uint8Array`.",
        "`crypto.subtle.digest` returns a Promise — use `await`.",
        "Wrap the `ArrayBuffer` in `new Uint8Array(...)` before mapping over bytes.",
        "Each byte: `b.toString(16).padStart(2, \"0\")` — then `.join(\"\")` the array.",
      ],
      explanation: `\`crypto.subtle.digest\` is a one-way function: fast to compute, infeasible to
reverse. It is used for checksums, password storage (with a salt + KDF on top),
and data integrity checks.`,
    },

    // ── Lesson 3 ── Generating an HMAC Key ───────────────────────────────
    {
      slug: "hmac-key-gen",
      title: "Generating an HMAC Key",
      blurb: "Create a secret signing key with crypto.subtle.generateKey.",
      xp: 30,
      content: `# Generating an HMAC Key

HMAC (Hash-based Message Authentication Code) uses a **secret key** to produce
an authentication tag. Only someone with the same key can produce or verify the
tag — unlike a plain hash which anyone can recompute.

\`\`\`js
const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,          // extractable — can be exported later
  ["sign", "verify"]
);
\`\`\`

The returned \`CryptoKey\` object cannot be read directly — it lives in the
browser's key store. You can export it with \`crypto.subtle.exportKey("raw", key)\`
to get the raw bytes.

## Your task

Write \`generateHmacKey()\` — an async function that generates and returns an
HMAC-SHA-256 \`CryptoKey\` that is **extractable** and supports both \`"sign"\`
and \`"verify"\` usages.`,
      starterCode: `async function generateHmacKey() {
  // generate and return an HMAC-SHA-256 CryptoKey
}
`,
      solution: `async function generateHmacKey() {
  return await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
}`,
      tests: [
        {
          name: "returns a CryptoKey",
          code: `const k = await generateHmacKey(); assert(k instanceof CryptoKey, "should be a CryptoKey");`,
        },
        {
          name: "algorithm is HMAC",
          code: `const k = await generateHmacKey(); assertEquals(k.algorithm.name, "HMAC");`,
        },
        {
          name: "hash is SHA-256",
          code: `const k = await generateHmacKey(); assertEquals(k.algorithm.hash.name, "SHA-256");`,
        },
        {
          name: "key is extractable",
          code: `const k = await generateHmacKey(); assert(k.extractable === true, "should be extractable");`,
        },
      ],
      hints: [
        "The first argument to `generateKey` is the algorithm descriptor: `{ name: \"HMAC\", hash: \"SHA-256\" }`.",
        "The second argument controls extractability — pass `true`.",
        "The third argument is the key usages array: `[\"sign\", \"verify\"]`.",
      ],
    },

    // ── Lesson 4 ── Sign & Verify with HMAC ──────────────────────────────
    {
      slug: "hmac-sign-verify",
      title: "Signing and Verifying with HMAC",
      blurb: "Use a secret key to sign a message and verify the signature.",
      xp: 45,
      content: `# Signing and Verifying with HMAC

Once you have a key, signing encodes a message into an unforgeable tag:

\`\`\`js
const sig = await crypto.subtle.sign(
  "HMAC",
  key,
  new TextEncoder().encode("my message")
); // ArrayBuffer
\`\`\`

Verification checks whether the tag was produced with the same key:

\`\`\`js
const ok = await crypto.subtle.verify(
  "HMAC",
  key,
  sig,       // the signature to test
  new TextEncoder().encode("my message")
); // boolean
\`\`\`

**Important:** \`verify\` uses a constant-time comparison so an attacker cannot
exploit timing differences to forge a signature.

## Your task

Write two async functions:

- \`signMessage(key, message)\` — signs \`message\` (string) with \`key\` and
  returns the signature as an \`ArrayBuffer\`.
- \`verifyMessage(key, signature, message)\` — verifies that \`signature\` is a
  valid HMAC for \`message\` with \`key\` and returns \`true\` or \`false\`.`,
      starterCode: `async function signMessage(key, message) {
  // encode message and sign it with HMAC
}

async function verifyMessage(key, signature, message) {
  // verify the HMAC signature and return true/false
}
`,
      solution: `async function signMessage(key, message) {
  const encoded = new TextEncoder().encode(message);
  return await crypto.subtle.sign("HMAC", key, encoded);
}

async function verifyMessage(key, signature, message) {
  const encoded = new TextEncoder().encode(message);
  return await crypto.subtle.verify("HMAC", key, signature, encoded);
}`,
      tests: [
        {
          name: "sign returns an ArrayBuffer",
          code: `const k = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, true, ["sign","verify"]);
const sig = await signMessage(k, "hello");
assert(sig instanceof ArrayBuffer, "signature should be ArrayBuffer");`,
        },
        {
          name: "verify returns true for correct signature",
          code: `const k = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, true, ["sign","verify"]);
const sig = await signMessage(k, "hello");
const ok = await verifyMessage(k, sig, "hello");
assertEquals(ok, true);`,
        },
        {
          name: "verify returns false for wrong message",
          code: `const k = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, true, ["sign","verify"]);
const sig = await signMessage(k, "hello");
const ok = await verifyMessage(k, sig, "world");
assertEquals(ok, false);`,
        },
        {
          name: "verify returns false for tampered signature",
          code: `const k = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, true, ["sign","verify"]);
const sig = await signMessage(k, "hello");
const tampered = new Uint8Array(sig); tampered[0] ^= 0xFF;
const ok = await verifyMessage(k, tampered.buffer, "hello");
assertEquals(ok, false);`,
        },
      ],
      hints: [
        "Both functions need `new TextEncoder().encode(message)` to convert the string.",
        "`crypto.subtle.sign` and `crypto.subtle.verify` are both async — use `await`.",
        "`verify` takes arguments in this order: algorithm, key, signature, data.",
      ],
      explanation: `HMAC is the backbone of JWT \`HS256\` tokens, API request signing (e.g. AWS
Signature v4), and webhook authenticity checks. The secret key must stay
server-side — never expose it in client code.`,
    },

    // ── Lesson 5 ── AES-GCM Key Generation ───────────────────────────────
    {
      slug: "aes-gcm-key",
      title: "Generating an AES-GCM Key",
      blurb: "Create a symmetric encryption key for authenticated encryption.",
      xp: 30,
      content: `# Generating an AES-GCM Key

**AES-GCM** (Galois/Counter Mode) is the recommended symmetric cipher in the
Web Crypto API. It provides both **encryption** and **authentication** in one
pass — you get a ciphertext that cannot be decrypted or tampered with without
the key.

Key lengths: \`128\` or \`256\` bits. Always prefer 256 for new code.

\`\`\`js
const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,               // extractable
  ["encrypt", "decrypt"]
);
\`\`\`

## Your task

Write \`generateAesKey(bits)\` — an async function that generates and returns an
AES-GCM \`CryptoKey\` of \`bits\` length (either \`128\` or \`256\`), extractable,
supporting \`"encrypt"\` and \`"decrypt"\`.`,
      starterCode: `async function generateAesKey(bits) {
  // generate an AES-GCM key of the given bit length
}
`,
      solution: `async function generateAesKey(bits) {
  return await crypto.subtle.generateKey(
    { name: "AES-GCM", length: bits },
    true,
    ["encrypt", "decrypt"]
  );
}`,
      tests: [
        {
          name: "returns a CryptoKey",
          code: `const k = await generateAesKey(256); assert(k instanceof CryptoKey, "should be CryptoKey");`,
        },
        {
          name: "algorithm is AES-GCM",
          code: `const k = await generateAesKey(256); assertEquals(k.algorithm.name, "AES-GCM");`,
        },
        {
          name: "128-bit key length",
          code: `const k = await generateAesKey(128); assertEquals(k.algorithm.length, 128);`,
        },
        {
          name: "256-bit key length",
          code: `const k = await generateAesKey(256); assertEquals(k.algorithm.length, 256);`,
        },
      ],
      hints: [
        "The algorithm descriptor is `{ name: \"AES-GCM\", length: bits }`.",
        "Use `[\"encrypt\", \"decrypt\"]` as the usages array.",
      ],
    },

    // ── Lesson 6 ── AES-GCM Encrypt & Decrypt ────────────────────────────
    {
      slug: "aes-gcm-encrypt-decrypt",
      title: "Encrypt and Decrypt with AES-GCM",
      blurb: "Encrypt a string, get ciphertext back, decrypt to the original.",
      xp: 50,
      content: `# Encrypt and Decrypt with AES-GCM

AES-GCM requires a **12-byte IV** (Initialization Vector / nonce) that must be
unique for every encryption under the same key. Never reuse an IV — reuse
catastrophically breaks GCM's security guarantees.

**Encrypt:**
\`\`\`js
const iv = crypto.getRandomValues(new Uint8Array(12));
const ciphertext = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  key,
  new TextEncoder().encode(plaintext)
); // ArrayBuffer
\`\`\`

**Decrypt:**
\`\`\`js
const decrypted = await crypto.subtle.decrypt(
  { name: "AES-GCM", iv },   // same iv used during encryption!
  key,
  ciphertext
);
new TextDecoder().decode(decrypted); // back to string
\`\`\`

## Your task

Write two async functions:

- \`aesEncrypt(key, plaintext)\` — generates a fresh 12-byte IV, encrypts the
  plaintext string with AES-GCM, and returns \`{ iv: Uint8Array, ciphertext: ArrayBuffer }\`.
- \`aesDecrypt(key, iv, ciphertext)\` — decrypts and returns the original string.`,
      starterCode: `async function aesEncrypt(key, plaintext) {
  // generate iv, encrypt, return { iv, ciphertext }
}

async function aesDecrypt(key, iv, ciphertext) {
  // decrypt and return the original string
}
`,
      solution: `async function aesEncrypt(key, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );
  return { iv, ciphertext };
}

async function aesDecrypt(key, iv, ciphertext) {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}`,
      tests: [
        {
          name: "round-trip: decrypt(encrypt(msg)) === msg",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const { iv, ciphertext } = await aesEncrypt(k, "hello boots");
const plain = await aesDecrypt(k, iv, ciphertext);
assertEquals(plain, "hello boots");`,
        },
        {
          name: "ciphertext is an ArrayBuffer",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const { ciphertext } = await aesEncrypt(k, "test");
assert(ciphertext instanceof ArrayBuffer, "ciphertext should be ArrayBuffer");`,
        },
        {
          name: "iv is a 12-byte Uint8Array",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const { iv } = await aesEncrypt(k, "test");
assert(iv instanceof Uint8Array && iv.length === 12, "iv must be 12-byte Uint8Array");`,
        },
        {
          name: "two encryptions of same plaintext produce different ciphertexts",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const r1 = await aesEncrypt(k, "same");
const r2 = await aesEncrypt(k, "same");
assert(
  new Uint8Array(r1.ciphertext).join() !== new Uint8Array(r2.ciphertext).join(),
  "IVs differ so ciphertexts must differ"
);`,
        },
      ],
      hints: [
        "Generate the IV with `crypto.getRandomValues(new Uint8Array(12))` before calling encrypt.",
        "Pass `{ name: \"AES-GCM\", iv }` as the first argument to both `encrypt` and `decrypt`.",
        "Use `new TextDecoder().decode(decrypted)` to convert the decrypted `ArrayBuffer` back to a string.",
      ],
      explanation: `The IV must be transmitted alongside the ciphertext (it is not secret) so the
receiver can decrypt. A common pattern is to prepend the 12-byte IV to the
ciphertext: \`concat(iv, ciphertext)\`.`,
    },

    // ── Lesson 7 ── PBKDF2 Key Derivation ────────────────────────────────
    {
      slug: "pbkdf2-derive",
      title: "Deriving a Key from a Password (PBKDF2)",
      blurb: "Turn a human password into a strong cryptographic key.",
      xp: 50,
      content: `# Deriving a Key from a Password (PBKDF2)

A raw password is a weak key. **PBKDF2** (Password-Based Key Derivation Function 2)
stretches a password into a strong cryptographic key by running it through
thousands of hash iterations, making brute-force attacks expensive.

### Step 1 — Import the password as a base key

\`\`\`js
const baseKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,        // not extractable
  ["deriveKey"]
);
\`\`\`

### Step 2 — Derive the actual key

\`\`\`js
const derivedKey = await crypto.subtle.deriveKey(
  {
    name: "PBKDF2",
    salt,          // Uint8Array, random, stored alongside the ciphertext
    iterations: 100_000,
    hash: "SHA-256",
  },
  baseKey,
  { name: "AES-GCM", length: 256 },  // output key type
  false,          // not extractable
  ["encrypt", "decrypt"]
);
\`\`\`

## Your task

Write \`deriveKeyFromPassword(password, salt)\` — an async function that:
1. Imports \`password\` (string) as a PBKDF2 base key.
2. Derives an AES-GCM 256-bit key using \`salt\` (a \`Uint8Array\`),
   \`100_000\` iterations, and SHA-256.
3. Returns the derived \`CryptoKey\`.`,
      starterCode: `async function deriveKeyFromPassword(password, salt) {
  // step 1: import the password as a PBKDF2 base key
  // step 2: deriveKey → AES-GCM 256-bit
  // step 3: return the derived key
}
`,
      solution: `async function deriveKeyFromPassword(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}`,
      tests: [
        {
          name: "returns a CryptoKey",
          code: `const salt = crypto.getRandomValues(new Uint8Array(16));
const k = await deriveKeyFromPassword("p@ssw0rd", salt);
assert(k instanceof CryptoKey, "should return a CryptoKey");`,
        },
        {
          name: "derived key algorithm is AES-GCM",
          code: `const salt = crypto.getRandomValues(new Uint8Array(16));
const k = await deriveKeyFromPassword("secret", salt);
assertEquals(k.algorithm.name, "AES-GCM");`,
        },
        {
          name: "derived key is 256 bits",
          code: `const salt = crypto.getRandomValues(new Uint8Array(16));
const k = await deriveKeyFromPassword("secret", salt);
assertEquals(k.algorithm.length, 256);`,
        },
        {
          name: "derived key can encrypt and decrypt",
          code: `const salt = crypto.getRandomValues(new Uint8Array(16));
const k = await deriveKeyFromPassword("hunter2", salt);
const iv = crypto.getRandomValues(new Uint8Array(12));
const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, k, new TextEncoder().encode("hi"));
const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, k, ct);
assertEquals(new TextDecoder().decode(pt), "hi");`,
        },
      ],
      hints: [
        "`importKey` needs format `\"raw\"`, the encoded password, algorithm name `\"PBKDF2\"`, `false`, and `[\"deriveKey\"]`.",
        "In `deriveKey`, the first argument is the PBKDF2 params object with `name`, `salt`, `iterations`, and `hash`.",
        "The third argument to `deriveKey` is the target key descriptor: `{ name: \"AES-GCM\", length: 256 }`.",
      ],
      explanation: `Use a fresh random 16-byte salt per password and store it with the ciphertext.
The salt prevents pre-computed rainbow-table attacks: two users with the same
password get completely different derived keys.`,
    },

    // ── Lesson 8 ── Export & Import Keys ─────────────────────────────────
    {
      slug: "export-import-key",
      title: "Exporting and Importing Keys",
      blurb: "Serialize a CryptoKey to bytes and restore it later.",
      xp: 40,
      content: `# Exporting and Importing Keys

A \`CryptoKey\` object lives in the browser's key store. To persist it — in
localStorage, a database, or across a network — you must **export** it to bytes,
then **import** it back when you need it again.

**Export to raw bytes:**
\`\`\`js
const rawBytes = await crypto.subtle.exportKey("raw", key); // ArrayBuffer
\`\`\`

**Import from raw bytes:**
\`\`\`js
const restoredKey = await crypto.subtle.importKey(
  "raw",
  rawBytes,
  { name: "AES-GCM", length: 256 },
  true,              // extractable
  ["encrypt", "decrypt"]
);
\`\`\`

Only \`extractable: true\` keys can be exported. PBKDF2 keys are intentionally
non-extractable for security.

## Your task

Write two async functions:

- \`exportKeyToBytes(key)\` — exports a \`CryptoKey\` to a \`Uint8Array\`.
- \`importKeyFromBytes(bytes)\` — imports a 256-bit AES-GCM \`CryptoKey\` from a
  \`Uint8Array\`, extractable, supporting \`encrypt\` and \`decrypt\`.`,
      starterCode: `async function exportKeyToBytes(key) {
  // export key as raw bytes, return Uint8Array
}

async function importKeyFromBytes(bytes) {
  // import as AES-GCM 256-bit CryptoKey, extractable, encrypt+decrypt
}
`,
      solution: `async function exportKeyToBytes(key) {
  const raw = await crypto.subtle.exportKey("raw", key);
  return new Uint8Array(raw);
}

async function importKeyFromBytes(bytes) {
  return await crypto.subtle.importKey(
    "raw",
    bytes,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}`,
      tests: [
        {
          name: "exportKeyToBytes returns a Uint8Array",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const bytes = await exportKeyToBytes(k);
assert(bytes instanceof Uint8Array, "should be Uint8Array");`,
        },
        {
          name: "exported AES-256 key is 32 bytes",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const bytes = await exportKeyToBytes(k);
assertEquals(bytes.length, 32);`,
        },
        {
          name: "importKeyFromBytes returns a CryptoKey",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const bytes = await exportKeyToBytes(k);
const restored = await importKeyFromBytes(bytes);
assert(restored instanceof CryptoKey, "should be CryptoKey");`,
        },
        {
          name: "round-trip: export then import preserves encryption ability",
          code: `const k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
const bytes = await exportKeyToBytes(k);
const restored = await importKeyFromBytes(bytes);
const iv = crypto.getRandomValues(new Uint8Array(12));
const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, restored, new TextEncoder().encode("test"));
const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, restored, ct);
assertEquals(new TextDecoder().decode(pt), "test");`,
        },
      ],
      hints: [
        "`exportKey(\"raw\", key)` returns an `ArrayBuffer` — wrap it in `new Uint8Array(...)` to return bytes.",
        "`importKey` wants `\"raw\"` as the first argument, then the bytes, then the algorithm descriptor.",
      ],
    },

    // ── Lesson 9 ── Putting It All Together ──────────────────────────────
    {
      slug: "password-encrypt-message",
      title: "Password-Encrypt a Message End-to-End",
      blurb: "Combine PBKDF2 + AES-GCM to encrypt and decrypt with just a password.",
      xp: 50,
      content: `# Password-Encrypt a Message End-to-End

You now know all the pieces. A real-world password-based encryption flow:

1. **Generate a random salt** (16 bytes) and **IV** (12 bytes).
2. **Derive an AES-GCM key** from the password using PBKDF2 + the salt.
3. **Encrypt** the plaintext with the derived key + IV.
4. **Bundle** \`{ salt, iv, ciphertext }\` — these three are safe to store/send.
5. **Decrypt**: re-derive the same key from the same password + salt, then decrypt.

\`\`\`
password + salt → PBKDF2 → AES-GCM key → encrypt/decrypt ciphertext
\`\`\`

## Your task

Write two async functions:

- \`passwordEncrypt(password, plaintext)\`
  Returns \`{ salt: Uint8Array, iv: Uint8Array, ciphertext: ArrayBuffer }\`.

- \`passwordDecrypt(password, salt, iv, ciphertext)\`
  Re-derives the key and returns the decrypted plaintext string.`,
      starterCode: `async function passwordEncrypt(password, plaintext) {
  // 1. generate random salt (16 bytes) and iv (12 bytes)
  // 2. derive AES-GCM key via PBKDF2 (100_000 iterations, SHA-256)
  // 3. encrypt plaintext
  // 4. return { salt, iv, ciphertext }
}

async function passwordDecrypt(password, salt, iv, ciphertext) {
  // 1. re-derive the key from password + salt
  // 2. decrypt and return the plaintext string
}
`,
      solution: `async function passwordEncrypt(password, plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return { salt, iv, ciphertext };
}

async function passwordDecrypt(password, salt, iv, ciphertext) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}`,
      tests: [
        {
          name: "passwordEncrypt returns salt, iv, and ciphertext",
          code: `const result = await passwordEncrypt("mypassword", "hello");
assert(result.salt instanceof Uint8Array, "salt should be Uint8Array");
assert(result.iv instanceof Uint8Array, "iv should be Uint8Array");
assert(result.ciphertext instanceof ArrayBuffer, "ciphertext should be ArrayBuffer");`,
        },
        {
          name: "salt is 16 bytes, iv is 12 bytes",
          code: `const { salt, iv } = await passwordEncrypt("x", "y");
assertEquals(salt.length, 16);
assertEquals(iv.length, 12);`,
        },
        {
          name: "round-trip: decrypt returns original plaintext",
          code: `const msg = "the quick brown fox";
const { salt, iv, ciphertext } = await passwordEncrypt("s3cr3t", msg);
const plain = await passwordDecrypt("s3cr3t", salt, iv, ciphertext);
assertEquals(plain, msg);`,
        },
        {
          name: "wrong password fails to decrypt",
          code: `const { salt, iv, ciphertext } = await passwordEncrypt("correct", "data");
let threw = false;
try { await passwordDecrypt("wrong", salt, iv, ciphertext); } catch (e) { threw = true; }
assert(threw, "wrong password should throw on decrypt");`,
        },
      ],
      hints: [
        "Copy your `deriveKeyFromPassword` logic — you need it in both functions with the same params.",
        "In `passwordEncrypt`, generate salt and iv first, then derive the key, then encrypt.",
        "In `passwordDecrypt`, re-derive with the *same* salt to get the identical key.",
        "GCM will throw (DOMException) if the authentication tag doesn't match — wrong password triggers this.",
      ],
      explanation: `This pattern powers end-to-end encrypted notes, password managers, and secure
local storage. The salt and IV are not secret — store them in plain text next
to the ciphertext. Only the password must stay secret.`,
    },
  ],
};
