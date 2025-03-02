import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";

import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";

import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";

import { wagmiConfig, web3Modal } from "./web3modal";

// import { wagmiAdapter, appKit } from "./appKit";

import "@near-wallet-selector/modal-ui/styles.css";

async function getSelector() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [
      setupHotWallet(),
      setupBitteWallet(),
      setupLedger(),
      setupSender(),
      setupHereWallet(),
      setupNearMobileWallet(),
      setupWelldoneWallet(),
      setupMyNearWallet(),
      setupMeteorWallet(),
      setupEthereumWallets({
        wagmiConfig,
        web3Modal,
        // appKit,
        // wagmiConfig: wagmiAdapter.wagmiConfig,
        alwaysOnboardDuringSignIn: true,
      }),
    ],
  });

  return selector;
}
export const selector = getSelector();

async function getModal() {
  const modal = setupModal(await selector, {
    contractId: "test.testnet",
  });
  return modal;
}

const modal = getModal();

// export const subscription = modal.on("onHide", (eventParams) => {
//   const { hideReason } = eventParams;
//   console.log(eventParams, hideReason);
// });

// modal.show();
export default modal;
