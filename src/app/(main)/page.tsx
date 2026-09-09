import type { Metadata } from 'next';
import { HomePageContent } from '@/components/content/home-page-content';
import { ROUTES } from '@/lib/routes';

// Primjena dinamičkog renderovanja po potrebi Web3 infrastrukture
export const dynamic = 'force-dynamic';

// Definišemo kanonski URL uz obavezno poštovanje www standarda bez trailing slasha
const canonicalUrl = `https://www.mirb.investments${ROUTES?.HOME || ''}`;

export const metadata: Metadata = {
  title: 'MirbInvestments | Architecture of Intelligent Capital 2026',
  description: 'Elite Reputational Architecture for visionaries. Secure institutional-grade clarity with AI-driven strategic intuition and ethical wealth management.',
  keywords: [
    'MirbInvestments', 
    'Reputational Architecture', 
    'Intelligent Capital', 
    'AI Investment Synergy', 
    'Elite Financial Sovereignty', 
    'Strategic Convergence 2026', 
    'Family Office Tech'
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
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'MirbInvestments | The Architecture of Truth',
    description: 'Enter the circle that shapes what comes next. Institutional-grade clarity for elite portfolios.',
    url: canonicalUrl,
    siteName: 'MirbInvestments',
    images: [
      {
        url: '/images/brand/mirb-investments-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'MirbInvestments - The Architecture of Truth',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MirbInvestments | Elite Financial Synergy',
    description: 'Where strategic wisdom meets neural intelligence. Join the most reputationally defining club of our time.',
    images: ['/images/brand/mirb-investments-og-image.webp'],
  },
};

export default function HomePage() {
  // Sigurnosni provajder za prikaz sadržaja početne stranice
  if (typeof HomePageContent !== 'function') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-[#EDF2F4]">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wider text-[#F0B90B]">MIRBINVESTMENTS</h1>
          <p className="mt-2 text-sm text-gray-400">Architecture of Intelligent Capital — Initializing Systems...</p>
        </div>
      </main>
    );
  }

  return <HomePageContent />;
}
