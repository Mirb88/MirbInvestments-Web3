'use client';

import React, { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpFromLine, Landmark, Bitcoin, Info, LoaderCircle } from 'lucide-react';
import { cryptoOptions } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createCryptoWithdrawalRequest, createFiatWithdrawalRequest } from '@/services/withdrawal';
import { usePortfolio } from '@/hooks/use-portfolio';
import { db } from '@/lib/firebase';

interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
}

function CryptoWithdrawal() {
  const { user } = useAuth();
  const { portfolio } = usePortfolio();
  const { toast } = useToast();

  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sigurno izvlačenje holdings niza sa višestepenim kastovanjem
  const holdings: Holding[] = ((portfolio as unknown) as { holdings?: Holding[] })?.holdings || [];


  const selectedHolding = useMemo(() => {
    return holdings.find((h) => h.symbol === selectedAssetSymbol);
  }, [selectedAssetSymbol, holdings]);
  
  const selectedOption = useMemo(() => {
    return cryptoOptions.find((opt) => opt.symbol === selectedAssetSymbol);
  }, [selectedAssetSymbol]);

  const handleMaxClick = () => {
    if (selectedHolding) {
      setAmount(String(selectedHolding.quantity));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Not Logged In', description: 'Please log in to submit a withdrawal request.' });
      return;
    }
    if (!selectedHolding || !amount || !address) {
      toast({ variant: 'destructive', title: 'All fields required', description: 'Please select an asset and fill in all fields.' });
      return;
    }
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid amount', description: 'Please enter a valid positive number for the amount.' });
      return;
    }
    if (withdrawalAmount > selectedHolding.quantity) {
      toast({ variant: 'destructive', title: 'Insufficient Balance', description: `You cannot withdraw more than you hold (${selectedHolding.quantity} ${selectedHolding.symbol}).` });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createCryptoWithdrawalRequest(db, {
        userId: user.uid,
        userEmail: user.email || '',
        assetId: selectedHolding.id,
        assetSymbol: selectedHolding.symbol,
        amount: withdrawalAmount,
        walletAddress: address,
      });
      if (result.success) {
        toast({ title: 'Request Submitted', description: 'Your crypto withdrawal request has been received and is being processed.' });
        setSelectedAssetSymbol('');
        setAmount('');
        setAddress('');
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed. Please try again.';
      toast({ variant: 'destructive', title: 'Submission Failed', description: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="crypto-asset-select">Asset to Withdraw</Label>
        <Select value={selectedAssetSymbol} onValueChange={setSelectedAssetSymbol} disabled={holdings.length === 0 || isProcessing}>
          <SelectTrigger id="crypto-asset-select">
            <SelectValue placeholder="Select an asset from your portfolio" />
          </SelectTrigger>
          <SelectContent>
            {holdings.length > 0 ? (
              holdings.map((holding) => (
                <SelectItem key={holding.id} value={holding.symbol}>
                  {holding.name} ({holding.quantity.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })} {holding.symbol})
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-assets" disabled>No assets in your portfolio</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="crypto-amount">Amount</Label>
        <div className="relative">
          <Input 
            id="crypto-amount" 
            type="number" 
            step="any"
            placeholder="e.g., 0.05"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isProcessing || !selectedHolding}
            className="pr-16"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMaxClick}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
            disabled={!selectedHolding || isProcessing}
          >
            Max
          </Button>
        </div>
      </div>

      {selectedOption && (
        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
            <div className="flex-grow space-y-1">
              <p><strong>Network:</strong> {selectedOption.network}</p>
              <p><strong>Minimum Withdraw:</strong> {selectedOption.minWithdrawal} {selectedOption.symbol}</p>
              <p><strong>Fee:</strong> {selectedOption.withdrawalFee} {selectedOption.symbol} <span className="text-destructive">(deducted from amount)</span></p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="address">Receiving Wallet Address</Label>
        <Input
          id="address"
          placeholder="Enter the destination wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isProcessing}
          required
        />
        <p className="text-xs text-destructive">
          Please double-check the address. Transactions are irreversible.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          'Submit Crypto Withdrawal'
        )}
      </Button>
    </form>
  );
}

function FiatWithdrawal() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftBic, setSwiftBic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Not Logged In', description: 'Please log in to submit a withdrawal request.' });
      return;
    }
    if (!amount || !bankName || !accountNumber || !swiftBic) {
      toast({ variant: 'destructive', title: 'All fields required', description: 'Please fill in all bank details.' });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createFiatWithdrawalRequest(db, {
        userId: user.uid,
        userEmail: user.email || '',
        amount: parseFloat(amount),
        currency: currency as 'usd',
        bankName,
        accountNumber,
        swiftBic,
      });

      if (result.success) {
        toast({ title: 'Request Submitted', description: 'Your fiat withdrawal request has been received.' });
        setAmount('');
        setBankName('');
        setAccountNumber('');
        setSwiftBic('');
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed. Please try again.';
      toast({ variant: 'destructive', title: 'Submission Failed', description: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fiat-currency">Select Fiat Currency</Label>
        <Select value={currency} onValueChange={setCurrency} disabled={true}>
          <SelectTrigger id="fiat-currency">
            <SelectValue placeholder="Select fiat currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD (US Dollar)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fiat-amount">Amount</Label>
        <Input 
          id="fiat-amount" 
          type="number" 
          step="any"
          placeholder="0.00" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isProcessing}
          required
        />
        <p className="text-xs text-muted-foreground">
          The requested amount will be deducted from your available USDT balance
          and converted to the selected fiat currency.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bank-name">Bank Name</Label>
        <Input 
          id="bank-name" 
          placeholder="Your Bank Name" 
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          disabled={isProcessing}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="iban">Account Number / IBAN</Label>
        <Input 
          id="iban" 
          placeholder="Your Account Number or IBAN" 
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={isProcessing}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="swift-bic">SWIFT/BIC Code</Label>
        <Input 
          id="swift-bic" 
          placeholder="Your SWIFT/BIC Code" 
          value={swiftBic}
          onChange={(e) => setSwiftBic(e.target.value)}
          disabled={isProcessing}
          required
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Withdrawals are processed within 1-3 business days. A small processing
        fee may apply.
      </p>

      <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          'Submit Fiat Withdrawal'
        )}
      </Button>
    </form>
  );
}

export function WithdrawalsPageContent() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <ArrowUpFromLine className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl">Withdraw Funds</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Securely withdraw your funds to an external wallet or bank account.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Choose Withdrawal Method</CardTitle>
          <CardDescription>
            Select whether you want to withdraw cryptocurrency or fiat money.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crypto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="crypto">
                <Bitcoin className="mr-2 h-4 w-4" /> Crypto
              </TabsTrigger>
              <TabsTrigger value="fiat">
                <Landmark className="mr-2 h-4 w-4" /> Fiat
              </TabsTrigger>
            </TabsList>
            <TabsContent value="crypto" className="mt-6">
              <CryptoWithdrawal />
            </TabsContent>
            <TabsContent value="fiat" className="mt-6">
              <FiatWithdrawal />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
