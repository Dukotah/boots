"use client";

import { allProjects, projectProgress } from "@/lib/projects";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { PortfolioHub } from "@/components/features/projects/PortfolioHub";

export default function ProjectsPage() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  const projects = allProjects();
  const done = mounted ? new Set(completed) : new Set<string>();
  const { done: doneCount } = mounted
    ? projectProgress(completed)
    : { done: 0 };

  return (
    <PortfolioHub
      projects={projects}
      done={done}
      doneCount={doneCount}
    />
  );
}
