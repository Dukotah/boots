"use client";

import { MotionConfig } from "framer-motion";

// Honours the OS "reduce motion" setting for every framer-motion animation in the
// app (toasts, banners, the mobile course-map drawer, cards). One wrapper covers
// all `motion.*` usages — `reducedMotion="user"` disables transform/layout
// animations when the user has asked for less motion, while keeping opacity.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
