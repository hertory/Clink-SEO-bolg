import type { MetadataRoute } from "next";
import buildSitemap from "../sitemap";

/**
 * Served at /blog/sitemap.xml — the only sitemap path reachable through the
 * main-site CloudFront forwarding rules (/blog/*, /arr-leaderboard/*).
 * Reuses the root generator (app/sitemap.ts) but drops paths that 404 on the
 * clinkbill.com domain (CloudFront does not forward /compare/* or
 * /platforms/* to this app); they remain only in the root sitemap for the
 * vercel.app domain where they resolve.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap().filter(
    (entry) =>
      !entry.url.includes("/compare") && !entry.url.includes("/platforms"),
  );
}
