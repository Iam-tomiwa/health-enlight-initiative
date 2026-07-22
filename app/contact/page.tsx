import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, Pin, Clock } from "@/components/icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to The Health enLight Initiative for partnerships, questions or media enquiries.",
};

const details = [
  {
    icon: Pin,
    label: "Address",
    value: `${site.address.line1}, ${site.address.line2}`,
  },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We want to hear from you"
        title="Contact us for partnership"
        intro="Have a question, a partnership idea, or want to bring our programmes to your community? Send us a message and we'll get back to you."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Get in touch
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {details.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.05}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1 block text-ink hover:text-brand"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-ink">{d.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 overflow-hidden rounded-3xl border border-line">
                <iframe
                  title="Map showing Ikorodu, Lagos"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.46%2C6.58%2C3.56%2C6.66&layer=mapnik&marker=6.62%2C3.51"
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-cream/60 p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Reach out today
              </h2>
              <p className="mt-2 text-sm text-muted">
                We&apos;ll receive your message and get back to you.
              </p>
              <div className="mt-7">
                <ContactForm variant="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
