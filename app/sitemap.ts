import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...nav.map((n) => n.href), "/volunteer"];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
