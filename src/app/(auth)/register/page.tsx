'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoveLeft, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { MirbLogo } from '@/components/layout/mirb-logo';

export default function RegisterPage() {
  const { signUpWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      await signUpWithEmail(email, password);
      toast({
        title: 'Account Created',
        description: 'Welcome to MirbInvestments. Initializing your institutional profile.',
      });
      router.push('/');
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D0D0D] px-4 py-8 text-[#EDF2F4]">
      <div className="mb-6 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-wider text-[#EDF2F4]">
          <MirbLogo width={42} height={42} />
          <span>MirbInvestments</span>
        </Link>
        <p className="text-xs tracking-widest text-[#F0B90B] uppercase">Architecture of Intelligent Capital</p>
      </div>

      <Card className="w-full max-w-md border-gray-800 bg-[#141414] text-[#EDF2F4] shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold tracking-tight">Request Access</CardTitle>
            <UserPlus className="h-5 w-5 text-[#2FE93D]" />
          </div>
          <CardDescription className="text-gray-400">
            Create your secure account to join the elite Web3 capital network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@mirb.investments"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] placeholder:text-gray-600 focus:border-[#2FE93D]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] focus:border-[#2FE93D]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-800 bg-[#0D0D0D] text-[#EDF2F4] focus:border-[#2FE93D]"
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-950/50 p-3 text-sm text-red-400 border border-red-900/50">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#2FE93D] font-semibold text-[#0D0D0D] hover:bg-[#28d336] transition-colors"
            >
              {isLoading ? 'Creating Profile...' : 'Complete Registration'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an active profile?{' '}
            <Link href="/login" className="font-medium text-[#F0B90B] hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
        
        <div className="border-t border-gray-800 p-4 text-center">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-[#EDF2F4] hover:bg-transparent">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
