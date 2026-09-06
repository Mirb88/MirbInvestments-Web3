import type { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Gauge, ShieldCheck, Fingerprint, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import TermExplainer from '@/components/ai/term-explainer';
import { ROUTES } from '@/lib/routes';
import { Skeleton } from '@/components/ui/skeleton';
import { neuralData } from '@/data/neuralData';

const pageTitle = 'Neural Diagnostics for Wealth Management | MirbInvestments';
const pageDescription = "Experience institutional-grade clarity with Neural Diagnostics. Our proprietary engine provides the Architecture of Truth for elite portfolios in 2026.";
const canonicalUrl = `https://www.mirb.investments${ROUTES.NEURAL_DIAGNOSTICS}`;

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

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start gap-4 p-6 rounded-[1.5rem] border border-[#2FE93D]/20 bg-[#0D0D0D]/80 hover:bg-[#2FE93D]/[0.02] hover:border-[#2FE93D]/40 transition-all duration-500 h-full group">
    <Icon className="h-8 w-8 text-[#2FE93D]/50 group-hover:text-[#2FE93D] transition-colors flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-bold text-[#EDF2F4] text-lg tracking-tight">{title}</h3>
      <p className="text-sm text-[#EDF2F4]/70 mt-2 leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

export default function NeuralDiagnosticsPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#EDF2F4]">
      {/* ELITE HERO SECTION */}
      <section className="relative w-full overflow-hidden py-24 md:py-40 min-h-[500px]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/brand/neural-mind.webp"
            alt="MirbInvestments Neural Node 88 - Strategic Core"
            fill
            priority={true}
            fetchPriority="high"
            loading="eager"
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover brightness-110 contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/60 to-[#0D0D0D]" />
        </div>
        
        <div className="container relative mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#2FE93D]/10 border border-[#2FE93D]/30 backdrop-blur-md">
            <Fingerprint size={14} className="text-[#2FE93D] animate-pulse" />
            <span className="text-[10px] font-black text-[#2FE93D] uppercase tracking-[0.4em]">Secure Node 88 Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#EDF2F4] tracking-tighter mb-6">
            DECODING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE93D] via-[#F0B90B] to-[#2FE93D]/60">VOLATILITY</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#EDF2F4]/70 font-light leading-relaxed">
            Merging traditional stability with elite neural AI for <span className="text-[#F0B90B] font-medium tracking-wide">institutional-grade market protection</span>.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 -mt-20 relative z-20 pb-20">
        
        {/* LIVE NEURAL METRICS HUD (INTEGRATED STATIC DATA) */}
        <div className="mb-12 p-6 md:p-8 bg-[#0D0D0D]/90 border border-[#2FE93D]/30 rounded-[2rem] backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6 border-b border-[#EDF2F4]/10 pb-4">
            <div className="flex items-center gap-3">
              <Activity className="text-[#2FE93D] animate-pulse" size={24} />
              <h3 className="text-xl font-bold text-[#F0B90B]">Neural Diagnostics Live Status</h3>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-[#2FE93D]/10 text-[#2FE93D] rounded-full border border-[#2FE93D]/30">
              {neuralData.diagnostics}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <span className="text-[#EDF2F4]/60">Projected ROI Tier:</span>
              <span className="font-bold text-[#2FE93D] text-base mt-1 uppercase tracking-wider">{neuralData.projected_roi}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <span className="text-[#EDF2F4]/60">Transparency Index:</span>
              <span className="font-bold text-[#2FE93D] text-base mt-1">{neuralData.transparency_score}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <span className="text-[#EDF2F4]/60">Security Core:</span>
              <span className="font-bold text-[#F0B90B] text-xs mt-1 truncate">{neuralData.security_layer}</span>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-[2.5rem]" />}>
            <TermExplainer />
          </Suspense>
        </div>

        <Card className="bg-[#0D0D0D]/90 border-[#2FE93D]/20 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-[#EDF2F4]/10 bg-white/[0.01]">
            <div className="text-xl text-[#EDF2F4]/80 font-light leading-relaxed italic">
              "At MirbInvestments, we believe the future of investment is not just about participation, but about <span className="text-[#F0B90B] font-bold not-italic">precision</span>. Our proprietary Neural Diagnostics engine transforms raw, chaotic market data into actionable clarity."
            </div>
          </CardHeader>
          
          <CardContent className="p-10 space-y-20">
            <section>
              <div className="flex flex-col items-center mb-12">
                <BrainCircuit className="text-[#2FE93D] mb-4" size={32} />
                <h2 className="text-3xl font-black text-[#EDF2F4] tracking-tight uppercase">Inside the Neural Mind</h2>
                <div className="h-1 w-20 bg-[#2FE93D]/40 mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <Gauge className="h-12 w-12 text-[#2FE93D]" />
                  <h4 className="font-bold text-xl text-[#EDF2F4]">Neural Health Score</h4>
                  <p className="text-sm text-[#EDF2F4]/70 font-light leading-relaxed">Synthesizing thousands of data points into a single Market Clarity score.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <ShieldCheck className="h-12 w-12 text-[#F0B90B]" />
                  <h4 className="font-bold text-xl text-[#EDF2F4]">Capital Guard Protocol</h4>
                  <p className="text-sm text-[#EDF2F4]/70 font-light leading-relaxed">Architected to identify unnatural trading volumes and sentiment shifts.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <Activity className="h-12 w-12 text-[#2FE93D]" />
                  <h4 className="font-bold text-xl text-[#EDF2F4]">Sentiment Diagnostics</h4>
                  <p className="text-sm text-[#EDF2F4]/70 font-light leading-relaxed">Predicting waves of investor fear or euphoria before they hit mainstream.</p>
                </div>
              </div>
            </section>

            <section className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-black text-[#EDF2F4] tracking-tight uppercase">The Architecture of Clarity</h2>
                <p className="text-[#EDF2F4]/60 mt-4 font-light italic">"You don't need to be an AI expert to benefit from one."</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard
                  icon={Zap}
                  title="Architecture of Free Prediction"
                  description="Multi-layered neural networks tracking velocity and flow of capital between asset classes for deep market maps."
                />
                <FeatureCard
                  icon={ShieldCheck}
                  title="Hybrid Stability"
                  description="Applying time-tested traditional risk management to the high-velocity world of Web3 speed."
                />
              </div>
            </section>

            <div className="bg-gradient-to-b from-[#2FE93D]/10 to-transparent p-12 rounded-[2rem] border border-[#2FE93D]/30 text-center">
              <h3 className="text-3xl font-black text-[#EDF2F4] mb-4">Your Strategic Advantage is Here.</h3>
              <p className="text-[#EDF2F4]/70 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-8">
                Harness the power of true institutional-grade intelligence. Even on the free plan, you experience the foundational clarity of our system.
              </p>
              <Button asChild size="lg" className="w-full max-w-sm mx-auto rounded-2xl text-lg font-bold transition-all shadow-xl py-4 bg-[#2FE93D] text-[#0D0D0D] hover:bg-[#2FE93D]/90">
                <Link href={ROUTES.CLUB} className="flex items-center justify-center gap-3">
                  Join Club <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

