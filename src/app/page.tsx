import React from 'react';
import { HomePageContent } from '@/components/content/home-page-content';

export const metadata = {
  title: 'MirbInvestments | Sovereign Web3 & AI Infrastructure',
  description: 'Next-generation decentralized platform combining human expertise, AI neural analytics, and tokenized ecosystem solutions.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <HomePageContent />
    </main>
  );
}
