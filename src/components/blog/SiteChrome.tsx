"use client";

import { useEffect, useState } from "react";
import navLogo from "@/assets/clink/nav-logo.svg";
import clawAvatar from "@/assets/clink/claw-avatar.svg";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Clink for Claw", href: "/clink-for-claw", icon: clawAvatar.src },
  { label: "Products", href: "/products" },
  { label: "Lovable", href: "/platforms/lovable" },
  { label: "Subscriptions", href: "/products/subscription-management" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
  { label: "Contact us", href: "/contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{
        background: scrolled
          ? "color-mix(in oklab, var(--background) 75%, transparent)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--surface-stroke)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <a href="/" className="flex items-center">
          <img src={navLogo.src} alt="Clink" className="h-6 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-2 text-[15px] text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.icon ? (
                <img src={item.icon} alt="" className="h-4 w-4 rounded-full" />
              ) : null}
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/login"
          className="inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium text-foreground transition-colors hover:bg-elev"
          style={{ borderColor: "var(--surface-stroke)" }}
        >
          Login
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-12 border-t"
      style={{ borderColor: "var(--surface-stroke)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-6 pt-20 pb-12 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <img src={navLogo.src} alt="Clink" className="h-6 w-auto" />
          <p className="mt-5 max-w-[220px] text-sm leading-relaxed text-foreground-muted">
            Payment infrastructure for an AI-native world.
          </p>
        </div>
        <FooterCol
          title="Products"
          items={[
            ["Payments", "/products/payment"],
            ["Smart Routing", "/products/routing"],
            ["Billing", "/products/billing"],
            ["Clink for Claw", "/clink-for-claw"],
          ]}
        />
        <FooterCol
          title="Resources"
          items={[
            ["Blog", "/blog"],
            ["Docs", "/docs"],
            ["API Reference", "/docs/api"],
            ["Changelog", "/changelog"],
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            ["About", "/about"],
            ["Contact us", "/contact"],
            ["Support", "/support"],
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            ["Terms", "/legal/terms"],
            ["Privacy", "/legal/privacy"],
            ["Cookies", "/legal/cookies"],
          ]}
        />
      </div>
      <div className="border-t" style={{ borderColor: "var(--surface-stroke)" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-foreground-subtle md:flex-row">
          <p>© Clink Inc. 2026</p>
          <p>Made for an AI-native world</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
