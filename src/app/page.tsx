export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HomePageContent } from '@/components/content/home-page-content';
import { ROUTES } from '@/lib/routes';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';

// Kanonski URL prilagođen nezavisnoj Web3 mirbinvestments.crypto infrastrukturi bez trailing slasha
const canonicalUrl = `https://mirbinvestments.crypto${ROUTES?.HOME || ''}`;

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

export default function Page() {
  return (
    <ClientOnlyWrapper>
      {/* Glavni sadržaj platforme */}
      <HomePageContent />

      {/* Elegantna Web3 pristupna traka za Login i Register */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#141414]/90 backdrop-blur-md border border-[#2FE93D]/30 px-5 py-3 rounded-2xl shadow-2xl shadow-[#2FE93D]/10">
        <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse" />
        <span className="text-xs uppercase tracking-wider text-[#EDF2F4]/80 font-medium hidden sm:inline">
          Access Portal:
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-lg bg-[#0D0D0D] border border-[#EDF2F4]/20 text-[#EDF2F4] text-xs font-bold uppercase tracking-wider hover:border-[#2FE93D] hover:text-[#2FE93D] transition-all"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-lg bg-[#2FE93D] text-[#0D0D0D] text-xs font-bold uppercase tracking-wider hover:bg-[#25b830] transition-all shadow-md shadow-[#2FE93D]/20"
          >
            Register
          </Link>
        </div>
      </div>
    </ClientOnlyWrapper>
  );
}
