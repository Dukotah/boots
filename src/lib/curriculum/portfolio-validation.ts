import type { Module } from "./types";

// Portfolio Validation — guided project module focused on real-world input validation,
// form logic, and data-integrity patterns. Each lesson builds a standalone utility
// that developers reach for on every project: email checkers, credit-card algorithms,
// reducer-driven form state, sanitizers, and lightweight schema validators.
export const portfolioValidation: Module = {
  slug: "portfolio-validation",
  title: "Validators & Form Logic",
  description:
    "Build the validation utilities every app needs — from email checkers to credit-card algorithms. Pure logic, fully tested, ready to drop into any project.",
  emoji: "✅",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline: "build production-ready validators and form logic",
  language: "js",
  keywords: [
    "form validation javascript",
    "input validation",
    "email validator",
    "luhn algorithm",
    "javascript form logic",
    "schema validation",
    "sanitize input",
    "password strength checker",
  ],
  free: false,
  lessons: [
    {
      slug: "email-password-validator",
      title: "Email & Password Validator",
      blurb: "The first thing every signup form needs — built right.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`Validator\` class that checks whether an email address is well-formed and whether a password meets strength requirements — the exact logic that guards every user registration form on the web.

## Requirements

- \`isValidEmail(email)\` — returns \`true\` if the string contains exactly one \`@\`, at least one character before it, and a domain with at least one dot and characters after the dot. Returns \`false\` otherwise.
- \`isStrongPassword(password)\` — returns \`true\` if the password is at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one digit, and one special character from \`!@#$%^&*\`. Returns \`false\` otherwise.
- \`validate(email, password)\` — returns \`{ emailOk: boolean, passwordOk: boolean, ok: boolean }\` where \`ok\` is \`true\` only when both pass.

## Stretch goals

- Add a \`reasons\` array to the \`validate\` result listing what failed (e.g. \`"password too short"\`).
- Support a configurable minimum password length via the constructor.
- Reject emails with consecutive dots or a dot immediately before \`@\`.

## What this proves

Regex literacy, boolean composition, and defensive input handling — core skills for any frontend or backend role. Interviewers love seeing clean, testable validator logic.`,
      starterCode: `class Validator {
  isValidEmail(email) {
    // Must have exactly one @, something before it,
    // and a domain like "foo.com" after it.
    // TODO: implement
    return false;
  }

  isStrongPassword(password) {
    // At least 8 chars, one uppercase, one lowercase,
    // one digit, one special char from !@#$%^&*
    // TODO: implement
    return false;
  }

  validate(email, password) {
    // Return { emailOk, passwordOk, ok }
    // ok is true only when both pass
    // TODO: implement
    return { emailOk: false, passwordOk: false, ok: false };
  }
}
`,
      solution: `class Validator {
  isValidEmail(email) {
    // Basic structural check: one @, chars before, domain with dot and suffix
    const re = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;
    const atCount = (email.match(/@/g) || []).length;
    return atCount === 1 && re.test(email);
  }

  isStrongPassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
  }

  validate(email, password) {
    const emailOk = this.isValidEmail(email);
    const passwordOk = this.isStrongPassword(password);
    return { emailOk, passwordOk, ok: emailOk && passwordOk };
  }
}`,
      tests: [
        {
          name: "valid email passes",
          code: `const v = new Validator();
assertEquals(v.isValidEmail("user@example.com"), true);
assertEquals(v.isValidEmail("a.b+c@mail.co.uk"), true);`,
        },
        {
          name: "invalid emails fail",
          code: `const v = new Validator();
assertEquals(v.isValidEmail("notanemail"), false);
assertEquals(v.isValidEmail("two@@at.com"), false);
assertEquals(v.isValidEmail("@nodomain.com"), false);`,
        },
        {
          name: "strong password passes",
          code: `const v = new Validator();
assertEquals(v.isStrongPassword("Secure1!"), true);
assertEquals(v.isStrongPassword("short1!A"), true);`,
        },
        {
          name: "weak passwords fail",
          code: `const v = new Validator();
assertEquals(v.isStrongPassword("alllower1!"), false);
assertEquals(v.isStrongPassword("ALLUPPER1!"), false);
assertEquals(v.isStrongPassword("NoDigit!!A"), false);
assertEquals(v.isStrongPassword("Short1!"), false);`,
        },
      ],
      hints: [
        "For email, check that there is exactly one `@` and that the part after it contains a `.` with characters on both sides.",
        "For password strength, test each requirement with a separate regex: `/[A-Z]/`, `/[a-z]/`, `/[0-9]/`, `/[!@#$%^&*]/`.",
        "In `validate`, call both methods and combine the results — `ok` is just `emailOk && passwordOk`.",
      ],
    },
    {
      slug: "luhn-check",
      title: "Credit Card Luhn Check",
      blurb: "The 70-year-old algorithm that catches typos in every card number.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`LuhnValidator\` that implements the Luhn algorithm — the checksum used to catch transposition errors in credit card numbers, IMEI codes, and national IDs.

## Requirements

- \`isValid(cardNumber)\` — accepts a string (may contain spaces or dashes, strip them first). Returns \`true\` if the number passes the Luhn check, \`false\` otherwise.
- \`getCheckDigit(partialNumber)\` — given a card number with the last digit missing (or \`0\`), compute and return the correct check digit as a number.
- \`sanitize(input)\` — strips all non-digit characters and returns the resulting string.

### The Luhn Algorithm

1. Starting from the **rightmost digit** (the check digit), move left.
2. **Double** every second digit (i.e. every digit at an even index from the right, skipping index 0).
3. If doubling produces a value > 9, subtract 9.
4. Sum all digits.
5. If the total modulo 10 equals 0, the number is valid.

Example: \`"4532015112830366"\` is a valid Luhn number.

## Stretch goals

- Detect the card brand (Visa starts with 4, Mastercard 51-55, Amex 34/37).
- Validate that the number has the correct length for its detected brand.

## What this proves

Bit-manipulation thinking, off-by-one awareness, and working from a written specification — exactly what technical screens test.`,
      starterCode: `class LuhnValidator {
  sanitize(input) {
    // Remove all non-digit characters
    return input.replace(/[^0-9]/g, "");
  }

  isValid(cardNumber) {
    const digits = this.sanitize(cardNumber);
    if (digits.length < 2) return false;
    // TODO: implement the Luhn check
    // Hint: iterate right-to-left, double every second digit (index 1, 3, 5…)
    // subtract 9 if the doubled value > 9, sum all values, check % 10 === 0
    return false;
  }

  getCheckDigit(partialNumber) {
    // partialNumber already includes a placeholder 0 as the last digit.
    // Find the digit (0-9) that makes the full number pass Luhn.
    // TODO: implement
    return 0;
  }
}
`,
      solution: `class LuhnValidator {
  sanitize(input) {
    return input.replace(/[^0-9]/g, "");
  }

  isValid(cardNumber) {
    const digits = this.sanitize(cardNumber);
    if (digits.length < 2) return false;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = parseInt(digits[digits.length - 1 - i], 10);
      if (i % 2 === 1) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
    }
    return sum % 10 === 0;
  }

  getCheckDigit(partialNumber) {
    const base = this.sanitize(partialNumber).slice(0, -1);
    for (let d = 0; d <= 9; d++) {
      if (this.isValid(base + String(d))) return d;
    }
    return -1;
  }
}`,
      tests: [
        {
          name: "known valid card numbers pass",
          code: `const lv = new LuhnValidator();
assertEquals(lv.isValid("4532015112830366"), true);
assertEquals(lv.isValid("4532 0151 1283 0366"), true);`,
        },
        {
          name: "tampered number fails",
          code: `const lv = new LuhnValidator();
assertEquals(lv.isValid("4532015112830367"), false);
assertEquals(lv.isValid("1234567890123456"), false);`,
        },
        {
          name: "sanitize strips non-digits",
          code: `const lv = new LuhnValidator();
assertEquals(lv.sanitize("4532-0151 1283.0366"), "4532015112830366");`,
        },
        {
          name: "getCheckDigit finds correct digit",
          code: `const lv = new LuhnValidator();
// "453201511283036" + placeholder 0 — correct check digit is 6
const d = lv.getCheckDigit("4532015112830360");
assertEquals(d, 6);`,
        },
      ],
      hints: [
        "Work from right to left. Index 0 is the check digit (rightmost), index 1 is doubled, index 3 is doubled, etc.",
        "After doubling, if the result is 10 or more (e.g., 16), subtract 9 to get 7 — this is equivalent to summing the two digits.",
        "For `getCheckDigit`, try all 10 possible last digits (0–9) and return the first one that makes `isValid` return true.",
      ],
    },
    {
      slug: "form-state-reducer",
      title: "Form-State Reducer",
      blurb: "React-style state machine for multi-field forms — pure functions only.",
      xp: 50,
      language: "js",
      content: `## What you're building

A pure-function \`formReducer\` that manages the state of a multi-field form — the same pattern React Hook Form, Redux Form, and custom \`useReducer\` hooks use under the hood.

## Requirements

Implement \`formReducer(state, action)\` that handles these action types:

| Action type | Payload | Effect |
|---|---|---|
| \`SET_FIELD\` | \`{ field, value }\` | Update \`state.values[field]\` |
| \`SET_ERROR\` | \`{ field, error }\` | Set \`state.errors[field]\` |
| \`CLEAR_ERROR\` | \`{ field }\` | Delete \`state.errors[field]\` |
| \`SUBMIT\` | — | Set \`state.submitting = true\`, \`state.submitted = false\` |
| \`SUBMIT_SUCCESS\` | — | Set \`state.submitting = false\`, \`state.submitted = true\` |
| \`RESET\` | — | Return a fresh initial state |

Initial state shape:
\`\`\`js
{ values: {}, errors: {}, submitting: false, submitted: false }
\`\`\`

Also export \`initialState\` as a named const with that shape.

**Pure functions only** — never mutate the incoming state object. Return a new object each time.

## Stretch goals

- Add a \`SUBMIT_FAILURE\` action that sets \`submitting: false\` and records a top-level \`submitError\` string.
- Add a \`SET_FIELDS\` bulk action that merges multiple fields at once.
- Write a \`selectHasErrors\` selector that returns \`true\` when \`errors\` has any keys.

## What this proves

Reducer pattern, immutability, and action-based state management — the same mental model used in Redux, Zustand, and React's \`useReducer\`. Every senior frontend role expects this.`,
      starterCode: `const initialState = {
  values: {},
  errors: {},
  submitting: false,
  submitted: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      // Return new state with values[field] = value
      // TODO: implement
      return state;

    case "SET_ERROR":
      // Return new state with errors[field] = error
      // TODO: implement
      return state;

    case "CLEAR_ERROR": {
      // Return new state without errors[field]
      // TODO: implement
      return state;
    }

    case "SUBMIT":
      // Return new state with submitting: true, submitted: false
      // TODO: implement
      return state;

    case "SUBMIT_SUCCESS":
      // Return new state with submitting: false, submitted: true
      // TODO: implement
      return state;

    case "RESET":
      // Return a fresh copy of initialState
      // TODO: implement
      return state;

    default:
      return state;
  }
}
`,
      solution: `const initialState = {
  values: {},
  errors: {},
  submitting: false,
  submitted: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, values: { ...state.values, [action.field]: action.value } };

    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };

    case "CLEAR_ERROR": {
      const { [action.field]: _removed, ...rest } = state.errors;
      return { ...state, errors: rest };
    }

    case "SUBMIT":
      return { ...state, submitting: true, submitted: false };

    case "SUBMIT_SUCCESS":
      return { ...state, submitting: false, submitted: true };

    case "RESET":
      return { values: {}, errors: {}, submitting: false, submitted: false };

    default:
      return state;
  }
}`,
      tests: [
        {
          name: "SET_FIELD updates value",
          code: `const s1 = formReducer(initialState, { type: "SET_FIELD", field: "email", value: "a@b.com" });
assertEquals(s1.values.email, "a@b.com");
// original state is not mutated
assertEquals(initialState.values.email, undefined);`,
        },
        {
          name: "SET_ERROR and CLEAR_ERROR work together",
          code: `const s1 = formReducer(initialState, { type: "SET_ERROR", field: "name", error: "Required" });
assertEquals(s1.errors.name, "Required");
const s2 = formReducer(s1, { type: "CLEAR_ERROR", field: "name" });
assertEquals(s2.errors.name, undefined);`,
        },
        {
          name: "SUBMIT sets submitting flag",
          code: `const s1 = formReducer(initialState, { type: "SUBMIT" });
assertEquals(s1.submitting, true);
assertEquals(s1.submitted, false);
const s2 = formReducer(s1, { type: "SUBMIT_SUCCESS" });
assertEquals(s2.submitting, false);
assertEquals(s2.submitted, true);`,
        },
        {
          name: "RESET returns clean state",
          code: `const dirty = formReducer(initialState, { type: "SET_FIELD", field: "x", value: "y" });
const s = formReducer(dirty, { type: "RESET" });
assertEquals(Object.keys(s.values).length, 0);
assertEquals(s.submitting, false);
assertEquals(s.submitted, false);`,
        },
      ],
      hints: [
        "Use spread syntax to copy state: `{ ...state, values: { ...state.values, [field]: value } }`. This avoids mutation.",
        "To delete a key immutably, destructure it out: `const { [field]: _gone, ...rest } = state.errors`.",
        "For RESET, return a brand-new object literal rather than a reference to `initialState` — otherwise callers could mutate your constant.",
      ],
    },
    {
      slug: "input-sanitizer",
      title: "Input Sanitizer",
      blurb: "Strip XSS, trim whitespace, and normalize user text before it touches your DB.",
      xp: 40,
      language: "js",
      content: `## What you're building

An \`InputSanitizer\` class that cleans raw user input before it enters your application — preventing XSS injection, enforcing length limits, and normalizing whitespace. This is the first line of defense for any web form.

## Requirements

- \`escapeHtml(str)\` — replace \`&\`, \`<\`, \`>\`, \`"\`, \`'\` with their HTML entities so the string is safe to render.
- \`stripTags(str)\` — remove all HTML/XML tags (anything matching \`<...>\`), leaving only the text content.
- \`normalizeWhitespace(str)\` — trim leading/trailing whitespace and collapse any internal runs of whitespace (spaces, tabs, newlines) into a single space.
- \`truncate(str, maxLength)\` — if the string exceeds \`maxLength\` characters, cut it and append \`"..."\` so the result is at most \`maxLength\` characters total (including the ellipsis).
- \`sanitize(str, options)\` — run the pipeline in order based on \`options\`:
  - \`options.escapeHtml\` (boolean) → apply \`escapeHtml\`
  - \`options.stripTags\` (boolean) → apply \`stripTags\`
  - \`options.normalizeWhitespace\` (boolean) → apply \`normalizeWhitespace\`
  - \`options.maxLength\` (number) → apply \`truncate\`

## Stretch goals

- Add a \`slugify(str)\` method that lowercases, replaces spaces with \`-\`, and strips non-alphanumeric characters (useful for URL slugs).
- Add a \`maskEmail(email)\` that turns \`"user@example.com"\` into \`"u***@example.com"\`.

## What this proves

String manipulation depth, security awareness, and composable utility design — the kind of utility library every team maintains.`,
      starterCode: `class InputSanitizer {
  escapeHtml(str) {
    // Replace & < > " ' with HTML entities
    // & → &amp;  < → &lt;  > → &gt;  " → &quot;  ' → &#39;
    // TODO: implement
    return str;
  }

  stripTags(str) {
    // Remove anything matching <...> (non-greedy)
    // TODO: implement
    return str;
  }

  normalizeWhitespace(str) {
    // Trim ends, collapse internal whitespace runs to single space
    // TODO: implement
    return str;
  }

  truncate(str, maxLength) {
    // If str.length <= maxLength return as-is.
    // Otherwise return str.slice(0, maxLength - 3) + "..."
    // TODO: implement
    return str;
  }

  sanitize(str, options = {}) {
    // Apply each transformation if the option is truthy, in order:
    // stripTags → escapeHtml → normalizeWhitespace → truncate(maxLength)
    // TODO: implement
    return str;
  }
}
`,
      solution: `class InputSanitizer {
  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  stripTags(str) {
    return str.replace(/<[^>]*>/g, "");
  }

  normalizeWhitespace(str) {
    return str.trim().replace(/\\s+/g, " ");
  }

  truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + "...";
  }

  sanitize(str, options = {}) {
    let result = str;
    if (options.stripTags) result = this.stripTags(result);
    if (options.escapeHtml) result = this.escapeHtml(result);
    if (options.normalizeWhitespace) result = this.normalizeWhitespace(result);
    if (options.maxLength) result = this.truncate(result, options.maxLength);
    return result;
  }
}`,
      tests: [
        {
          name: "escapeHtml encodes all five characters",
          code: `const s = new InputSanitizer();
assertEquals(s.escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
assertEquals(s.escapeHtml("it's & fine"), "it&#39;s &amp; fine");`,
        },
        {
          name: "stripTags removes HTML tags",
          code: `const s = new InputSanitizer();
assertEquals(s.stripTags("<b>Hello</b> <i>world</i>"), "Hello world");
assertEquals(s.stripTags("no tags here"), "no tags here");`,
        },
        {
          name: "normalizeWhitespace collapses spaces",
          code: `const s = new InputSanitizer();
assertEquals(s.normalizeWhitespace("  hello   world  "), "hello world");
assertEquals(s.normalizeWhitespace("\\t tabs \\n and\\nnewlines  "), "tabs and newlines");`,
        },
        {
          name: "truncate shortens to maxLength",
          code: `const s = new InputSanitizer();
assertEquals(s.truncate("Hello, world!", 10), "Hello, ...");
assertEquals(s.truncate("Short", 10), "Short");`,
        },
      ],
      hints: [
        "For `escapeHtml`, chain `.replace()` calls — start with `&` before replacing `<` and `>`, otherwise you'll double-encode your own entities.",
        "For `stripTags`, use `/<[^>]*>/g` — the `[^>]*` is non-greedy-safe because it stops at the first `>`.",
        "For `truncate`, remember the ellipsis itself takes 3 characters, so cut at `maxLength - 3`.",
      ],
    },
    {
      slug: "schema-validator",
      title: "Schema Validator",
      blurb: "Roll your own Zod-lite — validate objects against a typed field schema.",
      xp: 60,
      language: "js",
      content: `## What you're building

A \`SchemaValidator\` that accepts a schema definition and validates plain objects against it — the core concept behind Zod, Yup, Joi, and JSON Schema. You'll implement type checking, required/optional fields, min/max constraints, and collect structured errors.

## Requirements

Implement \`SchemaValidator\` with a constructor that takes a \`schema\` object, and a \`validate(data)\` method that returns \`{ ok: boolean, errors: { [field]: string } }\`.

Schema field descriptors:

| Property | Type | Meaning |
|---|---|---|
| \`type\` | \`"string"\` or \`"number"\` | The expected JS type |
| \`required\` | boolean | If true and the field is missing or empty string, add an error |
| \`min\` | number | For strings: minimum length. For numbers: minimum value |
| \`max\` | number | For strings: maximum length. For numbers: maximum value |

Rules:
- A field that is \`undefined\` AND \`required: false\` (or \`required\` omitted) has no error.
- For strings, \`min\`/\`max\` check \`value.length\`.
- For numbers, \`min\`/\`max\` check the numeric value.
- \`ok\` is \`true\` when \`errors\` has zero keys.

Example schema:
\`\`\`js
const schema = {
  email:  { type: "string", required: true, min: 5 },
  age:    { type: "number", required: true, min: 18, max: 120 },
  bio:    { type: "string", required: false, max: 200 },
};
\`\`\`

## Stretch goals

- Support a \`pattern\` property (RegExp) that the string must match.
- Support an \`enum\` property (array) — the value must be one of the listed values.
- Support nested schemas via a \`shape\` property for object fields.

## What this proves

Algorithmic thinking, working from a spec, and building composable abstractions — the exact skills tested in full-stack and backend interviews. A custom schema validator is also a standout portfolio piece.`,
      starterCode: `class SchemaValidator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const errors = {};

    for (const field of Object.keys(this.schema)) {
      const rule = this.schema[field];
      const value = data[field];

      // 1. Required check: if required and value is undefined or empty string → error
      // TODO: implement

      // Skip further checks if the field is absent and not required
      if (value === undefined || value === null) continue;

      // 2. Type check: value's typeof must match rule.type
      // TODO: implement

      // 3. Min check: string → length, number → value
      // TODO: implement

      // 4. Max check: string → length, number → value
      // TODO: implement
    }

    return { ok: Object.keys(errors).length === 0, errors };
  }
}
`,
      solution: `class SchemaValidator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const errors = {};

    for (const field of Object.keys(this.schema)) {
      const rule = this.schema[field];
      const value = data[field];

      // Required check
      if (rule.required && (value === undefined || value === null || value === "")) {
        errors[field] = field + " is required";
        continue;
      }

      // Skip absent optional fields
      if (value === undefined || value === null) continue;

      // Type check
      if (typeof value !== rule.type) {
        errors[field] = field + " must be a " + rule.type;
        continue;
      }

      // Min check
      if (rule.min !== undefined) {
        const measure = rule.type === "string" ? value.length : value;
        if (measure < rule.min) {
          errors[field] = rule.type === "string"
            ? field + " must be at least " + rule.min + " characters"
            : field + " must be at least " + rule.min;
        }
      }

      // Max check
      if (rule.max !== undefined) {
        const measure = rule.type === "string" ? value.length : value;
        if (measure > rule.max) {
          errors[field] = rule.type === "string"
            ? field + " must be at most " + rule.max + " characters"
            : field + " must be at most " + rule.max;
        }
      }
    }

    return { ok: Object.keys(errors).length === 0, errors };
  }
}`,
      tests: [
        {
          name: "valid data passes with ok: true",
          code: `const v = new SchemaValidator({
  name: { type: "string", required: true, min: 2, max: 50 },
  age:  { type: "number", required: true, min: 0, max: 150 },
});
const result = v.validate({ name: "Alice", age: 30 });
assertEquals(result.ok, true);
assertEquals(Object.keys(result.errors).length, 0);`,
        },
        {
          name: "required field missing produces error",
          code: `const v = new SchemaValidator({
  email: { type: "string", required: true },
});
const result = v.validate({});
assertEquals(result.ok, false);
assert(result.errors.email !== undefined, "expected an error for email");`,
        },
        {
          name: "number out of range produces error",
          code: `const v = new SchemaValidator({
  age: { type: "number", required: true, min: 18, max: 120 },
});
const tooYoung = v.validate({ age: 15 });
assertEquals(tooYoung.ok, false);
assert(tooYoung.errors.age !== undefined, "expected age error for 15");
const tooOld = v.validate({ age: 200 });
assertEquals(tooOld.ok, false);`,
        },
        {
          name: "optional absent field is allowed",
          code: `const v = new SchemaValidator({
  name:  { type: "string", required: true },
  notes: { type: "string", required: false, max: 100 },
});
const result = v.validate({ name: "Bob" });
assertEquals(result.ok, true);`,
        },
      ],
      hints: [
        "Loop over `Object.keys(this.schema)` to process each declared field. The `data` object may have extra fields — ignore them.",
        "Use `continue` after adding a required-field error so you don't also emit a type error for the missing value.",
        "For min/max, compute `measure` once based on the type: `rule.type === 'string' ? value.length : value`.",
      ],
    },
  ],
};
