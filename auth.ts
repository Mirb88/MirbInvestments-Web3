import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User,
  type Auth,
} from 'firebase/auth';

export async function signUpWithEmailAndPassword(auth: Auth, email: string, password: string, displayName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

export function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return firebaseSignIn(auth, email, password);
}

export function signOut(auth: Auth) {
  return firebaseSignOut(auth);
}

export async function updateUserPassword(
  auth: Auth,
  user: User, 
  currentPassword: string, 
  newPassword: string
): Promise<void> {
  if (!user.email) {
    throw new Error("Cannot re-authenticate user without an email.");
  }
  
  // Create a credential with the user's email and current password
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    // Re-authenticate the user. This is a security measure required by Firebase.
    await reauthenticateWithCredential(user, credential);

    // If re-authentication is successful, update the password
    await updatePassword(user, newPassword);
    
  } catch (error: any) {
    // Handle potential errors, e.g., incorrect current password
    if (error.code === 'auth/wrong-password') {
      throw new Error('The current password you entered is incorrect. Please try again.');
    } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.');
    }
    throw new Error('An unexpected error occurred while updating the password.');
  }
}
