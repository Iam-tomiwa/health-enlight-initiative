import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-brand-950 px-6 pt-[72px] text-center text-white">
      <div className="max-w-md">
        <p className="font-display text-7xl font-semibold text-leaf">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          This page took a different path
        </h1>
        <p className="mt-3 text-white/60">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
        >
          Back to home
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
