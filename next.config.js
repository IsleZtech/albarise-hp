/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 開発者ツールを無効化
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-left",
  },
  experimental: {
    devOverlays: false,
  },
};

module.exports = nextConfig;
