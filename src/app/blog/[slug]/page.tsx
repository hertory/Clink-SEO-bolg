import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FinalCta } from "@/components/FinalCta";
import { getPost, getPostSlugs } from "@/lib/blog-server";

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
    return {
      title: `${meta.title} — Clink`,
      description: meta.description,
      keywords: meta.keywords.join(", "),
      openGraph: {
        type: "article",
        title: `${meta.title} — Clink`,
        description: meta.description,
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

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: meta.title },
        ]}
      />

      {/* Hero — grid: copy + cover */}
      <section className="mx-auto max-w-[1200px] px-6 pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
              <span>{meta.category}</span>
              <span>·</span>
              <span>{meta.readingMinutes} min read</span>
            </div>
            <h1
              className="mt-5 font-semibold tracking-[-0.02em] leading-[1.08] text-foreground"
              style={{ fontSize: "clamp(30px, 4.2vw, 48px)" }}
            >
              {meta.title}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-foreground-muted md:text-lg">
              {meta.description}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-foreground"
                style={{ background: "var(--accent-soft)" }}
                aria-hidden
              >
                {meta.author.charAt(0)}
              </div>
              <p className="text-sm text-foreground-muted">
                <span className="font-semibold text-foreground">
                  By {meta.author}
                </span>
                {meta.updated ? (
                  <> · Updated {formatDate(meta.updated)}</>
                ) : (
                  <> · {formatDate(meta.date)}</>
                )}
              </p>
            </div>
          </div>

          {/* Cover image */}
          <div
            className="overflow-hidden rounded-[24px] border bg-elev-2"
            style={{
              borderColor: "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="aspect-[1200/630] w-full">
              {meta.image ? (
                <img
                  src={meta.image}
                  alt={meta.title}
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 30%, var(--accent-soft) 0%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-[1200px] px-6 pt-6 pb-16 md:pt-10">
        <article>
          <MarkdownRenderer content={content} />
        </article>
      </section>

      <FinalCta />
      <Footer />
    </div>
  );
}
