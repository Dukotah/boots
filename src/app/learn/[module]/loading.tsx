// Suspense fallback for a course's lesson list.
export default function ModuleLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10" aria-busy="true">
      <div className="animate-pulse space-y-3">
        <div className="h-8 w-1/2 rounded bg-white/10" />
        <div className="h-4 w-3/4 rounded bg-white/5" />
      </div>
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-16 animate-pulse bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}
