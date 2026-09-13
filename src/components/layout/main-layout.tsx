import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D0D0D] text-[#EDF2F4] selection:env-gold selection:text-black">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
