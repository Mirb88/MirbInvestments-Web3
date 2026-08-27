import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { CryptoDepositNotification } from '@/lib/types';
import { getSimpleCoinPrices } from './coingecko';

async function getCurrentPrice(assetSymbol: string): Promise<number> {
    try {
        const coingeckoId = (await import('@/lib/data')).buildersChoiceOptions.find(c => c.symbol.toLowerCase() === assetSymbol.toLowerCase())?.id;
        if (!coingeckoId) {
             console.error(`No coingeckoId found for symbol ${assetSymbol}`);
             return 0;
        }
        
        const prices = await getSimpleCoinPrices(coingeckoId);
        return prices?.[coingeckoId]?.usd || 0;

    } catch (error) {
        console.error(`Error fetching price for ${assetSymbol}:`, error);
        return 0;
    }
}


export async function createFiatDepositRequest(
    db: Firestore,
    userId: string, 
    email: string | null, 
    amount: number,
    currency: 'usd'
) {
  if (!userId || !email) {
    return { success: false, error: 'User must be authenticated to make a deposit request.' };
  }
  
  try {
    const docRef = await addDoc(collection(db, 'fiatDeposits'), {
      userId,
      userEmail: email,
      amount,
      currency,
      status: 'pending',
      createdAt: Timestamp.now(),
      valueAtDeposit: amount, // For fiat, value is the amount
    });
    console.log('Fiat deposit request written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding fiat deposit request: ', e);
    return { success: false, error: e.message || 'Could not create fiat deposit request' };
  }
}

export async function createCryptoDepositNotification(
  db: Firestore,
  data: Omit<CryptoDepositNotification, 'status' | 'createdAt' | 'valueAtDeposit'>
) {
  if (!data.userId) {
    return { success: false, error: 'User must be authenticated to submit a notification.' };
  }

  try {
    const currentPrice = await getCurrentPrice(data.symbol.toLowerCase());
    const valueAtDeposit = data.amount * currentPrice;

    const docRef = await addDoc(collection(db, 'cryptoDepositNotifications'), {
      ...data,
      status: 'pending',
      createdAt: Timestamp.now(),
      valueAtDeposit,
    });
    console.log('Crypto deposit notification written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding crypto deposit notification: ', e);
    return { success: false, error: e.message || 'Could not submit notification' };
  }
}
