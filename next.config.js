/* eslint-disable @typescript-eslint/no-var-requires */
const rewritesJson = require("./src/config/rewrites.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      ...rewritesJson,
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

module.exports = nextConfig
