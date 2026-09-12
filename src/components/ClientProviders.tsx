'use client';

import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@/components/Web3Provider';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: '#0D0D0D', 
        color: '#2FE93D',
        fontFamily: 'monospace',
        fontSize: '13px',
        letterSpacing: '1px'
      }}>
        <div style={{ marginBottom: '8px' }}>// MIRBINVESTMENTS SYSTEM CORE</div>
        <div>Inicijalizacija Neuralnih Protokola...</div>
      </div>
    );
  }

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
