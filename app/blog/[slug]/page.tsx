import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/sanity";
import { site } from "@/lib/content";
import { safeJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };
  const canonical = `${site.url}/blog/${article.slug}`;
  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: { canonical },
    robots: article.seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: canonical,
      siteName: site.name,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author.name] : [site.name],
      images: article.seo.image ? [{ url: article.seo.image, alt: article.seo.imageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: article.seo.image ? [article.seo.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seo.title,
    description: article.seo.description,
    image: article.seo.image ?? article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleJsonLd) }}
      />
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
      />

      <article className="bg-white pb-20 pt-10 sm:pb-28 sm:pt-12">
      <header className="container-page max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{article.date}</span><span>·</span><span>{article.readTime}</span>
          {article.author && <><span>·</span><span>By {article.author.name}</span></>}
        </div>
      </header>

      <div className="container-page mt-8 max-w-5xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-brand-50">
          <Image src={article.image} alt={article.imageAlt ?? article.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
        </div>
      </div>

      <div className="container-page mt-12 max-w-3xl space-y-6 text-base leading-8 text-ink/80">
        {article.body.map((block) => {
          if (block._type === "image" && block.url) {
            return <figure key={block._key} className="my-10"><Image src={block.url} alt={block.alt ?? ""} width={900} height={600} className="h-auto w-full rounded-2xl" />{block.caption && <figcaption className="mt-2 text-center text-sm text-muted">{block.caption}</figcaption>}</figure>;
          }
          const text = block.children?.map((child) => child.text).join("") ?? "";
          if (block.style === "h2") return <h2 key={block._key} className="pt-5 font-display text-3xl font-semibold text-ink">{text}</h2>;
          if (block.style === "h3") return <h3 key={block._key} className="pt-4 font-display text-2xl font-semibold text-ink">{text}</h3>;
          if (block.style === "blockquote") return <blockquote key={block._key} className="border-l-4 border-brand pl-6 italic text-ink">{text}</blockquote>;
          if (block.listItem) return <p key={block._key} className="ml-5 before:mr-3 before:content-['•']">{text}</p>;
          return <p key={block._key}>{text}</p>;
        })}
      </div>
      </article>
    </>
  );
}
