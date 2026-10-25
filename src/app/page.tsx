'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden">
      
      {/* Top Ticker Bar */}
      <div className="bg-[#141414] border-b border-[#222222] py-2 px-4 overflow-hidden whitespace-nowrap text-xs text-[#8D99AE]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 animate-marquee">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] inline-block animate-pulse"></span>
              <span className="text-[#2FE93D] font-bold uppercase tracking-wider">LIVE PULSE</span>
            </span>
            <span>BTC: <strong className="text-[#EDF2F4]">$68,420</strong> <span className="text-[#2FE93D]">(+3.4%)</span></span>
            <span>ETH: <strong className="text-[#EDF2F4]">$3,540</strong> <span className="text-[#2FE93D]">(+2.1%)</span></span>
            <span>SOL: <strong className="text-[#EDF2F4]">$198.45</strong> <span className="text-[#2FE93D]">(+4.2%)</span></span>
          </div>
          <span className="hidden md:inline text-[#2FE93D] font-mono pl-4">Sovereign Core v2026</span>
        </div>
      </div>

      {/* Navigation Header - Responsive Fix */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-[#222222]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b1b1b] to-[#0D0D0D] border border-[#2FE93D]/40 flex items-center justify-center shadow-[0_0_15px_rgba(47,233,61,0.25)] flex-shrink-0">
            <svg className="w-5 h-5 text-[#2FE93D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
              MirbInvestments
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#2FE93D] font-mono uppercase">
              SOVEREIGN WEB3
            </span>
          </div>
        </div>

        {/* Navigation Links - Responsive Flex Wrap */}
        <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-medium text-[#8D99AE]">
          <Link href="/club" className="hover:text-[#2FE93D] transition-colors whitespace-nowrap">Club</Link>
          <Link href="/neural-diagnostics" className="hidden sm:inline hover:text-[#2FE93D] transition-colors whitespace-nowrap">Diagnostics</Link>
          <Link href="/login" className="hover:text-[#2FE93D] transition-colors whitespace-nowrap">Login</Link>
          <Link href="/register" className="px-3 py-1.5 rounded-xl bg-[#2FE93D] text-black font-bold hover:bg-[#25b830] transition-all whitespace-nowrap">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-8 backdrop-blur-md mx-auto">
          <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">POWERED BY NEURAL INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#EDF2F4] mb-6 leading-tight">
          MirbInvestments<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            The Apex of Human-AI Synergy
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D99AE] mb-10 leading-relaxed">
          Elevating Luxury Assets through <strong className="text-[#EDF2F4]">Neural Diagnostics</strong> and Purposeful Blockchain Innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link href="/club" className="w-full sm:w-auto px-8 py-4 bg-[#2FE93D] text-[#0D0D0D] font-extrabold rounded-2xl shadow-[0_0_30px_rgba(47,233,61,0.5)] hover:scale-105 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer">
            <span>ENTER ACCESS CLUB</span>
            <span>→</span>
          </Link>
          <Link href="/neural-diagnostics" className="w-full sm:w-auto px-8 py-4 bg-[#1b1b1b] border border-[#333333] text-[#EDF2F4] font-bold rounded-2xl hover:border-[#2FE93D] transition-all text-base">
            Explore Diagnostics
          </Link>
        </div>
      </section>

      {/* Interactive Investment Goal Widget */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-[#EDF2F4] mb-2">Not Sure Where to Start?</h3>
            <p className="text-[#8D99AE] text-xs sm:text-sm">Let our AI find the perfect crypto bundle for your investment goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Long-term Growth', 'Fast Gains', 'Stability'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  selectedGoal === goal
                    ? 'bg-[#2FE93D]/10 border-[#2FE93D] text-[#2FE93D] shadow-[0_0_15px_rgba(47,233,61,0.2)]'
                    : 'bg-[#1b1b1b] border-[#2b2b2b] text-[#EDF2F4] hover:border-[#444]'
                }`}
              >
                <span className="font-bold text-base sm:text-lg mb-2">{goal}</span>
                <span className="text-xs text-[#8D99AE]">Select to configure tailored AI portfolio bundle.</span>
              </button>
            ))}
          </div>

          <div className="text-center p-4 rounded-xl bg-[#0D0D0D] border border-[#222222]">
            <p className="text-xs sm:text-sm text-[#8D99AE]">
              {selectedGoal ? (
                <span>Selected Strategy: <strong className="text-[#2FE93D]">{selectedGoal}</strong> — Ready for neural synchronization.</span>
              ) : (
                <span>Select a goal to get your instant recommendation.</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222222] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-xs sm:text-sm text-[#8D99AE]">
        <p className="mb-4">MirbInvestments™. Simplified Crypto. Smarter Investing.</p>
        <p>© 2026 All Rights Reserved. Sovereign Elite Architecture.</p>
      </footer>
    </div>
  );
}
