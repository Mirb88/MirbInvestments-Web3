"use client";

import React, { createContext, useContext, useState } from 'react';

interface PortfolioContextType {
  portfolio: any;
  setPortfolio: (p: any) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

 export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  // Elitni fallback koji štiti build proces od rušenja na sistem stranicama van provajdera
  if (context === undefined) {
    return {
      portfolio: initialPortfolioState,
      purchaseHistory: [],
      depositHistory: [],
      withdrawalHistory: [],
      cryptoData: [],
      isLoading: false,
      pricesError: null,
    };
  }
  return context;
};


export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<any>(null);
  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}
