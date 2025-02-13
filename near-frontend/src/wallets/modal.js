import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";

import { wagmiConfig, web3Modal } from "./web3modal";

import "@near-wallet-selector/modal-ui/styles.css";

async function getSelector() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [
      setupMyNearWallet(),
      setupMeteorWallet(),
      setupEthereumWallets({
        wagmiConfig,
        web3Modal,
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
