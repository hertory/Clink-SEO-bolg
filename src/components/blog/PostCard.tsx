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
      className="group block rounded-[16px] border bg-white p-7 transition-all hover:-translate-y-0.5"
      style={{
        borderColor: "var(--reader-line)",
        boxShadow: "var(--shadow-float-1)",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: "var(--reader-coral)" }}
      >
        <span>{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
      </div>
      <h3
        className="mt-4 text-[20px] md:text-[22px] font-semibold leading-snug text-foreground"
        style={{
          fontFamily: "var(--font-manrope), Inter, sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {post.title}
      </h3>
      <p
        className="mt-3 text-[15px] leading-relaxed"
        style={{ color: "var(--reader-ink-2)" }}
      >
        {post.description}
      </p>
      <span
        className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium"
        style={{ color: "var(--reader-coral)" }}
      >
        Read article
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
