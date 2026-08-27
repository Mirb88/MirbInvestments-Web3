import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { ExchangeRequest } from '@/lib/types';

/**
 * Creates a new exchange request document in Firestore.
 * This is for the "Reserved Crypto Exchange" feature.
 *
 * @param data - The data for the exchange request.
 * @returns An object indicating success or failure.
 */
export async function createExchangeRequest(
  db: Firestore,
  data: Omit<ExchangeRequest, 'status' | 'createdAt'>
) {
  if (!data.userId || !data.email || !data.asset || !data.amount) {
    return { success: false, error: 'Missing required fields for exchange request.' };
  }

  try {
    const docRef = await addDoc(collection(db, 'exchangeRequests'), {
      ...data,
      status: 'new', // Initial status
      createdAt: Timestamp.now(),
    });
    console.log('Exchange request written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding exchange request: ', e);
    return { success: false, error: e.message || 'Could not submit exchange request.' };
  }
}
