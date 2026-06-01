import type { Module } from "./types";

export const webApis: Module = {
  slug: "web-apis",
  title: "Web & APIs",
  description:
    "The building blocks of every backend: query strings, routes, status codes, JSON responses, validation, and pagination.",
  emoji: "🌐",
  gradient: "from-emerald-400/20 to-teal-500/10",
  tagline:
    "Learn how web APIs work: HTTP status codes, routing, JSON responses, request validation, and pagination.",
  keywords: ["rest api", "http", "backend basics", "build an api"],
  lessons: [
    {
      slug: "query-strings",
      title: "Parsing Query Strings",
      blurb: "Turn ?a=1&b=2 into an object.",
      xp: 30,
      content: `# Parsing Query Strings

A URL's query string carries parameters: \`a=1&b=2\`. Servers parse it into a
lookup object so handlers can read values.

\`\`\`js
"a=1&b=2" → { a: "1", b: "2" }
\`\`\`

## Your task
Write \`parseQuery(qs)\` that splits a query string on \`&\`, then each pair on
\`=\`, and returns an object of \`key: value\` strings. An empty string returns
an empty object \`{}\`.`,
      starterCode: `function parseQuery(qs) {
  // return an object of key: value pairs
}
`,
      solution: `function parseQuery(qs) {
  if (!qs) return {};
  const result = {};
  for (const pair of qs.split("&")) {
    const [key, value] = pair.split("=");
    result[key] = value;
  }
  return result;
}`,
      tests: [
        {
          name: 'parseQuery("a=1&b=2")',
          code: `assertEquals(parseQuery("a=1&b=2"), { a: "1", b: "2" });`,
        },
        { name: 'parseQuery("") → {}', code: `assertEquals(parseQuery(""), {});` },
        {
          name: "single pair",
          code: `assertEquals(parseQuery("q=boots"), { q: "boots" });`,
        },
      ],
    },
    {
      slug: "status-codes",
      title: "HTTP Status Codes",
      blurb: "200 OK, 404 Not Found, 500…",
      xp: 25,
      content: `# HTTP Status Codes

Every HTTP response carries a status code. The classics:

- \`200\` → \`"OK"\`
- \`201\` → \`"Created"\`
- \`404\` → \`"Not Found"\`
- \`500\` → \`"Internal Server Error"\`

## Your task
Write \`statusText(code)\` that returns the text above for those codes, and
\`"Unknown"\` for anything else.`,
      starterCode: `function statusText(code) {
  // map the code to its text, or "Unknown"
}
`,
      solution: `function statusText(code) {
  const map = {
    200: "OK",
    201: "Created",
    404: "Not Found",
    500: "Internal Server Error",
  };
  return map[code] || "Unknown";
}`,
      tests: [
        { name: "200 → OK", code: `assertEquals(statusText(200), "OK");` },
        { name: "404 → Not Found", code: `assertEquals(statusText(404), "Not Found");` },
        { name: "500 → Internal Server Error", code: `assertEquals(statusText(500), "Internal Server Error");` },
        { name: "999 → Unknown", code: `assertEquals(statusText(999), "Unknown");` },
      ],
    },
    {
      slug: "json-response",
      title: "Building a JSON Response",
      blurb: "Shape a real API response.",
      xp: 30,
      content: `# Building a JSON Response

An API response bundles a status, headers, and a serialized body.

## Your task
Write \`jsonResponse(status, data)\` that returns an object shaped exactly like:

\`\`\`js
{
  status: status,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}
\`\`\``,
      starterCode: `function jsonResponse(status, data) {
  // return the response object described above
}
`,
      solution: `function jsonResponse(status, data) {
  return {
    status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}`,
      tests: [
        {
          name: "builds a 200 JSON response",
          code: `assertEquals(jsonResponse(200, { ok: true }), { status: 200, headers: { "Content-Type": "application/json" }, body: '{"ok":true}' });`,
        },
        {
          name: "serializes the body",
          code: `assertEquals(jsonResponse(404, { error: "nope" }).body, '{"error":"nope"}');`,
        },
      ],
    },
    {
      slug: "route-matching",
      title: "Route Matching",
      blurb: "Match /users/:id to /users/42.",
      xp: 40,
      content: `# Route Matching

Routers map a URL to a handler and pull out **path params**. A pattern like
\`/users/:id\` matched against \`/users/42\` should yield \`{ id: "42" }\`.

## Your task
Write \`matchRoute(pattern, path)\`. Split both on \`/\`. If they have different
lengths, return \`null\`. Walk the segments: a \`:name\` segment captures that part
as a param; a literal segment must match exactly or it's \`null\`. Return the
collected params object on success.`,
      starterCode: `function matchRoute(pattern, path) {
  // return a params object, or null if the path doesn't match
}
`,
      solution: `function matchRoute(pattern, path) {
  const p = pattern.split("/");
  const x = path.split("/");
  if (p.length !== x.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(":")) {
      params[p[i].slice(1)] = x[i];
    } else if (p[i] !== x[i]) {
      return null;
    }
  }
  return params;
}`,
      tests: [
        {
          name: "captures a param",
          code: `assertEquals(matchRoute("/users/:id", "/users/42"), { id: "42" });`,
        },
        {
          name: "two params",
          code: `assertEquals(matchRoute("/u/:user/p/:post", "/u/ada/p/7"), { user: "ada", post: "7" });`,
        },
        {
          name: "no match → null",
          code: `assertEquals(matchRoute("/a", "/b"), null);`,
        },
        {
          name: "length mismatch → null",
          code: `assertEquals(matchRoute("/users/:id", "/users/42/posts"), null);`,
        },
      ],
    },
    {
      slug: "validation",
      title: "Validating Requests",
      blurb: "Reject bad input early.",
      xp: 35,
      content: `# Validating Requests

Before handling a request, APIs check that required fields are present (and not
empty). Returning the list of missing fields lets the client fix its request.

## Your task
Write \`validateUser(body)\` that checks for the required fields \`"name"\` and
\`"email"\`. Return an array of the field names that are **missing or empty**
(empty string counts as missing). If everything is present, return \`[]\`.`,
      starterCode: `function validateUser(body) {
  // return an array of missing/empty required field names
}
`,
      solution: `function validateUser(body) {
  const required = ["name", "email"];
  return required.filter((field) => !body[field]);
}`,
      tests: [
        {
          name: "all present → []",
          code: `assertEquals(validateUser({ name: "Ada", email: "a@b.com" }), []);`,
        },
        {
          name: "missing email",
          code: `assertEquals(validateUser({ name: "Ada" }), ["email"]);`,
        },
        {
          name: "empty string counts as missing",
          code: `assertEquals(validateUser({ name: "", email: "" }), ["name", "email"]);`,
        },
      ],
    },
    {
      slug: "pagination",
      title: "Pagination",
      blurb: "Serve results one page at a time.",
      xp: 35,
      content: `# Pagination

APIs return large lists in **pages** so responses stay small and fast. Given a
1-based \`page\` number and a \`perPage\` size, return just that slice.

\`\`\`js
paginate([1,2,3,4,5], 1, 2) → [1, 2]
paginate([1,2,3,4,5], 3, 2) → [5]
\`\`\`

## Your task
Write \`paginate(items, page, perPage)\` that returns the correct slice for the
given 1-based page.`,
      starterCode: `function paginate(items, page, perPage) {
  // return the slice of items for this 1-based page
}
`,
      solution: `function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}`,
      tests: [
        { name: "first page", code: `assertEquals(paginate([1, 2, 3, 4, 5], 1, 2), [1, 2]);` },
        { name: "middle page", code: `assertEquals(paginate([1, 2, 3, 4, 5], 2, 2), [3, 4]);` },
        { name: "last partial page", code: `assertEquals(paginate([1, 2, 3, 4, 5], 3, 2), [5]);` },
      ],
    },
  ],
};
