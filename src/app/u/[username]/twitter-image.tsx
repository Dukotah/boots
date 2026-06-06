// The root layout sets a global twitter.images default, which would otherwise
// win over the file-based opengraph-image for Twitter cards. Reuse the same
// generator (default export) but declare the route config as string literals so
// Next can statically read `runtime`/`size` — a re-exported `runtime` isn't
// recognized. This makes a shared profile render the branded rank/XP/streak card
// on Twitter/X as well as on LinkedIn/Facebook (og:image).
export { default } from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "Cantrip learner profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
