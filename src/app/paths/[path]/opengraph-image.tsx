import { ImageResponse } from "next/og";
import { getPath } from "@/lib/paths";
import { SITE } from "@/lib/site";

// Dynamic social-share image for each pathway. Next wires this up as the
// og:image automatically for /paths/[path]. Node runtime avoids edge bundle
// limits (the curriculum import graph is large).
export const runtime = "nodejs";
export const alt = "Boots learning path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { path: string };
}) {
  const path = getPath(params.path);
  const title = path ? path.title : "Learning Path";
  const tagline = path?.tagline ?? "Learn to code, the fun way.";
  const emoji = path?.emoji ?? "🧭";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "#8b5cf6",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80 }}>{emoji}</div>
          <div style={{ fontSize: 68, fontWeight: 800, marginTop: 8 }}>
            {`${title} Path`}
          </div>
          <div style={{ fontSize: 32, color: "#a78bfa", marginTop: 16 }}>
            {tagline}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#9ca3af" }}>
          Interactive · Auto-graded · Free to start
        </div>
      </div>
    ),
    { ...size },
  );
}
