import * as nearAPI from "near-api-js";

const connectionConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

export function convertYoctoNear(yoctoNear) {
  return nearAPI.utils.format.formatNearAmount(yoctoNear);
}

export default async function connectToNear() {
  const nearConnection = await nearAPI.connect(connectionConfig);
  console.log();
  return nearConnection;
}
