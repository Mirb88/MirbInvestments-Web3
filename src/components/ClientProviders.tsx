'use client';

import React from 'react';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Web3Provider>
      <AuthProvider>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </AuthProvider>
    </Web3Provider>
  );
}
