/* eslint-disable @typescript-eslint/no-var-requires */
const rewritesJson = require("./src/config/rewrites.json");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "es",
    locales: ["en", "es", "it"],
  },
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
