/**
 * @function useWalletSignerGet
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import { SIGNER_GET_SUCCESS, SIGNER_GET_FAILURE } from "../types";

/* --- Effect --- */
export const useWalletSignerGet = (state, dispatch) => {
  useEffect(() => {
    if (
      state.settings.reactive.getProviderSigner &&
      state.address &&
      state.provider
    ) {
      (async () => {
        try {
          const signer = await state.provider.getSigner(state.address);
          dispatch({
            type: SIGNER_GET_SUCCESS,
            payload: signer
          });
        } catch (error) {
          dispatch({
            type: SIGNER_GET_FAILURE,
            payload: error
          });
        }
      })();
    }
  }, [state.provider, state.address]);

  return true;
};
