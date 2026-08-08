import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-7 text-muted">{children}</p>,
    h2: ({ children }) => <h2 className="font-display text-2xl font-semibold text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display text-xl font-semibold text-ink">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-brand/30 pl-4 italic text-ink/75">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="ml-5 list-disc space-y-2 text-muted marker:text-brand">{children}</ul>,
    number: ({ children }) => <ol className="ml-5 list-decimal space-y-2 text-muted marker:font-semibold marker:text-brand">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline decoration-brand/40 underline-offset-2">{children}</span>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:\/\//.test(href);
      const newTab = value?.openInNewTab === true;
      return <a href={href} target={newTab ? "_blank" : undefined} rel={newTab || external ? "noopener noreferrer" : undefined} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand">{children}</a>;
    },
  },
};

export default function RichText({ value }: { value: PortableTextBlock[] }) {
  return <div className="space-y-4"><PortableText value={value} components={components} /></div>;
}
