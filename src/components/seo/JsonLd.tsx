// Injects a JSON-LD <script> for structured data (rich results in Google). This
// is a server component — the JSON is serialized at build time into the static
// HTML, so crawlers see it without running any JS.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema.org payload is trusted, build-time data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
