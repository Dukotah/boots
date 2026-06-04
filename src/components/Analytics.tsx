// Privacy-friendly, cookieless product analytics (Plausible). Loads ONLY when
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so dev/self-host stays clean and there's
// nothing to consent to (no cookies, no cross-site tracking) — which matters for
// a product with under-13 learners. Renders nothing when unconfigured.
//
// To enable: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com (and optionally
// NEXT_PUBLIC_PLAUSIBLE_SRC if self-hosting the script).

import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

export function Analytics() {
  if (!DOMAIN) return null;
  return (
    <Script
      src={SRC}
      data-domain={DOMAIN}
      strategy="afterInteractive"
    />
  );
}
