"use client";

import { useState } from "react";
import { Linkedin, Link2, Check } from "lucide-react";
import { SITE } from "@/lib/site";

export interface CertShareButtonsProps {
  /** The path/module slug — used to build the public certificate URL. */
  certPath: string;
  /** Human-readable credential title, e.g. "Full-Stack Developer Path". */
  certName: string;
  /** The short verify code from certVerifyCode(), e.g. "CANTRIP-A3F9B2". */
  verifyCode: string;
}

/**
 * Three-action share row for earned certificates:
 *   1. Add to LinkedIn profile
 *   2. Copy the public certificate URL (the verify link)
 *   3. Shown verify code with a brief explanation
 *
 * Fully client-side, no new dependencies.
 */
export function CertShareButtons({
  certPath,
  certName,
  verifyCode,
}: CertShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const certUrl = `${SITE.url}${certPath}`;

  // LinkedIn "Add to Profile" deep-link.
  // Docs: https://www.linkedin.com/help/linkedin/answer/a567169
  const linkedInUrl = [
    "https://www.linkedin.com/profile/add",
    "?startTask=CERTIFICATION_NAME",
    `&name=${encodeURIComponent(certName)}`,
    `&organizationName=${encodeURIComponent(SITE.name)}`,
    `&certUrl=${encodeURIComponent(certUrl)}`,
    `&certId=${encodeURIComponent(verifyCode)}`,
  ].join("");

  function copyLink() {
    navigator.clipboard?.writeText(certUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-4 print:hidden">
      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Linkedin size={15} />
          Add to LinkedIn
        </a>
        <button
          onClick={copyLink}
          className="btn-ghost flex items-center gap-2 text-sm"
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? "Link copied!" : "Copy verification link"}
        </button>
      </div>

      {/* Verify code display */}
      <div className="w-full max-w-sm rounded-xl border border-line bg-surface-2 px-4 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Credential ID
        </p>
        <p className="mt-1 font-mono text-base font-semibold tracking-wider text-accent-soft">
          {verifyCode}
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
          This code is derived from your name and the course — anyone can
          confirm it matches by visiting your certificate URL.
        </p>
      </div>
    </div>
  );
}
