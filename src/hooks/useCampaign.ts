"use client";

// useCampaign — derives the Campaign Map skill-tree state from the curriculum data
// and the player's progress. This is the *business logic* for unlocking; the map
// components stay purely presentational.
//
// Unlock rules (boot.dev-style sequential gating):
//   • A module unlocks when the previous module is fully completed (the first
//     module is always unlocked).
//   • Within an unlocked module, a lesson is available when it's the first lesson
//     or the previous lesson is completed.
//   • The lesson matching the store's `activeQuest` is surfaced as "active".

import { useMemo } from "react";
import { MODULES, lessonId } from "@/lib/curriculum";
import type { Lesson, Module } from "@/lib/curriculum/types";
import { useGameStore } from "@/store/useGameStore";
import type { QuestNodeStatus } from "@/types/game";

export type CampaignNode = {
  id: string; // "moduleSlug/lessonSlug"
  index: number; // position within the module
  lesson: Lesson;
  href: string;
  status: QuestNodeStatus;
};

export type CampaignModule = {
  module: Module;
  unlocked: boolean;
  completedCount: number;
  total: number;
  /** 0..1 completion of this module. */
  progress: number;
  nodes: CampaignNode[];
};

export type Campaign = {
  modules: CampaignModule[];
  /** The single lesson the player should jump into next ("Continue"). */
  nextUp: CampaignNode | null;
  completedCount: number;
  totalLessons: number;
};

export function useCampaign(): Campaign {
  const completed = useGameStore((s) => s.completed);
  const activeQuest = useGameStore((s) => s.activeQuest);

  return useMemo(() => {
    const done = new Set(completed);
    let prevModuleComplete = true; // first module is always reachable
    let nextUp: CampaignNode | null = null;

    const modules: CampaignModule[] = MODULES.map((module) => {
      const unlocked = prevModuleComplete;
      let completedCount = 0;

      const nodes: CampaignNode[] = module.lessons.map((lesson, index) => {
        const id = lessonId(module.slug, lesson.slug);
        const isDone = done.has(id);
        if (isDone) completedCount++;

        const prevDone =
          index === 0 ? true : done.has(lessonId(module.slug, module.lessons[index - 1].slug));
        const reachable = unlocked && prevDone;

        let status: QuestNodeStatus;
        if (isDone) status = "completed";
        else if (!reachable) status = "locked";
        else if (id === activeQuest) status = "active";
        else status = "available";

        const node: CampaignNode = {
          id,
          index,
          lesson,
          href: `/learn/${module.slug}/${lesson.slug}`,
          status,
        };

        // First non-completed, reachable node becomes the global "next up".
        if (!nextUp && !isDone && reachable) nextUp = node;
        return node;
      });

      const total = module.lessons.length;
      prevModuleComplete = completedCount === total;

      return {
        module,
        unlocked,
        completedCount,
        total,
        progress: total === 0 ? 0 : completedCount / total,
        nodes,
      };
    });

    return {
      modules,
      nextUp,
      completedCount: done.size,
      totalLessons: MODULES.reduce((sum, m) => sum + m.lessons.length, 0),
    };
  }, [completed, activeQuest]);
}
