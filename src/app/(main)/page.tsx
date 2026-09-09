import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MirbLogo } from '@/components/layout/mirb-logo';
import { Cpu, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MirbInvestments | Elite Financial Synergy',
    description: 'Where strategic wisdom meets neural intelligence. Join the most reputationally defining club of our time.',
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#0D0D0D] px-4 py-8 text-[#EDF2F4]">
      {/* Top Navigation Header */}
      <header className="w-full max-w-5xl flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <MirbLogo />
          <span className="text-lg font-bold tracking-wider">MirbInvestments</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="text-gray-300 hover:text-[#2FE93D]">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Link>
          </Button>
          <Button asChild className="bg-[#2FE93D] font-semibold text-[#0D0D0D] hover:bg-[#28d336]">
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" /> Request Access
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center max-w-3xl my-auto py-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-[#141414] px-4 py-1.5 text-xs text-[#2FE93D]">
          <Cpu className="h-3.5 w-3.5" />
          <span>POWERED BY NEURAL INTELLIGENCE</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          The Apex of <span className="text-[#2FE93D]">Human-AI</span> Synergy
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
          Elevating Luxury Assets through <span className="italic text-[#EDF2F4]">Neural Diagnostics</span> and Purposeful Blockchain Innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button asChild size="lg" className="bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] px-8">
            <Link href="/register">
              Request Access <UserPlus className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-gray-800 bg-[#141414] text-[#EDF2F4] hover:bg-gray-900">
            <Link href="/neural-diagnostics">
              Neural Diagnostics <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between border-t border-gray-800 pt-6 text-xs text-gray-500">
        <p>© 2026 MirbInvestments. Architecture of Intelligent Capital.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="/neural-diagnostics" className="hover:text-[#2FE93D]">Diagnostics</Link>
          <Link href="/login" className="hover:text-[#2FE93D]">Institutional Login</Link>
          <Link href="/register" className="hover:text-[#2FE93D]">Secure Onboarding</Link>
        </div>
      </footer>
    </div>
  );
}
