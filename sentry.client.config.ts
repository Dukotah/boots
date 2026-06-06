// Browser-side Sentry initialisation.
// Guards:
//   1. Only runs when NEXT_PUBLIC_SENTRY_DSN is set — no DSN means no-op.
//   2. Wrapped in try/catch so the app keeps running even if @sentry/nextjs
//      is not installed yet (it's an optional peer dep until the team adds it).
//
// Activation: see docs/observability.md → "Fully enabling Sentry".

(async () => {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
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
      // Session Replay: light sampling normally, full capture on errors.
      replaysSessionSampleRate: 0.05,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        ...(typeof Sentry.replayIntegration === "function"
          ? [Sentry.replayIntegration()]
          : []),
      ],
    });
  } catch {
    // @sentry/nextjs not installed — silently fall through.
    // captureError/captureMessage in observability.ts will console.error instead.
  }
})();
