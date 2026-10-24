"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          setUser(currentUser);
          setError(null);

          // Emit the current user so any listener (e.g., Header) can react immediately
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent<User | null>('authChange', { detail: currentUser }));
          }

          // Refresh the page data so client‑side routes see the updated auth state
          router.refresh();

          if (currentUser) {
            // Optional token refresh for stability
            await currentUser.getIdToken(false);
          }
        } catch (err: any) {
          setError(err.message || 'Greška pri verifikaciji sesije');
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
  }, [router]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      // Emit logout event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent<User | null>('authChange', { detail: null }));
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Greška pri odjavi');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const refreshSession = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.getIdToken(true);
        // After token refresh, also refresh the router to propagate any changes
        router.refresh();
      } catch (err: any) {
        setError(err.message);
      }
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);