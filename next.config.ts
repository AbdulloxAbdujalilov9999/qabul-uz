import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This app is session-driven on every route (auth-aware nav, in-memory
     mutable store, server actions), so it opts out of Cache Components'
     static-first prerendering rather than fighting it with Suspense
     boundaries on every page. */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
