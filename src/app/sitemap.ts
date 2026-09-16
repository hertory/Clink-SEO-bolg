import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-server";
import { getArrProfileSlugs } from "@/lib/arr/profiles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinkbill.com";
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const arrEntries: MetadataRoute.Sitemap = getArrProfileSlugs().map(
    (slug) => ({
      url: `${baseUrl}/arr-leaderboard/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );
  return [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/compare`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/compare/stripe`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...blogEntries,
    { url: `${baseUrl}/arr-leaderboard`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...arrEntries,
    { url: `${baseUrl}/platforms/lovable`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];
}
