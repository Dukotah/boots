"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { certVerifyCode } from "@/lib/career";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { MascotBoots } from "@/components/MascotBoots";
import { SITE } from "@/lib/site";
import { CertShareButtons } from "@/components/features/certificate/CertShareButtons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function CertificateView({ module }: { module: Module }) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const user = useGameStore((s) => s.user);

  const done = module.lessons.filter((l) =>
    completed.includes(lessonId(module.slug, l.slug)),
  ).length;
  const total = module.lessons.length;
  const earned = mounted && done === total;
  const handle = user?.email?.split("@")[0] ?? "a Cantrip learner";
  const code = certVerifyCode(module.slug, handle);

  if (!mounted) {
    return <div className="mx-auto mt-10 h-80 max-w-2xl rounded-2xl border border-line" />;
  }

  if (!earned) {
    return (
      <div className="card mt-8 text-center">
        <Lock className="mx-auto text-gray-500" size={22} />
        <h1 className="mt-3 text-xl font-bold text-white">
          {module.title} certificate
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Complete all {total} lessons to earn your certificate — you’re at{" "}
          {done}/{total}.
        </p>
        <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
            style={{ width: `${Math.round((done / total) * 100)}%` }}
          />
        </div>
        <Link href={`/learn/${module.slug}`} className="btn-primary mx-auto mt-5 w-fit">
          Continue the course
        </Link>
      </div>
    );
  }

  const now = new Date();
  const dateStr = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-surface to-canvas p-10 text-center shadow-glow"
      >
        <div className="flex items-center justify-center gap-2 text-accent-soft">
          <MascotBoots size={28} />
          <span className="text-lg font-bold tracking-tight text-white">{SITE.name}</span>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
          Certificate of Completion
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">{module.title}</h1>
        <p className="mt-4 text-sm text-gray-400">Awarded to</p>
        <p className="text-2xl font-semibold text-accent-soft">{handle}</p>
        <p className="mt-4 text-sm text-gray-500">
          {total} lessons completed · {dateStr}
        </p>
        <div className="mt-6 text-4xl">🎓</div>

        {/* Verify code — shown on the face of the certificate */}
        <div className="mt-6 border-t border-line/40 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Credential ID
          </p>
          <p className="mt-0.5 font-mono text-sm font-semibold tracking-wider text-accent-soft">
            {code}
          </p>
        </div>
      </motion.div>

      <CertShareButtons
        certPath={`/certificate/${module.slug}`}
        certName={module.title}
        verifyCode={code}
      />

      <div className="mt-4 flex justify-center gap-3 print:hidden">
        <Link href="/learn" className="btn-ghost">
          More courses
        </Link>
      </div>
    </div>
  );
}
