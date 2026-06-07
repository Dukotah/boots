import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule, MODULES } from "@/lib/curriculum";
import { CertificateView } from "./CertificateView";

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { module: string };
}): Metadata {
  const module = getModule(params.module);
  if (!module) return {};
  const title = `${module.title} Certificate`;
  const og = `/api/og?kind=${encodeURIComponent("Certificate of Completion")}&title=${encodeURIComponent(module.title)}&subtitle=${encodeURIComponent(`${module.lessons.length} lessons completed`)}`;
  return {
    title,
    description: `Earn your ${module.title} certificate on Cantrip by completing all ${module.lessons.length} interactive lessons.`,
    // The body is a client-gated "earn your certificate" shell that's near-identical
    // across modules — thin/duplicate content. Keep it shareable (OG card intact)
    // but out of the index so it doesn't dilute crawl budget.
    robots: { index: false, follow: true },
    alternates: { canonical: `/certificate/${module.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | Cantrip`,
      description: `Completed ${module.title} on Cantrip.`,
      url: `/certificate/${module.slug}`,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default function CertificatePage({
  params,
}: {
  params: { module: string };
}) {
  const module = getModule(params.module);
  if (!module) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <CertificateView module={module} />
    </div>
  );
}
