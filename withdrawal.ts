import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { CryptoWithdrawalRequest, FiatWithdrawalRequest } from '@/lib/types';
import { getSimpleCoinPrices } from './coingecko';


// This function is illustrative. In a real app, you'd get this from a reliable, server-side source.
async function getCurrentPrice(assetId: string): Promise<number> {
    try {
        const prices = await getSimpleCoinPrices(assetId);
        if (prices && prices[assetId]) {
            return prices[assetId].usd;
        }
        console.error(`Failed to fetch price for ${assetId}`);
        return 0;
    } catch (error) {
        console.error(`Error fetching price for ${assetId}:`, error);
        return 0;
    }
}


export async function createCryptoWithdrawalRequest(
  db: Firestore,
  data: Omit<CryptoWithdrawalRequest, 'id' | 'status' | 'createdAt' | 'valueAtWithdrawal'>
) {
  if (!data.userId) {
    return { success: false, error: 'User must be authenticated to make a withdrawal request.' };
  }

  try {
    const currentPrice = await getCurrentPrice(data.assetId);
    const valueAtWithdrawal = data.amount * currentPrice;

    const docRef = await addDoc(collection(db, 'cryptoWithdrawals'), {
      ...data,
      status: 'pending',
      createdAt: Timestamp.now(),
      valueAtWithdrawal, // Store the fixed value
    });
    console.log('Crypto withdrawal request written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding crypto withdrawal request: ', e);
    return { success: false, error: e.message || 'Could not submit crypto withdrawal request' };
  }
}

export async function createFiatWithdrawalRequest(
  db: Firestore,
  data: Omit<FiatWithdrawalRequest, 'id'| 'status' | 'createdAt'>
) {
  if (!data.userId) {
    return { success: false, error: 'User must be authenticated to make a withdrawal request.' };
  }

  try {
    const docRef = await addDoc(collection(db, 'fiatWithdrawals'), {
      ...data,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    console.log('Fiat withdrawal request written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding fiat withdrawal request: ', e);
    return { success: false, error: e.message || 'Could not submit fiat withdrawal request' };
  }
}
