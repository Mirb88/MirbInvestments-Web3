'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { ROUTES } from "@/lib/routes";

interface RegionalCtaProps {
    locale: 'en' | 'bs';
}

const ctaContent = {
    bs: {
        title: '🚀 Spremni za sigurnu investiciju?',
        description: 'Iskoristite našu AI dijagnostiku.',
        buttonText: 'ZAKAŽI KONSULTACIJE',
        buttonLink: ROUTES.SUPPORT,
        eventName: 'cta_click',
        eventParams: { action: 'schedule_consultation_bs' },
    },
    en: {
        title: '🚀 Maximize Your Potential',
        description: 'Join the MirbInvestments Club.',
        buttonText: 'SECURE YOUR ACCESS',
        buttonLink: ROUTES.CLUB,
        eventName: 'cta_click',
        eventParams: { action: 'secure_your_access_en' },
    }
}

export function RegionalCta({ locale }: RegionalCtaProps) {
    const content = ctaContent[locale];

    return (
        <Card className="mt-8 bg-muted/50 border-primary/30">
            <CardHeader>
                <CardTitle className="text-xl text-primary">{content.title}</CardTitle>
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
