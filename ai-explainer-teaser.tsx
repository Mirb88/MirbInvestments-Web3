'use client';

import { Suspense } from 'react';
import {
  Wand2,
} from 'lucide-react';
import TermExplainer from '@/components/ai/term-explainer';


export function AiExplainerTeaser() {

  return (
    <section id="ai-explainer" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
          <div className='flex flex-col justify-center text-center'>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wand2 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">
                Understand Any Crypto Concept
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg" data-ai-hint="crypto concepts explainer">
              Clarity on demand. Our AI deciphers complex crypto jargon instantly. Explore our content and tap any strategic term for immediate analysis, or submit your own query directly.
            </p>
            <Suspense fallback={<div>Loading Explainer...</div>}>
              <TermExplainer />
            </Suspense>
          </div>
      </div>
    </section>
  );
}
