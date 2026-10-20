'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, UserPlus, ArrowRight, MoveLeft, CheckCircle2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function RegisterPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div suppressHydrationWarning={true} className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2FE93D] border-t-transparent" />
          <span className="text-sm font-semibold tracking-wider text-gray-400">Učitavanje Portala...</span>
        </div>
      </div>
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (password !== confirmPassword) {
      setError('Lozinke se ne podudaraju.');
      return;
    }

    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (fullName && user) {
        await updateProfile(user, { displayName: fullName });
      }

      try {
        if (db && user) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: fullName,
            email: email,
            role: 'investor',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (dbErr) {
        console.warn('Firestore fallback warning:', dbErr);
      }

      setSuccessMsg('Nalog je uspješno kreiran! Automatsko preusmjeravanje na portal...');

      setTimeout(() => {
        window.location.assign('/');
      }, 1200);

    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Ova email adresa je već registrovana u sistemu.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Format email adrese nije ispravan.');
      } else if (err.code === 'auth/weak-password') {
        setError('Lozinka je previše slaba.');
      } else {
        setError(err?.message || 'Greška pri kreiranju naloga. Pokušajte ponovo.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] px-4 py-12 text-[#EDF2F4]">
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2FE93D]/10 text-[#2FE93D] border border-[#2FE93D]/30 shadow-[0_0_10px_rgba(47,233,61,0.2)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-wider text-white">MirbInvestments</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#141414] border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex p-3 rounded-full bg-[#2FE93D]/10 text-[#2FE93D] mb-2 border border-[#2FE93D]/20">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Zatražite Pristup</h1>
          <p className="text-gray-400 text-xs">Kreirajte zvanični MirbInvestments investicioni nalog</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-900 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-[#2FE93D]/10 border border-[#2FE93D]/40 text-[#2FE93D] text-xs rounded-xl text-center flex items-center justify-center gap-2 font-semibold animate-pulse">
            <CheckCircle2 className="h-4 w-4" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Ime i Prezime</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Npr. Marko Marković"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email Adresa</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kriptoproces@outlook.com"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Lozinka</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Potvrda Lozinke</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] transition-all h-12 rounded-xl flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-[0_0_20px_rgba(47,233,61,0.2)]"
          >
            {isLoading ? 'Kreiranje Naloga...' : <>Završi Registraciju <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-800/60 text-xs text-gray-400 space-y-3">
          <div>
            Već imate kreiran nalog?{' '}
            <Link href="/login" className="text-[#2FE93D] font-semibold hover:underline">
              Prijavite Se &rarr;
            </Link>
          </div>
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white">
              <MoveLeft className="h-3.5 w-3.5" /> Povratak na Početnu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
