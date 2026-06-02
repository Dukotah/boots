import Link from "next/link";
import { MascotBoots } from "@/components/MascotBoots";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <MascotBoots size={72} />
      <p className="mt-6 text-6xl font-black text-white">404</p>
      <h1 className="mt-2 text-xl font-bold text-white">
        This page vanished in a puff of smoke
      </h1>
      <p className="mt-2 text-gray-400">
        Your quest for this page failed — the spell fizzled. Let’s get you back on
        the path.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/learn" className="btn-primary">
          Browse courses
        </Link>
        <Link href="/" className="btn-ghost">
          Go home
        </Link>
      </div>
    </div>
  );
}
