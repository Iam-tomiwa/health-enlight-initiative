import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people behind The Health enLight Initiative — a team building healthier communities through evidence-based action.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="A mansion rises from the union of many bricks"
        intro="Success is like building a mansion — each brick matters, each effort counts. With patience and consistency, small efforts yield great achievements."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          {/* PLACEHOLDER: swap these role cards for real member profiles + photos */}
          <Reveal>
            <div className="mb-10 rounded-2xl border border-dashed border-brand/25 bg-brand-50/50 px-6 py-4 text-sm text-brand">
              Placeholder roster — replace with real names, photos and short bios
              when ready.
            </div>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <RevealItem
                key={i}
                className="group overflow-hidden rounded-3xl border border-line bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50">
                  {/* monogram stand-in for a portrait */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-5xl font-semibold text-brand/30">
                      HL
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {m.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-brand">{m.role}</p>
                  <p className="mt-2 text-sm text-muted">{m.focus}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-center gap-5 rounded-3xl bg-cream px-8 py-12 text-center">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Want to add your brick to the mansion?
              </h2>
              <p className="max-w-xl text-muted">
                We are always looking for passionate volunteers and partners to help
                us reach more communities.
              </p>
              <Button href="/volunteer">
                Volunteer with us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
