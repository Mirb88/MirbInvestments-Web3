import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/Web3Provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#020817',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'MirbInvestments Sovereign Dominion',
  description: 'Decentralized Asset Infrastructure & Neural Predictive Analytics',
  keywords: ['Crypto', 'Web3', 'AI Analytics', 'MirbInvestments', 'DeFi', 'Jahorina 2026'],
  authors: [{ name: 'MirbInvestments Team' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
