'use client';

import React from 'react';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';
import { MainLayout } from '@/components/layout/main-layout';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AuthProvider>
        <PortfolioProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </PortfolioProvider>
      </AuthProvider>
    </Web3Provider>
  );
}
