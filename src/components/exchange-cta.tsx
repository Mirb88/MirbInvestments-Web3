
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { Repeat } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function ExchangeCta() {
    const content = {
        title: 'Optimize Your Trades with MirbInvestments Exchange',
        description: 'Why overpay on fees? As a MirbInvestments member, you get exclusive access to our Reserved Exchange, designed for maximum capital efficiency with some of the most competitive rates on the market. Execute your strategy with precision and discretion.',
        buttonText: 'Explore the Reserved Exchange',
        buttonLink: ROUTES.EXCHANGE,
        eventName: 'cta_click',
        eventParams: { action: 'explore_exchange_from_insight' },
    };

    return (
        <Card className="mt-8 bg-muted/50 border-primary/30">
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Repeat className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl text-primary">{content.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{content.description}</p>
                <Button 
                    asChild 
                    size="lg" 
                    className="w-full sm:w-auto"
                    onClick={() => trackEvent(content.eventName, content.eventParams as any)}
                >
                    <Link href={content.buttonLink}>{content.buttonText}</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
