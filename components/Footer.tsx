import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Logo, Mail, Phone, Pin, ArrowUpRight } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center" aria-label={site.name}>
              <img
                src="/logo-light.png"
                alt={site.name}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Building a healthier, more informed society — equipping young people
              and communities with the knowledge and tools to prevent disease and
              promote well-being.
            </p>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={s.label}
                >
                  <span className="text-xs font-semibold">{s.label[0]}</span>
                </a>
              ))}
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
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-leaf" />
                <a href={`tel:${site.phoneHref}`} className="text-white/70 hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-leaf" />
                <a href={`mailto:${site.email}`} className="break-all text-white/70 hover:text-white">
                  {site.email}
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
          <p>© {new Date().getFullYear()} The Health enLight Initiative. All rights reserved.</p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
