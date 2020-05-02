/**
 * @function useBlockMined
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import { BLOCK_CURRENT_SET } from "../types";

/* --- Effect --- */
export const useBlockMined = (state, dispatch) => {
  /* --- Account Change : Listen Event --- */
  useEffect(() => {
    if (state.settings.reactive.watchBlockCurrent && state.provider) {
      state.provider.on("block", block => {
        dispatch({
          type: BLOCK_CURRENT_SET,
          payload: block
        });
      });
    }
    return () =>
      state.provider ? state.provider.removeListener("block") : null;
  }, [state.provider]);
};
