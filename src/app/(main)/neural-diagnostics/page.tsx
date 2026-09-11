import { Metadata } from 'next';
import { ROUTES } from '@/lib/routes';
import NeuralDiagnosticsContent from '@/components/content/neural-diagnostics-content';

const pageTitle = 'Neural Diagnostics for Wealth Management | MirbInvestments';
const pageDescription = "Experience institutional-grade clarity with Neural Diagnostics. Our proprietary engine provides the Architecture of Truth for elite portfolios.";
const canonicalUrl = `https://www.mirb.investments${ROUTES?.NEURAL_DIAGNOSTICS || '/neural-diagnostics'}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'Neural Diagnostics for Wealth Management',
    'Architecture of Truth',
    'Predictive Analytics for Elite Portfolios',
    'AI Investment Synergy',
    'Secure Node 88',
    'MirbInvestments AI',
    'Family Office Tech'
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'MirbInvestments | Neural Intelligence Interface',
    description: pageDescription,
    url: canonicalUrl,
    images: [{ url: '/images/brand/mirb-investments-og-image.webp', alt: 'MirbInvestments - Neural Authority' }],
  },
};

export default function NeuralDiagnosticsPage() {
  return <NeuralDiagnosticsContent />;
}
