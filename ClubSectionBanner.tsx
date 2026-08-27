'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default function ClubSectionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Link href={ROUTES.CLUB}>
        <div className="group relative overflow-hidden bg-slate-900/80 backdrop-blur-2xl border border-primary/40 p-1 md:p-2 rounded-2xl hover:border-primary transition-all duration-500 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
          <div className="flex items-center justify-between p-6 md:p-8 bg-slate-950/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                  Mirb Elite Club
                </h2>
                <p className="text-primary/80 text-sm font-bold tracking-widest uppercase mt-1">
                  Access the Unattainable Precision
                </p>
              </div>
            </div>
            <ArrowRight className="hidden md:block h-10 w-10 text-primary group-hover:translate-x-3 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
