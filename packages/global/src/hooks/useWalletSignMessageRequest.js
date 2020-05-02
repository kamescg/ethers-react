/**
 * @function useWalletSignMessageRequest
 * @description Watch Browser window object for Etheruem selected address.
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useState, useEffect } from "react";

/* --- Local --- */
import {
  WALLET_SIGN_TYPED_MESSAGE_REQUEST,
  WALLET_SIGN_MESSAGE_SUCCESS,
  WALLET_SIGN_MESSAGE_FAILURE
} from "../lib/types";

/* --- Component --- */
export const useWalletSignMessageRequest = (state, dispatch) => {
  useEffect(() => {
    if (
      state.provider &&
      state.wallet &&
      state.store.messages &&
      state.store.messages.length > 0
    ) {
      const runEffect = async () => {
        let signature;
        const messageRequest = state.store.messages[0];
        try {
          switch (messageRequest.type) {
            case WALLET_SIGN_TYPED_MESSAGE_REQUEST:
              signature = await state.provider.injected.send(
                "eth_signTypedData",
                [messageRequest.payload, state.address]
              );
              setRequested(true);
              break;
            default:
              signature = await state.wallet.signMessage(
                messageRequest.payload
              );
              break;
          }
          dispatch({
            type: WALLET_SIGN_MESSAGE_SUCCESS,
            id: messageRequest.id,
            payload: signature
          });
          setResponse(true);
        } catch (error) {
          dispatch({
            type: WALLET_SIGN_MESSAGE_FAILURE,
            id: messageRequest.id,
            payload: error
          });
          setResponse(false);
        }
      };
      runEffect();
    }
  }, [state.store.messages, state.provider, state.wallet]);
};
