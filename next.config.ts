import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 4,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow any local path with or without query strings.
    // This is required in Next.js 16+ for images served from
    // API routes like /api/admin/upload?id=...
    localPatterns: [
      {
        pathname: "/api/admin/upload",
        search: "*",
      },
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/courses/digital-marketing",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/courses/ai-automation",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/courses/business",
        destination: "/digital-marketing-on-campus",
        permanent: true,
      },
      {
        source: "/courses/4m-program",
        destination: "/digital-marketing-on-campus",
        permanent: true,
      },
      {
        source: "/courses/development",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/courses/design",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/courses/data-analytics",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/categories/digital-marketing",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/categories/ai-automation",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/categories/business",
        destination: "/digital-marketing-on-campus",
        permanent: true,
      },
      {
        source: "/categories/4m-program",
        destination: "/digital-marketing-on-campus",
        permanent: true,
      },
      {
        source: "/categories/development",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/categories/design",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
      {
        source: "/categories/data-analytics",
        destination: "/new-digital-marketing-program",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: "/:path*.png",
          destination: "/:path*.webp",
        },
        {
          source: "/:path*.jpg",
          destination: "/:path*.webp",
        },
        {
          source: "/:path*.jpeg",
          destination: "/:path*.webp",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
