import { cache } from "react";
import "server-only";
import type { BlogPost } from "@/lib/blog";
import { BLOG_POSTS, BLOG_CONTENT } from "@/data/blog-data";

export const getPostSlugs = cache((): string[] => {
  return BLOG_POSTS.map((p) => p.slug);
});

export function getPost(slug: string): { meta: BlogPost; content: string } {
  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  if (!meta) throw new Error(`Post not found: ${slug}`);
  return { meta, content: BLOG_CONTENT[slug] || "" };
}

export const getAllPosts = cache((): BlogPost[] => {
  return BLOG_POSTS;
});
