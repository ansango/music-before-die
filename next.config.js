/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const redirects = require("./src/config/redirects.json");
const rewrites = require("./src/config/rewrites.json");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      ...rewrites,
    ];
  },
  async redirects() {
    return [...redirects];
  },
};

module.exports = nextConfig;
