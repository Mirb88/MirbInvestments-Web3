'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth } from './use-auth';
import type { PortfolioHolding, PurchaseHistoryItem, CryptoData, WithdrawalHistoryItem, DepositHistoryItem, CryptoDepositNotification } from '@/lib/types';
import { buildersChoiceOptions, allCoinIdsForPortfolio } from '@/lib/data';
import { collection, query, where, Timestamp, getDocs, onSnapshot } from 'firebase/firestore';
import { getCryptoData } from '@/services/coingecko';

interface PortfolioState {
  holdings: PortfolioHolding[];
  totalValue: number;
  totalInitialInvestment: number;
  totalGainLoss: number;
}

interface PortfolioContextType {
  portfolio: PortfolioState;
  purchaseHistory: PurchaseHistoryItem[];
  depositHistory: DepositHistoryItem[];
  withdrawalHistory: WithdrawalHistoryItem[];
  cryptoData: CryptoData[];
  isLoading: boolean;
  pricesError: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

const initialPortfolioState: PortfolioState = {
  holdings: [],
  totalValue: 0,
  totalInitialInvestment: 0,
  totalGainLoss: 0,
};

type TransactionData = {
    purchases: PurchaseHistoryItem[];
    deposits: DepositHistoryItem[];
    withdrawals: WithdrawalHistoryItem[];
};

const completedStatuses = ['completed', 'verified', 'Finished'];

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { user, db } = useAuth();
  
  const [transactions, setTransactions] = useState<TransactionData>({
      purchases: [],
      deposits: [],
      withdrawals: [],
  });
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isPricesLoading, setIsPricesLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [pricesError, setPricesError] = useState<string | null>(null);

  const isLoading = isPricesLoading || isTransactionsLoading;
  
  useEffect(() => {
    async function fetchCryptoData() {
        const { data, error } = await getCryptoData(allCoinIdsForPortfolio);
        if (data) setCryptoData(data);
        if (error) setPricesError(error);
        setIsPricesLoading(false);
    }
    fetchCryptoData();
  }, []);

   useEffect(() => {
    // ELITE BOT-SHIELD: Strictly disable Firestore listeners for bots
    const isBot = typeof window !== 'undefined' && /googlebot|lighthouse|chrome-lighthouse|bingbot|baiduspider|yandexbot|slurp|duckduckbot|mediapartners-google/i.test(window.navigator.userAgent);

    if (!user || !db || isBot) {
        setTransactions({ purchases: [], deposits: [], withdrawals: [] });
        setIsTransactionsLoading(false);
        return;
    }

    setIsTransactionsLoading(true);

    const fetchAllTransactions = async () => {
      try {
        const [
          purchasesSnapshot,
          fiatDepositsSnapshot,
          cryptoDepositsSnapshot,
          fiatWithdrawalsSnapshot,
          cryptoWithdrawalsSnapshot,
        ] = await Promise.all([
          getDocs(query(collection(db, 'purchases'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'fiatDeposits'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'cryptoDepositNotifications'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'fiatWithdrawals'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'cryptoWithdrawals'), where('userId', '==', user.uid)))
        ]);

        const purchases = purchasesSnapshot.docs.map(doc => ({
          id: doc.id,
          date: (doc.data().createdAt as Timestamp)?.toDate().toLocaleDateString(),
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
          type: 'purchase'
        })) as PurchaseHistoryItem[];

        const fiatDeposits = fiatDepositsSnapshot.docs.map(doc => ({
          id: doc.id,
          date: (doc.data().createdAt as Timestamp)?.toDate().toLocaleDateString(),
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
          type: 'deposit',
        })) as DepositHistoryItem[];
        
        const cryptoDeposits = cryptoDepositsSnapshot.docs.map(doc => ({
          id: doc.id,
          date: (doc.data().createdAt as Timestamp)?.toDate().toLocaleDateString(),
          ...doc.data(),
          assetSymbol: (doc.data() as CryptoDepositNotification).symbol, 
          createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
          type: 'deposit'
        })) as DepositHistoryItem[];
        
        const fiatWithdrawals = fiatWithdrawalsSnapshot.docs.map(doc => ({
          id: doc.id,
          date: (doc.data().createdAt as Timestamp)?.toDate().toLocaleDateString(),
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
          type: 'withdrawal'
        })) as WithdrawalHistoryItem[];

        const cryptoWithdrawals = cryptoWithdrawalsSnapshot.docs.map(doc => ({
          id: doc.id,
          date: (doc.data().createdAt as Timestamp)?.toDate().toLocaleDateString(),
          ...doc.data(),
          createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
          type: 'withdrawal'
        })) as WithdrawalHistoryItem[];
        
        setTransactions({
          purchases,
          deposits: [...fiatDeposits, ...cryptoDeposits],
          withdrawals: [...fiatWithdrawals, ...cryptoWithdrawals],
        });

      } catch (error) {
        console.error("Portfolio Fetch Error:", error);
      } finally {
        setIsTransactionsLoading(false);
      }
    };
    
    fetchAllTransactions();

    // TERMINATION LOGIC: Singleton listeners with proper unsubscription
    const collectionsToListen = ['purchases', 'fiatDeposits', 'cryptoDepositNotifications', 'fiatWithdrawals', 'cryptoWithdrawals'];
    const unsubscribers = collectionsToListen.map(collectionName => {
        const q = query(collection(db, collectionName), where('userId', '==', user.uid));
        return onSnapshot(q, () => {
            fetchAllTransactions();
        });
    });

    return () => {
        unsubscribers.forEach(unsub => unsub());
    };
  }, [user, db]);

  const [portfolio, setPortfolio] = useState<PortfolioState>(initialPortfolioState);

  useEffect(() => {
    if (!user || isLoading || cryptoData.length === 0) {
      setPortfolio(initialPortfolioState);
      return;
    }
    
    const holdingsMap = new Map<string, { quantity: number; initialCost: number }>();
    let totalInitialInvestment = 0;
    
    const allCryptoDataMap = new Map(cryptoData.map(c => [c.id, c]));
    const allCoinDataBySymbol = new Map(cryptoData.map(c => [c.symbol.toLowerCase(), c]));
    
    const usdtCoinInfo = buildersChoiceOptions.find(c => c.symbol === 'USDT');
    if (usdtCoinInfo) {
      holdingsMap.set(usdtCoinInfo.id, { quantity: 0, initialCost: 0 });
    }
    
    const allTransactionsSorted = [
      ...transactions.purchases,
      ...transactions.deposits,
      ...transactions.withdrawals
    ].sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));

    allTransactionsSorted.forEach(tx => {
      const isCompleted = completedStatuses.includes(tx.status.toLowerCase());

      if (tx.type === 'deposit' && isCompleted) {
        const deposit = tx as any;
        const valueAtTimeOfDeposit = deposit.valueAtDeposit || deposit.amount;
        totalInitialInvestment += valueAtTimeOfDeposit;
        const isFiat = 'currency' in deposit && deposit.currency?.toLowerCase() === 'usd';
        const symbol = (isFiat ? 'usdt' : (deposit.assetSymbol || '')).toLowerCase();
        if (symbol) {
            const coinData = allCoinDataBySymbol.get(symbol);
            if (coinData) {
                const current = holdingsMap.get(coinData.id) || { quantity: 0, initialCost: 0 };
                current.quantity += deposit.amount;
                current.initialCost += valueAtTimeOfDeposit;
                holdingsMap.set(coinData.id, current);
            }
        }
      } else if (tx.type === 'purchase' && isCompleted) {
          const purchase = tx as PurchaseHistoryItem;
          const usdtCoinData = buildersChoiceOptions.find(c => c.symbol === 'USDT');
          if (usdtCoinData) {
              const usdtHolding = holdingsMap.get(usdtCoinData.id) || { quantity: 0, initialCost: 0 };
              const costRatio = usdtHolding.initialCost > 0 && usdtHolding.quantity > 0 ? usdtHolding.initialCost / usdtHolding.quantity : 1;
              usdtHolding.initialCost -= purchase.amount * costRatio;
              usdtHolding.quantity -= purchase.amount;
              holdingsMap.set(usdtCoinData.id, usdtHolding);
          }
          const assetsInPurchase = purchase.assets || [];
          const valuePerAsset = assetsInPurchase.length > 0 ? purchase.amount / assetsInPurchase.length : 0;
          assetsInPurchase.forEach(asset => {
              if (asset.id && asset.purchasePrice && asset.purchasePrice > 0) {
                  const quantityToAdd = valuePerAsset / asset.purchasePrice;
                  const currentAsset = holdingsMap.get(asset.id) || { quantity: 0, initialCost: 0 };
                  currentAsset.quantity += quantityToAdd;
                  currentAsset.initialCost += valuePerAsset; 
                  holdingsMap.set(asset.id, currentAsset);
              }
          });
      } else if (tx.type === 'withdrawal') {
          const withdrawal = tx as WithdrawalHistoryItem;
          if (isCompleted) {
            const valueAtWithdrawal = withdrawal.valueAtWithdrawal || withdrawal.amount;
            totalInitialInvestment -= valueAtWithdrawal;
          }
          const isPendingOrCompleted = !['failed', 'rejected'].includes(tx.status.toLowerCase());
          if (isPendingOrCompleted) {
              const isFiat = 'currency' in withdrawal;
              const symbol = isFiat ? 'usdt' : (withdrawal.assetSymbol || '').toLowerCase();
              const coinInfo = allCoinDataBySymbol.get(symbol);
              if (coinInfo) {
                  const current = holdingsMap.get(coinInfo.id);
                  if (current && current.quantity >= withdrawal.amount) {
                      const costRatio = current.initialCost > 0 && current.quantity > 0 ? current.initialCost / current.quantity : 1;
                      current.initialCost -= withdrawal.amount * costRatio;
                      current.quantity -= withdrawal.amount;
                      holdingsMap.set(coinInfo.id, current);
                  }
              }
          }
      }
    });

    let totalValue = 0;
    const finalHoldings: PortfolioHolding[] = [];
    holdingsMap.forEach((holding, id) => {
        if (holding.quantity > 0.000001) { 
            const coinInfo = allCryptoDataMap.get(id);
            if (coinInfo) {
                const currentValue = holding.quantity * coinInfo.current_price;
                totalValue += currentValue;
                finalHoldings.push({
                    id: coinInfo.id,
                    name: coinInfo.name,
                    symbol: coinInfo.symbol.toUpperCase(),
                    image: coinInfo.image,
                    quantity: holding.quantity,
                    currentValueUSD: currentValue,
                });
            }
        }
    });
    
    const totalGainLoss = totalValue - totalInitialInvestment;
    const usdtHolding = finalHoldings.find(h => h.symbol === 'USDT');
    const sortedHoldings = [
      ...finalHoldings.filter(h => h.symbol !== 'USDT').sort((a,b) => b.currentValueUSD - a.currentValueUSD)
    ];
    if (usdtHolding) sortedHoldings.push(usdtHolding);

    setPortfolio({ holdings: sortedHoldings, totalValue, totalInitialInvestment, totalGainLoss });
  }, [user, transactions, cryptoData, isLoading]);
  
  const value = {
    portfolio,
    purchaseHistory: [...transactions.purchases].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)),
    depositHistory: [...transactions.deposits].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)),
    withdrawalHistory: [...transactions.withdrawals].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)),
    cryptoData,
    isLoading,
    pricesError,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
