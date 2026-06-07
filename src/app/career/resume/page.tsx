"use client";

import { CareerOnePager } from "@/components/features/career/CareerOnePager";

/**
 * /career/resume
 *
 * Recruiter-facing career one-pager. All rendering logic lives in
 * CareerOnePager — this file is intentionally thin so an integrator can drop
 * a link anywhere in the career section without touching page logic.
 *
 * Metadata (title: "Resume", noindex) is declared in layout.tsx.
 */
export default function ResumePage() {
  return <CareerOnePager />;
}
