import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from The Health enLight Initiative's school health clubs, AMR awareness campaign and community outreaches.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The way we impact"
        title="Moments from the field"
        intro="To us, impact is not just about touching lives — we stay connected to our beneficiaries for the long term. A look at our school clubs, campaigns and outreaches."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
