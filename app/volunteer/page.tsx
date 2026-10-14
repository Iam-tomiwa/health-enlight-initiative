import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import { ArrowRight, ProgramIcon } from "@/components/icons";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/sanity";
import SocialLinks from "@/components/SocialLinks";

export const metadata = createPageMetadata({
  title: "Volunteer",
  description:
    "Become a volunteer with The Health enLight Initiative and help build healthier, better-informed communities.",
  path: "/volunteer",
});

const ways = [
  {
    icon: "school",
    title: "Mentor a health club",
    body: "Guide student ambassadors as they lead health education among their peers.",
  },
  {
    icon: "outreach",
    title: "Build leadership and advocacy experience",
    body: "Gain leadership experience through health clubs and outreach.",
  },
  {
    icon: "award",
    title: "Earn certificates and recommendations",
    body: "Certificates and recommendations reflect your participation and performance.",
  },
];

export default async function VolunteerPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Become a volunteer"
        title="Be a part of our story today"
        intro="Are you a student, recent graduate or early-career professional passionate about health and empowering young people? Join our community of passionate volunteers to help promote better health outcomes through school health clubs."
        actionClassName="sm:hidden"
        action={
          <Button variant="secondary" href="#volunteer-application">
            Join now
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[1.05fr_0.95fr]">
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

              {settings?.socialLinks.length ? (
                <Reveal delay={0.2}>
                  <div className="mt-10 hidden border-t border-line pt-7 lg:block">
                    <h2 className="font-display text-xl font-semibold text-ink">
                      Follow our work
                    </h2>
                    <SocialLinks
                      links={settings.socialLinks}
                      className="mt-4"
                    />
                  </div>
                </Reveal>
              ) : null}

              <MansionQuote className="mt-8 hidden lg:block" />
            </div>

            <Reveal delay={0.1}>
              <div
                id="volunteer-application"
                className="scroll-mt-24 rounded-3xl border border-line bg-cream/60 px-4 py-6 sm:px-8 sm:py-8"
              >
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Volunteer application
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Share a little about yourself and the skills you can bring to
                  HLI.
                </p>
                <div className="mt-7">
                  <ContactForm variant="volunteer" />
                </div>
              </div>
            </Reveal>
          </div>

          {settings?.socialLinks.length ? (
            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-line pt-7 lg:hidden">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Follow our work
                </h2>
                <SocialLinks links={settings.socialLinks} className="mt-4" />
              </div>
            </Reveal>
          ) : null}
          <MansionQuote className="mt-8 lg:hidden" />
        </div>
      </section>
    </>
  );
}

function MansionQuote({ className }: { className: string }) {
  return (
    <Reveal delay={0.1} className={className}>
      <div className="rounded-3xl bg-brand-950 p-8 text-white">
        <p className="font-display text-xl font-medium leading-snug">
          &ldquo;A mansion rises from the union of many bricks.&rdquo;
        </p>
        <p className="mt-3 text-sm text-white/60">
          Your time and skills are a brick in something lasting.
        </p>
      </div>
    </Reveal>
  );
}
