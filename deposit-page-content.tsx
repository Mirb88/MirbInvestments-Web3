
'use client';

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
import { ArrowDownToLine, Copy, Landmark, Bitcoin, AlertTriangle, Info, CheckCircle, LoaderCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cryptoOptions } from '@/lib/data';
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createFiatDepositRequest, createCryptoDepositNotification } from '@/services/deposit';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


function CryptoDeposit() {
  const { user, db } = useAuth();
  const { toast } = useToast();
  
  // State for the deposit address selection
  const [selectedAsset, setSelectedAsset] = useState('');

  // State for the notification form
  const [email, setEmail] = useState('');
  const [amountSent, setAmountSent] = useState('');
  const [txHash, setTxHash] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const selectedOption = useMemo(() => {
    return cryptoOptions.find(opt => opt.value === selectedAsset);
  }, [selectedAsset]);

  const handleCopy = () => {
    if (selectedOption) {
      navigator.clipboard.writeText(selectedOption.address);
      toast({
        title: 'Address Copied!',
        description: 'The wallet address has been copied to your clipboard.',
      });
    }
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedOption || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please log in and select an asset.' });
      return;
    }
    if (!amountSent || !email) {
      toast({ variant: 'destructive', title: 'Fields Required', description: 'Please enter the amount you sent and your email.' });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createCryptoDepositNotification(db, {
        userId: user.uid,
        userEmail: email,
        asset: selectedOption.label,
        symbol: selectedOption.symbol,
        network: selectedOption.network,
        amount: parseFloat(amountSent),
        txHash: txHash || null,
        notes: notes || null,
      });

      if (result.success) {
        toast({
          title: 'Notification Sent!',
          description: "We've received your deposit notification. It will be reviewed shortly.",
        });
        // Reset form
        setAmountSent('');
        setTxHash('');
        setNotes('');
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Submission Failed', description: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Asset</Label>
        <Select value={selectedAsset} onValueChange={setSelectedAsset}>
          <SelectTrigger>
            <SelectValue placeholder="Select a crypto asset" />
          </SelectTrigger>
          <SelectContent>
            {cryptoOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedOption && (
        <div className="space-y-4">
          <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
            <Label>Deposit {selectedOption.symbol} to the address below</Label>
            <div className="flex items-center space-x-2 rounded-md border bg-background p-2">
              <input
                className="flex-1 bg-transparent text-sm font-mono outline-none"
                value={selectedOption.address}
                readOnly
              />
              <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy address">
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
                Network: <span className="font-semibold text-foreground">{selectedOption.network}</span>
            </p>
            
            <p className="text-sm text-muted-foreground">
              Minimum Deposit: <span className="font-semibold text-foreground">{selectedOption.minDeposit} {selectedOption.symbol}</span>
            </p>

            <div className="flex items-start space-x-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-xs">
                    Important: Send only {selectedOption.symbol} on the {selectedOption.network} network to this address. Sending any other asset will result in a permanent loss of funds.
                </p>
            </div>

            <div className="flex items-start space-x-3 rounded-lg border border-primary/50 bg-primary/10 p-3 text-primary">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-xs space-y-1">
                    <p className="font-semibold">Transaction Status</p>
                    <p>
                        Your deposit will be credited after network confirmations. This usually takes a few minutes to an hour depending on the network.
                    </p>
                    <p>
                        Ensure you send an amount sufficient to cover any network transaction fees, in addition to the minimum deposit.
                    </p>
                </div>
            </div>
          </div>
          
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-primary text-xl">Notify Us About Your Sent Deposit</CardTitle>
              <CardDescription>
                After sending your crypto, please fill out this form so we can track and verify your deposit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotifySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email-notify">Your Email</Label>
                        <Input 
                            id="email-notify"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isProcessing || !!user?.email}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount-sent">Amount Sent ({selectedOption.symbol})</Label>
                      <Input 
                        id="amount-sent"
                        type="number"
                        placeholder={`e.g., 0.005`}
                        value={amountSent}
                        onChange={(e) => setAmountSent(e.target.value)}
                        disabled={isProcessing}
                        required
                      />
                    </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="tx-hash">Transaction Hash (Optional)</Label>
                  <Input 
                    id="tx-hash"
                    type="text"
                    placeholder="e.g., 0x123abc..."
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="e.g., Sent from my Binance account."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                 <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Notify Deposit
                      </>
                    )}
                 </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}


function FiatConfirmationModal({
    isOpen,
    onClose,
    amount,
    currency
}: { isOpen: boolean; onClose: () => void; amount: number; currency: string; }) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl text-center">Request Submitted</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Your deposit request for <strong>{amount.toLocaleString('en-US', { style: 'currency', currency: currency.toUpperCase() })}</strong> has been received. Our team will contact you shortly with instructions on how to complete your deposit.
                    </DialogDescription>
                </DialogHeader>
                 <DialogFooter className="mt-4">
                    <Button onClick={onClose} className="w-full">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function FiatDeposit() {
  const { user, db } = useAuth();
  const { toast } = useToast();
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{amount: number; currency: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) {
        toast({ variant: "destructive", title: "Authentication Required", description: "You must be logged in to submit a deposit request." });
        return;
    }
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid, positive amount." });
        return;
    }

    setIsProcessing(true);
    try {
        const result = await createFiatDepositRequest(db, user.uid, user.email, depositAmount, currency as 'usd');
        if (result.success) {
            setSubmittedData({ amount: depositAmount, currency });
            setIsModalOpen(true);
            setAmount(''); // Reset form
        } else {
            throw new Error(result.error || "An unknown error occurred");
        }
    } catch (error) {
        console.error("Error creating fiat deposit request:", error);
        toast({ variant: "destructive", title: "Request Failed", description: "Could not submit your deposit request. Please try again." });
    } finally {
        setIsProcessing(false);
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
        <Label htmlFor="fiat-currency">Currency</Label>
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
        <Label htmlFor="fiat-amount">Amount (USD)</Label>
        <Input 
            id="fiat-amount" 
            type="number" 
            placeholder="e.g., 100.00" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isProcessing}
            required
        />
      </div>
      
      <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Multi-Currency Payments</AlertTitle>
          <AlertDescription>
            You can complete the payment in your local currency (e.g., EUR). Please ensure the final amount received, after conversions, matches the requested USD amount.
          </AlertDescription>
      </Alert>

      <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
        <h4 className="font-semibold text-foreground">Processing Information</h4>
        <p className="text-sm text-muted-foreground">
          Fiat deposits are typically processed within a few minutes but can take longer depending on the payment method and bank processing times. After submitting this request, we will contact you with instructions on how to complete your deposit.
        </p>
        <p className="text-sm text-muted-foreground pt-2">
          The equivalent value in USDT will be credited to your account upon successful deposit.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isProcessing || !amount}>
        {isProcessing ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
         "Proceed to Deposit"
        )}
      </Button>
    </form>
     <FiatConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={submittedData?.amount || 0}
        currency={submittedData?.currency || ''}
      />
    </>
  )
}

export function DepositPageContent() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <ArrowDownToLine className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl lg:text-5xl">Deposit Funds</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Easily add funds to your MirbInvestments account to start investing.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Choose Deposit Method</CardTitle>
          <CardDescription>
            Select whether you want to deposit cryptocurrency or fiat money.
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
              <CryptoDeposit />
            </TabsContent>
            <TabsContent value="fiat" className="mt-6">
              <FiatDeposit />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
