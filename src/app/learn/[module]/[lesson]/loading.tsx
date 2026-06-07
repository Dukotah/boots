// Suspense fallback while a lesson page streams in — mirrors the two-up
// content/editor layout so the page doesn't jump on hydration.
export default function LessonLoading() {
  return (
    <div className="mx-auto flex max-w-[88rem] gap-4 px-4 py-6" aria-busy="true">
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="card h-80 animate-pulse bg-white/[0.03]" />
      </div>
      <div className="grid min-w-0 flex-1 gap-4 lg:grid-cols-2">
        <section className="card animate-pulse space-y-3">
          <div className="h-4 w-1/3 rounded bg-white/10" />
          <div className="h-7 w-2/3 rounded bg-white/10" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-white/5" />
            <div className="h-3 w-11/12 rounded bg-white/5" />
            <div className="h-3 w-10/12 rounded bg-white/5" />
            <div className="h-3 w-9/12 rounded bg-white/5" />
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <div className="card h-[420px] animate-pulse bg-white/[0.03]" />
          <div className="card h-32 animate-pulse bg-white/[0.03]" />
        </section>
      </div>
    </div>
  );
}
