'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

const Web3ProviderDynamic = dynamic(
  () => import('@/components/Web3Provider').then((mod) => mod.Web3Provider),
  { ssr: false }
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("MirbInvestments Client Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] p-8 flex flex-col items-center justify-center font-mono">
          <div className="max-w-xl bg-[#141414] border border-[#2FE93D]/30 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider">// Neural Core Exception Handled</h2>
            <p className="text-xs text-gray-300 bg-black/50 p-4 rounded border border-white/10 overflow-auto leading-relaxed">
              {this.state.error?.toString()}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <ErrorBoundary>
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-[#2FE93D]/20 border-t-[#2FE93D] animate-spin" />
          </div>
        }
      >
        <Web3ProviderDynamic>
          <AuthProvider>
            <PortfolioProvider>
              {children}
            </PortfolioProvider>
          </AuthProvider>
        </Web3ProviderDynamic>
      </React.Suspense>
    </ErrorBoundary>
  );
}

interface ClientProvidersProps {
  children: React.ReactNode;
}
