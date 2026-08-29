'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Layers,
  Bot,
  Wand2,
  BrainCircuit,
  LoaderCircle,
  LucideIcon,
} from 'lucide-react';
import { HeroImage } from '@/components/layout/hero-image';
import { CryptoMarquee } from '@/components/layout/crypto-marquee';
import { Skeleton } from '@/components/ui/skeleton';
import { TimedPromo } from '@/components/content/timed-promo';
import ManifestHero from './home/manifest-hero';
import { ROUTES } from '@/lib/routes';

interface AiTeaserSkeletonProps {
  icon: LucideIcon;
  title: string;
}

const AiTeaserSkeleton: React.FC<AiTeaserSkeletonProps> = ({ icon: Icon, title }) => (
  <section className="w-full bg-card py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <Card className="bg-background max-w-4xl mx-auto shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-center">{title}</h2>
          </div>
          <div className="space-y-4 mt-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Card>
    </div>
  </section>
);

const AiExplainerTeaser = dynamic(
  () => import('@/components/content/home/ai-explainer-teaser').then((mod) => mod.AiExplainerTeaser),
  {
    loading: () => <AiTeaserSkeleton icon={Wand2} title="Understand Any Crypto Concept" />,
    ssr: false,
  }
);

const AiAdvisorTeaser = dynamic(
  () => import('@/components/content/home/ai-advisor-teaser').then((mod) => mod.AiAdvisorTeaser),
  {
    loading: () => <AiTeaserSkeleton icon={Bot} title="Not Sure Where to Start?" />,
    ssr: false,
  }
);

const valueProps = [
  {
    icon: Layers,
    title: 'Simplified Access.',
    body: 'Say goodbye to complex charts. Our Crypto Shop offers curated bundles, making your first crypto purchase effortless and stress-free.',
  },
  {
    icon: Zap,
    title: 'Intelligent Insights.',
    body: 'Gain clarity, not confusion. Our AI transforms complex market data into simple, actionable insights, helping you understand crypto on your terms.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Security, Our Priority.',
    body: 'Fortify Your Financial Future. Invest with confidence on a platform built with robust security measures, protecting your digital future.',
  },
];

function WelcomeGate() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="group relative overflow-hidden border-primary/30 transition-all hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.2)] flex flex-col min-h-[20rem]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">The MirbInvestments Club</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              Your ticket to the world of Elite Financial Intelligence. Access exclusive analysis, priority support, and invitations to private events.
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                <Link href={ROUTES.CLUB}>
                  Explore Club Benefits <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="group relative overflow-hidden border-blue-400/30 transition-all hover:border-blue-400 hover:shadow-[0_0_30px_hsl(214_96%_66%_/_0.2)] flex flex-col min-h-[20rem]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-8 w-8 text-blue-400" />
                <CardTitle className="text-2xl">Capital Protection 2026</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              Discover how elite investors use AI diagnostics and reputational clarity to protect and grow capital in the 2026 cycle.
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full group-hover:bg-blue-400 group-hover:text-white">
                <Link href={`${ROUTES.AI_INSIGHTS}/analysis-capital-protection-2026`}>
                  Read the Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="group relative overflow-hidden border-accent/50 transition-all hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent)_/_0.2)] flex flex-col min-h-[20rem]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl">Jahorina 2026</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              Phase I of the Strategic Convergence has concluded. Get the confidential realization plan for the remaining 2026 cycles.
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground">
                <Link href={ROUTES.SUPPORT}>
                  Get the 2026 Realization Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

export function HomePageContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <motion.section
        className="relative w-full overflow-hidden pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-24 lg:pb-32 bg-slate-950"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <HeroImage priority={true} fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-background"></div>
        </div>

        <div className="container relative mx-auto px-4 text-center md:px-6 z-10 max-w-4xl">
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            <motion.div
              variants={heroVariants}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase"
            >
              <Zap className="h-4 w-4 animate-pulse" /> Powered by Neural Intelligence
            </motion.div>

            <motion.h1
              variants={heroVariants}
              custom={1}
              className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[1.05]"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}
            >
              <span className="block text-primary drop-shadow-lg mb-2">MirbInvestments™</span>
              The Apex of Human-AI Synergy
            </motion.h1>

            <motion.p
              variants={heroVariants}
              custom={2}
              className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-300 font-light leading-relaxed"
            >
              Elevating Luxury Assets through{' '}
              <span className="text-white font-semibold italic">Neural Diagnostics</span> and
              Purposeful Blockchain Innovation.
            </motion.p>

            <motion.div variants={heroVariants} custom={3}>
              <div className="w-full flex flex-col items-center mt-14 mb-20 px-4">
                <Button
                  asChild
                  className="
                    relative group h-20 md:h-24 w-full max-w-xl 
                    bg-black border-2 border-primary 
                    text-white hover:text-primary
                    transition-all duration-500 
                    hover:scale-[1.02] 
                    hover:shadow-[0_0_60px_hsl(var(--primary)/0.35)] 
                    overflow-hidden rounded-none shadow-2xl
                  "
                >
                  <Link
                    href={ROUTES.CLUB}
                    aria-label="Access MirbInvestments Club"
                    className="flex items-center justify-center w-full h-full gap-4"
                  >
                    <span className="relative z-10 text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-center">
                      ACCESS CLUB
                    </span>
                    <ArrowRight className="relative z-10 h-6 w-6 md:h-8 md:w-8 text-primary transition-transform duration-500 group-hover:translate-x-3" />
                    <div className="absolute inset-0 bg-black z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <CryptoMarquee />
      <ManifestHero />
      <AiExplainerTeaser />
      <WelcomeGate />

      <section id="core-values" className="w-full bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex flex-col items-center group">
                <div className="mb-6 rounded-2xl bg-primary/10 p-5 text-primary shadow-inner transition-transform group-hover:scale-110">
                  <prop.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{prop.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prop.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AiAdvisorTeaser />

      <TimedPromo
        delaySeconds={15}
        promoKey="homePageClubPromo"
        title="Explore the Club"
        description="Gain access to exclusive insights, priority support, and invitations to elite events."
        ctaText="See Club Benefits"
        ctaLink="CLUB"
        iconName="zap"
      />
    </div>
  );
}
