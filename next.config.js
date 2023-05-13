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
      {
        source: "/es/artista/:slug*",
        destination: "/es/artist/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
