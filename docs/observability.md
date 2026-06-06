# Observability: Error Tracking + Uptime

## What's built

Two new pieces ship build-safe without requiring any extra package:

| File | Purpose |
|------|---------|
| `src/lib/observability.ts` | `captureError`, `captureMessage`, `withErrorCapture` |
| `src/app/api/health/route.ts` | `GET /api/health` — uptime probe |

---

## Graceful fallback behaviour (before Sentry is installed)

`captureError` and `captureMessage` dynamic-import `@sentry/nextjs` inside a `try/catch` at call time. If the package is absent **or** no DSN env var is set, they silently fall back:

| Sentry level | Console fallback |
|---|---|
| `fatal` / `error` | `console.error` |
| `warning` | `console.warn` |
| `info` / `log` / `debug` | `console.info` |

The build stays green, the app keeps running, and every error surface still gets logged to your runtime console.

---

## Fully enabling Sentry

`sentry.client.config.ts` and `sentry.server.config.ts` are **already committed**
to the repo. Both guard themselves with a `try/catch` around a dynamic import, so
they are fully build-safe even when `@sentry/nextjs` is absent. Activation is a
two-step process:

### 1. Install the package

```bash
npm install @sentry/nextjs
```

> `package.json` is managed separately — do not run this from the agent task;
> the integrator must apply it manually.

### 2. Set the DSN env vars

Add to `.env.local` (and to your Vercel project's environment variables):

```
SENTRY_DSN=https://<key>@o<org>.ingest.sentry.io/<project>
NEXT_PUBLIC_SENTRY_DSN=https://<key>@o<org>.ingest.sentry.io/<project>
```

`NEXT_PUBLIC_SENTRY_DSN` is the browser-visible copy (Next.js env-var scoping).
Both values are **the same DSN string**.

Once these two steps are complete, Sentry is live:

- `src/app/global-error.tsx` calls `captureError` on every root-layout crash.
- `src/app/error.tsx` calls `captureError` on every route-level crash.
- API routes wrapped with `withErrorCapture` report uncaught throws automatically.
- `sentry.client.config.ts` initialises the browser SDK (Session Replay included).
- `sentry.server.config.ts` initialises the Node.js SDK.

### Optional: wire the Next.js instrumentation hook

For server-side SDK initialisation at startup (rather than at first error), create
`instrumentation.ts` in the project root:

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
```

And wrap `next.config.js` (or `.mjs`) with `withSentryConfig`:

```js
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  // Uploads source maps for readable stack traces in Sentry.
  widenClientFileUpload: true,
});
```

Alternatively, run the official wizard which handles steps 3-4 automatically:

```bash
npx @sentry/wizard@latest -i nextjs
```

---

## `/api/health` uptime endpoint

```
GET /api/health
```

Always returns **HTTP 200** with:

```json
{
  "ok": true,
  "ts": "2026-06-05T12:00:00.000Z",
  "commit": "abc1234...",
  "services": {
    "supabase": true,
    "stripe": false
  }
}
```

- `commit` is `VERCEL_GIT_COMMIT_SHA` (set automatically by Vercel; `null` in local dev).
- `services.*` are **env-var presence checks only** — no outbound calls, so the probe is always instant and can't fail due to a slow backing service.
- Wire this into any uptime monitor (Better Uptime, Checkly, Vercel Cron health checks, etc.) pointing at `https://yoursite.com/api/health`.

---

## Using `withErrorCapture` on API routes

Wrap a handler to automatically capture and report any uncaught throw:

```ts
import { withErrorCapture } from "@/lib/observability";

export const GET = withErrorCapture(async (_req) => {
  // ... handler logic
  return Response.json({ data: "ok" });
});
```

On an unhandled exception the wrapper calls `captureError`, then returns
`{ error: "An unexpected error occurred." }` with status 500. Handlers that
already have their own try/catch are unaffected — `withErrorCapture` only
activates when an error escapes the handler entirely.
