
export type CryptoCoin = {
  id: string;
  name: string;
  symbol: string;
};

export type CryptoBundle = {
  id: string;
  name: string;
  price: number;
  description: string;
  coins: CryptoCoin[];
};

export type PortfolioHolding = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  currentValueUSD: number;
  image?: string;
};

export type PortfolioPerformanceData = {
  date: string;
  value: number;
};

export type PurchasedAsset = {
  symbol: string;
  amount: number;
  id?: string; // Add optional ID for easier mapping
  purchasePrice?: number; // Price per coin at the time of purchase
};

export type PurchaseHistoryItem = {
  id: string;
  date: string;
  bundleId?: string;
  bundleName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  assets?: PurchasedAsset[];
  createdAt?: Date;
  type: 'purchase';
};

export type FaqItem = {
  id:string;
  question: string;
  answer: string;
};

export type AiInsight = {
  id: string;
  slug: string;
  title: string;
  snippet: string;
  fullContent: string;
  category: 'Market Analysis' | 'Token Spotlight' | "Beginner's Guide" | "Crypto Events";
  relatedTerms?: string[];
  isFeatured?: boolean;
};

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export type FiatDepositRequest = {
  id: string;
  userId: string;
  userEmail: string | null;
  amount: number;
  currency: 'usd' | 'eur';
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
  valueAtDeposit?: number;
};

export type CryptoDepositNotification = {
  id?: string;
  userId: string;
  userEmail: string | null;
  asset: string;
  symbol: string;
  network: string;
  amount: number;
  txHash: string | null;
  notes: string | null;
  status: 'pending' | 'verified' | 'rejected' | 'completed';
  createdAt?: Date;
  valueAtDeposit?: number;
};

export type CryptoWithdrawalRequest = {
  id: string;
  userId: string;
  userEmail: string | null;
  assetId: string;
  assetSymbol: string;
  amount: number;
  walletAddress: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: Date;
  valueAtWithdrawal?: number;
};

export type FiatWithdrawalRequest = {
  id: string;
  userId: string;
  userEmail: string | null;
  amount: number;
  currency: 'usd' | 'eur';
  bankName: string;
  accountNumber: string;
  swiftBic: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: Date;
  valueAtWithdrawal?: number;
};

export type DepositHistoryItem = {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected' | 'completed';
  type: 'deposit';
  assetSymbol?: string; // e.g. BTC, ETH
  currency?: 'usd' | 'eur'; // e.g. usd, eur
  createdAt?: Date;
  valueAtDeposit?: number;
}

export type WithdrawalHistoryItem = {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: 'withdrawal';
  assetSymbol?: string; // e.g. BTC, ETH
  currency?: 'usd' | 'eur';
  createdAt?: Date;
  valueAtWithdrawal?: number;
};

export type UserMessage = {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
  dateString: string;
  type: 'info' | 'success' | 'warning' | 'error';
};

export type SeoMetadata = {
    title: string;
    description: string;
    keywords: string[];
    jsonLd: string;
    // openGraph, twitter, etc. can be added here if needed
};

export type ExchangeRequest = {
    userId: string;
    email: string;
    exchangeType: 'buy' | 'sell';
    asset: string; // e.g., "Bitcoin" or "USDT"
    amount: number;
    status: 'new' | 'contacted' | 'completed' | 'cancelled';
    createdAt: Date;
};
