"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D]">
      {/* Top Ticker Bar */}
      <div className="bg-[#141414] border-b border-[#222222] py-2 px-4 overflow-x-auto whitespace-nowrap text-xs text-[#8D99AE]">
        <div className="max-w-7xl mx-auto flex justify-between items-center space-x-8">
          <span className="flex items-center space-x-2">
            <span className="text-[#2FE93D] font-bold">● LIVE MARKET</span>
            <span>SOL: <strong className="text-[#EDF2F4]">$198.45</strong> (+4.2%)</span>
            <span>TRX: <strong className="text-[#EDF2F4]">$0.33</strong> (+1.8%)</span>
            <span>LINK: <strong className="text-[#EDF2F4]">$18.90</strong> (+3.1%)</span>
          </span>
          <span className="text-[#2FE93D]">Sovereign Core v2026 Active</span>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-[#222222]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2FE93D] to-[#14532D] flex items-center justify-center font-black text-[#0D0D0D] text-xl shadow-[0_0_20px_rgba(47,233,61,0.3)]">
            M
          </div>
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-[#EDF2F4] to-[#8D99AE] bg-clip-text text-transparent">
            MirbInvestments
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#8D99AE]">
          <Link href="/crypto-shop" className="hover:text-[#2FE93D] transition-colors">Crypto Shop</Link>
          <Link href="/neural-diagnostics" className="hover:text-[#2FE93D] transition-colors">Neural Diagnostics</Link>
          <Link href="/academy" className="hover:text-[#2FE93D] transition-colors">Academy</Link>
          <Link href="/ai-insights" className="hover:text-[#2FE93D] transition-colors">AI Insights</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-[#EDF2F4] hover:text-[#2FE93D] transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-5 py-2.5 text-sm font-bold bg-[#2FE93D] text-[#0D0D0D] rounded-xl shadow-[0_0_25px_rgba(47,233,61,0.4)] hover:scale-105 transition-all">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 blur-3xl pointer-events-none">
          <div className="w-[500px] h-[500px] bg-[#2FE93D] rounded-full"></div>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">Powered by Neural Intelligence</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#EDF2F4] mb-6">
          MirbInvestments<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            The Apex of Human-AI Synergy
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#8D99AE] mb-10 leading-relaxed">
          Elevating Luxury Assets through <strong className="text-[#EDF2F4]">Neural Diagnostics</strong> and Purposeful Blockchain Innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/crypto-shop" className="w-full sm:w-auto px-8 py-4 bg-[#2FE93D] text-[#0D0D0D] font-extrabold rounded-2xl shadow-[0_0_30px_rgba(47,233,61,0.5)] hover:scale-105 transition-all flex items-center justify-center space-x-2">
            <span>ACCESS CLUB</span>
            <span>→</span>
          </Link>
          <Link href="/neural-diagnostics" className="w-full sm:w-auto px-8 py-4 bg-[#1b1b1b] border border-[#333333] text-[#EDF2F4] font-bold rounded-2xl hover:border-[#2FE93D] transition-all">
            Explore Diagnostics
          </Link>
        </div>
      </section>

      {/* Interactive Investment Goal Widget */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FE93D]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#EDF2F4] mb-2">Not Sure Where to Start?</h3>
            <p className="text-[#8D99AE] text-sm">Let our AI find the perfect crypto bundle for your investment goals. Get a personalized recommendation in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Long-term Growth', 'Fast Gains', 'Stability'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedGoal === goal
                    ? 'bg-[#2FE93D]/10 border-[#2FE93D] text-[#2FE93D] shadow-[0_0_15px_rgba(47,233,61,0.2)]'
                    : 'bg-[#1b1b1b] border-[#2b2b2b] text-[#EDF2F4] hover:border-[#444]'
                }`}
              >
                <span className="font-bold text-lg mb-2">{goal}</span>
                <span className="text-xs text-[#8D99AE]">Select to configure tailored AI portfolio bundle.</span>
              </button>
            ))}
          </div>

          <div className="text-center p-4 rounded-xl bg-[#0D0D0D] border border-[#222222]">
            <p className="text-sm text-[#8D99AE]">
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
      <footer className="border-t border-[#222222] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-sm text-[#8D99AE]">
        <p className="mb-4">MirbInvestments™. Simplified Crypto. Smarter Investing.</p>
        <p>© 2026 All Rights Reserved. Sovereign Elite Architecture.</p>
      </footer>
    </div>
  );
}
