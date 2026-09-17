import Link from "next/link";

/**
 * Mirrors the clinkbill.com main-site footer: logo + four link columns
 * (Billing / Smart Routing / Payment / Support), social row (X, LinkedIn,
 * Xiaohongshu), tagline, and the copyright + legal bottom bar.
 */

const COLUMNS = [
  {
    title: "Billing",
    href: "/products/billing",
    items: [
      { label: "Subscription", href: "/products/billing#subscription-management" },
      { label: "Customer Portal", href: "/products/billing#customer-portal" },
      { label: "Coupon", href: "/products/billing#coupon" },
      { label: "Tax Compliance", href: "/products/billing#tax-compliance" },
    ],
  },
  {
    title: "Smart Routing",
    href: "/products/routing",
    items: [
      { label: "Dynamic Routing", href: "/products/routing#dynamic-routing" },
      { label: "Automatic Retries", href: "/products/routing#automatic-retries" },
      {
        label: "Customizable Rules",
        href: "/products/routing#customizable-routing-rules-with-priority",
      },
    ],
  },
  {
    title: "Payment",
    href: "/products/payment",
    items: [
      { label: "Hosted Checkout", href: "/products/payment#hosted-checkout" },
      { label: "Global Coverage", href: "/products/payment#global-coverage" },
      { label: "PCI Compliant", href: "/products/payment#pci-compliant" },
      { label: "Fraud Prevention", href: "/products/payment#fraud-prevention" },
    ],
  },
  {
    title: "Support",
    href: "#",
    items: [
      { label: "API Reference", href: "https://docs.clinkbill.com/api-reference" },
      { label: "Documentation", href: "https://docs.clinkbill.com" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const SOCIAL_BTN =
  "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#E5E3DF] bg-[#F0EFEC] text-[#121212] transition-colors hover:border-[#D5D2CC] hover:bg-[#E7E5E1]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f7f7f7] px-6 pt-20 pb-10 text-white lg:px-15">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 lg:flex-row lg:gap-15">
        <div className="flex max-w-[300px] flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/resource/home-new/footer-logo.svg"
            width={99}
            height={36}
            alt="clink logo"
            className="mb-6"
          />
        </div>

        <div className="flex flex-wrap gap-10 lg:gap-16">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-[17px]">
              <h3 className="text-[16px] font-medium leading-6 text-[#121212]">
                {col.href && col.href !== "#" ? (
                  <Link
                    href={col.href}
                    className="transition-colors hover:text-[#121212]/70"
                  >
                    {col.title}
                  </Link>
                ) : (
                  col.title
                )}
              </h3>
              <ul className="flex flex-col gap-3.5 py-px">
                {col.items.map((item) =>
                  /^https?:\/\//.test(item.href) ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-normal leading-[22px] text-[#71717A] transition-colors hover:text-[#121212]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[14px] font-normal leading-[22px] text-[#71717A] transition-colors hover:text-[#121212]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col gap-4">
        <div className="flex items-center gap-3">
          <a
            href="https://x.com/clinkglobal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className={SOCIAL_BTN}
          >
            <svg
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="none"
              className="size-4 fill-current"
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/clinkbill"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={SOCIAL_BTN}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="none"
              className="size-4 fill-current"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452Z" />
            </svg>
          </a>
          <a
            href="https://www.xiaohongshu.com/user/profile/69b258ef000000003302109e"
            target="_blank"
            rel="noopener noreferrer"
            className={SOCIAL_BTN}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/resource/images/company/social-xiaohongshu-black.png"
              width={40}
              height={40}
              alt="Xiaohongshu"
              className="size-full invert mix-blend-multiply"
            />
          </a>
        </div>
        <p className="text-[16px] leading-6 text-[#71717A]">
          Global Payments for Humans and Agents.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col justify-between gap-3 border-t border-black/10 pt-6 md:flex-row">
        <p className="text-[14px] leading-[22px] text-[#71717A]">
          Copyright © clinkbill.com All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-[14px] leading-[22px] text-[#71717A] transition-colors hover:text-[#121212]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-[14px] leading-[22px] text-[#71717A] transition-colors hover:text-[#121212]"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
