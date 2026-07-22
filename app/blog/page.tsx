import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Evidence-based articles, deep-dive research and community stories from The Health enLight Initiative.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Our discoveries"
        title="Evidence you can act on"
        intro="A curated collection of evidence-based articles, deep-dive research and community stories — translating complex medical data into practical, life-saving advice."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          {/* PLACEHOLDER: replace with the organisation's real research posts */}
          <Reveal>
            <div className="mb-10 rounded-2xl border border-dashed border-brand/25 bg-brand-50/50 px-6 py-4 text-sm text-brand">
              Placeholder articles — connect your CMS or drop in the real research
              posts to go live.
            </div>
          </Reveal>

          {/* Featured */}
          <Reveal>
            <article className="group grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-50 lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs font-medium text-muted">
                  <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand">
                    {featured.category}
                  </span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          </Reveal>

          <RevealGroup className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <RevealItem
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted">
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand">
                      {p.category}
                    </span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
