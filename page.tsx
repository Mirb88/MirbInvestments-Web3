

import type { Metadata } from 'next';
import { ExchangePageContent } from '@/components/content/exchange-page-content';

const pageTitle = 'Reserved Crypto Exchange | MirbInvestments';
const pageDescription = 'Your private, over-the-counter (OTC) desk for exchanging larger amounts of crypto and fiat with guaranteed rates and minimal slippage.';
const canonicalUrl = '/exchange';

export const metadata: Metadata = {
      title: pageTitle,
      description: pageDescription,
      keywords: ['otc crypto', 'fiat exchange', 'crypto exchange', 'guaranteed rate crypto', 'low slippage'],
      alternates: { canonical: canonicalUrl },
      openGraph: { title: pageTitle, description: pageDescription, url: canonicalUrl },
      twitter: { title: pageTitle, description: pageDescription },
};

// Default export is the page, which now renders the client content
export default function ExchangePage() {
  return <ExchangePageContent />;
}
