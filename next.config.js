/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const dataRedirects = require("./src/config/redirects.json");
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
  async redirects() {
    return [...dataRedirects];
  },
};

module.exports = nextConfig;
