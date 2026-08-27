
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { X, Zap, Newspaper } from 'lucide-react';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

const icons: { [key: string]: React.ElementType<LucideProps> } = {
  zap: Zap,
  newspaper: Newspaper,
};


interface TimedPromoProps {
  delaySeconds: number;
  promoKey: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: keyof typeof ROUTES;
  iconName: 'zap' | 'newspaper';
}

export function TimedPromo({
  delaySeconds,
  promoKey,
  title,
  description,
  ctaText,
  ctaLink,
  iconName,
}: TimedPromoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = icons[iconName];

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(promoKey);
    if (hasBeenShown) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(promoKey, 'true');
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, promoKey]);

  if (!isVisible || !Icon) {
    return null;
  }

  const linkHref = ROUTES[ctaLink] || '/';

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <Card className="w-80 shadow-2xl border-primary/30">
        <CardHeader>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle>{title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full" onClick={() => setIsVisible(false)}>
            <Link href={linkHref}>{ctaText}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
