"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { events as fallbackEvents } from "@/lib/content";
import type { SiteEvent } from "@/lib/sanity";
import { Calendar, Clock, Pin, ArrowRight } from "./icons";

const ROTATE_MS = 4200;

type EventCardsProps = { initialEvents?: SiteEvent[] };

export default function EventCards({ initialEvents }: EventCardsProps) {
  const reduce = useReducedMotion();
  const [events, setEvents] = useState<SiteEvent[]>(initialEvents?.length ? initialEvents : fallbackEvents);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (initialEvents?.length) return;
    void fetch("/api/content/events")
      .then((response) => response.ok ? response.json() as Promise<SiteEvent[]> : null)
      .then((items) => {
        if (items?.length) {
          setEvents(items);
          setIndex(0);
        }
      })
      .catch(() => undefined);
  }, [initialEvents]);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + events.length) % events.length),
    [events.length]
  );

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce, paused, go]);

  const active = events[index];

  return (
    <div
      className="relative mx-auto w-full max-w-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* label */}
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand shadow-soft backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
          </span>
          Upcoming events
        </span>
        <span className="text-xs font-medium text-white/80">
          {index + 1} / {events.length}
        </span>
      </div>

      {/* deck */}
      <div className="relative h-[430px]">
        {/* static ghost layers for depth */}
        <div className="absolute inset-x-4 top-4 h-full rounded-3xl bg-white/25 backdrop-blur-sm" aria-hidden />
        <div className="absolute inset-x-2 top-2 h-full rounded-3xl bg-white/50 backdrop-blur-sm" aria-hidden />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.article
            key={active.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96, rotate: -1.5 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.97 }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-float ring-1 ring-black/5"
          >
            <div className="relative h-[186px] w-full">
              <Image
                src={active.image}
                alt={active.imageAlt ?? ""}
                fill
                sizes="400px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  active.accent === "gold"
                    ? "bg-gold text-brand-950"
                    : "bg-leaf text-white"
                }`}
              >
                {active.status}
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand backdrop-blur">
                {active.tag}
              </span>
            </div>

            <div className="flex h-[244px] flex-col p-5">
              <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                {active.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {active.blurb}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-y-2.5 text-xs text-ink/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand" />
                  <dd>{active.date}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand" />
                  <dd>{active.time}</dd>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Pin className="h-4 w-4 text-brand" />
                  <dd>{active.location}</dd>
                </div>
              </dl>

              <a
                href={active.registrationUrl ?? "/volunteer"}
                className="group mt-auto inline-flex items-center justify-between rounded-full bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Reserve a place
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Choose event">
        {events.map((e, i) => (
          <button
            key={e.id}
            role="tab"
            aria-selected={i === index}
            aria-label={e.title}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
