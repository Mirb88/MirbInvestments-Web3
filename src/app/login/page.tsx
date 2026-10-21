'use client';

export const dynamic = 'force-dynamic';

import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  useRef,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  MoveLeft,
  CheckCircle2,
} from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Track component mount status for async cleanup
  const isComponentMounted = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Reset UI state
      setError(null);
      setSuccessMsg(null);
      setIsLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      // Basic client‑side validation
      if (!trimmedEmail || !trimmedPassword) {
        setError('Molimo unesite email i lozinku.');
        setIsLoading(false);
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        if (!isComponentMounted.current) return;

        setSuccessMsg('Prijava uspješna! Preusmjeravanje na portal...');
        timeoutRef.current = setTimeout(() => {
          router.replace('/');
        }, 800);
      } catch (rawErr) {
        if (!isComponentMounted.current) return;

        const err = rawErr as FirebaseError | Error;
        console.error('Login error:', err);

        if ('code' in err) {
          switch (err.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
              setError('Neispravni podaci za prijavu. Provjerite email i lozinku.');
              break;
            case 'auth/invalid-email':
              setError('Format email adrese nije validan.');
              break;
            default:
              setError(err.message ?? 'Greška pri prijavi. Pokušajte ponovo.');
          }
        } else {
          setError(err.message ?? 'Neočekivana greška. Pokušajte ponovo.');
        }
      } finally {
        if (isComponentMounted.current) {
          setIsLoading(false);
        }
      }
    },
    [email, password, router],
  );

  const isSubmitDisabled = isLoading || email.trim() === '' || password.trim() === '';

  // Clear error when user starts typing again
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <div suppressHydrationWarning={true} className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] px-4 py-12 text-[#EDF2F4]">
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
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Institutional Sign In
          </h1>
          <p className="text-gray-400 text-xs">
            Prijavite se za pristup Vašem investicionom portfelju
          </p>
        </div>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="p-3 bg-red-950/50 border border-red-900 text-red-400 text-xs rounded-xl text-center animate-fade-in"
          >
            {error}
          </div>
        )}

        {successMsg && (
          <div
            role="status"
            aria-live="polite"
            className="p-3 bg-[#2FE93D]/10 border border-[#2FE93D]/40 text-[#2FE93D] text-xs rounded-xl text-center flex items-center justify-center gap-2 font-semibold"
          >
            <CheckCircle2 className="h-4 w-4" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
            >
              Email Adresa
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="name@institution.com"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
                aria-invalid={!!error}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
            >
              Lozinka
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••••••"
                className="w-full pl-10 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2FE93D] transition-colors"
                aria-invalid={!!error}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] transition-all h-12 rounded-xl flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-[0_0_20px_rgba(47,233,61,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              'Verifikacija u toku...'
            ) : (
              <>
                Pristupi Portalu <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-800/60 text-xs text-gray-400 space-y-3">
          <div>
            Nemate kreiran nalog?{' '}
            <Link href="/register" className="text-[#2FE93D] font-semibold hover:underline">
              Zatražite Pristup Platformi &rarr;
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