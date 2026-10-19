'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight, MoveLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Authentication Successful! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] px-4 py-12 text-[#EDF2F4]">
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2FE93D]/10 text-[#2FE93D]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-wider text-white">MirbInvestments</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#141414] border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex p-3 rounded-full bg-[#2FE93D]/10 text-[#2FE93D] mb-2">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Institutional Sign In</h1>
          <p className="text-gray-400 text-xs">Enter your credentials to access your secure portfolio</p>
        </div>

        {successMsg && (
          <div className="p-3 bg-[#2FE93D]/20 border border-[#2FE93D] text-[#2FE93D] text-xs rounded-xl text-center font-bold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Password</label>
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

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] transition-all h-12 rounded-xl flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {isLoading ? 'Authenticating...' : <>Access Secure Portal <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-800/60 text-xs text-gray-400 space-y-3">
          <div>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#2FE93D] font-semibold hover:underline">
              Request Platform Access &rarr;
            </Link>
          </div>
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white">
              <MoveLeft className="h-3.5 w-3.5" /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
