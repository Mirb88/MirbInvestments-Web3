import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ExchangeRequestParams {
  userId: string;
  userEmail: string;
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
}

export async function createExchangeRequest(params: ExchangeRequestParams) {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }

    const docRef = await addDoc(collection(db, 'exchangeRequests'), {
      ...params,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create exchange request';
    return { success: false, error: errorMessage };
  }
}
