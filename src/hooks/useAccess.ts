"use client";

// Bridges the access policy (lib/access) with the user's entitlement state
// (useEntitlements) so components ask one question: "can I interact with this
// lesson, and if not, why?"

import { useEntitlements } from "@/store/useEntitlements";
import { canInteract, isFreePreview } from "@/lib/access";

export type Access = {
  isPro: boolean;
  /** True when the interactive features are paywalled for this user. */
  locked: boolean;
  /** True when this lesson is part of the free taste. */
  isFreePreview: boolean;
};

export function useAccess(lessonIndex: number): Access {
  const isPro = useEntitlements((s) => s.isPro);
  return {
    isPro,
    locked: !canInteract({ isPro, lessonIndex }),
    isFreePreview: isFreePreview(lessonIndex),
  };
}
