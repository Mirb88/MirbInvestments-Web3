'client';

import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext<{ portfolio: any; setPortfolio: (p: any) => void }>({
  portfolio: null,
  setPortfolio: () => {},
});

export const usePortfolio = () => useContext(PortfolioContext);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState(null);
  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}
