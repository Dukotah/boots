"use client";

import { Certificate } from "@/components/features/certificate/Certificate";

// Personal, client-rendered certificate (gated by local progress), so it's not
// statically generated — it reads the learner's completion from the game store.
// Routed under /certificate/path/[slug] to avoid colliding with the module
// certificate route (/certificate/[module]).
export default function PathCertificatePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Certificate slug={params.slug} />
    </div>
  );
}
