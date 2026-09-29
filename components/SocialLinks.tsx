import type { ComponentType, SVGProps } from "react";
import { Instagram, LinkedIn, XSocial } from "@/components/icons";
import type { SiteSettingsData } from "@/lib/sanity";

type SocialLink = SiteSettingsData["socialLinks"][number];
type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, SocialIcon> = {
  Instagram,
  LinkedIn,
  X: XSocial,
  Twitter: XSocial,
};

export default function SocialLinks({
  links,
  tone = "light",
  showLabels = true,
  className,
}: {
  links: SocialLink[];
  tone?: "light" | "dark";
  showLabels?: boolean;
  className?: string;
}) {
  const linkTone =
    tone === "dark"
      ? "text-white/80 ring-white/20 hover:bg-white/10 hover:text-white"
      : "text-brand ring-brand/15 hover:bg-brand-50 hover:text-brand";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {links.map((social) => {
        const Icon = icons[social.label];
        if (!Icon) return null;

        return (
          <a
            key={social.key}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${social.label}`}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 ring-1 ring-inset transition-colors ${linkTone}`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {showLabels && (
              <span className="text-sm font-medium">
                {social.handle || social.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
