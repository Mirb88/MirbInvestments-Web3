'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const TermExplainer = dynamic(
  () => import('@/components/ai/term-explainer').then(mod => mod.default),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    ),
    ssr: false,
  }
);

export default function AcademyAIWrapper() {
  return <TermExplainer />;
}
