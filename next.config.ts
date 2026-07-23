import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev" },
      { protocol: "https", hostname: "clink-ai.lovable.app" },
      { protocol: "https", hostname: "fonts.gstatic.com" },
      { protocol: "https", hostname: "fonts.googleapis.com" },
    ],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/blog/add-payments-lovable-app",
        destination: "/blog/how-to-add-payments-lovable-app",
        permanent: true,
      },
      {
        source: "/clink-for-claw",
        destination: "/agentic-payment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
