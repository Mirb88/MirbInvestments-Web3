'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dinamički uvozimo kompletne provajdere (Auth, Web3, Portfolio) sa isključenim SSR-om
// kako bismo spriječili greške tokom prerendera i hidratacije na Vercelu.
const AppProviders = dynamic(
  () => import('@/components/layout/app-providers').then((mod) => mod.AppProviders),
  { 
    ssr: false,
    loading: () => (
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
    )
  }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
