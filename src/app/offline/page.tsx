export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-5xl">📡</p>
      <h1 className="mt-4 text-2xl font-bold text-white">You&apos;re offline</h1>
      <p className="mt-2 text-gray-400">
        Cantrip needs a connection for this page. Your progress is saved locally
        and will sync when you&apos;re back online.
      </p>
    </div>
  );
}
