// Suspense fallback for the dashboard while the client store hydrates.
export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card h-24 animate-pulse bg-white/[0.03]" />
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card h-48 animate-pulse bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}
