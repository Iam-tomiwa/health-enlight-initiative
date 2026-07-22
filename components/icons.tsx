import type { SVGProps, ReactElement } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Brand mark — an enlightened bulb (idea + health). */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 3.5a8 8 0 0 0-5 14.24c.9.72 1.5 1.53 1.6 2.76H19.4c.1-1.23.7-2.04 1.6-2.76A8 8 0 0 0 16 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <path d="M12.6 23.5h6.8M13.4 26.5h5.2" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      <path d="M16 9.5v8M13 12.5l3-1 3 1" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

const programPaths: Record<string, ReactElement> = {
  research: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4M9 11h4M11 9v4" />
    </>
  ),
  school: (
    <>
      <path d="M12 4 3 8.5l9 4.5 9-4.5L12 4Z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V11M21 8.5V14" />
    </>
  ),
  outreach: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16.5 6a3 3 0 0 1 0 5M18 19a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  webinar: (
    <>
      <rect x="3.5" y="5" width="17" height="11" rx="2" />
      <path d="M8 20h8M12 16v4M10 8.5l3 2-3 2v-4Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.4 7 8.9 4-1.5 7-4.6 7-8.9V6l-7-2.5Z" />
      <path d="m9.5 11.5 1.8 1.8 3.2-3.4" />
    </>
  ),
};

export function ProgramIcon({ name, ...props }: IconProps & { name: string }) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      {programPaths[name] ?? programPaths.research}
    </svg>
  );
}
