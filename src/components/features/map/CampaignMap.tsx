"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, Play, Zap, Trophy } from "lucide-react";
import { useCampaign, type CampaignNode } from "@/hooks/useCampaign";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export function CampaignMap() {
  const mounted = useMounted();
  const campaign = useCampaign();
  const setActiveQuest = useGameStore((s) => s.setActiveQuest);

  if (!mounted) return <CampaignSkeleton />;

  const overallPct = campaign.totalLessons
    ? Math.round((campaign.completedCount / campaign.totalLessons) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          Your Quest Line
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
          Campaign Map
        </h1>
        <p className="mt-2 max-w-prose text-pretty text-gray-400">
          Clear each node to unlock the next. Every lesson you complete earns XP
          and gold and pushes you toward the next rank.
        </p>

        {/* overall progress */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-success via-accent to-accent-soft shadow-glow"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
          </div>
          <span className="shrink-0 text-sm font-semibold text-gray-300">
            {campaign.completedCount}/{campaign.totalLessons}
          </span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-14">
        {campaign.modules.map((cm) => (
          <section key={cm.module.slug}>
            {/* Region header */}
            <div
              className={[
                "rounded-2xl border p-5 transition-opacity",
                cm.unlocked
                  ? "border-line bg-surface"
                  : "border-line/60 bg-surface/40 opacity-70",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{cm.module.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      {cm.module.title}
                    </h2>
                    {!cm.unlocked && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-gray-400">
                        <Lock size={11} /> Locked
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-400">
                    {cm.module.tagline || cm.module.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-white">
                    {cm.completedCount}/{cm.total}
                  </p>
                  <p className="text-xs text-gray-500">lessons</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-success to-accent"
                  style={{ width: `${cm.progress * 100}%` }}
                />
              </div>
            </div>

            {/* Quest spine — only for unlocked modules; locked ones collapse to a hint. */}
            {cm.unlocked ? (
              <div className="mt-6 flex flex-col items-stretch">
                {cm.nodes.map((node, i) => (
                  <Fragment key={node.id}>
                    {i > 0 && (
                      <Connector done={cm.nodes[i - 1].status === "completed"} />
                    )}
                    <QuestRow
                      node={node}
                      side={i % 2 === 0 ? "right" : "left"}
                      onPick={() => setActiveQuest(node.id)}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface/40 px-4 py-6 text-sm text-gray-500">
                <Lock size={14} />
                Complete the previous course to unlock these quests.
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Finale flag */}
      <div className="mt-14 flex flex-col items-center text-center text-gray-500">
        <Connector done={false} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface text-2xl">
          <Trophy className="text-gold" />
        </div>
        <p className="mt-3 text-sm">More quests on the way ⚔️</p>
      </div>
    </div>
  );
}

/* ── pieces ─────────────────────────────────────────────────────────────── */

function Connector({ done }: { done: boolean }) {
  return (
    <div
      aria-hidden
      className={[
        "mx-auto h-12 w-1 rounded-full",
        done
          ? "bg-gradient-to-b from-success to-success/60 shadow-glow-success"
          : "bg-line",
      ].join(" ")}
    />
  );
}

function QuestRow({
  node,
  side,
  onPick,
}: {
  node: CampaignNode;
  side: "left" | "right";
  onPick: () => void;
}) {
  const card = <InfoCard node={node} side={side} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"
    >
      {/* left cell */}
      <div className="flex justify-end">{side === "left" ? card : null}</div>

      {/* node */}
      <QuestNode node={node} onPick={onPick} />

      {/* right cell */}
      <div className="flex justify-start">{side === "right" ? card : null}</div>
    </motion.div>
  );
}

function QuestNode({ node, onPick }: { node: CampaignNode; onPick: () => void }) {
  const { status } = node;

  const styles: Record<typeof status, string> = {
    completed:
      "border-success bg-success/15 text-success shadow-glow-success",
    active:
      "border-accent bg-accent/20 text-accent-soft shadow-glow",
    available:
      "border-accent/50 bg-surface-2 text-accent-soft hover:border-accent hover:bg-accent/10",
    locked: "border-line bg-surface text-gray-600 cursor-not-allowed",
  };

  const Icon =
    status === "completed"
      ? Check
      : status === "active"
        ? Play
        : status === "locked"
          ? Lock
          : Zap;

  const inner = (
    <motion.div
      whileHover={status === "locked" ? undefined : { scale: 1.08 }}
      whileTap={status === "locked" ? undefined : { scale: 0.94 }}
      className={[
        "relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors",
        styles[status],
      ].join(" ")}
    >
      {/* pulse ring for the active quest */}
      {status === "active" && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-accent"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <Icon size={24} />
    </motion.div>
  );

  if (status === "locked") {
    return <div className="flex justify-center">{inner}</div>;
  }

  return (
    <Link
      href={node.href}
      onClick={onPick}
      aria-label={node.lesson.title}
      className="flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-full"
    >
      {inner}
    </Link>
  );
}

function InfoCard({
  node,
  side,
}: {
  node: CampaignNode;
  side: "left" | "right";
}) {
  const locked = node.status === "locked";
  const content = (
    <div
      className={[
        "max-w-[220px] rounded-xl border px-4 py-3 transition-colors",
        side === "left" ? "text-right" : "text-left",
        locked
          ? "border-line/60 bg-surface/40"
          : "border-line bg-surface hover:border-accent/60",
      ].join(" ")}
    >
      <p
        className={[
          "text-sm font-semibold",
          locked ? "text-gray-500" : "text-white",
        ].join(" ")}
      >
        {node.lesson.title}
      </p>
      <div
        className={[
          "mt-1 flex items-center gap-1.5 text-xs font-medium",
          side === "left" ? "justify-end" : "justify-start",
          node.status === "completed" ? "text-success" : "text-gray-400",
        ].join(" ")}
      >
        {node.status === "completed" ? (
          <>
            <Check size={12} /> Completed
          </>
        ) : node.status === "active" ? (
          <span className="text-accent-soft">● In progress</span>
        ) : (
          <>
            <Zap size={12} className="text-gold" /> {node.lesson.xp} XP
          </>
        )}
      </div>
    </div>
  );

  if (locked) return content;
  return (
    <Link href={node.href} className="block">
      {content}
    </Link>
  );
}

/* ── loading skeleton (avoids hydration flash from persisted store) ───────── */

function CampaignSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-10 w-56 rounded-lg bg-surface-2" />
      <div className="mt-3 h-4 w-80 rounded bg-surface" />
      <div className="mt-6 h-2.5 w-full rounded-full bg-surface-2" />
      <div className="mt-12 space-y-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-center">
            <div className="h-16 w-16 animate-pulse rounded-full bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
