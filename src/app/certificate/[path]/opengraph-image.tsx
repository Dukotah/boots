import { ImageResponse } from "next/og";
import { getPath } from "@/lib/paths";
import { SITE } from "@/lib/site";

// Social-share image for a path certificate.
export const runtime = "nodejs";
export const alt = "Boots Certificate of Completion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { path: string };
}) {
  const path = getPath(params.path);
  const title = path ? path.title : "Coding";
  const emoji = path?.emoji ?? "🏆";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px",
          background: "linear-gradient(135deg, #0a0a12 0%, #2a1a4e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #8b5cf6",
            borderRadius: 24,
            background: "rgba(10,10,18,0.6)",
            color: "white",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#a78bfa" }}>
            CERTIFICATE OF COMPLETION
          </div>
          <div style={{ fontSize: 72, marginTop: 24 }}>{emoji}</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 8 }}>
            {`${title} Path`}
          </div>
          <div style={{ fontSize: 30, color: "#9ca3af", marginTop: 24 }}>
            {`Awarded by ${SITE.name}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
