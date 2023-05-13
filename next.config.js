/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const dataRewrites = require("./src/config/rewrites.json");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      ...dataRewrites,
    ];
  },
};

module.exports = nextConfig;
