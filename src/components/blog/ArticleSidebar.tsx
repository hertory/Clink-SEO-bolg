"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { plainText } from "@/lib/blog";

export type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

function extractToc(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  // Match ## and ### headings (h2 and h3)
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length === 2 ? (2 as const) : (3 as const);
    const label = match[2].trim();
    const id = plainText(label);
    headings.push({ id, label, level });
  }
  return headings;
}

function ShareButton({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!href) {
    return (
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-2 text-[13px] transition-colors hover:text-foreground"
        style={{ color: "var(--color-text-muted)" }}
        title={label}
        aria-label={label}
      >
        {icon}
        <span>{copied ? "Copied!" : label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[13px] transition-colors hover:text-foreground"
      style={{ color: "var(--color-text-muted)" }}
      title={label}
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

type ArticleSidebarProps = {
  content: string;
  title: string;
  slug: string;
};

export default function ArticleSidebar({ content, title, slug }: ArticleSidebarProps) {
  const toc = useMemo(() => extractToc(content), [content]);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://clink.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  // Track active TOC section with IntersectionObserver
  useEffect(() => {
    const ids = toc.map((t) => t.id);
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        setActiveId(id);
        el.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${id}`);
      }
    },
    [],
  );

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 flex flex-col gap-8">
        {/* Share buttons */}
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-subtle mb-3"
          >
            Share
          </p>
          <div className="flex flex-wrap gap-3">
            <ShareButton href={twitterShareUrl} label="X" icon={<TwitterIcon />} />
            <ShareButton href={linkedinShareUrl} label="LinkedIn" icon={<LinkedInIcon />} />
            <ShareButton label="Copy link" icon={<LinkIcon />} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "var(--surface-stroke)" }} />

        {/* TOC */}
        {toc.length > 0 && (
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-subtle mb-3"
            >
              On this page
            </p>
            <nav className="space-y-0.5">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1 text-[13px] leading-relaxed transition-colors ${
                    item.level === 3 ? "pl-3" : ""
                  } ${
                    activeId === item.id
                      ? "font-medium"
                      : ""
                  }`}
                  style={{
                    color:
                      activeId === item.id
                        ? "var(--accent)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
