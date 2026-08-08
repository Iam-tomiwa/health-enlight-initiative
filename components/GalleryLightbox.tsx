"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

function CloseIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return <svg viewBox="0 0 24 24" className={`h-6 w-6 ${direction === "right" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>;
}

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback((direction: number) => {
    setActiveIndex((current) => current === null ? null : (current + direction + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const openFromHero = () => {
      if (images.length > 0) setActiveIndex(0);
    };
    window.addEventListener("hli:open-program-gallery", openFromHero);
    return () => window.removeEventListener("hli:open-program-gallery", openFromHero);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [close, isOpen, move]);

  return (
    <>
      <RevealGroup className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((image, index) => (
          <RevealItem key={image.id} className="group break-inside-avoid overflow-hidden rounded-3xl bg-brand-50">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full cursor-zoom-in text-left focus-visible:outline-offset-[-3px]"
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
            >
              <figure>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={675}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  className="h-auto w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
                />
                {image.caption && <figcaption className="px-5 py-4 text-sm text-muted">{image.caption}</figcaption>}
              </figure>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[100] flex flex-col bg-brand-950/95 p-3 text-white backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.25 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
          >
            <div className="flex h-12 shrink-0 items-center justify-between gap-4">
              <p className="text-sm font-medium text-white/70">{activeIndex + 1} / {images.length}</p>
              <button ref={closeButton} type="button" onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20" aria-label="Close image viewer">
                <CloseIcon />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={images[activeIndex].id}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduce ? 0.1 : 0.25 }}
                  drag={reduce || images.length < 2 ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) move(1);
                    if (info.offset.x > 80) move(-1);
                  }}
                >
                  <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill quality={90} sizes="100vw" className="select-none object-contain" priority />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => move(-1)} className="absolute left-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white ring-1 ring-inset ring-white/20 backdrop-blur transition-colors hover:bg-black/60 sm:left-3" aria-label="Previous image"><Chevron direction="left" /></button>
                  <button type="button" onClick={() => move(1)} className="absolute right-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white ring-1 ring-inset ring-white/20 backdrop-blur transition-colors hover:bg-black/60 sm:right-3" aria-label="Next image"><Chevron direction="right" /></button>
                </>
              )}
            </div>

            <div className="shrink-0 pb-1 pt-4 text-center">
              <p className="mx-auto max-w-3xl text-sm text-white/75">{images[activeIndex].caption ?? images[activeIndex].alt}</p>
              {images.length > 1 && (
                <div className="no-scrollbar mx-auto mt-3 flex max-w-3xl justify-start gap-2 overflow-x-auto px-1 sm:justify-center">
                  {images.map((image, index) => (
                    <button key={image.id} type="button" onClick={() => setActiveIndex(index)} className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-opacity ${index === activeIndex ? "ring-2 ring-leaf" : "opacity-50 hover:opacity-90"}`} aria-label={`View image ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined}>
                      <Image src={image.src} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
