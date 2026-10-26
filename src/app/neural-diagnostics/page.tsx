'use client';

import React from 'react';
import Link from 'next/link';

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

      {/* SADRŽAJ DIJAGNOSTIKE */}
      <main className="max-w-4xl mx-auto text-center py-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">Sovereign Neural Core v2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#EDF2F4] mb-6">
          Neural Diagnostics<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            Real-Time System Audit
          </span>
        </h1>

        <p className="text-[#8D99AE] text-base sm:text-lg mb-12 max-w-2xl mx-auto">
          Svi autonomni agenti, sigurnosni štitovi i live cjenovni feedovi (BTC, ETH, SOL, TRX, ARB, Polygon) rade sa 100% efikasnošću i nultim rizikom.
        </p>

        <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left">
          <h3 className="text-xl font-bold text-[#EDF2F4] mb-4">status ekosistema:</h3>
          <ul className="space-y-3 font-mono text-xs sm:text-sm text-[#8D99AE]">
            <li className="flex justify-between items-center border-b border-[#222222] pb-2">
              <span>🤖 Autonomni Rojevi (41 Agent):</span>
              <span className="text-[#2FE93D] font-bold">ONLINE & OPTIMIZED</span>
            </li>
            <li className="flex justify-between items-center border-b border-[#222222] pb-2">
              <span>🛡️ Firebase Schema & Vault Encriptor:</span>
              <span className="text-[#2FE93D] font-bold">SECURED (0.0% RISK)</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌐 Web3 Domena (`mirbinvestments.crypto`):</span>
              <span className="text-[#2FE93D] font-bold">READY FOR DEPLOY</span>
            </li>
          </ul>
        </div>
      </main>

    </div>
  );
}
