'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoveLeft, UserPlus, ShieldCheck, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/lib/routes';

function RegisterContent() {
  const { signUpWithEmail, signUpWithEmailAndPassword } = useAuth() as any;
  const router = useRouter();
  const { toast } = useToast();
  
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: 'The passwords provided do not match.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const registerFn = signUpWithEmail || signUpWithEmailAndPassword;
      if (registerFn) {
        await registerFn(email, password, email.split('@')[0]);
      } else {
        throw new Error('Registration method is not available.');
      }

      toast({
        title: 'Account Created',
        description: 'Welcome to MirbInvestments. Initializing your institutional profile.',
      });
      router.push(ROUTES.HOME || '/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'Please check your information and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] flex items-center justify-center font-mono">
        Učitavanje interfejsa za registraciju...
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true} className="flex min-h-screen flex-col items-center justify-center bg-[#0D0D0D] px-4 py-8 text-[#EDF2F4]">
      <div className="mb-6 flex flex-col items-center gap-3">
        <Link href={ROUTES.HOME || '/'} className="flex items-center gap-3 text-2xl font-bold tracking-wider text-[#EDF2F4]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2FE93D]/10 text-[#2FE93D]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span>MirbInvestments</span>
        </Link>
        <p className="text-xs tracking-widest text-[#2FE93D] uppercase">Architecture of Intelligent Capital</p>
      </div>

      <Card className="w-full max-w-md border-gray-800 bg-[#141414] text-[#EDF2F4] shadow-2xl rounded-xl">
        <CardHeader className="space-y-1 pb-6 border-b border-gray-800/60">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold tracking-tight">Request Access</CardTitle>
            <UserPlus className="h-5 w-5 text-[#2FE93D]" />
          </div>
          <CardDescription className="text-gray-400 text-sm">
            Create your secure account to join the elite Web3 capital network.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@mirb.investments"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] placeholder:text-gray-600 focus:border-[#2FE93D] focus:ring-[#2FE93D]"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] focus:border-[#2FE93D] focus:ring-[#2FE93D]"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-gray-300">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] focus:border-[#2FE93D] focus:ring-[#2FE93D]"
                />
              </div>
            </div>
            {error && (
              <div className="rounded-md bg-red-950/50 p-3 text-sm text-red-400 border border-red-900/50">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] transition-colors h-11 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Profile...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an active profile?{' '}
            <Link href={ROUTES.LOGIN || '/login'} className="font-medium text-[#2FE93D] hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
        
        <div className="border-t border-gray-800/60 p-4 text-center bg-[#111111]">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-[#EDF2F4] hover:bg-transparent text-xs">
            <Link href={ROUTES.HOME || '/'}>
              <MoveLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D] text-[#2FE93D] flex items-center justify-center font-mono">Inicijalizacija sigurne registracije...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
