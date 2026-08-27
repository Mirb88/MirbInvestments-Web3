import { Bot, Building, Mountain } from 'lucide-react';

const focusItems = [
  {
    icon: Bot,
    title: 'Neural Analysis',
    text: 'Our proprietary engine provides the "signal" in market noise, ensuring capital positioning with data-driven certainty.',
  },
  {
    icon: Building,
    title: 'Luxury Real Estate',
    text: 'Identification of "high-alpha" opportunities in tokenized real estate and development projects in emerging markets.',
  },
  {
    icon: Mountain,
    title: 'Elite Tourism',
    text: 'Architecting the future of tourism through sustainable infrastructure in exclusive global destinations.',
  },
];

export default function CoreFocusCards() {
  return (
    <section className="border-t border-white/5 pt-12">
      <h3 className="text-2xl font-bold mb-10 text-center text-primary uppercase tracking-[0.3em]">
        Core Strategic Focus
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {focusItems.map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all group"
          >
            <item.icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-white mb-4">
              {item.title}
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
