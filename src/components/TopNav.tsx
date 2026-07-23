"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import navLogo from "@/assets/clink/nav-logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PRODUCTS = [
  { label: "Billing", href: "/products/billing", desc: "Subscriptions, portals, and tax" },
  { label: "Payment", href: "/products/payment", desc: "Hosted checkout and global coverage" },
  { label: "Smart Routing", href: "/products/routing", desc: "Dynamic routing and automatic retries" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog", desc: "Guides on payments, billing, and agents" },
  {
    label: "Documentation",
    href: "https://docs.clinkbill.com/",
    desc: "Quickstart, guides, and SDK docs",
    external: true,
  },
  {
    label: "API Reference",
    href: "https://docs.clinkbill.com/api-reference",
    desc: "REST endpoints and webhooks",
    external: true,
  },
];

const LOGIN_URL = "https://uat-dashboard.clinkbill.com/auth/login";
const GET_STARTED_URL = "https://uat-dashboard.clinkbill.com/auth/register";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-[15px] text-foreground-muted transition-colors hover:text-foreground"
          >
            Skill Marketplace
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              New
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-[15px] text-foreground-muted outline-none transition-colors hover:text-foreground">
              Products
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px] p-2">
              {PRODUCTS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-3 py-2.5"
                  >
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-foreground-muted">{item.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-[15px] text-foreground-muted outline-none transition-colors hover:text-foreground">
              Resources
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-2">
              {RESOURCES.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-3 py-2.5"
                    >
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-xs text-foreground-muted">{item.desc}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-3 py-2.5"
                    >
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-xs text-foreground-muted">{item.desc}</span>
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/contact"
            className="text-[15px] text-foreground-muted transition-colors hover:text-foreground"
          >
            Contact us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            className="inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium text-foreground transition-colors hover:bg-elev"
            style={{ borderColor: "var(--surface-stroke)" }}
          >
            Login
          </a>
          <a
            href={GET_STARTED_URL}
            className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border lg:hidden"
          style={{ borderColor: "var(--surface-stroke)" }}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="border-t px-6 py-4 lg:hidden"
          style={{
            borderColor: "var(--surface-stroke)",
            background: "var(--background)",
          }}
        >
          <div className="flex flex-col gap-4">
            <Link href="/skills" className="text-sm text-foreground" onClick={() => setMobileOpen(false)}>
              Skill Marketplace
            </Link>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                Products
              </p>
              <div className="flex flex-col gap-2 pl-2">
                {PRODUCTS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-foreground-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                Resources
              </p>
              <div className="flex flex-col gap-2 pl-2">
                {RESOURCES.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground-muted"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-foreground-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
            <Link href="/contact" className="text-sm text-foreground" onClick={() => setMobileOpen(false)}>
              Contact us
            </Link>
            <div className="flex gap-3 pt-2">
              <a
                href={LOGIN_URL}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-full border text-sm font-medium"
                style={{ borderColor: "var(--surface-stroke)" }}
              >
                Login
              </a>
              <a
                href={GET_STARTED_URL}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
