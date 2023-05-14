/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

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
};

module.exports = nextConfig;
