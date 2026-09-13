import React from 'react';
import ClientProviders from '@/components/ClientProviders';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] antialiased">
        <ClientProviders>
          <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
            <header className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-wider text-[#EDF2F4]">MirbInvestments Auth Portal</h1>
              <p className="mt-1 text-xs tracking-widest text-[#F0B90B] uppercase">Secure Web3 Access & Identity</p>
            </header>

            <main className="w-full max-w-md">
              {children}
            </main>

            <footer className="mt-12 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} MirbInvestments — Architecture of Intelligent Capital
            </footer>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
