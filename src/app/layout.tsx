import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
};

export const revalidate = 3600;

const PRODUCTION_URL = 'https://mirb-investments-web3-git-main-mirbs-projects.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'MirbInvestments | Architecture of Intelligent Capital 2026',
    template: '%s | MirbInvestments™',
  },
  description: "Elite Reputational Architecture for visionaries. Secure institutional-grade clarity with AI-driven strategic intuition and ethical wealth management.",
  keywords: [
    'MirbInvestments', 
    'Reputational Architecture', 
    'Intelligent Capital', 
    'AI Investment Synergy', 
    'Elite Financial Sovereignty', 
    'Strategic Convergence 2026', 
    'Family Office Tech',
    'Architecture of Truth',
    'Neural Node 88',
    'Institutional-Grade Crypto Assets',
    'AI-Driven Real Estate Tokenization'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 't0KzdYdLCaFlfeyVB5-jwSuVFZY_IS3D1VxB-PLzac8',
  },
  openGraph: {
    title: {
      default: 'MirbInvestments | The Architecture of Truth',
      template: '%s | MirbInvestments™',
    },
    description: "Enter the circle that shapes what comes next. Institutional-grade clarity for elite portfolios.",
    url: '/',
    siteName: 'MirbInvestments',
    images: [
      {
        url: '/images/brand/mirb-investments-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'MirbInvestments - The Architecture of Truth',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mirbinvestments',
    creator: '@mirbinvestments',
    title: 'MirbInvestments | Elite Financial Synergy',
    description: "Where strategic wisdom meets neural intelligence. Join the most reputationally defining club of our time.",
    images: ['/images/brand/mirb-investments-og-image.webp'],
  },
  icons: {
    icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    title: "MirbInvest",
    statusBarStyle: 'black-translucent',
  },
};

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MirbInvestments™",
    "alternateName": "Mirb Investments",
    "url": PRODUCTION_URL,
    "logo": `${PRODUCTION_URL}/images/brand/logo.webp`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+387603527846",
      "contactType": "customer service",
      "email": "support@mirb.investments",
      "availableLanguage": ["English", "Bosnian", "German", "Turkish"]
    },
    "sameAs": [
      "https://twitter.com/mirbinvestments",
      "https://www.linkedin.com/company/mirbinvestments",
      PRODUCTION_URL,
      "https://mirbinvestments.crypto.ud.me"
    ],
    "brand": {
      "@type": "Brand",
      "name": "MirbInvestments",
      "description": "The Architecture of Truth and Neural Intelligence Core."
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  return (
    <html lang="en" className="dark">
      <body className={cn('min-h-screen antialiased flex flex-col bg-[#0D0D0D] text-white', inter.variable)}>
        <OrganizationSchema />
        <AuthProvider>
          <Web3Provider>
            <PortfolioProvider>
              {children}
            </PortfolioProvider>
          </Web3Provider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
        {gaId !== 'G-XXXXXXXXXX' && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
