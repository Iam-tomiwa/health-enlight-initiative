import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { getGalleryAlbum } from "@/lib/sanity";
import { safeJsonLd } from "@/lib/seo";
import { site } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";
import RichText from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const album = await getGalleryAlbum((await params).slug);
  if (!album) return { title: "Gallery album not found", robots: { index: false, follow: false } };

  const canonical = `${site.url}/gallery/${album.slug}`;
  const image = album.images[0];
  return {
    title: album.title,
    description: album.description,
    alternates: { canonical },
    openGraph: {
      title: album.title,
      description: album.description,
      url: canonical,
      siteName: site.name,
      type: "website",
      images: image ? [{ url: image.src, alt: image.alt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: album.title,
      description: album.description,
      images: image ? [image.src] : [],
    },
  };
}

export default async function GalleryAlbumPage({ params }: PageProps) {
  const album = await getGalleryAlbum((await params).slug);
  if (!album) notFound();

  const story = [
    { label: "Introduction", body: album.introduction },
    { label: "Our objective", body: album.objective },
    { label: "The impact", body: album.impact },
  ].filter((item): item is { label: string; body: PortableTextBlock[] } => Boolean(item.body?.length));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.description,
    url: `${site.url}/gallery/${album.slug}`,
    datePublished: album.occurredAt,
    image: album.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: image.src,
      caption: image.caption ?? image.alt,
    })),
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <PageHeader eyebrow={album.activityType} title={album.title} intro={album.description} />

      <article className="bg-white">
        {(story.length > 0 || album.occurredAt) && (
          <section className="bg-cream py-16 sm:py-20">
            <div className="container-page">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">Behind the programme</p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">The story and purpose</h2>
                  </div>
                  {album.occurredAt && (
                    <time dateTime={album.occurredAt} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand ring-1 ring-inset ring-line">
                      {new Intl.DateTimeFormat("en-NG", { dateStyle: "long" }).format(new Date(`${album.occurredAt}T00:00:00`))}
                    </time>
                  )}
                </div>
              </Reveal>

              {story.length > 0 && (
                <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3">
                  {story.map((item, index) => (
                    <RevealItem key={item.label} className="rounded-3xl border border-line bg-white p-7 sm:p-8">
                      <span className="font-display text-3xl font-semibold text-brand/25">0{index + 1}</span>
                      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.label}</h3>
                      <div className="mt-3 text-sm"><RichText value={item.body} /></div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </div>
          </section>
        )}

        <section className="py-16 sm:py-24">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Moments from the field</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Inside the programme</h2>
                <p className="text-sm text-muted">{album.images.length} {album.images.length === 1 ? "photograph" : "photographs"}</p>
              </div>
            </Reveal>

            <GalleryLightbox images={album.images} />

            <Reveal>
              <div className="mt-14 border-t border-line pt-8">
                <Link href="/gallery" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand link-underline">
                  <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to all gallery moments
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
