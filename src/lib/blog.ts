export type FaqItem = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  keywords: string[];
  author: string;
  image?: string;
  readingMinutes: number;
  related: string[];
  faqs?: FaqItem[];
};

/** Convert heading text to URL-safe id fragment */
export function plainText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
