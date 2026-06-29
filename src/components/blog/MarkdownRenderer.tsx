"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useState } from "react";
import { plainText } from "@/lib/blog";
import type { Components } from "react-markdown";

function ImageWithFallback({ src, alt }: { src?: string | Blob; alt?: string }) {
  const [error, setError] = useState(false);

  const srcStr = typeof src === "string" ? src : undefined;

  if (error || !srcStr) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border bg-elev-2 py-16 text-sm text-foreground-muted"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        {alt || "Image"}
      </div>
    );
  }

  return (
    <img
      src={srcStr}
      alt={alt || ""}
      loading="lazy"
      className="rounded-xl"
      onError={() => setError(true)}
    />
  );
}

const components: Components = {
  h1: () => null, // Hidden — page title is handled by the Hero section
  h2: ({ children, ...props }) => {
    const text = String(children);
    const id = plainText(text);
    return (
      <h2
        id={id}
        className="scroll-mt-28 mt-16 mb-4 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.2] text-foreground"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = String(children);
    const id = plainText(text);
    return (
      <h3
        id={id}
        className="scroll-mt-28 mt-10 mb-3 text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] text-foreground"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="mt-6 text-[17px] leading-[1.75] text-foreground-muted">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    const isInternal =
      href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium underline underline-offset-4 decoration-foreground-subtle/40 hover:decoration-foreground transition-colors"
          style={{ color: "var(--accent)" }}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4 decoration-foreground-subtle/40 hover:decoration-foreground transition-colors"
        style={{ color: "var(--accent)" }}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => <ImageWithFallback src={src} alt={alt} />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  hr: () => (
    <hr
      className="my-12 border-0 border-t"
      style={{ borderColor: "var(--surface-stroke)" }}
    />
  ),
  ul: ({ children }) => (
    <ul className="mt-6 space-y-2 pl-6 text-[17px] leading-[1.75] text-foreground-muted list-disc">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 space-y-2 pl-6 text-[17px] leading-[1.75] text-foreground-muted list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-2 pl-6 md:pl-8 mt-8 mb-8"
      style={{ borderColor: "var(--foreground-subtle)" }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded-md px-1.5 py-0.5 text-[0.9em] font-mono"
          style={{ backgroundColor: "var(--color-surface-subtle)" }}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`block overflow-x-auto rounded-xl p-5 text-[14px] leading-relaxed font-mono ${className || ""}`}
        style={{ backgroundColor: "var(--color-surface-subtle)" }}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="mt-6 mb-6">{children}</pre>,
  table: ({ children }) => (
    <div className="mt-6 mb-6 overflow-x-auto">
      <table
        className="w-full text-left text-[15px] leading-relaxed"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr style={{ borderColor: "var(--surface-stroke)" }}>{children}</tr>
  ),
  th: ({ children }) => (
    <th
      className="px-4 py-3 font-semibold text-foreground border-b"
      style={{ borderColor: "var(--surface-stroke)" }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="px-4 py-3 text-foreground-muted border-b"
      style={{ borderColor: "var(--surface-stroke)" }}
    >
      {children}
    </td>
  ),
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="max-w-[720px]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
