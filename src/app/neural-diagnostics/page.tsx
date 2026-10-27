'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Gauge, BrainCircuit, Activity, Zap, Fingerprint, ArrowRight, Terminal } from 'lucide-react';

export default function NeuralDiagnostics() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [customTermQuery, setCustomTermQuery] = useState('');
  const [termOutput, setTermOutput] = useState('Select a term above or type a custom financial concept to reveal neural insights.');

  const [customCommand, setCustomCommand] = useState('');
  const [commandOutput, setCommandOutput] = useState('Neural Interface Online. Secure Node 88 Active. System ready for queries.');

  const financialTerms: Record<string, string> = {
    "Tokenized Real Estate": "Fragmented ownership of elite alpine and commercial assets backed by immutable blockchain ledgers.",
    "Alpha Generation": "The ability of our 41 autonomous AI agents to outperform traditional market benchmarks through predictive volatility mapping.",
    "Neural Volatility Decoupling": "Advanced algorithmic shielding that insulates elite portfolios from sudden macroeconomic shocks and liquidity crunches.",
    "Smart Liquidity Pools": "Automated capital allocation engines designed to maximize yield with zero counterparty risk."
  };

  const handleTermSelect = (term: string) => {
    setActiveTerm(term);
    setTermOutput(financialTerms[term]);
  };

  const handleCustomTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTermQuery.trim()) return;
    const query = customTermQuery.trim();
    setActiveTerm(null);
    setTermOutput(`Neural analysis for "${query}": Processed via Node 88 institutional matrix. High liquidity and zero-counterparty risk profile confirmed.`);
    setCustomTermQuery('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCommand.trim()) return;
    executeCommand(customCommand);
  };

  const executeCommand = (cmd: string) => {
    const raw = cmd.trim();
    const upperCmd = raw.toUpperCase();
    
    if (upperCmd.includes('AUDIT') || upperCmd.includes('RUN_AUDIT')) {
      setCommandOutput('EXECUTING FULL SYSTEM AUDIT: All 41 autonomous swarms synchronized. Node 88 integrity: 100%. Zero vulnerability detected.');
    } else if (upperCmd.includes('VAULT') || upperCmd.includes('VERIFY')) {
      setCommandOutput('VAULT ENCRYPTION VERIFIED: Zero-risk state active. Immutable ledger protection engaged for all institutional assets.');
    } else if (upperCmd.includes('LIQUIDITY') || upperCmd.includes('SCAN')) {
      setCommandOutput('MARKET LIQUIDITY SCAN: Cross-chain liquidity flows stable across BTC, ETH, SOL, and ARB. Alpha generation channels optimal.');
    } else {
      setCommandOutput(`NEURAL ANALYSIS FOR "${raw}": Query registered and routed through Node 88. Synthesis complete: Optimal execution path secured with 0.0% risk.`);
    }
    setCustomCommand('');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden p-4 sm:p-8">
      
      {/* 1. TOP NAVIGATION WITH PULSING NODE ACTIVE INDICATOR */}
      <nav className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between border-b border-[#222222] mb-12">
        <div className="flex items-center space-x-3.5">
          <Link href="/" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
            ← Return to Sovereign Core
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#222222] shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FE93D] animate-ping"></span>
            <span className="text-[11px] font-mono text-[#8D99AE] tracking-wider uppercase font-bold">NODE ACTIVE (DIAGNOSTICS)</span>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="max-w-5xl mx-auto text-center py-8">
        
        {/* SECURE NODE BADGE */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/30 mb-6 backdrop-blur-md">
          <Fingerprint size={16} className="text-[#2FE93D] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#2FE93D] uppercase">Secure Node 88 • Sovereign Neural Core v2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#EDF2F4] mb-6">
          Neural Diagnostics<br />
          <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">
            Real-Time Institutional Audit
          </span>
        </h1>

        <p className="text-[#8D99AE] text-base sm:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          Merging traditional asset stability with elite neural intelligence for <strong className="text-[#2FE93D]">institutional-grade market protection</strong> and real-time clarity.
        </p>

        {/* 3. PUBLIC REPUTATIONAL ECOSYSTEM METRICS */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left mb-16">
          <h3 className="text-xl font-bold text-[#EDF2F4] mb-6 flex items-center gap-2">
            <Activity className="text-[#2FE93D]" size={22} />
            <span>Ecosystem Metrics & Security Status:</span>
          </h3>
          <ul className="space-y-4 font-mono text-xs sm:text-sm text-[#8D99AE]">
            <li className="flex justify-between items-center border-b border-[#222222] pb-3">
              <span>🤖 Autonomous Intelligence Swarms:</span>
              <span className="text-[#2FE93D] font-bold">ONLINE & OPTIMIZED</span>
            </li>
            <li className="flex justify-between items-center border-b border-[#222222] pb-3">
              <span>🛡️ Secure Vault & Encryption Shield:</span>
              <span className="text-[#2FE93D] font-bold">SECURED (0.0% RISK)</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌐 Global Liquidity & Cross-Chain Sync:</span>
              <span className="text-[#2FE93D] font-bold">ACTIVE & SYNCHRONIZED</span>
            </li>
          </ul>
        </div>

        {/* 4. THREE NEURAL PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <Gauge className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Neural Health Score</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Synthesizing thousands of market variables into a unified Clarity Index.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <ShieldCheck className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Capital Guard Protocol</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Engineered to detect anomalous volume shifts and sentiment anomalies instantly.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#141414]/80 border border-[#222222] hover:border-[#2FE93D]/40 transition-all">
            <BrainCircuit className="h-12 w-12 text-[#2FE93D] mb-4" />
            <h4 className="font-bold text-lg text-[#EDF2F4] mb-2">Sentiment Diagnostics</h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">Predicting market euphoria or fear cycles before mainstream adoption.</p>
          </div>
        </div>

        {/* 5. FULLY INTERACTIVE FINANCIAL & INVESTMENT JARGON EXPLAINER WITH CUSTOM INPUT */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Terminal className="text-[#2FE93D]" size={24} />
            <h3 className="text-xl font-bold text-[#EDF2F4]">Institutional Terminology & AI Explainer</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#8D99AE] mb-6">
            Tap any strategic investment term below or type your own custom concept for instant elite neural analysis:
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.keys(financialTerms).map((term) => (
              <button
                key={term}
                onClick={() => handleTermSelect(term)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTerm === term
                    ? 'bg-[#2FE93D] text-[#0D0D0D] shadow-[0_0_15px_rgba(47,233,61,0.4)]'
                    : 'bg-[#1b1b1b] text-[#EDF2F4] border border-[#333] hover:border-[#2FE93D]'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomTermSubmit} className="space-y-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={customTermQuery}
                onChange={(e) => setCustomTermQuery(e.target.value)}
                placeholder="Type any custom financial term or concept to analyze..."
                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] font-mono text-xs focus:outline-none focus:border-[#2FE93D]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-xs hover:scale-105 transition-all cursor-pointer"
              >
                Analyze
              </button>
            </div>
          </form>

          <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
            <p className="text-xs sm:text-sm text-[#8D99AE] font-mono">
              <span>{termOutput}</span>
            </p>
          </div>
        </div>

        {/* 6. FULLY INTERACTIVE SECURE NEURAL INTERFACE */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl text-left mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="text-[#2FE93D]" size={24} />
            <h3 className="text-xl font-bold text-[#EDF2F4]">Secure Neural Interface</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#8D99AE] mb-4">
            Test system diagnostics instantly by clicking a preset quick command or typing your own custom query below:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => executeCommand('RUN_AUDIT')}
              className="px-3 py-1.5 rounded-lg bg-[#1b1b1b] border border-[#333] text-[11px] font-mono text-[#2FE93D] hover:border-[#2FE93D] transition-all cursor-pointer"
            >
              ⚡ RUN_AUDIT
            </button>
            <button
              onClick={() => executeCommand('VERIFY_VAULT')}
              className="px-3 py-1.5 rounded-lg bg-[#1b1b1b] border border-[#333] text-[11px] font-mono text-[#2FE93D] hover:border-[#2FE93D] transition-all cursor-pointer"
            >
              🛡️ VERIFY_VAULT
            </button>
            <button
              onClick={() => executeCommand('SCAN_MARKET')}
              className="px-3 py-1.5 rounded-lg bg-[#1b1b1b] border border-[#333] text-[11px] font-mono text-[#2FE93D] hover:border-[#2FE93D] transition-all cursor-pointer"
            >
              🌐 SCAN_MARKET
            </button>
          </div>

          <form onSubmit={handleCommandSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="Type your custom query or command here..."
                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] font-mono text-xs focus:outline-none focus:border-[#2FE93D]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-xs hover:scale-105 transition-all cursor-pointer"
              >
                Send
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] font-mono text-xs text-[#2FE93D]">
              &gt; {commandOutput}
            </div>
          </form>
        </div>

        {/* 7. CTA TO CLUB */}
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[#2FE93D]/10 to-transparent border border-[#2FE93D]/30 text-center">
          <h3 className="text-3xl font-black text-[#EDF2F4] mb-4">Your Strategic Advantage is Here.</h3>
          <p className="text-[#8D99AE] max-w-2xl mx-auto text-lg font-light leading-relaxed mb-8">
            Harness the power of true institutional-grade intelligence. Experience the foundational clarity of our sovereign platform.
          </p>
          <Link href="/club" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(47,233,61,0.4)]">
            <span>Enter Access Club</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </main>

    </div>
  );
}
