"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { ArrowRight } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change and lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Every page opens on a dark green hero, so the bar rides light over it
  // until the user scrolls, then flips to a solid white bar with dark text.
  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        light ? "bg-transparent" : "bg-white/90 backdrop-blur-md shadow-soft"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center" aria-label={site.name}>
          <img
            src={"/logo.png"}
            alt={site.name}
            className={`max-h-9 w-auto object-contain ${light ? "invert grayscale" : ""}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  light
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active
                      ? "text-brand"
                      : "text-ink/70 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/volunteer"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft transition-all duration-300 hover:shadow-card sm:inline-flex ${
              light
                ? "bg-white text-brand hover:bg-white/90"
                : "bg-brand text-white hover:bg-brand-700"
            }`}
          >
            Volunteer
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`grid h-11 w-11 place-items-center rounded-full ring-1 ring-inset transition-colors lg:hidden ${
              light ? "ring-white/30 text-white" : "ring-line text-ink"
            }`}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-2 -rotate-45" : "top-[13px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              aria-label="Mobile"
              className="container-page flex flex-col gap-1 border-t border-line bg-white pb-6 pt-2"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-brand-50 hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/volunteer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                Volunteer <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
