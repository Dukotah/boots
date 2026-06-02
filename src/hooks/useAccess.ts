"use client";

// Bridges the access policy (lib/access) with the user's entitlement state
// (useEntitlements) + streak (useGameStore) so components ask one question:
// "can I interact with this lesson, and if not, why?"

import { useEntitlements } from "@/store/useEntitlements";
import { useGameStore } from "@/store/useGameStore";
import { canInteract, isFreePreview, freeLessonLimit } from "@/lib/access";

export type Access = {
  isPro: boolean;
  /** True when the interactive features are paywalled for this user. */
  locked: boolean;
  /** True when this lesson is part of the (streak-extended) free taste. */
  isFreePreview: boolean;
  /** How many lessons into the course are currently free for this learner. */
  freeLimit: number;
};

export function useAccess(lessonIndex: number, free = false): Access {
  const isPro = useEntitlements((s) => s.isPro);
  const streak = useGameStore((s) => s.streak);
  return {
    isPro,
    locked: !canInteract({ isPro, lessonIndex, free, streak }),
    isFreePreview: isFreePreview(lessonIndex, streak),
    freeLimit: freeLessonLimit(streak),
  };
}
