import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block rounded-[32px] border bg-elev p-7 transition-all hover:-translate-y-1 md:p-8"
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
        <span>{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-5 text-[22px] md:text-[26px] font-semibold tracking-[-0.01em] text-foreground">
        {post.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
        {post.description}
      </p>
      <span
        className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium"
        style={{ color: "var(--accent)" }}
      >
        Read article
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
