import type { Metadata } from "next";
import { Inter, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://clink-ai.lovable.app",
  ),
  title: {
    default: "Clink — Payment Infrastructure for an AI-Native World",
    template: "%s — Clink",
  },
  description:
    "Clink is payment & subscription billing infrastructure for AI-native SaaS — one API for 100+ local payment methods, usage-based pricing, and built-in tax handling.",
  openGraph: {
    type: "website",
    siteName: "Clink",
    title: "Clink — Payment Infrastructure for an AI-Native World",
    description:
      "Clink builds professional, brand-aligned landing pages and content for web applications.",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/18dd3f91-da87-4482-bf73-5ea6107f179e/id-preview-3c642657--349f2cc3-12b9-424a-a847-fd37e46110f7.lovable.app-1782192840053.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clink — Payment Infrastructure for an AI-Native World",
    description:
      "Clink builds professional, brand-aligned landing pages and content for web applications.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/18dd3f91-da87-4482-bf73-5ea6107f179e/id-preview-3c642657--349f2cc3-12b9-424a-a847-fd37e46110f7.lovable.app-1782192840053.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${hanken.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
