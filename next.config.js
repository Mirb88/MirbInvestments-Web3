
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  trailingSlash: false,
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
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect non-www to www and ensure HTTPS
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
      // Redirect HTTP to HTTPS for the www domain
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
      // Legacy redirects
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
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 604800, // 7 days in seconds
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};

module.exports = nextConfig;
