'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';

function HomeContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div suppressHydrationWarning={true} className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] flex flex-col items-center justify-center font-mono space-y-4">
        <div className="text-3xl animate-bounce">⚡</div>
        <div className="text-xs tracking-widest uppercase">Initializing MirbInvestments Core...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] flex flex-col justify-between selection:bg-[#2FE93D] selection:text-[#0D0D0D]">
      {/* Top Institutional Header */}
      <header className="w-full border-b border-[#EDF2F4]/10 py-3.5 px-4 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#0D0D0D]/90 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#2FE93D]/40 flex items-center justify-center shadow-md shadow-[#2FE93D]/10">
            <svg className="w-4 h-4 text-[#2FE93D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-black text-base tracking-wider text-[#EDF2F4]">
            MIRB<span className="text-[#2FE93D]">INVESTMENTS</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <Link 
            href="/login" 
            className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-[#EDF2F4]/80 hover:text-[#2FE93D] transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#2FE93D] text-[#0D0D0D] hover:bg-[#25b830] transition-all shadow-sm shadow-[#2FE93D]/20"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden py-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#2FE93D]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl w-full text-center z-10 space-y-8">
          <div className="inline-block">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#2FE93D] font-bold px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#2FE93D]/30 shadow-inner">
              // Architecture of Intelligent Capital
            </span>
          </div>

          <h1 className="text-3xl md:text-6xl font-black tracking-tight text-[#EDF2F4] leading-tight">
            The Future of Web3 <br />
            <span className="text-[#2FE93D] drop-shadow-[0_0_25px_rgba(47,233,61,0.3)]">Investments & AI Infrastructure</span>
          </h1>

          <p className="text-sm md:text-lg text-[#EDF2F4]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Institutional platform for digital asset management, neural diagnostics, and high-tier tokenized real estate assets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#25b830] hover:scale-105 shadow-xl shadow-[#2FE93D]/20 text-center"
            >
              Launch Platform
            </Link>
            
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#141414] border border-[#EDF2F4]/20 text-[#EDF2F4] font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#2FE93D] hover:text-[#2FE93D] text-center"
            >
              Access Account
            </Link>
          </div>

          {/* Status Indicators */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs text-[#EDF2F4]/60 border-t border-[#EDF2F4]/10 mt-10">
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-2.5 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse" />
              <span>Neural Engine: Active</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-2.5 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#F0B90B]" />
              <span>Web3 Protocol: Secured</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-2.5 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#7B3FE4]" />
              <span>Mainnet: Ready</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#EDF2F4]/10 py-5 px-6 text-center text-xs text-[#EDF2F4]/40 bg-[#0D0D0D]">
        <p>&copy; 2026 MirbInvestments. All rights reserved. Designed for sovereign investors.</p>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] flex items-center justify-center font-mono">Loading System...</div>}>
      <HomeContent />
    </Suspense>
  );
}
