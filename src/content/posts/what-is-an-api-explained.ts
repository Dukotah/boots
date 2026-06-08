// Targets "what is an api" / "what is an api explained" — a foundational
// beginners concept query distinct from the existing "what-is-an-api-plain-english"
// inline post. This file goes deeper: REST vs other styles, request anatomy,
// how to actually use one. AEO-optimised: direct-answer opener, question H2s,
// comparison table, FAQ block, internal links.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "what-is-an-api-explained",
  title: "What Is an API? Explained for Beginners",
  description:
    "A clear beginner's explanation of what an API is, how HTTP requests work, what REST means, and how to make your first API call — with no jargon assumed.",
  date: "2026-06-07",
  readingMinutes: 9,
  tags: ["beginners", "concepts", "backend", "web"],
  body: `An API (Application Programming Interface) is a structured way for two pieces of software to communicate — one asks for something, the other responds with data or an action. When your weather app shows tomorrow's forecast, it didn't measure the rain itself; it asked a weather service's API, which sent back the data. Almost every app you use depends on multiple APIs running invisibly in the background.

## Why do APIs exist?

Software is built by combining capabilities. No company builds everything from scratch. Instead:

- A ride-sharing app uses a maps API to show routes.
- An e-commerce site uses a payment API to charge cards.
- A news aggregator uses dozens of publishing APIs to pull headlines.

APIs are what make this composability possible. They let developers use capabilities built by others — handling payments, sending emails, recognizing images, processing language — without rebuilding them. This is how modern software development actually works.

## What does "API" mean technically?

API stands for *Application Programming Interface*. Breaking it down:

- **Application** — a piece of software
- **Programming** — accessible through code, not just a user interface
- **Interface** — a defined contract: "if you send me this, I'll send you that"

The "interface" part is important. An API hides its implementation — you don't need to know how the weather service computes forecasts. You just need to know what to ask and what format the answer comes back in. This separation is one of the most important ideas in software engineering.

## What is a web API (REST API)?

The most common type of API you'll encounter is a *web API* — one that works over the internet using HTTP, the same protocol your browser uses to load web pages.

Most web APIs today follow a style called *REST* (Representational State Transfer). REST APIs use standard HTTP methods and treat everything as a *resource* with a URL address:

| HTTP method | What it means | Example |
| --- | --- | --- |
| GET | Retrieve something | Get a list of users |
| POST | Create something | Submit a new comment |
| PUT / PATCH | Update something | Change a user's email |
| DELETE | Remove something | Delete a post |

When you make a GET request to \`https://api.openweathermap.org/data/2.5/weather?q=London\`, you're asking: "Give me the current weather for London." The API responds with structured data — usually JSON.

## What is JSON?

JSON (JavaScript Object Notation) is the most common format API responses come back in. It looks like this:

\`\`\`json
{
  "city": "London",
  "temperature": 14,
  "condition": "Cloudy",
  "humidity": 78
}
\`\`\`

It's just text in a structure that's easy for programs to read. Key-value pairs, lists, and nested objects — that's most of what you'll see. Your code can parse this and use any of those values.

## What is an API key?

Most production APIs require authentication. The most common mechanism for beginners is an API key — a unique string you include with your request that identifies who you are. Something like:

\`\`\`
https://api.example.com/data?apikey=abc123xyz
\`\`\`

API keys let the service track usage, enforce rate limits, and restrict access. Keep them private — never put them in public code repositories. If a key leaks, rotate it immediately.

## How do you actually call an API?

There are three common ways to make an API call:

**1. From your browser (for testing)**
Many APIs can be called directly from a browser URL bar for simple GET requests. Paste the URL with your API key and you'll see the raw JSON response.

**2. With a tool like curl or Postman**
\`curl\` is a command-line tool that sends HTTP requests. Postman is a graphical tool. Both are excellent for testing and exploring APIs before writing code.

**3. From code**
In Python:
\`\`\`python
import requests
response = requests.get("https://api.example.com/data?apikey=abc123")
data = response.json()
print(data["temperature"])
\`\`\`

In JavaScript (in a browser or Node.js):
\`\`\`javascript
const response = await fetch("https://api.example.com/data?apikey=abc123");
const data = await response.json();
console.log(data.temperature);
\`\`\`

Two lines (plus imports) to pull live data from the internet. That's the power of APIs.

## What's the difference between REST, GraphQL, and WebSockets?

Most beginners only need REST, but these terms come up:

| Style | How it works | Best for |
| --- | --- | --- |
| REST | Multiple endpoints, each representing a resource | Most standard web APIs |
| GraphQL | Single endpoint; client specifies exactly what data it wants | Complex data with many relationships (e.g., GitHub, Shopify) |
| WebSockets | Persistent connection; real-time two-way communication | Chat apps, live dashboards, games |

Start with REST. GraphQL and WebSockets solve problems you won't encounter until you're building more complex applications.

## What's an SDK?

Many services provide an *SDK* (Software Development Kit) — a library in a specific language that wraps their API so you don't have to write raw HTTP requests. Stripe's Python SDK, for example, lets you charge a card with a simple function call rather than crafting the HTTP request yourself. SDKs are conveniences built on top of APIs.

## Where do APIs fit in learning to code?

You don't need to understand APIs on day one, but they show up early in practical projects. Building an app that calls a public API — weather, news, currency exchange, GitHub data — is one of the most educational beginner projects there is. It forces you to read documentation, handle real data, and deal with real errors.

For backend development specifically, you'll eventually build your own APIs — writing the server code that responds when other software (or your own frontend) makes requests. The [backend path on Cantrip](/learn) covers this in a structured sequence that includes working with APIs on both sides: calling them and building them.

The [vibe coding course](/learn/vibe-coding) also covers using AI tools to scaffold API integrations quickly — a practical skill for 2026 development workflows.

---

## Frequently asked questions

### Do I need to understand HTTP to use APIs?

At a basic level, yes — knowing that GET fetches data and POST creates data is enough to get started. You don't need to deeply understand HTTP's internals to make useful API calls. That knowledge deepens naturally as you build more.

### Are all APIs free to use?

No. Many offer a free tier for development and testing (limited to some number of requests per day or month), then charge based on usage beyond that. Some are entirely free (public data APIs for weather, currencies, transit). Some are paid-only. Always check a service's pricing and terms before building something that depends on it.

### What's the difference between a public API and a private API?

A public API is documented and intentionally made available for external developers to use. A private API is internal to a company and not exposed publicly. When you integrate with Stripe, GitHub, or OpenWeatherMap, you're using public APIs. When an app's frontend talks to its own backend, that's typically a private API.

### Can beginners build their own APIs?

Yes — and it's a highly educational project. A simple REST API in Python (using Flask or FastAPI) or JavaScript (using Express) can be built within a few weeks of learning the backend fundamentals. Building an API teaches you request-response cycles, data validation, error handling, and HTTP concepts far more concretely than reading about them. See the [backend path on Cantrip](/learn) for a structured route to building your first API.

### What does "rate limit" mean?

Rate limiting is when an API restricts how many requests you can make in a given time period — for example, 100 requests per minute. If you exceed the limit, the API returns an error (usually HTTP 429: Too Many Requests) until your limit resets. Rate limits exist to prevent abuse and protect API infrastructure. Most beginner projects never come close to hitting them.`,
};

export default post;
