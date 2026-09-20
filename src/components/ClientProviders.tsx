'use client';

import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dok se klijent ne montira u potpunosti, prikazujemo naš prepoznatljivi neuralni loader
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-[#2FE93D]/10 border border-[#2FE93D]/30 flex items-center justify-center animate-pulse mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-[#2FE93D] border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-mono tracking-widest text-[#2FE93D] uppercase">
          // Initializing Neural Core...
        </span>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-[#2FE93D]/20 border-t-[#2FE93D] animate-spin" />
        </div>
      }
    >
      <Web3Provider>
        <AuthProvider>
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </AuthProvider>
      </Web3Provider>
    </React.Suspense>
  );
}
