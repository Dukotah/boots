"use client";

/**
 * CertificateGallery.tsx
 *
 * The Career Pack certificate wall. Renders EVERY career path as a card in one
 * of three states so the section is never empty — a brand-new learner sees the
 * full set of certificates they can earn, not a lonely line of text:
 *
 *   • EARNED      — gold/amber treatment, radial glow, a verifiable code +
 *                   "✓ Verifiable" pill, links to the shareable certificate page.
 *   • IN PROGRESS — neutral card with a violet→fuchsia progress bar, links to
 *                   the path so the learner can keep going.
 *   • LOCKED      — grayscale + dimmed, "🔒 Locked", links to the path to start.
 *
 * Pure presentation over PathCredentialStatus[] (from lib/career). The earned
 * code is derived with the same certVerifyCode() the certificate page uses, so
 * the code shown here matches the one on the certificate itself.
 */

import Link from "next/link";
import { Award, ArrowRight, Lock } from "lucide-react";
import { certVerifyCode, type PathCredentialStatus } from "@/lib/career";

/** earned → in-progress → locked, then most-complete first within a group. */
function rank(c: PathCredentialStatus): number {
  if (c.earned) return 0;
  if (c.done > 0) return 1;
  return 2;
}

export function CertificateGallery({
  creds,
  learnerName,
}: {
  creds: PathCredentialStatus[];
  learnerName: string;
}) {
  if (creds.length === 0) {
    return (
      <p className="mt-2 text-sm text-gray-400">
        Career paths are on their way — check back soon to start earning
        certificates.
      </p>
    );
  }

  const sorted = [...creds].sort(
    (a, b) => rank(a) - rank(b) || b.pct - a.pct,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((c) => {
        if (c.earned) {
          return <EarnedCard key={c.path.slug} c={c} learnerName={learnerName} />;
        }
        if (c.done > 0) {
          return <InProgressCard key={c.path.slug} c={c} />;
        }
        return <LockedCard key={c.path.slug} c={c} />;
      })}
    </div>
  );
}

// ── Earned ───────────────────────────────────────────────────────────────────

function EarnedCard({
  c,
  learnerName,
}: {
  c: PathCredentialStatus;
  learnerName: string;
}) {
  const code = certVerifyCode(c.path.slug, learnerName);
  return (
    <Link
      href={`/certificate/path/${c.path.slug}`}
      aria-label={`View your ${c.path.title} certificate`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 p-5 transition hover:border-amber-400/60 hover:shadow-[0_0_32px_-8px_rgba(251,191,36,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
    >
      {/* soft radial glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/25 blur-2xl"
      />
      <div className="relative flex items-start justify-between gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl ring-1 ring-amber-400/40">
          {c.path.emoji}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/30">
          <Award size={11} aria-hidden /> Verifiable
        </span>
      </div>
      <h3 className="relative mt-3 font-bold text-white">{c.path.title}</h3>
      <p className="relative text-sm text-gray-300">{c.path.role}</p>
      <p className="relative mt-2 font-mono text-[11px] text-amber-300/80">
        {code}
      </p>
      <p className="relative mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-300">
        View certificate{" "}
        <ArrowRight
          size={13}
          aria-hidden
          className="transition group-hover:translate-x-0.5"
        />
      </p>
    </Link>
  );
}

// ── In progress ─────────────────────────────────────────────────────────────

function InProgressCard({ c }: { c: PathCredentialStatus }) {
  return (
    <Link
      href={`/paths/${c.path.slug}`}
      aria-label={`Continue the ${c.path.title} path — ${c.pct}% complete`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 p-5 transition hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10">
          {c.path.emoji}
        </span>
        <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-300 ring-1 ring-violet-400/30">
          In progress
        </span>
      </div>
      <h3 className="mt-3 font-bold text-white">{c.path.title}</h3>
      <p className="text-sm text-gray-400">{c.path.role}</p>
      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between text-xs">
          <span className="font-medium text-gray-200">{c.pct}% complete</span>
          <span className="text-gray-500">
            {c.done}/{c.total}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
            style={{ width: `${c.pct}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

// ── Locked ───────────────────────────────────────────────────────────────────

function LockedCard({ c }: { c: PathCredentialStatus }) {
  return (
    <Link
      href={`/paths/${c.path.slug}`}
      aria-label={`Start the ${c.path.title} path to unlock its certificate`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/40 p-5 opacity-60 transition hover:border-accent/40 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl grayscale ring-1 ring-white/10">
          {c.path.emoji}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400 ring-1 ring-white/10">
          <Lock size={10} aria-hidden /> Locked
        </span>
      </div>
      <h3 className="mt-3 font-bold text-gray-200">{c.path.title}</h3>
      <p className="text-sm text-gray-500">{c.path.role}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gray-400 transition group-hover:text-accent-soft">
        Finish the path to unlock{" "}
        <ArrowRight
          size={13}
          aria-hidden
          className="transition group-hover:translate-x-0.5"
        />
      </p>
    </Link>
  );
}
