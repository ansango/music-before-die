/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/es",
        destination: "/es/index",
      },
      {
        source: "/en",
        destination: "/en/index",
      },
    ];
  },
};

module.exports = nextConfig;
