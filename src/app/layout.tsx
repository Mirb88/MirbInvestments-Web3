import type { Metadata } from 'next';
import { Web3Provider } from '@/components/Web3Provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MirbInvestments Sovereign Dominion',
  description: 'Decentralized Asset Infrastructure & Neural Predictive Analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
