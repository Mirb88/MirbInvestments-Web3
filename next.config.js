/** @type {import('next').NextConfig} */
const path = require('path');

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com https://*.google.com https://*.googleapis.com https://*.firebaseapp.com https://*.firebase.google.com https://*.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://coin-images.coingecko.com https://*.photos https://*.placehold.co https://*.googleapis.com https://*.google.com https://*.gstatic.com;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://*.firebase.google.com https://www.google-analytics.com https://*.google-analytics.com https://*.gstatic.com;
    frame-src 'self' https://www.googletagmanager.com https://apis.google.com https://*.firebaseapp.com https://*.google.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig = {
  compress: true,
  trailingSlash: false, 

  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'coin-images.coingecko.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' }
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader.replace(/\s{2,}/g, ' ').trim() },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ],
      },
    ];
  },

  async redirects() {
    return [
      // OPTIMIZOVANA REDIREKCIJA: Izbjegavamo petlju, ali čistimo URL
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // APEX AUTHORITY
      { 
        source: '/robots.txt', 
        has: [{ type: 'host', value: 'mirb.investments' }], 
        destination: 'https://www.mirb.investments/robots.txt', 
        permanent: true 
      },
      // BRAND CONSOLIDATION
      { source: '/images/brand/og-image.jpeg', destination: '/images/brand/mirb-investments-og-image.webp', permanent: true },
      { source: '/images/brand/og-image.png', destination: '/images/brand/mirb-investments-og-image.webp', permanent: true },
      // LEGACY REDIRECTS
      { source: '/.well-known/(.*)', destination: 'https://www.mirb.investments/', permanent: true }
    ];
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },

  reactStrictMode: true
};

module.exports = nextConfig;
