'use client';

export const dynamic = 'force-dynamic';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; stack?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white p-6 font-mono antialiased">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-red-500/30 pb-4">
            <span className="text-red-500 text-xs tracking-widest uppercase font-bold">
              // MirbInvestments Diagnostic Mode Active
            </span>
            <h1 className="text-3xl font-extrabold text-red-400 mt-1">
              Critical Runtime Exception Detected
            </h1>
          </div>
          
          <div className="bg-red-950/30 border border-red-500/50 p-5 rounded-2xl space-y-2 shadow-2xl">
            <p className="text-red-400 font-bold text-sm">Error Message:</p>
            <div className="bg-black/80 text-white p-4 rounded-xl text-sm border border-red-500/20 overflow-x-auto">
              {error?.message || 'Unknown runtime error message.'}
            </div>
          </div>

          {error?.digest && (
            <div className="bg-[#141414] border border-white/10 p-4 rounded-xl">
              <p className="text-gray-400 text-xs">Digest ID: <span className="text-[#F0B90B] font-bold">{error.digest}</span></p>
            </div>
          )}

          <div className="bg-[#141414] border border-white/10 p-5 rounded-2xl space-y-3 shadow-2xl">
            <p className="text-gray-300 font-bold text-sm">Exact Stack Trace (File / Line Source):</p>
            <pre className="text-xs text-red-300 bg-black/90 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-white/5">
              {error?.stack || 'No stack trace available for this exception.'}
            </pre>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-bold text-sm cursor-pointer hover:bg-[#25b830] transition-all shadow-lg shadow-[#2FE93D]/20"
            >
              Pokušaj ponovnog pokretanja (Reset)
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
