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

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.45 8.35H3.2V18.8h3.25V8.35ZM4.82 3.2a1.88 1.88 0 1 0 0 3.76 1.88 1.88 0 0 0 0-3.76ZM18.8 12.8c0-3.15-1.68-4.62-3.93-4.62a3.39 3.39 0 0 0-3.08 1.69V8.35H8.54V18.8h3.25v-5.17c0-1.36.26-2.68 1.95-2.68 1.67 0 1.69 1.56 1.69 2.77v5.08h3.25l.12-6Z" />
    </svg>
  );
}

export function XSocial(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.36l7.26-8.3L2.98 3h6.4l4.42 5.84L18.9 3Zm-1.1 16.2h1.73L8.44 4.7H6.59L17.8 19.2Z" />
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
