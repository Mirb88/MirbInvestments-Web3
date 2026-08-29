'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Gem,
  LoaderCircle,
  ArrowRight,
  Layers,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createSupportRequest } from '@/services/support';
import { tiers, bronzeBenefits } from '@/lib/data';
import { ROUTES } from '@/lib/routes';
import { NeuralLoader } from '@/components/ui/neural-loader';

function ClubHeroImage() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <Image
        src="/images/brand/invest-hero-bg.webp"
        alt="The structured knowledge and elite access of the MirbInvestments Club"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center brightness-110 contrast-125"
        priority
        quality={90}
        data-ai-hint="knowledge cube"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
    </div>
  );
}

export function ClubPageContent() {
  const { user, db } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isPageLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleMembershipRequest = async (tierId: string, tierName: string) => {
    if (!user || !db) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to request a membership.',
      });
      router.push(ROUTES.LOGIN);
      return;
    }

    setIsLoading(tierId);
    try {
      const result = await createSupportRequest(db, {
        name: user.displayName || 'N/A',
        email: user.email || 'N/A',
        subject: `Membership Request: ${tierName}`,
        message: `User ${user.email} (ID: ${user.uid}) has requested to purchase the ${tierName}. Please contact them to arrange payment.`,
        userId: user.uid,
      });

      if (result.success) {
        toast({
          title: 'Request Received!',
          description: `The MirbInvestments team will contact you shortly to finalize your ${tierName}.`,
        });
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Could not submit your request. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(null);
    }
  };

  if (isPageLoading) {
    return <NeuralLoader />;
  }

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative flex items-center justify-center py-20 text-center overflow-hidden md:py-32 lg:py-40">
        <ClubHeroImage />
        <div className="relative z-10 px-4">
          <h1
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
          >
            The MirbInvestments Club
          </h1>
          <p
            className="mx-auto mt-6 max-w-3xl text-lg text-gray-200"
            style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}
          >
            Your ticket to the world of Elite Financial Intelligence. This isn&apos;t
            just a membership; it&apos;s a partnership in your success.
          </p>
        </div>
      </section>

      <div className="w-full bg-card py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:items-stretch">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  'flex flex-col transition-all duration-300 hover:shadow-2xl',
                  tier.className
                )}
              >
                <CardHeader className="text-center">
                  {tier.bestValue && (
                    <Badge
                      variant="default"
                      className="mx-auto mb-4 w-fit bg-bnb-gold text-background"
                    >
                      Best Value
                    </Badge>
                  )}
                  <CardTitle className="text-3xl">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    aria-label={`Request ${tier.name} membership`}
                    onClick={() => handleMembershipRequest(tier.id, tier.name)}
                    disabled={isLoading === tier.id}
                  >
                    {isLoading === tier.id ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      tier.cta
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="my-16 h-px w-full bg-border" />

          <Card className="group relative overflow-hidden border-accent/50 transition-all hover:border-accent hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl">
                  Jahorina 2026: The Strategic Convergence
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-muted-foreground"
                data-ai-hint="strategic convergence event"
              >
                Club members get priority access to our exclusive,
                invitation-only event for visionaries in AI, real estate,
                tourism, and digital systems. This is where the future is
                forged.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link
                  href={`${ROUTES.AI_INSIGHTS}/strategic-convergence-jahorina-2026-ai-real-estate-tourism`}
                >
                  Learn About the Elite Event <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="my-16 h-px w-full bg-border" />

          {/* Platinum Card Section */}
          <Card
            id="platinum-membership"
            className="relative overflow-hidden border-2 border-transparent bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-white shadow-2xl scroll-mt-20"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-50"></div>
            <CardHeader className="text-center">
              <Gem className="mx-auto h-12 w-12 text-bnb-gold" />
              <CardTitle className="mt-4 text-3xl text-bnb-gold">
                The Platinum Lifetime Card
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                A status that cannot be bought.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mx-auto max-w-2xl text-base text-slate-300">
                The most valuable MirbInvestments Platinum card has no price. It
                cannot be purchased, because its value transcends money. It is a
                symbol of trust, vision, and a contribution to our ecosystem. The
                MirbInvestments team reserves the exclusive right to offer
                lifetime membership to selected individuals who demonstrate
                exceptional dedication, ethics, and a strategic understanding of
                the decentralized future.
              </p>
              <div className="mt-6">
                <Badge
                  variant="outline"
                  className="border-bnb-gold text-bnb-gold"
                >
                  Price: Priceless | Access: Invitation Only
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="my-16 h-px w-full bg-border" />

          {/* Bronze Member Section */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">
                You Are Already Part of the Club
              </CardTitle>
              <CardDescription>
                Every registered user of the MirbInvestments platform is
                automatically a <strong>Bronze Member</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                As a Bronze member, you already have access to basic benefits
                and are part of our growing community. This is your starting
                point towards Elite financial opportunities.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {bronzeBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-md border p-3"
                  >
                    <benefit.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                In case of dissatisfaction with a paid membership, MirbInvestments
                guarantees a full refund of the fee within the first 8 days of
                plan activation, in accordance with our policy of high ethics and
                trust.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
