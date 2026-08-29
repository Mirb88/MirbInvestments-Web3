"use client";

import { motion } from "framer-motion";

const manifestoPoints = [
    {
      title: "I. The Primacy of Intelligence",
      text: "MirbInvestments is a Neural Ecosystem. We process the market through thousands of autonomous AI experts to ensure your capital is always on the right side of history."
    },
    {
      title: "II. Impenetrable Stability",
      text: "Our architecture is engineered for extremes. A distributed sharding system guarantees 45ms latency under the load of 120,000 concurrent users."
    },
    {
      title: "III. Autonomous Liquidity",
      text: "Through our proprietary Liquidity Augmentation Protocol, our AI dynamically pulls from the world's deepest markets, ensuring minimal slippage and maximum precision."
    },
    {
      title: "IV. The Ethics of Progress",
      text: "In a world where speed is everything, MirbInvestments adds wisdom. Our algorithms are calibrated for sustainable growth and institutional transparency."
    }
]

export default function ManifestHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background py-20 px-4 sm:px-6">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-5xl w-full border border-primary/20 border-t border-primary/30 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-primary text-xs font-black uppercase tracking-[0.4em]"
          >
            MirbInvestments Intelligence 2026
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-tight uppercase">
            The Intelligence Manifesto
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-8 w-full">
            {manifestoPoints.map((point, index) => (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.8 }}
                    className="space-y-3 p-4 rounded-lg bg-background/50 border border-border/50"
                  >
                    <h3 className="text-primary font-bold text-sm tracking-widest uppercase">{point.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.text}
                    </p>
                </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8 p-[0.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"
          />

          <p className="text-foreground font-medium italic text-lg tracking-tight max-w-3xl">
            "The future of investing is not in prediction, but in processing power and neural logic. MirbInvestments: Where AI becomes your most trusted partner."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
