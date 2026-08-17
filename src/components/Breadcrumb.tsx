"use client";

import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

// Absolute site origin for JSON-LD `item` URLs. Schema.org/Google requires
// fully-qualified URLs here — relative paths ("/", "/blog") are rejected by
// the Rich Results Test as "Invalid URL in field 'id'".
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://clink-ai.lovable.app";

function toAbsoluteUrl(href: string): string {
  if (/^https?:\/\//.test(href)) return href;
  return `${SITE_URL}${href}`;
}

/**
 * Site-wide breadcrumb. Renders as a horizontal trail with `›` separators.
 * Last item is the current page (no link). Includes JSON-LD BreadcrumbList for SEO.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: toAbsoluteUrl(c.href) } : {}),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-[1200px] px-6 pt-6"
    >
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-foreground-subtle">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${c.label}-${i}`}>
              <li className="flex items-center">
                {c.href && !last ? (
                  <a
                    href={c.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {c.label}
                  </a>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "text-foreground-muted" : ""}
                  >
                    {c.label}
                  </span>
                )}
              </li>
              {!last ? (
                <li aria-hidden className="text-foreground-subtle/60">
                  ›
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
