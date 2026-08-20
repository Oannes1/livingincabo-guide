import type { NextConfig } from "next";

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
};

export default nextConfig;
