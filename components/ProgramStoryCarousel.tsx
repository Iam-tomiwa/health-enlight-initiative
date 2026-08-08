"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {useReducedMotion} from "framer-motion";
import type {PortableTextBlock} from "@portabletext/types";
import RichText from "@/components/RichText";
import {ArrowRight} from "@/components/icons";

type StoryItem = {label: string; body: PortableTextBlock[]};

export default function ProgramStoryCarousel({items}: {items: StoryItem[]}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    const next = (index + items.length) % items.length;
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    if (track && slide) {
      track.scrollTo({left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth"});
      setActive(next);
    }
  }, [items.length, reduceMotion]);

  useEffect(() => {
    if (paused || reduceMotion || items.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => {
      const next = (current + 1) % items.length;
      const track = trackRef.current;
      const slide = track?.children[next] as HTMLElement | undefined;
      if (track && slide) track.scrollTo({left: slide.offsetLeft, behavior: "smooth"});
      return next;
    }), 4500);
    return () => window.clearInterval(timer);
  }, [items.length, paused, reduceMotion]);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Program story"
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((item, index) => (
          <article
            key={item.label}
            className="basis-full shrink-0 snap-start rounded-3xl border border-line bg-white p-7 sm:p-8 lg:basis-[calc((100%_-_2.5rem)_/_2.5)]"
            aria-label={`${index + 1} of ${items.length}: ${item.label}`}
          >
            <span className="font-display text-3xl font-semibold text-brand/25">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.label}</h3>
            <div className="mt-3 text-sm"><RichText value={item.body} /></div>
          </article>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center justify-between gap-5">
          <div className="flex gap-2" aria-label="Choose story slide">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${active === index ? "w-7 bg-brand" : "w-2 bg-brand/20 hover:bg-brand/40"}`}
                aria-label={`Show ${item.label}`}
                aria-current={active === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(active - 1)} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-brand transition hover:bg-brand hover:text-white" aria-label="Previous story">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" onClick={() => goTo(active + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-brand transition hover:bg-brand hover:text-white" aria-label="Next story">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
