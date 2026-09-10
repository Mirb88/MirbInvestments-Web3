"use client";

import React, { createContext, useContext, useState } from 'react';

interface PortfolioContextType {
  portfolio: any;
  setPortfolio: (p: any) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Bezbjedan fallback za sistemske rute poput _not-found
    return { portfolio: null, setPortfolio: () => {} };
  }
  return context;
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<any>(null);
  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.PortfolioProvider>
  );
}
