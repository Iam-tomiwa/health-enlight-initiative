import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { ProgramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Become a volunteer with The Health enLight Initiative and help build healthier, better-informed communities.",
};

const ways = [
  {
    icon: "school",
    title: "Mentor a health club",
    body: "Guide student ambassadors as they lead health education among their peers.",
  },
  {
    icon: "outreach",
    title: "Join an outreach",
    body: "Support community screening days and door-to-door awareness campaigns.",
  },
  {
    icon: "webinar",
    title: "Share your expertise",
    body: "Speak at a webinar or help translate complex research into clear guidance.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Become a volunteer"
        title="Be a part of our story today"
        intro="Every informed action creates a ripple of health literacy. Tell us how you'd like to help and we'll find the right way to get you involved."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Ways to get involved
              </h2>
            </Reveal>
            <RevealGroup className="mt-8 space-y-4">
              {ways.map((w) => (
                <RevealItem
                  key={w.title}
                  className="flex items-start gap-5 rounded-3xl border border-line bg-white p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                    <ProgramIcon name={w.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{w.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-3xl bg-brand-950 p-8 text-white">
                <p className="font-display text-xl font-medium leading-snug">
                  &ldquo;A mansion rises from the union of many bricks.&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/60">
                  Your time and skills are a brick in something lasting.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-cream/60 p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-muted">
                We&apos;ll receive your message and get back to you.
              </p>
              <div className="mt-7">
                <ContactForm variant="volunteer" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
