// Error tracking and observability helpers. Works on both server and client.
// When @sentry/nextjs is installed AND a DSN is configured, events are sent to
// Sentry. Otherwise everything falls back to console.error/console.warn so the
// rest of the app never has to care whether Sentry is wired up yet.
//
// Graceful-degrade contract (same pattern as Analytics.tsx / scoring.ts):
//   - No module-level import of @sentry/nextjs — we dynamic-import inside try/catch.
//   - If the import fails (package absent) or DSN is missing, we fall back silently.
//   - captureError / captureMessage never throw; withErrorCapture preserves
//     the handler's original behaviour and just adds reporting.

type SentryLevel = "fatal" | "error" | "warning" | "info" | "debug" | "log";

/** Returns true when a Sentry DSN is present in the environment. Works server-side
 *  and in the browser (only NEXT_PUBLIC_SENTRY_DSN is visible in the browser). */
function hasDsn(): boolean {
  // Server: SENTRY_DSN takes precedence; browser sees only the public var.
  return Boolean(
    (typeof process !== "undefined" && process.env?.SENTRY_DSN) ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SENTRY_DSN),
  );
}

/** Try to resolve the Sentry hub dynamically. Returns null when the package
 *  is absent or the import fails for any reason. */
async function getSentry(): Promise<{
  captureException: (err: unknown, ctx?: Record<string, unknown>) => void;
  captureMessage: (msg: string, level?: SentryLevel) => void;
} | null> {
  if (!hasDsn()) return null;
  try {
    // Assign to a variable so TypeScript doesn't attempt to resolve the module
    // statically — the build stays green whether or not @sentry/nextjs is installed.
    const pkg = "@sentry/nextjs";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sentry = await (import(/* @vite-ignore */ pkg) as Promise<any>);
    if (typeof sentry?.captureException === "function") {
      return sentry as {
        captureException: (err: unknown, ctx?: Record<string, unknown>) => void;
        captureMessage: (msg: string, level?: SentryLevel) => void;
      };
    }
  } catch {
    // Package not installed — silently fall through to console fallback.
  }
  return null;
}

/**
 * Report an unexpected error. Sends to Sentry when configured; otherwise
 * logs to console.error. Never throws.
 *
 * @param err   The error object (or anything caught).
 * @param context Optional key/value bag attached as Sentry "extra" context.
 */
export async function captureError(
  err: unknown,
  context?: Record<string, unknown>,
): Promise<void> {
  try {
    const sentry = await getSentry();
    if (sentry) {
      sentry.captureException(err, context ? { extra: context } : undefined);
      return;
    }
  } catch {
    // getSentry itself should never throw, but belt-and-suspenders.
  }
  // Fallback: structured console output.
  if (context) {
    console.error("[observability] error:", err, context);
  } else {
    console.error("[observability] error:", err);
  }
}

/**
 * Report an informational message or warning. Uses Sentry.captureMessage when
 * configured; otherwise maps to console.warn / console.info. Never throws.
 *
 * @param msg   Human-readable message.
 * @param level Sentry severity level (defaults to "info").
 */
export async function captureMessage(
  msg: string,
  level: SentryLevel = "info",
): Promise<void> {
  try {
    const sentry = await getSentry();
    if (sentry) {
      sentry.captureMessage(msg, level);
      return;
    }
  } catch {
    // Swallow — never let observability break the caller.
  }
  // Fallback: pick a reasonable console level.
  if (level === "error" || level === "fatal") {
    console.error(`[observability] ${level}:`, msg);
  } else if (level === "warning") {
    console.warn(`[observability] warning:`, msg);
  } else {
    console.info(`[observability] ${level}:`, msg);
  }
}

/**
 * Higher-order wrapper for Next.js App Router API route handlers. On an
 * unhandled throw it captures the error (Sentry or console) and returns a
 * generic 500 JSON response. The handler's own try/catch logic is unaffected.
 *
 * Usage:
 *   export const GET = withErrorCapture(async (req) => { ... });
 *
 * @param handler The original route handler function.
 */
export function withErrorCapture<T extends (...args: unknown[]) => Promise<Response>>(
  handler: T,
): T {
  return (async (...args: unknown[]) => {
    try {
      return await handler(...args);
    } catch (err) {
      // Fire-and-forget — we don't want to await here and delay the error response.
      captureError(err, { source: "api-route" }).catch(() => undefined);
      return Response.json(
        { error: "An unexpected error occurred." },
        { status: 500 },
      );
    }
  }) as T;
}
