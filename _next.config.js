/* eslint-disable @typescript-eslint/no-var-requires */
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

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

module.exports = withNextIntl(nextConfig);
