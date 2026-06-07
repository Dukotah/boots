import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRACK_BOSS_DEFS, resolveTrackBoss } from "@/lib/curriculum/track-bosses";
import { BossFightView } from "@/components/boss/BossFightView";

// Search engines should not index the gauntlet runner (it's a logged-in,
// stateful play surface, not content) — matches the /boss layout's robots rule.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return TRACK_BOSS_DEFS.map((b) => ({ track: b.id }));
}

export default function TrackBossPage({
  params,
}: {
  params: { track: string };
}) {
  const boss = resolveTrackBoss(params.track);
  if (!boss) notFound();

  // Pass only the plain, serializable shape the client view needs. Lesson
  // content/test code is already public curriculum, so this is safe to ship.
  const view = {
    id: boss.id,
    name: boss.name,
    emoji: boss.emoji,
    blurb: boss.blurb,
    timeLimitSec: boss.timeLimitSec,
    rewardGold: boss.rewardGold,
    tasks: boss.tasks.map((t) => ({
      module: t.module,
      lesson: t.lesson,
      moduleTitle: t.moduleObj.title,
      moduleEmoji: t.moduleObj.emoji,
      title: t.lessonObj.title,
      blurb: t.lessonObj.blurb,
      xp: t.lessonObj.xp,
      content: t.lessonObj.content,
      starterCode: t.lessonObj.starterCode ?? "",
      tests: t.lessonObj.tests ?? [],
      language: t.language,
    })),
  };

  return <BossFightView boss={view} />;
}
