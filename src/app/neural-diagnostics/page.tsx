'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Gauge, BrainCircuit, Activity, Zap, Fingerprint, ArrowRight } from 'lucide-react';

export default function NeuralDiagnostics() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden p-4 sm:p-8">
      
      {/* NAVIGACIJA SA PULSIRAJUĆIM NODE ACTIVE INDIKATOROM U GORNJEM DESNOM UGLU */}
      <nav className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between border-b border-[#222222] mb-12">
        <div className="flex items-center space-x-3.5">
          <Link href="/" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
            ← Nazad na Početnu
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#222222] shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FE93D] animate-ping"></span>
            <span className="text-[11px] font-mono text-[#8D99AE] tracking-wider uppercase font-bold">NODE ACTIVE (DIAGNOSTICS)</span>
          </div>
        </div>
      </nav>

      {/* GLAVNI SADRŽAJ DIJAGNOSTIKE */}
      <main className="max-w-5xl mx-auto text-center py-8">
        
        {/* SECURE NODE 88 BADGE */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-6 backdrop-blur-md">
          <Fingerprint size={16} className="text-[#2FE93D] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">Secure Node 88 • Sovereign Neural Core v2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#EDF2F4] mb-6">
          Neural Diagnostics<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            Real-Time System Audit
          </span>
        </h1>

        <p className="text-[#8D99AE] text-base sm:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          Svi autonomni agenti, sigurnosni štitovi i live cjenovni feedovi (BTC, ETH, SOL, TRX, ARB, Polygon) rade sa <strong className="text-[#2FE93D]">100% efikasnošću i nultim rizikom</strong>.
        </p>

        {/* STATUS EKOSISTEMA KARTICA */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left mb-16">
          <h3 className="text-xl font-bold text-[#EDF2F4] mb-6 flex items-center gap-2">
            <Activity className="text-[#2FE93D]" size={22} />
            <span>status ekosistema & neuralne metrike:</span>
          </h3>
          <ul className="space-y-4 font-mono text-xs sm:text-sm text-[#8D99AE]">
            <li className="flex justify-between items-center border-b border-[#222222] pb-3">
              <span>🤖 Autonomni Rojevi (41 Agent):</span>
              <span className="text-[#2FE93D] font-bold">ONLINE & OPTIMIZED</span>
            </li>
            <li className="flex justify-between items-center border-b border-[#222222] pb-3">
              <span>🛡️ Firebase Schema & Vault Encriptor:</span>
              <span className="text-[#2FE93D] font-bold">SECURED (0.0% RISK)</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌐 Web3 Domena (`mirbinvestments.crypto`):</span>
              <span className="text-[#2FE93D] font-bold">READY FOR DEPLOY</span>
            </li>
          </ul>
        </div>

        {/* 3 NEURALNA STUBA (IZ PROŠLOG REPA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <Gauge className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Neural Health Score</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Sintetizovanje hiljada tačaka podataka u jedinstven indeks tržišne jasnoće.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <ShieldCheck className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Capital Guard Protocol</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Arhitekturisano za identifikaciju neprirodnih volumena trgovanja i pomaka u sentimentu.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <BrainCircuit className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Sentiment Diagnostics</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Predviđanje talasa straha ili evforije prije nego što pogode mainstream tržište.</p>
          </div>
        </div>

        {/* CTA PREMA KLUBU */}
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[#2FE93D]/10 to-transparent border border-[#2FE93D]/30 text-center">
          <h3 className="text-2xl font-black text-[#EDF2F4] mb-4">Vaša strateška prednost je ovdje.</h3>
          <p className="text-[#8D99AE] max-w-xl mx-auto text-sm mb-8 leading-relaxed">
            Iskoristite moć istinske institucionalne inteligencije i pripremite se za potpuno Web3 povezivanje na domenu <strong className="text-[#EDF2F4]">mirbinvestments.crypto</strong>.
          </p>
          <Link href="/club" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(47,233,61,0.4)]">
            <span>Pristupite Klubu</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </main>

    </div>
  );
}
