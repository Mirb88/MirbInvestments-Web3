'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import dynamic from 'next/dynamic';

const Web3ProviderDynamic = dynamic(
  () => import('@/components/Web3Provider').then((mod) => mod.Web3Provider),
  { 
    ssr: false,
    loading: () => null
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
        {mounted ? (
          <Web3ProviderDynamic>
            {children}
          </Web3ProviderDynamic>
        ) : (
          <div className="min-h-screen bg-[#0D0D0D]" />
        )}
      </PortfolioProvider>
    </AuthProvider>
  );
}
