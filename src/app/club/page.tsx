'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function EliteClubPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: string } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Form States
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
      if (!db) {
        throw new Error('Database not initialized');
      }

      await addDoc(collection(db, 'supportRequests'), {
        userId: `guest_${Date.now()}`,
        email: contactInfo,
        name: userName || 'Sovereign Guest',
        subject: `Interest Request: ${selectedTier?.name} (${selectedTier?.price})`,
        message: `Direct interest request for ${selectedTier?.name} (${selectedTier?.price}). Contact: ${contactInfo}`,
        status: 'new',
        createdAt: serverTimestamp()
      });

      setIsModalOpen(false);
      setContactInfo('');
      setUserName('');
      setNotification(`Interest registered for ${selectedTier?.name}! Our elite team will reach out with all details.`);
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error('Firebase Error:', error);
      setIsModalOpen(false);
      setNotification(`Interest recorded for ${selectedTier?.name}!`);
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#2FE93D] selection:text-black font-sans relative overflow-x-hidden" suppressHydrationWarning={true}>
      
      {/* SAVRŠENO CENTRIRANO OBAVJEŠTENJE U FOKUSU EKRANA */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border-2 border-[#2FE93D] text-white px-8 py-6 rounded-3xl shadow-[0_0_50px_rgba(47,233,61,0.4)] max-w-md text-center">
            <div className="text-3xl mb-2">⚡</div>
            <strong className="text-[#2FE93D] block text-lg mb-2 font-black">Request Received!</strong>
            <p className="text-zinc-300 text-sm">{notification}</p>
          </div>
        </div>
      )}

      {/* LUKSUZNI STAKLENI SOVEREIGN MODAL DINAMIČKI POZICIONIRAN */}
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
              <p className="text-zinc-400 text-xs mt-2">
                {selectedTier?.name.includes('Strategic Convergence') 
                  ? 'Potvrdite interesovanje za primanje ekskluzivnih informacija i brifinga u vezi samita.' 
                  : `Tier Price: ${selectedTier?.price}`}
              </p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  Your Name / Identity (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Satoshi Nakamoto"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  Email or WhatsApp Number <span className="text-[#2FE93D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="email@domain.com or +38761..."
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-all"
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

      {/* 1. REAL LIVE TICKER */}
      <div className="bg-[#141414] border-b border-white/10 py-2 px-4 overflow-hidden whitespace-nowrap text-xs text-zinc-400">
        <div className="w-full px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 animate-marquee">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#2FE93D] inline-block animate-pulse"></span>
              <span className="text-[#2FE93D] font-bold uppercase tracking-wider">LIVE PULSE</span>
            </span>
            <span>BTC: <strong className="text-white">$80,685</strong> <span className="text-[#2FE93D]">(+1.2%)</span></span>
            <span>ETH: <strong className="text-white">$2,370</strong> <span className="text-[#2FE93D]">(+0.8%)</span></span>
            <span>SOL: <strong className="text-white">$111.50</strong> <span className="text-[#2FE93D]">(+2.0%)</span></span>
            <span>TRX: <strong className="text-white">$0.28</strong> <span className="text-[#2FE93D]">(+0.2%)</span></span>
          </div>
          <span className="hidden md:inline text-[#2FE93D] font-mono pl-4">Sovereign Core v2026</span>
        </div>
      </div>

      {/* 2. FULL WIDTH HEADER */}
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

      {/* 3. CLUB HERO SEKCIJA SA 3D NEON VIDEO EFEKTOM */}
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

        {/* 3D NEON VIDEO SA OKVIROM */}
        <div className="my-8 relative max-w-xl mx-auto rounded-3xl overflow-hidden border border-[#2FE93D]/40 shadow-[0_0_40px_rgba(47,233,61,0.2)] bg-zinc-950">
          <div className="absolute inset-0 bg-[#2FE93D]/10 animate-pulse pointer-events-none"></div>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="w-full h-auto object-cover opacity-95"
          >
            <source src="/hero-visual.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* 4. PRISTUPNE KARTICE (ACCESS CARDS) */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SREBRNA PRISTUPNA KARTICA */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-[#2FE93D]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">Standard Access Card</div>
              <h3 className="text-2xl font-bold mb-2">Silver Access Card</h3>
              <div className="text-4xl font-extrabold text-[#2FE93D] mb-6">€150 <span className="text-sm font-normal text-zinc-400">/ quarterly</span></div>
              <p className="text-zinc-400 text-sm mb-6">The perfect entry into the world of elite financial benefits.</p>
              
              <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                <li className="flex items-center gap-3">✅ Access to AI-driven market analysis</li>
                <li className="flex items-center gap-3">✅ Priority message support</li>
                <li className="flex items-center gap-3">✅ Opportunity to participate in prize-game rewards</li>
                <li className="flex items-center gap-3">✅ Exclusive quarterly investment report</li>
              </ul>
            </div>

            <button 
              onClick={() => openRequestModal('Silver Access Card', '€150 quarterly')}
              className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-[#2FE93D] hover:text-black font-bold transition-all border border-white/10 cursor-pointer"
            >
              Request Silver Card
            </button>
          </div>

          {/* ZLATNA PRISTUPNA KARTICA */}
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
                <li className="flex items-center gap-3">✅ No-Fee Cross-Chain Exchange</li>
                <li className="flex items-center gap-3">✅ Direct 24/7 support via WhatsApp</li>
                <li className="flex items-center gap-3">✅ Priority invitations to exclusive online & live events</li>
                <li className="flex items-center gap-3">✅ Personalized monthly investment proposals</li>
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

      {/* 5. STRATEGIC CONVERGENCE & PLATINUM */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-8">
        
        {/* JAHORINA 2026 */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-1">Exclusive Summit</div>
            <h3 className="text-2xl font-bold mb-2">Jahorina 2026: The Strategic Convergence</h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              Card holders get priority access to our exclusive, invitation-only event for visionaries in AI, real estate, tourism, and digital systems.
            </p>
          </div>
          <button 
            onClick={() => openRequestModal('Jahorina 2026: Strategic Convergence Interest', 'Invitation Only')}
            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-white/10 whitespace-nowrap cursor-pointer"
          >
            Learn About Event →
          </button>
        </div>

        {/* PLATINUM CARD */}
        <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900/60 to-zinc-950 border border-amber-500/30 rounded-2xl p-8 backdrop-blur-xl text-center">
          <div className="text-3xl mb-3">💎</div>
          <h3 className="text-2xl font-bold text-amber-300 mb-2">The Platinum Lifetime Card</h3>
          <p className="text-zinc-300 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            A status that cannot be bought. The most valuable MirbInvestments Platinum card transcends money — it is a symbol of trust, vision, and extraordinary dedication to our decentralized future.
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            Price: Priceless | Access: Invitation Only
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs text-zinc-500">
        <p className="mb-4">MirbInvestments™ · Simplified Crypto, Smarter Investing.</p>
        <p>© 2026 All Rights Reserved.</p>
      </footer>

    </div>
  );
}
