import HomePageClient from "@/components/HomePageClient";
import { getHomepageSettings, getSiteSettings, getUpcomingEvents } from "@/lib/sanity";

export default async function HomePage() {
  const [homepageSettings, events, siteSettings] = await Promise.all([
    getHomepageSettings(),
    getUpcomingEvents(),
    getSiteSettings(),
  ]);

  return (
    <HomePageClient
      homepageSettings={homepageSettings}
      events={events ?? []}
      socialLinks={siteSettings?.socialLinks ?? []}
    />
  );
}
