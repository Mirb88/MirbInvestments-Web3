'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for neural diagnostics / reporting
    console.error('MirbInvestments Diagnostics Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl p-8 text-center shadow-2xl shadow-black/50">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#2FE93D]/10 border border-[#2FE93D]/20 flex items-center justify-center text-[#2FE93D]">
                <ServerCrash className="h-8 w-8" />
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <span className="text-[#2FE93D] font-mono text-xs tracking-widest uppercase">
                // System Exception Detected
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
                Neural Protocol Interrupted
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                An unexpected anomaly occurred within the application node. This might be a temporary synchronisation or data fetch issue.
              </p>
              {error?.digest && (
                <p className="text-xs font-mono text-gray-600 mt-2">
                  Digest ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-sm transition-all hover:opacity-95 shadow-lg shadow-[#2FE93D]/20 cursor-pointer"
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
      </body>
    </html>
  );
}
