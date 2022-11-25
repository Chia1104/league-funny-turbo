// @ts-check
import { env } from "./src/env/server.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

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

export default defineNextConfig({
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  experimental: {
    // transpilePackages: ["@wanin/ui", "@wanin/utils"],
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
        destination: "/l",
        permanent: false,
      },
    ];
  },
  compiler: {
    removeConsole: false,
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
});
