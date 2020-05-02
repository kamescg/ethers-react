/**
 * @name EthersContext
 * @description Initialize Ethers context.
 */

import { createContext } from "react";

const Context = createContext({
  // instance: ethers,
  // address: undefined,
  // balance: undefined,
  // network: undefined,
  // nonce: undefined,
  // provider: undefined,
  // wallet: undefined,
  contracts: {},
  library: {}
});

export default Context;
