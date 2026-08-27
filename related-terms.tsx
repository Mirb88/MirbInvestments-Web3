'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

interface RelatedTermsProps {
  terms: string[];
}

export function RelatedTerms({ terms }: RelatedTermsProps) {
  if (!terms || terms.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 bg-muted/50 border-dashed">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>Decode Crypto Smarter</CardTitle>
        </div>
        <CardDescription className="pt-2">
          Our elite AI distills complex crypto concepts into clear, precision-driven explanations. Tap any term to empower your decisions and elevate your crypto fluency.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {terms.map((term, index) => (
            <Button key={index} asChild variant="outline">
              <Link href={`${ROUTES.ACADEMY}?term=${encodeURIComponent(term)}#ai-explainer`}>
                {term}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}