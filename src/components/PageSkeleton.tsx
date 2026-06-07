// Layout-preserving loading skeleton shown while the client store hydrates.
// Replaces the old bare "Loading…" text returns that caused a brief full-blank
// flash on hydration / scroll-restoration (QA #7): a pulsing title + content
// blocks keep the page structure stable so nothing visibly collapses.
export function PageSkeleton({
  maxW = "max-w-5xl",
  rows = 3,
}: {
  /** Tailwind max-width class so each page keeps its own container width. */
  maxW?: string;
  /** How many content blocks to render below the title. */
  rows?: number;
}) {
  return (
    <div
      className={`mx-auto ${maxW} animate-pulse px-4 py-10`}
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <div className="h-9 w-56 rounded-xl bg-surface-2" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-surface-2" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-surface-2" />
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-surface-2" />
        ))}
      </div>
    </div>
  );
}
