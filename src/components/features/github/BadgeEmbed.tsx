"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "@/lib/site";

// Shows the learner's live progress badge + a one-click copy of the Markdown to
// embed it in a GitHub profile README. Read-only; works for anyone with a public
// profile (the badge endpoint pulls public stats).
export function BadgeEmbed({ handle }: { handle: string }) {
  const [copied, setCopied] = useState(false);

  const badgeUrl = `${SITE.url}/api/badge/${handle}`;
  const profileUrl = `${SITE.url}/u/${handle}`;
  const markdown = `[![My ${SITE.name} progress](${badgeUrl})](${profileUrl})`;

  function copy() {
    navigator.clipboard?.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="card mt-4">
      <h2 className="text-lg font-semibold text-white">Profile README badge</h2>
      <p className="mt-1 text-sm text-gray-400">
        Drop this in your GitHub profile README — it updates as you learn.
      </p>

      {/* Live preview */}
      <div className="mt-4 overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/badge/${handle}`}
          alt={`${handle} progress badge`}
          width={420}
          height={120}
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 truncate rounded-lg border border-line bg-canvas/60 px-3 py-2 text-xs text-gray-300">
          {markdown}
        </code>
        <button onClick={copy} className="btn-ghost shrink-0 text-sm">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
