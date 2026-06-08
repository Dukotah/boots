import type { Metadata } from "next";
import { Landing } from "@/components/features/marketing/Landing";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteJsonLd, organizationJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const OG_TITLE = "Learn to Code & Use AI — Gamified";
const OG_SUBTITLE =
  "Guided paths from your first line of code to job-ready. Real auto-graded code, XP, leagues. Free to start.";
const OG_IMAGE = absoluteUrl(
  `/api/og?title=${encodeURIComponent(OG_TITLE)}&subtitle=${encodeURIComponent(OG_SUBTITLE)}`,
);

export const metadata: Metadata = {
  title: { absolute: "Cantrip — Learn to Code & Land the Career, Gamified" },
  description:
    "Pick a guided career path — frontend, backend, AI engineer, data — and we sequence every course from your first line of code to job-ready. Write real, auto-graded code in your browser, earn XP, and level up like an RPG. Free to start.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Cantrip — Learn to Code & Use AI, Gamified",
    description: OG_SUBTITLE,
    url: absoluteUrl("/"),
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <Landing />
    </>
  );
}
