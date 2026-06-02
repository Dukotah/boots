import type { Metadata } from "next";
import { ROOMS, totalRooms } from "@/lib/rooms";
import { RoomCatalog } from "@/components/rooms/RoomCatalog";

export const metadata: Metadata = {
  title: "Challenge Rooms — Capture-the-Flag Coding Puzzles",
  description:
    "HackTheBox-style challenge rooms: read code, hunt values out of logs with regex, and learn web security. Capture flags, earn XP — all free, all in your browser.",
  keywords: [
    "coding challenges",
    "capture the flag",
    "ctf for beginners",
    "regex challenges",
    "sql injection tutorial",
    "javascript output quiz",
  ],
  alternates: { canonical: "/rooms" },
};

export default function RoomsIndex() {
  const flags = ROOMS.reduce((sum, r) => sum + r.tasks.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Challenge Rooms</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        {totalRooms()} rooms · {flags} flags to capture. Self-contained puzzles
        inspired by HackTheBox &amp; TryHackMe — read code, dig through logs, and
        learn security. Submit a flag, earn XP. Free, no setup.
      </p>

      <RoomCatalog />
    </div>
  );
}
