"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";
import { ArrowRight } from "@/components/icons";
import type { RecentProgram } from "@/lib/sanity";

function formattedDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function RecentProgramsGrid({
  programs,
}: {
  programs: RecentProgram[];
}) {
  const [filter, setFilter] = useState<"all" | "webinar" | "outreach">("all");
  const filteredPrograms = useMemo(
    () => filter === "all"
      ? programs
      : programs.filter((program) => program.activityType.toLowerCase() === filter),
    [filter, programs],
  );

  if (programs.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-cream px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Programs are being prepared
        </h2>
        <p className="mt-2 text-sm text-muted">
          Please check back soon for recent programme highlights.
        </p>
      </div>
    );
  }

  const tabs = [
    {id: "all" as const, label: "All Programs", count: programs.length},
    {id: "webinar" as const, label: "Webinars", count: programs.filter((program) => program.activityType.toLowerCase() === "webinar").length},
    {id: "outreach" as const, label: "Outreaches", count: programs.filter((program) => program.activityType.toLowerCase() === "outreach").length},
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter recent programs">
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "bg-white text-ink/70 ring-1 ring-inset ring-line hover:text-brand"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${active ? "bg-white/15 text-white" : "bg-brand-50 text-brand"}`}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {filteredPrograms.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-line bg-cream px-6 py-14 text-center">
          <p className="font-display text-xl font-semibold text-ink">No {filter === "webinar" ? "webinars" : "outreaches"} to show yet</p>
          <p className="mt-2 text-sm text-muted">New program highlights will appear here when published.</p>
        </div>
      ) : (
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPrograms.map((program, index) => (
        <Link
          key={program.id}
          href={`/recent-programs/${program.slug}`}
          className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card ${
            index === 0 ? "md:col-span-2 lg:grid lg:grid-cols-2" : ""
          }`}
        >
          <div
            className={`relative overflow-hidden bg-brand-50 ${index === 0 ? "min-h-72" : "aspect-[4/3]"}`}
          >
            <Image
              src={program.coverImage}
              alt={program.coverImageAlt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 1024px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
            />
          </div>
          <div
            className={`flex grow flex-col p-6 sm:p-7 ${index === 0 ? "justify-center lg:p-10" : ""}`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span>{program.activityType}</span>
              {formattedDate(program.occurredAt) && (
                <>
                  <span className="text-line">•</span>
                  <time dateTime={program.occurredAt}>
                    {formattedDate(program.occurredAt)}
                  </time>
                </>
              )}
            </div>
            <h2
              className={`mt-3 font-display font-semibold leading-tight text-ink ${index === 0 ? "text-3xl" : "text-2xl"}`}
            >
              {program.title}
            </h2>
            <p className="mt-3 mb-3 line-clamp-3 text-sm leading-relaxed text-muted">
              {program.description}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-muted">
                {program.imageCount}{" "}
                {program.imageCount === 1 ? "photo" : "photos"}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-brand">
                View program{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      ))}
      </div>
      )}
    </div>
  );
}
