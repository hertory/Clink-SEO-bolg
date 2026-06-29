"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function TopNav() {
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
        <Link href="/" className="flex items-center">
          <img src={navLogo.src} alt="Clink" className="h-6 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-2 text-[15px] text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.icon ? (
                <img src={item.icon} alt="" className="h-4 w-4 rounded-full" />
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium text-foreground transition-colors hover:bg-elev"
          style={{ borderColor: "var(--surface-stroke)" }}
        >
          Login
        </Link>
      </div>
    </header>
  );
}
