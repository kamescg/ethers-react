import * as hooks from "./hooks";
import reducer from "./reducer";
export const extension = {
  name: "reactive",
  hooks,
  reducer,
  settings: {
    getAccountBalance: false,
    getAccountOnLoad: false,
    getAccountNonce: false,
    getProviderSigner: false,
    watchAccountBalance: false,
    watchAccountOnChange: false,
    watchAccountNonce: false,
    watchBlockCurrent: false,
    watchNetworkOnChange: false
  },
  initialState: {
    address: undefined,
    balance: undefined,
    blockCurrent: 0,
    network: undefined,
    nonce: undefined,
    provider: undefined,
    wallet: undefined
  }
};
