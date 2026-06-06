"use client";

import { MotionConfig } from "framer-motion";

// Honor the OS "reduce motion" preference for all Framer Motion animations
// (WCAG 2.3.3). Pairs with the global CSS backstop in globals.css. Client
// boundary so the root layout (a Server Component) can use it.
export function ReducedMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
