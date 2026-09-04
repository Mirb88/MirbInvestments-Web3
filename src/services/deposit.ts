import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FiatDepositParams {
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  bankRef?: string;
}

interface CryptoDepositParams {
  userId: string;
  userEmail: string;
  assetSymbol: string;
  amount: number;
  txHash: string;
}

export async function createFiatDepositRequest(params: FiatDepositParams) {
  try {
    if (!db) {
      throw new Error('Firestore database is not initialized.');
    }
    const docRef = await addDoc(collection(db, 'fiatDeposits'), {
      ...params,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create fiat deposit request.';
    return { success: false, error: errorMessage };
  }
}

export async function createCryptoDepositNotification(params: CryptoDepositParams) {
  try {
    if (!db) {
      throw new Error('Firestore database is not initialized.');
    }
    const docRef = await addDoc(collection(db, 'cryptoDeposits'), {
      ...params,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create crypto deposit notification.';
    return { success: false, error: errorMessage };
  }
}
