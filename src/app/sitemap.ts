import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://clink-ai.lovable.app";
  return [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/compare`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/compare/stripe`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog/what-is-clink`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/platforms/lovable`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];
}
