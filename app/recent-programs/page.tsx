import PageHeader from "@/components/PageHeader";
import RecentProgramsGrid from "@/components/RecentProgramsGrid";
import {getRecentPrograms} from "@/lib/sanity";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Recent Programs",
  description:
    "Moments from The Health enLight Initiative's school health clubs, AMR awareness campaign and community outreaches.",
  path: "/recent-programs",
});

export default async function GalleryPage() {
  const programs = (await getRecentPrograms()) ?? [];
  return (
    <>
      <PageHeader
        eyebrow="The way we impact"
        title="Recent programs"
        intro="To us, impact is not just about touching lives — we stay connected to our beneficiaries for the long term. A look at our school clubs, campaigns and outreaches."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <RecentProgramsGrid programs={programs} />
        </div>
      </section>
    </>
  );
}
