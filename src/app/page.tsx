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
      <div className="bg-[#141414] border-b border-[#222222] py-2 px-4 text-xs text-[#8D99AE]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
              <span className="text-[#2FE93D] font-bold uppercase tracking-wider">LIVE PULSE (COINGECKO)</span>
            </span>
            <span>BTC: <strong>${cryptoPrices.btc}</strong></span>
            <span>ETH: <strong>${cryptoPrices.eth}</strong></span>
            <span>SOL: <strong>${cryptoPrices.sol}</strong></span>
            <span>TRX: <strong>${cryptoPrices.trx}</strong></span>
          </div>
          <span className="hidden md:inline text-[#2FE93D] font-mono">Sovereign Core v2026</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <nav className="w-full px-4 h-20 flex items-center justify-between border-b border-[#222222]">
        <div className="flex flex-col">
          <span className="text-2xl font-black bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            MirbInvestments
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#2FE93D] uppercase">SOVEREIGN WEB3</span>
        </div>
        <Link href="/club" className="px-4 py-2 rounded-xl border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D]">
          Access Club →
        </Link>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="pt-20 pb-24 px-4 text-center">
        <h1 className="text-5xl font-black mb-6">
          The Apex of <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">Human–AI Synergy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-[#8D99AE] mb-12">
          Elevating Luxury Assets through <strong>Neural Diagnostics</strong> and Purposeful Blockchain Innovation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/club" className="px-8 py-4 bg-[#2FE93D] text-[#0D0D0D] font-extrabold rounded-2xl shadow-lg">
            ENTER ACCESS CLUB →
          </Link>
          <Link href="/neural-diagnostics" className="px-8 py-4 rounded-2xl border border-[#222222] hover:border-[#2FE93D] text-[#EDF2F4] font-bold">
            Explore Diagnostics
          </Link>
        </div>
      </section>

      {/* 4. AI INVESTMENT GOAL WIDGET */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="p-6 rounded-3xl bg-[#141414]/80 border border-[#222222]">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black mb-2">Not Sure Where to Start?</h3>
            <p className="text-[#8D99AE]">Let our AI find the perfect crypto bundle for your investment goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Long-term Growth', 'Fast Gains', 'Stability'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`p-5 rounded-2xl border transition-all ${
                  selectedGoal === goal
                    ? 'bg-[#2FE93D]/10 border-[#2FE93D] text-[#2FE93D]'
                    : 'bg-[#1b1b1b] border-[#2b2b2b] text-[#EDF2F4]'
                }`}
              >
                <span className="font-bold mb-2">{goal}</span>
                <span className="text-xs text-[#8D99AE]">Select to configure tailored AI portfolio bundle.</span>
              </button>
            ))}
          </div>
          <div className="text-center p-4 rounded-xl bg-[#0D0D0D] border border-[#222222]">
            <p className="text-xs text-[#8D99AE]">
              {selectedGoal ? (
                <span>Selected Strategy: <strong className="text-[#2FE93D]">{selectedGoal}</strong></span>
              ) : (
                <span>Select a goal to get your instant recommendation.</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-[#222222] py-12 px-4 text-center text-xs text-[#8D99AE]">
        <div className="flex flex-wrap justify-center gap-6 mb-6 font-mono">
          <Link href="/" className="hover:text-[#2FE93D]">Home Core</Link>
          <Link href="/about" className="hover:text-[#2FE93D]">About Us</Link>
          <Link href="/club" className="hover:text-[#2FE93D]">Access Club</Link>
          <Link href="/neural-diagnostics" className="hover:text-[#2FE93D]">Neural Diagnostics</Link>
          <Link href="/support" className="hover:text-[#2FE93D]">Support Center</Link>
        </div>
        <p className="mb-2">MirbInvestments™. Simplified Crypto.
