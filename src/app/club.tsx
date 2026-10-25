'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EliteClubPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#2FE93D] selection:text-black font-sans" suppressHydrationWarning={true}>
      
      {/* 1. ŽIVI TRŽIŠNI PULS / TICKER */}
      <div className="w-full bg-black/60 border-b border-white/10 py-2 overflow-hidden whitespace-nowrap text-xs text-zinc-400">
        <div className="inline-block animate-marquee px-4 space-x-8">
          <span>💎 MIRBINVESTMENTS SOVEREIGN CORE v2026</span>
          <span className="text-[#2FE93D]">ETH: $3,540 (+2.1%)</span>
          <span className="text-[#2FE93D]">SOL: $198.45 (+4.2%)</span>
          <span className="text-zinc-300">TRX: $0.142 (+1.8%)</span>
          <span>⚡ RISK LEVEL: 0.0% (SECURE)</span>
        </div>
      </div>

      {/* 2. HERO SEKCIJA */}
      <section className="relative py-20 sm:py-28 px-4 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2FE93D]/10 via-transparent to-transparent blur-3xl"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-[#2FE93D]/30 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D]">Powered by Neural Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          MirbInvestments <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#2FE93D]">
            The Apex of Human-AI Synergy
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Elevating Luxury Assets through <span className="text-white font-semibold">Neural Diagnostics</span> and Purposeful Blockchain Innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('membership-tiers')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2FE93D] text-black font-bold text-base hover:bg-[#25b830] transition-all shadow-[0_0_25px_rgba(47,233,61,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            ENTER ACCESS CLUB <span>→</span>
          </button>
          
          <Link 
            href="/neural-diagnostics"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 border border-white/10 text-white font-medium hover:bg-zinc-800 transition-all backdrop-blur-md flex items-center justify-center"
          >
            Explore Diagnostics
          </Link>
        </div>
      </section>

      {/* 3. ČLANSKI PAKETI (MEMBERSHIP TIERS) */}
      <section id="membership-tiers" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The MirbInvestments Club Tiers</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Your ticket to the world of Elite Financial Intelligence. Partnership in your success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SILVER MEMBERSHIP */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-[#2FE93D]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">Standard Access</div>
              <h3 className="text-2xl font-bold mb-2">Silver Membership</h3>
              <div className="text-4xl font-extrabold text-[#2FE93D] mb-6">€150 <span className="text-sm font-normal text-zinc-400">/ quarterly</span></div>
              <p className="text-zinc-400 text-sm mb-6">The perfect entry into the world of elite financial benefits.</p>
              
              <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                <li className="flex items-center gap-3">✅ Access to AI-driven market analysis</li>
                <li className="flex items-center gap-3">✅ Priority message support</li>
                <li className="flex items-center gap-3">✅ Opportunity to participate in prize-game rewards</li>
                <li className="flex items-center gap-3">✅ Exclusive quarterly investment report</li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-[#2FE93D] hover:text-black font-bold transition-all border border-white/10 cursor-pointer">
              Become a Silver Member
            </button>
          </div>

          {/* GOLD MEMBERSHIP (BEST VALUE) */}
          <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 border-2 border-[#2FE93D]/40 rounded-2xl p-8 backdrop-blur-xl relative shadow-[0_0_30px_rgba(47,233,61,0.15)] flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2FE93D] text-black text-xs font-bold uppercase tracking-wider">
              Best Value
            </div>

            <div>
              <div className="text-[#2FE93D] font-mono text-sm uppercase tracking-wider mb-2">Elite Sovereign Tier</div>
              <h3 className="text-2xl font-bold mb-2">Gold Membership</h3>
              <div className="text-4xl font-extrabold text-white mb-6">€399 <span className="text-sm font-normal text-zinc-400">/ annually</span></div>
              <p className="text-zinc-400 text-sm mb-6">Unlock the full potential with our most popular package.</p>
              
              <ul className="space-y-4 mb-8 text-sm text-zinc-200">
                <li className="flex items-center gap-3 text-[#2FE93D]">✓ All benefits of Silver membership</li>
                <li className="flex items-center gap-3">✅ No-Fee Cross-Chain Exchange</li>
                <li className="flex items-center gap-3">✅ Direct 24/7 support via WhatsApp</li>
                <li className="flex items-center gap-3">✅ Priority invitations to exclusive online & live events</li>
                <li className="flex items-center gap-3">✅ Personalized monthly investment proposals</li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-[#2FE93D] text-black hover:bg-[#25b830] font-bold transition-all shadow-[0_0_20px_rgba(47,233,61,0.3)] cursor-pointer">
              Become a Gold Member
            </button>
          </div>

        </div>
      </section>

      {/* 4. STRATEGIC CONVERGENCE & PLATINUM */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-8">
        
        {/* JAHORINA 2026 */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-1">Exclusive Summit</div>
            <h3 className="text-2xl font-bold mb-2">Jahorina 2026: The Strategic Convergence</h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              Club members get priority access to our exclusive, invitation-only event for visionaries in AI, real estate, tourism, and digital systems.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-white/10 whitespace-nowrap cursor-pointer">
            Learn About Event →
          </button>
        </div>

        {/* PLATINUM CARD */}
        <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900/60 to-zinc-950 border border-amber-500/30 rounded-2xl p-8 backdrop-blur-xl text-center">
          <div className="text-3xl mb-3">💎</div>
          <h3 className="text-2xl font-bold text-amber-300 mb-2">The Platinum Lifetime Card</h3>
          <p className="text-zinc-300 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            A status that cannot be bought. The most valuable MirbInvestments Platinum card transcends money — it is a symbol of trust, vision, and extraordinary dedication to our decentralized future.
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            Price: Priceless | Access: Invitation Only
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs text-zinc-500">
        <p className="mb-4">MirbInvestments™ · Simplified Crypto, Smarter Investing.</p>
        <p>© 2026 All Rights Reserved.</p>
      </footer>

    </div>
  );
}
