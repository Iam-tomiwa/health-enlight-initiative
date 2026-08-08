import "server-only";
import type { PortableTextBlock } from "@portabletext/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "n682m8tp";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2026-08-08";
const readToken = process.env.SANITY_API_READ_TOKEN;

async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  try {
    const response = await fetch(url, {
      headers: readToken ? { Authorization: `Bearer ${readToken}` } : undefined,
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const payload = (await response.json()) as { result: T };
    return payload.result;
  } catch (error) {
    console.error("Unable to load Sanity content", error);
    return null;
  }
}

export type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
  featured: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  photo?: string;
  photoAlt?: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description: string;
  activityType: string;
  occurredAt?: string;
  introduction?: PortableTextBlock[];
  objective?: PortableTextBlock[];
  impact?: PortableTextBlock[];
  updatedAt: string;
  images: Array<{
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }>;
};

export type RecentProgram = {
  id: string;
  title: string;
  slug: string;
  description: string;
  activityType: string;
  occurredAt?: string;
  coverImage: string;
  coverImageAlt: string;
  imageCount: number;
};

export type SiteEvent = {
  id: string;
  tag: string;
  status: string;
  title: string;
  blurb: string;
  date: string;
  time: string;
  location: string;
  image: string;
  imageAlt?: string;
  registrationUrl?: string;
  accent: "gold" | "leaf";
};

export type SiteSettingsData = {
  name: string;
  description: string;
  footerDescription: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  socialLinks: Array<{key: string; label: string; url: string; handle?: string}>;
};

export type Article = ArticleCard & {
  author?: { name: string; role: string };
  publishedAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    image?: string;
    imageAlt: string;
    noIndex: boolean;
  };
  body: Array<{
    _key: string;
    _type: "block" | "image";
    style?: string;
    listItem?: string;
    children?: Array<{ _key: string; text: string }>;
    url?: string;
    alt?: string;
    caption?: string;
  }>;
};

export async function getArticles() {
  return sanityFetch<ArticleCard[]>(`*[_type == "article" && defined(slug.current)]
    | order(featured desc, publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": coalesce(categories[0]->title, "Article"),
      "readTime": string(round(length(pt::text(body)) / 1000) + 1) + " min read",
      "date": string::split(publishedAt, "-")[0],
      "image": mainImage.asset->url,
      "imageAlt": coalesce(mainImage.alt, title),
      "featured": coalesce(featured, false)
    }`);
}

export async function getArticle(slug: string) {
  return sanityFetch<Article | null>(`*[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "category": coalesce(categories[0]->title, "Article"),
    "readTime": string(round(length(pt::text(body)) / 1000) + 1) + " min read",
    "date": string::split(publishedAt, "-")[0],
    "image": mainImage.asset->url,
    "imageAlt": coalesce(mainImage.alt, title),
    "featured": coalesce(featured, false),
    publishedAt,
    "updatedAt": _updatedAt,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, excerpt, ""),
      "image": coalesce(seo.image.asset->url, mainImage.asset->url),
      "imageAlt": coalesce(seo.image.alt, mainImage.alt, title),
      "noIndex": seo.noIndex == true
    },
    author->{name, role},
    body[]{
      _key,
      _type,
      style,
      listItem,
      children[]{_key, text},
      _type == "image" => {
        "url": asset->url,
        alt,
        caption
      }
    }
  }`, {slug});
}

export type SitemapArticle = {slug: string; updatedAt: string};

export async function getSitemapArticles() {
  return sanityFetch<SitemapArticle[]>(`*[
    _type == "article" && defined(slug.current) && seo.noIndex != true
  ] | order(_updatedAt desc) {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`);
}

export async function getTeamMembers() {
  return sanityFetch<TeamMember[]>(`*[_type == "person" && isTeamMember != false]
    | order(order asc, name asc) {
      "id": _id,
      name,
      role,
      "focus": coalesce(focus, ""),
      "photo": photo.asset->url,
      "photoAlt": coalesce(photo.alt, name)
    }`);
}

export async function getRecentPrograms() {
  return sanityFetch<RecentProgram[]>(`*[_type == "galleryAlbum" && defined(slug.current) && count(images) > 0]
    | order(occurredAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      "description": coalesce(description, ""),
      "activityType": coalesce(activityType, "Program"),
      occurredAt,
      "coverImage": images[0].asset->url,
      "coverImageAlt": coalesce(images[0].alt, title),
      "imageCount": count(images)
    }`);
}

export async function getGalleryAlbum(slug: string) {
  return sanityFetch<GalleryAlbum | null>(`*[
    _type == "galleryAlbum" && (slug.current == $slug || $slug in legacySlugs)
  ][0] {
    "id": _id,
    title,
    "slug": slug.current,
    "description": coalesce(description, ""),
    "activityType": coalesce(activityType, "Gallery"),
    occurredAt,
    introduction,
    objective,
    impact,
    "updatedAt": _updatedAt,
    images[]{
      "id": _key,
      "src": asset->url,
      "alt": coalesce(alt, ^.title),
      caption
    }
  }`, {slug});
}

export type SitemapGalleryAlbum = {slug: string; updatedAt: string};

export async function getSitemapGalleryAlbums() {
  return sanityFetch<SitemapGalleryAlbum[]>(`*[
    _type == "galleryAlbum" && defined(slug.current)
  ] | order(_updatedAt desc) {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`);
}

export type AboutPageData = {
  header: {eyebrow: string; title: string; introduction: string};
  vision: {eyebrow: string; title: string; body: PortableTextBlock[]; image: string; imageAlt: string};
  mission: {eyebrow: string; title: string; points: Array<{key: string; text: string}>};
  approach: {eyebrow: string; title: string; items: Array<{key: string; title: string; description: string}>};
  impact: {title: string; statistics: Array<{key: string; value: number; suffix: string; label: string}>};
  journey: {eyebrow: string; title: string; milestones: Array<{key: string; step: string; title: string; description: string}>};
  callToAction: {label: string; href: string};
  seo: {title: string; description: string; image?: string; noIndex: boolean};
};

export async function getAboutPage() {
  return sanityFetch<AboutPageData | null>(`*[_type == "aboutPage" && _id == "aboutPage"][0] {
    header,
    "vision": {
      "eyebrow": vision.eyebrow,
      "title": vision.title,
      "body": vision.body,
      "image": vision.image.asset->url,
      "imageAlt": coalesce(vision.image.alt, vision.title)
    },
    "mission": {
      "eyebrow": mission.eyebrow,
      "title": mission.title,
      "points": mission.points[]{"key": _key, text}
    },
    "approach": {
      "eyebrow": approach.eyebrow,
      "title": approach.title,
      "items": approach.items[]{"key": _key, title, description}
    },
    "impact": {
      "title": impact.title,
      "statistics": impact.statistics[]{"key": _key, value, "suffix": coalesce(suffix, ""), label}
    },
    "journey": {
      "eyebrow": journey.eyebrow,
      "title": journey.title,
      "milestones": journey.milestones[]{"key": _key, step, title, description}
    },
    callToAction,
    "seo": {
      "title": coalesce(seo.title, header.title),
      "description": coalesce(seo.description, header.introduction),
      "image": coalesce(seo.image.asset->url, vision.image.asset->url),
      "noIndex": seo.noIndex == true
    }
  }`);
}

export async function getSiteSettings() {
  return sanityFetch<SiteSettingsData | null>(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    name,
    "description": coalesce(description, ""),
    "footerDescription": coalesce(footerDescription, description, ""),
    email,
    phone,
    address,
    "hours": coalesce(hours, ""),
    "socialLinks": socialLinks[]{"key": _key, label, url, handle}
  }`);
}

export async function getUpcomingEvents() {
  return sanityFetch<SiteEvent[]>(`*[_type == "event" && startsAt >= now()]
    | order(startsAt asc)[0...6] {
      "id": _id,
      "tag": eventType,
      "status": coalesce(status, "Upcoming"),
      title,
      "blurb": summary,
      "date": string::split(startsAt, "T")[0],
      "time": string::split(string::split(startsAt, "T")[1], ":")[0] + ":" + string::split(string::split(startsAt, "T")[1], ":")[1],
      location,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, title),
      "registrationUrl": coalesce(registrationUrl, "/volunteer"),
      "accent": select(eventType == "Webinar" => "gold", "leaf")
    }`);
}
