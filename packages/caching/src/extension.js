import reducer from "./lib/reducer";
import * as types from "./lib/types";
import * as hooks from "./hooks";
import * as actions from "./actions";
import * as selectors from "./selectors";
export const extension = {
  name: "global",
  actions,
  hooks,
  // selectors,
  // types,
  reducer,
  initialState: {
    activity: {
      deploy: {},
      messages: {},
      signatures: {},
      transactions: {}
    },
    requests: {
      deploy: [],
      messages: [],
      signatures: [],
      transactions: []
    },
    store: {
      contracts: []
    }
  }
};
