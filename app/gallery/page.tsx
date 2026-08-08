import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryItems } from "@/lib/sanity";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Moments from The Health enLight Initiative's school health clubs, AMR awareness campaign and community outreaches.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const sanityGallery = await getGalleryItems();
  const gallery =
    sanityGallery && sanityGallery.length > 0 ? sanityGallery : [];
  return (
    <>
      <PageHeader
        eyebrow="The way we impact"
        title="Moments from the field"
        intro="To us, impact is not just about touching lives — we stay connected to our beneficiaries for the long term. A look at our school clubs, campaigns and outreaches."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <GalleryGrid gallery={gallery} />
        </div>
      </section>
    </>
  );
}
