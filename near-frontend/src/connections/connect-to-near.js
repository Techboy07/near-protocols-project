import * as nearAPI from "near-api-js";

const connectionConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

export default async function connectToNear() {
  const nearConnection = await nearAPI.connect(connectionConfig);
  return nearConnection;
}
