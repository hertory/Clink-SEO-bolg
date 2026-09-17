import type { MetadataRoute } from "next";
import buildSitemap from "../sitemap";

/**
 * Served at /blog/sitemap.xml — the only sitemap path reachable through the
 * main-site CloudFront forwarding rules (/blog/*). Reuses the root generator
 * (app/sitemap.ts), which lists blog posts, ARR leaderboard profiles, compare
 * and platforms routes on the clinkbill.com host.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
