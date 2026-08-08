import Link from "next/link";
import {nav} from "@/lib/content";
import {getSiteSettings} from "@/lib/sanity";
import {Mail, Phone, Pin, ArrowUpRight, Instagram, LinkedIn, XSocial} from "./icons";

const socialIcons = {
  Instagram,
  LinkedIn,
  X: XSocial,
  Twitter: XSocial,
};

export default async function Footer() {
  const settings = await getSiteSettings();
  if (!settings) return null;
  const addressLines = settings.address.split("\n").filter(Boolean);
  const phoneHref = settings.phone.replace(/[^+\d]/g, "");

  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center" aria-label={settings.name}>
              <img
                src="/logo.png"
                alt={settings.name}
                className="h-9 w-auto object-contain invert grayscale"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {settings.footerDescription}
            </p>
            <div className="mt-6 flex gap-2">
              {settings.socialLinks.map((social) => {
                const SocialIcon = socialIcons[social.label as keyof typeof socialIcons];
                if (!SocialIcon) return null;
                return (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <SocialIcon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[...nav, { label: "Volunteer", href: "/volunteer" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Pin className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                <span className="text-white/70">
                  {addressLines.map((line, index) => (
                    <span key={`${line}-${index}`}>{line}{index < addressLines.length - 1 && <br />}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-leaf" />
                <a href={`tel:${phoneHref}`} className="text-white/70 hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-leaf" />
                <a href={`mailto:${settings.email}`} className="break-all text-white/70 hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-leaf"
            >
              Partner with us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <p>{settings.hours}</p>
        </div>
      </div>
    </footer>
  );
}
