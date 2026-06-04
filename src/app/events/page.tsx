"use client";

import { motion } from "framer-motion";
import { Calendar, Zap, Gift, Clock, Trophy, Star } from "lucide-react";
import {
  SEASONAL_EVENTS,
  getActiveEvent,
  getNextEvent,
  daysUntilEvent,
  daysLeftInEvent,
  type SeasonalEvent,
  type EventReward,
} from "@/lib/events";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export default function EventsPage() {
  const mounted = useMounted();
  const weeklyXp = useGameStore((s) => s.weeklyXp);

  if (!mounted) return <EventsSkeleton />;

  const activeEvent = getActiveEvent();
  const nextEvent = getNextEvent();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          Limited Time
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
          Seasonal Events
        </h1>
        <p className="mt-2 text-gray-400">
          Time-limited campaigns with exclusive cosmetics and titles. These
          rewards can only be earned during the event window — never sold.
        </p>
      </div>

      {/* Active event */}
      {activeEvent ? (
        <ActiveEventCard event={activeEvent} playerXp={weeklyXp} />
      ) : nextEvent ? (
        <UpcomingEventCard event={nextEvent} />
      ) : null}

      {/* All events */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-bold text-white">All Events</h2>
        {SEASONAL_EVENTS.map((event) => {
          const isActive =
            activeEvent?.id === event.id;
          const now = new Date();
          const today = now.toISOString().split("T")[0];
          const isPast = event.endDate < today;
          const isFuture = event.startDate > today;

          return (
            <div
              key={event.id}
              className={[
                "rounded-2xl border p-5 transition-colors",
                isActive
                  ? "border-accent/40 bg-accent/5"
                  : isPast
                    ? "border-line/40 bg-surface/40 opacity-60"
                    : "border-line bg-surface",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${event.gradient} text-2xl shadow`}
                >
                  {event.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white">{event.name}</h3>
                    {isActive && (
                      <span className="rounded-full bg-success/20 px-2 py-0.5 text-[11px] font-bold text-success">
                        LIVE
                      </span>
                    )}
                    {isPast && (
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-gray-500">
                        ENDED
                      </span>
                    )}
                    {isFuture && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent-soft">
                        {daysUntilEvent(event)} days
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 italic">{event.tagline}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    <Calendar size={11} className="inline mr-1" />
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    →{" "}
                    {new Date(event.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <span className="ml-3 text-gold">
                      <Zap size={11} className="inline mr-0.5" />
                      {event.xpMultiplier}× XP
                    </span>
                  </p>
                </div>
              </div>

              {/* Rewards preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {event.rewards.map((r) => (
                  <div
                    key={r.id}
                    title={r.description}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-canvas/40 px-2.5 py-1 text-xs text-gray-300"
                  >
                    <span>{r.icon}</span>
                    <span>{r.name}</span>
                    <span className="text-gray-500">@ {r.threshold} XP</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActiveEventCard({
  event,
  playerXp,
}: {
  event: SeasonalEvent;
  playerXp: number;
}) {
  const daysLeft = daysLeftInEvent(event);
  const maxThreshold = Math.max(...event.rewards.map((r) => r.threshold));
  const pct = Math.min((playerXp / maxThreshold) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${event.gradient} p-6 shadow-glow`}
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl">{event.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold text-white"
            >
              ● LIVE
            </motion.span>
            <span className="text-xs text-white/60">
              <Clock size={11} className="inline mr-1" />
              {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold text-white">{event.name}</h2>
          <p className="text-sm italic text-white/70">{event.tagline}</p>
          <p className="mt-2 text-sm text-white/80">{event.description}</p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-white/70">
          <span className="flex items-center gap-1">
            <Zap size={12} /> Event XP: {playerXp.toLocaleString()}
          </span>
          <span>{event.xpMultiplier}× multiplier active</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-white/70"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          />
        </div>
      </div>

      {/* Reward milestones */}
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {event.rewards.map((reward) => {
          const earned = playerXp >= reward.threshold;
          return (
            <RewardCard key={reward.id} reward={reward} earned={earned} />
          );
        })}
      </div>
    </motion.div>
  );
}

function UpcomingEventCard({ event }: { event: SeasonalEvent }) {
  const days = daysUntilEvent(event);
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-center gap-3 text-gray-400 mb-3">
        <Star size={16} />
        <p className="text-sm font-semibold uppercase tracking-wide">
          Next Event — starts in {days} day{days !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${event.gradient} text-3xl`}
        >
          {event.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{event.name}</h3>
          <p className="text-sm italic text-gray-400">{event.tagline}</p>
        </div>
      </div>
    </div>
  );
}

function RewardCard({
  reward,
  earned,
}: {
  reward: EventReward;
  earned: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl p-3 transition",
        earned
          ? "bg-white/20 border border-white/30"
          : "bg-white/5 border border-white/10",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{reward.icon}</span>
        {earned && <Trophy size={14} className="text-yellow-300" />}
      </div>
      <p className={`mt-1 text-sm font-semibold ${earned ? "text-white" : "text-white/60"}`}>
        {reward.name}
      </p>
      <p className="text-xs text-white/50">{reward.threshold} event XP</p>
    </div>
  );
}

function EventsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-10 w-56 rounded-lg bg-surface-2 animate-pulse" />
      <div className="mt-4 h-48 rounded-2xl bg-surface animate-pulse" />
    </div>
  );
}
