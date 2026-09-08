import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Neural Diagnostics | MirbInvestments',
  description: 'Real-time risk assessment, predictive market analytics, and Web3 asset sentiment tracking powered by neural intelligence.',
};

export default function NeuralDiagnosticsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] px-4 py-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Sekcija */}
        <header className="border-b border-[#2FE93D]/20 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FE93D]/10 border border-[#2FE93D]/30 text-[#2FE93D] text-xs font-medium mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
              Neural Matrix Active v2.4
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#EDF2F4]">
              Neural <span className="text-[#2FE93D]">Diagnostics</span>
            </h1>
            <p className="mt-2 text-base text-gray-400 max-w-2xl">
              Advanced AI-driven market intelligence, cross-asset sentiment tracking, and predictive portfolio health monitoring.
            </p>
          </div>
          
          <Link 
            href="/" 
            className="self-start md:self-auto px-5 py-2.5 rounded-lg border border-gray-700 bg-[#161616] text-[#EDF2F4] hover:border-[#2FE93D] hover:text-[#2FE93D] transition-all text-sm font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </header>

        {/* Glavne Metrike */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-[#F0B90B]/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0B90B]/5 rounded-full blur-2xl group-hover:bg-[#F0B90B]/10 transition-all"></div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#F0B90B] mb-2">Market Sentiment</h2>
            <p className="text-3xl font-bold tracking-tight text-[#EDF2F4]">Bullish / Stable</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#2FE93D]/20 text-[#2FE93D]">+4.2%</span>
              <span className="text-xs text-gray-400">in last 24h cycle</span>
            </div>
          </div>

          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-[#2FE93D]/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FE93D]/5 rounded-full blur-2xl group-hover:bg-[#2FE93D]/10 transition-all"></div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#F0B90B] mb-2">Risk Vector</h2>
            <p className="text-3xl font-bold tracking-tight text-[#EDF2F4]">Optimal</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#2FE93D]/20 text-[#2FE93D]">Secure</span>
              <span className="text-xs text-gray-400">Volatility index controlled</span>
            </div>
          </div>

          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-[#7B3FE4]/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B3FE4]/5 rounded-full blur-2xl group-hover:bg-[#7B3FE4]/10 transition-all"></div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#F0B90B] mb-2">AI Diagnostic Node</h2>
            <p className="text-3xl font-bold tracking-tight text-[#EDF2F4]">Operational</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#2FE93D]/20 text-[#2FE93D]">Synced</span>
              <span className="text-xs text-gray-400">Real-time telemetry</span>
            </div>
          </div>
        </section>

        {/* Dodatna Analitička Sekcija */}
        <section className="bg-[#121212] border border-gray-800/80 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-[#EDF2F4] mb-4">Ecosystem Intelligence Feed</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#F0B90B] font-mono">NODE_01 // REAL_ESTATE_SYNAPSE</span>
                <h4 className="font-semibold text-base mt-1">Tokenized Luxury Asset Liquidity Analysis</h4>
                <p className="text-sm text-gray-400 mt-1">Cross-referencing alpine tourism yields with decentralized liquidity pools.</p>
              </div>
              <span className="px-3 py-1 rounded bg-[#2FE93D]/10 text-[#2FE93D] text-xs font-semibold self-start md:self-auto">Verified</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#F0B90B] font-mono">NODE_02 // WEB3_PORTFOLIO_CORE</span>
                <h4 className="font-semibold text-base mt-1">Smart Contract Risk Assessment</h4>
                <p className="text-sm text-gray-400 mt-1">Automated diagnostic scanning across multi-chain asset allocations.</p>
              </div>
              <span className="px-3 py-1 rounded bg-[#2FE93D]/10 text-[#2FE93D] text-xs font-semibold self-start md:self-auto">Stable</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
