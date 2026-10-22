"use client";

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("🔐 Pokrećem autentifikaciju za:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Uspješna prijava:", userCredential.user.uid);
      
      router.push('/');
      window.location.href = '/';
    } catch (err: any) {
      console.error("❌ Greška pri prijavi:", err);
      setError(err.message || 'Greška pri prijavi. Provjerite podatke.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-white p-4">
      <div className="w-full max-w-md p-8 bg-[#141414] border border-[#2FE93D]/30 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-[#2FE93D] mb-6">MirbInvestments Login</h2>
        {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg focus:border-[#2FE93D] outline-none text-white transition-all"
              placeholder="admin@mirbinvestments.crypto"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Lozinka</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-lg focus:border-[#2FE93D] outline-none text-white transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-[#2FE93D] text-black font-bold rounded-lg hover:bg-[#25c432] transition-all shadow-lg shadow-[#2FE93D]/20 disabled:opacity-50"
          >
            {loading ? 'Prijavljivanje...' : 'Prijavi se'}
          </button>
        </form>
      </div>
    </div>
  );
}
