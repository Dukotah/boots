import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

// Dynamic social-share card. Used for certificate pages (and reusable elsewhere)
// so shared links render a branded preview. Query params: title, subtitle, kind.
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? SITE.name).slice(0, 80);
  const subtitle = (searchParams.get("subtitle") ?? SITE.tagline).slice(0, 100);
  const kind = (searchParams.get("kind") ?? "").slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a12 0%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, color: "#c4b5fd" }}>
          <span style={{ marginRight: 14 }}>🪄</span> {SITE.name}
        </div>
        {kind ? (
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a78bfa",
            }}
          >
            {kind}
          </div>
        ) : null}
        <div style={{ display: "flex", marginTop: 16, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#cbd5e1" }}>
          {subtitle}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
