"use client";

import React, { useEffect, useState } from "react";

export default function ClubPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2FE93D] mb-4"></div>
          <p className="text-gray-400 font-mono">Učitavam Web3 Sovereign Access Club...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-[#2FE93D]/20 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D]">
            ✦ Sovereign Elite Membership ✦
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mt-2 text-white">
            Access Club & Web3 Governance
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Ekskluzivni portal za članove ekosistema. Povežite Vaš novčanik ili profil za pristup analitici.
          </p>
        </header>

        <section className="bg-[#141414] border border-[#2FE93D]/30 rounded-xl p-8 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold text-[#2FE93D] mb-4">
            💎 Sovereign Status: Aktivno
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Dobrodošli u centralni Access Club. Svi podaci i verifikacije funkcionišu nativno u pretražniku uz 0% rizika.
          </p>
          <button 
            onClick={() => alert("Sovereign Web3 Vault Sinhronizovan!")}
            className="bg-[#2FE93D] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#25c432] transition-all shadow-[0_0_20px_rgba(47,233,61,0.4)]"
          >
            Verifikuj Web3 Sesiju
          </button>
        </section>
      </div>
    </main>
  );
}
