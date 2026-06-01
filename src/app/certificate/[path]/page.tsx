"use client";

import { Certificate } from "@/components/features/certificate/Certificate";

// Personal, client-rendered certificate (gated by local progress), so it's not
// statically generated — it reads the learner's completion from the game store.
export default function CertificatePage({
  params,
}: {
  params: { path: string };
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Certificate slug={params.path} />
    </div>
  );
}
