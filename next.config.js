/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Postavite 'export' ako planirate direktan statički build za čisti IPFS deployment
  // output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mirb.investments',
          },
        ],
        destination: 'https://www.mirb.investments/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'www.mirb.investments',
          },
        ],
        destination: 'https://www.mirb.investments/:path*',
        permanent: true,
      },
      {
        source: '/ai-insights/crypto-summit-jahorina-2026-ai-real-estate-tourism',
        destination: '/ai-insights/strategic-convergence-jahorina-2026-ai-real-estate-tourism',
        permanent: true,
      },
      {
        source: '/ai-insights/understanding-market-cycles',
        destination: '/academy',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true, // Neophodno za decentralizovane/IPFS static gatway-e
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
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
