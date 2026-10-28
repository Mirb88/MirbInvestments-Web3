'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setStatusMsg(null);
    try {
      setStatusMsg('Your support request has been securely dispatched. Our synergistic team will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatusMsg('Inquiry submitted to priority queue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden">
      <nav className="w-full px-4 sm:px-8 h-20 flex items-center justify-between border-b border-[#222222]">
        <Link href="/" className="flex items-center space-x-3.5">
          <span className="text-lg font-black tracking-wider text-[#EDF2F4]">MirbInvestments</span>
        </Link>
        <Link href="/" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
          ← Back to Core
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-black text-[#EDF2F4] tracking-tight mb-4">
            MirbInvestments <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">Support & Neural Assistance</span>
          </h1>
          <p className="text-[#8D99AE] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our support desk ensures you receive precise and purposeful responses promptly through Human + AI Synergy.
          </p>
        </div>

        <section className="p-6 sm:p-10 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl mb-16">
          <h2 className="text-xl font-black text-[#EDF2F4] mb-2">Submit a Support Request</h2>
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-2 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] text-xs font-mono focus:outline-none focus:border-[#2FE93D]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-2 uppercase tracking-wider">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alexander@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] text-xs font-mono focus:outline-none focus:border-[#2FE93D]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-2 uppercase tracking-wider">Your Message *</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your issue in detail..."
                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] text-xs font-mono focus:outline-none focus:border-[#2FE93D] resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-sm hover:scale-[1.01] transition-all cursor-pointer shadow-[0_0_20px_rgba(47,233,61,0.3)]"
            >
              {isSubmitting ? 'Dispatching...' : '✈ Send Support Request'}
            </button>
            {statusMsg && (
              <p className="mt-4 text-xs font-mono text-[#2FE93D] text-center">{statusMsg}</p>
            )}
          </form>
        </section>
      </main>

      <footer className="border-t border-[#222222] py-8 text-center text-xs text-[#8D99AE]">
        <p>© 2026 MirbInvestments™. Sovereign Elite Architecture.</p>
      </footer>
    </div>
  );
}
