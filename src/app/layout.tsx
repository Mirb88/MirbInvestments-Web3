import './globals.css';
import React from 'react';

export const metadata = {
  title: 'MirbInvestments — Architecture of Intelligent Capital',
  description: 'Napredna Web3 platforma za upravljanje digitalnom imovinom, neuralne dijagnostike i tokenizovane nekretnine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs" suppressHydrationWarning={true}>
      <body className="bg-[#0D0D0D] text-[#EDF2F4] min-h-screen antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
