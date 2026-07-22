import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { approach, story, missionPoints, stats, galleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Health enLight Initiative bridges the gap between medical research and daily life through evidence-based education, research and community engagement.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the foundation"
        title="A society empowered by health literacy"
        intro="We are a health-enlightenment NGO dedicated to building a more informed society — bridging the gap between complex medical research and daily life for those who need it most."
      />

      {/* Vision / intro with image */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-50">
              <Image
                src={galleryImages.schoolClub[1]}
                alt="Students taking part in a school health club"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">Our vision</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Confronting misinformation with clarity
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 text-muted">
                <p>
                  Driven by a commitment to scientific truth and community
                  empowerment, we deliver evidence-based knowledge that fosters a
                  culture where wellness is a proactive choice rather than a
                  reactive necessity.
                </p>
                <p>
                  Through grassroots outreaches, school health clubs and global
                  webinars, we equip individuals — especially young people — with
                  the tools to prevent disease and promote long-term well-being.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission points */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <p className="eyebrow">Our mission</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                What guides everything we do
              </h2>
            </Reveal>
          </div>
          <RevealGroup className="space-y-3">
            {missionPoints.map((m, i) => (
              <RevealItem
                key={m}
                className="flex items-start gap-5 rounded-2xl border border-line bg-white p-6"
              >
                <span className="font-display text-2xl font-semibold text-brand/40">
                  0{i + 1}
                </span>
                <p className="pt-1 text-ink/85">{m}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Our approach</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Compassion in action, grounded in evidence
              </h2>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {approach.map((a) => (
              <RevealItem
                key={a.title}
                className="rounded-3xl border border-line bg-white p-7"
              >
                <h3 className="font-display text-xl font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Our voice in numbers
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="border-t border-white/15 pt-6">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/55">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Our journey</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                How the movement grew
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 space-y-4">
            {story.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 sm:flex-row sm:gap-8">
                  <span className="font-display text-4xl font-semibold text-brand/25 sm:w-24">
                    {s.step}
                  </span>
                  <div className="sm:flex-1">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Button href="/volunteer">
                Join the movement
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
