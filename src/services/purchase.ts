
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { CryptoBundle, PurchasedAsset } from '@/lib/types';
import { getSimpleCoinPrices } from './coingecko';

async function getAssetsForBundle(bundle: CryptoBundle): Promise<PurchasedAsset[]> {
    if (bundle.coins.length === 0) return [];
    
    const coinIds = bundle.coins.map(c => c.id).join(',');
    if (!coinIds) return [];

    try {
        const priceData = await getSimpleCoinPrices(coinIds);
        
        if (!priceData) {
            console.error(`Failed to fetch prices for bundle ${bundle.id}`);
             return bundle.coins.map(coin => ({
                id: coin.id,
                symbol: coin.symbol,
                amount: 0,
                purchasePrice: 0 
            }));
        }
        
        const assets: PurchasedAsset[] = bundle.coins.map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            amount: 0, // Amount will be calculated by a backend process
            purchasePrice: priceData[coin.id]?.usd || 0
        }));
        
        return assets;

    } catch (error) {
        console.error('Error fetching prices for bundle assets:', error);
        return bundle.coins.map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            amount: 0,
            purchasePrice: 0
        }));
    }
}

export async function createPurchase(db: Firestore, userId: string, email: string | null, bundle: CryptoBundle) {
  if (!userId || !email) {
    return { success: false, error: 'User must be authenticated to make a purchase.' };
  }
  
  try {
    const assetsForPurchase = await getAssetsForBundle(bundle);

    const docRef = await addDoc(collection(db, 'purchases'), {
      userId,
      userEmail: email,
      bundleId: bundle.id,
      bundleName: bundle.name,
      amount: bundle.price,
      status: 'pending',
      createdAt: Timestamp.now(),
      assets: assetsForPurchase
    });
    console.log('Document written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (e: any) {
    console.error('Error adding document: ', e);
    return { success: false, error: e.message || 'Could not create purchase record' };
  }
}
