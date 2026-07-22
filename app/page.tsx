"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import EventCards from "@/components/EventCards";
import CountUp from "@/components/CountUp";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { ProgramIcon, ArrowRight, ArrowUpRight } from "@/components/icons";
import {
  stats,
  programs,
  approach,
  story,
  testimonials,
  galleryImages,
} from "@/lib/content";

export default function HomePage() {
  const peek = [
    galleryImages.schoolClub[0],
    galleryImages.amr[3],
    galleryImages.schoolClub[6],
    galleryImages.amr[7],
    galleryImages.schoolClub[2],
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % peek.length);
    }, 6000); // Switch image every 6 seconds
    return () => clearInterval(timer);
  }, [peek.length]);

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Background Slideshow */}
          {peek.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? "opacity-60" : "opacity-0"
              }`}
            />
          ))}

          {/* Overlays & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/75 to-brand-950" />
          <div className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-brand-600/30 blur-[100px]" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-leaf/15 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="container-page relative grid items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-36">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 ring-1 ring-inset ring-white/15">
                Health enLight Initiative
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Enlightening Communities, <br />
                <span className="relative text-leaf">
                  Transforming <br /> Health
                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-leaf/60"
                    viewBox="0 0 200 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 9C40 3 160 3 198 9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                We believe that the world would be a better place if everyone
                had access to knowledge and resources to make informed decisions
                about their health. We are on a mission to make that happen.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  href="/volunteer"
                  variant="secondary"
                  className="!bg-white !text-brand hover:!bg-white/90"
                >
                  Get involved
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
                >
                  How we work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-7">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl font-semibold text-white">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-white/55">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* animated events */}
          <div className="relative">
            <EventCards />
          </div>
        </div>

        {/* soft transition into next section */}
        <div className="h-16 w-full rounded-t-[2.5rem] bg-white relative" />
      </section>

      {/* ───────────── Mission strip ───────────── */}
      <section className="bg-white">
        <div className="container-page pb-8">
          <Reveal>
            <p className="mx-auto text-center font-display text-2xl font-medium leading-snug text-ink sm:text-[2rem]">
              "The greatest medicine of all is to teach people how not to need
              it" <br />—<span className="text-brand">Hippocrates</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Programs ───────────── */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <p className="eyebrow">What we do</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Five ways we turn knowledge into healthier communities
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand link-underline"
              >
                Explore our approach
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <RevealItem
                key={p.title}
                className={`group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card ${
                  i === 0 ? "lg:row-span-2 lg:bg-brand-50/60" : ""
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 group-hover:scale-105">
                  <ProgramIcon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
                {i === 0 && (
                  <p className="mt-auto pt-6 text-sm font-medium text-brand">
                    Grounded in research, delivered with compassion.
                  </p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────────── Approach (dark) ───────────── */}
      <section className="bg-brand-950 py-20 text-white">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                How we work
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                From data to lives — a research-first way of doing good
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-white/65">
                We move beyond passive teaching. Every outreach is anchored in
                evidence and shaped by the real needs of the community it
                serves.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Button
                href="/about"
                variant="secondary"
                className="mt-8 !bg-white !text-brand hover:!bg-white/90"
              >
                Read our story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {approach.map((a) => (
              <RevealItem
                key={a.title}
                className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.07]"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {a.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────────── Story timeline ───────────── */}
      <section className="bg-cream py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Our story</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                From a single spark of concern to a growing movement
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {story.map((s) => (
              <RevealItem key={s.step} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-semibold text-brand/25">
                    {s.step}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────────── Gallery peek ───────────── */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <p className="eyebrow">In the field</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Impact you can see
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand link-underline"
              >
                View the full gallery
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
            {peek.map((src, i) => (
              <RevealItem
                key={src}
                className={`group relative overflow-hidden rounded-2xl bg-brand-50 ${
                  i === 0
                    ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt="Health enLight Initiative in the community"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      <section className="bg-cream py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Voices</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Real stories of transformation
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem
                key={t.name}
                className="flex flex-col rounded-3xl border border-line bg-white p-7"
              >
                <div className="font-display text-5xl leading-none text-brand/20">
                  &ldquo;
                </div>
                <p className="-mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="bg-white pb-24 pt-4">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-leaf/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold leading-tight sm:text-[2.6rem]">
                  Be part of our story today
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-white/75">
                  Whether you volunteer, partner, or simply share what you learn
                  — every informed action creates a ripple of health literacy.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Button
                    href="/volunteer"
                    variant="secondary"
                    className="!bg-white !text-brand hover:!bg-white/90"
                  >
                    Become a volunteer
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10"
                  >
                    Partner with us
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
