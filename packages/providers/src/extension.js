import * as actions from "./actions";
import * as hooks from "./hooks";
import reducer from "./lib/reducer";

export const extension = {
  name: "providers",
  actions,
  hooks,
  reducer,
  initialState: {
    PROVIDER_INIT: 0
  }
};
