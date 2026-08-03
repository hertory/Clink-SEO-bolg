import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-server";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://clink-ai.lovable.app";
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/compare`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/compare/stripe`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...blogEntries,
    { url: `${baseUrl}/platforms/lovable`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];
}
