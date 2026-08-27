
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
import { MoveLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { MirbLogo } from '@/components/layout/mirb-logo';


export default function LoginPage() {
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmail(email, password);
      toast({
        title: 'Login Successful',
        description: "Welcome back! You're being redirected to the homepage.",
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your email and password.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
        <MirbLogo width={40} height={40} />
        <span className="">MirbInvestments</span>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
        <div className="mb-4 mt-0 border-t pt-4 text-center text-sm">
          <Button variant="link" asChild className="text-primary">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
