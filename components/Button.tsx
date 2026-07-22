import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-700 shadow-soft hover:shadow-card",
  secondary:
    "bg-white text-brand ring-1 ring-inset ring-brand/20 hover:ring-brand/50 hover:bg-brand-50",
  ghost:
    "bg-transparent text-brand hover:bg-brand-50",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
