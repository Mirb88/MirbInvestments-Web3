import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neural Diagnostics | MirbInvestments',
  description: 'Real-time risk assessment, predictive market analytics, and Web3 asset sentiment tracking.',
};

export default function NeuralDiagnosticsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-[#2FE93D]/20 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2FE93D]">
            Neural Diagnostics
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Advanced AI-driven market intelligence and portfolio health monitoring.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-[#F0B90B] mb-2">Market Sentiment</h2>
            <p className="text-2xl font-bold">Bullish / Stable</p>
            <span className="text-xs text-[#2FE93D] mt-2 block">+4.2% in last 24h</span>
          </div>

          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-[#F0B90B] mb-2">Risk Vector</h2>
            <p className="text-2xl font-bold">Optimal</p>
            <span className="text-xs text-gray-400 mt-2 block">Volatility index controlled</span>
          </div>

          <div className="bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-[#F0B90B] mb-2">AI Diagnostic Node</h2>
            <p className="text-2xl font-bold">Active</p>
            <span className="text-xs text-[#2FE93D] mt-2 block">Sync v2.4 operational</span>
          </div>
        </section>
      </div>
    </main>
  );
}
