import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { getPost, getPostSlugs } from "@/lib/blog-server";
import { VisaPartnershipPage } from "@/components/blog/VisaPartnershipPage";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    const canonical = `/blog/${slug}`;
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords.join(", "),
      alternates: { canonical },
      openGraph: {
        type: "article",
        title: meta.title,
        description: meta.description,
        url: canonical,
        publishedTime: meta.date,
        authors: [meta.author],
        ...(meta.image ? { images: [meta.image] } : {}),
      },
      twitter: {
        ...(meta.image ? { images: [meta.image] } : {}),
      },
    };
  } catch {
    return { title: "Article not found — Clink" };
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let meta;
  let content;
  try {
    const post = getPost(slug);
    meta = post.meta;
    content = post.content;
  } catch {
    notFound();
  }

  // Special case: 1:1 replica of the prototype standalone page (Julie's
  // design) wrapped in the generic site chrome instead of the markdown layout.
  if (slug === "clink-and-visa-partner-on-intelligent-commerce") {
    return <VisaPartnershipPage title={meta.title} slug={slug} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <ReadingProgress />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: meta.title, href: `/blog/${slug}` },
        ]}
      />

      {/* Masthead — Visa-style editorial header (full-bleed grid lines) */}
      <section
        className="border-b"
        style={{
          borderColor: "var(--reader-line)",
          backgroundImage:
            "linear-gradient(90deg, transparent calc(25% - 1px), rgba(23,23,25,.045) 25%, transparent calc(25% + 1px)), linear-gradient(90deg, transparent calc(75% - 1px), rgba(23,23,25,.045) 75%, transparent calc(75% + 1px))",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-10">
          <p className="text-sm" style={{ color: "var(--reader-ink-3)" }}>
            {meta.updated
              ? `Updated ${formatDate(meta.updated)}`
              : formatDate(meta.date)}
          </p>
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,700px)_1fr] lg:gap-16">
            <h1
              className="font-semibold text-foreground"
              style={{
                fontSize: "clamp(42px, 5vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                fontFamily: "var(--font-manrope), Inter, sans-serif",
                textWrap: "balance",
              }}
            >
              {meta.title}
            </h1>
            <div className="flex flex-col gap-7 lg:pt-2">
              <p
                className="text-[19px] leading-[1.6]"
                style={{ color: "var(--reader-ink-2)" }}
              >
                {meta.description}
              </p>
              <div className="flex items-center gap-3">
                {meta.authorImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={meta.authorImage}
                    alt={meta.author}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold text-foreground"
                    style={{ background: "var(--accent-soft)" }}
                    aria-hidden
                  >
                    {meta.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--reader-ink)" }}
                  >
                    {meta.author}
                  </p>
                  <p className="text-xs" style={{ color: "var(--reader-ink-3)" }}>
                    {meta.readingMinutes} minute read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eyebrow row */}
      <section className="border-b" style={{ borderColor: "var(--reader-line)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-5">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--reader-coral)" }}
          >
            {meta.category}
          </p>
        </div>
      </section>

      {/* Body + Sidebar (sidebar LEFT, Visa-style) */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-10 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="order-last lg:order-first">
            <ArticleSidebar
              content={content}
              title={meta.title}
              slug={slug}
            />
          </div>
          <article className="min-w-0">
            <MarkdownRenderer content={content} />
          </article>
        </div>
      </section>

      {/* FAQ — site-wide FaqSection component */}
      {meta.faqs && meta.faqs.length > 0 ? (
        <FaqSection
          eyebrow="FAQ"
          title="Common Questions"
          items={meta.faqs}
        />
      ) : null}

      <FinalCta />
      <Footer />
    </div>
  );
}
