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

  // Sprečava SSR konflikte i greške sa Web3/Auth provajderima tokom inicijalnog renderovanja
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2FE93D]/20 border-t-[#2FE93D] animate-spin" />
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#2FE93D]/20 border-t-[#2FE93D] animate-spin" />
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
