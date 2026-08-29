
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Fingerprint } from 'lucide-react';
import Image from 'next/image';

const ClubSectionBanner = dynamic(
  () => import('@/components/content/about/ClubSectionBanner').then((mod) => {
    if (!mod.default) throw new Error("MirbInvestments: ClubSectionBanner Module Missing!");
    return mod.default;
  }),
  {
    ssr: true,
    loading: () => <div className="h-32 animate-pulse bg-slate-900/50 rounded-2xl" />,
  }
);

const MissionSection = dynamic(
  () => import('@/components/content/about/MissionSection').then((mod) => {
    if (!mod.default) throw new Error("MirbInvestments: MissionSection Module Missing!");
    return mod.default;
  }),
  {
    ssr: true,
    loading: () => <div className="h-20 animate-pulse bg-slate-900/20 rounded-xl" />,
  }
);

const CoreFocusCards = dynamic(
  () => import('@/components/content/about/CoreFocusCards').then((mod) => {
    if (!mod.default) throw new Error("MirbInvestments: CoreFocusCards Module Missing!");
    return mod.default;
  }),
  {
    ssr: true,
    loading: () => <div className="h-40 animate-pulse bg-slate-900/20 rounded-xl" />,
  }
);

const ValidationSection = dynamic(
  () => import('@/components/content/about/ValidationSection').then((mod) => {
    if (!mod.default) throw new Error("MirbInvestments: ValidationSection Module Missing!");
    return mod.default;
  }),
  {
    ssr: true,
    loading: () => <div className="h-32 animate-pulse bg-slate-900/20 rounded-xl" />,
  }
);

export function AboutPageContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <main className="relative flex flex-col bg-slate-950 w-full">
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/brand/about-hero-bg.webp"
          alt="MirbInvestments Intelligence - The Architecture of Truth"
          fill
          className="object-cover opacity-60"
          priority={true}
          fetchPriority="high"
          loading="eager"
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 z-10" />
        <div className="container relative z-20 text-center px-4 max-w-4xl">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              <Fingerprint size={14} className="animate-pulse" />
              STRATEGIC INTELLIGENCE HUB
            </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mt-4"
          >
            The Architecture <br />
            <span className="text-primary">of Truth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl md:text-3xl text-slate-200 italic font-medium tracking-tight max-w-4xl mx-auto leading-relaxed"
          >
            &quot;Where Wisdom Meets Precision in the Age of Neural Intelligence.&quot;
          </motion.p>
        </div>
      </section>

      <div className="container relative z-30 mx-auto max-w-5xl px-4 -mt-16">
        <ClubSectionBanner />
      </div>

      <div className="container relative z-20 mx-auto max-w-4xl px-4 pt-12 pb-32">
        <Card className="bg-slate-900/90 border-primary/20 backdrop-blur-md">
            <CardContent className="p-8 md:p-12 space-y-20">
                <MissionSection />

                {/* ELITNA INJEKCIJA NEURAL ROI PROTOKOLA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="mt-6 text-xl text-gray-300 font-medium border-l-4 border-green-500 pl-4 bg-gray-800/50 p-4 rounded-r-lg leading-relaxed">
                    Starting from March 2026, MirbInvestments redefines transparency within the alternative assets market through the formal implementation of our proprietary <span className="text-white font-bold italic underline">Neural Diagnostics Protocol</span>. Our strategic hub now leverages a dedicated <span className="text-primary font-mono font-bold">Neural ROI API</span> (`/api/neural-roi`), which provides real-time, algorithmic risk and return calculations verified through Sovereign Bridge technology. This implementation ensures institutional-grade data accuracy and guarantees that all core investment vectors are verified, effectively eliminating the operational <span className="underline decoration-red-500 italic text-red-400">'pending'</span> risks inherent in outdated centralized platforms.
                  </p>
                </motion.div>

                <CoreFocusCards />
                <ValidationSection />
            {/* EVOLUTION AI PREDICTIVE MODULE - MOBILE FIX */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 md:mt-20 p-6 md:p-10 border-2 border-primary/40 bg-slate-950/80 rounded-[2rem] relative overflow-hidden group shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest mb-6 flex flex-wrap items-center gap-3">
                      <span className="w-2 h-10 bg-primary rounded-full animate-pulse hidden md:block" />
                      Phase Evolution: <span className="text-primary">Predictive AI</span>
                    </h3>
                    
                    <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-8 font-medium">
                      MirbInvestments is transitioning from diagnostic auditing to <span className="text-white italic font-bold text-shadow-sm">Predictive Wealth Architecture</span>. 
                      Integrating our proprietary Neural Node 88, we deploy an engine that filters volatility with <span className="text-primary">98.7% accuracy</span>.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 text-primary font-bold text-xs uppercase tracking-widest">
                      <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        System Launch: Q3 2026
                      </div>
                      <div className="flex items-center gap-2 opacity-80 pl-2">
                        <div className="w-1 h-1 bg-slate-500 rounded-full" />
                        Verified by Sovereign Bridge
                      </div>
                    </div>
                  </div>
                </motion.div> </CardContent>
        </Card>
      </div>
    </main>
  );
    }
