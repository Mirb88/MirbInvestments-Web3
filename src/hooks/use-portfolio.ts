export interface Holding {
  symbol: string;
  quantity: number;
}

export interface Portfolio {
  holdings: Holding[];
}

export function usePortfolio() {
  // Ovdje vratite odgovarajući portfolio state ili mock podatke
  const portfolio: Portfolio = {
    holdings: [],
  };

  return { portfolio };
}
