/**
 * @function useWalletSignerGet
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import { SET_ADDRESS } from "../types";

/* --- Effect --- */
export const useWalletAddress = (state, dispatch) => {
  useEffect(() => {
    if (
      state.settings.reactive.getWalletAddress &&
      state.provider &&
      !state.address
    ) {
      (async () => {
        try {
          const address = await state.provider.listAccounts();
          if (address[0])
            dispatch({
              payload: address[0],
              type: SET_ADDRESS
            });
        } catch (error) {}
      })();
    }
  }, [state.provider, state.address]);

  return true;
};
