'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { User, Auth, UserCredential } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  updateUserPassword as firebaseUpdateUserPassword,
  signOut as firebaseSignOut,
} from '@/services/auth';
import { useRouter } from 'next/navigation';
import { initializeFirebase } from '../lib/firebase';
import { ROUTES } from '@/lib/routes';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  auth: Auth | null;
  db: Firestore | null;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { auth, db } = initializeFirebase();
    setAuthInstance(auth);
    setDbInstance(db);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    if (!authInstance) return;
    await firebaseSignOut(authInstance);
    setUser(null);
    router.push(ROUTES.LOGIN);
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !authInstance) {
      throw new Error('You must be logged in to change your password.');
    }
    await firebaseUpdateUserPassword(authInstance, user, currentPassword, newPassword);
    await signOut();
  };

  const signIn = async (email: string, password: string) => {
    if (!authInstance) {
      throw new Error("Firebase Auth is not initialized.");
    }
    return signInWithEmailAndPassword(authInstance, email, password);
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!authInstance) {
      throw new Error("Firebase Auth is not initialized.");
    }
    return signUpWithEmailAndPassword(authInstance, email, password, displayName);
  }

  const value: AuthContextType = {
    user,
    loading,
    auth: authInstance,
    db: dbInstance,
    signInWithEmail: signIn,
    signUpWithEmail: signUp,
    updateUserPassword,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
