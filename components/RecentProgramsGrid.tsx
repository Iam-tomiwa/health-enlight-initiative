import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "@/components/icons";
import type {RecentProgram} from "@/lib/sanity";

function formattedDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function RecentProgramsGrid({programs}: {programs: RecentProgram[]}) {
  if (programs.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">Programs are being prepared</h2>
        <p className="mt-2 text-sm text-muted">Please check back soon for recent programme highlights.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {programs.map((program, index) => (
        <Link
          key={program.id}
          href={`/recent-programs/${program.slug}`}
          className={`group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card ${
            index === 0 ? "md:col-span-2 lg:grid lg:grid-cols-2" : ""
          }`}
        >
          <div className={`relative overflow-hidden bg-brand-50 ${index === 0 ? "min-h-72" : "aspect-[4/3]"}`}>
            <Image
              src={program.coverImage}
              alt={program.coverImageAlt}
              fill
              sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
            />
          </div>
          <div className={`flex flex-col p-6 sm:p-7 ${index === 0 ? "justify-center lg:p-10" : ""}`}>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span>{program.activityType}</span>
              {formattedDate(program.occurredAt) && <><span className="text-line">•</span><time dateTime={program.occurredAt}>{formattedDate(program.occurredAt)}</time></>}
            </div>
            <h2 className={`mt-3 font-display font-semibold leading-tight text-ink ${index === 0 ? "text-3xl" : "text-2xl"}`}>{program.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{program.description}</p>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-muted">{program.imageCount} {program.imageCount === 1 ? "photo" : "photos"}</span>
              <span className="inline-flex items-center gap-2 font-semibold text-brand">View program <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
