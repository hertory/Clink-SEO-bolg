"use client";

import { useEffect } from "react";
import { VISA_BODY_HTML } from "./visa-partnership-body";
import { VISA_JSONLD } from "./visa-partnership-jsonld";
import "./visa-partnership.css";

/**
 * 1:1 replica of the prototype standalone page
 * (clink-visa-intelligent-commerce.juliewang.chatgpt.site), rendered as a
 * special case for the blog slug `clink-and-visa-partner-on-intelligent-
 * commerce` instead of the standard markdown article layout. Markup and CSS
 * are extracted from the prototype (see visa-partnership-body.ts /
 * visa-partnership.css, both auto-generated 2026-09-17); the reading
 * progress bar script is ported to React below.
 */

export function VisaPartnershipPage() {
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
    <div className="visa-scope">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@500;600;700&display=swap"
      />
      <div dangerouslySetInnerHTML={{ __html: VISA_BODY_HTML }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: VISA_JSONLD }}
      />
    </div>
  );
}

export default VisaPartnershipPage;
