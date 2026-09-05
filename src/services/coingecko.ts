import type { CryptoData } from '@/lib/types';

/**
 * Fetches cryptocurrency market data from the server-side API route.
 * This function is intended to be called from both client and server components.
 * @param ids - An array of CoinGecko coin IDs.
 * @returns An object with data or an error.
 */
export async function getCryptoData(ids: string[]): Promise<{ data: CryptoData[] | null; error: string | null; }> {
  try {
    if (!ids || ids.length === 0) {
        return { data: [], error: 'Coin IDs must be provided.' };
    }
    
    // Determine the base URL based on the environment
    const baseUrl = typeof window === 'undefined'
      ? `https://${process.env.VERCEL_URL || 'localhost:9002'}`
      : '';
    const url = `${baseUrl}/api/crypto?ids=${ids.join(',')}`;

    // Call our own API route, which will then call CoinGecko from the server.
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Route Error:', response.status, errorData.error);
      return {
        data: null,
        error: errorData.error || 'Failed to fetch crypto data from internal API.',
      };
    }

    const data: CryptoData[] = await response.json();
    return { data, error: null };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in getCryptoData (client-side):', errorMessage);
    return { data: null, error: 'Live prices are currently unavailable.' };
  }
}

/**
 * Fetches simple coin prices from the CoinGecko API.
 * This should only be used on the server-side.
 * @param ids - A comma-separated string or array of CoinGecko coin IDs.
 * @returns A promise that resolves to a price object or null.
 */
export async function getSimpleCoinPrices(ids: string | string[]): Promise<{ [key: string]: { usd: number } } | null> {
    const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
    try {
        const idsString = Array.isArray(ids) ? ids.join(',') : ids;
        if (!idsString) return null;

        const response = await fetch(`${COINGECKO_API_URL}/simple/price?ids=${idsString}&vs_currencies=usd`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('CoinGecko Simple Price API Error:', response.status, errorText);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error("Error in getSimpleCoinPrices:", errorMessage);
        return null;
    }
}
