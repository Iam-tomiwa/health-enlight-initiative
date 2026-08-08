import Reveal from "./Reveal";
import type {ReactNode} from "react";
import Link from "next/link";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  action,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{label: string; href?: string}>;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 pt-[72px] text-white">
      {/* decorative field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-leaf/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="container-page relative py-16 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 overflow-hidden">
              <ol className="flex min-w-0 items-center gap-2 text-xs font-medium text-white/55">
                {breadcrumbs.map((item, index) => {
                  const current = index === breadcrumbs.length - 1;
                  return (
                    <li key={`${item.label}-${index}`} className={`flex min-w-0 items-center gap-2 ${current ? "flex-1" : "shrink-0"}`}>
                      {index > 0 && <span className="text-white/25" aria-hidden="true">/</span>}
                      {item.href && !current ? (
                        <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
                      ) : (
                        <span className={current ? "truncate text-white/75" : ""} aria-current={current ? "page" : undefined}>{item.label}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>
        )}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {intro}
            </p>
          </Reveal>
        )}
        {action && <Reveal delay={0.16}><div className="mt-7">{action}</div></Reveal>}
      </div>
    </section>
  );
}
