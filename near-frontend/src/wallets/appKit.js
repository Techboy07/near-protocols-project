/*- import { createWeb3Modal } from '@web3modal/wagmi/react'
- import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
- import { arbitrum, mainnet } from 'viem/chains'
*/

import { createAppKit } from "@reown/appkit/react";
import { EVMWalletChain, NetworkId } from "../config";

import { arbitrum, mainnet, nearTestnet, near } from "@reown/appkit/networks";

const near2 = {
  id: EVMWalletChain.chainId,
  name: EVMWalletChain.name,
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: [EVMWalletChain.rpc] },
    public: { http: [EVMWalletChain.rpc] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: EVMWalletChain.explorer,
    },
  },
  testnet: NetworkId === "testnet",
};

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { injected, walletConnect } from "@wagmi/connectors";
import { http, reconnect } from "@wagmi/core";

import {
  QueryClient,
  // QueryClientProvider
} from "@tanstack/react-query";

const projectId = import.meta.env.VITE__PROJECT_ID;

export const queryClient = new QueryClient();

const metadata = {
  //optional
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

/* Remove the existing Wagmi Config */

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

/* Create the Wagmi adapter */
export const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, near, nearTestnet, near2, arbitrum],
  projectId,
  transports: { [near.id]: http(), [nearTestnet.id]: http() },
  connectors: [
    walletConnect({ projectId }),
    injected({ shimDisconnect: true }),
  ],
});

reconnect(wagmiAdapter.wagmiConfig);

//  createWeb3Modal({ wagmiConfig, projectId, chains })

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [near, nearTestnet, mainnet, arbitrum],
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  },
});

// export default function App() {
//   return (
//     <>
// -      <WagmiProvider config={wagmiConfig}>
// +      <WagmiProvider config={wagmiAdapter.wagmiConfig}>

//       <QueryClientProvider client={queryClient}>
//           <HomePage />
//        </QueryClientProvider>
//       </WagmiProvider>
//     </>
//   )
// }

// export default { queryClient, wagmiAdapter, appKit, QueryClientProvider };
