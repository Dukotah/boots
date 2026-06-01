"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Share2, Check, Printer, Lock, ArrowRight } from "lucide-react";
import { getPath, pathModules, pathStats } from "@/lib/paths";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { MascotBoots } from "@/components/MascotBoots";
import { SITE } from "@/lib/site";

// A short, deterministic verification code from the path + learner name. Not
// cryptographic — it just gives the certificate a stable, official-looking id.
// (Truly verifiable certs come with server-side progress; on the roadmap.)
function verifyCode(slug: string, name: string): string {
  const input = `${slug}::${name.toLowerCase()}`;
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return "BOOTS-" + h.toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
}

export function Certificate({ slug }: { slug: string }) {
  const path = getPath(slug);
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const user = useGameStore((s) => s.user);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  if (!path) {
    return (
      <div className="card text-center">
        <p className="text-gray-300">That path doesn&apos;t exist.</p>
        <Link href="/paths" className="btn-primary mt-4">
          Browse paths
        </Link>
      </div>
    );
  }

  const modules = pathModules(path);
  const allLessonIds = modules.flatMap((m) =>
    m.lessons.map((l) => lessonId(m.slug, l.slug)),
  );
  const total = allLessonIds.length;
  const done = mounted
    ? allLessonIds.filter((id) => completed.includes(id)).length
    : 0;
  const isComplete = mounted && total > 0 && done === total;
  const stats = pathStats(path);

  const handle = user?.email?.split("@")[0];
  const displayName = name.trim() || handle || "Boots Learner";
  const code = verifyCode(path.slug, displayName);
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function share() {
    navigator.clipboard?.writeText(`${SITE.url}/certificate/${path!.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!mounted) {
    return <div className="text-gray-500">Loading…</div>;
  }

  // Not yet earned — show progress and the way to finish.
  if (!isComplete) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    return (
      <div className="card text-center">
        <Lock className="mx-auto text-gray-500" size={28} />
        <h1 className="mt-3 text-xl font-bold text-white">
          {path.title} certificate — not earned yet
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Finish all {total} lessons in this path to unlock your certificate.
          You&apos;re {pct}% there ({done}/{total}).
        </p>
        <div className="mx-auto mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
            style={{ width: `${pct}%` }}
          />
        </div>
        <Link href={`/paths/${path.slug}`} className="btn-primary mt-5">
          Continue the path <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Earned!
  return (
    <div>
      {/* Action bar (hidden when printing) */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Name on certificate:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={displayName}
            className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm text-white outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={share} className="btn-ghost text-sm">
            {copied ? <Check size={15} /> : <Share2 size={15} />}
            {copied ? "Copied" : "Share"}
          </button>
          <button onClick={() => window.print()} className="btn-primary text-sm">
            <Printer size={15} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* The certificate */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-accent/50 bg-gradient-to-br ${path.gradient} p-8 text-center shadow-glow sm:p-12`}
      >
        <div className="rounded-xl border border-line/60 bg-canvas/70 p-8 backdrop-blur">
          <div className="flex items-center justify-center gap-2">
            <MascotBoots size={40} />
            <span className="text-lg font-bold tracking-tight text-white">
              Boots
            </span>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent-soft">
            Certificate of Completion
          </p>
          <p className="mt-4 text-sm text-gray-400">This certifies that</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
            {displayName}
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            has successfully completed the
          </p>
          <h2 className="mt-1 text-xl font-bold text-accent-soft">
            {path.emoji} {path.title} Path
          </h2>

          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <span>{stats.modules} courses</span>
            <span>·</span>
            <span>{stats.lessons} lessons</span>
            <span>·</span>
            <span className="text-accent-soft">⚡ {stats.xp} XP earned</span>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-t border-line/60 pt-5 text-left">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-gray-500">
                Issued
              </p>
              <p className="text-sm text-gray-300">{date}</p>
            </div>
            <Award className="text-gold" size={34} />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-gray-500">
                Verification
              </p>
              <p className="font-mono text-sm text-gray-300">{code}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500 print:hidden">
        Share your achievement, or{" "}
        <Link href="/paths" className="text-accent-soft hover:underline">
          start another path
        </Link>
        .
      </p>
    </div>
  );
}
