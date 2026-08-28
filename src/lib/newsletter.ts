import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';


export async function subscribeToNewsletter(db: Firestore, email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    const subscriptionsRef = collection(db, 'newsletterSubscriptions');
    
    // Check if the email is already subscribed
    const q = query(subscriptionsRef, where("email", "==", email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
        return { success: false, error: 'This email is already subscribed.' };
    }

    // If not subscribed, add the new email
    const docRef = await addDoc(subscriptionsRef, {
      email: email.toLowerCase(),
      subscribedAt: Timestamp.now(),
    });
    console.log('Newsletter subscription written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding newsletter subscription: ', e);
    return { success: false, error: e.message || 'Could not subscribe. Please try again later.' };
  }
}
