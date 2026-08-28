
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

export type SupportRequestData = {
    name: string;
    email: string;
    subject: string;
    message: string;
    userId?: string;
    status: 'new' | 'in_progress' | 'resolved';
    createdAt: Timestamp;
};


export async function createSupportRequest(
    db: Firestore,
    data: Omit<SupportRequestData, 'status' | 'createdAt'>
) {
  try {
    const docRef = await addDoc(collection(db, 'supportRequests'), {
      ...data,
      status: 'new',
      createdAt: Timestamp.now(),
    });
    console.log('Support request written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding support request: ', e);
    return { success: false, error: e.message || 'Could not submit support request' };
  }
}
