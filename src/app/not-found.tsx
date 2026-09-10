'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-[#0D0D0D] text-white">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <span className="text-[#2FE93D] font-mono text-sm tracking-widest uppercase">
            // Neural Node 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            The requested coordinate within the MirbInvestments architecture does not exist or has been relocated.
          </p>
        </div>
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-sm transition-all hover:opacity-90 shadow-lg shadow-[#2FE93D]/20"
          >
            Return to Core Protocol
          </Link>
        </div>
      </div>
    </div>
  );
}
