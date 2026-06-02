import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ROOMS, getRoom, roomXp } from "@/lib/rooms";
import type { RoomDifficulty } from "@/lib/rooms/types";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { RoomView } from "@/components/rooms/RoomView";

const DIFFICULTY: Record<RoomDifficulty, { label: string; cls: string }> = {
  easy: { label: "Easy", cls: "bg-success/20 text-success" },
  medium: { label: "Medium", cls: "bg-gold/20 text-gold" },
  hard: { label: "Hard", cls: "bg-danger/20 text-danger" },
};

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const room = getRoom(params.slug);
  if (!room) return {};
  return {
    title: `${room.title} — Challenge Room`,
    description: room.blurb,
    keywords: room.tags,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: {
      type: "website",
      title: `${room.title} — Cantrip Challenge Room`,
      description: room.blurb,
      url: `/rooms/${room.slug}`,
    },
  };
}

export default function RoomPage({ params }: { params: { slug: string } }) {
  const room = getRoom(params.slug);
  if (!room) notFound();

  const diff = DIFFICULTY[room.difficulty];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Challenge Rooms", path: "/rooms" },
          { name: room.title, path: `/rooms/${room.slug}` },
        ])}
      />
      <Link href="/rooms" className="text-sm text-accent-soft hover:underline">
        ← All rooms
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl">{room.emoji}</span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold text-white">{room.title}</h1>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${diff.cls}`}>
              {diff.label}
            </span>
          </div>
          <p className="mt-1 text-gray-400">
            {room.tasks.length} flags · {roomXp(room)} XP · {room.tags.join(", ")}
          </p>
        </div>
      </div>

      <div className="prose-lesson mt-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{room.intro}</ReactMarkdown>
      </div>

      <RoomView room={room} />
    </div>
  );
}
