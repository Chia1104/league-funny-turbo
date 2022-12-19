// @ts-check
import { env } from "./src/env/server.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import withBundleAnalyzerImport from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerImport({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: join(
      dirname(fileURLToPath(import.meta.url)),
      "../.."
    ),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/b",
        permanent: false,
      },
    ];
  },
  compiler: {
    removeConsole: env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "img.league-funny.com",
      "img.youtube.com",
      "platform-lookaside.fbsbx.com",
      "static-cdn.jtvnw.net",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const plugins = [withBundleAnalyzer];

const nextComposePlugins = plugins.reduce(
  (acc, plugin) => plugin(acc),
  nextConfig
);

export default nextComposePlugins;
