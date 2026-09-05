import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NewsletterSubscriptionParams {
  email: string;
  userId?: string;
}

export async function subscribeToNewsletter(params: NewsletterSubscriptionParams): Promise<{ success: boolean; error?: string; id?: string }> {
  const emailTrimmed = params.email?.trim().toLowerCase();

  if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!db) {
    return { success: false, error: 'Database connection is not available.' };
  }

  try {
    const subscriptionsRef = collection(db, 'newsletterSubscriptions');
    
    const q = query(subscriptionsRef, where('email', '==', emailTrimmed));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, error: 'This email is already subscribed.' };
    }

    const docRef = await addDoc(subscriptionsRef, {
      email: emailTrimmed,
      userId: params.userId || null,
      subscribedAt: Timestamp.now(),
    });

    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Could not subscribe. Please try again later.';
    return { success: false, error: errorMessage };
  }
}
