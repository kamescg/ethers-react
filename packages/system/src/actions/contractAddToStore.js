import { CONTRACT_INIT } from "../lib/types";

export const contractAddToStore = (state, dispatch) => ({
  address,
  abi,
  api
}) =>
  dispatch({
    type: CONTRACT_INIT,
    id: address,
    payload: {
      abi,
      api
    }
  });
