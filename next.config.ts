import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  swcMinify: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
