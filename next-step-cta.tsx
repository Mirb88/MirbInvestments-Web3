'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { ROUTES } from "@/lib/routes";

export function NextStepCta() {
  return (
    <Card className="mt-12 bg-card border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">What's Your Next Move?</CardTitle>
        <CardDescription className="text-base max-w-2xl mx-auto">
          You've gained the knowledge. Now, choose your path.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                  <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Your Knowledge</h3>
              <Button 
                asChild 
                className="w-full"
                onClick={() => trackEvent('cta_click', { action: 'go_to_crypto_shop_from_insight' } as any)}
              >
                <Link href={ROUTES.CRYPTO_SHOP}>
                  Go to Crypto Shop <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                  <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Join the Inner Circle</h3>
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
                onClick={() => trackEvent('cta_click', { action: 'go_to_club_from_insight' } as any)}
              >
                <Link href={ROUTES.CLUB}>
                  Explore Club Benefits <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}