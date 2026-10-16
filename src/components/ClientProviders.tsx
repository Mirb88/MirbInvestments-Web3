'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import dynamic from 'next/dynamic';

const Web3ProviderDynamic = dynamic(
  () => import('@/components/Web3Provider').then((mod) => mod.Web3Provider),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Web3ProviderDynamic>
          {children}
        </Web3ProviderDynamic>
      </PortfolioProvider>
    </AuthProvider>
  );
}
