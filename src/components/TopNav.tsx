"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

/**
 * Mirrors the clinkbill.com main-site navbar: logo / Skill Marketplace (New) /
 * Products mega-dropdown / Resources dropdown / Contact us, plus
 * Login (dashboard) and Get Started (register) pill buttons.
 * Dropdowns open on hover (CSS group), matching the main-site interaction.
 */

const PRODUCT_GROUPS = [
  {
    text: "Billing",
    link: "/products/billing",
    items: [
      { text: "Subscription", link: "/products/billing#subscription-management" },
      { text: "Customer Portal", link: "/products/billing#customer-portal" },
      { text: "Coupon", link: "/products/billing#coupon" },
      { text: "Tax Compliance", link: "/products/billing#tax-compliance" },
    ],
  },
  {
    text: "Smart Routing",
    link: "/products/routing",
    items: [
      { text: "Dynamic Routing", link: "/products/routing#dynamic-routing" },
      { text: "Automatic Retries", link: "/products/routing#automatic-retries" },
      {
        text: "Customizable Rules",
        link: "/products/routing#customizable-routing-rules-with-priority",
      },
    ],
  },
  {
    text: "Payment",
    link: "/products/payment",
    items: [
      { text: "Hosted Checkout", link: "/products/payment#hosted-checkout" },
      { text: "Global Coverage", link: "/products/payment#global-coverage" },
      { text: "PCI Compliant", link: "/products/payment#pci-compliant" },
      { text: "Fraud Prevention", link: "/products/payment#fraud-prevention" },
    ],
  },
];

const RESOURCES = [
  { text: "Document", link: "https://docs.clinkbill.com/" },
  { text: "API", link: "https://docs.clinkbill.com/api-reference/introduction" },
  { text: "Blog", link: "/blog" },
  { text: "ARR Leaderboard", link: "/arr-leaderboard" },
];

const LOGIN_URL = "https://dashboard.clinkbill.com";
const GET_STARTED_URL = "https://uat-dashboard.clinkbill.com/auth/register";

const NAV_LINK =
  "inline-flex h-10 items-center justify-center text-base leading-normal font-normal font-heading transition-colors duration-200 text-[rgba(63,63,70,1)] hover:text-[rgba(63,63,70,1)] focus-visible:text-[rgba(63,63,70,1)]";
const NAV_TRIGGER =
  "inline-flex h-10 items-center text-base leading-normal font-normal font-heading text-center transition-colors duration-200 text-[rgba(63,63,70,1)] hover:text-[rgba(63,63,70,1)] [&>svg]:ml-1 [&>svg]:size-3.5 [&>svg]:transition-transform [&>svg]:duration-200";

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-[#f7f7f7]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/resource/home-new/footer-logo.svg"
            width={88}
            height={32}
            alt="clink-logo"
            className="h-7 w-auto"
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex" aria-label="Main">
          <Link href="/skills" className={`${NAV_LINK} relative`}>
            Skill Marketplace
            <span className="absolute -top-0.5 -right-6 inline-flex h-4 items-center rounded-full bg-gradient-to-r from-[#ed7039] to-[#ec7193] px-1.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-white">
              New
            </span>
          </Link>

          <div className="group/products relative">
            <button type="button" className={NAV_TRIGGER}>
              Products
              <ChevronDown className="transition-transform duration-200 group-hover/products:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-1 opacity-0 transition-all duration-150 group-hover/products:visible group-hover/products:translate-y-0 group-hover/products:opacity-100">
              <div className="flex w-[740px] items-start gap-5 rounded-[12px] border border-[#e7e7e7] bg-white p-5 font-heading shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                {PRODUCT_GROUPS.map((group) => (
                  <div key={group.text} className="flex w-[220px] shrink-0 flex-col gap-3">
                    <Link
                      href={group.link}
                      className="flex h-6 w-full items-center px-1 text-base font-medium leading-6 whitespace-nowrap text-[#3f3f46] transition-colors duration-150 hover:text-[#28251e]"
                    >
                      {group.text}
                    </Link>
                    <div className="flex w-full flex-col gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.text}
                          href={item.link}
                          className="group flex h-8 w-full items-center rounded-sm p-1 transition-colors duration-150 hover:bg-[#f9f9f9]"
                        >
                          <span className="text-base font-normal leading-6 whitespace-nowrap text-[#3f3f46] transition-colors duration-150 group-hover:text-[#28251e]">
                            {item.text}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group/resources relative">
            <button type="button" className={NAV_TRIGGER}>
              Resources
              <ChevronDown className="transition-transform duration-200 group-hover/resources:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-1 opacity-0 transition-all duration-150 group-hover/resources:visible group-hover/resources:translate-y-0 group-hover/resources:opacity-100">
              <div className="flex w-[260px] flex-col gap-3 overflow-hidden rounded-[12px] border border-[#e7e7e7] bg-white p-5 font-heading shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                <div className="flex w-[220px] flex-col gap-1">
                  {RESOURCES.map((item) => {
                    const external = /^https?:\/\//.test(item.link);
                    return external ? (
                      <a
                        key={item.text}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-8 w-full items-center rounded-sm p-1 transition-colors duration-150 hover:bg-[#f9f9f9]"
                      >
                        <span className="text-base font-normal leading-6 whitespace-nowrap text-[#3f3f46] transition-colors duration-150 group-hover:text-[#28251e]">
                          {item.text}
                        </span>
                      </a>
                    ) : (
                      <Link
                        key={item.text}
                        href={item.link}
                        className="group flex h-8 w-full items-center rounded-sm p-1 transition-colors duration-150 hover:bg-[#f9f9f9]"
                      >
                        <span className="text-base font-normal leading-6 whitespace-nowrap text-[#3f3f46] transition-colors duration-150 group-hover:text-[#28251e]">
                          {item.text}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link href="/contact" className={NAV_LINK}>
            Contact us
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center rounded-full border border-zinc-300 bg-transparent px-6 text-[15px] font-medium text-[rgba(63,63,70,1)] shadow-none transition-colors hover:bg-zinc-100 hover:text-[rgba(63,63,70,1)]"
          >
            Login
          </a>
          <a
            href={GET_STARTED_URL}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-full bg-[#161616] px-6 text-[15px] font-medium text-white shadow-none transition-colors hover:bg-[#161616] hover:text-white hover:opacity-90"
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-[rgba(63,63,70,1)] lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[#e7e7e7] bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href="/skills"
              onClick={() => setMobileOpen(false)}
              className="relative inline-flex w-fit items-center text-lg font-medium text-[rgba(63,63,70,1)]"
            >
              Skill Marketplace
              <span className="absolute -top-1 -right-7 inline-flex h-4 items-center rounded-full bg-gradient-to-r from-[#ed7039] to-[#ec7193] px-1.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-white">
                New
              </span>
            </Link>

            <details className="group">
              <summary className="cursor-pointer list-none text-lg font-medium text-[rgba(63,63,70,1)]">
                Products
              </summary>
              <div className="mt-4 flex flex-col gap-3 pl-4">
                {PRODUCT_GROUPS.map((group) => (
                  <div key={group.text} className="flex flex-col gap-2">
                    <Link
                      href={group.link}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-[rgba(63,63,70,1)]"
                    >
                      {group.text}
                    </Link>
                    <div className="flex flex-col gap-2 pl-4">
                      {group.items.map((item) => (
                        <Link
                          key={item.text}
                          href={item.link}
                          onClick={() => setMobileOpen(false)}
                          className="text-base font-normal text-[rgba(63,63,70,1)]"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer list-none text-lg font-medium text-[rgba(63,63,70,1)]">
                Resources
              </summary>
              <div className="mt-4 flex flex-col gap-3 pl-4">
                {RESOURCES.map((item) =>
                  /^https?:\/\//.test(item.link) ? (
                    <a
                      key={item.text}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-normal text-[rgba(63,63,70,1)]"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      key={item.text}
                      href={item.link}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-normal text-[rgba(63,63,70,1)]"
                    >
                      {item.text}
                    </Link>
                  ),
                )}
              </div>
            </details>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-[rgba(63,63,70,1)]"
            >
              Contact us
            </Link>

            <button
              type="button"
              onClick={() => {
                window.location.href = LOGIN_URL;
              }}
              className="h-auto w-full cursor-pointer rounded-xl border border-zinc-300 bg-white py-3 text-[14px] leading-4 font-medium text-[rgba(63,63,70,1)]"
            >
              Login
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
