"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GalleryItem } from "@/lib/sanity";

export default function GalleryGrid({ gallery }: { gallery: GalleryItem[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => [
    { id: "all", label: "All" },
    ...Array.from(new Map(gallery.map((item) => [item.category, item.categoryLabel ?? item.category])).entries())
      .map(([id, label]) => ({ id, label })),
  ], [gallery]);

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter gallery"
      >
        {categories.map((c) => {
          const active = c.id === filter;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "bg-white text-ink/70 ring-1 ring-inset ring-line hover:text-brand"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <Link key={item.id ?? item.src} href={`/gallery/${item.albumSlug}`} className="block break-inside-avoid">
            <motion.figure
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : (i % 4) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block overflow-hidden rounded-2xl bg-brand-50"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={450}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-4 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption ?? item.categoryLabel}
              </figcaption>
            </motion.figure>
            </Link>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
