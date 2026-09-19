"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TopNav } from "@/components/blog/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { VISA_BODY_HTML } from "./visa-partnership-body";
import { VISA_JSONLD } from "./visa-partnership-jsonld";
import "./visa-partnership.css";

/**
 * 1:1 replica of the prototype standalone page body
 * (clink-visa-intelligent-commerce.juliewang.chatgpt.site), rendered as a
 * special case for the blog slug `clink-and-visa-partner-on-intelligent-
 * commerce` instead of the standard markdown article layout. The prototype's
 * own site-header and footer are stripped; the generic site chrome
 * (TopNav / Breadcrumb / Footer) wraps the Julie-designed body so the page
 * stays consistent with the rest of /blog.
 */

export function VisaPartnershipPage({ title, slug }: { title: string; slug: string }) {
  useEffect(() => {
    const progress = document.getElementById("progress");
    if (!progress) return;
    const updateProgress = () => {
      const root = document.documentElement;
      const distance = root.scrollHeight - root.clientHeight;
      progress.style.width =
        distance > 0 ? `${(root.scrollTop / distance) * 100}%` : "0%";
    };
    document.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => document.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title, href: `/blog/${slug}` },
        ]}
      />
      <div className="visa-scope">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@500;600;700&display=swap"
        />
        <div dangerouslySetInnerHTML={{ __html: VISA_BODY_HTML }} />
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: VISA_JSONLD }}
      />
    </div>
  );
}

export default VisaPartnershipPage;
