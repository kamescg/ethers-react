/**
 * @function useWalletSendTransactionRequest
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect } from "react";

/* --- Local --- */
import {
  WALLET_SEND_TRANSACTION_SUCCESS,
  WALLET_SEND_TRANSACTION_FAILURE
} from "../lib/types";

/* --- Effect --- */
export const useWalletSendTransactionRequest = (state, dispatch) => {
  useEffect(() => {
    if (
      state.wallet &&
      state.requests.transactions &&
      state.requests.transactions.length > 0
    ) {
      const runEffect = async () => {
        const transaction = state.requests.transactions[0];
        const signature = await state.wallet.sendTransaction(
          transaction.payload
        );
        try {
          dispatch({
            type: WALLET_SEND_TRANSACTION_SUCCESS,
            payload: signature
          });
        } catch (error) {
          dispatch({
            type: WALLET_SEND_TRANSACTION_FAILURE,
            payload: error
          });
        }
      };
      runEffect();
    }
  }, [state.requests.transactions]);
};
