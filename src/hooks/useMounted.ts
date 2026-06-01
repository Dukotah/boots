"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the first client render. Use this to gate UI that
 * depends on persisted (localStorage) store state, avoiding hydration mismatch.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
