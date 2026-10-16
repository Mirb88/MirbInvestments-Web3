'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import dynamic from 'next/dynamic';

const Web3ProviderDynamic = dynamic(
  () => import('@/components/Web3Provider').then((mod) => mod.Web3Provider),
  { 
    ssr: false,
    loading: () => <div className="p-4 text-xs font-mono text-[#2FE93D]">// Initializing Web3 Core...</div>
  }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthProvider>
      <PortfolioProvider>
        <Web3ProviderDynamic>
          {mounted ? children : (
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center font-mono text-xs text-[#2FE93D]">
              // Loading MirbInvestments Core...
            </div>
          )}
        </Web3ProviderDynamic>
      </PortfolioProvider>
    </AuthProvider>
  );
}
