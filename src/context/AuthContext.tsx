'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { address?: string; isAuthenticated: boolean; role?: string } | null;
  login: (address?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ address?: string; isAuthenticated: boolean; role?: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('mirb_auth_state') : null;
      if (storedAuth) {
        setUser(JSON.parse(storedAuth));
      }
    } catch (e) {
      console.error('Failed to parse auth state', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (address?: string) => {
    const authData = { address: address || '0x_elite_node', isAuthenticated: true, role: 'VIP_STRATEGIST' };
    setUser(authData);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mirb_auth_state', JSON.stringify(authData));
      }
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mirb_auth_state');
      }
    } catch (e) {
      console.error('Failed to remove auth state', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
