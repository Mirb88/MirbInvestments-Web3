'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
interface AuthContextType {
user: { address?: string; isAuthenticated: boolean; role?: string } | null;
login: (address?: string) => void;
logout: () => void;
isLoading: boolean;
}
const AuthContext = createContext<AuthContextType undefined |>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<{ address?: string; isAuthenticated: boolean; role?: string } | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
useEffect(() => {
// Provjera lokalnog stanja / Web3 konekcije pri inicijalizaciji
const storedAuth = localStorage.getItem('mirb_auth_state');
if (storedAuth) {
try {
setUser(JSON.parse(storedAuth));
} catch (e) {
console.error('Failed to parse auth state', e);
}
}
setIsLoading(false);
}, []);
const login = (address?: string) => {
const authData = { address: address || '0x_elite_node', isAuthenticated: true, role: 'VIP_STRATEGIST' };
setUser(authData);
localStorage.setItem('mirb_auth_state', JSON.stringify(authData));
};
const logout = () => {
setUser(null);
localStorage.removeItem('mirb_auth_state');
};
return (
<AuthContext.Provider isLoading login, logout, user, value="{{" }}>
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
