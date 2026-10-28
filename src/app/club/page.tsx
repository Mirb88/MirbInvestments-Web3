"use client";

import React, { useEffect, useState } from "react";

export default function ClubPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white p-6 md:p-12 font-sans selection:bg-[#2FE93D] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-[#2FE93D]/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D] bg-[#2FE93D]/10 px-3 py-1 rounded-full border border-[#2FE93D]/30">
              ✦ Sovereign Elite Membership ✦
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 text-white">
              Access Club & Web3 Governance
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-2xl">
              Ekskluzivni portal za članove ekosistema. Povežite Vaš Web3 novčanik ili verifikujte profil za pristup naprednoj analitiki i guvernerstvu.
            </p>
          </div>
          <div className="bg-[#141414] border border-[#2FE93D]/30 px-4 py-2 rounded-xl text-right">
            <span className="text-xs text-gray-400 block font-mono">Status Mreže</span>
            <span className="text-[#2FE93D] font-bold font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
              Sovereign Online
            </span>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141414] border border-[#2FE93D]/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FE93D]/5 rounded-full blur-2xl group-hover:bg-[#2FE93D]/10 transition-all"></div>
            <h2 className="text-xl font-bold text-[#2FE93D] mb-2 flex items-center gap-2">
              💎 Sovereign Status
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Vaš nalog je povezan sa decentralizovanim čvorom. Svi podaci i verifikacije funkcionišu nativno uz 0% rizika.
            </p>
            <div className="text-xs font-mono text-[#2FE93D] bg-black/40 px-3 py-2 rounded-lg border border-[#2FE93D]/20">
              Aktivna Sesija: Verifikovana
            </div>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md md:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Web3 Vault & Guvernerstvo</h3>
              <p className="text-gray-400 text-sm mb-4">
                Upravljajte svojim tokenizovanim paketima, glasajte o novim investicionim rundama i pratite real-time analitiku portofolija.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
              <button 
                onClick={() => alert("Sovereign Web3 Vault Uspješno Sinhronizovan!")}
                className="bg-[#2FE93D] text-black font-bold py-2.5 px-6 rounded-xl hover:bg-[#25c432] transition-all shadow-[0_0_20px_rgba(47,233,61,0.4)] text-sm"
              >
                Verifikuj Web3 Sesiju
              </button>
              <a 
                href="/"
                className="bg-transparent border border-gray-700 text-gray-300 font-medium py-2.5 px-6 rounded-xl hover:border-[#2FE93D] hover:text-[#2FE93D] transition-all text-sm flex items-center justify-center"
              >
                Nazad na Glavnu Centralu
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
