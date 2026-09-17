export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { headers } from 'next/headers';

export default async function Page() {
  // Forsira dinamičko učitavanje sa servera bez statičkog keširanja
  await headers();

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Pozadinski svetlosni efekti */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2FE93D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center z-10 space-y-8 py-12">
        {/* Simbol platforme */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#141414] border border-[#2FE93D]/40 shadow-2xl shadow-[#2FE93D]/20 mb-2">
          <svg className="w-10 h-10 text-[#2FE93D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Glavni naslov i opis */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#2FE93D] font-semibold">
            // Architecture of Intelligent Capital
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#EDF2F4]">
            MirbInvestments <span className="text-[#2FE93D]">Platform</span>
          </h1>
          <p className="text-base md:text-lg text-[#EDF2F4]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Integracija naprednih Web3 finansijskih alata, neuralnih dijagnostika i tokenizovanih sredstava nove generacije.
          </p>
        </div>

        {/* Akcioni tasteri za pristup sistemu */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#25b830] hover:shadow-lg hover:shadow-[#2FE93D]/20 text-center"
          >
            Otvorite nalog (Register)
          </Link>
          
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141414] border border-[#EDF2F4]/20 text-[#EDF2F4] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#2FE93D] hover:text-[#2FE93D] text-center"
          >
            Prijava sistema (Login)
          </Link>
        </div>

        {/* Status u podnožju */}
        <div className="pt-16 border-t border-[#EDF2F4]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#EDF2F4]/50">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse" />
            Neural Infrastructure: Online
          </span>
          <span>•</span>
          <span>Security Protocol: Enforced</span>
          <span>•</span>
          <span>Mainnet Ready</span>
        </div>
      </div>
    </main>
  );
}
