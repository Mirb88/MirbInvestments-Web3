"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sovereign Firebase slušač stanja sa automatskim čišćenjem memorije
    const unsubscribe = onAuthStateChanged(
      auth, 
      async (currentUser) => {
        try {
          setUser(currentUser);
          setError(null);
          if (currentUser) {
            // Opcionalno osvježavanje tokena u pozadini za stabilnost
            await currentUser.getIdToken(false);
          }
        } catch (err: any) {
          setError(err.message || Greška pri verifikaciji sesije);
        } finally {
          setLoading(false);
        }
      },
      (authError) => {
        setError(authError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message || Greška pri odjavi);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.getIdToken(true); // Prisilni silent refresh tokena
      } catch (err: any) {
        setError(err.message);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
