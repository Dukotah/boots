import type { Module } from "./types";

// HTTP & REST — concept + quiz module covering the protocol every web dev needs.
export const httpAndRest: Module = {
  slug: "http-and-rest",
  title: "HTTP & REST",
  description:
    "Understand how the web works under the hood: HTTP methods, status codes, headers, JSON APIs, REST principles, and the request/response lifecycle every developer must know.",
  emoji: "🌐",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline:
    "Learn HTTP and REST APIs: methods, status codes, headers, CRUD, REST principles, and API design.",
  keywords: [
    "http methods",
    "rest api",
    "http status codes",
    "http headers",
    "api design",
    "web fundamentals",
  ],
  lessons: [
    {
      slug: "request-response",
      title: "The Request-Response Cycle",
      blurb: "How a browser talks to a server.",
      xp: 25,
      kind: "quiz",
      content: `# The Request-Response Cycle

Every web interaction follows the same pattern:

1. The **client** (browser, app) sends an **HTTP request** to a server.
2. The **server** processes it and sends back an **HTTP response**.

An HTTP request contains:
- A **method** (GET, POST, …) — what to do
- A **URL** — where to do it
- **Headers** — metadata (content type, auth tokens, …)
- An optional **body** — data for POST/PUT/PATCH

A response contains:
- A **status code** — what happened (200 OK, 404 Not Found, …)
- **Headers** — metadata about the response
- An optional **body** — the data you asked for (usually JSON)`,
      questions: [
        {
          prompt: "Which part of the HTTP response tells you whether the request succeeded?",
          options: ["The URL", "The status code", "The request body", "The cookie header"],
          answer: 1,
          explanation: "The status code (e.g. 200, 404, 500) is the machine-readable summary of what happened.",
        },
        {
          prompt: "A client wants to fetch a webpage. Which HTTP method should it use?",
          options: ["POST", "DELETE", "GET", "PATCH"],
          answer: 2,
          explanation: "GET is used to retrieve a resource. It should not change any server state.",
        },
        {
          prompt: "Where does a JSON API usually put the data it returns?",
          options: ["The request URL", "The response header", "The response body", "The cookie"],
          answer: 2,
          explanation: "The response body carries the payload — typically JSON for modern APIs.",
        },
      ],
    },
    {
      slug: "http-methods",
      title: "HTTP Methods",
      blurb: "GET, POST, PUT, PATCH, DELETE — what each one means.",
      xp: 30,
      kind: "quiz",
      content: `# HTTP Methods

HTTP methods describe the **intent** of a request:

| Method | Intent | Body? |
|--------|--------|-------|
| GET | Retrieve a resource | No |
| POST | Create a new resource | Yes |
| PUT | Replace a resource entirely | Yes |
| PATCH | Update part of a resource | Yes |
| DELETE | Remove a resource | No |

REST APIs map these methods to **CRUD** operations:
- **C**reate → POST
- **R**ead → GET
- **U**pdate → PUT / PATCH
- **D**elete → DELETE`,
      questions: [
        {
          prompt: "You want to create a new blog post on a REST API. Which method do you use?",
          options: ["GET", "POST", "DELETE", "PUT"],
          answer: 1,
          explanation: "POST creates a new resource. The response usually includes the newly created item and a 201 status.",
        },
        {
          prompt: "Which method is safe to call multiple times without changing the result after the first call? (This is called 'idempotent'.)",
          options: ["POST", "PATCH", "PUT", "GET"],
          answer: 2,
          explanation: "PUT is idempotent — replacing a resource with the same data repeatedly leaves the server in the same state. POST creates a new resource each time, so it is not idempotent.",
        },
        {
          prompt: "You need to update just the `email` field of a user record. Which method is most appropriate?",
          options: ["GET", "PUT", "PATCH", "DELETE"],
          answer: 2,
          explanation: "PATCH partially updates a resource. PUT replaces the entire resource — you'd have to send all fields.",
        },
        {
          prompt: "Which HTTP method should NOT include a request body by convention?",
          options: ["POST", "PUT", "GET", "PATCH"],
          answer: 2,
          explanation: "GET requests should be side-effect-free and typically have no body. Data is passed via URL query parameters instead.",
        },
      ],
    },
    {
      slug: "status-codes",
      title: "Status Codes",
      blurb: "What 200, 201, 400, 401, 403, 404, and 500 mean.",
      xp: 30,
      kind: "quiz",
      content: `# Status Codes

Status codes are grouped by their first digit:

| Range | Meaning | Examples |
|-------|---------|---------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirect | 301 Moved Permanently, 302 Found |
| 4xx | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Server error | 500 Internal Server Error, 503 Service Unavailable |

**Key ones to memorise:**
- **200** — all good, body has the data
- **201** — resource created (after POST)
- **400** — your request was malformed
- **401** — you need to authenticate first
- **403** — you are authenticated but not allowed
- **404** — resource not found
- **500** — the server blew up (not your fault)`,
      questions: [
        {
          prompt: "You call a REST API and get a 401. What does that mean?",
          options: [
            "The resource was not found",
            "The server crashed",
            "You need to log in / provide credentials",
            "Your request body was malformed",
          ],
          answer: 2,
          explanation: "401 Unauthorized means authentication is required. You're not logged in (or your token is missing/expired).",
        },
        {
          prompt: "A POST request to create a new user succeeds. Which status code should the API return?",
          options: ["200", "201", "204", "400"],
          answer: 1,
          explanation: "201 Created signals that the request succeeded and a new resource was created — more precise than 200 OK.",
        },
        {
          prompt: "You are logged in but your account doesn't have permission to delete a post. What status code do you expect?",
          options: ["401", "403", "404", "500"],
          answer: 1,
          explanation: "403 Forbidden means you are authenticated but do not have permission. 401 means you aren't authenticated at all.",
        },
        {
          prompt: "The API returns 500. Who is most likely responsible?",
          options: ["The client — bad URL", "The client — missing auth token", "The server — something crashed on the backend", "The network — DNS failure"],
          answer: 2,
          explanation: "5xx errors are server-side. 4xx errors are client-side. A 500 means the server threw an unhandled error.",
        },
      ],
    },
    {
      slug: "headers",
      title: "Headers",
      blurb: "Metadata that travels with every request and response.",
      xp: 25,
      kind: "quiz",
      content: `# Headers

**Headers** are key-value pairs that carry metadata alongside requests and responses.

Common **request headers:**
- \`Content-Type: application/json\` — the body is JSON
- \`Authorization: Bearer <token>\` — how you authenticate
- \`Accept: application/json\` — what formats you understand

Common **response headers:**
- \`Content-Type: application/json\` — the body is JSON
- \`Cache-Control: max-age=3600\` — cache this for 1 hour
- \`Set-Cookie: session=abc\` — store this cookie

The \`Content-Type\` header is critical: if you forget it on a POST with a JSON
body, many servers will reject or misparse the request.`,
      questions: [
        {
          prompt: "You're sending a POST request with a JSON body. Which header must you set?",
          options: [
            "Authorization: Bearer token",
            "Accept: text/html",
            "Content-Type: application/json",
            "Cache-Control: no-cache",
          ],
          answer: 2,
          explanation: "Content-Type tells the server how to parse the body. Without it, the server may ignore or misparse your JSON.",
        },
        {
          prompt: "Where do you put an API bearer token in an HTTP request?",
          options: ["The URL path", "The response body", "The Authorization header", "The Content-Type header"],
          answer: 2,
          explanation: "Bearer tokens go in the Authorization header: `Authorization: Bearer <token>`.",
        },
      ],
    },
    {
      slug: "rest-principles",
      title: "REST Principles",
      blurb: "What makes an API truly RESTful.",
      xp: 30,
      kind: "quiz",
      content: `# REST Principles

**REST** (Representational State Transfer) is an architectural style for APIs.
A RESTful API follows these constraints:

1. **Stateless** — every request contains all information needed; the server
   keeps no session between requests.
2. **Resource-based URLs** — URLs identify resources (nouns), not actions.
   - ✅ \`GET /users/42\`
   - ❌ \`GET /getUser?id=42\`
3. **HTTP methods for actions** — use GET/POST/PUT/PATCH/DELETE semantically.
4. **Uniform interface** — consistent, predictable structure.
5. **JSON bodies** — the dominant format for modern REST APIs.

**URL design rules:**
- Collections: \`/users\` (plural noun)
- Single resource: \`/users/42\`
- Nested: \`/users/42/posts\`
- No verbs in paths: \`/deleteUser\` is not RESTful`,
      questions: [
        {
          prompt: "Which URL design follows REST conventions?",
          options: [
            "/getUserById?id=5",
            "/user/delete/5",
            "/users/5",
            "/fetchUser",
          ],
          answer: 2,
          explanation: "`/users/5` uses a noun + resource ID. REST uses HTTP methods (DELETE) for the action, not the URL.",
        },
        {
          prompt: "A REST API is 'stateless'. What does this mean?",
          options: [
            "It never returns errors",
            "Each request must contain all the info needed; no server-side sessions",
            "It only uses GET requests",
            "It stores data in the URL",
          ],
          answer: 1,
          explanation: "Stateless means the server doesn't remember previous requests. Auth tokens, IDs, and context travel in every request.",
        },
        {
          prompt: "To delete user #7, a REST API should use:",
          options: [
            "GET /deleteUser/7",
            "POST /users/removeById",
            "DELETE /users/7",
            "PUT /users/7/delete",
          ],
          answer: 2,
          explanation: "DELETE /users/7 uses the correct HTTP method and resource URL — both are required for a RESTful design.",
        },
      ],
    },
    {
      slug: "json-apis",
      title: "Working with JSON APIs",
      blurb: "Fetch, parse, and handle real API responses in JS.",
      xp: 40,
      content: `# Working with JSON APIs

The browser's \`fetch\` API makes HTTP requests and returns Promises.

\`\`\`js
const res = await fetch("https://api.example.com/users/1");
if (!res.ok) throw new Error("Request failed: " + res.status);
const user = await res.json();
console.log(user.name);
\`\`\`

To **POST** JSON:

\`\`\`js
await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "World" }),
});
\`\`\`

## Your task
Write a function \`buildPostOptions(title, body)\` that returns the **options
object** you'd pass to \`fetch\` to POST JSON with those values.  It should have
\`method\`, \`headers\`, and \`body\` — no actual network call needed.`,
      starterCode: `function buildPostOptions(title, body) {
  // return { method, headers, body } for a JSON POST request
}
`,
      solution: `function buildPostOptions(title, body) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  };
}`,
      tests: [
        {
          name: "method is POST",
          code: `assertEquals(buildPostOptions("t","b").method, "POST");`,
        },
        {
          name: "Content-Type header is set",
          code: `assertEquals(buildPostOptions("t","b").headers["Content-Type"], "application/json");`,
        },
        {
          name: "body is JSON-stringified",
          code: `assertEquals(buildPostOptions("hello","world").body, JSON.stringify({title:"hello",body:"world"}));`,
        },
      ],
    },
  ],
};
