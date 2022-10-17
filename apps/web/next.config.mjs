// @ts-check
import { env } from "./src/env/server.mjs";
import withTM from "next-transpile-modules";

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

export default withTM()(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    experimental: {
      // swcPlugins: [
      //   ['plugin', {
      //
      //   }]
      // ]
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
      domains: [],
    },
    // webpack: (config) => {
    //   config.resolve.alias = {
    //     ...config.resolve.alias,
    //     "react/jsx-runtime.js": require.resolve("react/jsx-runtime"),
    //   };
    //
    //   config.resolve = {
    //     ...config.resolve,
    //
    //     fallback: {
    //       ...config.resolve.fallback,
    //       child_process: false,
    //       fs: false,
    //     },
    //   };
    //
    //   return config;
    // },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: securityHeaders,
        },
      ];
    },
  })
);
