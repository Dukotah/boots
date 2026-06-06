import type { Module } from "./types";

// Node.js & Express — taught as JS. The in-browser Worker has no real Node
// runtime (no `require`, `fs`, `http`, or Express server), so the prose explains
// real Node/Express while every gradeable task is a pure-JS function modelling
// the concept — routers, middleware composition, status mapping — that we can
// assert on deterministically.
export const node: Module = {
  slug: "node",
  title: "Node.js & Express",
  description:
    "JavaScript on the server. Learn how Node runs JS outside the browser, how modules fit together, and how to build HTTP APIs with Express — hands-on and auto-graded.",
  emoji: "🟩",
  gradient: "from-green-500/20 to-emerald-500/10",
  language: "js",
  tagline:
    "Learn Node.js and Express: modules, the file system, HTTP servers, routing, middleware, and REST API design — hands-on and auto-graded.",
  keywords: ["learn node.js", "node tutorial", "express tutorial", "rest api", "backend javascript"],
  lessons: [
    {
      slug: "what-is-node",
      title: "What is Node.js?",
      blurb: "JavaScript outside the browser, and why it scales.",
      xp: 25,
      kind: "quiz",
      content: `# What is Node.js?

**Node.js** is a runtime that lets you run JavaScript *outside* the browser —
on servers, build tools, and command-line apps. It bundles Google's V8 engine
(the same one in Chrome) with APIs for things browsers can't do: reading files,
opening network sockets, and talking to databases.

\`\`\`js
const http = require("http");

http.createServer((req, res) => {
  res.end("Hello from Node!");
}).listen(3000);
\`\`\`

**What makes Node distinctive:**
- **One language, both sides** — you write JavaScript on the server *and* the
  client, sharing code and mental models.
- **Non-blocking I/O** — Node uses a single-threaded **event loop**. Instead of
  blocking a thread while waiting for a file or network response, it registers a
  callback and moves on, then resumes when the result is ready. This lets one
  process handle thousands of concurrent connections efficiently.
- **A huge ecosystem** — \`npm\` is the largest package registry in the world, so
  most problems already have a battle-tested library.

Node is ideal for I/O-heavy work like web APIs and real-time apps. It's *less*
suited to long, CPU-bound number crunching, which would block that single event
loop.`,
      questions: [
        {
          prompt: "What does Node.js let you do that a browser cannot?",
          options: [
            "Render HTML to the screen",
            "Run JavaScript on a server and access files, sockets, and databases",
            "Style pages with CSS",
            "Animate elements with the DOM",
          ],
          answer: 1,
          explanation:
            "Node runs JavaScript outside the browser with access to the file system, network, and OS — capabilities the browser sandbox deliberately withholds.",
        },
        {
          prompt: "How does Node handle many simultaneous connections efficiently?",
          options: [
            "It spawns one operating-system thread per connection",
            "It uses a single-threaded, non-blocking event loop with callbacks",
            "It blocks until each request fully finishes before starting the next",
            "It compiles each request to a separate program",
          ],
          answer: 1,
          explanation:
            "Node uses a non-blocking event loop: while waiting on I/O it registers a callback and keeps serving other work, so one thread handles many concurrent connections.",
        },
        {
          prompt: "Which workload is Node.js LEAST suited for out of the box?",
          options: [
            "A JSON REST API",
            "A real-time chat server",
            "Long, CPU-bound number crunching",
            "A tool that reads and transforms files",
          ],
          answer: 2,
          explanation:
            "Heavy CPU-bound work blocks the single event loop and stalls every other request. Node shines at I/O-bound work, not sustained number crunching.",
        },
      ],
    },
    {
      slug: "modules-and-require",
      title: "Modules & require",
      blurb: "Split code into files and share values between them.",
      xp: 35,
      content: `# Modules & require

Node splits programs into **modules** — one file per module. A file exposes
values by assigning to \`module.exports\`, and another file pulls them in with
\`require\`.

\`\`\`js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require("./math");
add(2, 3); // 5
\`\`\`

Whatever you put on \`module.exports\` is exactly what \`require\` returns. This is
how you keep code organised and reusable instead of cramming everything into one
giant file. (Modern Node also supports the \`import\`/\`export\` ES-module syntax,
but the export-an-object idea is the same.)

To practise the *shape* of a module export without a real \`require\`, build the
exports object yourself.

## Your task
Write \`createMathModule()\` that returns an object with two methods: \`add(a, b)\`
(returns their sum) and \`sub(a, b)\` (returns their difference). This is the object
a \`math.js\` file would assign to \`module.exports\`.`,
      starterCode: `function createMathModule() {
  // return { add, sub }
}
`,
      solution: `function createMathModule() {
  return {
    add(a, b) {
      return a + b;
    },
    sub(a, b) {
      return a - b;
    },
  };
}`,
      tests: [
        {
          name: "exports add",
          code: `assertEquals(createMathModule().add(2, 3), 5);`,
        },
        {
          name: "exports sub",
          code: `assertEquals(createMathModule().sub(10, 4), 6);`,
        },
      ],
    },
    {
      slug: "file-system",
      title: "File System",
      blurb: "Read and parse files with the fs module.",
      xp: 35,
      content: `# File System

Node's built-in **\`fs\`** module reads and writes files — something browsers can't
do. A common task is reading a JSON config file and turning its text into a usable
object.

\`\`\`js
const fs = require("fs");

const text = fs.readFileSync("config.json", "utf8"); // a string
const config = JSON.parse(text);                     // an object
config.port; // 3000
\`\`\`

\`fs.readFileSync\` hands you the file's *contents as a string*; \`JSON.parse\` turns
that string into a real JavaScript value. The parsing step — string in, object
out — is the part we can model purely.

## Your task
Write \`loadConfig(text)\` that takes the raw JSON **string** a file read would
return, parses it, and returns the value of its \`port\` field. For example
\`loadConfig('{"port": 3000}')\` returns \`3000\`.`,
      starterCode: `function loadConfig(text) {
  // parse the JSON string and return its port field
}
`,
      solution: `function loadConfig(text) {
  const config = JSON.parse(text);
  return config.port;
}`,
      tests: [
        {
          name: "reads port 3000",
          code: `assertEquals(loadConfig('{"port": 3000}'), 3000);`,
        },
        {
          name: "reads a different port",
          code: `assertEquals(loadConfig('{"port": 8080, "host": "localhost"}'), 8080);`,
        },
      ],
    },
    {
      slug: "http-servers",
      title: "HTTP Servers",
      blurb: "Respond to requests with the http module.",
      xp: 40,
      content: `# HTTP Servers

Node's **\`http\`** module can create a web server with no framework at all. You
give \`createServer\` a function that runs for every incoming request, receiving a
\`request\` and a \`response\`.

\`\`\`js
const http = require("http");

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
}).listen(3000);
\`\`\`

The handler's job is to look at the request and produce a response. We can model
that handler as a pure function: given a request object, return the response body.

## Your task
Write \`handleRequest(req)\` where \`req\` is \`{ url }\`. Return \`"home"\` when the url
is \`"/"\`, \`"about"\` when it's \`"/about"\`, and \`"not found"\` for anything else.`,
      starterCode: `function handleRequest(req) {
  // return a response body based on req.url
}
`,
      solution: `function handleRequest(req) {
  if (req.url === "/") return "home";
  if (req.url === "/about") return "about";
  return "not found";
}`,
      tests: [
        { name: "root → home", code: `assertEquals(handleRequest({ url: "/" }), "home");` },
        { name: "/about → about", code: `assertEquals(handleRequest({ url: "/about" }), "about");` },
        { name: "unknown → not found", code: `assertEquals(handleRequest({ url: "/xyz" }), "not found");` },
      ],
    },
    {
      slug: "express-basics",
      title: "Express Basics",
      blurb: "A friendlier layer over the raw http module.",
      xp: 35,
      content: `# Express Basics

Writing raw \`http\` servers gets verbose fast. **Express** is the most popular
Node web framework — it wraps \`http\` with a clean API for routing and responses.

\`\`\`js
const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.listen(3000);
\`\`\`

\`app.get(path, handler)\` registers a handler for GET requests to that path. A
real Express app stores these registrations and looks them up when a request
arrives. We can model that registry: register handlers, then dispatch by path.

## Your task
Write \`createApp()\` that returns an object with:
- \`get(path, handler)\` — stores the handler for that path.
- \`handle(path)\` — calls the stored handler for \`path\` and returns its result, or
  returns \`"404"\` if no handler was registered for that path.`,
      starterCode: `function createApp() {
  // keep a map of path → handler; support get() and handle()
}
`,
      solution: `function createApp() {
  const routes = {};
  return {
    get(path, handler) {
      routes[path] = handler;
    },
    handle(path) {
      const handler = routes[path];
      return handler ? handler() : "404";
    },
  };
}`,
      tests: [
        {
          name: "dispatches a registered route",
          code: `const app = createApp();
app.get("/hello", () => "Hello!");
assertEquals(app.handle("/hello"), "Hello!");`,
        },
        {
          name: "unknown path → 404",
          code: `const app = createApp();
assertEquals(app.handle("/missing"), "404");`,
        },
      ],
    },
    {
      slug: "routing",
      title: "Routing",
      howToTitle: "set up Express routing",
      blurb: "Map method + path to the right handler.",
      xp: 40,
      content: `# Routing

**Routing** decides which handler runs for a given request. In Express a route is
the combination of an HTTP **method** (\`GET\`, \`POST\`, …) and a **path**:

\`\`\`js
app.get("/users", listUsers);
app.post("/users", createUser);
app.get("/users/:id", getUser);
\`\`\`

\`GET /users\` and \`POST /users\` share a path but run *different* handlers, so the
router must key on both method and path together. We'll model exactly that lookup.

## Your task
Write \`route(method, path)\` that returns a handler name string for these routes:
- \`GET /users\` → \`"listUsers"\`
- \`POST /users\` → \`"createUser"\`
- \`GET /health\` → \`"healthCheck"\`

Anything else returns \`"notFound"\`.`,
      starterCode: `function route(method, path) {
  // map method + path to a handler name
}
`,
      solution: `function route(method, path) {
  const key = method + " " + path;
  const table = {
    "GET /users": "listUsers",
    "POST /users": "createUser",
    "GET /health": "healthCheck",
  };
  return table[key] || "notFound";
}`,
      tests: [
        { name: "GET /users", code: `assertEquals(route("GET", "/users"), "listUsers");` },
        { name: "POST /users", code: `assertEquals(route("POST", "/users"), "createUser");` },
        { name: "GET /health", code: `assertEquals(route("GET", "/health"), "healthCheck");` },
        { name: "unknown route", code: `assertEquals(route("DELETE", "/users"), "notFound");` },
      ],
    },
    {
      slug: "middleware",
      title: "Middleware",
      howToTitle: "write Express middleware",
      blurb: "Compose functions that transform a request in turn.",
      xp: 40,
      content: `# Middleware

**Middleware** is the heart of Express. Each middleware is a function that sees the
request, optionally modifies it, then passes control to the next one. Requests
flow through a *pipeline* of these functions before reaching the final handler.

\`\`\`js
app.use(logger);   // runs first
app.use(addUser);  // then this
app.get("/", handler); // finally the route
\`\`\`

Conceptually, the request value is threaded through each function in order — the
output of one becomes the input of the next. That's exactly **function
composition**, which we can implement directly.

## Your task
Write \`runMiddleware(req, middlewares)\` where \`middlewares\` is an array of
functions, each taking the request and returning a new (transformed) request.
Apply them **in order**, threading the result through, and return the final
request. With an empty array, return \`req\` unchanged.`,
      starterCode: `function runMiddleware(req, middlewares) {
  // apply each middleware in order, threading the request through
}
`,
      solution: `function runMiddleware(req, middlewares) {
  return middlewares.reduce((acc, mw) => mw(acc), req);
}`,
      tests: [
        {
          name: "threads through two middlewares",
          code: `const addAuth = (r) => ({ ...r, auth: true });
const addId = (r) => ({ ...r, id: 7 });
assertEquals(runMiddleware({ url: "/" }, [addAuth, addId]), { url: "/", auth: true, id: 7 });`,
        },
        {
          name: "order matters",
          code: `const inc = (r) => ({ ...r, n: r.n + 1 });
const dbl = (r) => ({ ...r, n: r.n * 2 });
assertEquals(runMiddleware({ n: 1 }, [inc, dbl]).n, 4);`,
        },
        {
          name: "empty pipeline returns req unchanged",
          code: `assertEquals(runMiddleware({ url: "/x" }, []), { url: "/x" });`,
        },
      ],
    },
    {
      slug: "rest-api-design",
      title: "REST API Design",
      blurb: "HTTP verbs, resources, and status codes.",
      xp: 30,
      kind: "quiz",
      content: `# REST API Design

A **REST** API models your data as **resources** addressed by URLs, and uses HTTP
**methods** to say what you want to do with them. The conventions are remarkably
consistent across the industry:

| Method   | Purpose                  | Example            |
|----------|--------------------------|--------------------|
| \`GET\`    | Read a resource          | \`GET /users/7\`     |
| \`POST\`   | Create a new resource    | \`POST /users\`      |
| \`PUT\`    | Replace a resource       | \`PUT /users/7\`     |
| \`DELETE\` | Remove a resource        | \`DELETE /users/7\`  |

The server answers with a **status code** that signals the outcome:
- **2xx** success — \`200 OK\`, \`201 Created\`.
- **4xx** the *client* made a mistake — \`400 Bad Request\`, \`404 Not Found\`.
- **5xx** the *server* failed — \`500 Internal Server Error\`.

Two more principles matter. URLs should name **nouns** (resources), not verbs:
\`/users/7\` — not \`/getUser?id=7\`. And good REST is **stateless**: each request
carries everything the server needs, so the server keeps no per-client session in
memory between calls.`,
      questions: [
        {
          prompt: "You want to create a brand-new user. Which HTTP method fits the REST convention?",
          options: ["GET", "POST", "DELETE", "PUT"],
          answer: 1,
          explanation:
            "POST to the collection (e.g. POST /users) creates a new resource. GET reads, PUT replaces an existing one, DELETE removes one.",
        },
        {
          prompt: "A client requests a user that doesn't exist. Which status code should the server return?",
          options: ["200 OK", "201 Created", "404 Not Found", "500 Internal Server Error"],
          answer: 2,
          explanation:
            "404 Not Found is the 4xx code for a resource that isn't there — a client-side problem. 5xx codes mean the server itself failed.",
        },
        {
          prompt: "Which URL best follows REST naming conventions for fetching user 7?",
          options: [
            "GET /getUser?id=7",
            "GET /users/7",
            "POST /fetchUserById/7",
            "GET /user/find/7/now",
          ],
          answer: 1,
          explanation:
            "REST URLs name resources as nouns — /users/7 — and let the HTTP method (GET) express the action. Verb-in-the-URL designs like /getUser are not RESTful.",
        },
      ],
    },
  ],
};
