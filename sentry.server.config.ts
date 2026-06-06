// Node.js server-side Sentry initialisation (also used by the Edge runtime via
// sentry.edge.config.ts if that file is added later).
// Guards:
//   1. Only runs when SENTRY_DSN is set — no DSN means no-op.
//   2. Wrapped in try/catch so the build stays green when @sentry/nextjs is
//      absent (it's treated as an optional peer dep until the team installs it).
//
// Next.js calls this file via the instrumentation hook (instrumentation.ts).
// Activation: see docs/observability.md → "Fully enabling Sentry".

(async () => {
  const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return; // No DSN → silently skip initialisation.

  try {
    // Dynamic import via a non-literal specifier keeps tsc/the build green when
    // the package is absent (a literal specifier would be type-resolved).
    const pkg = "@sentry/nextjs";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Sentry = await (import(/* webpackIgnore: true */ pkg) as Promise<any>);
    if (typeof Sentry?.init !== "function") return;

    Sentry.init({
      dsn,
      // Capture 20 % of traces for performance monitoring — adjust as needed.
      tracesSampleRate: 0.2,
    });
  } catch {
    // @sentry/nextjs not installed — silently fall through.
    // captureError/captureMessage in observability.ts will console.error instead.
  }
})();
