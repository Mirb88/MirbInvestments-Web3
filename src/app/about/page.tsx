'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BrainCircuit, Globe, ArrowRight, Fingerprint } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden p-4 sm:p-8">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between border-b border-[#222222] mb-12">
        <div className="flex items-center space-x-3.5">
          <Link href="/" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
            ← Return to Sovereign Core
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#222222] shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FE93D] animate-ping"></span>
            <span className="text-[11px] font-mono text-[#8D99AE] tracking-wider uppercase font-bold">SOVEREIGN HERITAGE</span>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto text-center py-8">
        
        {/* SECURE BADGE */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-6 backdrop-blur-md">
          <Fingerprint size={16} className="text-[#2FE93D] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">Established Heritage • Institutional Excellence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#EDF2F4] mb-6">
          About MirbInvestments<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            The Sovereign Evolution of Wealth
          </span>
        </h1>

        <p className="text-[#8D99AE] text-base sm:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          For years, <strong className="text-[#EDF2F4]">MirbInvestments</strong> on multiple operational fronts has stood at the intersection of traditional asset stability and pioneering Web3 innovation, guided by uncompromised security and advanced intelligence.
        </p>

        {/* CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222]">
            <ShieldCheck className="h-10 w-10 text-[#2FE93D] mb-4" />
            <h3 className="font-bold text-lg text-[#EDF2F4] mb-2">Sovereign Security</h3>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Multi-layer vault encryption and zero-trust architecture ensuring absolute capital protection.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222]">
            <BrainCircuit className="h-10 w-10 text-[#2FE93D] mb-4" />
            <h3 className="font-bold text-lg text-[#EDF2F4] mb-2">Human + AI Synergy</h3>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Combining elite human strategic leadership with a swarm of autonomous neural agents.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222]">
            <Globe className="h-10 w-10 text-[#2FE93D] mb-4" />
            <h3 className="font-bold text-lg text-[#EDF2F4] mb-2">Global Web3 Reach</h3>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Seamless cross-chain integration, tokenized real estate, and decentralized asset management.</p>
          </div>
        </div>

        {/* HISTORICAL CONTINUITY */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left mb-16">
          <h3 className="text-xl font-bold text-[#EDF2F4] mb-4">Our Legacy & Future Roadmap</h3>
          <p className="text-xs sm:text-sm text-[#8D99AE] leading-relaxed mb-6">
            MirbInvestments has continuously evolved across diverse milestones. Building upon years of strategic foundation and transparent growth, our deployment of state-of-the-art sovereign Web3 platforms in 2026 solidifies our mission: providing unmatched financial clarity, risk mitigation, and elite asset growth.
          </p>
          <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] font-mono text-xs text-[#2FE93D]">
            &gt; Status: Continuous evolution across multi-domain ecosystems (mirbinvestments.crypto & financeinvestment.nft).
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[#2FE93D]/10 to-transparent border border-[#2FE93D]/30 text-center">
          <h3 className="text-3xl font-black text-[#EDF2F4] mb-4">Ready to Experience Sovereign Wealth?</h3>
          <p className="text-[#8D99AE] max-w-xl mx-auto text-sm mb-8 leading-relaxed">
            Join our ecosystem and explore the pinnacle of human-AI synergy.
          </p>
          <Link href="/club" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(47,233,61,0.4)]">
            <span>Enter Access Club</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </main>

      {/* FOOTER WITH CLEAN 2026 TRANSPARENCY */}
      <footer className="border-t border-[#222222] py-8 text-center text-xs text-[#8D99AE] mt-12">
        <p>© 2026 MirbInvestments™. Sovereign Elite Architecture. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
