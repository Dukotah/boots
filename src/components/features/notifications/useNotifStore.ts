"use client";

// Small hook that owns the "seen" set — persisted in its own localStorage key
// so it never touches the game store. This is intentionally NOT Zustand; a
// plain useState + localStorage read keeps the dependency graph clean.

import { useCallback, useEffect, useState } from "react";

const LS_KEY = "cantrip_notifs_read";

function readSeen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
  } catch {
    // Corrupt or inaccessible storage — no-op.
  }
  return new Set();
}

function writeSeen(ids: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Storage full or private mode — ignore.
  }
}

export function useSeenNotifs() {
  const [seen, setSeen] = useState<Set<string>>(new Set());

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    setSeen(readSeen());
  }, []);

  const markSeen = useCallback((ids: string[]) => {
    setSeen((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      writeSeen(next);
      return next;
    });
  }, []);

  const markAllSeen = useCallback((ids: string[]) => {
    setSeen((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      writeSeen(next);
      return next;
    });
  }, []);

  return { seen, markSeen, markAllSeen };
}
