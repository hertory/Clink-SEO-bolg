import Link from "next/link";
import navLogo from "@/assets/clink/nav-logo.svg";

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="mt-12 border-t"
      style={{ borderColor: "var(--surface-stroke)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-6 pt-20 pb-12 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <img src={navLogo.src} alt="Clink" className="h-6 w-auto" />
          <p className="mt-5 max-w-[240px] text-sm leading-relaxed text-foreground-muted">
            Global Payments for Humans and Agents.
          </p>
        </div>

        <FooterCol
          title="Billing"
          items={[
            { label: "Subscription", href: "/products/billing#subscription-management" },
            { label: "Customer Portal", href: "/products/billing#customer-portal" },
            { label: "Coupon", href: "/products/billing#coupon" },
            { label: "Tax Compliance", href: "/products/billing#tax-compliance" },
          ]}
        />

        <FooterCol
          title="Smart Routing"
          items={[
            { label: "Dynamic Routing", href: "/products/routing#dynamic-routing" },
            { label: "Automatic Retries", href: "/products/routing#automatic-retries" },
            {
              label: "Customizable Rules",
              href: "/products/routing#customizable-routing-rules-with-priority",
            },
          ]}
        />

        <FooterCol
          title="Payment"
          items={[
            { label: "Hosted Checkout", href: "/products/payment#hosted-checkout" },
            { label: "Global Coverage", href: "/products/payment#global-coverage" },
            { label: "PCI Compliant", href: "/products/payment#pci-compliant" },
            { label: "Fraud Prevention", href: "/products/payment#fraud-prevention" },
          ]}
        />

        <FooterCol
          title="Support"
          items={[
            { label: "Blog", href: "/blog" },
            {
              label: "API Reference",
              href: "https://docs.clinkbill.com/api-reference",
              external: true,
            },
            {
              label: "Documentation",
              href: "https://docs.clinkbill.com/",
              external: true,
            },
          ]}
        />
      </div>

      <div
        className="border-t"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-foreground-subtle md:flex-row">
          <p>Copyright © clinkbill.com All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
