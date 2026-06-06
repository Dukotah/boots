"use client";

import { useEffect } from "react";
import Link from "next/link";
import { captureError } from "@/lib/observability";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry (when configured) and always surface to console.
    captureError(error, {
      source: "route-error-boundary",
      digest: error.digest,
    }).catch(() => {
      console.error("[route-error]", error);
    });
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🧪</p>
      <h1 className="mt-4 text-xl font-bold text-white">A spell backfired</h1>
      <p className="mt-2 text-gray-400">
        Something went wrong on our end. Try again — and if it keeps happening, let
        us know.
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-ghost">
          Go home
        </Link>
      </div>
    </div>
  );
}
