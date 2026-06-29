import Link from "next/link";
import navLogo from "@/assets/clink/nav-logo.svg";

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
            <Link
              href={href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {label}
            </Link>
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
          <img src={navLogo} alt="Clink" className="h-6 w-auto" />
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
            ["Docs", "/docs"],
            ["API Reference", "/docs/api"],
            ["Changelog", "/changelog"],
            ["Status", "/status"],
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
      <div
        className="border-t"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-foreground-subtle md:flex-row">
          <p>© Clink Inc. 2026</p>
          <p>Made for an AI-native world</p>
        </div>
      </div>
    </footer>
  );
}
