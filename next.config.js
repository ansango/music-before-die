/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const rewritesJson = require("./src/config/rewrites.json");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      ...rewritesJson,
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/",
        destination: "/index",
      },
    ];
  },
};

module.exports = nextConfig;
