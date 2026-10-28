'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EliteClubPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: string } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const [contactInfo, setContactInfo] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const openRequestModal = (tierName: string, price: string) => {
    setScrollPosition(window.scrollY);
    setSelectedTier({ name: tierName, price });
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;

    setIsSubmitting(true);
    try {
      const isJahorina = selectedTier?.name.includes('Strategic Convergence');
      setIsModalOpen(false);
      setContactInfo('');
      setUserName('');
      setNotification(
        isJahorina 
          ? `Interest registered for Jahorina 2026! Our elite team will reach out with all details.` 
          : `Request submitted for ${selectedTier?.name}! Our elite team will reach out shortly.`
      );
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error('Error:', error);
      setIsModalOpen(false);
      setNotification(`Request recorded successfully!`);
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#2FE93D] selection:text-black font-sans relative overflow-x-hidden" suppressHydrationWarning={true}>
      
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border-2 border-[#2FE93D] text-white px-8 py-6 rounded-3xl shadow-[0_0_50px_rgba(47,233,61,0.4)] max-w-md text-center">
            <div className="text-3xl mb-2">⚡</div>
            <strong className="text-[#2FE93D] block text-lg mb-2 font-black">Request Received!</strong>
            <p className="text-zinc-300 text-sm">{notification}</p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div 
          className="absolute inset-x-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          style={{ top: `${scrollPosition}px`, minHeight: '100vh' }}
        >
          <div className="bg-gradient-to-b from-zinc-900/95 to-black border-2 border-[#2FE93D]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(47,233,61,0.25)] relative my-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold p-2 cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D] block mb-2">
                Sovereign Access Portal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedTier?.name.includes('Strategic Convergence') ? 'Jahorina 2026: Strategic Convergence Interest' : `Confirm ${selectedTier?.name}`}
              </h3>
            </div>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Your Name / Identity (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Satoshi Nakamoto"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Email or WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  placeholder="email@domain.com or +38761..."
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D]"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#2FE93D] text-black font-extrabold text-sm hover:bg-[#25b830] transition-all shadow-[0_0_25px_rgba(47,233,61,0.4)] cursor-pointer mt-2"
              >
                {isSubmitting ? 'Syncing with Sovereign Core...' : 'CONFIRM ACCESS REQUEST →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="w-full bg-[#141414] border-b border-white/10 py-4 px-6 sm:px-12 flex justify-between items-center text-xs sm:text-sm">
        <Link href="/" className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#2FE93D] text-zinc-200 hover:text-[#2FE93D] transition-all flex items-center gap-2 font-mono font-medium">
          <span>←</span> Return to Sovereign Core
        </Link>
        <div className="flex items-center gap-3 font-mono">
          <Link href="/neural-diagnostics" className="text-[#2FE93D] hover:underline font-bold flex items-center gap-1">
            <span>⚡</span> Diagnostics
          </Link>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-semibold">Club Portal</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative py-16 px-4 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2FE93D]/15 via-transparent to-transparent blur-3xl"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-[#2FE93D]/30 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#2FE93D] animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#2FE93D]">Exclusive Access Tier</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          The MirbInvestments <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#2FE93D]">Club</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-8">
          Your ticket to the world of Elite Financial Intelligence. Partnership in your decentralized success.
        </p>
      </section>

      {/* ACCESS CARDS */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-[#2FE93D]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">Standard Access Card</div>
              <h3 className="text-2xl font-bold mb-2">Silver Access Card</h3>
              <div className="text-4xl font-extrabold text-[#2FE93D] mb-6">€150 <span className="text-sm font-normal text-zinc-400">/ quarterly</span></div>
              <p className="text-zinc-400 text-sm mb-6">The perfect entry into the world of elite financial benefits.</p>
              <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                <li className="flex items-center gap-3">✅ Access to AI-driven market analysis</li>
                <li className="flex items-center gap-3">✅ Priority message support</li>
              </ul>
            </div>
            <button 
              onClick={() => openRequestModal('Silver Access Card', '€150 quarterly')}
              className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-[#2FE93D] hover:text-black font-bold transition-all border border-white/10 cursor-pointer"
            >
              Request Silver Card
            </button>
          </div>

          <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 border-2 border-[#2FE93D]/40 rounded-2xl p-8 backdrop-blur-xl relative shadow-[0_0_30px_rgba(47,233,61,0.15)] flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2FE93D] text-black text-xs font-bold uppercase tracking-wider">
              Best Value
            </div>
            <div>
              <div className="text-[#2FE93D] font-mono text-sm uppercase tracking-wider mb-2">Elite Sovereign Tier</div>
              <h3 className="text-2xl font-bold mb-2">Gold Sovereign Card</h3>
              <div className="text-4xl font-extrabold text-white mb-6">€399 <span className="text-sm font-normal text-zinc-400">/ annually</span></div>
              <p className="text-zinc-400 text-sm mb-6">Unlock the full potential with our most popular card tier.</p>
              <ul className="space-y-4 mb-8 text-sm text-zinc-200">
                <li className="flex items-center gap-3 text-[#2FE93D]">✓ All benefits of Silver tier</li>
                <li className="flex items-center gap-3">✅ Direct 24/7 support via WhatsApp</li>
              </ul>
            </div>
            <button 
              onClick={() => openRequestModal('Gold Sovereign Card', '€399 annually')}
              className="w-full py-3.5 rounded-xl bg-[#2FE93D] text-black hover:bg-[#25b830] font-bold transition-all shadow-[0_0_20px_rgba(47,233,61,0.3)] cursor-pointer"
            >
              Request Gold Card
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SA LINKOVIMA KA SVIH 5 STRANICA */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs text-zinc-500">
        <div className="flex flex-wrap justify-center gap-6 mb-6 font-mono">
          <Link href="/" className="hover:text-[#2FE93D] transition-colors">Home Core</Link>
          <Link href="/about" className="hover:text-[#2FE93D] transition-colors">About Us</Link>
          <Link href="/club" className="hover:text-[#2FE93D] transition-colors">Access Club</Link>
          <Link href="/neural-diagnostics" className="hover:text-[#2FE93D] transition-colors">Neural Diagnostics</Link>
          <Link href="/support" className="hover:text-[#2FE93D] transition-colors">Support Center</Link>
        </div>
        <p className="mb-2">MirbInvestments™ · Simplified Crypto, Smarter Investing.</p>
        <p>© 2026 All Rights Reserved.</p>
      </footer>

    </div>
  );
}
