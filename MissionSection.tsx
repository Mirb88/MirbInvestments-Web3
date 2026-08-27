import { ShieldCheck } from 'lucide-react';

export default function MissionSection() {
  return (
    <>
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <ShieldCheck className="h-6 w-6" />
          <h3 className="text-2xl font-bold uppercase tracking-widest">Our Mission: Precision in Volatility</h3>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed">
          MirbInvestments™ is not just an investment platform; it is a
          strategic hub where <strong>Artificial Intelligence</strong>{' '}
          meets real estate and global markets. In a world of financial
          "noise," we provide the <strong>"signal."</strong> Our goal is
          capital protection through rigorous neural diagnostics and
          predictive market analysis.
        </p>
      </section>

      <section className="border-t border-white/5 pt-12 space-y-6">
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Pillar of Expertise (E-E-A-T)</h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          Guided by the principles of expertise and trust, we use advanced
          AI algorithms to analyze trends in the Balkans and global
          corridors. From the strategic convergence of the{' '}
          <span className="text-primary font-bold">Jahorina 2026</span>{' '}
          project to the digital frontiers of neural diagnostics, our
          insights are backed by data. Every analysis is the product of
          multi-layered verification, reflecting our commitment to
          architectural integrity.
        </p>
      </section>
    </>
  );
}
