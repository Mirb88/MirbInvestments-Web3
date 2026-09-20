'use client';

import { useEffect } from 'react';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('MirbInvestments Diagnostics Exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl p-8 text-center shadow-2xl shadow-black/50">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#2FE93D]/15 border border-[#2FE93D]/30 flex items-center justify-center text-[#2FE93D]">
            <ServerCrash className="h-8 w-8" />
          </div>
        </div>
        
        <div className="space-y-3 mb-8">
          <span className="text-[#2FE93D] font-mono text-xs tracking-widest uppercase">
            // System Exception Handled
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            Neural Protocol Interrupted
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            An unexpected boundary anomaly occurred within the application node. Re-synapse the node to restore institutional-grade connectivity.
          </p>
          {error?.digest && (
            <p className="text-xs font-mono text-gray-500 mt-2 bg-[#0D0D0D] py-1 px-2 rounded border border-white/5 inline-block">
              Digest ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-sm transition-all hover:bg-[#25b830] shadow-lg shadow-[#2FE93D]/20 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Re-sync Node
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm transition-all hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Return to Core
          </Link>
        </div>
      </div>
    </div>
  );
}
