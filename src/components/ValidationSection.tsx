import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default function ValidationSection() {
  return (
    <>
      <section className="text-center space-y-12">
        <blockquote className="text-lg italic text-slate-400 max-w-3xl mx-auto leading-relaxed">
          "In the MirbInvestments™ ecosystem, registration is your first
          step to the top. Every registered user automatically becomes a
          Free member of the MirbInvestments Club, gaining access to basic
          insights. However, the pinnacle of power is reserved for holders
          of the Platinum card, which is awarded based on algorithmic
          trust and strategic contribution."
        </blockquote>
      </section>

      <div className="border-t border-primary/20 pt-20 text-center">
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
          Validation Through Precision
        </h3>
        <p className="text-slate-400 max-w-3xl mx-auto mb-10 text-lg">
          Whether you are a Free member or aspire to Platinum status, your
          advantage lies in the evidence. Experience the power of our
          Neural Interface live.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-black font-extrabold px-10 h-14 hover:scale-105 transition-transform rounded-none"
        >
          <Link href={ROUTES.NEURAL_DIAGNOSTICS}>
            Join the Neural Cycle{' '}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </>
  );
}
