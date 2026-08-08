import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal, {RevealGroup, RevealItem} from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Button from "@/components/Button";
import RichText from "@/components/RichText";
import {ArrowRight} from "@/components/icons";
import {getAboutPage} from "@/lib/sanity";
import {createPageMetadata} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  if (!page) return {};

  const metadata = createPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/about",
  });

  return {...metadata, robots: page.seo.noIndex ? {index: false, follow: false} : undefined};
}

export default async function AboutPage() {
  const page = await getAboutPage();
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow={page.header.eyebrow} title={page.header.title} intro={page.header.introduction} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-50">
              <Image src={page.vision.image} alt={page.vision.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal><p className="eyebrow">{page.vision.eyebrow}</p></Reveal>
            <Reveal delay={0.06}><h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{page.vision.title}</h2></Reveal>
            <Reveal delay={0.1}><div className="mt-5"><RichText value={page.vision.body} /></div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal><p className="eyebrow">{page.mission.eyebrow}</p></Reveal>
            <Reveal delay={0.06}><h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{page.mission.title}</h2></Reveal>
          </div>
          <RevealGroup className="space-y-3">
            {page.mission.points.map((point, index) => (
              <RevealItem key={point.key} className="flex items-start gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-2xl font-semibold text-brand/40">{String(index + 1).padStart(2, "0")}</span>
                <p className="pt-1 text-ink/85">{point.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal><p className="eyebrow">{page.approach.eyebrow}</p></Reveal>
            <Reveal delay={0.06}><h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{page.approach.title}</h2></Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {page.approach.items.map((item) => (
              <RevealItem key={item.key} className="rounded-3xl border border-line bg-white p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <div className="container-page">
          <Reveal><h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{page.impact.title}</h2></Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {page.impact.statistics.map((stat) => (
              <RevealItem key={stat.key} className="border-t border-white/15 pt-6">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl"><CountUp value={stat.value} suffix={stat.suffix} /></p>
                <p className="mt-2 text-sm text-white/55">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal><p className="eyebrow">{page.journey.eyebrow}</p></Reveal>
            <Reveal delay={0.06}><h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{page.journey.title}</h2></Reveal>
          </div>
          <div className="mt-12 space-y-4">
            {page.journey.milestones.map((milestone, index) => (
              <Reveal key={milestone.key} delay={index * 0.05}>
                <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 sm:flex-row sm:gap-8">
                  <span className="font-display text-4xl font-semibold text-brand/25 sm:w-24">{milestone.step}</span>
                  <div className="sm:flex-1"><h3 className="font-display text-xl font-semibold text-ink">{milestone.title}</h3><p className="mt-2 text-muted">{milestone.description}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><div className="mt-12 flex justify-center"><Button href={page.callToAction.href}>{page.callToAction.label}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Button></div></Reveal>
        </div>
      </section>
    </>
  );
}
