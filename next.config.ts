import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 3,
  },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/orders",
        destination: "/account/orders",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/",
        permanent: false,
      },
      {
        source: "/signin",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
