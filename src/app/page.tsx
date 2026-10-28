"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D] bg-[#2FE93D]/10 px-4 py-1.5 rounded-full border border-[#2FE93D]/30">
          ✦ MirbInvestments Sovereign Web3 ✦
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          The Architecture of Truth
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Institutional Assets Through Neural Diagnostics and Sovereign Blockchain Innovation.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Link href="/club" className="bg-[#2FE93D] text-black font-bold py-3 px-8 rounded-xl hover:bg-[#25c432] transition-all shadow-[0_0_20px_rgba(47,233,61,0.4)]">
            Enter Access Club
          </Link>
          <Link href="/neural-diagnostics" className="bg-transparent border border-[#2FE93D]/50 text-[#2FE93D] font-bold py-3 px-8 rounded-xl hover:bg-[#2FE93D]/10 transition-all">
            Explore Diagnostics
          </Link>
        </div>
      </div>
    </main>
  );
}
