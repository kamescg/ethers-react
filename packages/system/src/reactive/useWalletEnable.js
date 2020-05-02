/**
 * @function useCommonEnableEffect
 * @description Handle the Ethereum wallet enable request.
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import { ENABLE_SUCCESS, ENABLE_FAILURE } from "../lib/types";

/* --- Effect --- */
export const useWalletEnable = (state, dispatch) => {
  useEffect(() => {
    if (state.isEnableRequested) {
      const runEffect = async () => {
        try {
          await window.ethereum.enable();
          dispatch({
            type: ENABLE_SUCCESS
          });
        } catch (error) {
          dispatch({
            type: ENABLE_FAILURE,
            payload: error
          });
        }
      };
      runEffect();
    }
  }, [state.isEnableRequested]);

  return true;
};
