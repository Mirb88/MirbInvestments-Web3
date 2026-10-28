'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [cryptoPrices, setCryptoPrices] = useState({
    btc: '80,685',
    eth: '2,370',
    sol: '111.50',
    trx: '0.28',
    arb: '0.55',
    pol: '0.38',
    avax: '28.40',
    link: '14.20'
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tron,arbitrum,matic-network,avalanche-2,chainlink&vs_currencies=usd'
        );
        const data = await response.json();
        if (data && data.bitcoin) {
          setCryptoPrices({
            btc: data.bitcoin?.usd ? data.bitcoin.usd.toLocaleString() : '80,685',
            eth: data.ethereum?.usd ? data.ethereum.usd.toLocaleString() : '2,370',
            sol: data.solana?.usd ? data.solana.usd.toLocaleString() : '111.50',
            trx: data.tron?.usd ? data.tron.usd.toLocaleString() : '0.28',
            arb: data.arbitrum?.usd ? data.arbitrum.usd.toLocaleString() : '0.55',
            pol: data['matic-network']?.usd ? data['matic-network'].usd.toLocaleString() : '0.38',
            avax: data['avalanche-2']?.usd ? data['avalanche-2'].usd.toLocaleString() : '28.40',
            link: data.chainlink?.usd ? data.chainlink.usd.toLocaleString() : '14.20'
          });
        }
      } catch (error) {
        console.error('Live Pulse Ticker Sync Error:', error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden">
      
      {/* 1. LIVE PULSE TICKER */}
      <div className="bg-[#141414] border-b border-[#222222] py-2 px-4 overflow-hidden whitespace-nowrap text-xs text-[#8D99AE]">
        <div className="w-full px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 animate-marquee">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] inline-block animate-pulse"></span>
              <span className="text-[#2FE93D] font-bold uppercase tracking-wider">LIVE PULSE (COINGECKO)</span>
            </span>
            <span>BTC: <strong className="text-[#EDF2F4]">${cryptoPrices.btc}</strong></span>
            <span>ETH: <strong className="text-[#EDF2F4]">${cryptoPrices.eth}</strong></span>
            <span>SOL: <strong className="text-[#EDF2F4]">${cryptoPrices.sol}</strong></span>
            <span>TRX: <strong className="text-[#EDF2F4]">${cryptoPrices.trx}</strong></span>
          </div>
          <span className="hidden md:inline text-[#2FE93D] font-mono pl-4">Sovereign Core v2026</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <nav className="w-full px-4 sm:px-8 h-20 flex items-center justify-between border-b border-[#222222]">
        <div className="flex items-center space-x-3.5">
          <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            MirbInvestments
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/club" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
            Access Club →
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2FE93D]/15 via-transparent to-transparent blur-3xl animate-pulse"></div>
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
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D99AE] mb-12 leading-relaxed">
          Elevating Luxury Assets through <strong className="text-[#EDF2F4]">Neural Diagnostics</strong> and Purposeful Blockchain Innovation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link href="/club" className="w-full sm:w-auto px-8 py-4 bg-[#2FE93D] text-[#0D0D0D] font-extrabold rounded-2xl shadow-[0_0_30px_rgba(47,233,61,0.5)] hover:scale-105 transition-all flex items-center justify-center space-x-2 text-base">
            <span>ENTER ACCESS CLUB</span>
            <span>→</span>
          </Link>
          <Link href="/neural-diagnostics" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#2FE93D] text-[#EDF2F4] font-bold text-center transition-all shadow-lg flex items-center justify-center space-x-2">
            <span>Explore Diagnostics</span>
          </Link>
        </div>
      </section>

      {/* INTERACTIVE INVESTMENT GOAL WIDGET */}
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

      {/* FOOTER SA DIREKTNIM LINKOVIMA KA SVIH 5 STRANICA */}
      <footer className="border-t border-[#222222] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-xs sm:text-sm text-[#8D99AE]">
        <div className="flex flex-wrap justify-center gap-6 mb-6 font-mono">
          <Link href="/" className="hover:text-[#2FE93D] transition-colors">Home Core</Link>
          <Link href="/about" className="hover:text-[#2FE93D] transition-colors">About Us</Link>
          <Link href="/club" className="hover:text-[#2FE93D] transition-colors">Access Club</Link>
          <Link href="/neural-diagnostics" className="hover:text-[#2FE93D] transition-colors">Neural Diagnostics</Link>
          <Link href="/support" className="hover:text-[#2FE93D] transition-colors">Support Center</Link>
        </div>
        <p className="mb-2">MirbInvestments™. Simplified Crypto. Smarter Investing.</p>
        <p>© 2026 All Rights Reserved. Sovereign Elite Architecture.</p>
      </footer>

    </div>
  );
}
