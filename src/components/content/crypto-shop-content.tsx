'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  PieChart,
  AlertTriangle,
  PlusCircle,
  Gift,
  Bot,
  LoaderCircle,
  Lightbulb,
  Info,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';

import { cryptoBundles, buildersChoiceOptions } from '@/lib/data';
import type { CryptoBundle, CryptoCoin } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { createPurchase } from '@/services/purchase';
import { CryptoMarquee } from '@/components/layout/crypto-marquee';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/hooks/use-portfolio';

const CryptoIcon = ({ symbol }: { symbol: string }) => {
  const { cryptoData } = usePortfolio() as any;
  const cryptoList = Array.isArray(cryptoData) ? cryptoData : [];
  const coinData = cryptoList.find(
    (c: any) => c.symbol?.toUpperCase() === symbol.toUpperCase()
  );

  if (coinData?.image) {
    return (
      <Image
        src={coinData.image}
        alt={`${symbol} logo`}
        width={24}
        height={24}
        className="rounded-full"
        unoptimized
      />
    );
  }

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bnb-gold/20 text-bnb-gold text-xs font-bold">
      {symbol.slice(0, 1)}
    </div>
  );
};

function PurchaseSingleCoinModal({
  coin,
  isOpen,
  onClose,
}: {
  coin: (CryptoCoin & { price: number }) | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [amountUSD, setAmountUSD] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmountUSD('');
    }
  }, [isOpen]);

  if (!coin || !db) return null;

  const estimatedQuantity =
    parseFloat(amountUSD) > 0 && coin.price > 0
      ? parseFloat(amountUSD) / coin.price
      : 0;

  const handleProceed = async () => {
    if (!user || !coin || !amountUSD || parseFloat(amountUSD) <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Input',
        description: 'Please enter a valid amount in USD.',
      });
      return;
    }
    setIsProcessing(true);
    try {
      const singleCoinBundle: CryptoBundle = {
        id: `single-${coin.id}`,
        name: `Purchase of ${coin.name}`,
        price: parseFloat(amountUSD),
        description: `Single asset purchase of ${coin.symbol}`,
        coins: [{ id: coin.id, name: coin.name, symbol: coin.symbol }],
      };

      const result = await createPurchase(
        db,
        user.uid,
        user.email || 'N/A',
        singleCoinBundle
      );

      if (result.success) {
        toast({
          title: 'Purchase Request Submitted!',
          description:
            'Your request has been received. Our team will process it shortly. The assets will appear in your portfolio upon completion.',
        });
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Could not save your purchase record. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: errorMessage,
      });
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Buy {coin.name} ({coin.symbol})
          </DialogTitle>
          <DialogDescription>
            Enter the amount in USD you wish to purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount-usd">Amount in USD</Label>
            <Input
              id="amount-usd"
              type="number"
              placeholder="e.g., 50"
              value={amountUSD}
              onChange={(e) => setAmountUSD(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          {estimatedQuantity > 0 && (
            <p className="text-sm text-muted-foreground">
              You will receive approx.{' '}
              <span className="font-bold text-primary">
                {estimatedQuantity.toLocaleString('en-US', {
                  maximumFractionDigits: 8,
                })}{' '}
                {coin.symbol}
              </span>
              .
            </p>
          )}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Internal Processing</AlertTitle>
            <AlertDescription>
              Upon confirmation, ${amountUSD || 0} will be deducted from your
              available USDT balance. If your balance is insufficient, our team
              will contact you.
            </AlertDescription>
          </Alert>
          <div className="flex items-start space-x-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3 text-yellow-300">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-xs">
              The final amount of crypto received depends on market prices at the
              time of execution (slippage). Our team always strives to minimize
              this. All transactions are final.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleProceed}
            disabled={isProcessing || !amountUSD || parseFloat(amountUSD) <= 0}
          >
            {isProcessing
              ? 'Processing...'
              : `Purchase for $${amountUSD || '0'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PurchaseModal({
  bundle,
  isOpen,
  onClose,
}: {
  bundle: CryptoBundle | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bundle || !db) return null;

  const handleProceed = async () => {
    if (!user || !bundle) return;
    setIsProcessing(true);
    try {
      const result = await createPurchase(
        db,
        user.uid,
        user.email || 'N/A',
        bundle
      );
      if (result.success) {
        toast({
          title: 'Purchase Request Submitted!',
          description:
            'Your request has been received. Our team will process it shortly. The assets will appear in your portfolio upon completion.',
        });
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Could not save your purchase record. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: errorMessage,
      });
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Purchase</DialogTitle>
          <DialogDescription>
            You are about to purchase the <strong>{bundle.name}</strong> for{' '}
            <strong>${bundle.price}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Internal Processing</AlertTitle>
            <AlertDescription>
              Upon confirmation, ${bundle.price} will be deducted from your
              available USDT balance. If your balance is insufficient, our team
              will contact you with options to complete the deposit.
            </AlertDescription>
          </Alert>
          <div className="flex items-start space-x-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3 text-yellow-300">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-xs">
              The final amount of crypto received depends on market prices at the
              time of execution. Due to market volatility, there may be a small
              difference (slippage) between the expected and final price. Our
              team always strives to minimize this. All transactions are final.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleProceed} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'I Understand & Proceed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BundleCard({
  bundle,
  onPurchase,
  isRecommended,
}: {
  bundle: CryptoBundle;
  onPurchase: (bundle: CryptoBundle) => void;
  isRecommended?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecommended && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isRecommended]);

  return (
    <Card
      ref={cardRef}
      className={cn(
        'flex flex-col transition-all duration-300',
        isRecommended
          ? 'border-primary ring-2 ring-primary shadow-lg'
          : ''
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{bundle.name}</CardTitle>
          <Badge variant="outline">
            <PieChart className="mr-2 h-4 w-4 text-bnb-gold" />
            {bundle.coins.length} Assets
          </Badge>
        </div>
        <CardDescription>{bundle.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Contains:
          </p>
          <div className="flex flex-wrap gap-2">
            {bundle.coins.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm"
              >
                <CryptoIcon symbol={coin.symbol} />
                <span>{coin.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Est. amounts vary with market price.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-3xl font-bold text-primary">${bundle.price}</p>
        <Button
          aria-label={`Purchase ${bundle.name}`}
          onClick={() => onPurchase(bundle)}
        >
          Purchase Bundle
        </Button>
      </CardFooter>
    </Card>
  );
}

function BuildersChoiceCard({
  bundle,
  onPurchase,
  isRecommended,
}: {
  bundle: CryptoBundle;
  onPurchase: (bundle: CryptoBundle) => void;
  isRecommended?: boolean;
}) {
  const [selectedCoinId, setSelectedCoinId] = useState(
    buildersChoiceOptions[0].id
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecommended && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isRecommended]);

  const handlePurchase = () => {
    const selectedCoin = buildersChoiceOptions.find(
      (c) => c.id === selectedCoinId
    );
    if (!selectedCoin) return;

    const purchaseBundle: CryptoBundle = {
      ...bundle,
      name: `${bundle.name} (${selectedCoin.symbol})`,
      coins: [selectedCoin],
    };
    onPurchase(purchaseBundle);
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        'flex flex-col transition-all duration-300',
        isRecommended
          ? 'border-primary ring-2 ring-primary shadow-lg'
          : 'border-primary/50'
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{bundle.name}</CardTitle>
          <Badge variant="outline" className="border-accent text-accent">
            <Gift className="mr-2 h-4 w-4" />
            Bonus Included
          </Badge>
        </div>
        <CardDescription>{bundle.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              1. Choose your main asset:
            </p>
            <Select value={selectedCoinId} onValueChange={setSelectedCoinId}>
              <SelectTrigger aria-label="Select token for builder's choice">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {buildersChoiceOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center gap-2">
                      <CryptoIcon symbol={option.symbol} />
                      <span>
                        {option.name} ({option.symbol})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              2. Get this bonus asset on us:
            </p>
            <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm">
              <CryptoIcon symbol={'✨'} />
              <div>
                <span className="font-semibold">A surprise bonus asset!</span>
                <p className="text-xs text-muted-foreground">
                  A promising crypto hand-picked by our team.
                </p>
              </div>
              <PlusCircle className="ml-auto h-4 w-4 text-green-400" />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Est. amounts vary with market price.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-3xl font-bold text-primary">${bundle.price}</p>
        <Button
          aria-label={`Purchase ${bundle.name}`}
          onClick={handlePurchase}
        >
          Purchase Bundle
        </Button>
      </CardFooter>
    </Card>
  );
}

function AiAdvisor({
  onRecommendation,
}: {
  onRecommendation: (bundleId: string | null) => void;
}) {
  const [goal, setGoal] = useState<'growth' | 'gains' | 'stability' | ''>('');
  const parentRef = useRef<HTMLDivElement>(null);
  const [recommendation, setRecommendation] = useState<{
    id: string;
    reason: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = useCallback(
    async (selectedGoal: 'growth' | 'gains' | 'stability') => {
      setGoal(selectedGoal);
      onRecommendation(null);
      setRecommendation(null);
      setError(null);
      setIsLoading(true);

      parentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const goalTextMap = {
        growth: 'long-term growth',
        gains: 'fast gains with some risk',
        stability: 'stability and safety as a beginner',
      };

      const userPrompt = `You are an AI investment advisor for a crypto platform called MirbInvestments. Your goal is to recommend one of three crypto bundles to a user based on their investment goal. Be friendly and encouraging.

The available bundles are:
1. **Starter Bundle (id: starter-30)**: Contains Bitcoin, Ethereum, and Arbitrum. Good for stability and a first step into crypto.
2. **Blue-Chip Crypto (id: bluechip-100)**: Contains Bitcoin, Ethereum, and Solana. Focused on established, large-cap assets for long-term growth.
3. **Builder's Choice (id: builders-choice-75)**: Contains one user-selected major asset plus a surprise bonus coin. Good for users who want some control but also a bit of high-risk, high-reward potential (fast gains).

User's investment goal: "${goalTextMap[selectedGoal]}"

Analyze the user's goal and recommend the most suitable bundle.

- If the user mentions **stability, safety, or is a beginner**, recommend the "starter-30" bundle.
- If the user mentions **long-term growth, solid projects, or established assets**, recommend the "bluechip-100" bundle.
- If the user mentions **fast gains, risk, new projects, or wants to pick a coin**, recommend the "builders-choice-75" bundle.

Provide your response as a JSON object with "recommendedBundleId" and "recommendationReason" keys. Only return the JSON object, nothing else.`;

      try {
        const systemPromptAdvisor = `You are a private banker for elite clients of MirbInvestments. Your speech is discreet, motivating, and focused on long-term wealth growth. Avoid financial advice that sounds like gambling; promote stability, security, and the 'Human-AI Synergy' philosophy.`;

        const response = await fetch('/api/ai/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: systemPromptAdvisor },
              { role: 'user', content: userPrompt },
            ],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'An error occurred fetching the recommendation.'
          );
        }

        const result = await response.json();
        const aiContent = result.content;

        const jsonMatch = aiContent.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
        if (!jsonMatch) {
          throw new Error(
            'The AI advisor returned an invalid response. Please try again.'
          );
        }

        const jsonString = jsonMatch[1] || jsonMatch[2];
        const parsed = JSON.parse(jsonString);

        if (parsed.recommendedBundleId && parsed.recommendationReason) {
          setRecommendation({
            id: parsed.recommendedBundleId,
            reason: parsed.recommendationReason,
          });
        } else {
          throw new Error('The AI advisor response was incomplete.');
        }
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : 'Failed to communicate with the AI advisor.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [onRecommendation]
  );

  const handleShowBundle = () => {
    if (recommendation) {
      onRecommendation(recommendation.id);
    }
  };

  return (
    <Card className="bg-card mb-12" ref={parentRef}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">AI Investment Advisor</CardTitle>
            <CardDescription>
              Unsure where to start? Let our AI guide you.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground font-medium">
          What is your primary investment goal?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={goal === 'growth' ? 'default' : 'outline'}
            onClick={() => handleGetAdvice('growth')}
            disabled={isLoading}
          >
            Long-term Growth
          </Button>
          <Button
            variant={goal === 'gains' ? 'default' : 'outline'}
            onClick={() => handleGetAdvice('gains')}
            disabled={isLoading}
          >
            Fast Gains
          </Button>
          <Button
            variant={goal === 'stability' ? 'default' : 'outline'}
            onClick={() => handleGetAdvice('stability')}
            disabled={isLoading}
          >
            Stability
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center text-muted-foreground p-4 gap-2">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            <span>MirbInvestments Intelligence is analyzing your goal...</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || 'The AI Advisor is currently unavailable.'}
            </AlertDescription>
          </Alert>
        )}

        {recommendation && !isLoading && (
          <div className="space-y-4 animate-in fade-in">
            <Alert className="mt-4 bg-primary/5 border-primary/20">
              <Lightbulb className="h-4 w-4 !text-primary" />
              <AlertTitle className="text-primary">
                AI Recommendation
              </AlertTitle>
              <AlertDescription className="text-foreground">
                {recommendation.reason}
              </AlertDescription>
            </Alert>
            <Button onClick={handleShowBundle} className="w-full sm:w-auto">
              Show Me The Bundle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SingleCoinCard({
  coin,
  price,
  onPurchase,
}: {
  coin: CryptoCoin;
  price: number | undefined;
  onPurchase: (coin: CryptoCoin & { price: number }) => void;
}) {
  const { cryptoData } = usePortfolio() as any;
  const cryptoList = Array.isArray(cryptoData) ? cryptoData : [];
  const coinMarketData = cryptoList.find((c: any) => c.id === coin.id);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={
              coinMarketData?.image ||
              `https://placehold.co/40x40.png?text=${coin.symbol.slice(0, 1)}`
            }
            alt={`${coin.name} logo`}
            width={40}
            height={40}
            sizes="40px"
            className="rounded-full"
            data-ai-hint={`${coin.name.toLowerCase()}`}
          />
          <div>
            <CardTitle className="text-lg">{coin.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{coin.symbol}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Market Price</p>
        {price !== undefined ? (
          <p className="text-2xl font-bold">
            $
            {price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </p>
        ) : (
          <p className="text-2xl font-bold text-muted-foreground">Loading...</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          aria-label={`Buy ${coin.name}`}
          onClick={() => price !== undefined && onPurchase({ ...coin, price })}
          disabled={price === undefined}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CryptoShopContent() {
  const [selectedBundle, setSelectedBundle] = useState<CryptoBundle | null>(
    null
  );
  const [selectedSingleCoin, setSelectedSingleCoin] = useState<
    (CryptoCoin & { price: number }) | null
  >(null);
  const [recommendedBundleId, setRecommendedBundleId] = useState<string | null>(
    null
  );
  const { user } = useAuth();
  const { toast } = useToast();
  const { cryptoData } = usePortfolio() as any;
  const searchParams = useSearchParams();

  useEffect(() => {
    const bundleIdFromUrl = searchParams.get('bundle');
    if (bundleIdFromUrl) {
      setRecommendedBundleId(bundleIdFromUrl);
    }
  }, [searchParams]);

  const cryptoPriceMap = useMemo(() => {
    const cryptoList = Array.isArray(cryptoData) ? cryptoData : [];
    if (cryptoList.length === 0) {
      return new Map();
    }
    return new Map(cryptoList.map((c: any) => [c.id, c.current_price]));
  }, [cryptoData]);

  const handlePurchaseClick = (bundle: CryptoBundle) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to purchase a bundle.',
      });
      return;
    }

    const fullBundle = cryptoBundles.find((b) => b.id === bundle.id);
    if (fullBundle && bundle.id !== 'builders-choice-75') {
      setSelectedBundle(fullBundle);
    } else {
      setSelectedBundle(bundle);
    }
  };

  const handleSingleCoinPurchaseClick = (
    coin: CryptoCoin & { price: number }
  ) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to make a purchase.',
      });
      return;
    }
    setSelectedSingleCoin(coin);
  };

  const buildersChoiceBundle = cryptoBundles.find(
    (b) => b.id === 'builders-choice-75'
  );

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            The MirbInvestments Crypto Shop
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Forget the order books. Choose from expertly curated crypto bundles
            or buy a single asset instantly.
          </p>
        </header>

        <div className="mb-8">
          <CryptoMarquee />
        </div>

        <AiAdvisor onRecommendation={setRecommendedBundleId} />

        <section className="my-12">
          <h2 className="text-3xl font-bold text-center mb-2">
            Invest in Curated Bundles
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Let our experts guide you with pre-packaged crypto portfolios.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {cryptoBundles
              .filter((b) => b.id !== 'builders-choice-75')
              .map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  bundle={bundle}
                  onPurchase={handlePurchaseClick}
                  isRecommended={bundle.id === recommendedBundleId}
                />
              ))}
            {buildersChoiceBundle && (
              <BuildersChoiceCard
                bundle={buildersChoiceBundle}
                onPurchase={handlePurchaseClick}
                isRecommended={buildersChoiceBundle.id === recommendedBundleId}
              />
            )}
          </div>
        </section>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-lg font-medium text-muted-foreground">
              OR
            </span>
          </div>
        </div>

        <section className="my-12">
          <h2 className="text-3xl font-bold text-center mb-2">Buy Single Assets</h2>
          <p className="text-muted-foreground text-center mb-8">
            Purchase any of our supported cryptocurrencies directly.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {buildersChoiceOptions
              .filter((c) => c.symbol !== 'USDT')
              .map((coin) => (
                <SingleCoinCard
                  key={coin.id}
                  coin={coin}
                  price={cryptoPriceMap.get(coin.id)}
                  onPurchase={handleSingleCoinPurchaseClick}
                />
              ))}
          </div>
        </section>
      </div>

      <PurchaseModal
        bundle={selectedBundle}
        isOpen={!!selectedBundle}
        onClose={() => setSelectedBundle(null)}
      />
      <PurchaseSingleCoinModal
        coin={selectedSingleCoin}
        isOpen={!!selectedSingleCoin}
        onClose={() => setSelectedSingleCoin(null)}
      />
    </>
  );
}
