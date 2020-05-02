/**
 * @function useNetworkOnChange
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import { NETWORK_CHANGE_SET } from "../types";

/* --- Effect --- */
export const useNetworkOnChange = (state, dispatch) => {
  /* --- Account Change : Listen Event --- */
  useEffect(() => {
    if (state.settings.reactive.watchNetworkOnChange && window.ethereum) {
      window.ethereum.on("networkChanged", networkId => {
        dispatch({
          type: NETWORK_CHANGE_SET,
          payload: networkId
        });
      });
      return true;
    }
  }, []);
};
