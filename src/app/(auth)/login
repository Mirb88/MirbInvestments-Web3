'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, MoveLeft } from 'lucide-react';
import { MirbLogo } from '@/components/layout/mirb-logo';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      toast({
        title: 'Login Successful',
        description: "Welcome back! You're being redirected to the homepage.",
      });
      router.push(ROUTES.HOME);
    } catch (err: any) {
      setError(err.message || 'Please check your email and password.');
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] px-4 py-12 text-[#EDF2F4]">
      {/* Top Branding Header */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <MirbLogo width={36} height={36} />
          <span className="font-bold tracking-wider text-white">MirbInvestments</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#141414] border-gray-800 shadow-2xl overflow-hidden rounded-xl">
          <CardHeader className="space-y-2 text-center pb-6 border-b border-gray-800/60">
            <div className="mx-auto inline-flex p-3 rounded-full bg-[#2FE93D]/10 text-[#2FE93D] mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-white">Institutional Sign In</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Enter your credentials to access your secure portfolio
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@institution.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-black border-gray-800 text-white focus:border-[#2FE93D] focus:ring-[#2FE93D]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-gray-300">Password</Label>
                  <Link href={ROUTES.SUPPORT} className="text-xs text-[#2FE93D] hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-black border-gray-800 text-white focus:border-[#2FE93D] focus:ring-[#2FE93D]"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50">{error}</p>}

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#2FE93D] font-bold text-[#0D0D0D] hover:bg-[#28d336] transition-all h-11 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                  </>
                ) : (
                  <>
                    Access Secure Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center border-t border-gray-800/60 py-4 bg-[#111111] text-xs text-gray-400 gap-2">
            <div>
              Don&apos;t have an account?{' '}
              <Link href={ROUTES.REGISTER} className="text-[#2FE93D] font-semibold hover:underline">
                Request Platform Access &rarr;
              </Link>
            </div>
            <div className="pt-2 border-t border-gray-800/40 w-full text-center">
              <Button variant="link" asChild className="text-gray-400 hover:text-white text-xs p-0 h-auto">
                <Link href={ROUTES.HOME}>
                  <MoveLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
