"use client";

// Full notification list page — /notifications
// Shows the complete derived feed, lets the user mark all read.

import { useMemo } from "react";
import Link from "next/link";
import { Bell, BellOff, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { deriveNotifications, type Notification, type NotifSnapshot } from "@/lib/notifications";
import { useSeenNotifs } from "@/components/features/notifications/useNotifStore";

// Accent classes per kind — matches the bell dropdown.
const KIND_BG: Record<string, string> = {
  achievement: "bg-gold/20 text-gold",
  level_up: "bg-accent/20 text-accent-soft",
  season_result: "bg-violet-500/20 text-violet-300",
  reviews_due: "bg-sky-500/20 text-sky-300",
  streak_risk: "bg-danger/20 text-danger",
};

const KIND_LABEL: Record<string, string> = {
  achievement: "Achievement",
  level_up: "Level up",
  season_result: "Season result",
  reviews_due: "Reviews due",
  streak_risk: "Streak at risk",
};

function NotifRow({ notif, isNew }: { notif: Notification; isNew: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <Link
        href={notif.href}
        className={`group flex items-start gap-4 rounded-2xl border p-4 transition-colors hover:border-accent/50 ${
          isNew
            ? "border-accent/30 bg-accent/5"
            : "border-line bg-surface-2/30"
        }`}
      >
        {/* Icon */}
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${KIND_BG[notif.kind] ?? "bg-gray-500/20 text-gray-300"}`}
        >
          {notif.icon}
        </span>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">{notif.title}</p>
            <span className="rounded-full border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              {KIND_LABEL[notif.kind] ?? notif.kind}
            </span>
            {isNew && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            )}
          </div>
          <p className="mt-1 text-sm text-gray-400">{notif.body}</p>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className="mt-1 shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );
}

export default function NotificationsPage() {
  const mounted = useMounted();

  const achievements = useGameStore((s) => s.achievements);
  const lastLevelUp = useGameStore((s) => s.lastLevelUp);
  const lastSeasonResult = useGameStore((s) => s.lastSeasonResult);
  const dueReviewsFn = useGameStore((s) => s.dueReviews);
  const lastActiveDay = useGameStore((s) => s.lastActiveDay);
  const streak = useGameStore((s) => s.streak);

  const { seen, markAllSeen } = useSeenNotifs();

  const snap: NotifSnapshot = useMemo(
    () => ({
      achievements: mounted ? achievements : [],
      lastLevelUp: mounted ? lastLevelUp : null,
      lastSeasonResult: mounted ? lastSeasonResult : null,
      dueReviewIds: mounted ? dueReviewsFn() : [],
      lastActiveDay: mounted ? lastActiveDay : null,
      streak: mounted ? streak : 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mounted, achievements, lastLevelUp, lastSeasonResult, lastActiveDay, streak],
  );

  const notifications = useMemo(
    () => deriveNotifications(snap, seen),
    [snap, seen],
  );

  const unread = notifications.filter((n) => !seen.has(n.id));

  function handleMarkAllRead() {
    markAllSeen(notifications.map((n) => n.id));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={24} className="text-accent-soft" />
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          {unread.length > 0 && (
            <span className="rounded-full bg-danger px-2 py-0.5 text-xs font-bold text-white">
              {unread.length}
            </span>
          )}
        </div>
        {unread.length > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <BellOff size={13} /> Mark all read
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Your achievements, level-ups, league results, and reminders — all in one place.
      </p>

      {/* List */}
      <div className="mt-6 space-y-3">
        {!mounted ? (
          // Skeleton while hydrating.
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl border border-line bg-surface-2/40"
            />
          ))
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface-2/30 py-16 text-center">
            <BellOff size={32} className="text-gray-600" />
            <p className="text-sm font-medium text-gray-400">
              No notifications right now.
            </p>
            <p className="text-xs text-gray-600">
              Complete lessons, unlock achievements, and level up to see
              activity here.
            </p>
            <Link href="/learn" className="btn-primary mt-2">
              Start learning
            </Link>
          </div>
        ) : (
          notifications.map((n) => (
            <NotifRow key={n.id} notif={n} isNew={!seen.has(n.id)} />
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <p className="mt-8 text-center text-xs text-gray-600">
          Notifications are derived from your local game state and reset when
          you complete the associated action.
        </p>
      )}
    </div>
  );
}
