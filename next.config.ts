import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  // Only our own sites may frame these pages. Kept narrow on purpose: a full
  // script/style CSP would need auditing every embed and video first.
  {
    key: "Content-Security-Policy",
    value:
      "frame-ancestors 'self' https://livingincabo.com https://*.livingincabo.com; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // quiz.livingincabo.com serves the neighborhood match quiz at its root,
      // while guide.livingincabo.com keeps serving the buyer's guide. Same
      // deployment, two products, one pipeline.
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "quiz.livingincabo.com" }],
          destination: "/quiz",
        },
      ],
    };
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The brief link is the access key to a lead's details, so it must
      // never leak to another site through the Referer header.
      {
        source: "/brief/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);
