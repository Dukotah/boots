"use client";

// Last-resort boundary: catches errors thrown in the root layout itself (which
// the route-level error.tsx can't), so the app degrades to a friendly page
// instead of a blank white screen. Must render its own <html>/<body> because it
// replaces the root layout when it fires.

import { useEffect } from "react";
import { captureError } from "@/lib/observability";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry (when configured) and always surface to console.
    captureError(error, {
      source: "global-error-boundary",
      digest: error.digest,
    }).catch(() => {
      // captureError should never throw, but guard here so the UI never breaks.
      console.error("[global-error]", error);
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0e14] text-white">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
          <p className="text-6xl">🧪</p>
          <h1 className="mt-4 text-xl font-bold">A spell backfired</h1>
          <p className="mt-2 text-gray-400">
            Something went wrong loading the app. Try again — and if it keeps
            happening, let us know.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-lg bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
