/**
 * @function useWalletSignerGet
 */

/* --- Global --- */
import { useEffect } from "react";
/* --- Local --- */
import { NONCE_SET } from "../types";

/* --- Effect --- */
export const useWalletNonce = (state, dispatch) => {
  useEffect(() => {
    if (state.settings.reactive.getWalletNonce && state.wallet) {
      (async () => {
        try {
          const nonce = await state.wallet.getTransactionCount();
          dispatch({
            payload: nonce,
            type: NONCE_SET
          });
        } catch (error) {}
      })();
    }
  }, [state.wallet]);

  return true;
};
