'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  ShieldCheck,
  Zap,
  Gauge,
  UserCheck,
  Info,
  HelpCircle,
  ArrowRight,
  LoaderCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { simpleCryptoOptions } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { createExchangeRequest } from '@/services/exchange';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

const keyBenefits = [
  {
    icon: Gauge,
    title: 'Guaranteed Rates',
    description:
      'The rate we confirm is the rate you get. No last-minute surprises.',
  },
  {
    icon: ShieldCheck,
    title: 'Extremely Low Slippage',
    description:
      'Our deep liquidity access ensures your price is protected from market volatility during the exchange.',
  },
  {
    icon: Zap,
    title: 'Blazing-Fast Settlement',
    description:
      'Once confirmed, your transaction can be processed and settled in minutes, not hours.',
  },
  {
    icon: UserCheck,
    title: 'Personalized OTC Service',
    description:
      'This is your private, over-the-counter (OTC) desk. We handle everything for you.',
  },
];


const assets = [
  ...simpleCryptoOptions,
  { value: 'eur', label: 'Euro (EUR)' },
  { value: 'bam', label: 'Bosnian Mark (BAM)' },
];

function ExchangeForm() {
  const { user, db } = useAuth();
  const { toast } = useToast();
  const [exchangeType, setExchangeType] = useState<'buy' | 'sell'>('sell');
  const [asset, setAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) {
       toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to submit an exchange request.',
      });
      return;
    }
    if (!asset || !amount) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select an asset and enter an amount.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await createExchangeRequest(db, {
        userId: user.uid,
        email: user.email!, // We know user exists here, so email should too
        exchangeType,
        asset,
        amount: parseFloat(amount),
      });

      if (result.success) {
        toast({
          title: 'Request Submitted!',
          description:
            "We've received your exchange request. Our team will contact you shortly via email to confirm the rate and details.",
        });
        setAsset('');
        setAmount('');
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Exchange Request</CardTitle>
        <CardDescription>
          Submit your request, and our team will contact you with a guaranteed
          rate and settlement details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>How It Works</AlertTitle>
            <AlertDescription>
              The final exchange rate is based on live market conditions when
              our team contacts you for confirmation.
              <Button variant="link" asChild className="p-0 h-auto ml-1">
                <Link href={ROUTES.DASHBOARD + '#live-market-prices'}>Check live prices here.</Link>
              </Button>
            </AlertDescription>
          </Alert>

          <RadioGroup
            value={exchangeType}
            onValueChange={(value: 'buy' | 'sell') => setExchangeType(value)}
            className="grid grid-cols-2 gap-4"
          >
              <Label
                htmlFor="sell"
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                  exchangeType === 'sell' && 'border-primary text-primary'
                )}
              >
                <RadioGroupItem value="sell" id="sell" className="sr-only" />
                Sell Crypto
              </Label>
              <Label
                htmlFor="buy"
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                  exchangeType === 'buy' && 'border-primary text-primary'
                )}
              >
                <RadioGroupItem value="buy" id="buy" className="sr-only" />
                Buy Crypto
              </Label>
          </RadioGroup>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="asset">Asset</Label>
              <Select
                value={asset}
                onValueChange={setAsset}
                disabled={isLoading}
              >
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset..." />
                </SelectTrigger>
                <SelectContent>
                  {assets.map((opt) => (
                    <SelectItem key={opt.value} value={opt.label}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 0.5 or 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !asset || !amount}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2" /> Submitting...
              </>
            ) : (
              'Submit Exchange Request'
            )}
          </Button>

           {!user && (
            <p className="text-center text-sm text-muted-foreground">
                <Button variant="link" className="p-0 h-auto" onClick={() => router.push(ROUTES.LOGIN)}>Log in</Button> or <Button variant="link" className="p-0 h-auto" onClick={() => router.push(ROUTES.REGISTER)}>sign up</Button> to submit a request.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export function ExchangePageContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto flex h-[calc(100vh-10rem)] flex-col items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          MirbInvestments Exchange
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your reserved gateway for crypto & fiat. We facilitate secure, swift,
          and simple exchanges with guaranteed rates.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <ExchangeForm />
        <div className="space-y-8 pt-2">
            {keyBenefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-1">
                        <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-lg">{benefit.title}</p>
                        <p className="text-sm text-muted-foreground">
                        {benefit.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Card className="mt-12 border-dashed">
        <CardHeader className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                 <HelpCircle className="h-8 w-8 flex-shrink-0 text-primary" />
                <CardTitle>Need it faster?</CardTitle>
              </div>
              <CardDescription className="pt-2">
                For urgent exchanges, contact our team directly to get a
                guaranteed rate and settlement in minutes.
              </CardDescription>
            </div>
          </div>
          <Button asChild className="mt-4 w-full md:w-auto md:mt-0 md:flex-shrink-0">
            <Link href={ROUTES.SUPPORT + '#direct-contact-options'}>
              Express Exchange Support <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
