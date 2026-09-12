/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { isServer }) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    // Dodatni fallback za Web3 biblioteke kako bi se spriječila upozorenja i greške sa nedostajućim mobilnim paketima
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
      net: false,
      tls: false,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
