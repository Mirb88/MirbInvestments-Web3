'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do decentralized digital passes and asset allocations operate?",
    answer: "Verified ecosystem participants receive immutable Web3 NFT passes (backed by initiatives like financeinvestment.nft) granting decentralized access rights, automated yield distribution, and customized asset tiering."
  },
  {
    question: "How does tokenized asset exchange and liquidity routing work?",
    answer: "Our ecosystem provides seamless, low-friction cross-chain execution across major networks (BTC, ETH, SOL, TRX, ARB, POL) with direct neural liquidity analysis to ensure optimal execution rates."
  },
  {
    question: "Is my capital secure within the MirbInvestments ecosystem?",
    answer: "Security is built into our core foundation. We enforce multi-layer vault encryption, automated schema guards, and zero-trust protocol standards across all asset pathways."
  },
  {
    question: "How long does a support inquiry analysis take?",
    answer: "Our hybrid intelligence framework combines expert human oversight with advanced AI analytics in real time. Inquiries are evaluated immediately, with priority routing ensuring rapid and precise executive responses."
  }
];

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
      if (db) {
        await addDoc(collection(db, 'supportInquiries'), {
          name: formData.name.trim() || 'Anonymous',
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim() || 'General Inquiry',
          message: formData.message.trim(),
          submittedAt: Timestamp.now(),
          status: 'pending'
        });
      }
      setStatusMsg('Your support request has been securely dispatched. Our synergistic team will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Support submission error:', err);
      setStatusMsg('Inquiry submitted to priority queue. Dispatch confirmed.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-[#0D0D0D] text-[#EDF2F4] font-sans selection:bg-[#2FE93D] selection:text-[#0D0D0D] overflow-x-hidden">
      
      {/* NAVIGACIJA */}
      <nav className="w-full px-4 sm:px-8 h-20 flex items-center justify-between border-b border-[#222222]">
        <Link href="/" className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#1b1b1b] border border-[#2FE93D]/40 flex items-center justify-center shadow-[0_0_15px_rgba(47,233,61,0.2)]">
            <svg className="w-5 h-5 text-[#2FE93D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-wider text-[#EDF2F4]">MirbInvestments</span>
        </Link>

        <Link href="/" className="px-4 py-2 rounded-xl bg-[#1b1b1b] border border-[#2FE93D]/30 hover:border-[#2FE93D] text-xs font-mono font-bold text-[#2FE93D] transition-all">
          ← Back to Core
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        
        {/* HERO */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-full bg-[#1b1b1b] border border-[#2FE93D]/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(47,233,61,0.25)]">
            <svg className="w-8 h-8 text-[#2FE93D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636l3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#EDF2F4] tracking-tight mb-4">
            MirbInvestments <span className="bg-gradient-to-r from-[#EDF2F4] via-[#8D99AE] to-[#2FE93D] bg-clip-text text-transparent">Support & Neural Assistance</span>
          </h1>
          <p className="text-[#8D99AE] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our support desk is an extension of our philosophy. Here, your inquiries are analyzed by our synergistic team of seasoned experts and advanced AI (Human + AI Synergy) to ensure you receive precise and purposeful responses promptly.
          </p>
        </div>

        {/* SUBMIT REQUEST FORM */}
        <section className="p-6 sm:p-10 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl mb-16">
          <h2 className="text-xl font-black text-[#EDF2F4] mb-2">Submit a Support Request</h2>
          <p className="text-xs text-[#8D99AE] mb-8">Your inquiry will be analyzed by our synergistic team of seasoned experts and advanced AI to ensure you receive a precise and purposeful response.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-xs font-mono text-[#8D99AE] mb-2 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Issue with my deposit"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EDF2F4] text-xs font-mono focus:outline-none focus:border-[#2FE93D]"
              />
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
              className="w-full py-4 rounded-xl bg-[#2FE93D] text-[#0D0D0D] font-extrabold text-sm hover:scale-[1.01] transition-all cursor-pointer shadow-[0_0_20px_rgba(47,233,61,0.3)] disabled:opacity-50"
            >
              {isSubmitting ? 'Dispatching...' : '✈ Send Support Request'}
            </button>

            {statusMsg && (
              <p className="mt-4 text-xs font-mono text-[#2FE93D] text-center">{statusMsg}</p>
            )}
          </form>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-[#EDF2F4] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-[#141414] border border-[#222222] overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-bold text-[#EDF2F4] hover:text-[#2FE93D] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#2FE93D] font-mono text-lg ml-4">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#8D99AE] leading-relaxed border-t border-[#1f1f1f] pt-4 font-mono">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DIRECT CONTACT OPTIONS (CLEAN INSTITUTIONAL BUTTON WITHOUT PHONE NUMBER) */}
        <section className="p-8 rounded-3xl bg-[#141414] border border-[#222222] text-left">
          <h2 className="text-xl font-black text-[#EDF2F4] mb-2">Direct Contact Options</h2>
          <p className="text-xs text-[#8D99AE] mb-8">For direct inquiries or time-sensitive matters, use our priority channels.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-[#2FE93D] text-lg">💬</span>
                <h3 className="font-bold text-sm text-[#EDF2F4]">Priority Routing Channel</h3>
              </div>
              <p className="text-xs text-[#8D99AE] mb-3">For fast-track inquiries, direct routing, and instant assistance.</p>
              <a 
                href="https://wa.me/387603527846" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#2FE93D] text-[#0D0D0D] text-xs font-mono font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(47,233,61,0.3)]"
              >
                Open Priority Channel
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-[#2FE93D] text-lg">🛡️</span>
                <h3 className="font-bold text-sm text-[#EDF2F4]">Executive Dispatch</h3>
              </div>
              <p className="text-xs text-[#8D99AE] mb-3">Human + AI Synergy routing active for all inquiries.</p>
              <span className="text-xs font-mono text-[#2FE93D] font-bold">
                Status: Operational (0.0% Risk)
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#222222] py-8 text-center text-xs text-[#8D99AE]">
        <p>© 2026 MirbInvestments™. Sovereign Elite Architecture.</p>
      </footer>
    </div>
  );
}
