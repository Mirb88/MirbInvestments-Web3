import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, bsc } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Inicijalizacija Web3 konfiguracije za MirbInvestments Sovereign Dominion
export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, bsc],
  connectors: [
    injected(), // Podrška za MetaMask, Trust Wallet, Coinbase Wallet
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'mirbinvestments-web3-bridge' 
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
  },
});

export const SUPPORTED_CHAINS = [mainnet, polygon, arbitrum, bsc];
