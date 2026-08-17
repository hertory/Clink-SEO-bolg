import type { Metadata } from "next";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FinalCta } from "@/components/FinalCta";
import { getAllPosts } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Blog — Clink",
  description:
    "Essays, product deep-dives, and field notes on payment infrastructure, subscription billing, and the agent economy.",
  openGraph: {
    title: "Blog — Clink",
    description:
      "Essays, product deep-dives, and field notes on payment infrastructure, subscription billing, and the agent economy.",
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-12 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
          The Clink Journal
        </p>
        <h1 className="mt-4 max-w-[820px] text-3xl md:text-[40px] font-semibold tracking-[-0.02em] leading-[1.1] text-foreground">
          Field notes on payment infrastructure, billing, and the agent economy.
        </h1>
        <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-foreground-muted">
          Long-form essays and product deep-dives from the team building Clink.
        </p>
      </section>
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {getAllPosts().map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <FinalCta />
      <Footer />
    </div>
  );
}
