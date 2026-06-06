"use client";

// Bell icon with unread badge + dropdown preview of latest notifications.
// Mount this in the Navbar (see integrationNeeded in the agent output).

import { useRef, useState, useEffect, useCallback } from "react";
import { Bell, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { deriveNotifications, type NotifSnapshot } from "@/lib/notifications";
import { useSeenNotifs } from "./useNotifStore";

// How many notifications to preview in the dropdown.
const PREVIEW_LIMIT = 5;

// Icon backgrounds keyed by kind.
const KIND_BG: Record<string, string> = {
  achievement: "bg-gold/20 text-gold",
  level_up: "bg-accent/20 text-accent-soft",
  season_result: "bg-violet-500/20 text-violet-300",
  reviews_due: "bg-sky-500/20 text-sky-300",
  streak_risk: "bg-danger/20 text-danger",
};

export function NotificationBell() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Pull the minimal slice we need from the store (fine-grained selectors avoid
  // re-renders on every store update).
  const achievements = useGameStore((s) => s.achievements);
  const lastLevelUp = useGameStore((s) => s.lastLevelUp);
  const lastSeasonResult = useGameStore((s) => s.lastSeasonResult);
  const dueReviewsFn = useGameStore((s) => s.dueReviews);
  const lastActiveDay = useGameStore((s) => s.lastActiveDay);
  const streak = useGameStore((s) => s.streak);

  const { seen, markAllSeen } = useSeenNotifs();

  // Build the snapshot that the pure derivation function expects.
  const snap: NotifSnapshot = {
    achievements: mounted ? achievements : [],
    lastLevelUp: mounted ? lastLevelUp : null,
    lastSeasonResult: mounted ? lastSeasonResult : null,
    dueReviewIds: mounted ? dueReviewsFn() : [],
    lastActiveDay: mounted ? lastActiveDay : null,
    streak: mounted ? streak : 0,
  };

  const notifications = deriveNotifications(snap, seen);
  const unread = notifications.filter((n) => !seen.has(n.id)).length;

  // Mark all currently-visible as seen when the dropdown opens.
  const handleOpen = useCallback(() => {
    setOpen((o) => {
      if (!o) {
        // Mark all as seen on open.
        markAllSeen(notifications.map((n) => n.id));
      }
      return !o;
    });
  }, [notifications, markAllSeen]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!mounted) {
    // Reserve space so layout does not shift on hydration.
    return <div className="h-9 w-9" />;
  }

  const preview = notifications.slice(0, PREVIEW_LIMIT);

  return (
    <div ref={ref} className="relative">
      {/* Bell button */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ""}`}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-surface-2 hover:text-white transition-colors"
      >
        <Bell size={18} />
        {unread > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-danger px-0.5 text-[10px] font-bold leading-none text-white"
          >
            {unread > 9 ? "9+" : unread}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-line bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-sm font-semibold text-white">
                Notifications
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="text-gray-400 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            {/* List */}
            {preview.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                All caught up!
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto py-1">
                {preview.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-surface-2 transition-colors"
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base ${KIND_BG[n.kind] ?? "bg-gray-500/20 text-gray-300"}`}
                      >
                        {n.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                          {n.body}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer */}
            <div className="border-t border-line px-4 py-2.5">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1 text-xs font-medium text-accent-soft hover:text-white transition-colors"
              >
                View all notifications <ChevronRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
