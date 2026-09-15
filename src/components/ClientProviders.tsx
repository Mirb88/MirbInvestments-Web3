'use client';

import React from 'react';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Web3Provider>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </Web3Provider>
    </AuthProvider>
  );
}
