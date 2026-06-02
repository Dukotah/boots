import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTool, TOOLS } from "@/lib/tools";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { RegexTester } from "@/components/features/tools/RegexTester";
import { JsonFormatter } from "@/components/features/tools/JsonFormatter";
import { Base64Tool } from "@/components/features/tools/Base64Tool";
import { UuidGenerator } from "@/components/features/tools/UuidGenerator";

const COMPONENTS: Record<string, () => React.ReactElement> = {
  regex: RegexTester,
  json: JsonFormatter,
  base64: Base64Tool,
  uuid: UuidGenerator,
};

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      type: "website",
      title: `${tool.title} | Cantrip`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  const Comp = tool ? COMPONENTS[tool.slug] : undefined;
  if (!tool || !Comp) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${tool.slug}` },
        ])}
      />
      <Link href="/tools" className="text-sm text-accent-soft hover:underline">
        ← All tools
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-4xl">{tool.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
          <p className="mt-1 text-gray-400">{tool.blurb}</p>
        </div>
      </div>

      <div className="mt-8">
        <Comp />
      </div>

      <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-5 text-center">
        <p className="text-sm text-gray-200">
          Want to actually master this? Learn it hands-on with interactive,
          auto-graded lessons.
        </p>
        <Link href="/learn" className="btn-primary mx-auto mt-3 w-fit">
          Start learning free
        </Link>
      </div>
    </div>
  );
}
