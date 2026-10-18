export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import { Suspense } from 'react';

function HomeContent() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] flex flex-col justify-between selection:bg-[#2FE93D] selection:text-[#0D0D0D]">
      {/* Gornja navigacija / Zaglavlje */}
      <header className="w-full border-b border-[#EDF2F4]/10 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#0D0D0D]/80 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#2FE93D]/40 flex items-center justify-center shadow-lg shadow-[#2FE93D]/10">
            <svg className="w-5 h-5 text-[#2FE93D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-wider text-[#EDF2F4]">
            MIRB<span className="text-[#2FE93D]">INVESTMENTS</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg text-[#EDF2F4]/80 hover:text-[#2FE93D] transition-colors"
          >
            Prijava
          </Link>
          <Link 
            href="/register" 
            className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg bg-[#2FE93D] text-[#0D0D0D] hover:bg-[#25b830] transition-all shadow-md shadow-[#2FE93D]/20"
          >
            Registracija
          </Link>
        </div>
      </header>

      {/* Glavni sadržaj */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden py-16">
        {/* Pozadinski svetlosni efekti */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[#2FE93D]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl w-full text-center z-10 space-y-8">
          <div className="inline-block">
            <span className="text-xs uppercase tracking-[0.4em] text-[#2FE93D] font-bold px-4 py-1.5 rounded-full bg-[#141414] border border-[#2FE93D]/30 shadow-inner">
              // Architecture of Intelligent Capital
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-[#EDF2F4] leading-tight">
            Budućnost Web3 <br />
            <span className="text-[#2FE93D] drop-shadow-[0_0_25px_rgba(47,233,61,0.3)]">Investicija i AI Alata</span>
          </h1>

          <p className="text-base md:text-xl text-[#EDF2F4]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Napredna platforma za upravljanje digitalnom imovinom, neuralne dijagnostike i tokenizovane nekretnine visoke klase.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#25b830] hover:scale-105 shadow-xl shadow-[#2FE93D]/25 text-center"
            >
              Pokrenite Platformu
            </Link>
            
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141414] border border-[#EDF2F4]/20 text-[#EDF2F4] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#2FE93D] hover:text-[#2FE93D] text-center"
            >
              Pristup Računu
            </Link>
          </div>

          {/* Statusni panel */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs text-[#EDF2F4]/60 border-t border-[#EDF2F4]/10 mt-12">
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-3 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse" />
              <span>Neural Engine: Aktivan</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-3 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#F0B90B]" />
              <span>Web3 Protokol: Osiguran</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-[#141414]/50 p-3 rounded-lg border border-[#EDF2F4]/5">
              <span className="w-2 h-2 rounded-full bg-[#7B3FE4]" />
              <span>Mainnet: Spreman</span>
            </div>
          </div>
        </div>
      </main>

      {/* Podnožje */}
      <footer className="w-full border-t border-[#EDF2F4]/10 py-6 px-6 text-center text-xs text-[#EDF2F4]/40 bg-[#0D0D0D]">
        <p>&copy; 2026 MirbInvestments. Sva prava zadržana. Dizajnirano za elitne investitore.</p>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] flex items-center justify-center font-mono">Učitavanje sistema...</div>}>
      <HomeContent />
    </Suspense>
  );
}
