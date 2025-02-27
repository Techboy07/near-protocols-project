import * as nearAPI from "near-api-js";
const { keyStores, KeyPair } = nearAPI;
const networkId = "testnet";

const myKeyStore = new keyStores.InMemoryKeyStore();
const myKeyPair = KeyPair.fromString(
  "ed25519:4dc8cGHjkFkx1TMfZuX2oMTDVFUHXMxSw8ESi9YMGSVcq4KCCvy2aNpsPUREfgL1tFJfCJAfZXK8s9jTxKwgKFcd"
);

await myKeyStore.setKey(networkId, "sadapp7780.testnet", myKeyPair);

const connectionConfig = {
  networkId,
  nodeUrl: "https://rpc.testnet.near.org",
  keyStore: myKeyStore,
};

export function convertYoctoNear(yoctoNear) {
  return nearAPI.utils.format.formatNearAmount(yoctoNear);
}

export default async function connectToNear() {
  const nearConnection = await nearAPI.connect(connectionConfig);
  console.log();
  return nearConnection;
}
