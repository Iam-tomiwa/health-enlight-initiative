import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/content";
import { getSitemapArticles, getSitemapGalleryAlbums } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [...nav.map((n) => n.href), "/volunteer"];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const [articles, albums] = await Promise.all([
    getSitemapArticles(),
    getSitemapGalleryAlbums(),
  ]);
  const articleRoutes: MetadataRoute.Sitemap = (articles ?? []).map((article) => ({
    url: `${site.url}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const galleryRoutes: MetadataRoute.Sitemap = (albums ?? []).map((album) => ({
    url: `${site.url}/recent-programs/${album.slug}`,
    lastModified: new Date(album.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...galleryRoutes];
}
