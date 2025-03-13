/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  webpack(config: { devtool: boolean; }, { dev, isServer }: any) {
    if (!dev && !isServer) {
      // ปิดการสร้าง source maps ใน production
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
